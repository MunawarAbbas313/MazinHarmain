#!/usr/bin/env node
/* ==========================================================================
   Sources the site's photography from Pexels.

   Pexels licence: free to use, commercial use allowed, no attribution
   required, no permission needed. (https://www.pexels.com/license/)
   We still record every source URL and photographer in
   src/data/image-credits.json so the client has a full provenance trail.

   Two acquisition modes:
     CURATED  — a specific photo ID, chosen and visually verified for the
                landmark shots where getting the right building matters.
     AUTO     — a Pexels search, with results scored against required
                keywords in the image's own alt text.

   Images are cropped server-side by the Pexels CDN to the exact dimensions
   the layout needs, so nothing is downloaded larger than necessary and no
   image library is required.

   Run:  npm run images
         npm run images -- --force        re-fetch everything
         npm run images -- hero           only files matching "hero"
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..', '..');
const IMG = path.join(ROOT, 'assets', 'img');
const CREDITS_JSON = path.join(ROOT, 'src', 'data', 'image-credits.json');
const CREDITS_MD = path.join(ROOT, 'CREDITS.md');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const FILTER = args.find((a) => !a.startsWith('--')) || '';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const HERO = { w: 1920, h: 1080 };
const HERO_2X = { w: 2560, h: 1440 };   /* full-bleed heroes on a 2x display */
const FEATURE = { w: 1600, h: 1200 };   /* half-width section photographs */
const CARD = { w: 1200, h: 900 };
const WIDE = { w: 1600, h: 900 };

/* --------------------------------------------------------------------------
   CURATED — verified Pexels photo IDs.
   These are the shots where the subject must be exactly right: the Kaaba,
   Masjid an-Nabawi, and each destination's signature landmark.
   -------------------------------------------------------------------------- */
