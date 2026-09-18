/* ==========================================================================
   Standalone pages: about, contact, quote, corporate, FAQs, reviews,
   sitemap, thank-you, 404 and the legal set.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');

const faqs = require('../data/faqs');
const { reviews, googleReviewUrl, googleProfileUrl } = require('../data/reviews');
const { services } = require('../data/services');
const U = require('../data/umrah');
const visaTypes = require('../data/visa-types');
const { countries } = require('../data/visa-countries');
const { destinations } = require('../data/destinations');
const hotels = require('../data/hotels');
const guides = require('../data/guides');
const { routes: flightRoutes } = require('../data/flights');

/* ----------------------------------------------------------------- About */
function about() {
  const url = '/about/';
  const wa = 'Assalam o Alaikum, I would like to know more about Mazin Haramain Tours & Travels.';

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/makkah-hotels.jpg',
    imageAlt: 'Masjid al-Haram and the Makkah skyline at night',
    eyebrow: 'About Us',
    title: 'About Mazin Haramain Tours & Travels',
    text: 'Your Journey, Our Commitment. A professional travel management company in Blue Area, Islamabad.',
    buttons: [c.btn.quote(), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div class="prose">
          <p class="lead">Mazin Haramain Tours &amp; Travels is a professional travel management company providing comprehensive travel solutions for individuals, families, groups and corporate clients across Pakistan.</p>
          <p>From sacred journeys to global destinations, we assist our clients with Umrah and Hajj travel, air ticketing, visa assistance, hotel reservations, international tours and corporate travel services. Our approach is built around professional service, clear communication, personalised travel solutions and dependable customer support.</p>
          <p>Whether you are planning Umrah, a family holiday, an international business trip or your next global adventure, our team is here to help you travel with greater confidence and convenience.</p>

          <h2>What we believe</h2>
          <p>Travel businesses in Pakistan have a reputation problem, and most of it is earned. Packages described as something they are not. Prices that change after the deposit. Hotels sold as "near the Haram" that turn out to be a shuttle ride away. Visa agents promising outcomes nobody can promise.</p>
          <p>We have built this business on the opposite principle. When we quote a Makkah hotel, we tell you the actual walking distance. When we quote a package, the inclusions and exclusions are written down before you pay. When you ask whether we can guarantee a visa, the answer is no &mdash; because no honest agency can, and the ones who say yes are telling you something useful about themselves.</p>
          <p>That is a slower way to grow a travel business. It is also the only way to build one that clients come back to, and send their families to.</p>

          <h2>Our Mission</h2>
          <p>To provide reliable, professional and customer-focused travel services while making every journey easier to plan and manage.</p>

          <h2>Our Vision</h2>
          <p>To build a trusted Pakistani travel brand recognised for professionalism, service quality, transparency and customer care.</p>

          <h2>What we do</h2>
          <p>We operate as a full-service travel management company. That means you can arrange an entire journey through one office rather than coordinating between a ticketing agent, a visa consultant and a hotel booking site &mdash; and it means the pieces are consistent with each other, which matters a great deal when a visa application depends on them.</p>
        </div>

        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Our Services', services.slice(0, 8).map((s) => ({ label: s.title, url: s.url })))}
        </aside>
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Our Services', title: 'Complete Travel Solutions', center: true })}
      <div class="grid grid--3">
        ${services.slice(0, 9).map((s) => c.iconCard({ url: s.url, icon: s.icon, title: s.title, text: s.blurb })).join('')}
      </div>`,
  })}

${c.section({
    cls: 'section--green',
    inner: `${c.sectionHead({
      eyebrow: 'Why Choose Us',
      title: 'Why Clients Work With Us',
      center: true,
      text: 'Six commitments we hold ourselves to on every booking.',
    })}
      <div class="feature-row feature-row--3">
        ${[
          { icon: 'award', title: 'Professional Expertise', text: 'Experienced consultants who handle your booking personally from enquiry to return.' },
          { icon: 'heart', title: 'Personalised Service', text: 'Solutions designed around your requirements, budget and family — not a fixed template.' },
          { icon: 'doc', title: 'Transparent Communication', text: 'Clear written information about services, pricing and documentation before you pay.' },
          { icon: 'compass', title: 'End-to-End Assistance', text: 'From planning and documentation through to travel arrangements and your return.' },
          { icon: 'headset', title: 'Responsive Support', text: 'Quick assistance by phone, WhatsApp and email, including while you travel.' },
          { icon: 'globe', title: 'One-Stop Solutions', text: 'Flights, hotels, visas, tours and pilgrimage services arranged under one roof.' },
        ].map(c.featureItem).join('')}
      </div>`,
  })}

${c.section({
    cls: 'section--cream-2 section--tight',
    inner: `${c.sectionHead({ eyebrow: 'Trust & Credentials', title: 'Your Journey Is In Trusted Hands', center: true })}
      ${c.trustStrip()}`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: 'About Us | Mazin Haramain Tours & Travels, Islamabad',
      description:
        'Mazin Haramain Tours & Travels is a travel management company in Blue Area, Islamabad providing Umrah, Hajj, visas, flights, hotels and corporate travel.',
      crumbs: [{ label: 'About Us', url }],
      body,
      schema: [
        {
          '@type': 'AboutPage',
          name: 'About Mazin Haramain Tours & Travels',
          url: `${site.url}${url}`,
          mainEntity: { '@id': `${site.url}/#organization` },
        },
      ],
      waMessage: wa,
    }),
    priority: '0.8',
    changefreq: 'monthly',
  };
}

