/* ==========================================================================
   Asset cache-busting.

   vercel.json serves /assets/* with `max-age=31536000, immutable` — a year,
   never revalidated. The filenames do not change between builds, so without
   this a returning visitor keeps last year's stylesheet while the HTML
   around it updates: new markup, old CSS, broken page.

   Appending a hash of the file's own bytes makes each build a different URL
   and therefore a different cache entry, which is what lets the long
   immutable cache stay safe.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..', '..');

/* One read per asset per build, not one per page. */
const cache = new Map();

/**
 * '/assets/css/styles.css' -> '/assets/css/styles.css?v=1a2b3c4d'
 * A missing file returns the plain URL: a stale cache is a smaller problem
 * than a build that dies over an asset that has not been generated yet.
 */
function asset(url) {
  if (cache.has(url)) return cache.get(url);

  let out = url;
  try {
    const bytes = fs.readFileSync(path.join(ROOT, url.replace(/^\/+/, '')));
    out = `${url}?v=${crypto.createHash('sha1').update(bytes).digest('hex').slice(0, 8)}`;
  } catch (_) {
    /* fall through to the unhashed URL */
  }

  cache.set(url, out);
  return out;
}

/**
 * Does an asset exist in the repo? Checked at build time rather than guessed
 * at, so dropping a file in and rebuilding is the whole installation step.
 * Returns the public URL (hashed) or '' when the file is not there.
 */
function assetIfPresent(url) {
  try {
    fs.accessSync(path.join(ROOT, url.replace(/^\/+/, '')));
  } catch (_) {
    return '';
  }
  return asset(url);
}

/** First of several candidate paths that actually exists, else ''. */
function firstAsset(urls) {
  for (const url of urls) {
    const hit = assetIfPresent(url);
    if (hit) return hit;
  }
  return '';
}

module.exports = { asset, assetIfPresent, firstAsset };
