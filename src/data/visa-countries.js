/* ==========================================================================
   Country visa pages.
   One page per country — this is the structure that actually ranks, because
   people search "UK visit visa from Pakistan", not "visa services".

   No page states a government fee or a guaranteed processing time: both move,
   and publishing them invites complaints. Timelines are described as the
   mission's own indicative guidance and always carry the disclaimer.
   ========================================================================== */

/* Shared Schengen framework text, used by every Schengen member page.       */
const SCHENGEN_NOTE =
  'A Schengen visa issued by any member state allows travel throughout the Schengen area. You must apply to the country that is your main destination, or — where you are visiting several countries for equal periods — to the country you will enter first.';

const countries = [
  /* ==================================================== Major destinations */
  {
    slug: 'uk-visa', name: 'United Kingdom', short: 'UK', flag: '🇬🇧', region: 'Europe',
    popular: true, order: 9,
    vac: 'VFS Global (Islamabad, Lahore, Karachi, Mirpur)',
    metaTitle: 'UK Visit Visa from Pakistan | Documents, Process & Assistance',
    metaDescription:
      'UK visit visa assistance from Pakistan — document checklist, sponsor requirements, online application, biometrics appointment and application tracking guidance.',
    lead: 'The UK receives a very large volume of visit applications from Pakistan, and the standard of evidence expected reflects that.',
    intro: [
      'UK visit visas are decided on the balance of probabilities by an entry clearance officer who will never meet you. Everything therefore rests on the written file: that you have a genuine reason to visit, that the trip is funded, and that your circumstances in Pakistan give you reason to return.',
      'Applications are submitted online, with supporting documents uploaded or presented at a VFS Global application centre where you also give biometrics. The UK does not require you to submit your passport at the point of application in every case, but it will be needed for the visa to be issued.',
      'The most common refusal grounds we see are financial: statements that show a large unexplained deposit shortly before applying, income that does not reconcile with tax records, or a sponsor whose stated support is not backed by their own documentation. These are addressable — but only before submission, not after a refusal.',
    ],
    types: ['Standard Visitor (family and friends)', 'Tourist', 'Business visitor', 'Student', 'Family / settlement routes'],
    extraDocs: [
      'Sponsor\'s UK immigration status and passport copy',
      'Sponsor\'s employment letter, payslips and bank statements',
      'Sponsor\'s accommodation evidence (tenancy or mortgage)',
      'Detailed cover letter explaining the purpose of the visit',
      'Six months of personal bank statements with explained credits',
      'Tax returns and business registration where self-employed',
    ],
    faqs: [
      { q: 'How much bank balance is required for a UK visit visa?', a: '<p>There is no published minimum. The UK assesses whether your funds are credible and sufficient for the trip you describe, and whether their source is explained. A modest balance with a consistent history is stronger than a large sum deposited last month.</p>' },
      { q: 'Does a previous UK refusal affect a new application?', a: '<p>It has to be declared, and the new application should directly address the reasons given in the refusal notice. Reapplying with the same file that was refused rarely succeeds — the caseworker can see the previous decision.</p>' },
      { q: 'Do I need to submit my passport with the application?', a: '<p>Arrangements vary by application type and centre. Your passport will be required for the visa to be affixed once a decision is made. We confirm the current process for your case at the appointment stage.</p>' },
    ],
  },
  {
    slug: 'usa-visa', name: 'United States', short: 'USA', flag: '🇺🇸', region: 'North America',
    popular: true, order: 8,
    vac: 'US Embassy Islamabad / Consulate General Karachi',
    metaTitle: 'USA Visit Visa from Pakistan | B1/B2 Application Help',
    metaDescription:
      'US B1/B2 visitor visa assistance from Pakistan — DS-160 form completion, appointment scheduling, interview preparation and document checklist from Islamabad.',
    lead: 'The US visa is decided in a short consular interview. Preparation for those few minutes is the whole exercise.',
    intro: [
      'Unlike most destinations, the United States decides visitor visas through a personal interview at the embassy in Islamabad or the consulate in Karachi. The consular officer works from your DS-160 form, your interview answers and a presumption in law that every applicant intends to immigrate until they demonstrate otherwise.',
      'That presumption is the key to the whole application. Your task is to show strong ties to Pakistan — employment, business, property, family, financial commitments — that make it clear you have reason to return. Documents support that case, but the interview itself carries the weight.',
      'We assist with completing the DS-160 accurately, scheduling the appointment, assembling the supporting file, and preparing you for the interview: the questions typically asked, how to answer them concisely and truthfully, and the inconsistencies that create problems.',
    ],
    types: ['B1 business visitor', 'B2 tourist / family visit', 'B1/B2 combined', 'F1 student', 'Transit'],
    extraDocs: [
      'DS-160 confirmation page with barcode',
      'Appointment confirmation letter',
      'Visa fee payment receipt',
      'Employment or business ownership evidence',
      'Property documents and asset evidence in Pakistan',
      'Invitation letter and status documents of US-based relatives',
    ],
    faqs: [
      { q: 'How long is the wait for a US visa interview in Pakistan?', a: '<p>Appointment waiting times fluctuate considerably and are published by the mission itself. They can be lengthy in peak periods, so begin the process well before your intended travel. We monitor availability and book as early as your documents allow.</p>' },
      { q: 'What questions are asked in the US visa interview?', a: '<p>Typically: the purpose of your trip, how long you will stay, who is paying, whether you have relatives in the US, your employment, and your previous travel. Answers should be brief, direct and consistent with your DS-160. We run through this with you beforehand.</p>' },
      { q: 'Does a refusal under section 214(b) mean I can never reapply?', a: '<p>No. A 214(b) refusal means the officer was not satisfied you had overcome the presumption of immigrant intent on that occasion. You may reapply, but you should do so with materially changed or better-presented circumstances rather than simply trying again.</p>' },
    ],
  },
  {
    slug: 'canada-visa', name: 'Canada', short: 'Canada', flag: '🇨🇦', region: 'North America',
    popular: true, order: 7,
    vac: 'VFS Global (Islamabad, Lahore, Karachi)',
    metaTitle: 'Canada Visit Visa from Pakistan | TRV Application Assistance',
    metaDescription:
      'Canada visitor visa (TRV) assistance from Pakistan — online application, biometrics, document checklist, invitation letters and financial evidence guidance.',
    lead: 'Canada assesses visitor applications on ties, funds and purpose — and it reads the written submission closely.',
    intro: [
      'A Canadian Temporary Resident Visa is applied for online, with biometrics given at a VFS Global centre. The officer reviewing your file is looking for the same essentials as elsewhere — purpose, funding, ties — but Canadian decisions often turn on how clearly the written explanation is set out.',
      'Where family in Canada are inviting you, their invitation letter and status documents carry real weight, particularly where they are undertaking to fund the visit. Where you are self-funding, the financial history needs to demonstrate stability rather than a single sufficient balance.',
      'Applications commonly falter on purpose of visit and travel history. A clearly explained reason for travelling now, with a realistic itinerary and evidence of what you are returning to, addresses the majority of what the officer is weighing.',
    ],
    types: ['Visitor visa (TRV)', 'Super visa for parents and grandparents', 'Business visitor', 'Student permit', 'Transit'],
    extraDocs: [
      'Invitation letter from the Canadian host',
      'Host\'s status documents and income evidence',
      'Detailed purpose-of-travel letter',
      'Proof of ties: employment, property, family in Pakistan',
      'Travel history and previous visas',
      'Family information form and, where requested, additional forms',
    ],
    faqs: [
      { q: 'What is the Super Visa?', a: '<p>The Super Visa is a long-validity multiple-entry route for parents and grandparents of Canadian citizens and permanent residents, allowing extended stays. It carries its own requirements including medical insurance and a minimum income undertaking from the Canadian child or grandchild. Requirements are updated periodically — we confirm the current criteria at enquiry.</p>' },
      { q: 'Do I need biometrics for a Canadian visa?', a: '<p>Biometrics are required for most temporary resident applications and are given at an authorised centre after you submit online. Once enrolled, they remain valid for a defined period, which can save a step on a subsequent application.</p>' },
      { q: 'How long does a Canadian visitor visa take?', a: '<p>Processing times are published by IRCC and vary considerably by country and season. They should be treated as indicative rather than guaranteed. Apply with a comfortable margin ahead of your travel date.</p>' },
    ],
  },
  {
    slug: 'schengen-visa', name: 'Schengen Area', short: 'Schengen', flag: '🇪🇺', region: 'Europe',
    order: 104, isSchengenHub: true,
    vac: 'VFS Global and TLScontact (Islamabad, Lahore, Karachi)',
    metaTitle: 'Schengen Visa from Pakistan | Europe Visa Application Assistance',
    metaDescription:
      'Schengen visa assistance from Pakistan — choosing the right embassy, travel insurance, itinerary and hotel documentation, appointment booking and biometrics.',
    lead: 'One visa, twenty-nine countries — and a set of rules about which embassy you must apply to that applicants get wrong constantly.',
    intro: [
      'The Schengen area operates a common short-stay visa valid across all member states, generally permitting up to 90 days in any 180-day period. The visa itself is straightforward. The procedural rules around which mission you apply to are where applications go wrong.',
      'You must apply to the country that is your main destination, judged by where you will spend the most time. If your stay is split equally between countries, you apply to the state you will enter first. Applying to the "easier" embassy for a trip you are not actually taking there is both detectable and a reliable way to be refused.',
      'Travel medical insurance is mandatory and specified: it must be valid throughout the Schengen area for the full period of stay, covering emergency medical treatment and repatriation to the minimum level required. Insurance that expires before the requested visa validity, or that does not cover the whole area, is a routine cause of refusal — we arrange <a href="/services/travel-insurance/">compliant policies</a> as part of the file.',
    ],
    types: ['Tourist (Type C)', 'Family or friend visit', 'Business', 'Conference and events', 'Airport transit (Type A)'],
    extraDocs: [
      'Schengen-compliant travel medical insurance certificate',
      'Confirmed return flight reservation',
      'Confirmed accommodation for every night of the stay',
      'Day-by-day itinerary consistent with the bookings',
      'Bank statements for the required preceding period',
      'Employment leave letter or business ownership documents',
      'Cover letter explaining the trip and the main destination',
    ],
    faqs: [
      { q: 'Which Schengen country should I apply to?', a: `<p>${SCHENGEN_NOTE} Applying to a country you are not genuinely visiting most is a recognised misuse and grounds for refusal.</p>` },
      { q: 'How much travel insurance cover do I need?', a: '<p>Schengen rules require medical cover valid across the whole area for the entire stay, including emergency treatment and repatriation, to a specified minimum level. We arrange policies that meet the criteria and issue the certificate in the format the mission expects.</p>' },
      { q: 'How long can I stay on a Schengen visa?', a: '<p>Short-stay visas generally allow up to 90 days within any rolling 180-day period across the whole area. Your individual visa sticker states the validity and number of entries granted, which may be less than the maximum.</p>' },
      { q: 'Can I visit several Schengen countries on one visa?', a: '<p>Yes — that is the point of the common visa. Your itinerary should show the full routing, and you apply to the main-destination country as explained above.</p>' },
    ],
  },
  {
    slug: 'uae-visa', name: 'United Arab Emirates', short: 'UAE / Dubai', flag: '🇦🇪', region: 'Middle East',
    order: 105,
    vac: 'Online / airline-sponsored e-visa',
    metaTitle: 'Dubai & UAE Visit Visa from Pakistan | Tourist Visa Assistance',
    metaDescription:
      'UAE and Dubai visit visa assistance from Pakistan — 30 and 60 day tourist visas, documentation, processing and travel packages. Fast, straightforward applications.',
    lead: 'The most accessible major destination for Pakistani travellers — processed electronically, usually within days.',
    intro: [
      'UAE tourist visas are issued electronically and are among the most straightforward applications available to Pakistani passport holders. There is no interview and, in the normal course, no in-person appointment: the application is sponsored by an airline, hotel or licensed travel agency and processed online.',
      'Visas are commonly issued in 30-day and 60-day validities, with single and multiple-entry options. Because the visa is sponsor-linked, the sponsoring entity carries responsibility for the applicant\'s compliance — which is why documentation requirements, while lighter than for Europe, are applied consistently.',
      'The UAE also remains the most common destination for a first international trip from Pakistan, and a clean UAE travel history is genuinely useful when you later apply for a harder visa. It demonstrates that you travelled, complied with the conditions and returned.',
    ],
    types: ['30-day tourist visa', '60-day tourist visa', 'Multiple entry', 'Transit visa', 'Business visit'],
    extraDocs: [
      'Passport copy with at least six months validity',
      'Recent photograph on white background to specification',
      'CNIC copy',
      'Confirmed return air ticket',
      'Hotel booking confirmation',
      'Bank statement where requested for the category',
    ],
    faqs: [
      { q: 'How long does a UAE visa take?', a: '<p>Electronic tourist visas are usually processed within a few working days when the documents are in order. Applications with unclear passport scans or photographs that do not meet the specification take longer because they have to be resubmitted.</p>' },
      { q: 'Can I extend my UAE visit visa?', a: '<p>Extensions are possible for certain categories, subject to immigration approval and fees, and must be applied for before the visa expires. Overstaying carries daily fines and affects future applications — do not rely on sorting it out afterwards.</p>' },
      { q: 'Do I need a hotel booking for a Dubai visa?', a: '<p>Confirmed accommodation is normally required. If you are staying with family, alternative documentation may be accepted depending on the visa category. We arrange the hotel booking as part of a <a href="/destinations/dubai/">Dubai package</a> where you are travelling on a tour.</p>' },
    ],
  },
  {
    slug: 'turkey-visa', name: 'Turkey', short: 'Turkey', flag: '🇹🇷', region: 'Europe / Asia',
    order: 106,
    vac: 'Turkish Consulate / e-Visa system',
    metaTitle: 'Turkey Visa from Pakistan | Tourist & e-Visa Help',
    metaDescription:
      'Turkey visa assistance from Pakistan — tourist visa documentation, e-Visa eligibility, appointment booking and Turkey tour packages from Islamabad.',
    lead: 'Turkey is the most popular long-haul leisure destination for Pakistani travellers — and the rules on who qualifies for an e-Visa are specific.',
    intro: [
      'Turkey operates both a sticker visa applied for through its consular network and an electronic visa system. Eligibility for the e-Visa depends on nationality and, for several nationalities including Pakistani passport holders, on holding a valid visa or residence permit from a specified group of countries. Applicants who do not meet those conditions apply through the standard consular route.',
      'Because the eligibility conditions are frequently misunderstood — and because unofficial websites charge inflated fees for the e-Visa — this is an application where getting the route right at the outset saves both money and a wasted attempt.',
      'Turkey is also one of our strongest tour destinations, and for travellers booking a package the visa file is considerably simpler: the flights, hotels and itinerary in your application are the real ones we have booked. See our <a href="/destinations/turkey/">Turkey tour packages</a>.',
    ],
    types: ['Tourist visa', 'e-Visa (conditional eligibility)', 'Business visa', 'Transit'],
    extraDocs: [
      'Passport with at least six months validity beyond travel',
      'Confirmed return flights and hotel bookings',
      'Bank statements for the preceding months',
      'Employment or business documentation',
      'Travel insurance for the duration of stay',
      'Existing Schengen, UK, US or Irish visa where relying on e-Visa eligibility',
    ],
    faqs: [
      { q: 'Can Pakistani passport holders get a Turkey e-Visa?', a: '<p>Only under specific conditions — typically where the applicant holds a valid visa or residence permit from one of the qualifying countries and meets the other stated criteria. Applicants who do not qualify must apply through the consulate. We confirm which route applies to you before you pay anything.</p>' },
      { q: 'How long does a Turkey visa take?', a: '<p>Consular processing times vary by season and by the volume at the mission. Summer and holiday periods are busier. Apply well ahead of your travel dates rather than close to them.</p>' },
      { q: 'Is Turkey visa-free for Pakistanis?', a: '<p>No. Pakistani passport holders require a visa for Turkey, obtained either through the consulate or, where eligible, through the electronic system.</p>' },
    ],
  },
  {
    slug: 'azerbaijan-visa', name: 'Azerbaijan', short: 'Azerbaijan', flag: '🇦🇿', region: 'Caucasus',
    order: 107,
    vac: 'ASAN e-Visa system / Consulate',
    metaTitle: 'Azerbaijan Visa from Pakistan | Baku e-Visa Assistance',
    metaDescription:
      'Azerbaijan visa assistance from Pakistan — ASAN e-Visa applications, documentation and Baku tour packages. Fast electronic processing for Pakistani travellers.',
    lead: 'Baku has become one of the most booked short-haul holidays from Pakistan, helped by an electronic visa system that is genuinely quick.',
    intro: [
      'Azerbaijan operates the ASAN Visa electronic system, through which eligible travellers apply online and receive an electronic visa without attending an appointment. For Pakistani travellers this has made Baku one of the most accessible international destinations outside the Gulf.',
      'The application itself is short, but it is unforgiving about accuracy: passport details, name spelling and travel dates must match your documents exactly, and an electronic visa issued against a mistyped passport number is not valid for travel.',
      'Most of our Azerbaijan clients travel on a package, with the visa handled alongside the flights and hotels. Baku combines well with Turkey on a two-country itinerary, and the mountain regions of Gabala, Guba and Sheki are within comfortable driving distance for a longer trip.',
    ],
    types: ['e-Visa (tourist)', 'Standard tourist visa', 'Business visa', 'Transit'],
    extraDocs: [
      'Passport valid for at least six months with a clear bio page scan',
      'Confirmed return flight booking',
      'Hotel confirmation for the full stay',
      'Bank statement where requested',
      'Travel insurance',
    ],
    faqs: [
      { q: 'How quickly is the Azerbaijan e-Visa issued?', a: '<p>Standard electronic processing is typically a small number of working days, with an urgent option available at a higher fee. Because it is electronic, accuracy at submission matters more than speed — an error means reapplying.</p>' },
      { q: 'Is the e-Visa valid for multiple entries?', a: '<p>The standard electronic tourist visa is generally issued as a single-entry visa for a limited stay. If your itinerary involves leaving and re-entering Azerbaijan, tell us at the outset so the right visa type is applied for.</p>' },
      { q: 'Do you offer Baku tour packages?', a: '<p>Yes — see our <a href="/destinations/azerbaijan/">Azerbaijan tour packages</a>, which include flights, hotels, transfers, city tours and the visa arrangement.</p>' },
    ],
  },
  {
    slug: 'saudi-arabia-visa', name: 'Saudi Arabia', short: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East',
    order: 108,
    vac: 'Nusuk / Saudi e-Visa platform',
    metaTitle: 'Saudi Arabia Visa from Pakistan | Umrah, Tourist & Business Visas',
    metaDescription:
      'Saudi Arabia visa assistance from Pakistan — Umrah visas via Nusuk, tourist e-visas, business visit visas, documentation and vaccination requirements explained.',
    lead: 'Saudi Arabia now issues several distinct visa types to Pakistani travellers, and choosing the right one matters.',
    intro: [
      'Saudi Arabia has substantially reformed its visa framework. Alongside the Umrah visa administered through the Ministry of Hajj and Umrah\'s Nusuk platform, the Kingdom now issues tourist visas covering leisure travel and a range of business visit categories.',
      'For pilgrims, the Umrah visa remains tied to confirmed accommodation and travel arrangements registered on the official platform, which is why it is arranged as part of a package rather than independently. Our <a href="/umrah-packages/umrah-visa/">Umrah visa page</a> sets out the documentation and current vaccination requirements in detail.',
      'For everyone else, the tourist visa has opened up destinations that were effectively closed to leisure travellers a few years ago — AlUla, the Red Sea coast, Riyadh and Jeddah\'s historic district. Business visit visas are arranged against an invitation from a Saudi entity.',
    ],
    types: ['Umrah visa (via Nusuk)', 'Tourist e-Visa', 'Business visit visa', 'Family visit visa', 'Transit'],
    extraDocs: [
      'Machine-readable passport with sufficient validity',
      'Photograph to the required specification',
      'Confirmed accommodation and flights',
      'NADRA-integrated digital vaccination records for pilgrims',
      'Invitation from a Saudi entity for business categories',
      'Medical insurance where required by the category',
    ],
    faqs: [
      { q: 'Can I perform Umrah on a Saudi tourist visa?', a: '<p>Saudi Arabia has permitted holders of certain visa categories to perform Umrah, subject to conditions and to booking the necessary permits through the official platform. The rules have changed more than once. Because getting this wrong affects your ability to travel, confirm the current position with our team rather than relying on older guidance.</p>' },
      { q: 'What vaccinations does Saudi Arabia require?', a: '<p>Meningococcal ACYW vaccination is required for pilgrims, and polio vaccination documentation is required of Pakistani passport holders. Pakistan requires NADRA-integrated digital vaccination proof for outbound Hajj and Umrah travellers. See our <a href="/travel-guides/nadra-vaccination-certificate-umrah-hajj/">vaccination certificate guide</a>.</p>' },
      { q: 'How long does the Umrah visa take?', a: '<p>Typically a few working days with a complete file, and longer during Ramadan and peak seasons. Build a margin into your planning.</p>' },
    ],
  },

  /* ============================================ Schengen member countries */
  {
    slug: 'germany-visa', name: 'Germany', flag: '🇩🇪', region: 'Europe', schengen: true, popular: true, order: 20,
    vac: 'VFS Global / TLScontact',
    lead: 'Germany is one of the most frequently applied-for Schengen destinations from Pakistan, covering business, study and family visits.',
    intro: [
      'Germany\'s missions in Pakistan handle a substantial volume of Schengen short-stay applications alongside national visas for study and employment. Short-stay applications follow the common Schengen rules, but German missions are known for applying the documentary requirements precisely — incomplete files are returned rather than assessed generously.',
      'Germany is also a common main destination for business travel, given the country\'s trade fair calendar. Applications tied to a specific exhibition are considerably stronger when the registration confirmation and the commercial relationship are both documented.',
    ],
    highlights: ['Berlin, Munich, Frankfurt and Hamburg', 'Trade fairs and business travel', 'Family visits to the Pakistani diaspora', 'Study and research visits'],
  },
  {
    slug: 'france-visa', name: 'France', flag: '🇫🇷', region: 'Europe', schengen: true, popular: true, order: 3,
    vac: 'VFS Global / TLScontact',
    lead: 'France is a leading tourist main-destination for Schengen applications and a frequent first point of entry for European itineraries.',
    intro: [
      'French short-stay applications are processed through the outsourced application centres in Pakistan under the common Schengen framework. France is often the main destination for a first European holiday, and equally often the first point of entry on a multi-country itinerary — which, under the Schengen rules, can make it the correct mission to apply to.',
      'Tourist files for France should show a coherent itinerary. Applications listing Paris for a week alongside hotel bookings in three other countries invite questions about which mission should have received the application.',
    ],
    highlights: ['Paris, Nice and the French Riviera', 'Business and conference travel', 'Multi-country European itineraries', 'Family visits'],
  },
  {
    slug: 'italy-visa', name: 'Italy', flag: '🇮🇹', region: 'Europe', schengen: true, popular: true, order: 1,
    vac: 'VFS Global',
    lead: 'Italy combines a heavy tourist application volume with significant business and seasonal work routes.',
    intro: [
      'Italian short-stay visa applications from Pakistan are handled through the appointed application centres. Italy sits on most first-time European itineraries — Rome, Venice, Milan and Florence — and tourist applications are assessed on the usual Schengen criteria of itinerary coherence, funding and insurance.',
      'Italy also operates national routes for work under its annual quota decree, which are distinct from short-stay visas and follow an entirely different process initiated by the employer in Italy. We assist with documentation for these but do not offer employment or sponsorship.',
    ],
    highlights: ['Rome, Venice, Milan and Florence', 'Business and trade travel', 'Family visits', 'Distinct national work routes'],
  },
  {
    slug: 'spain-visa', name: 'Spain', flag: '🇪🇸', region: 'Europe', schengen: true, popular: true, order: 2,
    vac: 'BLS International / VFS Global',
    lead: 'Spain is a popular main destination for leisure travel and a common choice on longer European itineraries.',
    intro: [
      'Spanish short-stay applications follow the common Schengen framework and are submitted through the appointed application centre in Pakistan. Spain works well as a main destination where the bulk of the stay is in Madrid, Barcelona or Andalusia.',
      'As with all Schengen applications, the file must show accommodation for every night, a return booking, compliant insurance and funds proportionate to the stay described.',
    ],
    highlights: ['Madrid, Barcelona and Andalusia', 'Leisure and family travel', 'Business and trade', 'Longer European itineraries'],
  },
  {
    slug: 'netherlands-visa', name: 'Netherlands', flag: '🇳🇱', region: 'Europe', schengen: true, popular: true, order: 21,
    vac: 'VFS Global',
    lead: 'The Netherlands sees strong business, study and family-visit demand from Pakistani applicants.',
    intro: [
      'Dutch short-stay applications are handled through the appointed application centre under the common Schengen rules. The Netherlands is a frequent business destination given Rotterdam\'s trade role, and a common study destination at masters level.',
      'Where a Dutch host is inviting you, the Netherlands operates a formal sponsorship and guarantee document that the host completes and has verified locally. Using it correctly strengthens a visit application considerably.',
    ],
    highlights: ['Amsterdam, Rotterdam and The Hague', 'Business and logistics travel', 'Formal host guarantee route', 'Study visits'],
  },
  {
    slug: 'greece-visa', name: 'Greece', flag: '🇬🇷', region: 'Europe', schengen: true, popular: true, order: 10,
    vac: 'VFS Global',
    lead: 'Greece is primarily a leisure main-destination, concentrated in the summer season.',
    intro: [
      'Greek short-stay applications are submitted through the appointed centre under common Schengen rules. Demand is strongly seasonal, peaking for summer travel to the islands, which makes appointment availability tighter between spring and late summer.',
      'Island itineraries need particular care in the documentation: ferry or internal flight bookings should be included alongside hotel confirmations so that the movement described in the itinerary is evidenced.',
    ],
    highlights: ['Athens and the Greek islands', 'Strongly seasonal demand', 'Island-hopping itineraries', 'Honeymoon travel'],
  },
  {
    slug: 'portugal-visa', name: 'Portugal', flag: '🇵🇹', region: 'Europe', schengen: true, popular: true, order: 4,
    vac: 'VFS Global',
    lead: 'Portugal covers tourist travel, family visits and distinct national residence routes.',
    intro: [
      'Portuguese short-stay applications follow the standard Schengen process through the appointed centre. Lisbon and Porto have grown as leisure destinations, and Portugal is also a main destination for travellers combining it with Spain.',
      'Portugal operates national long-stay and residence routes that are entirely separate from the short-stay visa and follow their own criteria. We assist with documentation preparation for these where applicable.',
    ],
    highlights: ['Lisbon, Porto and the Algarve', 'Combined Spain–Portugal itineraries', 'Family visits', 'Separate national residence routes'],
  },
  {
    slug: 'austria-visa', name: 'Austria', flag: '🇦🇹', region: 'Europe', schengen: true, popular: true, order: 12,
    vac: 'VFS Global',
    lead: 'Austria draws tourist, conference and family-visit applications, with Vienna as the usual focus.',
    intro: [
      'Austrian short-stay applications are processed under the common Schengen framework through the appointed centre in Pakistan. Vienna is a frequent conference and institutional destination given the international organisations based there, alongside steady leisure demand.',
      'Where travel is for a conference or an event hosted by an international organisation, the invitation and registration documents materially strengthen the application.',
    ],
    highlights: ['Vienna, Salzburg and the Alps', 'International conference travel', 'Winter and summer leisure', 'Family visits'],
  },
  {
    slug: 'switzerland-visa', name: 'Switzerland', flag: '🇨🇭', region: 'Europe', schengen: true, popular: true, order: 14,
    vac: 'TLScontact / VFS Global',
    lead: 'Switzerland is a high-cost destination, and applications are assessed with the cost of the trip firmly in view.',
    intro: [
      'Swiss short-stay applications follow the Schengen framework. Because Switzerland is among the most expensive destinations in the area, the financial evidence needs to be proportionate — a budget that would comfortably support a week in Turkey will not read as credible for the same period in Zurich or Interlaken.',
      'Applications are stronger where the itinerary is specific about routing and internal travel, since Swiss itineraries typically involve several towns and pre-booked rail travel.',
    ],
    highlights: ['Zurich, Geneva, Interlaken and Lucerne', 'Higher cost-of-trip expectations', 'Rail-based itineraries', 'Business and banking travel'],
  },
  {
    slug: 'sweden-visa', name: 'Sweden', flag: '🇸🇪', region: 'Europe', schengen: true, popular: true, order: 15,
    vac: 'VFS Global',
    lead: 'Sweden sees family-visit and study demand alongside leisure travel.',
    intro: [
      'Swedish short-stay applications are handled through the appointed centre under common Schengen rules. A significant proportion of applications from Pakistan are family visits to relatives settled in Sweden, where the host\'s documentation carries substantial weight.',
      'Sweden also operates national study and work routes separate from the short-stay visa, each with their own requirements and processing.',
    ],
    highlights: ['Stockholm, Gothenburg and Malmö', 'Family visits to the diaspora', 'Study routes', 'Summer leisure travel'],
  },
  {
    slug: 'norway-visa', name: 'Norway', flag: '🇳🇴', region: 'Europe', schengen: true, popular: true, order: 11,
    vac: 'VFS Global',
    lead: 'Norway attracts scenic leisure travel and family visits, with cost expectations similar to Switzerland.',
    intro: [
      'Norwegian short-stay applications follow the Schengen framework through the appointed centre. Norway is an increasingly requested destination for fjord and northern-lights travel, which tends to involve multi-city itineraries and internal flights.',
      'As a high-cost destination, financial evidence should be proportionate to the itinerary described, and the itinerary itself should be evidenced with the internal bookings rather than described in general terms.',
    ],
    highlights: ['Oslo, Bergen and the fjords', 'Northern lights travel', 'High cost-of-trip expectations', 'Family visits'],
  },
  {
    slug: 'finland-visa', name: 'Finland', flag: '🇫🇮', region: 'Europe', schengen: true, popular: true, order: 18,
    vac: 'VFS Global',
    lead: 'Finland covers winter leisure travel, business and family visits.',
    intro: [
      'Finnish short-stay applications are processed under the common Schengen rules through the appointed centre. Winter travel to Lapland is a distinct seasonal driver, alongside business travel connected to the technology sector.',
      'Winter itineraries should evidence the internal travel and any booked activities, as these materially affect the cost of the trip being assessed.',
    ],
    highlights: ['Helsinki and Lapland', 'Winter and northern lights travel', 'Technology sector business travel', 'Family visits'],
  },
  {
    slug: 'poland-visa', name: 'Poland', flag: '🇵🇱', region: 'Europe', schengen: true, popular: true, order: 13,
    vac: 'VFS Global',
    lead: 'Poland sees business, study and visit applications, with growing tourist interest.',
    intro: [
      'Polish short-stay applications follow the Schengen framework through the appointed centre in Pakistan. Poland has become a more frequent destination for business travel and for study, with tourist interest in Warsaw and Kraków growing alongside.',
      'Poland also operates national work routes that are separate from the short-stay visa and are initiated by the employer in Poland. These are not short-stay applications and should not be confused with them.',
    ],
    highlights: ['Warsaw and Kraków', 'Business and manufacturing travel', 'Study routes', 'Separate national work routes'],
  },
  {
    slug: 'hungary-visa', name: 'Hungary', flag: '🇭🇺', region: 'Europe', schengen: true, popular: true, order: 6,
    vac: 'VFS Global',
    lead: 'Hungary is a common main destination for central European itineraries and study travel.',
    intro: [
      'Hungarian short-stay applications are handled under the Schengen framework through the appointed centre. Budapest is a frequent anchor for central European itineraries combining Austria, Czechia and Slovakia.',
      'Hungary also hosts a number of Pakistani students on scholarship programmes, and study-related travel follows national routes distinct from the short-stay visa.',
    ],
    highlights: ['Budapest and the Danube', 'Central European itineraries', 'Scholarship and study travel', 'Business visits'],
  },
  {
    slug: 'bulgaria-visa', name: 'Bulgaria', flag: '🇧🇬', region: 'Europe', schengen: true, popular: true, order: 16,
    vac: 'VFS Global',
    lead: 'Bulgaria covers leisure, business and seasonal travel at more accessible costs than western Europe.',
    intro: [
      'Bulgarian short-stay applications are submitted through the appointed centre. Bulgaria offers Black Sea coastal travel and winter skiing at costs below much of western Europe, which makes it an accessible option for first-time European travellers.',
      'Bulgaria\'s position within the Schengen framework has evolved in recent years; we confirm the current arrangement and the correct application route at the time of your enquiry.',
    ],
    highlights: ['Sofia and the Black Sea coast', 'Winter skiing', 'More accessible trip costs', 'Business travel'],
  },
  {
    slug: 'slovakia-visa', name: 'Slovakia', flag: '🇸🇰', region: 'Europe', schengen: true, popular: true, order: 17,
    vac: 'VFS Global',
    lead: 'Slovakia is usually travelled as part of a wider central European itinerary.',
    intro: [
      'Slovak short-stay applications follow the common Schengen process through the appointed centre. Slovakia is most often visited alongside Austria, Hungary and Czechia, with Bratislava within easy reach of Vienna.',
      'Where Slovakia is one leg of a multi-country trip rather than the main destination, the application should be made to the correct main-destination mission — a point that catches applicants out regularly.',
    ],
    highlights: ['Bratislava and the High Tatras', 'Central European itineraries', 'Business travel', 'Study visits'],
  },
  {
    slug: 'denmark-visa', name: 'Denmark', flag: '🇩🇰', region: 'Europe', schengen: true, order: 136,
    vac: 'VFS Global',
    lead: 'Denmark draws family-visit, business and study applications.',
    intro: [
      'Danish short-stay applications are processed through the appointed centre under Schengen rules. Copenhagen is the main destination for both business and leisure, and Denmark has a settled Pakistani community generating steady family-visit demand.',
      'Family visit applications are strengthened where the host completes the required invitation documentation and evidences their status, accommodation and income.',
    ],
    highlights: ['Copenhagen and Aarhus', 'Family visits to the diaspora', 'Business travel', 'Study visits'],
  },
  {
    slug: 'czech-republic-visa', name: 'Czech Republic', flag: '🇨🇿', region: 'Europe', schengen: true, order: 137,
    vac: 'VFS Global',
    lead: 'Czechia is a popular leisure destination and a common leg of central European trips.',
    intro: [
      'Czech short-stay applications follow the Schengen framework through the appointed centre. Prague is among the most visited cities in central Europe and is frequently combined with Vienna, Budapest and Bratislava on a single itinerary.',
      'Appointment availability at the Czech mission can be tight in peak season, so early booking is worthwhile where your travel dates are fixed.',
    ],
    highlights: ['Prague and Český Krumlov', 'Central European itineraries', 'Leisure and honeymoon travel', 'Business visits'],
  },
  {
    slug: 'belgium-visa', name: 'Belgium', flag: '🇧🇪', region: 'Europe', schengen: true, order: 138,
    vac: 'VFS Global',
    lead: 'Belgium sees institutional, business and family-visit travel, with Brussels as the focus.',
    intro: [
      'Belgian short-stay applications are processed through the appointed centre under the common Schengen rules. Brussels generates consistent institutional and conference travel given the EU and NATO presence, alongside business travel to Antwerp.',
      'Applications tied to an institutional meeting or conference should include the formal invitation, which carries real weight in this category.',
    ],
    highlights: ['Brussels, Bruges and Antwerp', 'Institutional and conference travel', 'Business and trade', 'Family visits'],
  },

  /* ============================================== Other major destinations */
  {
    slug: 'ireland-visa', name: 'Ireland', flag: '🇮🇪', region: 'Europe', popular: true, order: 19,
    vac: 'VFS Global',
    lead: 'Ireland is not part of the Schengen area and requires its own visa.',
    intro: [
      'Ireland operates its own visa system separate from Schengen. A Schengen visa does not admit you to Ireland, and an Irish visa does not admit you to the Schengen area — a distinction that catches out travellers planning a combined European trip.',
      'Applications are made online and submitted through the appointed centre. Ireland is a significant study destination and has a growing Pakistani community, so student and family-visit applications form a large part of the volume.',
    ],
    highlights: ['Dublin, Cork and Galway', 'Separate from the Schengen area', 'Significant study destination', 'Family visits'],
  },
  {
    slug: 'malaysia-visa', name: 'Malaysia', flag: '🇲🇾', region: 'Southeast Asia', order: 141,
    vac: 'Malaysia eVISA / Consulate',
    lead: 'Malaysia is one of the most accessible Asian destinations for Pakistani travellers, with an electronic visa system.',
    intro: [
      'Malaysia operates an electronic visa facility alongside consular applications, and remains a favourite first long-haul destination from Pakistan — helped by direct flights, a familiar food culture, halal availability throughout and costs well below Europe.',
      'Kuala Lumpur, Langkawi and Penang form the standard itinerary, and Malaysia combines well with Thailand or Singapore on a two-country trip. Travellers should note that entry to Singapore or Thailand requires separate visa arrangements.',
    ],
    highlights: ['Kuala Lumpur, Langkawi and Penang', 'Electronic visa facility', 'Halal-friendly and family-suited', 'Combines with Thailand and Singapore'],
  },
  {
    slug: 'thailand-visa', name: 'Thailand', flag: '🇹🇭', region: 'Southeast Asia', order: 142,
    vac: 'Thailand e-Visa / Royal Thai Embassy',
    lead: 'Thailand issues tourist visas to Pakistani travellers through an electronic system.',
    intro: [
      'Thailand has moved its visa issuance to an electronic platform, through which Pakistani applicants apply for tourist visas online. The documentation is moderate — confirmed flights and hotels, financial evidence and a clear itinerary — and processing is generally efficient when the file is complete.',
      'Bangkok, Phuket and Krabi make up the standard itinerary. Thailand\'s visa rules for various nationalities have been adjusted repeatedly in recent years, so we confirm the current requirement for Pakistani passport holders at the time of enquiry rather than relying on last season\'s position.',
    ],
    highlights: ['Bangkok, Phuket and Krabi', 'Electronic visa platform', 'Honeymoon and family travel', 'Frequently updated rules'],
  },
  {
    slug: 'singapore-visa', name: 'Singapore', flag: '🇸🇬', region: 'Southeast Asia', order: 143,
    vac: 'Authorised visa agent submission',
    lead: 'Singapore requires applications to be submitted through an authorised local agent or sponsor.',
    intro: [
      'Singapore does not accept direct applications from individual Pakistani applicants in the usual course — submissions are made through an authorised visa agent, a Singapore-based sponsor or an approved travel agency. This is a procedural requirement rather than an optional convenience.',
      'The documentation is modest but the assessment is strict on funding and intent. Singapore is most often visited as part of a combined itinerary with Malaysia, which is a short flight or bus ride away.',
    ],
    highlights: ['Marina Bay, Sentosa and Gardens by the Bay', 'Agent or sponsor submission required', 'Combines with Malaysia', 'Business and MICE travel'],
  },
  {
    slug: 'china-visa', name: 'China', flag: '🇨🇳', region: 'East Asia', order: 144,
    vac: 'Chinese Visa Application Service Centre',
    lead: 'China is a major business destination for Pakistani travellers, with applications through the dedicated visa centre.',
    intro: [
      'Chinese visa applications from Pakistan are submitted through the Chinese Visa Application Service Centre. Business travel dominates the volume — trade, manufacturing sourcing, and the Canton Fair in particular — alongside study and tourist applications.',
      'Business applications rest on the invitation from the Chinese entity. Where you are travelling for a trade fair, the registration confirmation and evidence of the existing commercial relationship strengthen the file considerably.',
    ],
    highlights: ['Beijing, Shanghai and Guangzhou', 'Canton Fair and trade travel', 'Manufacturing and sourcing visits', 'Study routes'],
  },
  {
    slug: 'japan-visa', name: 'Japan', flag: '🇯🇵', region: 'East Asia', popular: true, order: 5,
    vac: 'Embassy of Japan / designated agencies',
    lead: 'Japan requires applications through designated travel agencies for most tourist categories.',
    intro: [
      'Japanese tourist visa applications from Pakistan are generally routed through designated agencies rather than submitted directly, with the agency taking responsibility for the itinerary and the applicant\'s documentation. The requirements are detailed: a day-by-day schedule, confirmed accommodation for every night, and financial evidence proportionate to the trip.',
      'Japan is an increasingly requested destination for cherry blossom and autumn travel, both of which are short seasons with heavy demand — applications for those windows should start well in advance.',
    ],
    highlights: ['Tokyo, Kyoto and Osaka', 'Designated agency submission', 'Cherry blossom and autumn seasons', 'Detailed itinerary requirements'],
  },
  {
    slug: 'australia-visa', name: 'Australia', flag: '🇦🇺', region: 'Oceania', order: 146,
    vac: 'VFS Global / online lodgement',
    lead: 'Australia assesses visitor applications online, with an emphasis on genuine temporary entry.',
    intro: [
      'Australian visitor visa applications are lodged online, with biometrics given at the appointed centre. The central test is whether you are a genuine temporary entrant — that is, whether you intend to stay temporarily and leave at the end of your visit.',
      'Applications are strengthened by clear evidence of ties to Pakistan, a coherent purpose, and where family in Australia are involved, their status and any support they are providing. Health examinations may be required depending on your circumstances and intended length of stay.',
    ],
    highlights: ['Sydney, Melbourne and Brisbane', 'Online lodgement', 'Genuine temporary entrant test', 'Family visits and study'],
  },
  {
    slug: 'new-zealand-visa', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania', order: 147,
    vac: 'VFS Global / online lodgement',
    lead: 'New Zealand assesses visitor applications online, often alongside an Australian itinerary.',
    intro: [
      'New Zealand visitor visa applications are lodged online. The assessment covers bona fides, funds and health, and applicants are commonly travelling on a combined itinerary with Australia — which requires separate visas for each country.',
      'Because travel from Pakistan to New Zealand is long and expensive, the financial evidence needs to support the full cost of the trip described, including internal travel.',
    ],
    highlights: ['Auckland, Queenstown and the South Island', 'Online lodgement', 'Often combined with Australia', 'Separate visa from Australia'],
  },
  {
    slug: 'qatar-visa', name: 'Qatar', flag: '🇶🇦', region: 'Middle East', order: 148,
    vac: 'Hayya platform / online',
    lead: 'Qatar issues tourist and visit visas electronically, including through its Hayya platform.',
    intro: [
      'Qatar has simplified entry considerably, with electronic visa issuance and, for certain travellers, visa facilities linked to confirmed hotel bookings or the Hayya platform. Doha is a frequent stopover destination given the volume of connecting traffic through Hamad International Airport.',
      'Travellers connecting through Doha should check whether their itinerary qualifies for a transit facility, which can allow a stopover without a full tourist visa.',
    ],
    highlights: ['Doha and the Corniche', 'Electronic issuance', 'Stopover and transit options', 'Business and MICE travel'],
  },
  {
    slug: 'oman-visa', name: 'Oman', flag: '🇴🇲', region: 'Middle East', order: 149,
    vac: 'Royal Oman Police e-Visa portal',
    lead: 'Oman issues electronic tourist visas through its official portal.',
    intro: [
      'Omani tourist visas are applied for electronically through the Royal Oman Police portal. Requirements are moderate — passport, photograph, confirmed accommodation and return travel — and processing is generally efficient.',
      'Oman is a comfortable short-haul destination from Pakistan, with Muscat, Salalah and the mountain regions offering a quieter alternative to the Gulf\'s busier cities.',
    ],
    highlights: ['Muscat, Salalah and Nizwa', 'Electronic portal application', 'Quieter Gulf alternative', 'Short flying time from Pakistan'],
  },
  {
    slug: 'bahrain-visa', name: 'Bahrain', flag: '🇧🇭', region: 'Middle East', order: 150,
    vac: 'Bahrain eVisa portal',
    lead: 'Bahrain operates an electronic visa system with straightforward requirements.',
    intro: [
      'Bahrain issues electronic visas through its official portal, with documentation requirements that are light relative to most destinations. Manama is a short flight from Pakistan and is frequently visited for both leisure and business.',
      'As with all electronic systems, accuracy matters: passport details entered incorrectly produce a visa that is not valid for travel.',
    ],
    highlights: ['Manama and Muharraq', 'Electronic visa portal', 'Short flying time', 'Business and leisure travel'],
  },
  {
    slug: 'georgia-visa', name: 'Georgia', flag: '🇬🇪', region: 'Caucasus', order: 151,
    vac: 'Georgian e-Visa portal / Embassy',
    lead: 'Georgia is an accessible Caucasus destination with an electronic visa facility.',
    intro: [
      'Georgia operates an electronic visa portal alongside consular applications. Tbilisi, Batumi and the mountain regions have grown steadily as a destination for Pakistani travellers looking for European-style scenery at accessible cost.',
      'Georgia combines naturally with Azerbaijan on a two-country Caucasus itinerary, with the overland route between Tbilisi and Baku commonly used.',
    ],
    highlights: ['Tbilisi, Batumi and Kazbegi', 'Electronic visa facility', 'Combines with Azerbaijan', 'Accessible trip costs'],
  },
  {
    slug: 'uzbekistan-visa', name: 'Uzbekistan', flag: '🇺🇿', region: 'Central Asia', order: 152,
    vac: 'Uzbekistan e-Visa portal',
    lead: 'Uzbekistan issues electronic visas and is a growing destination for heritage travel.',
    intro: [
      'Uzbekistan operates a straightforward electronic visa system. Samarkand, Bukhara and Khiva draw considerable interest from Pakistani travellers for their Islamic heritage — the shrines, madrasas and the sites associated with Imam Bukhari in particular.',
      'Ziyarat-focused itineraries in Uzbekistan are increasingly requested and combine well with a Tashkent city stay. We arrange these as guided packages.',
    ],
    highlights: ['Samarkand, Bukhara and Khiva', 'Islamic heritage and ziyarat travel', 'Electronic visa system', 'Imam Bukhari shrine'],
  },
  {
    slug: 'indonesia-visa', name: 'Indonesia', flag: '🇮🇩', region: 'Southeast Asia', order: 153,
    vac: 'Indonesia e-Visa / visa on arrival',
    lead: 'Indonesia offers electronic visa and visa-on-arrival facilities for eligible travellers.',
    intro: [
      'Indonesia operates electronic visa issuance and, for eligible nationalities and purposes, a visa-on-arrival facility. Eligibility conditions change, so the applicable route for Pakistani passport holders should be confirmed before booking rather than assumed.',
      'Bali dominates leisure demand, with Jakarta covering business travel. As the world\'s largest Muslim-majority country, Indonesia is comfortable for families in terms of halal food and prayer facilities.',
    ],
    highlights: ['Bali, Jakarta and Yogyakarta', 'Electronic and on-arrival options', 'Halal-friendly destination', 'Honeymoon travel'],
  },
  {
    slug: 'sri-lanka-visa', name: 'Sri Lanka', flag: '🇱🇰', region: 'South Asia', order: 154,
    vac: 'Sri Lanka ETA portal',
    lead: 'Sri Lanka issues an Electronic Travel Authorisation with minimal documentation.',
    intro: [
      'Sri Lanka operates an Electronic Travel Authorisation system that is among the simplest applications available to Pakistani travellers. Processing is quick and the documentary requirements are light.',
      'The short flying time, low cost and variety within a small island — beaches, hill country, wildlife and heritage sites — make Sri Lanka a practical option for a first international family holiday.',
    ],
    highlights: ['Colombo, Kandy and Galle', 'Electronic travel authorisation', 'Short flying time and low cost', 'Family-friendly variety'],
  },
  {
    slug: 'maldives-visa', name: 'Maldives', flag: '🇲🇻', region: 'South Asia', order: 155,
    vac: 'Visa on arrival',
    lead: 'The Maldives grants visa on arrival to Pakistani passport holders meeting the entry conditions.',
    intro: [
      'The Maldives issues a free visa on arrival to travellers who meet the entry conditions — a passport with sufficient validity, confirmed accommodation, onward travel and sufficient funds. There is no application to make in advance.',
      'Confirmed resort or guesthouse booking is the operative requirement, and it is checked. The Maldives is our most requested honeymoon destination, and resort selection — atoll, transfer type and board basis — matters more here than in almost any other destination.',
    ],
    highlights: ['Visa on arrival for Pakistani passports', 'Honeymoon and anniversary travel', 'Resort and transfer selection', 'Confirmed accommodation required'],
  },
  {
    slug: 'egypt-visa', name: 'Egypt', flag: '🇪🇬', region: 'Africa', order: 156,
    vac: 'Egyptian Consulate / e-Visa',
    lead: 'Egypt issues tourist visas through consular and electronic routes.',
    intro: [
      'Egyptian tourist visas are available through the consulate and, for eligible travellers, an electronic system. Cairo, Luxor, Aswan and the Red Sea resorts form the standard itinerary, with strong interest from Pakistani travellers in the Islamic and ancient heritage sites.',
      'Group and guided itineraries are the norm in Egypt, and travelling on an arranged package simplifies both the visa file and the ground logistics considerably.',
    ],
    highlights: ['Cairo, Luxor and Aswan', 'Islamic and ancient heritage', 'Red Sea resorts', 'Guided group itineraries'],
  },
  {
    slug: 'morocco-visa', name: 'Morocco', flag: '🇲🇦', region: 'Africa', order: 157,
    vac: 'Moroccan Consulate / e-Visa',
    lead: 'Morocco issues tourist visas through consular and electronic channels.',
    intro: [
      'Morocco operates consular and electronic visa routes for Pakistani travellers. Marrakech, Fez, Casablanca and Chefchaouen are the usual circuit, with the Sahara excursions a common addition.',
      'Morocco is comfortable for Muslim travellers in terms of food and prayer facilities, and is often combined with a Spain or Turkey itinerary — each of which requires its own visa.',
    ],
    highlights: ['Marrakech, Fez and Chefchaouen', 'Sahara and Atlas excursions', 'Halal-friendly destination', 'Combines with Spain or Turkey'],
  },
  {
    slug: 'south-korea-visa', name: 'South Korea', flag: '🇰🇷', region: 'East Asia', order: 158,
    vac: 'Korean Embassy / VFS',
    lead: 'South Korea assesses tourist applications with attention to funding and travel history.',
    intro: [
      'Korean visa applications from Pakistan are submitted through the mission or its appointed centre. The assessment gives weight to previous travel history and to financial standing, and applicants with a record of compliant travel to other developed countries are in a stronger position.',
      'Seoul, Busan and Jeju form the usual itinerary, with the spring blossom and autumn foliage seasons attracting the heaviest demand.',
    ],
    highlights: ['Seoul, Busan and Jeju', 'Travel history carries weight', 'Spring and autumn seasons', 'Business and technology travel'],
  },
  {
    slug: 'vietnam-visa', name: 'Vietnam', flag: '🇻🇳', region: 'Southeast Asia', order: 159,
    vac: 'Vietnam e-Visa portal',
    lead: 'Vietnam operates an electronic visa system open to Pakistani travellers.',
    intro: [
      'Vietnam issues electronic visas through its official portal, with a straightforward application and efficient processing. The e-Visa is generally issued for a defined single-entry stay, with longer or multiple-entry arrangements handled separately.',
      'Hanoi, Ha Long Bay, Da Nang and Ho Chi Minh City make up the standard circuit, and Vietnam is one of the better-value long-haul destinations for Pakistani travellers.',
    ],
    highlights: ['Hanoi, Ha Long Bay and Da Nang', 'Electronic visa portal', 'Strong value for money', 'Combines with Thailand'],
  },
];

/* Ordering helpers used by the hub page and the mega-menu. */
const popularCountries = countries.filter((c) => c.popular).sort((a, b) => a.order - b.order);
const schengenCountries = countries.filter((c) => c.schengen).sort((a, b) => a.order - b.order);
const otherCountries = countries
  .filter((c) => !c.popular && !c.schengen)
  .sort((a, b) => a.order - b.order);

/* Exported in priority order, not declaration order. `order` already carried
   the client's list (Italy first) but the raw array did not use it, so the
   visa-appointment country dropdown was still leading with the old UK/USA/
   Canada run. Everything that iterates countries now gets the client's
   order, with the rest following. */
const byPriority = [...countries].sort((a, b) => a.order - b.order);

module.exports = {
  countries: byPriority,
  popularCountries,
  schengenCountries,
  otherCountries,
  SCHENGEN_NOTE,
};
