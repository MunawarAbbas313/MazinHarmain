/* ==========================================================================
   Visa section — hub, category pages, country pages.
   Every page carries the same disclaimer block: the brief is explicit that
   we never imply influence over a visa decision.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const { searchWidget } = require('../templates/search-widget');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const visaTypes = require('../data/visa-types');
const { countries, popularCountries, schengenCountries, otherCountries } = require('../data/visa-countries');
const { visaFlagCodes } = require('../data/flags');

const BASE = '/visa-services/';
const crumbBase = { label: 'Visa Services', url: BASE };

const DISCLAIMER = `
          <div class="callout callout--warn">
            <span class="callout__title">Important — please read</span>
            <p>Visa decisions are made solely by the relevant embassy, consulate or immigration authority. ${esc(site.name)} provides documentation and application assistance only, and does not guarantee the approval of any application. Visa fees and application centre charges are paid separately at the prescribed rates. See our full <a href="/visa-disclaimer/">visa disclaimer</a>.</p>
          </div>`;

/* Our standard assistance list — from the brief, section 9. */
const ASSISTANCE = [
  'Eligibility guidance for your category',
  'Document checklist tailored to your case',
  'Application form completion and review',
  'Appointment booking and slot monitoring',
  'Biometric enrolment scheduling',
  'Interview preparation where required',
  'File ordering to the centre\'s requirements',
  'Application tracking guidance after submission',
];

const CORE_DOCS = [
  'Valid passport with sufficient remaining validity',
  'CNIC copy',
  'Photographs to the required specification',
  'Bank statements for the required period',
  'Employment letter or business registration documents',
  'Travel itinerary and confirmed bookings',
  'Evidence of ties to Pakistan',
  'Travel insurance where the destination requires it',
];

function visaSidebar(wa) {
  return `
        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Visa Categories', [
            { label: 'All Visa Services', url: BASE },
            ...visaTypes.map((t) => ({ label: t.title, url: `${BASE}${t.slug}/` })),
          ])}
          ${c.linkListCard('Popular Countries', popularCountries.map((v) => ({ label: `${v.short || v.name} Visa`, url: `${BASE}${v.slug}/` })))}
          ${c.linkListCard('Helpful Guides', [
            { label: 'UK Visit Visa Guide', url: '/travel-guides/uk-visit-visa-guide-from-pakistan/' },
            { label: 'Schengen Visa Guide', url: '/travel-guides/schengen-visa-guide-from-pakistan/' },
            { label: 'Dubai Visa Guide', url: '/travel-guides/dubai-visa-guide-from-pakistan/' },
            { label: 'Travel Insurance Guide', url: '/travel-guides/travel-insurance-guide-for-pakistani-travellers/' },
          ])}
        </aside>`;
}

/* ------------------------------------------------------------------- Hub */
function hubPage() {
  const wa = 'Assalam o Alaikum, I would like assistance with a visa application.';

  const group = (title, list) => `
          <h2 style="margin-top:var(--sp-10)">${esc(title)}</h2>
          <div class="chip-grid" style="margin-top:var(--sp-5)">
            ${list
              .map((v) => c.chip({ url: `${BASE}${v.slug}/`, code: visaFlagCodes[v.slug], name: v.short || v.name, sub: 'Visa' }))
              .join('')}
          </div>`;

  const body = `
${c.pageHero({
    image: '/assets/img/visa-services.jpg',
    imageAlt: 'A passport with visa stamps, a compass and a travel planner on a world map',
    eyebrow: 'Visa Services',
    title: 'Visa Assistance Made Simple',
    text: 'Professional guidance for your visa application, documentation and appointment process &mdash; for more than forty destinations, from our office in Blue Area, Islamabad.',
    buttons: [c.btn.quote('Get Visa Assistance'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

${searchWidget({ active: 'visa' })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>A visa application is a written argument. The embassy is asking whether your trip is genuine, whether it is funded, and whether you will return &mdash; and it decides on the file in front of it, not on intentions. Most refusals we review were avoidable: a gap in the financial evidence, an itinerary the bookings did not support, or a document that contradicted another.</p>
            <p>We help you build a file that answers those questions before they are asked. That means a checklist specific to your category and destination, a review of your documents before submission, accurate completion of the application, the appointment booked at the correct centre, and a briefing on what to expect on the day.</p>
          </div>

          <h2 style="margin-top:var(--sp-10)">Our Assistance Includes</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(ASSISTANCE, (a) => `<li>${esc(a)}</li>`)}
          </ul>

          ${DISCLAIMER}

          <h2 style="margin-top:var(--sp-10)">Visa Categories</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-6)">
            ${visaTypes
              .map((t) => c.iconCard({ url: `${BASE}${t.slug}/`, icon: t.icon, title: t.title, text: t.lead }))
              .join('')}
          </div>

          ${group('Popular Destinations', popularCountries)}
          ${group('Schengen Countries', schengenCountries)}
          ${group('Other Destinations', otherCountries)}

          ${c.inlineCta({
            title: 'Need a visa appointment?',
            text: 'We identify the correct centre, complete the profile and monitor slot availability.',
            waMessage: 'Assalam o Alaikum, I need help booking a visa appointment.',
            quoteLabel: 'Book an Appointment',
          })}

          <h2 style="margin-top:var(--sp-10)">Documents Most Applications Need</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(CORE_DOCS, (d) => `<li>${esc(d)}</li>`)}
          </ul>
          <p style="color:var(--muted);font-size:var(--fs-sm);margin-top:var(--sp-4)">Requirements vary by destination and category. We issue a written checklist specific to your application.</p>
        </div>
        ${visaSidebar(wa)}
      </div>
    </div>
  </section>

${c.ctaBand({ title: 'Start Your Visa Application', text: 'Tell us your destination and travel dates and we will explain exactly what your file needs.', waMessage: wa })}`;

  return {
    url: BASE,
    html: layout({
      url: BASE,
      title: 'Visa Services in Islamabad | Visa Assistance for 40+ Countries',
      description:
        'Visa assistance from Islamabad for the UK, USA, Canada, Schengen, UAE, Turkey, Azerbaijan and 40+ destinations — document checklists, application support and appointment booking.',
      crumbs: [crumbBase],
      body,
      schema: [c.serviceSchema({ name: 'Visa Assistance Services', description: 'Visa documentation and application assistance for travellers from Pakistan.', url: BASE })],
      waMessage: wa,
    }),
    priority: '0.95',
    changefreq: 'weekly',
  };
}