const CURATED = [
  { file: 'hero-kaaba.jpg',       id: 14440333, ...HERO, alt: 'Pilgrims performing tawaf around the Kaaba at Masjid al-Haram in Makkah' },
  { file: 'hero-kaaba-768.jpg',   id: 14440333, w: 768,  h: 432, alt: 'Pilgrims performing tawaf around the Kaaba at Masjid al-Haram in Makkah' },
  { file: 'hero-kaaba-1200.jpg',  id: 14440333, w: 1200, h: 675, alt: 'Pilgrims performing tawaf around the Kaaba at Masjid al-Haram in Makkah' },
  { file: 'hero-kaaba-1600.jpg',  id: 14440333, w: 1600, h: 900, alt: 'Pilgrims performing tawaf around the Kaaba at Masjid al-Haram in Makkah' },
  { file: 'hero-madinah.jpg',     id: 34246953, ...HERO, alt: 'Al-Masjid an-Nabawi in Madinah illuminated at twilight' },
  { file: 'hero-umrah.jpg',       id: 4118058,  ...WIDE, alt: 'Pilgrims gathered around the Kaaba at night during Umrah' },
  { file: 'visa-services.jpg',    id: 7235894,  ...FEATURE, alt: 'A passport, compass and travel planner laid out on a world map' },

  /* ---- Home hero rotation ------------------------------------------------
     The client asked the home page to stop leading on the Kaaba: the agency
     sells worldwide and a single religious image said otherwise. These five
     rotate instead. Makkah and Madinah photography still carries the Umrah
     sections further down the page, so that side of the business is not
     hidden — just no longer the only first impression.

     Curated rather than searched because Pexels now answers its search
     pages with HTTP 403; the photo CDN still serves fine. Listing the same
     id at four sizes is how hero-kaaba already builds its srcset, and it
     guarantees every size is the same photograph.
     -------------------------------------------------------------------- */
  { file: 'hero-flight.jpg',      id: 1911388, ...HERO,           alt: 'An airliner silhouetted against a sunset sky' },
  { file: 'hero-flight-768.jpg',  id: 1911388, w: 768,  h: 432,   alt: 'An airliner silhouetted against a sunset sky' },
  { file: 'hero-flight-1200.jpg', id: 1911388, w: 1200, h: 675,   alt: 'An airliner silhouetted against a sunset sky' },
  { file: 'hero-flight-1600.jpg', id: 1911388, w: 1600, h: 900,   alt: 'An airliner silhouetted against a sunset sky' },
  { file: 'hero-dubai.jpg',       id: 17865557, ...WIDE, alt: 'The Dubai skyline with the Burj Khalifa, United Arab Emirates' },
  { file: 'hero-istanbul.jpg',    id: 18165242, ...WIDE, alt: 'Istanbul seen from above the Bosphorus' },
  { file: 'hero-europe.jpg',      id: 11279691, ...WIDE, alt: 'The Grand Canal in Venice, Italy' },
  { file: 'hero-maldives.jpg',    id: 28843924, ...WIDE, alt: 'An island resort with overwater villas in the Maldives' },

  /* 2560-wide copies of every hero frame. A 1920 image on a 1440px viewport
     at devicePixelRatio 2 needs 2880 to look sharp, so 1920 was rendering
     soft on most modern laptops and phones — which is exactly the
     "losing its pixels" the client reported. */
  { file: 'hero-flight-2560.jpg',   id: 1911388,  ...HERO_2X, alt: 'An airliner silhouetted against a sunset sky' },
  { file: 'hero-dubai-2560.jpg',    id: 17865557, ...HERO_2X, alt: 'The Dubai skyline with the Burj Khalifa, United Arab Emirates' },
  { file: 'hero-istanbul-2560.jpg', id: 18165242, ...HERO_2X, alt: 'Istanbul seen from above the Bosphorus' },
  { file: 'hero-europe-2560.jpg',   id: 11279691, ...HERO_2X, alt: 'The Grand Canal in Venice, Italy' },
  { file: 'hero-maldives-2560.jpg', id: 28843924, ...HERO_2X, alt: 'An island resort with overwater villas in the Maldives' },

  /* Service card photography, at FEATURE size so the cards stay sharp. */
  { file: 'services/air-ticketing.jpg', id: 10062411, ...FEATURE, alt: 'An aircraft parked at an airport gate, seen through the terminal window' },

  /* Car rental, for the MyCab sister-company section and its service page. */
  { file: 'car-rental.jpg',       id: 116675,   ...FEATURE, alt: 'A white Range Rover parked on a driveway' },

  { file: 'destinations/turkey.jpg',         id: 13337127, ...CARD, alt: 'The Blue Mosque silhouetted against a sunset in Istanbul, Turkey' },
  { file: 'destinations/azerbaijan.jpg',     id: 17857195, ...CARD, alt: 'The Flame Towers and Baku cityscape at sunset, Azerbaijan' },
  { file: 'destinations/dubai.jpg',          id: 17865557, ...CARD, alt: 'Aerial view of the Dubai skyline with the Burj Khalifa' },
  { file: 'destinations/malaysia.jpg',       id: 462671,   ...CARD, alt: 'The Petronas Twin Towers illuminated at night in Kuala Lumpur' },
  { file: 'destinations/thailand.jpg',       id: 15199399, ...CARD, alt: 'The Grand Palace at Wat Phra Kaew in Bangkok, Thailand' },
  { file: 'destinations/maldives.jpg',       id: 30037393, ...CARD, alt: 'Luxury overwater villas above a turquoise lagoon in the Maldives' },
  { file: 'destinations/united-kingdom.jpg', id: 460672,   ...CARD, alt: 'Big Ben and Westminster Bridge over the Thames at sunset in London' },
  { file: 'destinations/europe.jpg',         id: 15452274, ...CARD, alt: 'Aerial view of the Paris cityscape with the Eiffel Tower' },
  { file: 'destinations/singapore.jpg',      id: 1842332,  ...CARD, alt: 'Marina Bay Sands and the Helix Bridge illuminated at night in Singapore' },

  { file: 'hotels/makkah-hotels.jpg',   id: 31339194, ...CARD, alt: 'Night view of the Kaaba and Masjid al-Haram in Makkah' },
  { file: 'hotels/madinah-hotels.jpg',  id: 34642005, ...CARD, alt: 'The Green Dome and minaret of the Prophet’s Mosque in Madinah' },
  { file: 'hotels/dubai-hotels.jpg',    id: 31033420, ...CARD, alt: 'Aerial view of Dubai Marina with its skyline and towers' },
  { file: 'hotels/istanbul-hotels.jpg', id: 27634399, ...CARD, alt: 'The Blue Mosque and its gardens in Istanbul, Turkey' },
  { file: 'hotels/baku-hotels.jpg',     id: 15236595, ...CARD, alt: 'A traditional street in Baku with the modern Flame Towers behind' },
  { file: 'hotels/london-hotels.jpg',   id: 31147777, ...CARD, alt: 'Big Ben and London red buses on Westminster Bridge' },
  { file: 'hotels/europe-hotels.jpg',   id: 19609871, ...CARD, alt: 'Panorama of Paris rooftops with the Eiffel Tower' },
  { file: 'destinations/saudi-arabia.jpg', id: 6099936, ...CARD, alt: 'The courtyard of Al-Masjid an-Nabawi in Madinah, Saudi Arabia' },
  { file: 'corporate-travel.jpg',          id: 6050133, ...FEATURE, alt: 'A business traveller in a suit walking through an airport with luggage' },
  { file: 'hotels/worldwide-hotels.jpg',   id: 695193,  ...CARD, alt: 'The spacious lobby of a luxury hotel' },
  { file: 'guides/uk-visit-visa-guide-from-pakistan.jpg',            id: 4173219,  ...CARD, alt: 'A traveller with a suitcase and passport in an airport corridor' },
  { file: 'guides/international-travel-checklist-from-pakistan.jpg', id: 12717154, ...CARD, alt: 'Travellers checking the departure board in an airport terminal' },

  { file: 'guides/umrah-guide-for-pakistani-travellers.jpg',       id: 4118058,  ...CARD, alt: 'Pilgrims gathered around the Kaaba during tawaf' },
  { file: 'guides/best-hotels-near-masjid-al-haram.jpg',           id: 31339194, ...CARD, alt: 'Masjid al-Haram in Makkah illuminated at night' },
  { file: 'guides/best-hotels-near-masjid-an-nabawi.jpg',          id: 27347927, ...CARD, alt: 'Rows of white canopies in the courtyard of Al-Masjid an-Nabawi, Madinah' },
  { file: 'guides/turkey-travel-guide-for-pakistani-tourists.jpg', id: 5700576,  ...CARD, alt: 'Hot air balloons rising over the rock formations of Cappadocia at sunrise' },
  { file: 'guides/dubai-visa-guide-from-pakistan.jpg',             id: 18069692, ...CARD, alt: 'Panoramic view of Dubai from the Burj Khalifa' },

  { file: 'destinations/georgia.jpg',   id: 31773992, ...CARD, alt: 'Sunset over the Tbilisi cityscape in Georgia' },
  { file: 'destinations/sri-lanka.jpg', id: 4769075,  ...CARD, alt: 'A train crossing the Nine Arch Bridge at Ella, Sri Lanka' },
  { file: 'destinations/uzbekistan.jpg', id: 19439173, ...CARD, alt: 'The tiled domes and mosaic facades of Shah-i-Zinda in Samarkand, Uzbekistan' },
  { file: 'guides/how-to-prepare-for-your-umrah-journey.jpg',           id: 9186152,  ...CARD, alt: 'An open suitcase being packed with neatly folded clothes' },
  { file: 'guides/nadra-vaccination-certificate-umrah-hajj.jpg',        id: 20471645, ...CARD, alt: 'A vaccination being administered by a healthcare worker' },
  { file: 'guides/nusuk-registration-guide-for-umrah.jpg',              id: 7310015,  ...CARD, alt: 'A passport and travel tickets resting on a laptop' },
  { file: 'guides/schengen-visa-guide-from-pakistan.jpg',               id: 7235892,  ...CARD, alt: 'A travel planner, map and accessories laid out for trip planning' },
  { file: 'guides/travel-insurance-guide-for-pakistani-travellers.jpg', id: 7734574,  ...CARD, alt: 'Two people reviewing and signing an insurance policy document' },
];

