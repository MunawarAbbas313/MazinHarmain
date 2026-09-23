/* ==========================================================================
   Reusable page components.
   Pages are assembled from these so a design change lands everywhere at once.
   ========================================================================== */

const site = require('../data/site');
const icon = require('../lib/icons');
const { esc, attr, each, slugify } = require('../lib/html');
const { firstAsset } = require('../lib/assets');
const { flagImg } = require('../data/flags');

/* -------------------------------------------------------------------------
   Section scaffolding
   ------------------------------------------------------------------------- */
function sectionHead({ eyebrow, title, text, center = false, level = 2, divider = true }) {
  const H = `h${level}`;
  return `
    <div class="section-head${center ? ' section-head--center' : ''}">
      ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
      <${H}>${esc(title)}</${H}>
      ${divider ? '<span class="divider-gold" aria-hidden="true"></span>' : ''}
      ${text ? `<p>${text}</p>` : ''}
    </div>`;
}

function section({ id, cls = '', inner, container = 'container' }) {
  return `
  <section class="${['section', cls].filter(Boolean).join(' ')}"${id ? ` id="${attr(id)}"` : ''}>
    <div class="${container}">
${inner}
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------
   Page hero
   ------------------------------------------------------------------------- */
/**
 * Interior page hero.
 * Pass `image` and the page gets a photographic banner behind the heading
 * instead of a flat gradient — which is most of the difference between a
 * page that looks finished and one that looks like a template.
 */
function pageHero({ eyebrow, title, text, buttons = [], image, imageAlt }) {
  const media = image
    ? `
    <div class="page-hero__media">
      <img src="${attr(image)}" alt="${attr(imageAlt || '')}" width="1600" height="600"
           loading="eager" fetchpriority="high" decoding="async"
           onerror="this.onerror=null;this.src='/assets/img/placeholder.svg'">
    </div>`
    : '';

  return `
  <section class="page-hero${image ? ' page-hero--photo' : ''}">${media}
    <div class="container">
      <div class="page-hero__inner">
        ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
        <h1>${esc(title)}</h1>
        ${text ? `<p>${text}</p>` : ''}
        ${buttons.length ? `<div class="btn-row">${buttons.join('')}</div>` : ''}
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------
   Buttons
   ------------------------------------------------------------------------- */
/* Most pages reach the agency's own desk. Car rental is the exception: it is
   MyCab's service, run from the same office on its own line, so a visitor who
   taps WhatsApp or Call there has to land on that line and not on ticketing.
   Passing a contact swaps the number; passing nothing keeps the agency's. */
const DESK = {
  waNumber: site.whatsapp.number,
  tel: site.phonePrimary.tel,
  label: site.phonePrimary.label,
};

const waHref = (message, contact = DESK) =>
  `https://wa.me/${contact.waNumber}?text=${encodeURIComponent(message)}`;

const btn = {
  quote: (label = 'Get a Free Quote', size = '') =>
    `<a class="btn btn--gold${size}" href="/get-a-quote/">${esc(label)}</a>`,

  whatsapp: (message, label = 'WhatsApp an Expert', size = '', contact = DESK) =>
    `<a class="btn btn--whatsapp${size}" href="${attr(waHref(message, contact))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 17 })} ${esc(label)}</a>`,

  call: (label = 'Call Now', size = '', contact = DESK) =>
    `<a class="btn btn--outline${size}" href="tel:${attr(contact.tel)}">${icon('phone', { size: 17 })} ${esc(label)}</a>`,

  callLight: (label = 'Call Now', size = '', contact = DESK) =>
    `<a class="btn btn--outline-light${size}" href="tel:${attr(contact.tel)}">${icon('phone', { size: 17 })} ${esc(label)}</a>`,

  link: (url, label, variant = 'btn--outline', size = '') =>
    `<a class="btn ${variant}${size}" href="${attr(url)}">${esc(label)}</a>`,
};

/** The standard three-button CTA row required on every major page. */
function ctaButtons(waMessage, { light = false, quoteLabel = 'Get a Free Quote' } = {}) {
  return [
    btn.quote(quoteLabel),
    btn.whatsapp(waMessage),
    light ? btn.callLight() : btn.call(),
  ].join('');
}

/* -------------------------------------------------------------------------
   Cards
   ------------------------------------------------------------------------- */
function serviceCard(s) {
  return `
        <a class="card service-card" href="${attr(s.url)}">
          <span class="card__icon">${icon(s.icon, { size: 22 })}</span>
          <div class="service-card__text">
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.blurb)}</p>
          </div>
        </a>`;
}

function iconCard(c) {
  return `
        <${c.url ? 'a' : 'div'} class="card"${c.url ? ` href="${attr(c.url)}"` : ''}>
          <span class="card__icon">${icon(c.icon, { size: 24 })}</span>
          <div class="card__body">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.text)}</p>
          </div>
          ${c.url ? '<span class="link-arrow">Learn more</span>' : ''}
        </${c.url ? 'a' : 'div'}>`;
}

function chip(c) {
  return `
        <a class="chip" href="${attr(c.url)}">
          ${c.code ? flagImg(c.code, c.name, 30) : ''}
          <span class="chip__name">${esc(c.name)}</span>
          ${c.sub ? `<span class="chip__sub">${esc(c.sub)}</span>` : ''}
        </a>`;
}

function mediaCard(c) {
  return `
        <a class="media-card" href="${attr(c.url)}">
          ${c.badge ? `<span class="badge badge--gold badge--float">${esc(c.badge)}</span>` : ''}
          <div class="media-card__img">${placeholderImage(c.image, c.imageAlt || c.title)}</div>
          <div class="media-card__body">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.text)}</p>
            ${
              c.meta && c.meta.length
                ? `<span class="media-card__meta">${c.meta
                    .map((m) => `<span>${icon(m.icon, { size: 13 })} ${esc(m.label)}</span>`)
                    .join('')}</span>`
                : ''
            }
          </div>
        </a>`;
}

/**
 * Images are referenced by path but the repo ships without stock photography
 * (licensing is the client's call), so this renders a branded SVG placeholder
 * of the right aspect ratio. Drop a real file at the same path and it is used
 * automatically — no template edits needed.
 */
function placeholderImage(src, alt, { width = 800, height = 600, loading = 'lazy' } = {}) {
  const fallback = `/assets/img/placeholder.svg`;
  return `<img src="${attr(src || fallback)}" alt="${attr(alt)}" width="${width}" height="${height}" loading="${loading}" decoding="async" onerror="this.onerror=null;this.src='${fallback}'">`;
}

function packageCard(p) {
  const specs = each(
    p.specs,
    (s) => `
            <li><span class="spec-label">${esc(s.label)}</span> <span class="spec-value">${esc(s.value)}</span></li>`
  );
  const wa = `Assalam o Alaikum, I am interested in the ${p.title}. Please share the current price and availability.`;
  return `
        <article class="package-card${p.featured ? ' package-card--featured' : ''}">
          <div class="package-card__head">
            ${p.tier ? `<span class="package-card__tier">${esc(p.tier)}</span>` : ''}
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.subtitle)}</p>
          </div>
          <div class="package-card__body">
            <ul class="spec-list">${specs}
            </ul>
          </div>
          <div class="package-card__foot">
            <div class="price-block">
              <div class="price-block__label">Starting from</div>
              <div class="price-block__value">${esc(p.price || 'On request')}</div>
              <div class="price-block__note">${esc(p.priceNote || 'Per person, subject to availability')}</div>
            </div>
            <div class="btn-row">
              ${p.url ? `<a class="btn btn--green btn--sm" href="${attr(p.url)}">View Details</a>` : ''}
              <a class="btn btn--whatsapp btn--sm" href="${attr(site.waLink(wa))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 15 })} WhatsApp Now</a>
            </div>
          </div>
        </article>`;
}

function featureItem(f) {
  return `
        <div class="feature">
          <span class="feature__icon">${icon(f.icon, { size: 22 })}</span>
          <div>
            <h3>${esc(f.title)}</h3>
            <p>${esc(f.text)}</p>
          </div>
        </div>`;
}

function stepItem(s) {
  return `
        <li>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </li>`;
}

function reviewCard(r) {
  const initials = r.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return `
        <article class="review-card">
          <span class="stars" aria-label="${r.rating} out of 5 stars">${icon('star', { size: 15 }).repeat(r.rating)}</span>
          <p class="review-card__text">&ldquo;${esc(r.text)}&rdquo;</p>
          <div class="review-card__author">
            <span class="review-card__avatar" aria-hidden="true">${esc(initials)}</span>
            <span>
              <span class="review-card__name">${esc(r.name)}</span>
              <span class="review-card__meta">${esc(r.service)}${r.city ? ` &middot; ${esc(r.city)}` : ''}</span>
            </span>
          </div>
        </article>`;
}

/* -------------------------------------------------------------------------
   Lists
   ------------------------------------------------------------------------- */
const tickList = (items, cls = '') =>
  `<ul class="tick-list ${cls}">${each(items, (i) => `\n            <li>${esc(i)}</li>`)}\n          </ul>`;

const crossList = (items) =>
  `<ul class="cross-list">${each(items, (i) => `\n            <li>${esc(i)}</li>`)}\n          </ul>`;

/* -------------------------------------------------------------------------
   FAQ accordion (+ matching FAQPage schema)
   ------------------------------------------------------------------------- */
function faqAccordion(faqs, idPrefix = 'faq') {
  const items = faqs
    .map((f, i) => {
      const id = `${idPrefix}-${i + 1}`;
      return `
        <div class="accordion__item">
          <h3 style="margin:0">
            <button class="accordion__btn" type="button" aria-expanded="false" aria-controls="${id}">
              <span>${esc(f.q)}</span>
              <span class="accordion__icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div class="accordion__panel" id="${id}">
            <div><div class="accordion__inner">${f.a}</div></div>
          </div>
        </div>`;
    })
    .join('');
  return `<div class="accordion" data-accordion>${items}\n      </div>`;
}

function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: String(f.a).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      },
    })),
  };
}