/* --------------------------------------------------------------- Contact */
function contact() {
  const url = '/contact/';
  const wa = 'Assalam o Alaikum, I would like to get in touch about your travel services.';

  const body = `
${c.pageHero({
    image: '/assets/img/hotels/worldwide-hotels.jpg',
    imageAlt: 'A hotel reception area',
    eyebrow: 'Contact Us',
    title: "Let's Plan Your Journey",
    text: 'Call, message or visit our office in Blue Area, Islamabad. We reply to WhatsApp messages during business hours and monitor the line for clients already travelling.',
    buttons: [c.btn.whatsapp(wa, 'WhatsApp Us'), c.btn.callLight(site.phonePrimary.label)],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          ${c.leadForm({
            id: 'contact-form',
            title: 'Send Us an Inquiry',
            text: 'Tell us what you need and a travel consultant will get back to you with options and pricing.',
          })}
        </div>

        <aside class="sidebar">
          <div class="sidebar-card">
            <h3>Contact Information</h3>
            <ul style="display:grid;gap:var(--sp-4)">
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('pin', { size: 18 })}</span>
                <span>
                  <strong style="display:block;color:var(--ink)">Office Address</strong>
                  ${esc(site.address.line1)},<br>${esc(site.address.line2)},<br>${esc(site.address.city)}, ${esc(site.address.countryName)}
                  <a class="link-arrow" href="${attr(site.address.mapLink)}" target="_blank" rel="noopener" style="margin-top:var(--sp-2)">Get directions</a>
                </span>
              </li>
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('phone', { size: 18 })}</span>
                <span>
                  <strong style="display:block;color:var(--ink)">Phone</strong>
                  ${site.phones.map((p) => `<a href="tel:${attr(p.tel)}">${esc(p.label)}</a>`).join('<br>')}
                </span>
              </li>
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--whatsapp-dark);flex-shrink:0">${icon('whatsapp', { size: 18 })}</span>
                <span>
                  <strong style="display:block;color:var(--ink)">WhatsApp</strong>
                  <a href="${attr(site.waLink(wa))}" target="_blank" rel="noopener">${esc(site.whatsapp.display)}</a>
                </span>
              </li>
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('mail', { size: 18 })}</span>
                <span>
                  <strong style="display:block;color:var(--ink)">Email</strong>
                  <a href="mailto:${attr(site.email)}">${esc(site.email)}</a>
                </span>
              </li>
              <li style="display:flex;gap:var(--sp-3);align-items:flex-start">
                <span style="color:var(--gold-600);flex-shrink:0">${icon('clock', { size: 18 })}</span>
                <span>
                  <strong style="display:block;color:var(--ink)">Business Hours</strong>
                  ${esc(site.openingHoursText)}
                </span>
              </li>
            </ul>
          </div>
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Quick Links', [
            { label: 'Get a Free Quote', url: '/get-a-quote/' },
            { label: 'Umrah Packages', url: '/umrah-packages/' },
            { label: 'Visa Services', url: '/visa-services/' },
            { label: 'Corporate Travel', url: '/corporate-travel/' },
            { label: 'FAQs', url: '/faqs/' },
          ])}
        </aside>
      </div>
    </div>
  </section>

  <section class="section section--tight section--cream">
    <div class="container">
      ${c.sectionHead({ eyebrow: 'Find Us', title: 'Visit Our Office in Blue Area', center: true, text: `${esc(site.address.full)}` })}
      ${c.mapPanel()}
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: 'Contact Us | Mazin Haramain Tours & Travels, Blue Area Islamabad',
      description: `Contact Mazin Haramain Tours & Travels, ${site.address.line2}, ${site.address.city}. Phone ${site.phonePrimary.label}, WhatsApp ${site.whatsapp.display}.`,
      crumbs: [{ label: 'Contact', url }],
      body,
      schema: [
        {
          '@type': 'ContactPage',
          name: 'Contact Mazin Haramain Tours & Travels',
          url: `${site.url}${url}`,
          mainEntity: { '@id': `${site.url}/#organization` },
        },
      ],
      waMessage: wa,
    }),
    priority: '0.9',
    changefreq: 'monthly',
  };
}

