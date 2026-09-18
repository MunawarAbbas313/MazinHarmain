#!/usr/bin/env node
/* ==========================================================================
   Downloads SVG country flags into assets/img/flags/.

   Source: flagcdn.com — plain SVG, roughly 0.5 KB each. National flags are
   not subject to copyright, and these are served for exactly this purpose.

   They are saved locally rather than hotlinked so the site has no third-party
   runtime dependency and keeps working if the CDN ever goes away.

   Run:  npm run flags
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const https = require('https');

const { allCodes } = require('../data/flags');

const OUT = path.join(__dirname, '..', '..', 'assets', 'img', 'flags');
const FORCE = process.argv.includes('--force');

function get(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'MazinHaramainSiteBuild/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        res.resume();
        return get(new URL(res.headers.location, url).toString(), redirects - 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error('timeout')));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`\nFetching ${allCodes.length} flags\n${'='.repeat(46)}`);

  let got = 0, skipped = 0;
  const failed = [];

  for (const code of allCodes) {
    const dest = path.join(OUT, `${code}.svg`);
    if (!FORCE && fs.existsSync(dest)) { skipped++; continue; }

    try {
      const buf = await get(`https://flagcdn.com/${code}.svg`);
      const text = buf.toString('utf8');
      if (!text.trim().startsWith('<svg') || buf.length < 80) {
        throw new Error('not an SVG');
      }
      fs.writeFileSync(dest, buf);
      process.stdout.write(`  ${code}`.padEnd(8));
      got++;
      if (got % 8 === 0) process.stdout.write('\n');
    } catch (e) {
      failed.push(`${code} (${e.message})`);
    }
    await sleep(120);
  }

  console.log(`\n${'='.repeat(46)}`);
  console.log(`  downloaded ${got}   already present ${skipped}   failed ${failed.length}`);
  if (failed.length) failed.forEach((f) => console.log('    ! ' + f));

  const total = fs.readdirSync(OUT).filter((f) => f.endsWith('.svg'));
  const bytes = total.reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, 0);
  console.log(`  ${total.length} flags on disk, ${(bytes / 1024).toFixed(0)} KB total\n`);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
