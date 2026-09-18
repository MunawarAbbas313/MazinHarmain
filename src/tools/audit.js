#!/usr/bin/env node
/* ==========================================================================
   Visual audit: opens every page in the sitemap with a real browser and
   reports what only a browser can see.

   `npm run qa` checks the HTML. This checks the *rendered* result:
     - images that fell back to the branded placeholder
     - images that failed to decode
     - requests returning 4xx/5xx
     - horizontal overflow (the usual mobile-layout bug)
     - JavaScript console errors

   Requires the preview server: `npm run serve` in another terminal.

   Run:  npm run audit
         npm run audit -- 390        audit at phone width
   ========================================================================== */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const WIDTH = Number(process.argv[2]) || 1280;
const DIST = path.join(__dirname, '..', '..', 'dist');

const sitemap = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sitemap)) {
  console.error('dist/sitemap.xml not found — run `npm run build` first.');
  process.exit(1);
}

const urls = [...fs.readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/');

(async () => {
  console.log(`\nVisual audit — ${urls.length} pages at ${WIDTH}px\n${'='.repeat(52)}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: 900 },
    isMobile: WIDTH < 700,
    hasTouch: WIDTH < 700,
  });
  const page = await context.newPage();

  const problems = [];
  page.on('response', (r) => {
    if (r.status() >= 400) problems.push(`HTTP ${r.status()} — ${r.url().replace(BASE, '')}`);
  });
  page.on('requestfailed', (r) => {
    problems.push(`request failed — ${r.url().replace(BASE, '')} (${r.failure()?.errorText})`);
  });
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`console error — ${m.text().slice(0, 140)}`);
  });

  let done = 0;
  for (const url of urls) {
    try {
      await page.goto(BASE + url, { waitUntil: 'load', timeout: 45000 });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(200);

      const r = await page.evaluate(() => {
        const de = document.documentElement;
        const imgs = [...document.querySelectorAll('img')];
        return {
          placeholders: imgs
            .filter((i) => (i.currentSrc || i.src).includes('placeholder.svg'))
            .map((i) => i.alt.slice(0, 50)),
          broken: imgs
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.getAttribute('src')),
          overflow: de.scrollWidth > de.clientWidth + 1,
          scrollW: de.scrollWidth,
          clientW: de.clientWidth,
        };
      });

      r.placeholders.forEach((a) => problems.push(`placeholder on ${url} — "${a}"`));
      r.broken.forEach((s) => problems.push(`broken image on ${url} — ${s}`));
      if (r.overflow) problems.push(`overflow on ${url} — ${r.scrollW}px in ${r.clientW}px`);
    } catch (e) {
      problems.push(`could not load ${url} — ${e.message.split('\n')[0]}`);
    }

    done++;
    if (done % 30 === 0) console.log(`  ...${done}/${urls.length}`);
  }

  await browser.close();

  console.log(`${'='.repeat(52)}\n  audited ${done} pages`);
  const unique = [...new Set(problems)];
  if (unique.length) {
    console.log(`\n  ISSUES (${unique.length}):`);
    unique.slice(0, 40).forEach((x) => console.log('   ! ' + x));
    if (unique.length > 40) console.log(`   ... and ${unique.length - 40} more`);
    process.exitCode = 1;
  } else {
    console.log('  No placeholders, broken images, bad responses, overflow or console errors.\n');
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