/* ----------------------------------------------------------------- Quote */
function quote() {
  const url = '/get-a-quote/';
  const wa = 'Assalam o Alaikum, I would like to request a travel quotation.';

  const body = `
${c.pageHero({
    image: '/assets/img/visa-services.jpg',
    imageAlt: 'A passport with visa stamps, a compass and a travel planner on a world map',
    eyebrow: 'Get a Quote',
    title: 'Request a Free Travel Quotation',
    text: 'Tell us where you want to go and when. We will come back with options, current pricing and a clear list of what is and is not included &mdash; with no obligation.',
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          ${c.leadForm({
            id: 'quote-form',
            title: 'Your Travel Requirements',
            text: 'The more you tell us, the more accurate the quotation. Every field beyond the essentials is optional.',
            submitLabel: 'Request My Quote',
          })}
        </div>

        <aside class="sidebar is-sticky">
          <div class="sidebar-card sidebar-card--cream">
            <h3>What happens next</h3>
            <ol class="steps" style="gap:var(--sp-4);margin-top:var(--sp-4)">
              ${[
                { title: 'We review your request', text: 'A consultant checks availability and pricing for your dates.' },
                { title: 'You receive options', text: 'Usually two to four, with inclusions and exclusions listed.' },
                { title: 'We refine it together', text: 'Adjust the hotel, duration or airline until it fits.' },
                { title: 'You confirm', text: 'Pay as agreed and we issue all documents in writing.' },
              ]
                .map(c.stepItem)
                .join('')}
            </ol>
          </div>
          ${c.contactSidebarCard(wa)}
          <div class="sidebar-card">
            <h3>No obligation</h3>
            <p style="font-size:var(--fs-sm);color:var(--muted)">Requesting a quotation costs nothing and commits you to nothing. We would rather you compared properly than booked in a hurry.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: 'Get a Free Travel Quote | Umrah, Visa, Flights & Tours',
      description:
        'Request a free travel quotation from Mazin Haramain Tours & Travels — Umrah packages, visa assistance, flights, hotels, tours and corporate travel. No obligation.',
      crumbs: [{ label: 'Get a Quote', url }],
      body,
      waMessage: wa,
    }),
    priority: '0.9',
    changefreq: 'monthly',
  };
}

/* ------------------------------------------------------------- Corporate */
function corporate() {
  const url = '/corporate-travel/';
  const wa = 'Assalam o Alaikum, I would like to discuss corporate travel services for our organisation.';

  const servicesList = [
    { icon: 'plane', title: 'Corporate Air Ticketing', text: 'Negotiated fares, flexible tickets and same-day issuance for business travel.' },
    { icon: 'briefcase', title: 'Business Travel Management', text: 'End-to-end management of your organisation\'s travel programme.' },
    { icon: 'hotel', title: 'Hotel Reservations', text: 'Preferred properties and negotiated corporate rates worldwide.' },
    { icon: 'users', title: 'Group & Incentive Travel', text: 'Team offsites, incentive trips and delegation travel.' },
    { icon: 'award', title: 'Executive Travel', text: 'Premium cabin, airport assistance and discreet handling for senior staff.' },
    { icon: 'passport', title: 'Visa Assistance', text: 'Business visa documentation for staff, with standing company files.' },
    { icon: 'car', title: 'Airport Transfers', text: 'Pre-booked ground transport at both ends of every trip.' },
    { icon: 'building', title: 'Meetings & Conference Travel', text: 'MICE arrangements including exhibition and conference delegations.' },
    { icon: 'headset', title: 'Dedicated Account Support', text: 'One named account manager who knows your policy and your travellers.' },
    { icon: 'doc', title: 'Travel Reporting', text: 'Consolidated invoicing and spend reporting by department or cost centre.' },
  ];

  const body = `
${c.pageHero({
    image: '/assets/img/corporate-travel.jpg',
    imageAlt: 'A business traveller walking through an airport terminal',
    eyebrow: 'Corporate Travel',
    title: 'Corporate Travel Solutions',
    text: 'Efficient travel management for businesses, organisations and corporate travellers &mdash; with one account manager, consolidated invoicing and reporting you can actually use.',
    buttons: [c.btn.link('/get-a-quote/', 'Request Corporate Consultation', 'btn--gold'), c.btn.whatsapp(wa), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          <div class="prose">
            <p>Corporate travel fails in predictable ways. A booking made by whoever was free that afternoon. A fare that looked cheap until the change fee. An executive stranded because nobody was reachable after hours. Invoices scattered across a dozen card statements with no way to see what the organisation actually spent.</p>
            <p>A managed travel programme fixes those things. You get a named account manager who knows your travel policy, your approval chain and your frequent travellers. Bookings are made against your policy rather than against whatever was on screen. Invoices consolidate monthly by department or cost centre. And there is someone to call when a flight cancels at midnight.</p>
            <p>We work with organisations of all sizes, from businesses sending a handful of people abroad each year to those managing continuous travel across multiple departments.</p>
          </div>

          <h2 style="margin-top:var(--sp-10)">Corporate Services</h2>
          <div class="feature-row" style="margin-top:var(--sp-6)">
            ${servicesList.map(c.featureItem).join('')}
          </div>

          ${c.inlineCta({
            title: 'Discuss a corporate account',
            text: 'We will review your current travel spend and propose how a managed programme would work.',
            waMessage: wa,
            quoteLabel: 'Request Consultation',
          })}

          <h2 style="margin-top:var(--sp-10)">How a Corporate Account Works</h2>
          <ol class="steps" style="margin-top:var(--sp-6)">
            ${[
              { title: 'Consultation', text: 'We review your travel patterns, policy and pain points.' },
              { title: 'Account Setup', text: 'A named account manager, agreed service levels and billing arrangements.' },
              { title: 'Day-to-Day Booking', text: 'Your team books through one channel; we apply your policy automatically.' },
              { title: 'Reporting & Review', text: 'Consolidated monthly invoicing with spend reporting and periodic review.' },
            ]
              .map(c.stepItem)
              .join('')}
          </ol>

          <h2 style="margin-top:var(--sp-10)">Built to Scale</h2>
          <p>Our systems are structured so that online booking tools, GDS and API integrations, payment gateways and CRM connections can be added as your programme grows &mdash; without you having to change provider to get there.</p>
        </div>

        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Related Services', [
            { label: 'Air Ticketing', url: '/services/air-ticketing/' },
            { label: 'Hotel Reservations', url: '/hotels/' },
            { label: 'Business Visa', url: '/visa-services/business-visa/' },
            { label: 'Visa Appointments', url: '/services/visa-appointment-booking/' },
            { label: 'Airport Transfers', url: '/services/airport-transfers/' },
            { label: 'Travel Insurance', url: '/services/travel-insurance/' },
          ])}
        </aside>
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--green',
    inner: `${c.sectionHead({ eyebrow: 'Corporate Benefits', title: 'What Your Organisation Gets', center: true })}
      <div class="feature-row feature-row--3">
        ${[
          { icon: 'wallet', title: 'Controlled Spend', text: 'Policy applied at booking, with visibility over what is actually being spent.' },
          { icon: 'clock', title: 'Time Saved', text: 'Your staff stop comparing fares and get back to their actual jobs.' },
          { icon: 'headset', title: 'Support When It Matters', text: 'A real contact when a flight cancels or an itinerary has to change.' },
        ].map(c.featureItem).join('')}
      </div>`,
  })}

