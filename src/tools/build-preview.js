#!/usr/bin/env node
/* ==========================================================================
   Builds a PORTABLE copy of the site into preview/.
   Identical content, but every root-absolute URL is rewritten to a relative
   one, so the whole site can be opened from a folder or a static sandbox
   that is not mounted at a domain root.

   The real deployment always uses dist/ (root-absolute URLs are correct
   there, and keep the canonical/sitemap story clean).

   Run:  npm run preview
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const DIST = path.join(ROOT, 'dist');
const PREVIEW = path.join(ROOT, 'preview');

/* Rebuild dist first so preview can never drift from it. */
execFileSync(process.execPath, [path.join(ROOT, 'src', 'build.js')], { stdio: 'inherit' });

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (fs.existsSync(PREVIEW)) fs.rmSync(PREVIEW, { recursive: true, force: true });
fs.mkdirSync(PREVIEW, { recursive: true });

/** Depth of a file's directory below dist, e.g. 'a/b/index.html' -> 2 */
function depthOf(relPath) {
  const parts = relPath.split('/');
  return parts.length - 1;
}

/** Turn '/visa-services/uk-visa/' into a path relative to a page at `depth`. */
function toRelative(absUrl, depth) {
  const prefix = depth === 0 ? '' : '../'.repeat(depth);

  // split off any hash / query so they survive the rewrite
  const hashIdx = absUrl.search(/[#?]/);
  const tail = hashIdx === -1 ? '' : absUrl.slice(hashIdx);
  let target = hashIdx === -1 ? absUrl : absUrl.slice(0, hashIdx);

  target = target.replace(/^\//, '');           // drop leading slash
  if (target === '') target = 'index.html';      // site root
  else if (target.endsWith('/')) target += 'index.html';

  const out = prefix + target;
  return (out === '' ? 'index.html' : out) + tail;
}

const ATTR_RE = /\b(href|src|data-url|data-success-url)="(\/[^"]*)"/g;

let rewritten = 0;
let pages = 0;

for (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const dest = path.join(PREVIEW, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  if (!rel.endsWith('.html')) {
    fs.copyFileSync(file, dest);
    continue;
  }

  pages++;
  const depth = depthOf(rel);
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(ATTR_RE, (match, attr, url) => {
    // '//example.com' is protocol-relative, not a site path
    if (url.startsWith('//')) return match;
    rewritten++;
    return `${attr}="${toRelative(url, depth)}"`;
  });

  // the inline image fallback in the onerror handler
  html = html.replace(
    /this\.src='\/assets\/img\/placeholder\.svg'/g,
    () => `this.src='${toRelative('/assets/img/placeholder.svg', depth)}'`
  );

  fs.writeFileSync(dest, html, 'utf8');
}

console.log(`\nPreview build`);
console.log(`  pages rewritten  ${pages}`);
console.log(`  URLs rewritten   ${rewritten}`);
console.log(`  output           ${PREVIEW}\n`);
