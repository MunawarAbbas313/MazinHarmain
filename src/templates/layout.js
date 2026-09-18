/* ==========================================================================
   Master page layout.
   Every generated page passes through here, which is what guarantees the SEO
   head, header, footer, schema and conversion furniture are identical and
   complete site-wide.
   ========================================================================== */

const site = require('../data/site');
const { nav, footerNav, legalNav } = require('../data/nav');
const icon = require('../lib/icons');
const { esc, attr } = require('../lib/html');

/* -------------------------------------------------------------------------
   Logo
   ------------------------------------------------------------------------- */
const logoMark = `
<svg class="logo__mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <rect width="48" height="48" rx="8" fill="#0a4a34"/>
  <path d="M24 9.5 33.5 15v11L24 31.5 14.5 26V15z" fill="none" stroke="#c79a3e" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M24 14c2.6 0 4.7 2.1 4.7 4.7 0 3.2-4.7 7.3-4.7 7.3s-4.7-4.1-4.7-7.3c0-2.6 2.1-4.7 4.7-4.7z" fill="#c79a3e"/>
  <path d="M13 34.5h22M16 38.5h16" stroke="#c79a3e" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

/**
 * The real logo is used the moment the file exists; until then the built-in
 * SVG mark stands in, so the site never shows a broken image.
 *
 *   assets/img/logo.png       header lockup (wide, ~320x80 works best)
 *   assets/img/logo-full.png  footer lockup (the full stacked artwork)
 *
 * Checked at build time rather than guessed at, so dropping the file in and
 * rebuilding is the whole installation step.
 */
const fsFor = require('fs');
const pathFor = require('path');
const ASSET_DIR = pathFor.join(__dirname, '..', '..', 'assets', 'img');
const hasAsset = (name) => fsFor.existsSync(pathFor.join(ASSET_DIR, name));

const HAS_MARK = hasAsset('logo-mark.png');
const HAS_FOOTER_LOGO = hasAsset('logo-full-reverse.png') || hasAsset('logo-full.png');
const FOOTER_LOGO_SRC = hasAsset('logo-full-reverse.png')
  ? '/assets/img/logo-full-reverse.png'   // brand green reversed to white for the dark footer
  : '/assets/img/logo-full.png';

/* The wordmark, set in the brand's display face. Paired with the real
   monogram in the header, because the full stacked lockup is unreadable at
   header height — the "MAZIN HARAMAIN" line would render around 10px. */
const wordmark = `
      <span class="logo__text">
        <span class="logo__name">Mazin Haramain</span>
        <span class="logo__sub">Tours &amp; Travels</span>
      </span>`;

function logo(linked = true, variant = 'header') {
  let inner;

  if (variant === 'footer' && HAS_FOOTER_LOGO) {
    /* The footer has room for the full artwork. */
    inner = `<img class="logo__img logo__img--footer" src="${FOOTER_LOGO_SRC}" ` +
      `alt="${attr(site.name)}" width="560" height="484" loading="lazy" decoding="async">`;
  } else if (HAS_MARK) {
    /* Real monogram + typeset wordmark. */
    inner = `<img class="logo__mark logo__mark--img" src="/assets/img/logo-mark.png" ` +
      `alt="" width="260" height="199" ` +
      `loading="${variant === 'header' ? 'eager' : 'lazy'}" decoding="async">${wordmark}`;
  } else {
    /* Placeholder until the artwork is supplied. */
    inner = `${logoMark}${wordmark}`;
  }

  const cls = `logo logo--${variant}`;
  return linked
    ? `<a class="${cls}" href="/" aria-label="${attr(site.name)} — home">${inner}</a>`
    : `<span class="${cls}">${inner}</span>`;
}

/* -------------------------------------------------------------------------
   Header
   ------------------------------------------------------------------------- */
function topbar() {
  return `
<div class="topbar">
  <div class="container topbar__inner">
    <span class="topbar__tagline">${esc(site.secondaryTagline)}</span>
    <div class="topbar__right">
      <a href="tel:${attr(site.phonePrimary.tel)}">${icon('phone', { size: 13 })}<span>Call Us: ${esc(site.phonePrimary.label)}</span></a>
      <a href="${attr(site.waLink('Assalam o Alaikum, I would like to enquire about your travel services.'))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 13 })}<span>WhatsApp: ${esc(site.whatsapp.display)}</span></a>
      <span class="topbar__socials">
        ${site.social.map((s) => `<a href="${attr(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${attr(site.shortName)} on ${attr(s.name)}">${icon(s.icon, { size: 13 })}</a>`).join('')}
      </span>
    </div>
  </div>