/* -------------------------------------------------------------------------
   Service schema helper
   ------------------------------------------------------------------------- */
function serviceSchema({ name, description, url, serviceType, areaServed = 'Pakistan' }) {
  return {
    '@type': 'Service',
    name,
    description,
    url: `${site.url}${url}`,
    serviceType: serviceType || name,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Country', name: areaServed },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: site.phonePrimary.tel },
      serviceUrl: `${site.url}${url}`,
    },
  };
}

/* -------------------------------------------------------------------------
   CTA blocks
   ------------------------------------------------------------------------- */
function ctaBand({ title = 'Ready to Plan Your Journey?', text = "Tell us where you want to go. We'll help you plan the rest — flights, hotels, visas and everything in between.", waMessage } = {}) {
  const msg = waMessage || 'Assalam o Alaikum, I would like to plan a trip. Please guide me.';
  return `
  <section class="cta-band">
    <div class="container">
      <div class="cta-band__inner">
        <h2>${esc(title)}</h2>
        <p>${esc(text)}</p>
        <div class="btn-row btn-row--center">
          ${btn.quote('Get a Free Quote', ' btn--lg')}
          ${btn.whatsapp(msg, 'WhatsApp Us', ' btn--lg')}
          ${btn.callLight('Call Our Travel Expert', ' btn--lg')}
        </div>
      </div>
    </div>
  </section>`;
}