/* --------------------------------------------------------------------------
   AUTO — searched on Pexels and scored against `must` keywords.
   `must`: at least one must appear in the image's alt text.
   `avoid`: rejects a candidate outright.
   -------------------------------------------------------------------------- */
const AUTO = [
  /* corporate-travel.jpg is a curated id above — it used to be listed here
     too, which meant a pointless second search that now 403s and reports a
     false failure for a file that had already downloaded fine. */

  { file: 'about-office.jpg', ...CARD,
    query: 'travel agency office team meeting',
    must: ['office', 'meeting', 'desk', 'team', 'business', 'colleague'],
    alt: 'Travel consultants working together in an office' },

  { file: 'destinations/georgia.jpg', ...CARD,
    query: 'tbilisi georgia old town',
    must: ['tbilisi', 'georgia', 'old town', 'caucasus'],
    alt: 'The old town of Tbilisi, Georgia' },

  { file: 'destinations/sri-lanka.jpg', ...CARD,
    query: 'sri lanka tea plantation temple',
    must: ['sri lanka', 'lanka', 'colombo', 'kandy', 'ceylon', 'tea'],
    alt: 'Tea country landscape in Sri Lanka' },

  { file: 'hotels/worldwide-hotels.jpg', ...CARD,
    query: 'hotel lobby interior luxury',
    must: ['hotel', 'lobby', 'reception', 'interior'],
    alt: 'The lobby of a luxury hotel' },

  { file: 'guides/nadra-vaccination-certificate-umrah-hajj.jpg', ...CARD,
    query: 'vaccination vaccine syringe medical',
    must: ['vaccin', 'syringe', 'injection', 'medical', 'doctor', 'nurse'],
    alt: 'A vaccination being administered at a clinic' },

  { file: 'guides/nusuk-registration-guide-for-umrah.jpg', ...CARD,
    query: 'passport smartphone online booking travel',
    must: ['passport', 'phone', 'smartphone', 'laptop', 'booking', 'travel'],
    alt: 'Booking travel arrangements online with a passport to hand' },

  { file: 'guides/uk-visit-visa-guide-from-pakistan.jpg', ...CARD,
    query: 'visa passport application documents',
    must: ['passport', 'visa', 'document', 'immigration', 'stamp'],
    alt: 'A passport and visa application documents' },

  { file: 'guides/schengen-visa-guide-from-pakistan.jpg', ...CARD,
    query: 'passport map travel planning europe',
    must: ['map', 'passport', 'travel', 'planning', 'globe'],
    alt: 'Planning a European trip with a map and passport' },

  { file: 'guides/how-to-prepare-for-your-umrah-journey.jpg', ...CARD,
    query: 'packing suitcase luggage travel preparation',
    must: ['suitcase', 'luggage', 'packing', 'bag', 'travel'],
    alt: 'Packing a suitcase in preparation for travel' },

  { file: 'guides/international-travel-checklist-from-pakistan.jpg', ...CARD,
    query: 'airport departure board flight information',
    must: ['airport', 'departure', 'board', 'flight', 'terminal', 'schedule'],
    alt: 'A departure information board in an airport terminal' },

  { file: 'guides/travel-insurance-guide-for-pakistani-travellers.jpg', ...CARD,
    query: 'insurance document signing contract',
    must: ['insurance', 'document', 'contract', 'signing', 'policy', 'paperwork', 'agreement'],
    alt: 'Reviewing and signing an insurance policy document' },
];

