/* ==========================================================================
   Country code lookup for flag graphics.

   WHY THIS EXISTS: the site originally used emoji flags (🇬🇧). Windows has no
   font containing emoji flag glyphs, so every Windows visitor — which is most
   of the client's desktop audience in Pakistan — saw the bare regional
   indicator letters instead: "GB", "US", "CA". Real SVG flags render
   identically on every platform.

   Files live in assets/img/flags/<code>.svg, fetched by
   `npm run flags` (src/tools/fetch-flags.js).
   ========================================================================== */

/* Visa page slug -> ISO 3166-1 alpha-2 (or 'eu' for the Schengen area). */
const visaFlagCodes = {
  'uk-visa': 'gb',
  'usa-visa': 'us',
  'canada-visa': 'ca',
  'schengen-visa': 'eu',
  'uae-visa': 'ae',
  'turkey-visa': 'tr',
  'azerbaijan-visa': 'az',
  'saudi-arabia-visa': 'sa',

  'germany-visa': 'de',
  'france-visa': 'fr',
  'italy-visa': 'it',
  'spain-visa': 'es',
  'netherlands-visa': 'nl',
  'greece-visa': 'gr',
  'portugal-visa': 'pt',
  'austria-visa': 'at',
  'switzerland-visa': 'ch',
  'sweden-visa': 'se',
  'norway-visa': 'no',
  'finland-visa': 'fi',
  'poland-visa': 'pl',
  'hungary-visa': 'hu',
  'bulgaria-visa': 'bg',
  'slovakia-visa': 'sk',
  'denmark-visa': 'dk',
  'czech-republic-visa': 'cz',
  'belgium-visa': 'be',
  'ireland-visa': 'ie',

  'malaysia-visa': 'my',
  'thailand-visa': 'th',
  'singapore-visa': 'sg',
  'china-visa': 'cn',
  'japan-visa': 'jp',
  'australia-visa': 'au',
  'new-zealand-visa': 'nz',
  'qatar-visa': 'qa',
  'oman-visa': 'om',
  'bahrain-visa': 'bh',
  'georgia-visa': 'ge',
  'uzbekistan-visa': 'uz',
  'indonesia-visa': 'id',
  'sri-lanka-visa': 'lk',
  'maldives-visa': 'mv',
  'egypt-visa': 'eg',
  'morocco-visa': 'ma',
  'south-korea-visa': 'kr',
  'vietnam-visa': 'vn',
};

/* Destination slug -> ISO code. */
const destinationFlagCodes = {
  turkey: 'tr',
  azerbaijan: 'az',
  dubai: 'ae',
  malaysia: 'my',
  thailand: 'th',
  maldives: 'mv',
  'united-kingdom': 'gb',
  europe: 'eu',
  'saudi-arabia': 'sa',
  singapore: 'sg',
  georgia: 'ge',
  uzbekistan: 'uz',
  'sri-lanka': 'lk',
};

/** Every code the build needs a file for. */
const allCodes = [...new Set([
  ...Object.values(visaFlagCodes),
  ...Object.values(destinationFlagCodes),
])].sort();

/**
 * Renders a flag image, or nothing at all if we have no code for it —
 * never a broken glyph and never a broken image.
 */
function flagImg(code, label, size = 28) {
  if (!code) return '';
  return `<img class="flag" src="/assets/img/flags/${code}.svg" alt="" ` +
    `width="${size}" height="${Math.round((size * 3) / 4)}" loading="lazy" decoding="async" ` +
    `title="${String(label || '').replace(/"/g, '&quot;')}">`;
}

module.exports = { visaFlagCodes, destinationFlagCodes, allCodes, flagImg };
