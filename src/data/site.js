/* ==========================================================================
   MAZIN HARAMAIN TOURS & TRAVELS — Global site configuration
   Single source of truth. Change a value here and every one of the generated
   pages updates on the next `npm run build`.
   ========================================================================== */

const SITE_URL = 'https://www.mazinharamain.com'; // <-- change to the live domain before launch

const site = {
  url: SITE_URL,
  name: 'Mazin Haramain Tours & Travels',
  shortName: 'Mazin Haramain',
  legalName: 'Mazin Haramain Tours & Travels',
  tagline: 'From Sacred Journeys to Global Destinations.',
  secondaryTagline: 'Your Journey, Our Commitment.',
  description:
    'Mazin Haramain Tours & Travels is a professional travel management company in Blue Area, Islamabad providing Umrah packages, Hajj services, visa assistance, air ticketing, hotel reservations, international tours and corporate travel solutions from Pakistan.',
  foundingLocation: 'Islamabad, Pakistan',

  /* ---- Contact ---------------------------------------------------------- */
  phones: [
    { label: '+92 51 8465006', tel: '+92518465006' },
    { label: '+92 51 8465007', tel: '+92518465007' },
  ],
  phonePrimary: { label: '051-8465006-7', tel: '+92518465006' },
  whatsapp: {
    number: '923135500022',          // international format, no + or spaces
    display: '+92 313 5500022',
    local: '0313 5500022',
  },
  email: 'mazinharamain@gmail.com',

  address: {
    line1: 'Office # 14, Second Floor, Safdar Mansion',
    line2: 'Fazal-e-Haq Road, Blue Area',
    city: 'Islamabad',
    region: 'Islamabad Capital Territory',
    postalCode: '44000',
    country: 'PK',
    countryName: 'Pakistan',
    full: 'Office # 14, Second Floor, Safdar Mansion, Fazal-e-Haq Road, Blue Area, Islamabad, Pakistan',
    /* Blue Area, Islamabad. These feed the map pin AND the LocalBusiness
       geo in the schema, so accuracy matters for the Google map pack.
       TO SET EXACTLY: open Google Maps, right-click the office entrance,
       click the lat/lng that appears, and paste the two numbers here. */
    lat: 33.71692,
    lng: 73.07227,
    /* Pinned by coordinates rather than a text search, so the marker always
       lands on the office instead of wherever Google guesses. */
    /* Geocoded from the street address so the marker lands on Fazal-e-Haq
       Road rather than on an approximate coordinate. Swap to
       "q=<lat>,<lng>(Mazin+Haramain)" once the exact entrance is known. */
    /* Pinned by coordinate, which is the only embed form that reliably drops
       a marker — a text query just centres the map. The point is Fazal-e-Haq
       Road, Blue Area (geocoded). TO SET IT ON THE DOOR EXACTLY: open Google
       Maps, right-click the office entrance, click the lat/lng that appears
       and paste both numbers here and into lat/lng below. */
    mapEmbed:
      'https://www.google.com/maps?q=33.71692,73.07227(Mazin+Haramain+Tours+%26+Travels)&z=17&hl=en&output=embed',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=Safdar+Mansion+Fazal-e-Haq+Road+Blue+Area+Islamabad',
  },

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:30', closes: '18:30' },
  ],
  openingHoursText: 'Monday – Saturday, 9:30 AM – 6:30 PM (PKT)',

  /* ---- Social ------------------------------------------------------------
     Deliberately empty: we do not link to accounts that do not exist.
     Add entries only for profiles the agency actually operates, e.g.
       { name: 'Facebook', url: 'https://www.facebook.com/<page>', icon: 'facebook' },
     Valid icon keys: facebook, instagram, youtube, linkedin, tiktok.
     The header and footer social rows stay hidden while this is empty.     */
  social: [],

  /* ---- Analytics (paste real IDs at launch) ----------------------------- */
  analytics: {
    ga4: '',                 // e.g. 'G-XXXXXXXXXX'
    googleSiteVerification: '', // Search Console meta value
    facebookPixel: '',
  },

  /* ---- Lead capture ------------------------------------------------------
     Forms post here if set. Leave empty and every form gracefully falls back
     to a pre-filled WhatsApp message + mailto so no lead is ever lost.       */
  formEndpoint: '',

  /* ---- Who built the site (rendered in the footer) ---------------------- */
  builtBy: {
    name: 'DataX Technologies',
    city: 'Islamabad',
    url: 'https://www.datax.pk/',
  },

  /* ---- Service area (used in LocalBusiness schema) ----------------------- */
  serviceCities: [
    'Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar',
    'Faisalabad', 'Multan', 'Sialkot', 'Gujranwala', 'Abbottabad',
  ],
};

/* Pre-built helpers so templates never rebuild these strings by hand. */
site.waLink = (message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

site.telLink = site.phonePrimary.tel;

module.exports = site;
