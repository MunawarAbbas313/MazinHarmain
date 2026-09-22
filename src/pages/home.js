/* ==========================================================================
   Homepage.
   Built to the client's approved mockup, section for section:

     1  Hero              full-bleed Kaaba photograph, overlay weighted left,
                          headline + three CTAs, trust strip along the bottom
     2  Search widget     portal-style panel overlapping the hero, four tabs
     3  Services          "Complete Travel Solutions Under One Roof", 4 x 2
     4  Umrah             centre panel flanked by Makkah/Madinah photography
     5  Visa              flag grid with a passport photograph alongside
     6  Destinations      row of photo cards
     7  Corporate         dark green band, photograph on the left
     8  Why Mazin Haramain   six reasons across
     9  Trust             credential badges on cream
    10  Reviews           genuine reviews only (see src/data/reviews.js)
    11  Travel guides     row of article cards
    12  FAQ + CTA band
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const { searchWidget } = require('../templates/search-widget');
const icon = require('../lib/icons');
const { esc, attr, each, formatDate } = require('../lib/html');
const { firstAsset } = require('../lib/assets');

const { bySlug, homepageServiceOrder } = require('../data/services');
const { tiers } = require('../data/umrah');
const { popularCountries } = require('../data/visa-countries');
const { featured: featuredDestinations } = require('../data/destinations');
const faqs = require('../data/faqs');
const guides = require('../data/guides');
const { reviews, googleProfileUrl } = require('../data/reviews');
const { visaFlagCodes, destinationFlagCodes, flagImg } = require('../data/flags');

const WA_HERO = 'Assalam o Alaikum, I would like to speak to a travel expert about my journey.';

/* The hero rotation after the opening frame. The client asked the home page
   to stop leading on the Kaaba — the agency sells worldwide and one
   religious image said otherwise. Makkah and Madinah photography still
   carries the Umrah sections further down this page, so that side of the
   business keeps its place; it is simply no longer the only first
   impression. These are decorative variations on the opening frame, which
   is why they carry an empty alt rather than four competing descriptions. */
const HERO_SLIDES = [
  { src: '/assets/img/hero-dubai.jpg', wide: '/assets/img/hero-dubai-2560.jpg' },
  { src: '/assets/img/hero-istanbul.jpg', wide: '/assets/img/hero-istanbul-2560.jpg' },
  { src: '/assets/img/hero-europe.jpg', wide: '/assets/img/hero-europe-2560.jpg' },
  { src: '/assets/img/hero-maldives.jpg', wide: '/assets/img/hero-maldives-2560.jpg' },
];

/** Photo with the branded placeholder as an automatic fallback. */
function photo(src, alt, { w = 1200, h = 900, eager = false } = {}) {
  return `<img src="${attr(src)}" alt="${attr(alt)}" width="${w}" height="${h}" ` +
    `loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} decoding="async" ` +
    `onerror="this.onerror=null;this.src='/assets/img/placeholder.svg'">`;
}