function inlineCta({ title, text, waMessage, quoteLabel = 'Get a Quote' }) {
  return `
      <div class="inline-cta">
        <div>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </div>
        <div class="btn-row">
          ${btn.quote(quoteLabel, ' btn--sm')}
          ${btn.whatsapp(waMessage, 'WhatsApp', ' btn--sm')}
        </div>
      </div>`;
}

/* -------------------------------------------------------------------------
   Forms
   ------------------------------------------------------------------------- */
const SERVICE_OPTIONS = [
  'Umrah Package', 'Hajj Services', 'Visa Assistance', 'Visa Appointment Booking',
  'Air Ticketing', 'Hotel Reservation', 'International Tour', 'Corporate Travel',
  'Travel Insurance', 'Airport Transfer', 'Other',
];

/**
 * The lead form.
 * Posts to site.formEndpoint when one is configured; otherwise main.js formats
 * the answers into a WhatsApp message (with a mailto fallback) so an inquiry
 * is never silently lost on a static host.
 */
function leadForm({
  id = 'lead-form',
  title = 'Request a Free Quote',
  text = 'Share a few details and our travel consultant will get back to you with options and pricing.',
  service = '',
  compact = false,
  submitLabel = 'Submit Inquiry',
} = {}) {
  const options = SERVICE_OPTIONS.map(
    (o) => `<option value="${attr(o)}"${o === service ? ' selected' : ''}>${esc(o)}</option>`
  ).join('');

  return `
      <div class="form-card">
        ${title ? `<h2 style="font-size:var(--fs-xl)">${esc(title)}</h2>` : ''}
        ${text ? `<p style="color:var(--muted);font-size:var(--fs-sm);margin-bottom:var(--sp-5)">${esc(text)}</p>` : ''}
        <form class="form" id="${attr(id)}" data-lead-form data-success-url="/thank-you/" novalidate>
          <div class="hp-field" aria-hidden="true">
            <label for="${attr(id)}-company">Company (leave blank)</label>
            <input type="text" id="${attr(id)}-company" name="company" tabindex="-1" autocomplete="off">
          </div>

          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="${attr(id)}-name">Full Name <span class="req" aria-hidden="true">*</span></label>
              <input class="input" type="text" id="${attr(id)}-name" name="name" required autocomplete="name" placeholder="e.g. Ahmed Raza">
              <span class="field__error" data-error-for="name">Please enter your full name.</span>
            </div>
            <div class="field">
              <label for="${attr(id)}-phone">Phone / WhatsApp <span class="req" aria-hidden="true">*</span></label>
              <input class="input" type="tel" id="${attr(id)}-phone" name="phone" required autocomplete="tel" inputmode="tel" placeholder="e.g. 0300 1234567">
              <span class="field__error" data-error-for="phone">Please enter a valid phone number.</span>
            </div>
          </div>

          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="${attr(id)}-email">Email Address</label>
              <input class="input" type="email" id="${attr(id)}-email" name="email" autocomplete="email" placeholder="you@example.com">
              <span class="field__error" data-error-for="email">Please enter a valid email address.</span>
            </div>
            <div class="field">
              <label for="${attr(id)}-service">Service Required <span class="req" aria-hidden="true">*</span></label>
              <select class="select" id="${attr(id)}-service" name="service" required>
                <option value="">Select a service</option>
                ${options}
              </select>
              <span class="field__error" data-error-for="service">Please choose a service.</span>
            </div>
          </div>
${
  compact
    ? ''
    : `
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="${attr(id)}-destination">Destination</label>
              <input class="input" type="text" id="${attr(id)}-destination" name="destination" placeholder="e.g. Makkah &amp; Madinah, Dubai, London">
            </div>
            <div class="field">
              <label for="${attr(id)}-date">Preferred Travel Date</label>
              <input class="input" type="date" id="${attr(id)}-date" name="travelDate">
            </div>
          </div>

          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="${attr(id)}-travellers">Number of Travellers</label>
              <select class="select" id="${attr(id)}-travellers" name="travellers">
                <option value="">Select</option>
                <option>1</option><option>2</option><option>3</option><option>4</option>
                <option>5</option><option>6</option><option>7-10</option><option>11-20</option><option>20+</option>
              </select>
            </div>
            <div class="field">
              <label for="${attr(id)}-budget">Approximate Budget (PKR)</label>
              <select class="select" id="${attr(id)}-budget" name="budget">
                <option value="">Select</option>
                <option>Under 300,000</option>
                <option>300,000 – 500,000</option>
                <option>500,000 – 800,000</option>
                <option>800,000 – 1,200,000</option>
                <option>Above 1,200,000</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>`
}
          <div class="field">
            <label for="${attr(id)}-message">Your Message</label>
            <textarea class="textarea" id="${attr(id)}-message" name="message" rows="4" placeholder="Tell us about your travel plans, preferred hotels, room sharing, or any special requirements."></textarea>
          </div>

          <label class="checkbox">
            <input type="checkbox" name="consent" required>
            <span>I agree to be contacted by ${esc(site.shortName)} about my inquiry and accept the <a href="/privacy-policy/">Privacy Policy</a>. <span class="req" aria-hidden="true">*</span></span>
          </label>
          <span class="field__error" data-error-for="consent">Please accept the privacy policy to continue.</span>

          <button class="btn btn--gold btn--lg btn--block" type="submit">${esc(submitLabel)}</button>

          <div class="form-status" role="status" aria-live="polite" data-form-status></div>
          ${!site.formEndpoint ? '<p class="form-note">Submitting prepares your inquiry. Send the prepared message through WhatsApp or email to complete it.</p>' : ''}
          <noscript><p class="form-note">Please contact us using the phone or WhatsApp links below. This form requires JavaScript.</p></noscript>
          <p class="form-note">Prefer to talk first? Call <a href="tel:${attr(site.phonePrimary.tel)}">${esc(site.phonePrimary.label)}</a> or <a href="${attr(site.waLink('Assalam o Alaikum, I would like to enquire about your travel services.'))}" target="_blank" rel="noopener">message us on WhatsApp</a>. We usually reply within business hours.</p>
        </form>
      </div>`;
}

