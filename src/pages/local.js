/* ==========================================================================
   Local landing page: "travel agency in Islamabad".
   Local intent is where a Blue Area agency actually competes — people search
   for an agency near them before they search for a package. This page targets
   that, and carries the LocalBusiness detail Google uses for the map pack.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const { services } = require('../data/services');

const URL = '/travel-agency-in-islamabad/';

/* Areas we genuinely serve from the Blue Area office. */
const AREAS = [
  'Blue Area', 'F-6 / F-7 / F-8', 'G-6 / G-7 / G-8', 'G-9 / G-10 / G-11',
  'I-8 / I-9 / I-10', 'E-11', 'F-10 / F-11', 'Bahria Town',
  'DHA Islamabad', 'Gulberg Greens', 'Rawalpindi Saddar', 'Bahria Phase 1–8',
];

const faqs = [
  {
    q: 'Where is your travel agency located in Islamabad?',
    a: `<p>${esc(site.address.line1)}, ${esc(site.address.line2)}, ${esc(site.address.city)}. We are in the Blue Area commercial district on Fazal-e-Haq Road, reachable from most of Islamabad in under half an hour and from Rawalpindi via the Metro Bus. <a href="${attr(site.address.mapLink)}" target="_blank" rel="noopener">Open in Google Maps</a>.</p>`,
  },
  {
    q: 'Do I need an appointment to visit?',
    a: '<p>No, you are welcome to walk in during business hours. That said, a quick call or WhatsApp first means the right consultant is free when you arrive, and we can have current options ready rather than starting from scratch.</p>',
  },
  {
    q: 'What are your office hours?',
    a: `<p>${esc(site.openingHoursText)}. WhatsApp messages sent outside those hours are answered the next working day, and we monitor the line for clients who are already travelling.</p>`,
  },
  {
    q: 'Can you help if I live outside Islamabad?',
    a: '<p>Yes. Most of our bookings are handled remotely by phone, WhatsApp and email — for clients across Pakistan and for overseas Pakistanis arranging travel for family at home. Nothing about the service requires you to visit in person.</p>',
  },
  {
    q: 'Which airport will I fly from?',
    a: '<p>Islamabad International Airport (ISB) serves both Islamabad and Rawalpindi. Where a departure from Lahore or Karachi prices materially better, we will tell you and price both so you can decide.</p>',
  },
  {
    q: 'Do you handle Umrah for Rawalpindi clients?',
    a: '<p>Yes, and a large share of our pilgrims are from Rawalpindi. The departure airport is the same, and our office is a straightforward trip from Saddar and Committee Chowk. See our <a href="/umrah-packages/umrah-packages-from-rawalpindi/">Umrah packages from Rawalpindi</a>.</p>',
  },
  {
    q: 'Is it better to book in person or online?',
    a: '<p>Whichever you prefer — the price and the service are the same. Clients arranging a first Umrah or a complex visa file often prefer to sit down with the documents in front of them. Repeat clients usually just message us on WhatsApp.</p>',
  },
];