/* --------------------------------------------------------------- 1. Hero */
function hero() {
  const trust = [
    { icon: 'kaaba',     label: 'Umrah Services',       url: '/umrah-packages/' },
    { icon: 'passport',  label: 'Visa Assistance',      url: '/visa-services/' },
    { icon: 'globe',     label: 'International Travel', url: '/destinations/' },
    { icon: 'briefcase', label: 'Corporate Solutions',  url: '/corporate-travel/' },
  ];

  return `
  <section class="hero">
    <div class="hero__media" data-hero-slides>
      ${/* Slide one is the LCP candidate, so it alone carries the srcset and
            loads eagerly. The rest have no src at all: they sit inside the
            viewport, where loading="lazy" would not have deferred them, so
            main.js attaches them once the page has finished loading. With
            JavaScript off this stays a single static hero. */ ''}
      <img class="hero__slide is-active"
           src="/assets/img/hero-flight-1600.jpg"
           srcset="/assets/img/hero-flight-768.jpg 768w,
                   /assets/img/hero-flight-1200.jpg 1200w,
                   /assets/img/hero-flight-1600.jpg 1600w,
                   /assets/img/hero-flight.jpg 1920w,
                   /assets/img/hero-flight-2560.jpg 2560w"
           sizes="100vw"
           alt="An airliner silhouetted against a sunset sky"
           width="1600" height="900" loading="eager" fetchpriority="high" decoding="async"
           onerror="this.onerror=null;this.srcset='';this.src='/assets/img/placeholder.svg'">
${each(HERO_SLIDES, (h) => `      <img class="hero__slide" data-src="${attr(h.src)}" data-srcset="${attr(h.src)} 1600w, ${attr(h.wide)} 2560w" sizes="100vw" alt="" width="1600" height="900" decoding="async" aria-hidden="true">`)}
    </div>
    <div class="container">
      <div class="hero__inner">
        <div class="hero__content">
          <span class="hero__eyebrow">${esc(site.name)}</span>
          <h1>Fly With <span class="accent">Trust.</span></h1>
          <p class="hero__tagline">From Sacred Journeys to Global Destinations.</p>
          <p class="hero__text">Professional Umrah, Hajj, visa, flights, hotels, tours and corporate travel solutions &mdash; tailored around your journey, from our office in Blue Area, Islamabad.</p>
          <div class="btn-row">
            <a class="btn btn--gold btn--lg" href="/get-a-quote/">Get a Free Quote</a>
            <a class="btn btn--whatsapp btn--lg" href="${attr(site.waLink(WA_HERO))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 17 })} WhatsApp an Expert</a>
            <a class="btn btn--outline-light btn--lg" href="/services/">Explore Our Services</a>
          </div>
        </div>
        <div class="hero__trustbar">
          ${each(trust, (t) => `<a class="hero__trustbar-item" href="${attr(t.url)}">${icon(t.icon, { size: 17 })} ${esc(t.label)}</a>`)}
        </div>
      </div>
    </div>
  </section>`;
}