/* ------------------------------------------------------------------ http */
function request(url, { binary = false, redirects = 6 } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': UA,
          'Accept-Language': 'en-US,en;q=0.9',
          Accept: binary ? 'image/jpeg,image/*,*/*' : 'text/html,*/*',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
          res.resume();
          return request(new URL(res.headers.location, url).toString(), { binary, redirects: redirects - 1 })
            .then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => resolve(binary ? Buffer.concat(chunks) : Buffer.concat(chunks).toString('utf8')));
      }
    );
    req.on('error', reject);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------ validation */
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (len < 2) return null;
    i += 2 + len;
  }
  return null;
}

function validate(buf, want) {
  if (buf.length < 15000) return { ok: false, why: `too small (${buf.length}B)` };
  if (!(buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff)) return { ok: false, why: 'not a JPEG' };
  const dim = jpegSize(buf);
  if (!dim) return { ok: false, why: 'unreadable dimensions' };
  // CDN crop should land on the requested size; allow a little slack
  if (Math.abs(dim.w - want.w) > 8 || Math.abs(dim.h - want.h) > 8) {
    return { ok: false, why: `wrong size ${dim.w}x${dim.h}` };
  }
  return { ok: true, ...dim };
}

/* ------------------------------------------------------------- downloads */
function cdnUrl(id, w, h) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg` +
         `?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}&dpr=1`;
}

async function download(id, target) {
  const buf = await request(cdnUrl(id, target.w, target.h), { binary: true });
  const check = validate(buf, target);
  if (!check.ok) throw new Error(check.why);
  return { buf, ...check };
}

/* --------------------------------------------------------------- scraping */
/** Pull {id, alt} pairs out of a Pexels search page. */
function extractCandidates(html) {
  const found = new Map();

  // <img> tags carry both the CDN url and a descriptive alt
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    const idm = tag.match(/images\.pexels\.com\/photos\/(\d+)\//);
    if (!idm) continue;
    const altm = tag.match(/\balt="([^"]*)"/);
    const id = Number(idm[1]);
    const alt = altm ? altm[1] : '';
    // keep the longest alt we see for an id
    if (!found.has(id) || alt.length > found.get(id).length) found.set(id, alt);
  }

  // fall back to bare URLs if the markup shape changes
  if (found.size === 0) {
    for (const m of html.matchAll(/images\.pexels\.com\/photos\/(\d+)\//g)) {
      found.set(Number(m[1]), '');
    }
  }

  return [...found.entries()].map(([id, alt]) => ({ id, alt }));
}

function score(cand, target) {
  const alt = cand.alt.toLowerCase();
  if (!alt) return 1; // usable but unranked
  if ((target.avoid || []).some((a) => alt.includes(a))) return -1;
  const hits = target.must.filter((m) => alt.includes(m.toLowerCase())).length;
  if (!hits) return -1;
  return hits * 10 + Math.min(alt.length / 20, 3);
}

async function searchPexels(target) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(target.query)}/`;

  // Pexels burst-limits with 403. Back off and try again rather than giving up.
  let html;
  let wait = 15000;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      html = await request(url);
      break;
    } catch (e) {
      if (attempt === 4) throw e;
      process.stdout.write(`retry ${attempt} `);
      await sleep(wait);
      wait *= 2;
    }
  }

  return extractCandidates(html)
    .map((c) => ({ ...c, s: score(c, target) }))
    .filter((c) => c.s > 0)
    .sort((a, b) => b.s - a.s);
}

