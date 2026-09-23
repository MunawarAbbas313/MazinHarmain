/* ==========================================================================
   International tours — hub + destination pages.
   ========================================================================== */

const { layout } = require('../templates/layout');
const c = require('../templates/components');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const { destinations } = require('../data/destinations');
const { countries } = require('../data/visa-countries');

const BASE = '/destinations/';

/* Europe is a region, not a country, and the page never said which countries
   it meant. A visitor looking for Italy or Poland had no way to see from the
   Europe page that either is handled. These are the European destinations the
   agency runs visas for, each linking to its own page.

   Only regional destinations get this — a Turkey page listing "Turkey" would
   be absurd. */
const REGION_COUNTRIES = {
  europe: (c) => c.region === 'Europe' && c.slug !== 'uk-visa' && c.slug !== 'schengen-visa',
};

function regionCountries(slug) {
  const pick = REGION_COUNTRIES[slug];
  if (!pick) return [];
  return countries.filter(pick);
}

const crumbBase = { label: 'Destinations', url: BASE };

function destSidebar(wa) {
  return `
        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('All Destinations', [
            { label: 'Destination Index', url: BASE },
            ...destinations.map((d) => ({ label: d.name, url: `${BASE}${d.slug}/` })),
          ])}
          ${c.linkListCard('Plan Your Trip', [
            { label: 'Air Ticketing', url: '/services/air-ticketing/' },
            { label: 'Hotel Reservations', url: '/hotels/' },
            { label: 'Visa Services', url: '/visa-services/' },
            { label: 'Travel Insurance', url: '/services/travel-insurance/' },
            { label: 'Airport Transfers', url: '/services/airport-transfers/' },
          ])}
        </aside>`;
}