/* ------------------------------------------------------ Category page */
function typePage(t) {
  const url = `${BASE}${t.slug}/`;
  const wa = `Assalam o Alaikum, I would like assistance with a ${t.title.toLowerCase()} application.`;

  const body = `
${c.pageHero({
    image: '/assets/img/visa-services.jpg',
    imageAlt: 'A passport with visa stamps, a compass and a travel planner on a world map',
    eyebrow: 'Visa Category',
    title: t.h1,
    text: esc(t.lead),
    buttons: [c.btn.quote('Get Assistance'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${t.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          <h2 style="margin-top:var(--sp-10)">What This Category Covers</h2>
          <ul class="tick-list" style="margin-top:var(--sp-5)">
            ${each(t.covers, (i) => `<li>${esc(i)}</li>`)}
          </ul>

          <h2 style="margin-top:var(--sp-10)">Documents Typically Required</h2>
          <ul class="tick-list tick-list--gold tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(t.keyDocs, (i) => `<li>${esc(i)}</li>`)}
          </ul>

          ${t.notice ? `<div class="callout callout--warn"><span class="callout__title">Please note</span><p>${esc(t.notice)}</p></div>` : ''}

          <h2 style="margin-top:var(--sp-10)">How We Assist</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(ASSISTANCE, (a) => `<li>${esc(a)}</li>`)}
          </ul>

          ${DISCLAIMER}

          ${c.inlineCta({
            title: `Applying for a ${t.title.toLowerCase()}?`,
            text: 'Send us your destination and circumstances for a tailored checklist.',
            waMessage: wa,
          })}

          <h2 style="margin-top:var(--sp-10)">Popular Destinations</h2>
          <div class="chip-grid" style="margin-top:var(--sp-5)">
            ${popularCountries
              .map((v) => c.chip({ url: `${BASE}${v.slug}/`, code: visaFlagCodes[v.slug], name: v.short || v.name, sub: 'Visa' }))
              .join('')}
          </div>

          <h2 style="margin-top:var(--sp-10)">Other Visa Categories</h2>
          <div class="grid grid--2" style="margin-top:var(--sp-5)">
            ${visaTypes
              .filter((x) => x.slug !== t.slug)
              .map((x) => c.iconCard({ url: `${BASE}${x.slug}/`, icon: x.icon, title: x.title, text: x.lead }))
              .join('')}
          </div>
        </div>
        ${visaSidebar(wa)}
      </div>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: t.metaTitle,
      description: t.metaDescription,
      crumbs: [crumbBase, { label: t.title, url }],
      body,
      schema: [c.serviceSchema({ name: t.title, description: t.metaDescription, url })],
      waMessage: wa,
    }),
    priority: '0.85',
    changefreq: 'monthly',
  };
}

/* -------------------------------------------------------- Country page */
function countryPage(v) {
  const url = `${BASE}${v.slug}/`;
  const name = v.name;
  const label = `${v.short || v.name} Visa`;
  const wa = `Assalam o Alaikum, I would like assistance with a ${name} visa application.`;

  const metaTitle = v.metaTitle || `${name} Visa from Pakistan | Documents & Process`;
  const metaDescription =
    v.metaDescription ||
    `${name} visa assistance from Pakistan — document checklist, application process, appointment booking and submission support from Mazin Haramain Tours & Travels, Islamabad.`;

  const docs = CORE_DOCS.concat(v.extraDocs || []);

  const faqs = (v.faqs || []).concat([
    {
      q: `Can you guarantee my ${name} visa will be approved?`,
      a: `<p>No. Visa decisions are made solely by the relevant embassy, consulate or immigration authority. We make sure your application is complete, consistent and properly evidenced, which is what genuinely affects outcomes. Anyone promising a guaranteed visa should be avoided.</p>`,
    },
    {
      q: `How long does the ${name} visa process take?`,
      a: `<p>Processing times are set by the mission and vary by season and application volume. Appointment availability is frequently the bigger constraint. Apply with a comfortable margin ahead of your travel date &mdash; we will advise on realistic timing for your case.</p>`,
    },
    {
      q: 'What are your service charges?',
      a: `<p>Our assistance fee depends on the destination and the complexity of the application, and is quoted before we begin. Embassy fees and application centre charges are separate and paid at the prescribed rates. Contact us on <a href="tel:${site.phonePrimary.tel}">${site.phonePrimary.label}</a> for a quotation.</p>`,
    },
  ]);

  const body = `
${c.pageHero({
    image: '/assets/img/visa-services.jpg',
    imageAlt: 'A passport with visa stamps, a compass and a travel planner on a world map',
    eyebrow: `${name} Visa`,
    title: `${label} from Pakistan`,
    text: esc(v.lead),
    buttons: [c.btn.quote('Get Assistance'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            ${v.intro.map((p) => `<p>${p}</p>`).join('\n            ')}
          </div>

          ${
            v.types
              ? `
          <h2 style="margin-top:var(--sp-10)">${esc(name)} Visa Categories</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(v.types, (i) => `<li>${esc(i)}</li>`)}
          </ul>`
              : ''
          }

          ${
            v.highlights
              ? `
          <h2 style="margin-top:var(--sp-10)">Why Travellers Apply</h2>
          <ul class="tick-list tick-list--gold tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(v.highlights, (i) => `<li>${esc(i)}</li>`)}
          </ul>`
              : ''
          }

          <h2 style="margin-top:var(--sp-10)">Documents Required</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(docs, (i) => `<li>${esc(i)}</li>`)}
          </ul>
          <p style="color:var(--muted);font-size:var(--fs-sm);margin-top:var(--sp-4)">This is a general list. Requirements differ by category and are updated by missions from time to time &mdash; we issue a written checklist specific to your application.</p>

          <h2 style="margin-top:var(--sp-10)">Our Assistance</h2>
          <ul class="tick-list tick-list--2col" style="margin-top:var(--sp-5)">
            ${each(ASSISTANCE, (a) => `<li>${esc(a)}</li>`)}
          </ul>

          ${
            v.vac
              ? `<div class="callout"><span class="callout__title">Where applications are submitted</span><p>${esc(v.vac)}. We identify the correct centre and category for your case and handle the <a href="/services/visa-appointment-booking/">appointment booking</a>.</p></div>`
              : ''
          }

          <h2 style="margin-top:var(--sp-10)">Application Process</h2>
          <ol class="steps" style="margin-top:var(--sp-6)">
            ${[
              { title: 'Consultation', text: 'We review your circumstances, confirm the right category and explain what the file needs.' },
              { title: 'Documentation', text: 'You receive a written checklist. We review every document before anything is submitted.' },
              { title: 'Application & Appointment', text: 'We complete the application and secure an appointment at the correct centre.' },
              { title: 'Submission & Tracking', text: 'You attend with a checked file, and we guide you on tracking the outcome.' },
            ]
              .map(c.stepItem)
              .join('')}
          </ol>

          ${DISCLAIMER}

          ${c.inlineCta({
            title: `Ready to apply for your ${esc(name)} visa?`,
            text: 'Send us your details and we will confirm the requirements for your case.',
            waMessage: wa,
          })}

          <h2 style="margin-top:var(--sp-10)">Other Destinations</h2>
          <div class="chip-grid" style="margin-top:var(--sp-5)">
            ${popularCountries
              .filter((x) => x.slug !== v.slug)
              .slice(0, 6)
              .map((x) => c.chip({ url: `${BASE}${x.slug}/`, code: visaFlagCodes[x.slug], name: x.short || x.name, sub: 'Visa' }))
              .join('')}
          </div>
          <div class="btn-row" style="margin-top:var(--sp-6)">
            ${c.btn.link(BASE, 'View All Visa Services', 'btn--outline')}
          </div>
        </div>
        ${visaSidebar(wa)}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Questions', title: `${label} FAQs`, center: true })}
      <div style="max-width:820px;margin-inline:auto">
        ${c.faqAccordion(faqs, `visa-${v.slug}`)}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: metaTitle,
      description: metaDescription,
      crumbs: [crumbBase, { label: label, url }],
      body,
      schema: [
        c.serviceSchema({ name: `${name} Visa Assistance`, description: metaDescription, url }),
        c.faqSchema(faqs),
      ],
      waMessage: wa,
    }),
    priority: v.popular ? '0.9' : '0.75',
    changefreq: 'monthly',
  };
}

module.exports = () => [hubPage(), ...visaTypes.map(typePage), ...countries.map(countryPage)];
