/* ==========================================================================
   Services hub + one landing page per service.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const { services, fullPages, bySlug } = require('../data/services');

/* ------------------------------------------------------------------- Hub */
function hubPage() {
  const cards = services.map((s) =>
    c.iconCard({ url: s.url, icon: s.icon, title: s.title, text: s.blurb })
  );

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: 'Our Services',
    title: 'Complete Travel Solutions Under One Roof',
    text: 'From planning your journey to reaching your destination, our team assists you at every step &mdash; Umrah and Hajj, visas, flights, hotels, tours, corporate travel and everything in between.',
    buttons: [c.btn.quote(), c.btn.whatsapp('Assalam o Alaikum, I would like to know more about your travel services.'), c.btn.callLight()],
  })}

${c.section({
    inner: `
      <div class="grid grid--3 reveal">
        ${cards.join('')}
      </div>`,
  })}

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({
      eyebrow: 'How We Work',
      title: 'A Simple, Transparent Process',
      text: 'Every booking follows the same four steps, whatever the service.',
      center: true,
    })}
      <ol class="steps steps--4">
        ${[
          { title: 'Tell Us Your Plan', text: 'Share your destination, dates and requirements by phone, WhatsApp or the quote form.' },
          { title: 'Get a Written Quote', text: 'We send options with pricing, inclusions and exclusions clearly stated.' },
          { title: 'Confirm & Pay', text: 'You choose an option and pay as agreed. Everything is confirmed in writing.' },
          { title: 'Travel With Support', text: 'Documents delivered, and our WhatsApp line stays open while you travel.' },
        ].map(c.stepItem).join('')}
      </ol>`,
  })}

${c.ctaBand()}`;

  return {
    url: '/services/',
    html: layout({
      url: '/services/',
      title: 'Travel Services in Islamabad | Umrah, Visa, Flights & Tours',
      description:
        'Complete travel services from Islamabad — Umrah packages, Hajj, visa assistance, visa appointments, air ticketing, hotels, tours and corporate travel.',
      crumbs: [{ label: 'Services', url: '/services/' }],
      body,
      waMessage: 'Assalam o Alaikum, I would like to know more about your travel services.',
    }),
    priority: '0.9',
    changefreq: 'monthly',
  };
}

/* -------------------------------------------------------- Service detail */
function servicePage(s) {
  const wa = `Assalam o Alaikum, I would like to enquire about your ${s.title} service.`;

  const related = (s.related || [])
    .map((url) => {
      const svc = services.find((x) => x.url === url);
      if (svc) return { label: svc.title, url };
      const labels = {
        '/umrah-packages/': 'Umrah Packages',
        '/hotels/': 'Hotel Reservations',
        '/destinations/': 'International Tours',
        '/corporate-travel/': 'Corporate Travel',
        '/visa-services/': 'Visa Services',
        '/travel-guides/': 'Travel Guides',
        '/hotels/makkah-hotels/': 'Hotels in Makkah',
        '/hotels/madinah-hotels/': 'Hotels in Madinah',
        '/destinations/dubai/': 'Dubai Tours',
        '/destinations/saudi-arabia/': 'Saudi Arabia',
        '/visa-services/schengen-visa/': 'Schengen Visa',
        '/visa-services/uk-visa/': 'UK Visa',
      };
      return { label: labels[url] || url, url };
    })
    .filter(Boolean);

  const body = `
${c.pageHero({
    image: s.heroImage,
    imageAlt: s.heroImageAlt,
    eyebrow: s.title,
    title: s.h1,
    text: esc(s.lead),
    buttons: [c.btn.quote('Get a Free Quote'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${s.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">What We Offer</h2>
          <div class="feature-row" style="margin-top:var(--sp-6)">
            ${s.features.map(c.featureItem).join('')}
          </div>

          ${c.inlineCta({
            title: 'Need help with this service?',
            text: 'Speak to a consultant about your requirements and travel dates.',
            waMessage: wa,
          })}

          <h2>What's Included</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(s.includes, (i) => `<li>${esc(i)}</li>`)}
          </ul>

          ${
            s.notice
              ? `<div class="callout callout--warn"><span class="callout__title">Please note</span><p>${esc(s.notice)}</p></div>`
              : ''
          }

          <h2 style="margin-top:var(--sp-10)">How It Works</h2>
          <ol class="steps" style="margin-top:var(--sp-6)">
            ${s.process.map(c.stepItem).join('')}
          </ol>
        </div>

        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${related.length ? c.linkListCard('Related Services', related) : ''}
          <div class="sidebar-card sidebar-card--cream">
            <h3>Office Hours</h3>
            <p style="font-size:var(--fs-sm);color:var(--muted)">${esc(site.openingHoursText)}</p>
            <p style="font-size:var(--fs-sm);color:var(--muted);margin-top:var(--sp-3)">${esc(site.address.line1)},<br>${esc(site.address.line2)},<br>${esc(site.address.city)}</p>
            <a class="link-arrow" href="/contact/" style="margin-top:var(--sp-3)">Visit our office</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({
      eyebrow: 'Questions',
      title: `${s.title} FAQs`,
      center: true,
    })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(s.faqs, `svc-${s.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url: s.url,
    html: layout({
      url: s.url,
      title: s.metaTitle,
      description: s.metaDescription,
      crumbs: [{ label: 'Services', url: '/services/' }, { label: s.title, url: s.url }],
      body,
      schema: [
        c.serviceSchema({ name: s.title, description: s.metaDescription, url: s.url }),
        c.faqSchema(s.faqs),
      ],
      waMessage: wa,
    }),
    priority: '0.8',
    changefreq: 'monthly',
  };
}

module.exports = () => [hubPage(), ...fullPages.map(servicePage)];
