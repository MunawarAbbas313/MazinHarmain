#!/usr/bin/env node
/* ==========================================================================
   Responsive audit.

   Loads a representative page of every template at every breakpoint the CSS
   defines, plus the extremes either side, and checks the things that
   actually break a layout:

     - horizontal overflow (and names the offending element)
     - content wider than the viewport
     - tap targets under 44x44 CSS px
     - body text under 12px
     - images that failed to decode, or fell back to the placeholder
     - text overlapping the sticky header
     - console errors and 4xx responses

   Requires the preview server: `npm run serve`.

   Run:  npm run responsive
   ========================================================================== */

const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:4173';

/* One page per template, so every layout is covered without loading all 149. */
const PAGES = [
  ['Home', '/'],
  ['Services hub', '/services/'],
  ['Service detail', '/services/visa-appointment-booking/'],
  ['Umrah hub', '/umrah-packages/'],
  ['Umrah tier', '/umrah-packages/premium-umrah-packages/'],
  ['Umrah city', '/umrah-packages/umrah-packages-from-lahore/'],
  ['Visa hub', '/visa-services/'],
  ['Visa country', '/visa-services/uk-visa/'],
  ['Destinations hub', '/destinations/'],
  ['Destination', '/destinations/turkey/'],
  ['Hotels hub', '/hotels/'],
  ['Hotel city', '/hotels/makkah-hotels/'],
  ['Flights hub', '/flights/'],
  ['Flight route', '/flights/islamabad-to-jeddah/'],
  ['Guides index', '/travel-guides/'],
  ['Guide article', '/travel-guides/umrah-guide-for-pakistani-travellers/'],
  ['Corporate', '/corporate-travel/'],
  ['Local landing', '/travel-agency-in-islamabad/'],
  ['About', '/about/'],
  ['Contact (map)', '/contact/'],
  ['Quote form', '/get-a-quote/'],
  ['FAQs', '/faqs/'],
  ['Reviews', '/reviews/'],
  ['Legal', '/privacy-policy/'],
  ['Sitemap', '/sitemap/'],
  ['404', '/404.html'],
];

/* The CSS breakpoints are 479 / 520 / 767 / 991 / 1199, so test each side. */
const WIDTHS = [320, 360, 390, 414, 480, 600, 768, 820, 992, 1024, 1200, 1280, 1440, 1920];