${c.ctaBand({ title: 'Ready to Streamline Your Corporate Travel?', text: 'Book a consultation and we will show you how a managed programme would work for your organisation.', waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: 'Corporate Travel Management Islamabad | Business Travel Solutions',
      description:
        'Corporate travel management from Islamabad — business air ticketing, hotels, visas, MICE, executive travel, dedicated account support, consolidated invoicing and travel reporting.',
      crumbs: [{ label: 'Corporate Travel', url }],
      body,
      schema: [c.serviceSchema({ name: 'Corporate Travel Management', description: 'Business travel management services for organisations in Pakistan.', url })],
      waMessage: wa,
    }),
    priority: '0.85',
    changefreq: 'monthly',
  };
}

/* ------------------------------------------------------------------ FAQs */
function faqPage() {
  const url = '/faqs/';
  const wa = 'Assalam o Alaikum, I have a question that is not covered in your FAQs.';

  const sections = faqs.groups
    .map(
      (g, i) => `
      <div style="margin-bottom:var(--sp-10)">
        <h2 id="faq-${i}" style="display:flex;align-items:center;gap:var(--sp-3)">
          <span class="card__icon" style="margin:0;width:38px;height:38px">${icon(g.icon, { size: 20 })}</span>
          ${esc(g.title)}
        </h2>
        <div style="margin-top:var(--sp-5)">
          ${c.faqAccordion(g.items, `faqpage-${i}`)}
        </div>
      </div>`
    )
    .join('');

  const body = `
${c.pageHero({
    eyebrow: 'FAQs',
    title: 'Frequently Asked Questions',
    text: 'Answers to the questions we are asked most about Umrah, visas, flights, bookings and how we work. If yours is not here, just ask.',
    buttons: [c.btn.whatsapp(wa, 'Ask a Question'), c.btn.callLight()],
  })}

  <section class="section">
    <div class="container">
      <div class="with-sidebar">
        <div>
          ${sections}
          ${c.inlineCta({
            title: 'Still have a question?',
            text: 'Our consultants answer WhatsApp messages during business hours.',
            waMessage: wa,
          })}
        </div>
        <aside class="sidebar is-sticky">
          ${c.contactSidebarCard(wa)}
          ${c.linkListCard('Jump to a Section', faqs.groups.map((g, i) => ({ label: g.title, url: `#faq-${i}` })))}
        </aside>
      </div>
    </div>
  </section>

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: 'FAQs | Umrah, Visa & Travel Questions Answered',
      description:
        'Frequently asked questions about Umrah packages, Hajj, visa assistance, flights, hotels, bookings and payments — answered by Mazin Haramain Tours & Travels, Islamabad.',
      crumbs: [{ label: 'FAQs', url }],
      body,
      schema: [c.faqSchema(faqs.all)],
      waMessage: wa,
    }),
    priority: '0.8',
    changefreq: 'monthly',
  };
}

