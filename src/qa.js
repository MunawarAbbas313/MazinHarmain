#!/usr/bin/env node
/* ==========================================================================
   Build QA.
   Walks every generated page and fails loudly on the things that actually
   break a site in production: dead internal links, missing or duplicated SEO
   tags, template leaks, malformed JSON-LD and unclosed markup.

   Run:  npm run qa     (build first)
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');

const errors = [];
const warnings = [];
const stats = { pages: 0, links: 0, internalLinks: 0, images: 0, words: 0 };

function fail(file, msg) { errors.push(`${file}: ${msg}`); }
function warn(file, msg) { warnings.push(`${file}: ${msg}`); }

/* Titles and descriptions are stored HTML-escaped. Measure what a search
   engine actually renders, not the escaped source — otherwise every "&"
   counts as five characters. */
function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&middot;/g, '·')
    .replace(/&nbsp;/g, ' ');
}

/* ------------------------------------------------------------- walk dist */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

/* Every URL the site actually serves. */
const servedUrls = new Set();
for (const f of allFiles) {
  const rel = path.relative(DIST, f).split(path.sep).join('/');
  servedUrls.add('/' + rel);
  if (rel.endsWith('/index.html')) {
    servedUrls.add('/' + rel.slice(0, -'index.html'.length)); // '/about/'
  }
  if (rel === 'index.html') servedUrls.add('/');
}

/* --------------------------------------------------------------- checks */
function checkPage(file) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const raw = fs.readFileSync(file, 'utf8');
  /* Comments are not markup. Leaving them in makes every check that scans
     for tags — img/alt, tag balance, content model — report on prose the
     browser never parses. */
  const html = raw.replace(/<!--[\s\S]*?-->/g, '');
  stats.pages++;
  stats.words += html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  /* --- template leaks --- */
  for (const leak of ['undefined', '[object Object]', 'NaN', '{{', '${']) {
    if (html.includes(leak)) {
      // 'undefined' can legitimately appear in prose; check attributes/text only
      const re = new RegExp(`(>|")[^<"]*${leak.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
      if (re.test(html)) fail(rel, `template leak: "${leak}"`);
    }
  }

  /* --- head essentials --- */
  const title = html.match(/<title>(.*?)<\/title>/s);
  if (!title) fail(rel, 'missing <title>');
  else {
    const t = decodeEntities(title[1]).trim();
    if (!t) fail(rel, 'empty <title>');
    if (t.length > 70) warn(rel, `title is ${t.length} chars (over 70)`);
    if (t.length < 20) warn(rel, `title is only ${t.length} chars`);
  }

  const desc = html.match(/<meta name="description" content="(.*?)">/s);
  if (!desc) fail(rel, 'missing meta description');
  else {
    const d = decodeEntities(desc[1]).trim();
    if (!d) fail(rel, 'empty meta description');
    if (d.length > 185) warn(rel, `meta description is ${d.length} chars (over 185)`);
    if (d.length < 70) warn(rel, `meta description is only ${d.length} chars`);
  }

  if (!/<link rel="canonical" href="https?:\/\/[^"]+">/.test(html)) fail(rel, 'missing canonical');
  if (!/<meta name="robots"/.test(html)) fail(rel, 'missing robots meta');
  if (!/<meta property="og:title"/.test(html)) fail(rel, 'missing og:title');
  if (!/<meta name="viewport"/.test(html)) fail(rel, 'missing viewport');
  if (!/<html lang="/.test(html)) fail(rel, 'missing lang attribute');

  /* --- headings --- */
  const h1s = html.match(/<h1[^>]*>/g) || [];
  if (h1s.length === 0) fail(rel, 'no <h1>');
  if (h1s.length > 1) fail(rel, `${h1s.length} <h1> tags (must be exactly 1)`);

  /* --- JSON-LD --- */
  const ldBlocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  if (!ldBlocks.length) fail(rel, 'no JSON-LD structured data');
  for (const block of ldBlocks) {
    const json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '');
    try {
      const parsed = JSON.parse(json.replace(/\\u003c/g, '<'));
      if (!parsed['@context']) fail(rel, 'JSON-LD missing @context');
    } catch (e) {
      fail(rel, `invalid JSON-LD: ${e.message}`);
    }
  }

  /* --- images need alt --- */
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  for (const img of imgs) {
    stats.images++;
    if (!/\balt=/.test(img)) fail(rel, `img without alt: ${img.slice(0, 90)}`);
  }

  /* --- links --- */
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of links) {
    stats.links++;
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    if (!href.startsWith('/')) {
      fail(rel, `relative link (should be root-absolute): ${href}`);
      continue;
    }
    stats.internalLinks++;
    const clean = href.split('#')[0].split('?')[0];
    if (!servedUrls.has(clean)) {
      fail(rel, `broken internal link: ${href}`);
    }
  }

  /* --- accessibility basics --- */
  const buttons = html.match(/<button\b[^>]*>\s*<\/button>/g) || [];
  if (buttons.length) warn(rel, `${buttons.length} empty button(s)`);

  /* --- crude tag balance on the main structural elements --- */
  for (const tag of ['div', 'section', 'main', 'article', 'aside', 'ul', 'ol', 'form']) {
    const open = (html.match(new RegExp(`<${tag}\\b`, 'g')) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (open !== close) fail(rel, `unbalanced <${tag}>: ${open} open, ${close} close`);
  }

  /* --- content model: a phrasing element must not wrap block content ---
     <span> containing <h3>/<p>/<div>/<ul> is invalid HTML. Browsers recover
     from it, but it silently breaks the DOM structure crawlers read. */
  const spanBlocks = [...html.matchAll(/<span\b[^>]*>(?:(?!<\/span>)[\s\S]){0,400}?<(h[1-6]|p|div|ul|ol|section|article)\b/g)];
  if (spanBlocks.length) {
    const tags = [...new Set(spanBlocks.map((m) => m[1]))].join(', ');
    fail(rel, `<span> wrapping block content (${tags}) — invalid content model`);
  }

  /* --- inline event handlers other than the image fallback --- */
  const handlers = [...html.matchAll(/\son(\w+)="/g)].map((m) => m[1]);
  const unexpected = handlers.filter((h) => !['error', 'load'].includes(h));
  if (unexpected.length) warn(rel, `inline handlers: ${[...new Set(unexpected)].join(', ')}`);
}

/* ------------------------------------------------------- sitemap checks */
function checkSitemap() {
  const file = path.join(DIST, 'sitemap.xml');
  if (!fs.existsSync(file)) { fail('sitemap.xml', 'missing'); return; }
  const xml = fs.readFileSync(file, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) fail('sitemap.xml', 'no URLs');

  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) fail('sitemap.xml', `duplicate URL: ${loc}`);
    seen.add(loc);
    const pathPart = loc.replace(/^https?:\/\/[^/]+/, '') || '/';
    if (!servedUrls.has(pathPart)) fail('sitemap.xml', `URL not generated: ${pathPart}`);
  }

  /* Every indexable page should be in the sitemap. */
  for (const f of htmlFiles) {
    const rel = path.relative(DIST, f).split(path.sep).join('/');
    const url = rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, '');
    const html = fs.readFileSync(f, 'utf8');
    if (/content="noindex/.test(html)) continue;
    if (!seen.has(`https://www.mazinharamain.com${url}`)) {
      warn('sitemap.xml', `indexable page missing from sitemap: ${url}`);
    }
  }
  console.log(`  sitemap.xml    ${locs.length} URLs`);
}