/* ------------------------------------------------------------------- main */
async function main() {
  const credits = fs.existsSync(CREDITS_JSON) ? JSON.parse(fs.readFileSync(CREDITS_JSON, 'utf8')) : {};
  const wanted = (t) => !FILTER || t.file.includes(FILTER);

  let got = 0, skipped = 0;
  const failed = [];

  console.log('\nFetching photography from Pexels\n' + '='.repeat(62));

  /* ---- curated ---- */
  console.log('\nCurated (verified photo IDs):');
  for (const t of CURATED.filter(wanted)) {
    const dest = path.join(IMG, t.file);
    if (!FORCE && fs.existsSync(dest)) { skipped++; continue; }
    process.stdout.write(`  ${t.file.padEnd(52)}`);
    try {
      const { buf, w, h } = await download(t.id, t);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      credits[t.file] = {
        source: 'Pexels', photo_id: t.id,
        source_page: `https://www.pexels.com/photo/${t.id}/`,
        license: 'Pexels License', license_url: 'https://www.pexels.com/license/',
        attribution_required: false, alt: t.alt,
        width: w, height: h, bytes: buf.length, mode: 'curated',
      };
      console.log(`ok  ${w}x${h}  ${(buf.length / 1024).toFixed(0)}KB`);
      got++;
    } catch (e) {
      console.log(`FAILED (${e.message})`);
      failed.push(t.file);
    }
    await sleep(350);
  }

  /* ---- auto ---- */
  console.log('\nSearched (scored against required keywords):');
  for (const t of AUTO.filter(wanted)) {
    const dest = path.join(IMG, t.file);
    if (!FORCE && fs.existsSync(dest)) { skipped++; continue; }
    process.stdout.write(`  ${t.file.padEnd(52)}`);

    let candidates = [];
    try {
      candidates = await searchPexels(t);
    } catch (e) {
      console.log(`search failed (${e.message})`);
      failed.push(t.file);
      continue;
    }
    if (!candidates.length) {
      console.log('no keyword match');
      failed.push(t.file);
      continue;
    }

    let done = false;
    for (const cand of candidates.slice(0, 6)) {
      try {
        const { buf, w, h } = await download(cand.id, t);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
        credits[t.file] = {
          source: 'Pexels', photo_id: cand.id,
          source_page: `https://www.pexels.com/photo/${cand.id}/`,
          license: 'Pexels License', license_url: 'https://www.pexels.com/license/',
          attribution_required: false,
          alt: t.alt, matched_alt: cand.alt,
          width: w, height: h, bytes: buf.length, mode: 'search',
        };
        console.log(`ok  ${w}x${h}  ${(buf.length / 1024).toFixed(0)}KB  "${cand.alt.slice(0, 30)}"`);
        got++; done = true;

        /* Other sizes are cut from the SAME photo. A responsive srcset must
           not be four different pictures, which is what four independent
           searches would give us. */
        for (const v of t.variants || []) {
          const vDest = path.join(IMG, v.file);
          if (!FORCE && fs.existsSync(vDest)) { skipped++; continue; }
          process.stdout.write(`  ${v.file.padEnd(52)}`);
          try {
            const r = await download(cand.id, { ...t, w: v.w, h: v.h });
            fs.mkdirSync(path.dirname(vDest), { recursive: true });
            fs.writeFileSync(vDest, r.buf);
            credits[v.file] = {
              ...credits[t.file],
              width: r.w, height: r.h, bytes: r.buf.length, mode: 'search-variant',
              variant_of: t.file,
            };
            console.log(`ok  ${r.w}x${r.h}  ${(r.buf.length / 1024).toFixed(0)}KB`);
            got++;
          } catch (e) {
            console.log(`FAILED (${e.message})`);
            failed.push(v.file);
          }
          await sleep(300);
        }
        break;
      } catch (e) { /* next candidate */ }
      await sleep(250);
    }
    if (!done) { console.log('all candidates rejected'); failed.push(t.file); }
    await sleep(9000);
  }

  fs.writeFileSync(CREDITS_JSON, JSON.stringify(credits, null, 2));
  writeCredits(credits);

  console.log('\n' + '='.repeat(62));
  console.log(`  downloaded ${got}   already present ${skipped}   failed ${failed.length}`);
  if (failed.length) {
    console.log('\n  Still using the branded placeholder:');
    failed.forEach((f) => console.log('    - ' + f));
  }
  console.log('');
}