/* --------------------------------------------------------------- Reviews */
function reviewsPage() {
  const url = '/reviews/';
  const wa = 'Assalam o Alaikum, I recently travelled with Mazin Haramain and would like to share my feedback.';

  const content = reviews.length
    ? `<div class="grid grid--3">${reviews.map(c.reviewCard).join('')}</div>`
    : `
      <div class="form-card text-center" style="max-width:700px;margin-inline:auto">
        <span class="stars" aria-hidden="true">${icon('star', { size: 22 }).repeat(5)}</span>
        <h2 style="margin-top:var(--sp-4);font-size:var(--fs-xl)">We publish only genuine reviews</h2>
        <p style="color:var(--muted)">
          We do not write testimonials on our clients' behalf, and we do not publish reviews we cannot attribute to a real
          customer who agreed to it being shown. As verified reviews come in, they will appear on this page.
        </p>
        <p style="color:var(--muted)">
          If you have travelled with us, your feedback genuinely helps other pilgrims and travellers choose with confidence.
        </p>
        <div class="btn-row btn-row--center" style="margin-top:var(--sp-6)">
          ${googleReviewUrl ? `<a class="btn btn--gold" href="${attr(googleReviewUrl)}" target="_blank" rel="noopener">Write a Google Review</a>` : ''}
          ${c.btn.whatsapp(wa, 'Send Feedback on WhatsApp')}
        </div>
      </div>`;

  const body = `
${c.pageHero({
    eyebrow: 'Customer Reviews',
    title: 'What Our Customers Say',
    text: 'Real feedback from travellers who booked with us. No invented testimonials, ever.',
  })}

  <section class="section">
    <div class="container">
      ${content}
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({
      eyebrow: 'Our Commitment',
      title: 'Why You Will Not Find Fake Reviews Here',
      center: true,
    })}
      <div class="prose" style="margin-inline:auto;text-align:left;max-width:700px">
        <p>Travel is one of the easiest industries in which to fabricate social proof, and plenty of agencies do it. We do not, for three reasons.</p>
        <p>It is dishonest. It breaches the review platforms' own policies and can result in a business being penalised. And most importantly, it is useless to you &mdash; a page of invented five-star reviews tells you nothing about whether an agency will handle your booking well.</p>
        <p>What we would rather you did is ask us directly. Ask for references from clients who travelled on a similar package. Ask to see the licences we hold. Ask what happens if the hotel we quoted is unavailable. Those answers tell you far more than any testimonial.</p>
      </div>
      <div class="btn-row btn-row--center" style="margin-top:var(--sp-8)">
        ${c.btn.whatsapp('Assalam o Alaikum, I would like to ask some questions before booking.', 'Ask Us Anything')}
        ${c.btn.link('/contact/', 'Visit Our Office', 'btn--outline')}
      </div>`,
  })}

