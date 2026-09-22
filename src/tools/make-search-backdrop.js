#!/usr/bin/env node
/* ==========================================================================
   Builds the photograph that sits behind the home-page search panel.

   The client supplied a reference banner: a bright, sunlit airliner high in a
   warm cloudscape, with the search form sitting below it. No single stock
   photograph gives that. The ones with a well-lit aircraft have it filling
   the frame — put a form under it and the aircraft is cut in half. The ones
   with an aircraft small enough to sit above a form have it as a distant
   speck, or as a silhouette, which the client rejected outright.

   So this composes the banner the same way the client's designer did: an
   aircraft cut out of one photograph, placed over the sky of another.

   The cut-out is keyed against the sky rather than hand-masked. The source
   sky is smooth but not flat — it runs lighter left to right — so the key
   compares each pixel against a sky colour interpolated across the row, on
   two axes at once: luminance, and warmth (r-b). Luminance alone loses the
   sunlit cream top of the fuselage, which sits at almost exactly the sky's
   brightness. A border flood fill then decides what is genuinely background,
   which closes the holes a threshold leaves inside the aircraft, and only
   the largest connected foreground component survives, which drops the sky
   noise the key picks up at the edges.

   Run:  npm run backdrop
   ========================================================================== */

const https = require('https');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const IMG = path.join(__dirname, '..', '..', 'assets', 'img');

/* Pexels 23508916 — a white airliner in warm low sun, banking towards the
   viewer. The nearest match to the aircraft in the client's banner. */
const PLANE_ID = 23508916;
/* Pexels 35558117 — gold-lit cloud over blue, the client's palette. */
const SKY_ID = 35558117;

const cdn = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* Where the aircraft sits in the finished frame, as fractions of it. Taken
   off the client's reference: the aircraft is about a third of the banner
   tall and sits right of centre, high enough that the form clears it. */
const PLANE_HEIGHT = 0.24;
const PLANE_CENTRE = { x: 0.62, y: 0.17 };

const OUTPUTS = [
  { file: 'search-backdrop.jpg', w: 1600, h: 900 },
  { file: 'search-backdrop-2560.jpg', w: 2560, h: 1440 },
];

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'user-agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

/** Key the aircraft out of its sky and return a trimmed RGBA PNG. */
async function cutOutPlane(buf) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const C = info.channels;

  /* 1. Soft key against a sky colour interpolated across each row. */
  const soft = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    const iL = (y * W + 5) * C;
    const iR = (y * W + (W - 6)) * C;
    const lumL = 0.299 * data[iL] + 0.587 * data[iL + 1] + 0.114 * data[iL + 2];
    const lumR = 0.299 * data[iR] + 0.587 * data[iR + 1] + 0.114 * data[iR + 2];
    const warmL = data[iL] - data[iL + 2];
    const warmR = data[iR] - data[iR + 2];
    for (let x = 0; x < W; x++) {
      const t = x / (W - 1);
      const skyLum = lumL + (lumR - lumL) * t;
      const skyWarm = warmL + (warmR - warmL) * t;
      const i = (y * W + x) * C;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const d = Math.max(Math.abs(lum - skyLum), Math.abs(r - b - skyWarm) * 1.6);
      soft[y * W + x] = d < 18 ? 0 : d > 38 ? 255 : Math.round(((d - 18) / 20) * 255);
    }
  }

  /* 2. Flood fill from the border: only sky reachable from outside is
        background, so holes inside the aircraft close. */
  const bg = new Uint8Array(W * H);
  const stack = [];
  const push = (x, y) => {
    const k = y * W + x;
    if (!bg[k] && soft[k] < 40) {
      bg[k] = 1;
      stack.push(k);
    }
  };
  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }
  while (stack.length) {
    const k = stack.pop();
    const x = k % W;
    const y = (k - x) / W;
    if (x > 0) push(x - 1, y);
    if (x < W - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < H - 1) push(x, y + 1);
  }

  /* 3. Keep the largest connected foreground blob — the aircraft — and drop
        the speckle the key finds in the sky. */
  const solid = new Uint8Array(W * H);
  for (let k = 0; k < W * H; k++) solid[k] = bg[k] ? 0 : 1;

  const seen = new Uint8Array(W * H);
  let best = null;
  let bestN = 0;
  for (let k0 = 0; k0 < W * H; k0++) {
    if (seen[k0] || !solid[k0]) continue;
    const comp = [k0];
    seen[k0] = 1;
    const st = [k0];
    let n = 0;
    while (st.length) {
      const k = st.pop();
      n++;
      const x = k % W;
      const y = (k - x) / W;
      const nb = [x > 0 ? k - 1 : -1, x < W - 1 ? k + 1 : -1, y > 0 ? k - W : -1, y < H - 1 ? k + W : -1];
      for (const m of nb) {
        if (m >= 0 && !seen[m] && solid[m]) {
          seen[m] = 1;
          st.push(m);
          comp.push(m);
        }
      }
    }
    if (n > bestN) {
      bestN = n;
      best = comp;
    }
  }

  const keep = new Uint8Array(W * H);
  for (const k of best) keep[k] = 1;

  let minX = W;
  let minY = H;
  let maxX = -1;
  let maxY = -1;
  const out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const k = y * W + x;
      const i = k * C;
      const o = k * 4;
      const a = keep[k] ? 255 : 0;
      out[o] = data[i];
      out[o + 1] = data[i + 1];
      out[o + 2] = data[i + 2];
      out[o + 3] = a;
      if (a) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const box = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
  const png = await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .extract(box)
    .png()
    .toBuffer();
  return { png, box, pixels: bestN };
}

(async () => {
  const [planeSrc, skySrc] = await Promise.all([
    download(cdn(PLANE_ID, 2600)),
    download(cdn(SKY_ID, 2600)),
  ]);

  const plane = await cutOutPlane(planeSrc);
  console.log(`  aircraft keyed: ${plane.box.width}x${plane.box.height}, ${plane.pixels} px`);

  for (const out of OUTPUTS) {
    const planeH = Math.round(out.h * PLANE_HEIGHT);
    const planeW = Math.round((plane.box.width / plane.box.height) * planeH);
    const scaled = await sharp(plane.png).resize(planeW, planeH).toBuffer();

    const left = Math.round(out.w * PLANE_CENTRE.x - planeW / 2);
    const top = Math.round(out.h * PLANE_CENTRE.y - planeH / 2);

    await sharp(skySrc)
      .resize(out.w, out.h, { fit: 'cover', position: 'centre' })
      .composite([{ input: scaled, left, top }])
      /* A light warm lift so the sky and the aircraft read as one exposure. */
      .modulate({ brightness: 1.03, saturation: 1.06 })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(path.join(IMG, out.file));

    const size = fs.statSync(path.join(IMG, out.file)).size;
    console.log(`  ${out.file.padEnd(34)} ${out.w}x${out.h}  ${Math.round(size / 1024)}KB`);
  }

  console.log(`\n  Aircraft: Pexels ${PLANE_ID}. Sky: Pexels ${SKY_ID}.`);
})();