function writeCredits(credits) {
  const rows = Object.entries(credits).sort(([a], [b]) => a.localeCompare(b));
  const totalKb = rows.reduce((n, [, c]) => n + (c.bytes || 0), 0) / 1024;

  const md = `# Image credits & licensing

All photography on this site comes from **[Pexels](https://www.pexels.com)** under the
[Pexels License](https://www.pexels.com/license/): free to use, **commercial use
permitted, no attribution required, no permission needed**.

Credits are recorded here anyway so the agency has a full provenance trail for
every file, and can check or replace any image later.

- Images: **${rows.length}**
- Total weight: **${totalKb.toFixed(0)} KB**
- Machine-readable record: \`src/data/image-credits.json\`

## Replacing an image

Drop a file with the same name into \`assets/img/\` and rebuild — it overrides
the stock photo with no code change.

> **Use the agency's own photography where you have it.** Real photographs of
> your office, your groups and your clients' journeys outperform stock on a
> travel site, and they are what distinguishes you from every competitor using
> the same stock library.

To re-fetch or change a specific image:

\`\`\`bash
npm run images -- --force hero      # just the hero images
npm run images -- --force           # everything
\`\`\`

## Files

| File | Dimensions | Size | Pexels source |
|---|---|---|---|
${rows.map(([file, c]) =>
  `| \`${file}\` | ${c.width}×${c.height} | ${((c.bytes || 0) / 1024).toFixed(0)} KB | [#${c.photo_id}](${c.source_page}) |`
).join('\n')}
`;
  fs.writeFileSync(CREDITS_MD, md);
}

main().catch((e) => { console.error('\nFAILED:', e.message); process.exit(1); });