${c.ctaBand({ waMessage: wa })}`;

  return {
    url,
    html: layout({
      url,
      title: 'Customer Reviews | Mazin Haramain Tours & Travels',
      description:
        'Genuine customer reviews of Mazin Haramain Tours & Travels. We publish only verified, permissioned feedback from travellers who have booked with us.',
      crumbs: [{ label: 'Reviews', url }],
      body,
      waMessage: wa,
    }),
    priority: '0.6',
    changefreq: 'monthly',
  };
}

/* --------------------------------------------------------------- Sitemap */
function sitemapPage() {
  const url = '/sitemap/';
  const B = '/umrah-packages/';
  const V = '/visa-services/';

  const group = (title, links) => `
        <div>
          <h2 style="font-size:var(--fs-lg)">${esc(title)}</h2>
          <ul class="tick-list">
            ${each(links, (l) => `<li><a href="${attr(l.url)}">${esc(l.label)}</a></li>`)}
          </ul>
        </div>`;

  const body = `
${c.pageHero({
    eyebrow: 'Site Map',
    title: 'Every Page on This Site',
    text: 'A complete index of our services, packages, destinations and guides.',
  })}

  <section class="section">
    <div class="container">
      <div class="grid grid--3">
        ${group('Main Pages', [
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about/' },
          { label: 'Travel Agency in Islamabad', url: '/travel-agency-in-islamabad/' },
          { label: 'Services', url: '/services/' },
          { label: 'Corporate Travel', url: '/corporate-travel/' },
          { label: 'Travel Guides', url: '/travel-guides/' },
          { label: 'Reviews', url: '/reviews/' },
          { label: 'FAQs', url: '/faqs/' },
          { label: 'Get a Quote', url: '/get-a-quote/' },
          { label: 'Contact', url: '/contact/' },
        ])}
        ${group('Services', services.map((s) => ({ label: s.title, url: s.url })))}
        ${group('Umrah Packages', [
          { label: 'All Umrah Packages', url: B },
          ...U.tiers.map((t) => ({ label: t.title, url: `${B}${t.slug}/` })),
          ...U.durations.map((d) => ({ label: d.title, url: `${B}${d.slug}/` })),
          ...U.special.map((s) => ({ label: s.title, url: `${B}${s.slug}/` })),
        ])}
        ${group('Umrah by City', U.cities.map((x) => ({ label: `Umrah from ${x.city}`, url: `${B}${x.slug}/` })))}
        ${group('Visa Categories', [
          { label: 'All Visa Services', url: V },
          ...visaTypes.map((t) => ({ label: t.title, url: `${V}${t.slug}/` })),
        ])}
        ${group('Visa by Country', countries.map((x) => ({ label: `${x.short || x.name} Visa`, url: `${V}${x.slug}/` })))}
        ${group('Destinations', [
          { label: 'All Destinations', url: '/destinations/' },
          ...destinations.map((d) => ({ label: d.name, url: `/destinations/${d.slug}/` })),
        ])}
        ${group('Hotels', [
          { label: 'All Hotels', url: '/hotels/' },
          ...hotels.map((h) => ({ label: h.city, url: `/hotels/${h.slug}/` })),
        ])}
        ${group('Flight Routes', [
          { label: 'All Flight Routes', url: '/flights/' },
          ...flightRoutes.map((r) => ({ label: `${r.from} to ${r.to}`, url: `/flights/${r.slug}/` })),
        ])}
        ${group('Travel Guides', guides.map((g) => ({ label: g.title, url: `/travel-guides/${g.slug}/` })))}
        ${group('Legal', [
          { label: 'Privacy Policy', url: '/privacy-policy/' },
          { label: 'Terms & Conditions', url: '/terms-and-conditions/' },
          { label: 'Booking Terms', url: '/booking-terms/' },
          { label: 'Refund & Cancellation Policy', url: '/refund-and-cancellation-policy/' },
          { label: 'Visa Disclaimer', url: '/visa-disclaimer/' },
        ])}
      </div>
    </div>
  </section>

