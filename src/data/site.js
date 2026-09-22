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

  /* ---- Credentials -------------------------------------------------------
     One source of truth for the trust strip on the home page and the one in
     components.trustStrip().

     `key` names the logo file the strip will use the moment it exists:
       assets/img/credentials/<key>.svg   (preferred)
       assets/img/credentials/<key>.png
     Until then the gold line icon stands in, so the section never shows a
     broken image. See that folder's README for why the real marks have to
     be supplied by the client rather than fetched.

     `ref` is the licence or registration number. Filling it in is worth
     more than any logo: a number can be checked against the registry,
     which is what a cautious customer actually wants.                       */
  credentials: [
    /* `seal` is what shows inside the medallion. A typeset acronym is what a
       real accreditation badge looks like; a generic glyph is what clip-art
       looks like, which is what the client objected to. Where a genuine
       logo file exists it replaces the medallion entirely. */
    { key: 'secp', name: 'SECP', seal: 'SECP', sub: 'Registered', icon: 'building', ref: '' },
    { key: 'fbr', name: 'FBR', seal: 'FBR', sub: 'Registered', icon: 'doc', ref: '' },
    { key: 'dts', name: 'DTS', seal: 'DTS', sub: 'Licensed', icon: 'certificate', ref: '' },
    { key: 'iata', name: 'IATA', seal: 'IATA', sub: 'Accredited', icon: 'ticket', ref: '' },
    { key: 'mora', name: 'MORA', seal: 'MORA', sub: 'Approved', icon: 'kaaba', ref: '' },
    /* Not an accreditation, so it keeps a glyph rather than pretending to a
       seal it was never issued. */
    { key: 'hotel-partners', name: 'Hotel Partners', sub: 'Makkah & Madinah', icon: 'bed', ref: '' },
  ],

  /* ---- Sister company ----------------------------------------------------
     MyCab Pakistan runs the vehicles. Not an arm's-length advertiser: their
     published address is this same office (Safdar Mansion, 2nd floor) and
     they share the 051-8465006-7 landline, under GH Group. The site
     cross-refers to them the way the two businesses already work together.
     Verified against mycabpakistan.com, September 2026.                     */
  partner: {
    name: 'MyCab Pakistan',
    shortName: 'MyCab',
    url: 'https://mycabpakistan.com/',
    tagline: 'Rent a car with a driver, across Pakistan.',
    uan: { label: '0311-111-2234', tel: '+923111112234' },
    email: 'mycabpakistan@gmail.com',
    blurb:
      'Dedicated vehicles with a driver — airport pickups, city meetings, ' +
      'wedding cars and the northern-areas run. Not a ride-hailing app: one ' +
      'car, one driver, for as long as you need it.',
    fleet: [
      { tier: 'Economy', cars: 'Suzuki Alto, Toyota Vitz, Daihatsu Move' },
      { tier: 'Sedan', cars: 'Toyota Corolla, Honda City, Toyota Yaris, Suzuki Swift' },
      { tier: 'SUV', cars: 'Honda BR-V, Kia Sportage, Toyota Revo' },
      { tier: 'Vans & coaches', cars: 'Toyota Hiace (14 seats), Toyota Coaster (29 seats)' },
      { tier: 'VIP', cars: 'Land Cruiser Prado and LC300, Audi A8, Mercedes-Benz S-Class' },
    ],
  },

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
