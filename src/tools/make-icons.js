#!/usr/bin/env node
/* ==========================================================================
   Regenerates every raster derivative of the brand mark from the SVG
   sources, so the logo has exactly one place it is authored.

   Run:  npm run icons

   Sources:

     logo-lockup.png    THE CLIENT'S OWN ARTWORK, keyed off its white ground.
                        The monogram over the wordmark. Everything the eye
                        actually reads at size comes from this file.
     logo-mark.png      the monogram alone, cut from the lockup's first ink
                        band. Header and footer.
     logo-favicon.svg   a stripped square cut, for browser tabs only.

   This tool USED TO regenerate logo-mark.png from a drawn logo-mark.svg,
   and when the client supplied their artwork that older drawing silently
   overwrote it — the header went back to the drawn mark without anything
   failing. It now derives the monogram from the client's lockup instead, so
   running it can never replace their logo with ours.

   The favicon stays a separate simplified cut because the client's artwork
   carries a detailed globe, a swoosh and an aeroplane; at 16px all of that
   collapses into mush. Their logo is used everywhere it can actually be
   seen — header, footer, app icons, OG image — and the stripped cut only
   where nothing detailed could survive.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG = path.join(__dirname, '..', '..', 'assets', 'img');
const read = (name) => fs.readFileSync(path.join(IMG, name));
const kb = (n) => (n / 1024).toFixed(1) + 'KB';

/** The 16px cut: no globe, and the letters spread into the space it leaves. */
function favicon16(svg) {
  return Buffer.from(
    svg
      .toString('utf8')
      .replace(/<g id="fv-globe">[\s\S]*?<\/g>/, '')
      .replace('x="7"', 'x="12"').replace('textLength="40"', 'textLength="46"')
      .replace('x="77"', 'x="66"').replace('textLength="36"', 'textLength="42"')
  );
}

/**
 * ICO with several sizes in one file, each stored as a PNG — the format has
 * allowed that since Vista, and it lets every context pick its own size
 * rather than scaling one bitmap badly.
 */
function buildIco(images) {
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0);                 // reserved
  dir.writeUInt16LE(1, 2);                 // type: icon
  dir.writeUInt16LE(images.length, 4);

  let offset = 6 + 16 * images.length;
  const entries = [];
  for (const { size, png } of images) {
    const e = Buffer.alloc(16);
    e[0] = size === 256 ? 0 : size;        // 0 means 256 in the ICO format
    e[1] = size === 256 ? 0 : size;
    e.writeUInt16LE(1, 4);                 // colour planes
    e.writeUInt16LE(32, 6);                // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(e);
  }
  return Buffer.concat([dir, ...entries, ...images.map((i) => i.png)]);
}

async function main() {
  const lockup = read('logo-lockup.png');
  const fav = read('logo-favicon.svg');

  console.log('\nRegenerating icons\n' + '='.repeat(52));

  /* ---- the monogram, cut from the client's lockup ---- */
  /* The lockup's ink bands are the monogram, then the two wordmark lines;
     the monogram ends at y451, so 458 clears it with a margin. */
  const monogram = await sharp(lockup).extract({ left: 0, top: 0, width: 1200, height: 458 })
    .trim({ threshold: 2 }).toBuffer();
  await sharp(monogram).resize({ width: 900, withoutEnlargement: true })
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toFile(path.join(IMG, 'logo-mark.png'));
  console.log(`  ${'logo-mark.png'.padEnd(24)} 900w      ${kb(fs.statSync(path.join(IMG, 'logo-mark.png')).size)}`);

  /* ---- app icons: the monogram on the brand green, letterboxed ---- */
  for (const [out, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
    const pad = Math.round(size * 0.12);
    const inner = await sharp(monogram)
      .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    const plate = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#ffffff"/></svg>`
    );
    await sharp(plate).composite([{ input: inner, gravity: 'centre' }])
      .png({ compressionLevel: 9 }).toFile(path.join(IMG, out));
    console.log(`  ${out.padEnd(24)} ${size}x${size}  ${kb(fs.statSync(path.join(IMG, out)).size)}`);
  }

  /* ---- tabs: the stripped cut ---- */
  for (const size of [16, 32, 48]) {
    const src = size <= 16 ? favicon16(fav) : fav;
    const out = `favicon-${size}.png`;
    await sharp(src, { density: 1200 }).resize(size, size)
      .png({ compressionLevel: 9 }).toFile(path.join(IMG, out));
    console.log(`  ${out.padEnd(24)} ${size}x${size}  ${kb(fs.statSync(path.join(IMG, out)).size)}`);
  }

  const ico = buildIco(await Promise.all([16, 32, 48].map(async (size) => ({
    size,
    png: await sharp(size <= 16 ? favicon16(fav) : fav, { density: 1200 })
      .resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
  }))));
  fs.writeFileSync(path.join(IMG, 'favicon.ico'), ico);
  console.log(`  ${'favicon.ico'.padEnd(24)} 16/32/48  ${kb(ico.length)}`);

  /* ---- OG image ----
     The sharing card. It had fallen out of the regeneration path entirely
     and was still the placeholder from before the brand existed — a generic
     hexagon on green, no company name — which is what anyone sharing the
     site on WhatsApp or Facebook was showing.

     Built on cream rather than green so the lockup's own dark-green wordmark
     reads, and with no typeset text at all: the artwork already carries the
     company name, and sharp has no access to the site's display face, so any
     text added here would be set in a substitute. */
  const OG_W = 1200;
  const OG_H = 630;
  const lock = await sharp(lockup).resize({ width: 820, withoutEnlargement: true }).toBuffer();
  const ground = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">` +
    `<rect width="${OG_W}" height="${OG_H}" fill="#faf8f3"/>` +
    `<rect y="${OG_H - 14}" width="${OG_W}" height="14" fill="#0d5238"/>` +
    `<rect y="${OG_H - 18}" width="${OG_W}" height="4" fill="#c79a3e"/></svg>`
  );
  await sharp(ground).composite([{ input: lock, gravity: 'centre' }])
    .png({ compressionLevel: 9 }).toFile(path.join(IMG, 'og-default.png'));
  console.log(`  ${'og-default.png'.padEnd(24)} ${OG_W}x${OG_H}  ${kb(fs.statSync(path.join(IMG, 'og-default.png')).size)}`);

  console.log('\nDone. /assets/* is served immutable — the build hashes these');
  console.log('URLs, so a rebuild is what actually ships them.\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