${c.ctaBand()}`;

  return {
    url,
    html: layout({
      url,
      title: 'Site Map | Mazin Haramain Tours & Travels',
      description: 'A complete index of every page on the Mazin Haramain Tours & Travels website — services, Umrah packages, visa pages, destinations, hotels and travel guides.',
      crumbs: [{ label: 'Site Map', url }],
      body,
    }),
    priority: '0.4',
    changefreq: 'weekly',
  };
}

/* --------------------------------------------------------- Thank you/404 */
function thankYou() {
  const url = '/thank-you/';
  const body = `
  <section class="section section--lg">
    <div class="container container--narrow text-center">
      <span class="card__icon" style="margin-inline:auto;width:64px;height:64px;background:var(--green-100)">${icon('checkCircle', { size: 32 })}</span>
      <h1 style="margin-top:var(--sp-5)">Thank You — We Have Your Inquiry</h1>
      <p class="lead">A travel consultant will review your request and get back to you with options and pricing. If your travel date is close, message us on WhatsApp for a faster reply.</p>
      <div class="btn-row btn-row--center" style="margin-top:var(--sp-8)">
        ${c.btn.whatsapp('Assalam o Alaikum, I just submitted an inquiry on your website.', 'WhatsApp Us Now')}
        ${c.btn.call()}
        ${c.btn.link('/', 'Back to Home', 'btn--ghost')}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'While You Wait', title: 'Helpful Reading', center: true })}
      <div class="grid grid--3">
        ${guides
          .slice(0, 3)
          .map((g) =>
            c.mediaCard({
              url: `/travel-guides/${g.slug}/`,
              title: g.title,
              text: g.excerpt,
              badge: g.category,
              image: `/assets/img/guides/${g.slug}.jpg`,
              imageAlt: g.title,
            })
          )
          .join('')}
      </div>`,
  })}`;

  return {
    url,
    html: layout({
      url,
      title: 'Thank You | Mazin Haramain Tours & Travels',
      description: 'Thank you for your inquiry. A travel consultant will contact you shortly with options and pricing.',
      body,
      noindex: true,
    }),
    skipSitemap: true,
  };
}