/* ------------------------------------------------------------------- Hub */
function hubPage() {
  const wa = 'Assalam o Alaikum, I would like to enquire about your international tour packages.';

  const cards = destinations.map((d) =>
    c.mediaCard({
      url: `${BASE}${d.slug}/`,
      title: d.name,
      text: d.tagline,
      image: `/assets/img/destinations/${d.slug}.jpg`,
      imageAlt: `${d.name} tour packages from Pakistan`,
      badge: d.featured ? 'Popular' : '',
      meta: [{ icon: 'compass', label: d.region }],
    })
  );

  const body = `
${c.pageHero({
    image: '/assets/img/destinations/turkey.jpg',
    imageAlt: 'The Istanbul skyline and boats on the Bosphorus at golden sunset',
    eyebrow: 'International Tours',
    title: 'Explore the World With Mazin Haramain',
    text: 'Customised and group tour packages to the destinations Pakistani travellers ask for most &mdash; with flights, hotels, transfers, guided tours and visa assistance arranged together.',
    buttons: [c.btn.quote('Plan My Trip'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>We build tours rather than sell templates. Two families going to the same country in the same week often want quite different trips &mdash; one wants three cities and a packed itinerary, the other wants one base and time to breathe. Both are valid, and the itinerary should reflect which one you are.</p>
            <p>Every package below can be adjusted: different cities, different durations, different hotel categories, different departure dates. And because we handle the visa alongside the booking, the flight and hotel confirmations in your application are real bookings for the trip you are actually taking.</p>
          </div>

          <div class="grid grid--3 reveal" style="margin-top:var(--sp-8)">
            ${cards.join('')}
          </div>

          ${c.inlineCta({
            title: 'Somewhere else in mind?',
            text: 'We arrange travel worldwide — tell us where you want to go.',
            waMessage: wa,
          })}
        </div>
        ${destSidebar(wa)}
      </div>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url: BASE,
    html: layout({
      url: BASE,
      title: 'International Tour Packages from Pakistan | Destinations & Holidays',
      description:
        'International tour packages from Pakistan — Turkey, Azerbaijan, Dubai, Malaysia, Thailand, Maldives, Europe and more, with flights, hotels, transfers and visa assistance.',
      crumbs: [crumbBase],
      body,
      waMessage: wa,
    }),
    priority: '0.9',
    changefreq: 'monthly',
  };
}

/* ------------------------------------------------------ Destination page */
function destinationPage(d) {
  const url = `${BASE}${d.slug}/`;
  const wa = `Assalam o Alaikum, I would like to enquire about your ${d.name} tour packages.`;

  const packageCards = d.packages.map(
    (p) => `
        <article class="card">
          <span class="card__icon">${icon('compass', { size: 24 })}</span>
          <div class="card__body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.text)}</p>
          </div>
          <div class="price-block" style="border-top:1px solid var(--line);padding-top:var(--sp-4)">
            <div class="price-block__label">Starting from</div>
            <div class="price-block__value">On request</div>
            <div class="price-block__note">Per person, based on your dates and group size</div>
          </div>
          <div class="btn-row">
            ${c.btn.quote('Get a Quote', ' btn--sm')}
            ${c.btn.whatsapp(`Assalam o Alaikum, I am interested in the ${p.title} package for ${d.name}.`, 'WhatsApp', ' btn--sm')}
          </div>
        </article>`
  );

  const body = `
${c.pageHero({
    image: `/assets/img/destinations/${d.slug}.jpg`,
    imageAlt: `${d.name} tour packages from Pakistan`,
    eyebrow: `${d.region} · Tour Packages`,
    title: `${d.name} Tour Packages from Pakistan`,
    text: esc(d.lead),
    buttons: [c.btn.quote('Get a Quote'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${d.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          ${(() => {
            const inRegion = regionCountries(d.slug);
            if (!inRegion.length) return '';
            return `
          <h2 style="margin-top:var(--sp-10)">Countries We Cover in ${esc(d.name)}</h2>
          <p style="margin-top:var(--sp-3);color:var(--muted)">A Schengen visa covers most of these on one application. Tap a country for its own requirements, processing time and documents.</p>
          <ul class="country-chips" style="margin-top:var(--sp-5)">
            ${each(inRegion, (co) => `<li><a href="/visa-services/${attr(co.slug)}/"><span class="country-chips__flag" aria-hidden="true">${co.flag}</span>${esc(co.name)}</a></li>`)}
            <li><a href="/visa-services/schengen-visa/"><span class="country-chips__flag" aria-hidden="true">🇪🇺</span>Schengen Area</a></li>
          </ul>`;
          })()}

          <h2 style="margin-top:var(--sp-10)">Highlights</h2>
          <ul class="tick-list tick-list--gold tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(d.highlights, (h) => `<li>${esc(h)}</li>`)}
          </ul>

          <h2 style="margin-top:var(--sp-10)">Sample Packages</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${packageCards.join('')}
          </div>

          <div class="callout callout--gold">
            <span class="callout__title">Every package is adjustable</span>
            <p>These are starting points, not fixed products. Change the cities, the number of nights, the hotel category or the departure date and we will re-cost it. Prices depend on season, airline and hotel choice, so we quote current rates on request.</p>
          </div>

          <h2 style="margin-top:var(--sp-10)">Best Time to Visit</h2>
          <p>${esc(d.bestTime)}</p>

          <h2 style="margin-top:var(--sp-10)">Visa Requirements</h2>
          <p>Pakistani passport holders should confirm the current visa requirement for ${esc(d.name)} before booking. We handle the application alongside your travel arrangements &mdash; see our <a href="${attr(d.visaUrl)}">${esc(d.name)} visa page</a> for documents and process.</p>

          <h2 style="margin-top:var(--sp-10)">What's Included</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(
              [
                'Return international flights',
                'Hotel accommodation with breakfast',
                'Airport transfers on arrival and departure',
                'Guided city tours as per itinerary',
                'Entrance tickets where specified',
                'Visa application assistance',
                'Travel insurance options',
                'WhatsApp support throughout your trip',
              ],
              (i) => `<li>${esc(i)}</li>`
            )}
          </ul>

          ${c.inlineCta({
            title: `Planning a trip to ${esc(d.name)}?`,
            text: 'Send us your dates and group size for a costed itinerary.',
            waMessage: wa,
          })}

          <h2 style="margin-top:var(--sp-10)">Other Destinations</h2>
          <div class="grid grid--3" style="margin-top:var(--sp-5)">
            ${destinations
              .filter((x) => x.slug !== d.slug)
              .slice(0, 6)
              .map((x) =>
                c.mediaCard({
                  url: `${BASE}${x.slug}/`,
                  title: x.name,
                  text: x.tagline,
                  image: `/assets/img/destinations/${x.slug}.jpg`,
                  imageAlt: `${x.name} tour packages`,
                })
              )
              .join('')}
          </div>
        </div>
        ${destSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: `${d.name} Travel FAQs`, center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(d.faqs, `dest-${d.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: d.metaTitle,
      description: d.metaDescription,
      ogImage: `/assets/img/destinations/${d.slug}.jpg`,
      ogImageAlt: `${d.name} tour packages from Pakistan`,
      crumbs: [crumbBase, { label: d.name, url }],
      body,
      schema: [
        {
          '@type': 'TouristDestination',
          name: d.name,
          description: d.metaDescription,
          url: `${require('../data/site').url}${url}`,
          touristType: 'Leisure and family travellers from Pakistan',
        },
        c.faqSchema(d.faqs),
      ],
      waMessage: wa,
    }),
    priority: d.featured ? '0.85' : '0.75',
    changefreq: 'monthly',
  };
}

module.exports = () => [hubPage(), ...destinations.map(destinationPage)];
