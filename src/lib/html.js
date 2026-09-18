/* ==========================================================================
   Small HTML helpers.
   Everything that reaches the page goes through esc()/attr() so a stray
   ampersand or quote in the content data can never produce invalid markup.
   ========================================================================== */

const AMP = /&(?!(?:[a-zA-Z][a-zA-Z0-9]{1,31}|#\d{1,7}|#[xX][0-9a-fA-F]{1,6});)/g;

/** Escape text for use inside an element. Keeps existing entities intact. */
function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(AMP, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Escape text for use inside a double-quoted attribute. */
function attr(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(AMP, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Turn a title into a URL-safe slug. */
function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Join class names, dropping falsy entries. */
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/** Render a list of items with a mapper, joined by newlines. */
function each(items, fn) {
  return (items || []).map(fn).join('\n');
}

/** Strip tags — used to build meta descriptions from body copy. */
function stripTags(html) {
  return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Truncate on a word boundary. */
function truncate(text, max = 158) {
  const clean = stripTags(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:]$/, '') + '…';
}

/** Readable date, e.g. "12 March 2026". */
function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

module.exports = { esc, attr, slugify, cx, each, stripTags, truncate, formatDate };
