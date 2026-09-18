/* ==========================================================================
   Legal pages.
   Drafted to be accurate for a Pakistani travel agency and honest about the
   limits of what a travel agent can promise. Items the client must confirm
   are marked with [REVIEW] so they are impossible to miss before launch.
   ========================================================================== */

const site = require('../data/site');
const { layout } = require('../templates/layout');
const c = require('../templates/components');
const { esc, attr } = require('../lib/html');

const UPDATED = 'September 2026';

function legalPage({ slug, title, metaTitle, metaDescription, intro, body }) {
  const url = `/${slug}/`;
  const html = `
${c.pageHero({ eyebrow: 'Legal', title, text: esc(intro) })}

  <section class="section">
    <div class="container container--narrow">
      <p class="form-note" style="margin-bottom:var(--sp-6)">Last updated: ${esc(UPDATED)}</p>
      <div class="prose" style="max-width:none">
        ${body}
      </div>

      <div class="inline-cta" style="margin-top:var(--sp-10)">
        <div>
          <h3>Questions about this policy?</h3>
          <p>Contact us at <a href="mailto:${attr(site.email)}">${esc(site.email)}</a> or call ${esc(site.phonePrimary.label)}.</p>
        </div>
        <div class="btn-row">
          ${c.btn.link('/contact/', 'Contact Us', 'btn--outline', ' btn--sm')}
        </div>
      </div>
    </div>
  </section>`;

  return {
    url,
    html: layout({
      url,
      title: metaTitle,
      description: metaDescription,
      crumbs: [{ label: title, url }],
      body: html,
    }),
    priority: '0.3',
    changefreq: 'yearly',
  };
}

const ADDRESS = `${site.name}, ${site.address.full}`;

