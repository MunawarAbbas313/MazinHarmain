#!/usr/bin/env node
/* ==========================================================================
   Static site build.
   Renders every page to dist/ as real HTML — no client-side routing, no
   JavaScript needed to see content. That is what makes the site indexable.

   Run:  npm run build
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const site = require('./data/site');
const redirects = require('./data/redirects');
const { asset } = require('./lib/assets');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ASSETS = path.join(ROOT, 'assets');

/* ---------------------------------------------------------------- utils */
function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/* Developer notes live alongside the assets but must not ship. */
/* Master artwork and working files stay in the repo for regeneration but
   must never be published. */
const SKIP_ASSETS = /^(README\.md|\.DS_Store|Thumbs\.db|logo-source\..*|.*\.psd|.*\.ai)$/i;

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_ASSETS.test(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/** '/visa-services/uk-visa/' -> dist/visa-services/uk-visa/index.html */
function outputPathFor(page) {
  if (page.rawPath) return path.join(DIST, page.rawPath);
  const clean = page.url.replace(/^\/+|\/+$/g, '');
  return clean ? path.join(DIST, clean, 'index.html') : path.join(DIST, 'index.html');
}

/* ------------------------------------------------------------------------
   Cache-busting, applied to the finished HTML rather than asked of every
   template.

   /assets/* is served with `max-age=31536000, immutable`, so a URL the
   browser has already seen is never fetched again for a year. Only the brand
   artwork was going through asset(); every photograph was emitted as a bare
   path. Replacing a photograph therefore changed nothing for anyone who had
   already loaded the page — they kept the old picture indefinitely, which is
   exactly what kept happening during the September 2026 review.

   Doing it here means a template cannot forget. Already-hashed URLs are left
   alone, and so is anything that is not a real file on disk.
   ------------------------------------------------------------------------ */
const ASSET_URL = /(["'(])(\/assets\/[A-Za-z0-9._\/-]+?\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico|css|js|woff2?|mp4|webm|json|txt|xml|pdf))(?=["')\s])/g;

function versionAssets(html) {
  return html.replace(ASSET_URL, (match, open, url) => open + asset(url));
}

function writePage(page) {
  const file = outputPathFor(page);
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, versionAssets(page.html), 'utf8');
  return file;
}

/* ------------------------------------------------------------ collect */
const builders = [
  ['home', require('./pages/home')],
  ['services', require('./pages/services')],
  ['umrah', require('./pages/umrah')],
  ['visa', require('./pages/visa')],
  ['destinations', require('./pages/destinations')],
  ['hotels', require('./pages/hotels')],
  ['flights', require('./pages/flights')],
  ['guides', require('./pages/guides')],
  ['local', require('./pages/local')],
  ['static', require('./pages/static')],
  ['legal', require('./pages/legal')],
];

function collect() {
  const pages = [];
  const counts = {};
  for (const [name, build] of builders) {
    const produced = build();
    counts[name] = produced.length;
    pages.push(...produced);
  }
  return { pages, counts };
}

/* ------------------------------------------------------- sitemap/robots */
const xmlEscape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * Pull the photographs out of a rendered page so the sitemap can declare
 * them. Image search is a real traffic source for a travel agency, and the
 * caption comes from the alt text we already write for accessibility.
 */
/* Alt text in the HTML is already entity-escaped. Decode it before the XML
   escape, or "&amp;" becomes "&amp;amp;" in the sitemap. */
const htmlDecode = (s) =>
  String(s)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

function imagesIn(html) {
  const found = new Map();
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    const src = (tag.match(/\bsrc="([^"]+)"/) || [])[1];
    if (!src || !src.startsWith('/assets/img/')) continue;
    if (src.endsWith('.svg')) continue;            // placeholders and icons
    const alt = htmlDecode((tag.match(/\balt="([^"]*)"/) || [])[1] || '');
    if (!found.has(src)) found.set(src, alt);
  }
  return [...found.entries()].slice(0, 8);          // Google reads plenty; 8 is ample
}

function buildSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);

  const urls = pages
    .filter((p) => !p.skipSitemap)
    .map((p) => {
      const file = outputPathFor(p);
      let images = [];
      try {
        images = imagesIn(fs.readFileSync(file, 'utf8'));
      } catch (_) { /* page not written yet */ }

      const imageTags = images
        .map(
          ([src, alt]) => `
    <image:image>
      <image:loc>${site.url}${src}</image:loc>${alt ? `
      <image:title>${xmlEscape(alt)}</image:title>` : ''}
    </image:image>`
        )
        .join('');

      return `  <url>
    <loc>${site.url}${p.url}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
    <changefreq>${p.changefreq || 'monthly'}</changefreq>
    <priority>${p.priority || '0.7'}</priority>${imageTags}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

/**
 * RSS feed for the travel guides. Cheap to produce, and it gives the
 * articles a distribution channel beyond search.
 */
function buildFeed() {
  const guides = require('./data/guides');
  const now = new Date().toUTCString();

  const items = guides
    .map((g) => {
      const link = `${site.url}/travel-guides/${g.slug}/`;
      return `    <item>
      <title>${xmlEscape(g.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(g.date + 'T09:00:00Z').toUTCString()}</pubDate>
      <category>${xmlEscape(g.category)}</category>
      <description>${xmlEscape(g.excerpt)}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.name)} — Travel Guides</title>
    <link>${site.url}/travel-guides/</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Umrah, Hajj, visa and destination guides for Pakistani travellers.</description>
    <language>en-pk</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function buildRobots() {
  return `# robots.txt for ${site.name}
User-agent: *
Allow: /

# Nothing here is private, but these add no value to an index
Disallow: /thank-you/

# Common bad-bot / scraper blocks can be added here if needed

Sitemap: ${site.url}/sitemap.xml

# Travel guides feed
# ${site.url}/feed.xml
`;
}

/* ------------------------------------------------------- static extras */
/* A drawn placeholder favicon used to live here and ship whenever the real
   .ico was missing. It was a different logo from the client's, and it reached
   the browser tab silently. Deleted along with its fallback. */

/* Branded fallback used wherever a photograph has not been supplied yet. */
const PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="Mazin Haramain Tours and Travels">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a4a34"/>
      <stop offset="1" stop-color="#063528"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <g opacity="0.14" fill="none" stroke="#c79a3e" stroke-width="2">
    <circle cx="400" cy="300" r="150"/>
    <circle cx="400" cy="300" r="200"/>
    <circle cx="400" cy="300" r="250"/>
  </g>
  <g transform="translate(400 268)">
    <path d="M0-58 58-25v66L0 74-58 41v-66z" fill="none" stroke="#c79a3e" stroke-width="3" stroke-linejoin="round"/>
    <path d="M0-32c15 0 27 12 27 27 0 18-27 42-27 42s-27-24-27-42c0-15 12-27 27-27z" fill="#c79a3e"/>
  </g>
  <text x="400" y="420" font-family="Georgia, serif" font-size="30" fill="#ffffff" text-anchor="middle" letter-spacing="3">MAZIN HARAMAIN</text>
  <text x="400" y="452" font-family="Arial, sans-serif" font-size="14" fill="#c79a3e" text-anchor="middle" letter-spacing="6">TOURS &amp; TRAVELS</text>
</svg>
`;

function buildManifest() {
  return JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      description: site.description,
      start_url: '/',
      display: 'standalone',
      background_color: '#faf7f0',
      theme_color: '#0a4a34',
      icons: [
        /* Hashed for the same reason as the favicons: regenerated artwork
           has to actually reach a returning visitor. */
        { src: asset('/assets/img/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: asset('/assets/img/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: asset('/assets/img/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' },
      ],
    },
    null,
    2
  );
}

/* Server config for Apache/cPanel hosting — clean URLs, caching, security. */
const HTACCESS = `# ${site.name} — Apache configuration

ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Force www (remove this block if the canonical domain is non-www)
  RewriteCond %{HTTP_HOST} !^www\\. [NC]
  RewriteCond %{HTTP_HOST} !^localhost [NC]
  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Add the trailing slash directory URLs expect
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteCond %{REQUEST_URI} !\\.[a-zA-Z0-9]{2,5}$
  RewriteRule ^(.*)$ /$1/ [L,R=301]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
`;

/* Netlify / Vercel style headers + redirects, harmless elsewhere. */
const NETLIFY_HEADERS = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

/* Netlify-style redirect table, generated from src/data/redirects.js so the
   retired URLs cannot drift out of sync with the host config. Vercel reads
   its own copy from vercel.json; qa.js checks the two agree. */
const REDIRECTS_FILE =
  redirects.map((r) => [r.from, r.to, r.status].join('  ')).join('\n') + '\n';

/* --------------------------------------------------------------- build */
function run() {
  const started = Date.now();
  console.log(`\nBuilding ${site.name}\n${'='.repeat(46)}`);

  rimraf(DIST);
  ensureDir(DIST);

  const { pages, counts } = collect();

  /* Duplicate-URL guard — catches a copy/paste slug mistake immediately. */
  const seen = new Map();
  for (const p of pages) {
    if (seen.has(p.url)) {
      throw new Error(`Duplicate page URL: ${p.url}`);
    }
    seen.set(p.url, true);
  }

  for (const page of pages) writePage(page);

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), buildSitemap(pages), 'utf8');
  fs.writeFileSync(path.join(DIST, 'feed.xml'), buildFeed(), 'utf8');
  fs.writeFileSync(path.join(DIST, 'robots.txt'), buildRobots(), 'utf8');
  /* The tab icon is generated from the real brand mark by `npm run logo`;
     copy it to the root where browsers look for it by default. */
  const icoSrc = path.join(ASSETS, 'img', 'favicon.ico');
  if (fs.existsSync(icoSrc)) fs.copyFileSync(icoSrc, path.join(DIST, 'favicon.ico'));
  /* There is deliberately NO fallback. The old one wrote a drawn placeholder
     mark when the .ico was missing, which is how a logo that is not the
     client's used to reach the tab without anything failing. A missing icon
     is a visible, fixable absence; the wrong logo is not. Run `npm run icons`. */
  else console.warn('  ! favicon.ico missing — run `npm run icons`');
  fs.writeFileSync(path.join(DIST, 'site.webmanifest'), buildManifest(), 'utf8');
  fs.writeFileSync(path.join(DIST, '.htaccess'), HTACCESS, 'utf8');
  fs.writeFileSync(path.join(DIST, '_headers'), NETLIFY_HEADERS, 'utf8');
  fs.writeFileSync(path.join(DIST, '_redirects'), REDIRECTS_FILE, 'utf8');

  copyDir(ASSETS, path.join(DIST, 'assets'));
  ensureDir(path.join(DIST, 'assets', 'img'));
  fs.writeFileSync(path.join(DIST, 'assets', 'img', 'placeholder.svg'), PLACEHOLDER, 'utf8');

  /* ---- report ---- */
  const indexed = pages.filter((p) => !p.skipSitemap).length;
  console.log('Pages generated by section:');
  for (const [name, n] of Object.entries(counts)) {
    console.log(`  ${name.padEnd(14)} ${String(n).padStart(4)}`);
  }
  console.log(`${'-'.repeat(46)}`);
  console.log(`  ${'TOTAL'.padEnd(14)} ${String(pages.length).padStart(4)} pages`);
  console.log(`  ${'In sitemap'.padEnd(14)} ${String(indexed).padStart(4)} URLs`);
  console.log(`\nOutput: ${DIST}`);
  console.log(`Done in ${Date.now() - started}ms\n`);

  return pages;
}

if (require.main === module) {
  try {
    run();
  } catch (err) {
    console.error('\nBUILD FAILED:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

module.exports = { run, collect };