/* -------------------------------------------------------------------------
   Sidebar building blocks
   ------------------------------------------------------------------------- */
/* The heading and the blurb move with the number. On the car-rental page the
   buttons reach MyCab's own line, and a card still headed "Speak to a Travel
   Consultant" above someone else's number reads as a mistake — the visitor
   should know who is about to answer. */
function contactSidebarCard(waMessage, contact = DESK, {
  title = 'Speak to a Travel Consultant',
  text = 'Our team can confirm current availability, pricing and documentation requirements for your travel dates.',
} = {}) {
  return `
        <div class="sidebar-card sidebar-card--green">
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
          <div class="btn-row" style="margin-top:var(--sp-4)">
            <a class="btn btn--whatsapp btn--sm btn--block" href="${attr(waHref(waMessage, contact))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 15 })} WhatsApp Us</a>
            <a class="btn btn--outline-light btn--sm btn--block" href="tel:${attr(contact.tel)}">${icon('phone', { size: 15 })} ${esc(contact.label)}</a>
            <a class="btn btn--gold btn--sm btn--block" href="/get-a-quote/">Get a Free Quote</a>
          </div>
        </div>`;
}

function linkListCard(title, links) {
  return `
        <div class="sidebar-card">
          <h3>${esc(title)}</h3>
          <ul>
            ${each(links, (l) => `<li><a href="${attr(l.url)}">${esc(l.label)}</a></li>`)}
          </ul>
        </div>`;
}

