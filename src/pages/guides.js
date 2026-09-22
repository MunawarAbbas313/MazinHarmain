/* ==========================================================================
   Travel guides — index + article pages.
   Articles carry Article + FAQPage schema and a generated table of contents.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const icon = require('../lib/icons');
const { esc, attr, each, slugify, formatDate } = require('../lib/html');
const guides = require('../data/guides');

const BASE = '/travel-guides/';
const crumbBase = { label: 'Travel Guides', url: BASE };
const guidesUr = require('../data/guides-ur');

const categories = [...new Set(guides.map((g) => g.category))];

/* Add ids to the article's h2s and build a matching contents list. */
function withToc(html) {
  const headings = [];
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const clean = String(text).replace(/<[^>]+>/g, '');
    const id = slugify(clean);
    headings.push({ id, text: clean });
    return `<h2 id="${id}">${text}</h2>`;
  });
  return { html: out, headings };
}

/* ----------------------------------------------------------------- Index */
function indexPage() {
  const wa = 'Assalam o Alaikum, I have a question about travel planning.';

  const cards = guides.map((g) =>
    c.mediaCard({
      url: `${BASE}${g.slug}/`,
      title: g.title,
      text: g.excerpt,
      badge: g.category,
      image: `/assets/img/guides/${g.slug}.jpg`,
      imageAlt: g.title,
      meta: [
        { icon: 'calendar', label: formatDate(g.date) },
        { icon: 'clock', label: `${g.readTime} min read` },
      ],
    })
  );

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: 'Travel Guides & Insights',
    title: 'Travel Guides, Visa Help & Umrah Advice',
    text: 'Practical, up-to-date articles written for Pakistani travellers &mdash; from Umrah preparation and visa documentation to destination planning and travel insurance.',
    buttons: [c.btn.quote('Get a Free Quote'), c.btn.whatsapp(wa)],
  })}

  <section class="section">
    <div class="container">
      <div class="pill-row" style="margin-bottom:var(--sp-8)">
        ${each(categories, (cat) => `<span class="pill">${icon('doc', { size: 13 })} ${esc(cat)}</span>`)}
      </div>
      <div class="grid grid--3 reveal">
        ${cards.join('')}
      </div>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url: BASE,
    html: layout({
      url: BASE,
      title: 'Travel Guides & Insights | Umrah, Visa and Destination Advice',
      description:
        'Travel guides for Pakistani travellers — Umrah preparation, visa documentation, vaccination requirements, destination guides and travel insurance advice from Mazin Haramain.',
      crumbs: [crumbBase],
      body,
      schema: [
        {
          '@type': 'Blog',
          '@id': `${site.url}${BASE}#blog`,
          name: 'Mazin Haramain Travel Guides',
          url: `${site.url}${BASE}`,
          publisher: { '@id': `${site.url}/#organization` },
          blogPost: guides.map((g) => ({
            '@type': 'BlogPosting',
            headline: g.title,
            url: `${site.url}${BASE}${g.slug}/`,
            datePublished: g.date,
            description: g.excerpt,
          })),
        },
      ],
      waMessage: wa,
    }),
    priority: '0.85',
    changefreq: 'weekly',
  };
}