/* ------------------------------------------------- CSS class coverage ----
   Markup that references a class no stylesheet defines renders unstyled.
   That is not a cosmetic nit: it is how a redesign ships looking broken,
   so it fails the build rather than warning. Utility hooks that are
   intentionally style-free go in ALLOWED_UNSTYLED. */
const ALLOWED_UNSTYLED = new Set([
  'page-home',   // body identity hook, kept for page-scoped overrides
]);

function checkClassCoverage() {
  const sheets = allFiles.filter((f) => f.endsWith('.css'));
  if (!sheets.length) { fail('assets/css', 'no stylesheet in build output'); return; }

  const defined = new Set();
  for (const sheet of sheets) {
    const css = fs.readFileSync(sheet, 'utf8');
    for (const m of css.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)) defined.add(m[1]);
  }

  const missing = new Map();   // class -> example page
  for (const file of htmlFiles) {
    const rel = path.relative(DIST, file).split(path.sep).join('/');
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/class="([^"]+)"/g)) {
      for (const cls of m[1].trim().split(/\s+/)) {
        if (!cls || defined.has(cls) || ALLOWED_UNSTYLED.has(cls)) continue;
        if (!missing.has(cls)) missing.set(cls, rel);
      }
    }
  }

  for (const [cls, where] of missing) {
    fail(where, `class "${cls}" is used but no stylesheet defines it`);
  }
  console.log(`  css classes    ${defined.size} defined, ${missing.size} undefined`);
}

function checkExtras() {
  /* The tab icon ships as .ico once the real brand mark exists, and as .svg
     while the placeholder is in use. Either satisfies the requirement. */
  if (!fs.existsSync(path.join(DIST, 'favicon.ico')) &&
      !fs.existsSync(path.join(DIST, 'favicon.svg'))) {
    fail('favicon', 'no favicon.ico or favicon.svg in build output');
  }

  for (const f of ['robots.txt', 'site.webmanifest', '.htaccess',
                   'assets/css/styles.css', 'assets/js/main.js', 'assets/img/placeholder.svg', '404.html']) {
    if (!fs.existsSync(path.join(DIST, f))) fail(f, 'missing from build output');
  }
}

/* ------------------------------------------------------------------ run */
console.log('\nQA check\n' + '='.repeat(46));
htmlFiles.forEach(checkPage);
checkSitemap();
checkClassCoverage();
checkExtras();

console.log(`  pages          ${stats.pages}`);
console.log(`  links checked  ${stats.links} (${stats.internalLinks} internal)`);
console.log(`  images         ${stats.images}`);
console.log(`  words          ~${stats.words.toLocaleString()}`);
console.log('-'.repeat(46));

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.slice(0, 40).forEach((w) => console.log('  ! ' + w));
  if (warnings.length > 40) console.log(`  ... and ${warnings.length - 40} more`);
}

if (errors.length) {
  console.log(`\nERRORS (${errors.length}):`);
  errors.slice(0, 60).forEach((e) => console.log('  X ' + e));
  if (errors.length > 60) console.log(`  ... and ${errors.length - 60} more`);
  console.log('');
  process.exit(1);
}

console.log('\nNo errors found.\n');