/* ------------------------------------------------------------------------ */
const pages = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | Mazin Haramain Tours & Travels',
    metaDescription:
      'How Mazin Haramain Tours & Travels collects, uses, stores and protects your personal information when you enquire about or book travel services.',
    intro: 'How we collect, use and protect the personal information you share with us.',
    body: `
<p>This policy explains what personal information ${esc(site.name)} collects, why we collect it, how we use it and what rights you have. It applies to this website and to enquiries and bookings made through any of our channels.</p>

<h2>Information we collect</h2>
<p>We collect information you give us directly when you enquire or book:</p>
<ul>
  <li><strong>Contact details</strong> — name, phone number, WhatsApp number, email address and postal address.</li>
  <li><strong>Travel details</strong> — destination, travel dates, number of travellers, budget and preferences.</li>
  <li><strong>Documentation</strong> — where a booking requires it: passport details, CNIC, photographs, vaccination records, employment and financial documents, and similar material needed for visa applications or travel bookings.</li>
  <li><strong>Correspondence</strong> — records of your communication with us by phone, WhatsApp, email or in person.</li>
</ul>
<p>We also collect limited technical information automatically when you use this website, including your IP address, browser type, device type, pages viewed and referring source. This is used in aggregate to understand how the site is used.</p>

<h2>How we use your information</h2>
<ul>
  <li>To respond to your enquiry and prepare quotations.</li>
  <li>To make and manage your travel bookings — flights, hotels, transport, insurance and tours.</li>
  <li>To prepare and submit visa applications on your instruction.</li>
  <li>To contact you about your booking, including changes and travel updates.</li>
  <li>To comply with legal, regulatory and tax obligations.</li>
  <li>To improve our services and this website.</li>
  <li>Where you have agreed, to send you offers and travel information. You can opt out at any time.</li>
</ul>

<h2>Sharing your information</h2>
<p>Delivering travel services requires sharing certain information with third parties. We share only what is necessary, and only with:</p>
<ul>
  <li><strong>Travel suppliers</strong> — airlines, hotels, transport providers, tour operators and insurers involved in your booking.</li>
  <li><strong>Embassies, consulates and visa application centres</strong> — where you have instructed us to assist with a visa application.</li>
  <li><strong>Government and regulatory authorities</strong> — where required by law.</li>
  <li><strong>Service providers</strong> — payment processors and IT providers acting on our behalf under confidentiality obligations.</li>
</ul>
<p>We do not sell your personal information, and we do not share it for third-party marketing.</p>

<h2>International transfers</h2>
<p>Because travel is international by nature, your information may be transferred to and processed in other countries — for example to a hotel in Saudi Arabia or an embassy processing your visa. Data protection standards vary between countries. We share only what the booking or application requires.</p>

<h2>How long we keep information</h2>
<p>We retain booking and financial records for as long as required by Pakistani tax and regulatory law. Enquiry information that does not result in a booking is retained for a reasonable period and then deleted. Copies of sensitive documents such as passports are retained only as long as needed for the booking or application concerned.</p>

<h2>Security</h2>
<p>We take reasonable technical and organisational measures to protect your information against loss, misuse and unauthorised access. This website uses encrypted connections. No system is completely secure, and we cannot guarantee absolute security of information transmitted over the internet.</p>

<h2>Your choices</h2>
<ul>
  <li>Ask what personal information we hold about you.</li>
  <li>Ask us to correct information that is inaccurate.</li>
  <li>Ask us to delete information we no longer need to keep.</li>
  <li>Withdraw consent to marketing at any time.</li>
</ul>
<p>To make any of these requests, contact us at <a href="mailto:${attr(site.email)}">${esc(site.email)}</a>.</p>

<h2>Cookies</h2>
<p>This website uses cookies and similar technologies to make the site work and to understand how it is used, including through analytics services. You can control cookies through your browser settings; disabling them may affect how parts of the site function.</p>

<h2>Third-party links</h2>
<p>Our website links to external sites — airlines, embassies, visa application centres and others. We are not responsible for their content or their privacy practices. Read their policies before sharing information with them.</p>

<h2>Children</h2>
<p>Our services are directed at adults. Where a booking includes children, their information is provided by a parent or guardian and is used only for that booking.</p>

<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. The version published on this page, with the date shown above, is the one that applies.</p>

<h2>Contact</h2>
<p>${esc(ADDRESS)}<br>
Email: <a href="mailto:${attr(site.email)}">${esc(site.email)}</a><br>
Phone: <a href="tel:${attr(site.phonePrimary.tel)}">${esc(site.phonePrimary.label)}</a></p>
`,
  },

  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    metaTitle: 'Terms & Conditions | Mazin Haramain Tours & Travels',
    metaDescription:
      'The terms and conditions governing use of the Mazin Haramain Tours & Travels website and the travel services we provide.',
    intro: 'The terms that govern your use of this website and the services we provide.',
    body: `
<p>These terms govern your use of this website and the travel services provided by ${esc(site.name)}. By using this website or instructing us to arrange travel, you accept these terms.</p>

<h2>About us</h2>
<p>${esc(site.name)} is a travel agency based at ${esc(site.address.full)}. We arrange travel services including Umrah and Hajj travel assistance, air ticketing, visa documentation assistance, hotel reservations, tours, transfers and corporate travel management.</p>

<h2>Our role as an agent</h2>
<p>For most services we act as an agent for the suppliers who actually provide them — airlines, hotels, transport operators, tour operators and insurers. Your booking with those suppliers is subject to their own terms and conditions, which apply alongside ours. We are not liable for the acts, omissions or failures of a supplier beyond our role in arranging the booking.</p>
<p>Where we provide our own services — consultation, documentation assistance, coordination and support — we provide them with reasonable skill and care.</p>

<h2>Website content</h2>
<p>We take care to keep this website accurate, but content is provided for general information. Prices, availability, itineraries, government requirements and visa rules change frequently and without notice. Nothing on this website is an offer capable of acceptance, and no booking exists until we confirm it in writing and any required payment is received.</p>
<p>Travel, visa and health requirements described on this site are general guidance and not legal or immigration advice. Always confirm current requirements with the relevant authority.</p>

<h2>Quotations and pricing</h2>
<ul>
  <li>Quotations are valid only for the period stated and are subject to availability at the time of confirmation.</li>
  <li>Prices may change before confirmation due to airline fares, hotel rates, exchange rates, taxes and government charges.</li>
  <li>Package prices are per person on the sharing basis stated unless the quotation says otherwise.</li>
  <li>Your written confirmation lists what is included and excluded. Anything not listed is not included.</li>
</ul>

<h2>Your responsibilities</h2>
<ul>
  <li>Provide accurate, complete information and genuine documents. Names must match your passport exactly.</li>
  <li>Hold a valid passport with sufficient remaining validity, and obtain the visas and permits your journey requires.</li>
  <li>Meet health and vaccination requirements for your destination.</li>
  <li>Check all travel documents we issue and tell us immediately of any error.</li>
  <li>Arrive at airports and departure points in good time.</li>
  <li>Comply with the laws and customs of the countries you visit.</li>
</ul>
<div class="callout callout--warn">
<span class="callout__title">Documents must be genuine</span>
<p>Submitting false, altered or fabricated documents in support of a visa application is a serious matter that can result in refusal, a long-term entry ban and referral to the authorities. We will not knowingly submit such documents and will cease acting for any client who asks us to.</p>
</div>

<h2>Payments</h2>
<p>Payment terms are set out in your booking confirmation. Bookings are generally confirmed against a deposit with the balance due before ticketing or departure. Tickets and confirmations are issued only once cleared payment is received. Always obtain a receipt, and make payments only to the company account details given on your written confirmation.</p>

<h2>Changes and cancellations</h2>
<p>Changes and cancellations are governed by the terms of the airlines, hotels and suppliers concerned, together with our <a href="/refund-and-cancellation-policy/">refund and cancellation policy</a> and <a href="/booking-terms/">booking terms</a>.</p>

<h2>Liability</h2>
<p>We are not liable for loss or damage arising from:</p>
<ul>
  <li>Acts or omissions of airlines, hotels, transport operators or other suppliers.</li>
  <li>Refusal of a visa or of entry by any immigration authority.</li>
  <li>Flight delays, cancellations, schedule changes or overbooking by an airline.</li>
  <li>Events beyond our reasonable control, including weather, natural disasters, strikes, civil unrest, epidemics, government action and changes to entry requirements.</li>
  <li>Loss, theft or damage to personal belongings.</li>
  <li>Your failure to hold valid travel documents or to meet health requirements.</li>
</ul>
<p>Where we are found liable, our liability is limited to the amount of the service charge you paid us for the service concerned. Nothing in these terms excludes liability that cannot lawfully be excluded.</p>

<h2>Travel insurance</h2>
<p>We strongly recommend travel insurance for every international journey, and it is mandatory for some destinations. If you decline insurance, you accept the financial risk of medical costs, cancellation, curtailment and loss abroad.</p>

<h2>Intellectual property</h2>
<p>The content, design and materials on this website belong to ${esc(site.name)} unless otherwise stated, and may not be reproduced without permission.</p>

<h2>Complaints</h2>
<p>If something goes wrong, tell us as soon as possible — while you are travelling if it happens then, as most issues can only be resolved at the time. Contact us at <a href="mailto:${attr(site.email)}">${esc(site.email)}</a> or on WhatsApp.</p>

<h2>Governing law</h2>
<p>These terms are governed by the laws of the Islamic Republic of Pakistan, and the courts of Islamabad have jurisdiction over any dispute. <em>[REVIEW: confirm with your legal adviser before launch.]</em></p>
`,
  },

  {
    slug: 'booking-terms',
    title: 'Booking Terms',
    metaTitle: 'Booking Terms | Mazin Haramain Tours & Travels',
    metaDescription:
      'How bookings work with Mazin Haramain Tours & Travels — quotations, deposits, payment schedules, documentation, amendments and what is included.',
    intro: 'How a booking works, from quotation to departure.',
    body: `
<p>These booking terms explain the process from enquiry to travel, and apply alongside our <a href="/terms-and-conditions/">terms and conditions</a>.</p>

<h2>1. Enquiry and quotation</h2>
<p>You tell us your requirements. We provide a written quotation setting out the itinerary, the services included, the services excluded, the total price and its validity period. A quotation is not a booking and does not hold any seat, room or price.</p>

<h2>2. Confirmation</h2>
<p>A booking is confirmed when you accept the quotation in writing and the required deposit is received and cleared. We then issue a booking confirmation listing:</p>
<ul>
  <li>The traveller names as they appear on passports</li>
  <li>The full itinerary with dates</li>
  <li>The hotels, with their location and room occupancy</li>
  <li>Everything included and everything excluded</li>
  <li>The total price and the payment schedule</li>
  <li>The cancellation and amendment terms that apply</li>
</ul>
<p>Check this document carefully and tell us immediately of any discrepancy. Corrections after tickets are issued may incur airline charges.</p>

<h2>3. Payment schedule</h2>
<ul>
  <li>A deposit is payable to confirm the booking. The amount depends on the services and supplier requirements.</li>
  <li>The balance is due by the date stated in your confirmation, generally before ticketing or before departure.</li>
  <li>Some services — promotional airfares, certain hotel rates, visa fees — require payment in full at the time of booking.</li>
  <li>Failure to pay by the due date may result in cancellation and loss of the deposit.</li>
</ul>
<div class="callout callout--gold">
<span class="callout__title">Pay safely</span>
<p>Make payments only to the company account named on your written confirmation, and always obtain a receipt. Never transfer funds to a personal account in an individual's name for a company booking.</p>
</div>

<h2>4. Documentation</h2>
<p>You must provide the documents your booking requires by the deadlines we give you — passports, photographs, CNIC, vaccination records and any documents a visa application needs. Delays in providing documents can mean a lost appointment, a missed visa deadline or an expired fare, and any resulting costs are yours.</p>
<p>Names on every document must match the passport exactly. Airlines and immigration authorities treat name discrepancies seriously, and corrections can be expensive or impossible.</p>

<h2>5. Prices and what affects them</h2>
<p>Prices are based on the airfares, hotel rates, taxes and exchange rates applying at the time of quotation. Before your booking is confirmed, prices may change. After confirmation, we will not increase the price except where a government or supplier imposes a new or increased tax, fee or surcharge, in which case we will tell you promptly with an explanation.</p>

<h2>6. Amendments</h2>
<p>Amendments are subject to availability and supplier terms. Airline name changes, date changes and routing changes usually carry fees, and some fares cannot be changed at all. We will tell you the cost before making any amendment.</p>

<h2>7. What is included</h2>
<p>Only what your written confirmation lists. Typically included in a package:</p>
<ul>
  <li>Visa processing where stated</li>
  <li>Return air tickets on the stated routing</li>
  <li>Hotel accommodation as specified, with stated occupancy</li>
  <li>Transfers and transport as specified</li>
  <li>Ziyarat or tours where stated</li>
</ul>
<p>Typically excluded:</p>
<ul>
  <li>Meals unless stated</li>
  <li>Personal expenses, shopping and gifts</li>
  <li>Travel insurance unless added</li>
  <li>Excess baggage charges</li>
  <li>Additional transport, optional excursions and qurbani</li>
  <li>Any increase in government taxes or fees after confirmation</li>
</ul>

<h2>8. Hotel and supplier changes</h2>
<p>Occasionally a hotel becomes unavailable after confirmation due to overbooking or circumstances outside our control. Where this happens we will arrange alternative accommodation of a comparable or higher standard in a comparable location, and tell you as soon as we know.</p>

<h2>9. Group bookings</h2>
<p>Group bookings are subject to the airline's and hotels' group terms, which typically require a deposit to hold the allocation and a final rooming list and full payment by a stated deadline. Names added or changed after that deadline may not be accommodated.</p>

<h2>10. Travel advice</h2>
<p>You are responsible for checking travel advisories for your destination and for satisfying yourself that you are willing to travel. We will share what we know, but the decision is yours.</p>

<h2>11. Support during travel</h2>
<p>Our WhatsApp line is monitored for clients who are travelling. If something goes wrong &mdash; a hotel issue, a schedule change, an emergency &mdash; contact us straight away. Most problems can be solved while you are there and very few can be solved afterwards.</p>
`,
  },

  {
    slug: 'refund-and-cancellation-policy',
    title: 'Refund & Cancellation Policy',
    metaTitle: 'Refund & Cancellation Policy | Mazin Haramain Tours & Travels',
    metaDescription:
      'Cancellation charges, refund timelines and non-refundable components explained for bookings with Mazin Haramain Tours & Travels.',
    intro: 'What happens if you need to cancel, and how refunds are processed.',
    body: `
<p>This policy explains what happens when a booking is cancelled. It applies alongside our <a href="/terms-and-conditions/">terms and conditions</a> and <a href="/booking-terms/">booking terms</a>.</p>

<h2>How cancellation charges work</h2>
<p>When you cancel, the amount recoverable depends on what the suppliers refund, not on what you have paid us. Airlines, hotels and tour operators each apply their own cancellation terms, and those terms determine most of the outcome.</p>
<p>Cancellation charges generally increase as the departure date approaches, and many components become fully non-refundable at a certain point.</p>

<h2>Non-refundable components</h2>
<p>The following are normally non-refundable once incurred, regardless of when you cancel:</p>
<ul>
  <li><strong>Visa fees</strong> — embassy and application centre fees are not refunded, including where an application is refused.</li>
  <li><strong>Non-refundable airfares</strong> — most promotional and discounted fares cannot be refunded. Government taxes within a ticket may sometimes be recoverable.</li>
  <li><strong>Non-refundable hotel rates</strong> — advance-purchase and peak-season rates, particularly for Ramadan and Hajj periods.</li>
  <li><strong>Issued travel insurance premiums.</strong></li>
  <li><strong>Our service and processing charges</strong> for work already carried out.</li>
</ul>

<h2>Cancellation by you</h2>
<p>Cancellation requests must be made in writing — email or WhatsApp is sufficient — and take effect on the date we receive them. We will then:</p>
<ol>
  <li>Confirm receipt of your cancellation.</li>
  <li>Apply to each supplier for whatever refund their terms allow.</li>
  <li>Give you a written breakdown of what is recoverable and what is not.</li>
  <li>Process the refundable amount once the suppliers have refunded us.</li>
</ol>

<h2>Refund timelines</h2>
<p>Refunds depend on the supplier. Airline refunds in particular can take considerable time — often several weeks and sometimes longer, depending on the carrier and the fare. We process your refund once we receive the funds, and we will keep you updated on progress.</p>

<h2>Cancellation by us</h2>
<p>If we have to cancel your booking for reasons within our control, you will receive a full refund of all amounts paid to us. If a booking is cancelled due to events beyond our control &mdash; government action, airline failure, natural disaster, epidemic, closure of a destination &mdash; we will refund whatever the suppliers release to us, and we will pursue those refunds on your behalf.</p>

<h2>Visa refusals</h2>
<div class="callout callout--warn">
<span class="callout__title">Important</span>
<p>A visa refusal does not entitle you to a refund of visa fees, which are consumed by the application, nor of our service charge, which relates to work already performed. Travel components may be refundable in part subject to supplier terms. Where a visa refusal is likely to affect a booking, discuss the risk with us <em>before</em> committing to non-refundable travel arrangements.</p>
</div>

<h2>No-shows and unused services</h2>
<p>Failing to travel, missing a flight, or not using a hotel night or transfer is treated as a no-show, and no refund is available for unused services.</p>

<h2>Amendments instead of cancellation</h2>
<p>Where your plans change but you still intend to travel, an amendment is often cheaper than cancelling and rebooking. Talk to us before cancelling &mdash; we will tell you honestly which route costs less.</p>

<h2>Complaints and disputes</h2>
<p>If you are unhappy with a refund outcome, write to us at <a href="mailto:${attr(site.email)}">${esc(site.email)}</a> with your booking reference. We will review the supplier terms applied and respond with a full explanation.</p>

<p><em>[REVIEW: If you operate a specific cancellation charge scale — for example a percentage by days before departure — insert it here before launch, and make sure it matches what your booking confirmations state.]</em></p>
`,
  },

  {
    slug: 'visa-disclaimer',
    title: 'Visa Disclaimer',
    metaTitle: 'Visa Disclaimer | Mazin Haramain Tours & Travels',
    metaDescription:
      'Our visa assistance disclaimer — we provide documentation and application support only. Visa decisions rest solely with the relevant embassy or immigration authority.',
    intro: 'The limits of visa assistance, stated plainly.',
    body: `
<div class="callout callout--warn">
<span class="callout__title">The essential point</span>
<p>Visa decisions are made solely by the relevant embassy, consulate or immigration authority. ${esc(site.name)} provides documentation and application assistance only. We do not guarantee, and cannot influence, the outcome of any visa application.</p>
</div>

<h2>What we do</h2>
<ul>
  <li>Advise on which visa category fits your circumstances.</li>
  <li>Provide a document checklist tailored to your application.</li>
  <li>Review your documents for completeness and consistency before submission.</li>
  <li>Complete application forms accurately from the information you provide.</li>
  <li>Identify the correct application centre and book your appointment.</li>
  <li>Prepare you for submission and, where applicable, for interview.</li>
  <li>Guide you on tracking your application after submission.</li>
</ul>

<h2>What we do not do</h2>
<ul>
  <li>We do not issue visas. Only governments issue visas.</li>
  <li>We do not influence, expedite or lobby any decision maker.</li>
  <li>We do not guarantee approval, and we will never tell you a visa is assured.</li>
  <li>We do not prepare, procure or submit false or altered documents under any circumstances.</li>
  <li>We do not provide immigration or legal advice. For complex immigration matters, consult a qualified immigration lawyer.</li>
  <li>We are not a recruitment agency and do not offer employment abroad.</li>
</ul>

<h2>Be careful who you trust</h2>
<p>Any agent who guarantees a visa, claims a "100% success rate", offers a "confirmed visa" for a fee, or suggests that documents can be arranged to strengthen a weak application is describing something that is either untrue or unlawful. Applicants lose substantial money to these promises every year, and many end up with a refusal and a deception finding that follows them for years.</p>

<h2>Fees</h2>
<ul>
  <li>Our service charge covers the assistance described above and is payable regardless of the outcome, because it relates to work performed rather than to a result.</li>
  <li>Embassy fees, application centre charges, biometric fees and optional services are separate, paid at the prescribed rates, and are not refundable if an application is refused.</li>
  <li>We will tell you the expected total cost before you commit.</li>
</ul>

<h2>Your responsibilities</h2>
<ul>
  <li>Provide truthful, accurate and complete information.</li>
  <li>Provide genuine documents. Never submit anything you have not verified.</li>
  <li>Disclose all previous visa applications, refusals, overstays and immigration history. Undisclosed history is discovered and is treated far more seriously than the history itself.</li>
  <li>Attend appointments and interviews as scheduled.</li>
  <li>Comply with the conditions of any visa granted, including its validity and permitted stay.</li>
</ul>

<h2>Processing times and requirements</h2>
<p>Processing times are set by the mission and vary by season and volume. Any timeframe we give is indicative guidance, not a commitment. Visa rules, fees and documentary requirements change frequently and without notice — the guidance on this website is general and should be confirmed for your specific application at the time you apply.</p>

<h2>Refusals</h2>
<p>If your application is refused, we will review the refusal notice with you and advise honestly on whether a fresh application is worth making and what would need to change. We do not charge to explain a refusal on an application we handled.</p>

<h2>Travel arrangements and visa risk</h2>
<p>Do not make non-refundable travel arrangements before your visa is issued unless you accept the risk of losing that money. Where a booking must be made to support an application, we will structure it to limit your exposure as far as the suppliers allow.</p>

<h2>Contact</h2>
<p>If anything in this disclaimer is unclear, ask us before proceeding.<br>
Email: <a href="mailto:${attr(site.email)}">${esc(site.email)}</a> &middot; Phone: <a href="tel:${attr(site.phonePrimary.tel)}">${esc(site.phonePrimary.label)}</a></p>
`,
  },
];

module.exports = () => pages.map(legalPage);