/* --------------------------------------------------------- Article page */
function articlePage(g) {
  const url = `${BASE}${g.slug}/`;
  const wa = 'Assalam o Alaikum, I read your travel guide and have a question.';
  const { html: bodyHtml, headings } = withToc(g.body);

  const related = (g.related || []).map((r) => {
    const found = guides.find((x) => `${BASE}${x.slug}/` === r);
    if (found) return { label: found.title, url: r };
    const labels = {
      '/umrah-packages/': 'Umrah Packages',
      '/umrah-packages/umrah-visa/': 'Umrah Visa',
      '/services/ziyarat-tours/': 'Ziyarat Tours',
      '/services/hajj-services/': 'Hajj Services',
      '/services/travel-insurance/': 'Travel Insurance',
      '/services/airport-transfers/': 'Airport Transfers',
      '/services/air-ticketing/': 'Air Ticketing',
      '/services/visa-appointment-booking/': 'Visa Appointment Booking',
      '/visa-services/uk-visa/': 'UK Visa',
      '/visa-services/schengen-visa/': 'Schengen Visa',
      '/visa-services/uae-visa/': 'UAE Visa',
      '/visa-services/turkey-visa/': 'Turkey Visa',
      '/destinations/united-kingdom/': 'UK Tours',
      '/destinations/europe/': 'Europe Tours',
      '/destinations/dubai/': 'Dubai Tours',
      '/destinations/turkey/': 'Turkey Tours',
      '/hotels/makkah-hotels/': 'Makkah Hotels',
      '/hotels/madinah-hotels/': 'Madinah Hotels',
      '/hotels/dubai-hotels/': 'Dubai Hotels',
      '/hotels/istanbul-hotels/': 'Istanbul Hotels',
      '/contact/': 'Contact Us',
    };
    return { label: labels[r] || r, url: r };
  });

  const moreGuides = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  const body = `
${c.pageHero({ image: `/assets/img/guides/${g.slug}.jpg`, imageAlt: g.title, eyebrow: g.category, title: g.title, text: esc(g.excerpt) })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <article>
          ${guidesUr[g.slug]
            ? `<p class="lang-switch">
            <a href="${attr(`${BASE}${g.slug}/urdu/`)}" hreflang="ur" lang="ur" dir="rtl">یہ مضمون اردو میں پڑھیے</a>
          </p>`
            : ''}

          <div class="article-meta">
            <span>${icon('calendar', { size: 13 })} Published ${esc(formatDate(g.date))}</span>
            <span>${icon('clock', { size: 13 })} ${g.readTime} min read</span>
            <span>${icon('doc', { size: 13 })} ${esc(g.category)}</span>
          </div>

          ${
            headings.length > 2
              ? `<nav class="toc" aria-label="Contents">
            <div class="toc__title">In this guide</div>
            <ol>
              ${each(headings, (h) => `<li><a href="#${attr(h.id)}">${esc(h.text)}</a></li>`)}
            </ol>
          </nav>`
              : ''
          }

          <div class="prose">
            ${bodyHtml}
          </div>

          ${c.inlineCta({
            title: 'Need help with your travel plans?',
            text: 'Our consultants can answer your questions and arrange the whole trip.',
            waMessage: wa,
          })}

          ${
            g.faqs && g.faqs.length
              ? `<h2 style="margin-top:var(--sp-10)">Frequently Asked Questions</h2>
          <div style="margin-top:var(--sp-5)">
            ${c.faqAccordion(g.faqs, `guide-${g.slug}`)}
          </div>`
              : ''
          }
        </article>

        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${related.length ? c.linkListCard('Related Pages', related) : ''}
          ${c.linkListCard('More Guides', guides.filter((x) => x.slug !== g.slug).slice(0, 6).map((x) => ({ label: x.title, url: `${BASE}${x.slug}/` })))}
        </aside>
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Keep Reading', title: 'More Travel Guides' })}
      <div class="grid grid--3">
        ${moreGuides
          .map((x) =>
            c.mediaCard({
              url: `${BASE}${x.slug}/`,
              title: x.title,
              text: x.excerpt,
              badge: x.category,
              image: `/assets/img/guides/${x.slug}.jpg`,
              imageAlt: x.title,
              meta: [{ icon: 'clock', label: `${x.readTime} min read` }],
            })
          )
          .join('')}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      ...(guidesUr[g.slug] ? { altLang: `${BASE}${g.slug}/urdu/` } : {}),
      title: g.metaTitle,
      description: g.metaDescription,
      ogType: 'article',
      ogImage: `/assets/img/guides/${g.slug}.jpg`,
      ogImageAlt: g.title,
      crumbs: [crumbBase, { label: g.title, url }],
      body,
      schema: [
        {
          '@type': 'Article',
          headline: g.title,
          description: g.metaDescription,
          url: `${site.url}${url}`,
          datePublished: g.date,
          dateModified: g.date,
          inLanguage: 'en-PK',
          articleSection: g.category,
          author: { '@id': `${site.url}/#organization` },
          publisher: { '@id': `${site.url}/#organization` },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}${url}` },
        },
        c.faqSchema(g.faqs),
      ],
      waMessage: wa,
    }),
    priority: g.featured ? '0.8' : '0.7',
    changefreq: 'monthly',
  };
}

/* ---- Urdu -----------------------------------------------------------------
   An article gets an Urdu page only when src/data/guides-ur.js has an entry
   for its slug, so the translations can be added a few at a time without
   ever leaving a link pointing at nothing.
   -------------------------------------------------------------------------- */
function urduPage(g) {
  const ur = guidesUr[g.slug];
  if (!ur) return null;

  const enUrl = `${BASE}${g.slug}/`;
  const url = `${enUrl}urdu/`;
  const wa = `السلام علیکم، میں ${ur.title} کے بارے میں معلومات چاہتا ہوں۔`;

  const body = `
${c.pageHero({
    image: `/assets/img/guides/${g.slug}.jpg`,
    imageAlt: g.title,
    eyebrow: 'اردو',
    title: ur.title,
    text: esc(ur.excerpt),
  })}

  <section class="section">
    <div class="container">
      <article class="article-ur">
        <p class="lang-switch">
          <a href="${attr(enUrl)}" hreflang="en" lang="en" dir="ltr">Read this guide in English</a>
        </p>

        <div class="prose">
          ${ur.body}
        </div>

        ${
          ur.faqs && ur.faqs.length
            ? `<h2>عام سوالات</h2>
        ${c.faqAccordion(ur.faqs, `ur-${g.slug}`)}`
            : ''
        }

        <p class="form-note" lang="en" dir="ltr">
          This Urdu translation is provided for convenience. Where it differs from the
          <a href="${attr(enUrl)}">English version</a>, the English text is the one we maintain.
        </p>
      </article>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      lang: 'ur',
      altLang: enUrl,
      title: `${ur.title} | ${site.shortName}`,
      description: ur.excerpt,
      ogType: 'article',
      ogImage: `/assets/img/guides/${g.slug}.jpg`,
      ogImageAlt: g.title,
      crumbs: [crumbBase, { label: ur.title, url }],
      body,
      schema: [
        {
          '@type': 'Article',
          headline: ur.title,
          description: ur.excerpt,
          url: `${site.url}${url}`,
          datePublished: g.date,
          dateModified: g.date,
          inLanguage: 'ur-PK',
          articleSection: g.category,
          author: { '@id': `${site.url}/#organization` },
          publisher: { '@id': `${site.url}/#organization` },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}${url}` },
        },
      ],
      waMessage: wa,
    }),
    priority: '0.6',
    changefreq: 'monthly',
  };
}

module.exports = () => [
  indexPage(),
  ...guides.map(articlePage),
  ...guides.map(urduPage).filter(Boolean),
];
