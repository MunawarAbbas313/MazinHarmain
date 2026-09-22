#!/usr/bin/env node
/* ==========================================================================
   Regenerates every raster derivative of the brand mark from the SVG
   sources, so the logo has exactly one place it is authored.

   Run:  npm run icons

   Three source files, because one mark cannot serve every size:

     logo-mark.svg      the wide lockup (about 2.2:1). Header and footer.
     logo-icon.svg      square, full detail — badge rim, flight arc,
                        aeroplane, photographic globe, both letters.
                        Apple touch icon and the 192/512 app icons.
     logo-favicon.svg   square, stripped right back. Tabs only.

   The favicon is its own cut because logo-icon.svg turns to mush at 16px —
   which is precisely what the client reported seeing in the tab. At 16px
   even this cut drops its globe: the disc is three pixels across there and
   welds the M and the H into a single blob.
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
  const mark = read('logo-mark.svg');
  const icon = read('logo-icon.svg');
  const fav = read('logo-favicon.svg');

  console.log('\nRegenerating icons from the SVG sources\n' + '='.repeat(52));

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

  /* ---- app icons: the detailed square ---- */
  for (const [out, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
    await sharp(icon, { density: 900 }).resize(size, size)
      .png({ compressionLevel: 9 }).toFile(path.join(IMG, out));
    console.log(`  ${out.padEnd(24)} ${size}x${size}  ${kb(fs.statSync(path.join(IMG, out)).size)}`);
  }

  /* ---- raster fallback for the wide lockup ---- */
  await sharp(mark, { density: 900 }).resize({ width: 920 })
    .png({ compressionLevel: 9 }).toFile(path.join(IMG, 'logo-mark.png'));
  console.log(`  ${'logo-mark.png'.padEnd(24)} 920w      ${kb(fs.statSync(path.join(IMG, 'logo-mark.png')).size)}`);

  console.log('\nDone. Remember that /assets/* is served immutable — the build');
  console.log('hashes these URLs, so a rebuild is what actually ships them.\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
