/* ==========================================================================
   Hotel reservations — hub + city pages.
   ========================================================================== */

const { layout } = require('../templates/layout');
const c = require('../templates/components');
const { searchWidget } = require('../templates/search-widget');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const { orderServiceLinks } = require('../data/services');
const hotels = require('../data/hotels');

const BASE = '/hotels/';
const crumbBase = { label: 'Hotels', url: BASE };

function hotelSidebar(wa) {
  return `
        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Hotel Destinations', [
            { label: 'All Destinations', url: BASE },
            ...hotels.map((h) => ({ label: h.city, url: `${BASE}${h.slug}/` })),
          ])}
          ${c.linkListCard('Related Services', orderServiceLinks([
            { label: 'Umrah Packages', url: '/umrah-packages/' },
            { label: 'Air Ticketing', url: '/services/air-ticketing/' },
            { label: 'Airport Transfers', url: '/services/airport-transfers/' },
            { label: 'International Tours', url: '/destinations/' },
          ]))}
        </aside>`;
}

/* ------------------------------------------------------------------- Hub */
function hubPage() {
  const wa = 'Assalam o Alaikum, I would like to book hotel accommodation.';

  const cards = hotels.map((h) =>
    c.mediaCard({
      url: `${BASE}${h.slug}/`,
      title: h.city,
      text: h.lead,
      image: `/assets/img/hotels/${h.slug}.jpg`,
      imageAlt: `Hotels in ${h.city}`,
      badge: h.featured ? 'Most booked' : '',
      meta: [{ icon: 'hotel', label: 'Hotel booking' }],
    })
  );

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/worldwide-hotels.jpg',
    imageAlt: 'The lobby of a luxury hotel',
    eyebrow: 'Hotel Reservations',
    title: 'Stay Where You Want to Be',
    text: 'Hotel reservations worldwide &mdash; from Haram-facing properties in Makkah and Madinah to city hotels, beach resorts and corporate accommodation.',
    buttons: [c.btn.quote('Request a Booking'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

${searchWidget({ active: 'hotels' })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>Booking a hotel through us rather than an online platform is worth it in three specific situations. When the reservation supports a visa application, you get a confirmation in the format the mission expects. When you are travelling as a family or a group, connecting rooms and capacity are confirmed rather than merely requested. And if something is wrong at the property when you arrive, you have someone in Pakistan to call.</p>
            <p>For Makkah and Madinah we go further: we tell you the actual walking distance to the Haram, not the distance a booking site measures to the boundary. That single number matters more to a pilgrim than any star rating.</p>
          </div>

          <div class="grid grid--3 reveal" style="margin-top:var(--sp-8)">
            ${cards.join('')}
          </div>

          ${c.inlineCta({
            title: 'Booking for a different city?',
            text: 'We book accommodation worldwide — send us your city and dates.',
            waMessage: wa,
          })}
        </div>
        ${hotelSidebar(wa)}
      </div>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url: BASE,
    html: layout({
      url: BASE,
      title: 'Hotel Reservations from Pakistan | Makkah, Madinah & Worldwide',
      description:
        'Hotel reservations from Pakistan — Makkah and Madinah hotels near the Haram, plus Dubai, Istanbul, Baku, London, Europe and worldwide accommodation booked and confirmed.',
      crumbs: [crumbBase],
      body,
      schema: [c.serviceSchema({ name: 'Hotel Reservations', description: 'Worldwide hotel reservation services for travellers from Pakistan.', url: BASE })],
      waMessage: wa,
    }),
    priority: '0.85',
    changefreq: 'monthly',
  };
}

/* ------------------------------------------------------------ City page */
function hotelPage(h) {
  const url = `${BASE}${h.slug}/`;
  const wa = `Assalam o Alaikum, I would like to book a hotel in ${h.city}.`;

  const zoneCards = h.zones.map(
    (z) => `
        <div class="card card--flat">
          <span class="card__icon">${icon('pin', { size: 24 })}</span>
          <div class="card__body">
            <h3 style="font-size:var(--fs-md)">${esc(z.name)}</h3>
            <p>${esc(z.text)}</p>
          </div>
        </div>`
  );

  const body = `
${c.pageHero({
    image: `/assets/img/hotels/${h.slug}.jpg`,
    imageAlt: `Hotels in ${h.city}`,
    eyebrow: 'Hotel Reservations',
    title: `Hotels in ${h.city}`,
    text: esc(h.lead),
    buttons: [c.btn.quote('Request a Booking'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${h.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">${esc(h.city)} Hotel Areas</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${zoneCards.join('')}
          </div>

          <h2 style="margin-top:var(--sp-10)">What to Check Before Booking</h2>
          <ul class="tick-list tick-list--gold" style="margin-top:var(--sp-5)">
            ${each(h.considerations, (i) => `<li>${esc(i)}</li>`)}
          </ul>

          ${c.inlineCta({
            title: `Looking for a hotel in ${esc(h.city)}?`,
            text: 'Tell us your dates, budget and group and we will shortlist properties.',
            waMessage: wa,
          })}

          <h2 style="margin-top:var(--sp-10)">Other Destinations</h2>
          <div class="grid grid--3" style="margin-top:var(--sp-5)">
            ${hotels
              .filter((x) => x.slug !== h.slug)
              .slice(0, 6)
              .map((x) =>
                c.mediaCard({
                  url: `${BASE}${x.slug}/`,
                  title: x.city,
                  text: x.lead.slice(0, 90) + '…',
                  image: `/assets/img/hotels/${x.slug}.jpg`,
                  imageAlt: `Hotels in ${x.city}`,
                })
              )
              .join('')}
          </div>
        </div>
        ${hotelSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: `${h.city} Hotel FAQs`, center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(h.faqs, `hotel-${h.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: h.metaTitle,
      description: h.metaDescription,
      ogImage: `/assets/img/hotels/${h.slug}.jpg`,
      ogImageAlt: `Hotels in ${h.city}`,
      crumbs: [crumbBase, { label: h.city, url }],
      body,
      schema: [
        c.serviceSchema({ name: `Hotel Booking — ${h.city}`, description: h.metaDescription, url }),
        c.faqSchema(h.faqs),
      ],
      waMessage: wa,
    }),
    priority: h.featured ? '0.85' : '0.7',
    changefreq: 'monthly',
  };
}

module.exports = () => [hubPage(), ...hotels.map(hotelPage)];
