#!/usr/bin/env node
/* ==========================================================================
   Generates assets/img/apple-touch-icon.png (180x180) and og-default.jpg's
   PNG stand-in from scratch — no image library, no binary committed blind.

   Written as a raw PNG encoder using only Node's built-in zlib so the build
   has zero dependencies. Re-run with: npm run icons
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/* --------------------------------------------------------- PNG encoding */
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

/** pixels: Buffer of width*height*4 RGBA */
function encodePng(width, height, pixels) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // colour type: RGBA
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  // Each scanline is prefixed with a filter byte (0 = none)
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    pixels.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const idat = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------ drawing */
function makeCanvas(w, h) {
  const px = Buffer.alloc(w * h * 4);
  return {
    w, h, px,
    set(x, y, [r, g, b, a = 255]) {
      if (x < 0 || y < 0 || x >= w || y >= h) return;
      const i = (y * w + x) * 4;
      if (a === 255) {
        px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255;
        return;
      }
      // simple source-over blend
      const na = a / 255;
      px[i] = Math.round(px[i] * (1 - na) + r * na);
      px[i + 1] = Math.round(px[i + 1] * (1 - na) + g * na);
      px[i + 2] = Math.round(px[i + 2] * (1 - na) + b * na);
      px[i + 3] = Math.max(px[i + 3], a);
    },
    fill(color) {
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) this.set(x, y, color);
    },
  };
}

const GREEN = [10, 74, 52];
const GREEN_DARK = [6, 53, 40];
const GOLD = [199, 154, 62];

/**
 * Anti-aliased shape fill: supersample each pixel 3x3 against a predicate.
 */
function fillShape(cv, color, inside) {
  const S = 3;
  for (let y = 0; y < cv.h; y++) {
    for (let x = 0; x < cv.w; x++) {
      let hits = 0;
      for (let sy = 0; sy < S; sy++) {
        for (let sx = 0; sx < S; sx++) {
          if (inside(x + (sx + 0.5) / S, y + (sy + 0.5) / S)) hits++;
        }
      }
      if (hits) cv.set(x, y, [...color, Math.round((hits / (S * S)) * 255)]);
    }
  }
}

function buildIcon(size) {
  const cv = makeCanvas(size, size);
  const s = size / 180; // design at 180px
  cv.fill([...GREEN_DARK, 255]);

  // Rounded-square brand plate
  const pad = 0;
  const r = 40 * s;
  fillShape(cv, GREEN, (x, y) => {
    const minX = pad, minY = pad, maxX = size - pad, maxY = size - pad;
    if (x < minX || y < minY || x > maxX || y > maxY) return false;
    const cx = Math.min(Math.max(x, minX + r), maxX - r);
    const cy = Math.min(Math.max(y, minY + r), maxY - r);
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r ||
           (x >= minX + r && x <= maxX - r) || (y >= minY + r && y <= maxY - r);
  });

  const cx = size / 2;

  // Hexagon outline (the brand mark), drawn as a stroked ring
  const hexR = 62 * s;
  const stroke = 5 * s;
  const hex = (x, y, radius) => {
    const dx = Math.abs(x - cx) / radius;
    const dy = Math.abs(y - (size * 0.46)) / radius;
    // pointy-top hexagon distance approximation
    return dy <= 0.866 && dx * 0.866 + dy * 0.5 <= 0.866 && dx <= 1;
  };
  fillShape(cv, GOLD, (x, y) => hex(x, y, hexR) && !hex(x, y, hexR - stroke));

  // Dome / mihrab motif inside
  const domeCx = cx;
  const domeCy = size * 0.435;
  const domeR = 19 * s;
  fillShape(cv, GOLD, (x, y) => {
    const dx = x - domeCx;
    const dy = y - domeCy;
    if (dx * dx + dy * dy <= domeR * domeR && y <= domeCy) return true;      // upper dome
    if (Math.abs(dx) <= domeR && y > domeCy && y <= domeCy + 24 * s) {       // tapering base
      const t = (y - domeCy) / (24 * s);
      return Math.abs(dx) <= domeR * (1 - t * 0.85);
    }
    return false;
  });

  // Two base bars
  const bar = (yCentre, halfWidth, thickness) =>
    fillShape(cv, GOLD, (x, y) =>
      Math.abs(x - cx) <= halfWidth && Math.abs(y - yCentre) <= thickness / 2);
  bar(size * 0.72, 41 * s, 5 * s);
  bar(size * 0.79, 30 * s, 5 * s);

  return encodePng(size, size, cv.px);
}

/**
 * Open Graph / social share card, 1200x630.
 * Brand plate with the mark, so a shared link never renders as a blank box.
 * Replace with a photographic version once licensed imagery is supplied.
 */
function buildOgImage() {
  const W = 1200, H = 630;
  const cv = makeCanvas(W, H);

  // Deep green ground with a subtle diagonal lift towards the top right
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = (x / W) * 0.55 + (1 - y / H) * 0.45;
      cv.set(x, y, [
        Math.round(GREEN_DARK[0] + (GREEN[0] - GREEN_DARK[0]) * t),
        Math.round(GREEN_DARK[1] + (GREEN[1] - GREEN_DARK[1]) * t),
        Math.round(GREEN_DARK[2] + (GREEN[2] - GREEN_DARK[2]) * t),
        255,
      ]);
    }
  }

  // Concentric arcs, echoing the tawaf motif on the placeholder graphic
  const ccx = W * 0.78, ccy = H * 0.5;
  for (const radius of [150, 210, 270, 330]) {
    fillShape(cv, GOLD, (x, y) => {
      const d = Math.hypot(x - ccx, y - ccy);
      return d >= radius - 1.2 && d <= radius + 1.2;
    });
  }

  // Brand mark, left aligned
  const mcx = 150, mcy = H * 0.5;
  const hexR = 78;
  const hex = (x, y, radius) => {
    const dx = Math.abs(x - mcx) / radius;
    const dy = Math.abs(y - mcy) / radius;
    return dy <= 0.866 && dx * 0.866 + dy * 0.5 <= 0.866 && dx <= 1;
  };
  fillShape(cv, GOLD, (x, y) => hex(x, y, hexR) && !hex(x, y, hexR - 6));
  fillShape(cv, GOLD, (x, y) => {
    const dx = x - mcx, dy = y - (mcy - 8), r = 24;
    if (dx * dx + dy * dy <= r * r && y <= mcy - 8) return true;
    if (Math.abs(dx) <= r && y > mcy - 8 && y <= mcy + 22) {
      const t = (y - (mcy - 8)) / 30;
      return Math.abs(dx) <= r * (1 - t * 0.85);
    }
    return false;
  });

  // Gold rule beneath where the wordmark sits in the design
  fillShape(cv, GOLD, (x, y) => x >= 280 && x <= 420 && Math.abs(y - (H * 0.5 + 46)) <= 3);

  return encodePng(W, H, cv.px);
}

/* ---------------------------------------------------------------- write */
const outDir = path.join(__dirname, '..', '..', 'assets', 'img');
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['logo-mark.png', 512],
];

for (const [name, size] of targets) {
  const buf = buildIcon(size);
  fs.writeFileSync(path.join(outDir, name), buf);
  console.log(`  ${name.padEnd(22)} ${size}x${size}  ${(buf.length / 1024).toFixed(1)} KB`);
}

console.log('\nIcons written to assets/img/');

const ogBuf = buildOgImage();
fs.writeFileSync(path.join(outDir, 'og-default.png'), ogBuf);
console.log(`  ${'og-default.png'.padEnd(22)} 1200x630  ${(ogBuf.length / 1024).toFixed(1)} KB`);