/* ----------------------------------------------------------- 3. Services */
function servicesSection() {
  const cards = homepageServiceOrder.map((slug) => {
    const s = bySlug(slug);
    const img = s.cardImage || s.heroImage;
    const alt = s.cardImageAlt || s.heroImageAlt || s.title;
    return `
        <a class="svc-card" href="${attr(s.url)}">
          <span class="svc-card__media">
            <img src="${attr(img)}" alt="${attr(alt)}" width="640" height="420" loading="lazy" decoding="async"
                 onerror="this.onerror=null;this.src='/assets/img/placeholder.svg'">
          </span>
          <span class="svc-card__body">
            <span class="svc-card__icon">${icon(s.icon, { size: 19 })}</span>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.blurb)}</p>
            <span class="svc-card__go">${icon('arrowRight', { size: 15 })}</span>
          </span>
        </a>`;
  });

  return `
  <section class="section home-services">
    <div class="container">
      ${c.sectionHead({
        eyebrow: 'Our Services',
        title: 'Complete Travel Solutions Under One Roof',
        text: 'From planning your journey to reaching your destination, our team is here to assist you at every step.',
      })}
      <div class="svc-grid reveal">
        ${cards.join('')}
      </div>
      <div class="btn-row btn-row--center" style="margin-top:var(--sp-8)">
        ${c.btn.link('/services/', 'View All Services', 'btn--outline')}
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------- 4. Umrah */
function umrahSection() {
  /* All four tiers used to carry the same Kaaba icon, which said nothing and
     read as decoration. They now show the tier's own hotel class as stars —
     real information, straight from each tier's specs. */
  const tierCards = tiers
    .filter((t) => t.tier !== 'Custom')
    .map(
      (t) => `
          <a class="umrah-tier" href="/umrah-packages/${attr(t.slug)}/">
            <span class="umrah-tier__stars" role="img" aria-label="${attr(t.stars)} star hotels">
              ${[1, 2, 3, 4, 5]
                .map((n) => `<span class="umrah-tier__star${n <= t.stars ? ' is-on' : ''}">${icon('star', { size: 13 })}</span>`)
                .join('')}
            </span>
            <strong>${esc(t.tier)}</strong>
            <span class="umrah-tier__sub">${esc(t.subtitle)}</span>
          </a>`
    );

  return `
  <section class="umrah-band">
    <div class="umrah-band__grid">
      <div class="umrah-band__photo">
        ${photo('/assets/img/hotels/makkah-hotels.jpg', 'Masjid al-Haram and the Makkah skyline at night')}
      </div>
      <div class="umrah-band__panel">
        <span class="eyebrow">Umrah Packages</span>
        <h2>Your Sacred Journey, Carefully Planned.</h2>
        <p>Experience a smooth and well-organised Umrah with carefully selected accommodation, flights, transportation and travel assistance &mdash; departing from every major city in Pakistan.</p>
        <div class="umrah-tiers">
          ${tierCards.join('')}
        </div>
        <div class="btn-row btn-row--center">
          ${c.btn.link('/umrah-packages/', 'Explore Umrah Packages', 'btn--green')}
        </div>
      </div>
      <div class="umrah-band__photo">
        ${photo('/assets/img/hotels/madinah-hotels.jpg', 'The Green Dome of Al-Masjid an-Nabawi in Madinah')}
      </div>
    </div>
  </section>`;
}

/* --------------------------------------------------------------- 5. Visa */
function visaSection() {
  const flags = popularCountries.slice(0, 8).map(
    (v) => `
          <a class="visa-flag" href="/visa-services/${attr(v.slug)}/">
            <span class="visa-flag__flag">${flagImg(visaFlagCodes[v.slug], v.short || v.name, 34)}</span>
            <span class="visa-flag__name">${esc(v.short || v.name)}</span>
            <span class="visa-flag__sub">Visa</span>
          </a>`
  );

  return `
  <section class="section">
    <div class="container">
      <div class="visa-split">
        <div>
          ${c.sectionHead({
            eyebrow: 'Visa Assistance',
            title: 'Visa Assistance Made Simple',
            text: 'Professional guidance for your visa application, documentation and appointment process &mdash; for more than forty destinations worldwide.',
          })}
          <div class="visa-flags reveal">
            ${flags.join('')}
          </div>
          <div class="btn-row">
            ${c.btn.link('/visa-services/', 'View All Visa Services', 'btn--green')}
            ${c.btn.link('/services/visa-appointment-booking/', 'Book an Appointment', 'btn--outline')}
          </div>
        </div>
        <div class="visa-split__media">
          ${photo('/assets/img/visa-services.jpg',
            'A passport with visa and departure stamps, a compass and a travel planner on a world map')}
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------- 6. Destinations */
function destinationsSection() {
  const cards = featuredDestinations.slice(0, 8).map(
    (d) => `
        <a class="dest-card" href="/destinations/${attr(d.slug)}/">
          <div class="dest-card__img">
            ${photo(`/assets/img/destinations/${d.slug}.jpg`, `${d.name} tour packages from Pakistan`)}
          </div>
          <div class="dest-card__body">
            ${flagImg(destinationFlagCodes[d.slug], d.name, 26)}
            <strong>${esc(d.name)}</strong>
            <span>Tour Packages</span>
          </div>
        </a>`
  );

  return `
  <section class="section section--cream">
    <div class="container">
      <div class="section-heading-row">
        ${c.sectionHead({
          eyebrow: 'International Tours',
          title: 'Explore the World With Mazin Haramain',
          text: 'Discover our customised and group tour packages to the destinations Pakistani travellers ask for most.',
        })}
        ${c.btn.link('/destinations/', 'View All Destinations', 'btn--outline', ' btn--sm')}
      </div>
      <div class="dest-row reveal">
        ${cards.join('')}
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------- 7. Corporate */
function corporateSection() {
  const items = [
    { icon: 'ticket',      label: 'Corporate Air Ticketing' },
    { icon: 'bed',         label: 'Hotel Reservations' },
    { icon: 'van',         label: 'Airport Transfers' },
    { icon: 'podium',      label: 'MICE &amp; Events' },
    { icon: 'suitcase',    label: 'Business Travel' },
    { icon: 'users',       label: 'Group Travel' },
    { icon: 'passport',    label: 'Visa Assistance' },
    { icon: 'userTie',     label: 'Executive Travel' },
    { icon: 'handshake',   label: 'Dedicated Account Support' },
    { icon: 'chart',       label: 'Travel Reporting' },
  ];

  return `
  <section class="corporate-band">
    <div class="corporate-band__grid">
      <div class="corporate-band__photo">
        ${photo('/assets/img/corporate-travel.jpg',
          'A business traveller walking through an airport terminal with luggage')}
      </div>
      <div class="corporate-band__body">
        <span class="eyebrow">Corporate Travel</span>
        <h2>Corporate Travel Solutions</h2>
        <p>Efficient travel management solutions designed for businesses, organisations and corporate travellers &mdash; with one account manager who knows your policy and your people.</p>
        <ul class="corporate-list">
          ${each(items, (i) => `<li>${icon(i.icon, { size: 17 })} <span>${i.label}</span></li>`)}
        </ul>
        <div class="btn-row">
          ${c.btn.link('/corporate-travel/', 'Request Corporate Consultation', 'btn--gold')}
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------- 7b. MyCab (cars) */
/* The sister company: same building, same landline (see site.partner for
   why that framing is accurate rather than promotional). Presented as part
   of what the two businesses offer together. */
function carRentalSection() {
  const p = site.partner;
  return `
  <section class="section section--cream">
    <div class="container">
      ${c.sectionHead({ eyebrow: 'Car Rental', title: 'Getting Around, Handled Too', center: true })}
      <div class="split" style="margin-top:var(--sp-8);align-items:center">
        <div>
          <p>${esc(p.blurb)}</p>
          <p style="font-size:var(--fs-sm);color:var(--muted)">${esc(p.name)} works out of this same office in Safdar Mansion and answers the same landline, so a car and a driver can be added to anything we book for you &mdash; one call, one point of contact.</p>
          <ul class="tick-list tick-list--gold" style="margin-top:var(--sp-5)">
            ${each(p.fleet, (f) => `<li><strong>${esc(f.tier)}</strong> &mdash; ${esc(f.cars)}</li>`)}
          </ul>
          <div class="btn-row" style="margin-top:var(--sp-6)">
            <a class="btn btn--gold" href="/services/car-rental/">Car Rental Details ${icon('arrowRight', { size: 15 })}</a>
            <a class="btn btn--outline" href="${attr(p.url)}" target="_blank" rel="noopener">Visit ${esc(p.shortName)} ${icon('globe', { size: 15 })}</a>
          </div>
        </div>
        <div>
          ${photo('/assets/img/car-rental.jpg', 'A white Range Rover parked on a driveway')}
        </div>
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------- 8. Why us */
function whySection() {
  const features = [
    { icon: 'award',   title: 'Professional Expertise',    text: 'Experienced travel professionals handling your booking personally.' },
    { icon: 'heart',   title: 'Personalised Service',      text: 'Solutions built around your requirements, budget and family.' },
    { icon: 'doc',     title: 'Transparent Communication', text: 'Clear written pricing, inclusions and documentation before you pay.' },
    { icon: 'route',   title: 'End-to-End Assistance',     text: 'From planning and documentation through to your return home.' },
    { icon: 'headset', title: 'Responsive Support',        text: 'Phone, WhatsApp and email — including while you are travelling.' },
    { icon: 'globe',   title: 'One-Stop Solutions',        text: 'Flights, hotels, visas, tours and pilgrimage under one roof.' },
  ];

  return `
  <section class="section">
    <div class="container">
      ${c.sectionHead({
        eyebrow: 'Why Choose Us',
        title: 'Why Mazin Haramain?',
        text: 'Your trust and satisfaction are our top priorities.',
        center: true,
      })}
      <div class="why-row reveal">
        ${each(
          features,
          (f) => `
        <div class="why-item">
          <span class="why-item__icon">${icon(f.icon, { size: 21 })}</span>
          <h3>${esc(f.title)}</h3>
          <p>${esc(f.text)}</p>
        </div>`
        )}
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- 9. Trust */
function trustSection() {
  /* Real accreditation marks the moment they are in the repo; the gold line
     icon until then. See assets/img/credentials/README.md — these belong to
     SECP, FBR, DTS, IATA and MORA, so the client supplies them rather than
     us lifting them off a website. */
  const badges = site.credentials.map((c) => ({
    ...c,
    logo: firstAsset([
      `/assets/img/credentials/${c.key}.svg`,
      `/assets/img/credentials/${c.key}.png`,
    ]),
  }));

  return `
  <section class="section trust-band">
    <div class="container">
      <div class="trust-mark">
        <span class="eyebrow">Trust &amp; Credentials</span>
        <h2 class="trust-mark__title">Your Journey Is In <span class="accent">Trusted Hands.</span></h2>
        <p>Licensed, registered and transparent. Every price, inclusion and document
           requirement is confirmed in writing before you pay &mdash; and we never promise
           an outcome no travel agency can control.</p>
      </div>
      <div class="trust-row">
        ${each(
          badges,
          (b) => `
        <div class="trust-badge">
          ${b.logo
            ? `<img class="trust-badge__logo" src="${attr(b.logo)}" alt="${attr(b.name)}" loading="lazy" decoding="async">`
            : icon(b.icon, { size: 26 })}
          <strong>${b.name}</strong>
          <span>${b.sub}</span>
          ${b.ref ? `<span class="trust-badge__ref">${esc(b.ref)}</span>` : ''}
        </div>`
        )}
      </div>
      <p class="form-note" style="text-align:center;margin-top:var(--sp-6);max-width:660px;margin-inline:auto">
        Credentials are shown for information. Please ask our team for copies of the specific licences,
        memberships and approvals held by ${esc(site.name)} &mdash; we are happy to share them before you book.
      </p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------- 10. Reviews */
function reviewsSection() {
  if (reviews.length) {
    return `
  <section class="section">
    <div class="container">
      ${c.sectionHead({
        eyebrow: 'Customer Reviews',
        title: 'What Our Customers Say',
        text: 'Real stories from travellers who booked with us.',
        center: true,
      })}
      <div class="grid grid--3 reveal">${reviews.slice(0, 3).map(c.reviewCard).join('')}</div>
      <div class="btn-row btn-row--center" style="margin-top:var(--sp-8)">
        ${c.btn.link('/reviews/', 'Read More Reviews', 'btn--outline')}
      </div>
    </div>
  </section>`;
  }

  /* The brief forbids invented testimonials, so until real permissioned
     reviews exist this section asks for them rather than faking them. */
  return `
  <section class="section">
    <div class="container">
      <div class="feedback-invitation">
        <div>
          <span class="stars" aria-hidden="true">${icon('star', { size: 18 }).repeat(5)}</span>
          <h2 style="margin-top:.5rem">Travelled with us? Tell others.</h2>
          <p>We publish only genuine, permissioned reviews from travellers who have booked with us &mdash; so this space stays open until yours arrives. Your feedback helps other pilgrims and travellers choose with confidence.</p>
        </div>
        <div class="btn-row">
          ${googleProfileUrl ? `<a class="btn btn--outline" href="${attr(googleProfileUrl)}" target="_blank" rel="noopener">Read Google Reviews</a>` : ''}
          ${c.btn.whatsapp('Assalam o Alaikum, I recently travelled with Mazin Haramain and would like to share my feedback.', 'Share Your Experience')}
        </div>
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------- 11. Guides */
function guidesSection() {
  const cards = guides.slice(0, 5).map(
    (g) => `
        <a class="guide-card" href="/travel-guides/${attr(g.slug)}/">
          <div class="guide-card__img">
            ${photo(`/assets/img/guides/${g.slug}.jpg`, g.title, { w: 1200, h: 750 })}
          </div>
          <div class="guide-card__body">
            <strong>${esc(g.title)}</strong>
            <time datetime="${attr(g.date)}">${esc(formatDate(g.date))}</time>
          </div>
        </a>`
  );

  return `
  <section class="section section--cream">
    <div class="container">
      <div class="section-heading-row">
        ${c.sectionHead({
          eyebrow: 'Travel Guides & Insights',
          title: 'Travel Tips, Guides & Latest Updates',
          text: 'Useful articles to help you plan a better journey.',
        })}
        ${c.btn.link('/travel-guides/', 'View All Articles', 'btn--outline', ' btn--sm')}
      </div>
      <div class="guide-row reveal">
        ${cards.join('')}
      </div>
    </div>
  </section>`;
}

/* ----------------------------------------------------------------- 12. FAQ */
function faqSection() {
  return c.section({
    inner: `${c.sectionHead({
      eyebrow: 'Frequently Asked Questions',
      title: 'Questions We Are Asked Most',
      center: true,
    })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(faqs.homepage, 'home-faq')}
        <div class="btn-row btn-row--center" style="margin-top:var(--sp-6)">
          ${c.btn.link('/faqs/', 'View All FAQs', 'btn--outline')}
        </div>
      </div>`,
  });
}

/* ------------------------------------------------------------- 13. Find us */
function mapSection() {
  return `
  <section class="section section--tight">
    <div class="container">
      ${c.sectionHead({
        eyebrow: 'Find Us',
        title: 'Visit Our Office in Blue Area',
        center: true,
        text: 'Walk in during business hours, or call ahead before you travel across town.',
      })}
      ${c.mapPanel()}
    </div>
  </section>`;
}

/* --------------------------------------------------------------------- Page */
function render() {
  const body = [
    hero(),
    searchWidget({ active: 'flights' }),
    servicesSection(),
    umrahSection(),
    visaSection(),
    destinationsSection(),
    corporateSection(),
    carRentalSection(),
    whySection(),
    trustSection(),
    reviewsSection(),
    guidesSection(),
    faqSection(),
    mapSection(),
    c.ctaBand(),
  ].join('\n');

  return layout({
    url: '/',
    title: 'Mazin Haramain Tours & Travels | Umrah, Visa & Travel Agency Islamabad',
    ogTitle: 'Mazin Haramain Tours & Travels — From Sacred Journeys to Global Destinations',
    description:
      'Umrah packages, Hajj services, visa assistance, air ticketing, hotels, international tours and corporate travel from Blue Area, Islamabad.',
    body,
    bodyClass: 'page-home',
    ogImage: '/assets/img/hero-kaaba.jpg',
    ogImageAlt: 'Pilgrims performing tawaf around the Kaaba at Masjid al-Haram in Makkah',
    preloadImage: '/assets/img/hero-kaaba-1600.jpg',
    preloadImageSrcset:
      '/assets/img/hero-kaaba-768.jpg 768w, ' +
      '/assets/img/hero-kaaba-1200.jpg 1200w, ' +
      '/assets/img/hero-kaaba-1600.jpg 1600w, ' +
      '/assets/img/hero-kaaba.jpg 1920w',
    preloadImageSizes: '100vw',
    schema: [c.faqSchema(faqs.homepage)],
    waMessage: WA_HERO,
  });
}

module.exports = () => [{ url: '/', html: render(), priority: '1.0', changefreq: 'weekly' }];
