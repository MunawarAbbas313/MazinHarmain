/* ==========================================================================
   Umrah section — hub, tier pages, duration pages, special pages, city pages.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const U = require('../data/umrah');

const BASE = '/umrah-packages/';
const crumbBase = { label: 'Umrah Packages', url: BASE };

/* Shared blocks -------------------------------------------------------- */
function inclusionsBlock() {
  return `
          <h2>What Every Package Includes</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-5)">
            <div>
              <h3 style="font-size:var(--fs-md)">Included</h3>
              <ul class="tick-list">
                ${each(U.standardIncludes, (i) => `<li>${esc(i)}</li>`)}
              </ul>
            </div>
            <div>
              <h3 style="font-size:var(--fs-md)">Not Included</h3>
              <ul class="cross-list">
                ${each(U.standardExcludes, (i) => `<li>${esc(i)}</li>`)}
              </ul>
            </div>
          </div>
          <div class="callout callout--gold">
            <span class="callout__title">About pricing</span>
            <p>Umrah package prices move through the year with hotel rates, airfares and the season. We quote current, real pricing on request rather than publishing figures that date within weeks &mdash; and every quotation states exactly what is and is not included before you pay anything.</p>
          </div>`;
}

function umrahSidebar(wa) {
  const links = [
    { label: 'All Umrah Packages', url: BASE },
    ...U.tiers.map((t) => ({ label: t.title, url: `${BASE}${t.slug}/` })),
    ...U.durations.map((d) => ({ label: d.title, url: `${BASE}${d.slug}/` })),
    { label: 'Ramadan Umrah', url: `${BASE}ramadan-umrah-packages/` },
    { label: 'Family Umrah', url: `${BASE}family-umrah-packages/` },
    { label: 'Group Umrah', url: `${BASE}group-umrah-packages/` },
    { label: 'Umrah Visa', url: `${BASE}umrah-visa/` },
  ];
  return `
        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Umrah Packages', links)}
          ${c.linkListCard('Useful Guides', [
            { label: 'Complete Umrah Guide', url: '/travel-guides/umrah-guide-for-pakistani-travellers/' },
            { label: 'Vaccination Certificate', url: '/travel-guides/nadra-vaccination-certificate-umrah-hajj/' },
            { label: 'How Nusuk Works', url: '/travel-guides/nusuk-registration-guide-for-umrah/' },
            { label: 'Preparing for Umrah', url: '/travel-guides/how-to-prepare-for-your-umrah-journey/' },
            { label: 'Choosing a Makkah Hotel', url: '/travel-guides/best-hotels-near-masjid-al-haram/' },
          ])}
        </aside>`;
}

function productSchema(name, description, url) {
  return {
    '@type': 'Product',
    name,
    description,
    url: `${site.url}${url}`,
    brand: { '@type': 'Brand', name: site.name },
    category: 'Umrah Package',
    offers: {
      '@type': 'Offer',
      url: `${site.url}${url}`,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${site.url}/#organization` },
      // Price intentionally omitted — quoted on request, see brief section 7.
    },
  };
}