</div>`;
}

function navItem(item, currentUrl) {
  const active = currentUrl === item.url || (item.url !== '/' && currentUrl.startsWith(item.url));
  const aria = currentUrl === item.url ? ' aria-current="page"' : '';
  const cls = active ? ' is-active' : '';

  if (!item.children) {
    return `<li class="nav__item"><a class="nav__link${cls}" href="${attr(item.url)}"${aria}>${esc(item.label)}</a></li>`;
  }

  const wide = item.children.length > 9 ? ' dropdown--wide' : '';
  const items = item.children
    .map((c) =>
      c.head
        ? `<li><span class="dropdown__head">${esc(c.head)}</span></li>`
        : `<li><a href="${attr(c.url)}">${esc(c.label)}</a></li>`
    )
    .join('\n        ');

  return `<li class="nav__item">
        <a class="nav__link${cls}" href="${attr(item.url)}"${aria}>${esc(item.label)} ${icon('chevronDown', { cls: 'nav__caret', size: 9 })}</a>
        <ul class="dropdown${wide}">
        ${items}
        </ul>
      </li>`;
}

function header(currentUrl) {
  return `${topbar()}
<header class="header" id="site-header">
  <div class="container header__inner">
    ${logo()}
    <nav class="nav" aria-label="Primary">
      <ul class="nav__list">
        ${nav.map((i) => navItem(i, currentUrl)).join('\n        ')}
      </ul>
    </nav>
    <div class="header__actions">
      <a class="btn btn--gold btn--sm" href="/get-a-quote/">Get a Quote</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="backdrop" data-close-nav hidden></div>
<div class="mobile-nav" id="mobile-nav" aria-label="Mobile menu" aria-hidden="true">
  <div class="mobile-nav__head">
    ${logo()}
    <button class="mobile-nav__close" type="button" aria-label="Close menu" data-close-nav>&times;</button>
  </div>
  <div class="mobile-nav__body">
    <ul>
      ${nav
        .map((item) => {
          if (!item.children) {
            return `<li><a href="${attr(item.url)}">${esc(item.label)}</a></li>`;
          }
          const subs = item.children
            .filter((c) => !c.head)
            .map((c) => `<li><a href="${attr(c.url)}">${esc(c.label)}</a></li>`)
            .join('');
          return `<li>
        <button class="m-toggle" type="button" aria-expanded="false">${esc(item.label)} <span class="m-toggle__icon">+</span></button>
        <ul class="m-sub">${subs}</ul>
      </li>`;
        })
        .join('\n      ')}
    </ul>
  </div>
  <div class="mobile-nav__cta">
    <a class="btn btn--gold btn--block" href="/get-a-quote/">Get a Free Quote</a>
    <a class="btn btn--whatsapp btn--block" href="${attr(site.waLink('Assalam o Alaikum, I would like to enquire about your travel services.'))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 17 })} WhatsApp an Expert</a>
    <a class="btn btn--outline btn--block" href="tel:${attr(site.phonePrimary.tel)}">${icon('phone', { size: 17 })} ${esc(site.phonePrimary.label)}</a>
  </div>
</div>`;
}

/* -------------------------------------------------------------------------
   Footer
   ------------------------------------------------------------------------- */
function footer() {
  const year = new Date().getFullYear();
  const col = (c) => `
      <div>
        <h3>${esc(c.title)}</h3>
        <ul>
          ${c.links.map((l) => `<li><a href="${attr(l.url)}">${esc(l.label)}</a></li>`).join('\n          ')}
        </ul>
      </div>`;

  return `
