/* ==========================================================================
   Flight routes — hub + one page per route.
   These target the searches an air-ticketing page cannot: people type
   "islamabad to jeddah flight", not "air ticketing services".
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const { searchWidget, assuranceStrip } = require('../templates/search-widget');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const { routes, byCategory, routeFaqs } = require('../data/flights');

const BASE = '/flights/';
const crumbBase = { label: 'Flight Routes', url: BASE };

const CATEGORY_LABELS = {
  umrah: 'Umrah & Hajj Routes',
  leisure: 'Leisure & Holiday Routes',
  family: 'Family Visit Routes',
};

function flightSidebar(wa) {
  return `
        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Popular Routes', [
            { label: 'All Flight Routes', url: BASE },
            ...routes.slice(0, 9).map((r) => ({ label: `${r.from} to ${r.to}`, url: `${BASE}${r.slug}/` })),
          ])}
          ${c.linkListCard('Related Services', [
            { label: 'Air Ticketing', url: '/services/air-ticketing/' },
            { label: 'Umrah Packages', url: '/umrah-packages/' },
            { label: 'Hotel Reservations', url: '/hotels/' },
            { label: 'Airport Transfers', url: '/services/airport-transfers/' },
            { label: 'Travel Insurance', url: '/services/travel-insurance/' },
            { label: 'Corporate Travel', url: '/corporate-travel/' },
          ])}
        </aside>`;
}

function routeCard(r) {
  return `
        <a class="card" href="${BASE}${attr(r.slug)}/">
          <span class="card__icon">${icon('plane', { size: 22 })}</span>
          <div class="card__body">
            <h3>${esc(r.from)} to ${esc(r.to)}</h3>
            <p>${esc(r.fromCode)} &rarr; ${esc(r.toCode)} &middot; ${esc(r.duration)}</p>
            <p style="font-size:var(--fs-xs)">${esc(r.lead)}</p>
          </div>
          <span class="link-arrow">Request a fare</span>
        </a>`;
}

/* ------------------------------------------------------------------- Hub */
function hubPage() {
  const wa = 'Assalam o Alaikum, I would like a flight quotation.';

  const groups = Object.entries(byCategory)
    .filter(([, list]) => list.length)
    .map(
      ([key, list]) => `
          <h2 style="margin-top:var(--sp-10)">${esc(CATEGORY_LABELS[key])}</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${list.map(routeCard).join('')}
          </div>`
    )
    .join('');

  const body = `
${c.pageHero({
    image: '/assets/img/guides/international-travel-checklist-from-pakistan.jpg',
    imageAlt: 'Travellers checking the departure board in an airport terminal',
    eyebrow: 'Flight Routes',
    title: 'Flights from Pakistan — Fares, Routings & Baggage',
    text: 'Direct and connecting options on the routes Pakistani travellers fly most, with the fare rules and baggage allowance explained before you pay.',
    buttons: [c.btn.quote('Request a Fare'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

${searchWidget({ active: 'flights' })}
${assuranceStrip('flights')}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>Fare engines are good at showing you a number. They are less good at telling you that your itinerary includes a seven-hour overnight transit, that the fare class cannot be changed, or that the checked allowance will not cover an Umrah family returning with Zamzam and gifts.</p>
            <p>These pages cover the routes we book most from Pakistan. Each one sets out the airlines that commonly serve it, approximate flying times, and the practical detail that decides whether a trip goes smoothly &mdash; then puts you in front of a consultant who quotes the live fare.</p>
          </div>

          <div class="callout callout--gold">
            <span class="callout__title">Why there are no prices here</span>
            <p>Airfares move several times a day with demand and seat availability. Any figure we published would be wrong within hours, so we quote the live fare for your dates instead &mdash; with the baggage allowance, routing and fare conditions in writing before anything is charged.</p>
          </div>

          ${groups}

          ${c.inlineCta({
            title: 'Flying somewhere not listed?',
            text: 'We ticket worldwide — tell us your route and dates.',
            waMessage: wa,
            quoteLabel: 'Request a Fare',
          })}
        </div>
        ${flightSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: 'Flight Booking FAQs', center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(routeFaqs, 'flights-hub')}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url: BASE,
    html: layout({
      url: BASE,
      title: 'Flights from Pakistan | Routes, Fares & Air Ticketing',
      description:
        'Flight routes from Pakistan — Islamabad, Lahore and Karachi to Jeddah, Madinah, Dubai, Istanbul, London and Kuala Lumpur. Live fares, baggage and fare rules explained.',
      crumbs: [crumbBase],
      body,
      schema: [
        c.serviceSchema({
          name: 'Air Ticketing and Flight Booking',
          description: 'Flight booking and air ticketing on major routes from Pakistan.',
          url: BASE,
        }),
        c.faqSchema(routeFaqs),
      ],
      waMessage: wa,
    }),
    priority: '0.9',
    changefreq: 'weekly',
  };
}

/* ------------------------------------------------------------ Route page */
function routePage(r) {
  const url = `${BASE}${r.slug}/`;
  const title = `${r.from} to ${r.to} Flights`;
  const wa = `Assalam o Alaikum, I would like a fare for ${r.from} to ${r.to}. My travel dates are:`;

  const related = routes.filter((x) => x.slug !== r.slug).slice(0, 6);

  const body = `
${c.pageHero({
    image: '/assets/img/guides/international-travel-checklist-from-pakistan.jpg',
    imageAlt: 'Travellers checking the departure board in an airport terminal',
    eyebrow: `${r.fromCode} → ${r.toCode}`,
    title: `${title} — Fares, Airlines & Baggage`,
    text: esc(r.lead),
    buttons: [c.btn.quote('Request a Fare'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${r.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">Route at a Glance</h2>
          <div class="table-wrap">
            <table class="table">
              <tbody>
                <tr><th scope="row">From</th><td>${esc(r.fromAirport)} (${esc(r.fromCode)}), ${esc(r.from)}</td></tr>
                <tr><th scope="row">To</th><td>${esc(r.toAirport)} (${esc(r.toCode)}), ${esc(r.to)}</td></tr>
                <tr><th scope="row">Flying time</th><td>${esc(r.duration)}</td></tr>
                <tr><th scope="row">Airlines commonly serving</th><td>${esc(r.carriers.join(', '))}</td></tr>
                <tr><th scope="row">Cabin classes</th><td>Economy, Premium Economy and Business subject to carrier and availability</td></tr>
                <tr><th scope="row">Fare</th><td>Quoted live for your dates &mdash; see below</td></tr>
              </tbody>
            </table>
          </div>
          <p class="form-note">Airlines, schedules and flying times change with the season and are shown as general guidance. We confirm the actual carrier, routing and timings in your written quotation.</p>

          <h2 style="margin-top:var(--sp-10)">Worth Knowing on This Route</h2>
          <ul class="tick-list tick-list--gold" style="margin-top:var(--sp-5)">
            ${each(r.notes, (nn) => `<li>${esc(nn)}</li>`)}
          </ul>

          ${c.inlineCta({
            title: `Get a live fare for ${esc(r.from)} to ${esc(r.to)}`,
            text: 'Send us your dates and passenger numbers and we will come back with options.',
            waMessage: wa,
            quoteLabel: 'Request a Fare',
          })}

          <h2 style="margin-top:var(--sp-10)">What Our Ticketing Desk Checks</h2>
          <ol class="steps" style="margin-top:var(--sp-6)">
            ${[
              { title: 'Fare Across Carriers', text: 'We compare published, consolidator and group fares for your exact dates.' },
              { title: 'Routing & Transit', text: 'Transit length and airport changes are flagged before you choose, not after.' },
              { title: 'Baggage Both Ways', text: 'Checked and cabin allowance confirmed for the outbound and the return.' },
              { title: 'Fare Rules', text: 'Change fees, refundability and name-correction terms in plain language.' },
            ]
              .map(c.stepItem)
              .join('')}
          </ol>

          <h2 style="margin-top:var(--sp-10)">Other Routes We Book</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-5)">
            ${related.map(routeCard).join('')}
          </div>
        </div>
        ${flightSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: `${title} FAQs`, center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(routeFaqs, `flight-${r.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: `${r.from} to ${r.to} Flights | Fares, Airlines & Baggage`,
      description:
        `${r.from} to ${r.to} flights (${r.fromCode}–${r.toCode}) — direct and connecting options on ${r.carriers[0]} and more, with baggage and fare rules confirmed before you pay.`,
      crumbs: [crumbBase, { label: `${r.from} to ${r.to}`, url }],
      body,
      schema: [
        {
          '@type': 'Service',
          name: `${r.from} to ${r.to} Flight Booking`,
          serviceType: 'Air ticketing',
          description: `Flight booking and ticketing for the ${r.from} (${r.fromCode}) to ${r.to} (${r.toCode}) route.`,
          url: `${site.url}${url}`,
          provider: { '@id': `${site.url}/#organization` },
          areaServed: { '@type': 'Country', name: 'Pakistan' },
        },
        c.faqSchema(routeFaqs),
      ],
      waMessage: wa,
    }),
    priority: r.featured ? '0.85' : '0.75',
    changefreq: 'weekly',
  };
}

module.exports = () => [hubPage(), ...routes.map(routePage)];
