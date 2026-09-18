#!/usr/bin/env node
/* ==========================================================================
   Screenshots the built site with a real browser, so the layout can actually
   be reviewed instead of guessed at.

   Requires the preview server to be running (npm run serve).

   Usage:
     node src/tools/shoot.js                       full homepage, desktop + mobile
     node src/tools/shoot.js /flights/             a specific path
     node src/tools/shoot.js / .hero               just one element
   ========================================================================== */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = process.env.SHOT_DIR ||
  path.join('C:', 'Users', 'user', 'AppData', 'Local', 'Temp', 'claude',
    'd--WEBSITE-UMRAH', '14c62f93-8db9-4dac-b54e-47b9c523a825', 'scratchpad', 'shots');

const BASE = process.env.BASE_URL || 'http://localhost:4173';

const target = process.argv[2] || '/';
const selector = process.argv[3] || null;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, mobile: true },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const slug = (target.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home');

  const problems = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: !!vp.mobile,
      hasTouch: !!vp.mobile,
    });
    const page = await context.newPage();

    page.on('console', (m) => {
      if (m.type() === 'error') problems.push(`[${vp.name}] console: ${m.text().slice(0, 160)}`);
    });
    page.on('requestfailed', (r) => {
      problems.push(`[${vp.name}] failed request: ${r.url().replace(BASE, '')} (${r.failure()?.errorText})`);
    });
    page.on('response', (r) => {
      if (r.status() >= 400) problems.push(`[${vp.name}] HTTP ${r.status()}: ${r.url().replace(BASE, '')}`);
    });

    await page.goto(BASE + target, { waitUntil: 'networkidle', timeout: 60000 });
    // let lazy images and reveal animations settle
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const file = path.join(OUT, `${slug}-${vp.name}.png`);
    if (selector) {
      const el = await page.$(selector);
      if (!el) { console.log(`  ! selector not found: ${selector}`); }
      else await el.screenshot({ path: file });
    } else {
      await page.screenshot({ path: file, fullPage: true });
    }
    console.log(`  ${file}`);

    /* Layout sanity that only a browser can answer */
    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth > de.clientWidth + 1;
      const offenders = [];
      if (overflow) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.right > de.clientWidth + 2 && r.width > 0) {
            offenders.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} (right ${Math.round(r.right)})`);
            if (offenders.length > 5) break;
          }
        }
      }
      const imgs = [...document.querySelectorAll('img')];
      return {
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        overflow,
        offenders,
        brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
        placeholderImages: imgs.filter((i) => (i.currentSrc || i.src).includes('placeholder.svg')).map((i) => i.alt.slice(0, 40)),
      };
    });

    if (metrics.overflow) {
      problems.push(`[${vp.name}] horizontal overflow: ${metrics.scrollW}px content in ${metrics.clientW}px viewport`);
      metrics.offenders.forEach((o) => problems.push(`[${vp.name}]   overflowing: ${o}`));
    }
    metrics.brokenImages.forEach((s) => problems.push(`[${vp.name}] broken image: ${s}`));
    metrics.placeholderImages.forEach((a) => problems.push(`[${vp.name}] placeholder shown: "${a}"`));

    await context.close();
  }

  await browser.close();

  if (problems.length) {
    console.log('\n  Issues found:');
    [...new Set(problems)].forEach((p) => console.log('   ! ' + p));
  } else {
    console.log('\n  No layout, image or console problems detected.');
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