/* -------------------------------------------------------------------------
   Trust strip
   ------------------------------------------------------------------------- */
function trustStrip() {
  /* Same credentials, same file-drop mechanism, as the home page strip. */
  const items = site.credentials.map((c) => ({
    ...c,
    logo: firstAsset([
      `/assets/img/credentials/${c.key}.svg`,
      `/assets/img/credentials/${c.key}.png`,
    ]),
  }));

  return `
      <div class="trust-grid">
        ${each(
          items,
          (i) => `
        <div class="trust-item">
          ${i.logo
            ? `<img class="trust-item__logo" src="${attr(i.logo)}" alt="${attr(i.name)}" loading="lazy" decoding="async">`
            : i.seal
              ? `<span class="trust-seal trust-seal--light" aria-hidden="true">${esc(i.seal)}</span>`
              : icon(i.icon, { size: 30 })}
          <span class="trust-item__name">${esc(i.name)}</span>
          <span class="trust-item__sub">${esc(i.sub)}</span>
          ${i.ref ? `<span class="trust-item__ref">${esc(i.ref)}</span>` : ''}
        </div>`
        )}
      </div>
      <p class="form-note" style="text-align:center;margin-top:var(--sp-6);max-width:640px;margin-inline:auto">
        Credentials shown are displayed for information. Please ask our team for copies of the specific licences,
        memberships and approvals held by ${esc(site.name)} — we are happy to share them before you book.
      </p>`;
}

module.exports = {
  DESK,
  sectionHead, section, pageHero, btn, ctaButtons,
  serviceCard, iconCard, chip, mediaCard, packageCard, featureItem, stepItem, reviewCard,
  tickList, crossList, faqAccordion, faqSchema, serviceSchema,
  ctaBand, inlineCta, leadForm, contactSidebarCard, linkListCard, trustStrip,
  placeholderImage, SERVICE_OPTIONS,
};

/* -------------------------------------------------------------------------
   Map

   The real Google Maps embed, pinned on the office. `loading="lazy"` means
   the browser fetches it only when it scrolls into view, which is what keeps
   it cheap on a phone — no custom placeholder, no tap-to-load step.
   ------------------------------------------------------------------------- */
function mapPanel({ title = 'Our office' } = {}) {
  return `
      <div class="mapbox">
        <iframe
          class="map-embed"
          src="${attr(site.address.mapEmbed)}"
          title="Map showing ${attr(site.name)}, ${attr(site.address.line2)}, ${attr(site.address.city)}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen></iframe>
        <p class="mapbox__directions">
          <span class="sr-only">${esc(title)}: </span>${esc(site.address.full)}
          <a class="mapbox__link" href="${attr(site.address.mapLink)}" target="_blank" rel="noopener">Get directions</a>
        </p>
      </div>`;
}

module.exports.mapPanel = mapPanel;
