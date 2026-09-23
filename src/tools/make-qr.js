#!/usr/bin/env node
/* ==========================================================================
   Generates a QR code for the site, for print and for sending to people.

   Run:  npm run qr                 writes into assets/img/
         npm run qr -- <folder>     writes somewhere else as well

   Three cuts, because one file does not serve every use:

     qr.svg    vector, for print. A printer can scale this to a shopfront
               window without it going blocky.
     qr.png    1200px, for WhatsApp, email and slides.
     qr-card.png  the code on a branded card with the address written out
               underneath — because a bare QR tells a person nothing about
               where it goes, and plenty of people will not scan one that
               does not say.

   Error correction is set to H (30%). That is what lets the brand mark sit in
   the middle without making the code unreadable, and it survives a bad print
   or a creased flyer.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', '..');
const IMG = path.join(ROOT, 'assets', 'img');
const site = require('../data/site');

const URL = site.url;
const GREEN = '#0f5540';
const CREAM = '#ffffff';

const extraOut = process.argv[2] || '';

async function main() {
  fs.mkdirSync(IMG, { recursive: true });

  const opts = { errorCorrectionLevel: 'H', margin: 2, color: { dark: GREEN, light: CREAM } };

  /* ---- vector, for print ---- */
  const svg = await QRCode.toString(URL, { ...opts, type: 'svg', width: 1024 });
  fs.writeFileSync(path.join(IMG, 'qr.svg'), svg, 'utf8');

  /* ---- raster, with the brand mark in the middle ---- */
  const png = await QRCode.toBuffer(URL, { ...opts, type: 'png', width: 1200 });

  const markFile = path.join(IMG, 'logo-mark.png');
  let composed = png;
  if (fs.existsSync(markFile)) {
    /* The mark sits on an opaque plate. Dropping a transparent logo straight
       onto the code leaves its holes full of QR modules, which reads as
       damage rather than as a logo. */
    const plateSize = 330;
    const mark = await sharp(markFile)
      .resize(plateSize - 56, plateSize - 56, { fit: 'inside', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer();
    const plate = await sharp({
      create: { width: plateSize, height: plateSize, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
    })
      .composite([{ input: mark, gravity: 'centre' }])
      .png()
      .toBuffer();
    composed = await sharp(png).composite([{ input: plate, gravity: 'centre' }]).png().toBuffer();
  }
  fs.writeFileSync(path.join(IMG, 'qr.png'), composed);

  /* ---- the card: the code, the name, and the address in words ---- */
  const W = 1000;
  const H = 1320;
  const label = URL.replace(/^https?:\/\//, '');
  /* The WhatsApp number, not the landline. A card like this gets photographed
     and forwarded, and the person holding it wants the number they can
     message — which is also the number every enquiry on the site goes to. */
  const card = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="#faf8f3"/>
      <rect x="28" y="28" width="${W - 56}" height="${H - 56}" rx="28" fill="#ffffff" stroke="#e3e8e5" stroke-width="2"/>
      <text x="${W / 2}" y="128" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
            font-size="52" font-weight="700" fill="${GREEN}">${site.name.replace(/&/g, '&amp;')}</text>
      <text x="${W / 2}" y="180" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
            font-size="26" letter-spacing="3" fill="#8a6a1f">SCAN TO VISIT OUR WEBSITE</text>
      <text x="${W / 2}" y="${H - 148}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
            font-size="40" font-weight="700" fill="${GREEN}">${label}</text>
      <text x="${W / 2}" y="${H - 96}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
            font-size="26" fill="#5b6b64">${site.whatsapp.display} &#183; ${site.address.city}</text>
    </svg>`
  );

  const codeOnCard = await sharp(composed).resize(760, 760).toBuffer();
  await sharp(card)
    .composite([{ input: codeOnCard, top: 240, left: Math.round((W - 760) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(IMG, 'qr-card.png'));

  const files = ['qr.svg', 'qr.png', 'qr-card.png'];
  console.log(`\nQR codes for ${URL}\n${'='.repeat(46)}`);
  for (const f of files) {
    const size = fs.statSync(path.join(IMG, f)).size;
    console.log(`  ${f.padEnd(16)} ${Math.round(size / 1024)}KB`);
  }

  if (extraOut) {
    fs.mkdirSync(extraOut, { recursive: true });
    for (const f of files) fs.copyFileSync(path.join(IMG, f), path.join(extraOut, f));
    console.log(`\n  Also copied to ${extraOut}`);
  }
}

main().catch((err) => {
  console.error('\nQR generation failed:', err.message);
  process.exitCode = 1;
});
