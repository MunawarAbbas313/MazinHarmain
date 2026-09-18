#!/usr/bin/env node
/* ==========================================================================
   Prepares the brand logo for the web from the supplied artwork.

   The source is a square JPEG on a white background containing the full
   stacked lockup plus a strip of four service badges. That is right for a
   letterhead and wrong for a website:

     - the header is ~82px tall, where a stacked lockup is illegible
     - the footer is dark green, where a white JPEG background shows as a box

   So this produces three transparent PNGs:

     logo-mark.png   the MH monogram only        -> header, beside the wordmark
     logo.png        monogram + wordmark         -> header when space allows
     logo-full.png   the full lockup             -> footer

   White is knocked out with a soft threshold so edges stay smooth rather
   than jagged.

   Run:  node src/tools/make-logo.js <path-to-logo>
   ========================================================================== */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];
const OUT = path.join(__dirname, '..', '..', 'assets', 'img');

if (!SRC || !fs.existsSync(SRC)) {
  console.error('Usage: node src/tools/make-logo.js <path-to-logo-image>');
  process.exit(1);
}

/**
 * Knock out the white background.
 * Fully transparent above `hi`, fully opaque below `lo`, ramped between —
 * which keeps anti-aliased type from developing a hard white fringe.
 */
async function removeWhite(buf, { lo = 225, hi = 250 } = {}) {
  const img = sharp(buf).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const neutral = max - min < 26;          // white/grey, not a coloured pixel

    if (neutral && min >= hi) {
      data[i + 3] = 0;
    } else if (neutral && min > lo) {
      const t = (min - lo) / (hi - lo);       // 0 at lo, 1 at hi
      data[i + 3] = Math.round(255 * (1 - t));
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png({ compressionLevel: 9 });
}

/** Trim fully transparent margins so the artwork sits flush in its box. */
const trim = (pipeline) => pipeline.trim({ threshold: 1 });

(async () => {
  const meta = await sharp(SRC).metadata();
  console.log(`\nSource: ${path.basename(SRC)} — ${meta.width}x${meta.height} ${meta.format}\n`);

  const W = meta.width;
  const H = meta.height;
  const pct = (v, total) => Math.round((v / 100) * total);

  /* Regions, as percentages of the square source, so this still works if the
     client later supplies the same artwork at a different resolution. */
  const REGIONS = {
    // monogram: MH letters, Kaaba/dome imagery, globe and plane
    mark: { left: pct(16, W), top: pct(1, H), width: pct(72, W), height: pct(54, H) },
    // monogram + "MAZIN HARAMAIN" + "TOURS AND TRAVELS"
    primary: { left: pct(3, W), top: pct(1, H), width: pct(94, W), height: pct(72, H) },
    // everything down to the "YOUR JOURNEY • OUR COMMITMENT" line
    full: { left: pct(2, W), top: pct(1, H), width: pct(96, W), height: pct(76, H) },
  };

  const jobs = [
    ['logo-mark.png', REGIONS.mark, 260],
    ['logo.png', REGIONS.primary, 460],
    ['logo-full.png', REGIONS.full, 560],
  ];

  for (const [name, region, targetWidth] of jobs) {
    const cropped = await sharp(SRC).extract(region).png().toBuffer();
    const knocked = await removeWhite(cropped);
    const out = path.join(OUT, name);

    await trim(knocked)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true, quality: 88, effort: 10 })
      .toFile(out);

    const m = await sharp(out).metadata();
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`  ${name.padEnd(16)} ${String(m.width).padStart(4)}x${String(m.height).padEnd(4)}  ${kb} KB`);
  }

  console.log('\nWritten to assets/img/. Run `npm run build` to publish.\n');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