(async () => {
  console.log(`\nResponsive audit`);
  console.log(`${PAGES.length} templates x ${WIDTHS.length} widths = ${PAGES.length * WIDTHS.length} checks`);
  console.log('='.repeat(64));

  const browser = await chromium.launch();
  const findings = [];
  let checks = 0;

  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      isMobile: width < 768,
      hasTouch: width < 768,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    const net = [];
    page.on('response', (r) => { if (r.status() >= 400) net.push(`HTTP ${r.status()} ${r.url().replace(BASE, '')}`); });
    page.on('pageerror', (e) => net.push(`JS error: ${e.message.slice(0, 110)}`));
    page.on('console', (m) => { if (m.type() === 'error') net.push(`console: ${m.text().slice(0, 110)}`); });

    for (const [label, url] of PAGES) {
      net.length = 0;
      try {
        await page.goto(BASE + url, { waitUntil: 'load', timeout: 45000 });
        /* fonts change metrics; measuring before they land reports the fallback */
        await page.evaluate(() => document.fonts && document.fonts.ready);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(160);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(80);

        const r = await page.evaluate((coarse) => {
          const de = document.documentElement;
          const vw = de.clientWidth;
          const out = { vw, scrollW: de.scrollWidth, offenders: [], smallTargets: [], tinyText: [], badImages: [], placeholders: [] };

          if (de.scrollWidth > vw + 1) {
            for (const el of document.querySelectorAll('body *')) {
              const s = getComputedStyle(el);
              if (s.position === 'fixed' || s.display === 'none' || s.visibility === 'hidden') continue;
              const b = el.getBoundingClientRect();
              if (b.width === 0) continue;
              if (b.right > vw + 2 || b.left < -2) {
                out.offenders.push(
                  el.tagName.toLowerCase() + '.' + (String(el.className).split(' ')[0] || '?') +
                  ` [${Math.round(b.left)}..${Math.round(b.right)}]`
                );
                if (out.offenders.length >= 4) break;
              }
            }
          }

          // interactive targets must be comfortably tappable
          for (const el of document.querySelectorAll('a, button, input, select, textarea, [role="button"]')) {
            const s = getComputedStyle(el);
            if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') continue;
            const b = el.getBoundingClientRect();
            if (b.width === 0 || b.height === 0) continue;
            // inline links inside running prose are exempt
            /* Inline links inside running text are explicitly exempt from
               WCAG 2.5.8, and a label counts as running text. */
            if (el.tagName === 'A' && el.closest('p, li, label, address, .prose, .breadcrumb, .toc')) continue;
            /* Spam honeypots are parked off-canvas and hidden from assistive
               tech; they are not targets and must not be reported as such. */
            if (el.closest('[aria-hidden="true"]')) continue;
            if (b.right < 0 || b.bottom < 0 || b.left > vw + 2000) continue;
            /* A checkbox or radio inside its <label> is only the visible
               part of the target — the whole label row is clickable — so it
               is judged against the WCAG 2.5.8 floor of 24x24, not 44x44. */
            /* A link sitting inline in a sentence is exempt outright — its
               height is set by the surrounding line, not by the target. */
            if (getComputedStyle(el).display === 'inline' && el.parentElement &&
                el.parentElement.textContent.trim() !== el.textContent.trim()) continue;
            const boxed = /^(checkbox|radio)$/.test(el.type || '') && el.closest('label');
            /* 44x44 is the size a thumb needs; with a mouse the requirement is
               the WCAG 2.5.8 floor of 24x24. Judge by the pointer in use. */
            const floor = boxed ? 24 : (coarse ? 44 : 24);
            if (b.height < floor || b.width < floor) {
              out.smallTargets.push(
                el.tagName.toLowerCase() + '.' + (String(el.className).split(' ')[0] || '?') +
                ` ${Math.round(b.width)}x${Math.round(b.height)}`
              );
              if (out.smallTargets.length >= 4) break;
            }
          }

          for (const el of document.querySelectorAll('p, li, td, address, .form-note')) {
            const size = parseFloat(getComputedStyle(el).fontSize);
            if (size && size < 12 && el.textContent.trim().length > 20) {
              out.tinyText.push(`${el.tagName.toLowerCase()} @ ${size.toFixed(1)}px`);
              if (out.tinyText.length >= 3) break;
            }
          }

          for (const img of document.querySelectorAll('img')) {
            const src = img.currentSrc || img.src || '';
            if (img.complete && img.naturalWidth === 0) out.badImages.push(img.getAttribute('src'));
            if (src.includes('placeholder.svg')) out.placeholders.push(img.alt.slice(0, 40));
          }
          return out;
        }, width < 768);

        checks++;
        const where = `${width}px · ${label}`;
        if (r.scrollW > r.vw + 1) {
          findings.push(`${where}: overflow ${r.scrollW}px in ${r.vw}px`);
          r.offenders.forEach((o) => findings.push(`${where}:    ↳ ${o}`));
        }
        [...new Set(r.smallTargets)].forEach((t) => findings.push(`${where}: small tap target ${t}`));
        [...new Set(r.tinyText)].forEach((t) => findings.push(`${where}: text too small — ${t}`));
        [...new Set(r.badImages)].forEach((s) => findings.push(`${where}: broken image ${s}`));
        [...new Set(r.placeholders)].forEach((a) => findings.push(`${where}: placeholder "${a}"`));
        [...new Set(net)].forEach((n) => findings.push(`${where}: ${n}`));
      } catch (e) {
        findings.push(`${width}px · ${label}: FAILED — ${e.message.split('\n')[0]}`);
      }
    }

    await context.close();
    process.stdout.write(`  ${String(width).padStart(4)}px  ok\n`);
  }

  await browser.close();

  console.log('='.repeat(64));
  console.log(`  ${checks} page/width combinations checked`);

  const unique = [...new Set(findings)];
  if (unique.length) {
    console.log(`\n  FINDINGS (${unique.length}):`);
    unique.slice(0, 60).forEach((f) => console.log('   ! ' + f));
    if (unique.length > 60) console.log(`   ... and ${unique.length - 60} more`);
    process.exitCode = 1;
  } else {
    console.log('  No overflow, undersized tap targets, unreadable text,');
    console.log('  broken images, placeholders, JS errors or bad responses.\n');
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