<footer class="footer">
  <div class="container footer__main">
    <div class="footer__grid">
      <div class="footer__about">
        ${logo(true, 'footer')}
        <p>${esc(site.tagline)} A professional travel management company in Blue Area, Islamabad offering Umrah, Hajj, visa assistance, air ticketing, hotels, international tours and corporate travel solutions.</p>
        <div class="footer__socials">
          ${site.social.map((s) => `<a href="${attr(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${attr(site.shortName)} on ${attr(s.name)}">${icon(s.icon, { size: 16 })}</a>`).join('\n          ')}
        </div>
      </div>
      ${col(footerNav.services)}
      ${col(footerNav.company)}
      <div>
        <h3>Customer Support</h3>
        <ul class="footer__contact">
          <li>${icon('pin', { size: 16 })}<span>${esc(site.address.line1)},<br>${esc(site.address.line2)}, ${esc(site.address.city)}</span></li>
          <li>${icon('phone', { size: 16 })}<span>${site.phones.map((p) => `<a href="tel:${attr(p.tel)}">${esc(p.label)}</a>`).join('<br>')}</span></li>
          <li>${icon('whatsapp', { size: 16 })}<a href="${attr(site.waLink('Assalam o Alaikum, I would like to enquire about your travel services.'))}" target="_blank" rel="noopener">${esc(site.whatsapp.display)}</a></li>
          <li>${icon('mail', { size: 16 })}<a href="mailto:${attr(site.email)}">${esc(site.email)}</a></li>
          <li>${icon('clock', { size: 16 })}<span>${esc(site.openingHoursText)}</span></li>
        </ul>
      </div>
    </div>

    <p class="footer__disclaimer">
      <strong>Important notice:</strong> Mazin Haramain Tours &amp; Travels provides travel arrangement, documentation and application assistance services.
      Visa decisions are made solely by the relevant embassy, consulate or immigration authority, and we do not guarantee the outcome of any application.
      Package prices, hotel availability, airline schedules and government requirements are subject to change and are confirmed in writing at the time of booking.
      Read our <a href="/visa-disclaimer/">Visa Disclaimer</a> and <a href="/booking-terms/">Booking Terms</a> for full details.
    </p>
  </div>
  <div class="container">
    <div class="footer__bottom">
      <span>&copy; ${year} ${esc(site.name)}. All rights reserved.</span>
      <span class="footer__legal">
        ${legalNav.map((l) => `<a href="${attr(l.url)}">${esc(l.label)}</a>`).join('\n        ')}
      </span>
    </div>
    ${
      site.builtBy
        ? `<div class="footer__built">
      Website designed &amp; developed by
      ${site.builtBy.url
        ? `<a href="${attr(site.builtBy.url)}" target="_blank" rel="noopener">${esc(site.builtBy.name)}</a>`
        : `<strong>${esc(site.builtBy.name)}</strong>`}${site.builtBy.city ? `, ${esc(site.builtBy.city)}` : ''}
    </div>`
        : ''
    }
  </div>
</footer>`;
}

/* -------------------------------------------------------------------------
   Floating conversion furniture
   ------------------------------------------------------------------------- */
function floatingActions(waMessage) {
  const msg = waMessage || 'Assalam o Alaikum, I would like to enquire about your travel services.';
  return `
<div class="float-actions">
  <button class="float-btn float-btn--top" type="button" id="back-to-top" aria-label="Back to top">${icon('arrowUp', { size: 18 })}</button>
  <a class="float-btn float-btn--wa" href="${attr(site.waLink(msg))}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" data-wa-float>${icon('whatsapp', { size: 26 })}</a>
</div>

<nav class="mobile-bar" aria-label="Quick contact">
  <a href="tel:${attr(site.phonePrimary.tel)}">${icon('phone', { size: 19 })}<span>Call</span></a>
  <a class="is-wa" href="${attr(site.waLink(msg))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 19 })}<span>WhatsApp</span></a>
  <a href="/get-a-quote/">${icon('doc', { size: 19 })}<span>Get Quote</span></a>
</nav>`;
}

/* -------------------------------------------------------------------------
   Structured data (JSON-LD)
   ------------------------------------------------------------------------- */
function organisationSchema() {
  return {
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/logo-mark.png`,
    image: `${site.url}/assets/img/og-default.png`,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phones.map((p) => p.tel),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
    hasMap: site.address.mapLink,
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.serviceCities.map((c) => ({ '@type': 'City', name: c })),
    sameAs: site.social.map((s) => s.url),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.phonePrimary.tel,
        contactType: 'customer service',
        areaServed: 'PK',
        availableLanguage: ['English', 'Urdu'],
      },
    ],
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-PK',
  };
}