function notFound() {
  const body = `
  <section class="section section--lg">
    <div class="container container--narrow text-center">
      <span class="eyebrow">Error 404</span>
      <h1>This Page Could Not Be Found</h1>
      <p class="lead">The page you are looking for may have moved or no longer exists. Try one of these instead.</p>
      <div class="btn-row btn-row--center" style="margin-top:var(--sp-8)">
        ${c.btn.link('/', 'Back to Home', 'btn--gold')}
        ${c.btn.link('/umrah-packages/', 'Umrah Packages', 'btn--outline')}
        ${c.btn.link('/visa-services/', 'Visa Services', 'btn--outline')}
        ${c.btn.link('/sitemap/', 'Site Map', 'btn--ghost')}
      </div>
    </div>
  </section>

${c.section({
    cls: 'section--cream',
    inner: `${c.sectionHead({ eyebrow: 'Popular Pages', title: 'You Might Be Looking For', center: true })}
      <div class="grid grid--4">
        ${[
          { url: '/umrah-packages/', icon: 'kaaba', title: 'Umrah Packages', text: 'Economy to VIP, from every Pakistani city' },
          { url: '/visa-services/', icon: 'passport', title: 'Visa Services', text: 'Assistance for 40+ destinations' },
          { url: '/destinations/', icon: 'globe', title: 'Tour Packages', text: 'Turkey, Dubai, Malaysia and more' },
          { url: '/contact/', icon: 'phone', title: 'Contact Us', text: 'Blue Area, Islamabad' },
        ]
          .map(c.iconCard)
          .join('')}
      </div>`,
  })}`;

  return {
    url: '/404.html',
    rawPath: '404.html',
    html: layout({
      url: '/404.html',
      title: 'Page Not Found | Mazin Haramain Tours & Travels',
      description: 'The page you are looking for could not be found. Browse our Umrah packages, visa services, tour destinations and travel guides instead.',
      body,
      noindex: true,
    }),
    skipSitemap: true,
  };
}

module.exports = () => [
  about(), contact(), quote(), corporate(), faqPage(), reviewsPage(),
  sitemapPage(), thankYou(), notFound(),
];