function render() {
  const wa = 'Assalam o Alaikum, I am in Islamabad and would like to visit your office / discuss my travel plans.';

  const body = `
${c.pageHero({
    image: '/assets/img/corporate-travel.jpg',
    imageAlt: 'A business traveller walking through an airport terminal',
    eyebrow: 'Blue Area, Islamabad',
    title: 'Travel Agency in Islamabad',
    text: 'Umrah, Hajj, visa assistance, air ticketing, hotels, tours and corporate travel &mdash; arranged from our office on Fazal-e-Haq Road, Blue Area. Walk in, call, or message us on WhatsApp.',
    buttons: [c.btn.quote('Get a Free Quote'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p class="lead">${esc(site.name)} is a travel management company based in Blue Area, Islamabad. We arrange the whole journey &mdash; the visa, the flights, the hotels, the transfers and the support while you are away &mdash; from one office, for one reason: the pieces have to be consistent with each other, and they rarely are when three different people book them.</p>

            <h2>Why visit us in person</h2>
            <p>Plenty of our clients never do, and that is fine. But there are two situations where sitting across a desk genuinely helps.</p>
            <p>The first is a first Umrah. There is a lot to take in &mdash; the hotel zones, the room occupancy, what ihram involves, what the vaccination requirement actually means this season. Twenty minutes in person covers more ground than an hour of messages.</p>
            <p>The second is a difficult visa file. If you have been refused before, or your financial documentation is complicated, or you are sponsoring family from abroad, we would rather look at the actual documents than describe them to each other.</p>

            <h2>What we arrange</h2>
            <p>Everything under one roof, which for a travel agency should be the minimum rather than a selling point:</p>
          </div>

          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${services
              .slice(0, 8)
              .map((s) => c.iconCard({ url: s.url, icon: s.icon, title: s.title, text: s.blurb }))
              .join('')}
          </div>

          <div class="prose" style="margin-top:var(--sp-10)">
            <h2>Getting to our office</h2>
            <p>We are at <strong>${esc(site.address.line1)}, ${esc(site.address.line2)}, ${esc(site.address.city)}</strong> &mdash; in the Blue Area commercial district, on Fazal-e-Haq Road.</p>
            <ul>
              <li><strong>From central Islamabad</strong> &mdash; Blue Area sits on Jinnah Avenue, a few minutes from the F-6 and F-7 sectors.</li>
              <li><strong>From Rawalpindi</strong> &mdash; the Metro Bus runs along Jinnah Avenue with stops a short walk from the office.</li>
              <li><strong>By car</strong> &mdash; street and building parking is available on and around Fazal-e-Haq Road.</li>
              <li><strong>From the airport</strong> &mdash; Islamabad International is roughly 30 to 45 minutes depending on traffic.</li>
            </ul>
            <p><a href="${attr(site.address.mapLink)}" target="_blank" rel="noopener">Open our location in Google Maps</a> for live directions.</p>

            <h2>Areas we serve</h2>
            <p>Clients visit us from across Islamabad and Rawalpindi, and we arrange travel for people throughout Pakistan and for overseas Pakistanis booking on behalf of family at home.</p>
          </div>

          <div class="pill-row" style="margin-top:var(--sp-5)">
            ${each(AREAS, (a) => `<span class="pill">${icon('pin', { size: 13 })} ${esc(a)}</span>`)}
          </div>

          <div class="prose" style="margin-top:var(--sp-10)">
            <h2>Departing from another city?</h2>
            <p>We arrange Umrah departures from every major airport in Pakistan, not only Islamabad.</p>
          </div>

          <div class="pill-row" style="margin-top:var(--sp-4)">
            ${each(
              [
                ['Islamabad', 'umrah-packages-from-islamabad'],
                ['Rawalpindi', 'umrah-packages-from-rawalpindi'],
                ['Lahore', 'umrah-packages-from-lahore'],
                ['Karachi', 'umrah-packages-from-karachi'],
                ['Peshawar', 'umrah-packages-from-peshawar'],
                ['Faisalabad', 'umrah-packages-from-faisalabad'],
                ['Multan', 'umrah-packages-from-multan'],
                ['Sialkot', 'umrah-packages-from-sialkot'],
              ],
              ([label, slug]) => `<a class="pill" href="/umrah-packages/${attr(slug)}/">Umrah from ${esc(label)}</a>`
            )}
          </div>

          ${c.inlineCta({
            title: 'Come and see us, or just message',
            text: 'Either works. Tell us what you are planning and we will take it from there.',
            waMessage: wa,
          })}
        </div>

        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          <div class="sidebar-card">
            <h3>Visit Our Office</h3>
            <ul style="display:grid;gap:var(--sp-4)">
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('pin', { size: 18 })}</span>
                <span>${esc(site.address.line1)},<br>${esc(site.address.line2)},<br>${esc(site.address.city)}</span>
              </li>
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('clock', { size: 18 })}</span>
                <span>${esc(site.openingHoursText)}</span>
              </li>
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('phone', { size: 18 })}</span>
                <span>${site.phones.map((p) => `<a href="tel:${attr(p.tel)}">${esc(p.label)}</a>`).join('<br>')}</span>
              </li>
            </ul>
          </div>
          ${c.linkListCard('Popular With Local Clients', [
            { label: 'Umrah Packages', url: '/umrah-packages/' },
            { label: 'Visa Services', url: '/visa-services/' },
            { label: 'Visa Appointments', url: '/services/visa-appointment-booking/' },
            { label: 'Flight Routes', url: '/flights/' },
            { label: 'Corporate Travel', url: '/corporate-travel/' },
            { label: 'Contact Us', url: '/contact/' },
          ])}
        </aside>
      </div>
    </div>
  </section>

  <section class="section section--tight section--cream">
    <div class="container">
      ${c.sectionHead({
        eyebrow: 'Find Us',
        title: 'Our Office in Blue Area, Islamabad',
        center: true,
        text: esc(site.address.full),
      })}
      ${c.mapPanel()}
    </div>
  </section>

${c.section({
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: 'Visiting Us — FAQs', center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(faqs, 'local-faq')}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url: URL,
    html: layout({
      url: URL,
      title: 'Travel Agency in Islamabad | Umrah, Visa & Flights — Blue Area',
      description:
        'Travel agency in Blue Area, Islamabad — Umrah and Hajj packages, visa assistance, air ticketing, hotels and corporate travel. Visit our Fazal-e-Haq Road office or message us.',
      crumbs: [{ label: 'Travel Agency in Islamabad', url: URL }],
      body,
      waMessage: wa,
      schema: [
        {
          '@type': 'TravelAgency',
          '@id': `${site.url}${URL}#localbusiness`,
          name: site.name,
          url: `${site.url}${URL}`,
          parentOrganization: { '@id': `${site.url}/#organization` },
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${site.address.line1}, ${site.address.line2}`,
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
          geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
          telephone: site.phonePrimary.tel,
          email: site.email,
          hasMap: site.address.mapLink,
          areaServed: AREAS.map((a) => ({ '@type': 'Place', name: `${a}, Islamabad` })),
        },
        c.faqSchema(faqs),
      ],
    }),
    priority: '0.9',
    changefreq: 'monthly',
  };
}

module.exports = () => [render()];