function breadcrumbSchema(crumbs, url) {
  if (!crumbs || !crumbs.length) return null;
  const all = [{ label: 'Home', url: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${site.url}${url}#breadcrumb`,
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.url || url}`,
    })),
  };
}

/* -------------------------------------------------------------------------
   Breadcrumb markup
   ------------------------------------------------------------------------- */
function breadcrumbNav(crumbs) {
  if (!crumbs || !crumbs.length) return '';
  const items = [{ label: 'Home', url: '/' }, ...crumbs]
    .map((c, i, arr) =>
      i === arr.length - 1
        ? `<li><span aria-current="page">${esc(c.label)}</span></li>`
        : `<li><a href="${attr(c.url)}">${esc(c.label)}</a></li>`
    )
    .join('\n        ');
  return `
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container">
    <ol>
        ${items}
    </ol>
  </div>
</nav>`;
}

/* -------------------------------------------------------------------------
   The document
   ------------------------------------------------------------------------- */
/**
 * @param {object} p
 *   url          {string}  absolute path, e.g. '/visa-services/uk-visa/'
 *   title        {string}  <title> (aim 50-60 chars)
 *   description  {string}  meta description (aim 140-160 chars)
 *   body         {string}  page HTML
 *   crumbs       {array}   [{label,url}] excluding Home
 *   schema       {array}   extra JSON-LD nodes
 *   ogImage      {string}  path to social image
 *   ogType       {string}  'website' | 'article'
 *   noindex      {boolean}
 *   waMessage    {string}  pre-fills the floating WhatsApp button
 *   bodyClass    {string}
 */
function layout(p) {
  const url = p.url || '/';
  const canonical = `${site.url}${url}`;
  const ogImagePath = p.ogImage || '/assets/img/og-default.png';
  const ogImage = `${site.url}${ogImagePath}`;

  const graph = [organisationSchema(), websiteSchema()];
  const crumbSchema = breadcrumbSchema(p.crumbs, url);
  if (crumbSchema) graph.push(crumbSchema);

  /* Name the page's lead image so Google can associate it with the URL
     rather than guessing from the DOM. */
  if (p.ogImage) {
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: p.title,
      description: p.description,
      isPartOf: { '@id': `${site.url}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImage,
        contentUrl: ogImage,
        caption: p.ogImageAlt || p.title,
      },
    });
  }

  if (p.schema) graph.push(...p.schema.filter(Boolean));

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c');

  const ga = site.analytics.ga4
    ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${site.analytics.ga4}');
  </script>`
    : `
  <!-- Google Analytics 4: add the Measurement ID in src/data/site.js (analytics.ga4) and rebuild. -->`;

  const verification = site.analytics.googleSiteVerification
    ? `\n  <meta name="google-site-verification" content="${attr(site.analytics.googleSiteVerification)}">`
    : '';

  return `<!DOCTYPE html>
<html lang="en-PK">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${attr(p.description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <link rel="alternate" hreflang="en-pk" href="${attr(canonical)}">
  <link rel="alternate" hreflang="x-default" href="${attr(canonical)}">
  <meta name="robots" content="${p.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">${verification}
  <meta name="author" content="${attr(site.name)}">
  <meta name="geo.region" content="PK-IS">
  <meta name="geo.placename" content="Islamabad">
  <meta name="theme-color" content="#0a4a34">

  <!-- Open Graph -->
  <meta property="og:type" content="${attr(p.ogType || 'website')}">
  <meta property="og:site_name" content="${attr(site.name)}">
  <meta property="og:title" content="${attr(p.ogTitle || p.title)}">
  <meta property="og:description" content="${attr(p.description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:image" content="${attr(ogImage)}">
  <meta property="og:image:alt" content="${attr(p.ogImageAlt || p.title)}">
  <meta property="og:locale" content="en_PK">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(p.ogTitle || p.title)}">
  <meta name="twitter:description" content="${attr(p.description)}">
  <meta name="twitter:image" content="${attr(ogImage)}">
  <meta name="twitter:image:alt" content="${attr(p.ogImageAlt || p.title)}">${
    p.preloadImage
      ? `\n\n  <!-- Largest Contentful Paint candidate: fetch it alongside the stylesheet.
       imagesrcset/imagesizes must mirror the image element exactly, or the browser
       preloads one file and then downloads a second. -->
  <link rel="preload" as="image" href="${attr(p.preloadImage)}" fetchpriority="high"${
          p.preloadImageSrcset
            ? `\n        imagesrcset="${attr(p.preloadImageSrcset)}"\n        imagesizes="${attr(p.preloadImageSizes || '100vw')}"`
            : ''
        }>`
      : ''
  }

  <!-- Icons -->
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="/assets/img/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="alternate" type="application/rss+xml" title="Mazin Haramain — Travel Guides" href="/feed.xml">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"></noscript>

  <link rel="stylesheet" href="/assets/css/styles.css">
  <!-- Loaded after styles.css: refines the shared theme and carries the
       photography-led homepage layout. Order matters. -->
  <link rel="stylesheet" href="/assets/css/refinements.css">

  <script type="application/ld+json">${jsonLd}</script>${ga}
</head>
<body${p.bodyClass ? ` class="${attr(p.bodyClass)}"` : ''}>
  <a class="skip-link" href="#main">Skip to main content</a>
${header(url)}
${breadcrumbNav(p.crumbs)}
  <main id="main">
${p.body}
  </main>
${footer()}
${floatingActions(p.waMessage)}
  <script>window.MH_CONFIG=${JSON.stringify({
    whatsapp: site.whatsapp.number,
    email: site.email,
    formEndpoint: site.formEndpoint,
  })};</script>
  <script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = { layout, logo, breadcrumbNav };