/* ------------------------------------------------------------------- Hub */
function hubPage() {
  const wa = 'Assalam o Alaikum, I would like to enquire about your Umrah packages.';

  const tierCards = U.tiers.map((t) =>
    c.packageCard({
      title: t.title,
      subtitle: t.subtitle,
      tier: t.tier,
      featured: t.featured,
      specs: t.specs.slice(0, 6),
      url: `${BASE}${t.slug}/`,
      price: 'On request',
      priceNote: U.PRICE_NOTE,
    })
  );

  const durationCards = U.durations.map(
    (d) => `
        <a class="card" href="${BASE}${attr(d.slug)}/">
          <span class="card__icon">${icon('calendar', { size: 24 })}</span>
          <div class="card__body">
            <h3>${esc(d.title)}</h3>
            <p>${d.makkah} nights Makkah &middot; ${d.madinah} nights Madinah</p>
            <p style="font-size:var(--fs-xs)">${esc(d.bestFor)}</p>
          </div>
          <span class="link-arrow">View package</span>
        </a>`
  );

  const specialCards = U.special.map((s) =>
    c.iconCard({ url: `${BASE}${s.slug}/`, icon: s.icon, title: s.title, text: s.lead.slice(0, 110) + '…' })
  );

  const cityChips = U.cities.map(
    (city) => `<a class="pill" href="${BASE}${attr(city.slug)}/">Umrah from ${esc(city.city)}</a>`
  );

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: 'Umrah Packages',
    title: 'Umrah Packages from Pakistan',
    text: 'Your sacred journey, carefully planned. Economy to VIP packages with the Umrah visa, flights, hotels in Makkah and Madinah, transfers and ziyarat included &mdash; departing from every major Pakistani city.',
    buttons: [c.btn.quote('Get Umrah Pricing'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>Mazin Haramain Tours &amp; Travels arranges Umrah for individuals, families, masjid jamaats and corporate groups from across Pakistan. Every package covers the same essentials &mdash; the Umrah visa, return flights, accommodation in both holy cities, all transfers, and guided ziyarat &mdash; and differs in hotel category, distance from the Haram and room occupancy.</p>
            <p>The two decisions that matter most are the walking distance from your hotel to the Haram and the number of people in your room. We state both explicitly in every quotation, because they determine how the journey actually feels far more than a star rating does.</p>
          </div>

          <h2 style="margin-top:var(--sp-10)">Choose Your Package Category</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${tierCards.join('')}
          </div>

          <h2 style="margin-top:var(--sp-12)">Packages by Duration</h2>
          <div class="grid grid--3" style="margin-top:var(--sp-6)">
            ${durationCards.join('')}
          </div>

          <h2 style="margin-top:var(--sp-12)">Special Umrah Programmes</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${specialCards.join('')}
          </div>

          <h2 style="margin-top:var(--sp-12)">Departing From Your City</h2>
          <p style="color:var(--muted)">We arrange Umrah departures from every major airport in Pakistan.</p>
          <div class="pill-row" style="margin-top:var(--sp-4)">
            ${cityChips.join('\n            ')}
          </div>

          ${inclusionsBlock()}
        </div>
        ${umrahSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: 'Umrah Package FAQs', center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(U.umrahFaqs, 'umrah-hub')}
      </div>`,
  })}

${c.ctaBand({ title: 'Ready to Plan Your Umrah?', text: 'Send us your dates and requirements and we will come back with current pricing and hotel options.', waMessage: wa })}`;

  return {
    url: BASE,
    html: layout({
      url: BASE,
      ogImage: '/assets/img/hotels/makkah-hotels.jpg',
      ogImageAlt: 'Masjid al-Haram and the Makkah skyline at night',
      title: 'Umrah Packages from Pakistan 2026 | Economy to VIP — Mazin Haramain',
      description:
        'Umrah packages from Pakistan with visa, flights, Makkah and Madinah hotels, transfers and ziyarat included. Economy, executive, premium and VIP options.',
      crumbs: [crumbBase],
      body,
      schema: [c.faqSchema(U.umrahFaqs), c.serviceSchema({ name: 'Umrah Packages', description: 'Umrah packages from Pakistan including visa, flights, hotels, transfers and ziyarat.', url: BASE })],
      waMessage: wa,
    }),
    priority: '0.95',
    changefreq: 'weekly',
  };
}

/* ------------------------------------------------------------ Tier pages */
function tierPage(t) {
  const url = `${BASE}${t.slug}/`;
  const wa = `Assalam o Alaikum, I am interested in the ${t.title}. Please share current pricing and hotel options.`;

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: `${t.tier} Umrah`,
    title: t.h1,
    text: esc(t.lead),
    buttons: [c.btn.quote('Get Current Pricing'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${t.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">Package at a Glance</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${c.packageCard({
              title: t.title,
              subtitle: t.subtitle,
              tier: t.tier,
              featured: t.featured,
              specs: t.specs,
              price: 'On request',
              priceNote: U.PRICE_NOTE,
            })}
            <div>
              <h3>Who This Package Suits</h3>
              <ul class="tick-list tick-list--gold">
                ${each(t.suitedTo, (i) => `<li>${esc(i)}</li>`)}
              </ul>
              ${c.inlineCta({
                title: 'Want a different hotel or duration?',
                text: 'Every package can be adjusted to your dates and requirements.',
                waMessage: wa,
                quoteLabel: 'Customise It',
              })}
            </div>
          </div>

          ${inclusionsBlock()}

          <h2 style="margin-top:var(--sp-10)">Other Package Categories</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-5)">
            ${U.tiers
              .filter((x) => x.slug !== t.slug)
              .map((x) =>
                c.iconCard({ url: `${BASE}${x.slug}/`, icon: 'kaaba', title: x.title, text: x.blurb })
              )
              .join('')}
          </div>
        </div>
        ${umrahSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: 'Umrah Package FAQs', center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(U.umrahFaqs, `tier-${t.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: t.metaTitle,
      description: t.metaDescription,
      crumbs: [crumbBase, { label: t.title, url }],
      body,
      schema: [productSchema(t.title, t.metaDescription, url), c.faqSchema(U.umrahFaqs)],
      waMessage: wa,
    }),
    priority: '0.9',
    changefreq: 'weekly',
  };
}

/* -------------------------------------------------------- Duration pages */
function durationPage(d) {
  const url = `${BASE}${d.slug}/`;
  const wa = `Assalam o Alaikum, I am interested in the ${d.title}. Please share current pricing.`;

  const specs = [
    { label: 'Total Duration', value: `${d.days} days` },
    { label: 'Makkah', value: `${d.makkah} nights` },
    { label: 'Madinah', value: `${d.madinah} nights` },
    { label: 'Umrah Visa', value: 'Included' },
    { label: 'Return Flights', value: 'Included' },
    { label: 'Transport', value: 'Included' },
    { label: 'Ziyarat', value: 'Both cities' },
    { label: 'Hotel Category', value: 'Economy to VIP' },
  ];

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: `${d.days} Day Umrah`,
    title: d.h1,
    text: esc(d.lead),
    buttons: [c.btn.quote('Get Current Pricing'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${d.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">Itinerary Overview</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${c.packageCard({
              title: d.title,
              subtitle: `${d.makkah} nights Makkah · ${d.madinah} nights Madinah`,
              tier: `${d.days} Days`,
              specs,
              price: 'On request',
              priceNote: U.PRICE_NOTE,
            })}
            <div>
              <h3>Best Suited To</h3>
              <p style="color:var(--muted)">${esc(d.bestFor)}</p>
              <h3 style="margin-top:var(--sp-6)">Available in Every Category</h3>
              <ul class="tick-list tick-list--gold">
                ${each(U.tiers.map((t) => `${t.tier} — ${t.subtitle}`), (i) => `<li>${esc(i)}</li>`)}
              </ul>
              ${c.inlineCta({
                title: 'Need different dates?',
                text: 'We adjust the split of nights and the departure date to suit you.',
                waMessage: wa,
                quoteLabel: 'Customise It',
              })}
            </div>
          </div>

          ${inclusionsBlock()}

          <h2 style="margin-top:var(--sp-10)">Other Durations</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-5)">
            ${U.durations
              .filter((x) => x.slug !== d.slug)
              .map((x) =>
                c.iconCard({
                  url: `${BASE}${x.slug}/`,
                  icon: 'calendar',
                  title: x.title,
                  text: `${x.makkah} nights Makkah, ${x.madinah} nights Madinah`,
                })
              )
              .join('')}
          </div>
        </div>
        ${umrahSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: 'Umrah Package FAQs', center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(U.umrahFaqs, `dur-${d.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: d.metaTitle,
      description: d.metaDescription,
      crumbs: [crumbBase, { label: d.title, url }],
      body,
      schema: [productSchema(d.title, d.metaDescription, url), c.faqSchema(U.umrahFaqs)],
      waMessage: wa,
    }),
    priority: '0.85',
    changefreq: 'weekly',
  };
}

/* --------------------------------------------------------- Special pages */
function specialPage(s) {
  const url = `${BASE}${s.slug}/`;
  const wa = `Assalam o Alaikum, I would like to enquire about ${s.title}.`;

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: 'Umrah',
    title: s.h1,
    text: esc(s.lead),
    buttons: [c.btn.quote(), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${s.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">What We Arrange</h2>
          <div class="feature-row" style="margin-top:var(--sp-6)">
            ${s.options.map((o) => c.featureItem({ icon: s.icon, title: o.title, text: o.text })).join('')}
          </div>

          ${c.inlineCta({
            title: 'Speak to a consultant',
            text: 'Tell us your dates and group and we will come back with options.',
            waMessage: wa,
          })}

          ${s.slug === 'umrah-visa' ? '' : inclusionsBlock()}
        </div>
        ${umrahSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: `${s.title} FAQs`, center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(s.faqs, `sp-${s.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: s.metaTitle,
      description: s.metaDescription,
      crumbs: [crumbBase, { label: s.title, url }],
      body,
      schema: [
        c.serviceSchema({ name: s.title, description: s.metaDescription, url }),
        c.faqSchema(s.faqs),
      ],
      waMessage: wa,
    }),
    priority: '0.85',
    changefreq: 'weekly',
  };
}

/* ------------------------------------------------------------ City pages */
function cityPage(city) {
  const url = `${BASE}${city.slug}/`;
  const title = `Umrah Packages from ${city.city}`;
  const wa = `Assalam o Alaikum, I would like Umrah package pricing for departure from ${city.city}.`;

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: `Departing ${city.city}`,
    title: `${title} — Visa, Flights & Hotels`,
    text: `Umrah packages departing from ${esc(city.city)} with the Umrah visa, return flights from ${esc(city.airport)}, hotels in Makkah and Madinah, all transfers and ziyarat included.`,
    buttons: [c.btn.quote('Get Pricing'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>We arrange Umrah for pilgrims travelling from ${esc(city.city)} and the surrounding districts, with departures from ${esc(city.airport)}. Every package includes the Umrah visa, return airfare, hotel accommodation in both holy cities, all airport and intercity transfers, and guided ziyarat in Makkah and Madinah.</p>
            <p>${esc(city.note)}</p>
            <p>Packages are available in economy, executive, premium and VIP categories, and in durations from ten to twenty-eight days. Whatever you choose, the quotation states the actual walking distance from your hotel to the Haram and the room occupancy &mdash; the two things that determine how the journey feels day to day.</p>
          </div>

          <h2 style="margin-top:var(--sp-10)">Package Categories from ${esc(city.city)}</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${U.tiers
              .map((t) => c.iconCard({ url: `${BASE}${t.slug}/`, icon: 'kaaba', title: t.title, text: t.blurb }))
              .join('')}
          </div>

          <h2 style="margin-top:var(--sp-12)">Popular Durations</h2>
          <div class="grid grid--3" style="margin-top:var(--sp-6)">
            ${U.durations
              .map((d) =>
                c.iconCard({
                  url: `${BASE}${d.slug}/`,
                  icon: 'calendar',
                  title: d.title,
                  text: `${d.makkah} nights Makkah, ${d.madinah} nights Madinah`,
                })
              )
              .join('')}
          </div>

          ${inclusionsBlock()}

          <h2 style="margin-top:var(--sp-10)">Other Departure Cities</h2>
          <div class="pill-row" style="margin-top:var(--sp-4)">
            ${U.cities
              .filter((x) => x.slug !== city.slug)
              .map((x) => `<a class="pill" href="${BASE}${attr(x.slug)}/">Umrah from ${esc(x.city)}</a>`)
              .join('\n            ')}
          </div>
        </div>
        ${umrahSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: 'Umrah Package FAQs', center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(U.umrahFaqs, `city-${city.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: `Umrah Packages from ${city.city} | Visa, Flights & Hotels`,
      description: `Umrah packages from ${city.city} with visa, return flights, hotels in Makkah and Madinah, transfers and ziyarat included. Economy to VIP options.`,
      crumbs: [crumbBase, { label: `From ${city.city}`, url }],
      body,
      schema: [
        c.serviceSchema({
          name: title,
          description: `Umrah packages departing from ${city.city}, Pakistan.`,
          url,
          areaServed: 'Pakistan',
        }),
        c.faqSchema(U.umrahFaqs),
      ],
      waMessage: wa,
    }),
    priority: '0.8',
    changefreq: 'weekly',
  };
}

module.exports = () => [
  hubPage(),
  ...U.tiers.map(tierPage),
  ...U.durations.map(durationPage),
  ...U.special.map(specialPage),
  ...U.cities.map(cityPage),
];
