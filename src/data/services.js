/* ==========================================================================
   Service catalogue.
   Each entry generates a full landing page plus its card on the services hub
   and homepage. `hub: true` means the page lives elsewhere (Umrah, Visa,
   Hotels and Tours have their own multi-page sections) and only the card is
   generated from here.
   ========================================================================== */

const services = [
  /* ---------------------------------------------------------------- Air */
  {
    slug: 'air-ticketing',
    heroImage: '/assets/img/guides/international-travel-checklist-from-pakistan.jpg',
    heroImageAlt: 'Departure board in an airport terminal',
    url: '/services/air-ticketing/',
    icon: 'plane',
    title: 'Air Ticketing',
    blurb: 'Domestic & international flights',
    h1: 'Air Ticketing Services in Islamabad',
    metaTitle: 'Air Ticketing Services in Islamabad | Domestic & International Flights',
    metaDescription:
      'Book domestic and international air tickets from Islamabad with Mazin Haramain Tours & Travels. Best-fare searches, group bookings, business class and last-minute assistance.',
    lead:
      'Fly with confidence. We issue domestic and international air tickets for individuals, families, groups and corporate travellers — with a real person checking the fare, the routing and the baggage rules before you pay.',
    intro: [
      'Online fare engines are good at showing you a number. They are less good at telling you that a two-stop itinerary leaves you with a seven-hour overnight transit, that your fare class has no date-change flexibility, or that the checked baggage allowance will not cover a family travelling for Umrah with Zamzam and gifts. That is the gap our ticketing desk fills.',
      'Our consultants work across the major carriers serving Pakistan — including Saudia, Pakistan International Airlines, Emirates, Qatar Airways, Etihad Airways, flydubai, Turkish Airlines, Oman Air, Gulf Air, AirSial and Air Blue — and compare the routings that actually make sense for your travel dates, budget and baggage needs.',
      'Whether you are flying Islamabad to Jeddah for Umrah, Lahore to London to visit family, or moving a project team to Dubai at short notice, you get a clear written quotation, the full fare conditions in plain language, and a ticket issued the same day once payment is confirmed.',
    ],
    features: [
      { icon: 'globe', title: 'International Flights', text: 'Middle East, Europe, UK, North America, Far East and Africa on full-service and low-cost carriers.' },
      { icon: 'plane', title: 'Domestic Flights', text: 'Islamabad, Lahore, Karachi, Peshawar, Quetta, Skardu, Gilgit and all major domestic sectors.' },
      { icon: 'compass', title: 'One Way, Return & Multi-City', text: 'Complex routings, open-jaw itineraries and stopover planning arranged properly.' },
      { icon: 'users', title: 'Group Bookings', text: 'Ten passengers or more on one PNR, with group fares and deposit-based seat holding.' },
      { icon: 'award', title: 'Business & First Class', text: 'Premium cabin fares, upgrade options and lounge guidance for corporate and leisure travellers.' },
      { icon: 'clock', title: 'Emergency & Last-Minute', text: 'Urgent travel, medical cases and compassionate travel handled on priority.' },
    ],
    includes: [
      'Fare comparison across multiple airlines and routings',
      'Clear explanation of baggage allowance and cabin rules',
      'Date change, refund and reissue conditions confirmed before ticketing',
      'Seat requests, meal preferences and special assistance',
      'E-ticket issued and sent by email and WhatsApp',
      'Schedule-change monitoring and rebooking support',
      'Infant and child fare handling for family travel',
      'Corporate billing and consolidated monthly invoicing',
    ],
    process: [
      { title: 'Share Your Route', text: 'Tell us your cities, dates, cabin and number of passengers by phone, WhatsApp or the quote form.' },
      { title: 'Receive Options', text: 'We send two to four routings with fares, timings, baggage and fare rules so you can compare like for like.' },
      { title: 'Confirm & Pay', text: 'Choose your option and settle payment. We confirm the amount in writing before anything is charged.' },
      { title: 'Get Your E-Ticket', text: 'Your ticket is issued and delivered by email and WhatsApp, with check-in guidance for your departure.' },
    ],
    faqs: [
      { q: 'Can you find cheaper tickets than booking online myself?', a: '<p>Often, yes — but the more consistent saving is in getting the <em>right</em> ticket. We compare published fares, consolidator fares and group allocations, and we flag the fare rules that online checkouts bury: change fees, refundability, baggage, and transit visa requirements. Where an online fare genuinely is the best option, we will tell you so.</p>' },
      { q: 'Do you issue tickets for group Umrah and family travel?', a: '<p>Yes. Group fares are available for parties of ten or more travelling together, usually with a deposit to hold seats and a balance due before ticketing. For families we handle infant and child fares, seat allocation requests and combined baggage planning. See our <a href="/umrah-packages/group-umrah-packages/">group Umrah packages</a>.</p>' },
      { q: 'What happens if the airline changes my flight schedule?', a: '<p>Tickets issued through us are monitored for schedule changes. If your flight time moves materially, we contact you and rebook you onto a suitable alternative under the airline\'s policy, at no service charge from our side.</p>' },
      { q: 'Can I change or refund my ticket later?', a: '<p>That depends entirely on the fare rules of the ticket you buy, which we confirm to you in writing <em>before</em> issuing. Cheaper promotional fares are usually non-refundable and carry change fees; flexible fares cost more but can be amended. We will explain the trade-off for your specific route.</p>' },
      { q: 'Do you handle corporate air travel accounts?', a: '<p>Yes. We offer corporate ticketing with a dedicated consultant, agreed service levels, consolidated invoicing and travel reporting. See our <a href="/corporate-travel/">corporate travel solutions</a>.</p>' },
    ],
    related: ['/umrah-packages/', '/hotels/', '/services/airport-transfers/', '/corporate-travel/'],
  },

  /* --------------------------------------------------------------- Hajj */
  {
    slug: 'hajj-services',
    heroImage: '/assets/img/hotels/makkah-hotels.jpg',
    heroImageAlt: 'Masjid al-Haram in Makkah at night',
    url: '/services/hajj-services/',
    icon: 'kaaba',
    title: 'Hajj Services',
    blurb: 'Pilgrimage travel assistance',
    h1: 'Hajj Services & Travel Assistance from Pakistan',
    metaTitle: 'Hajj Services from Pakistan | Hajj Travel Assistance — Mazin Haramain',
    metaDescription:
      'Hajj travel assistance from Pakistan: documentation guidance, flights, Makkah and Madinah accommodation, transport and pre-departure briefing from Islamabad.',
    lead:
      'Hajj is the journey of a lifetime, and it deserves preparation that leaves nothing to chance. Our team assists Pakistani pilgrims with documentation, travel arrangements and the practical detail of the days in Makkah, Mina, Arafat and Madinah.',
    intro: [
      'Hajj travel from Pakistan operates under a regulated framework. Pilgrims travel either under the Government Hajj Scheme administered by the Ministry of Religious Affairs, or through the Private Hajj Scheme operated by licensed Hajj Group Organisers whose quotas are allocated each year. Both routes have fixed application windows, balloting arrangements and documentation requirements that change from season to season.',
      'Our role is to guide you through that framework honestly. We explain which route fits your circumstances, what the current year\'s requirements look like, what documentation you need to prepare, and how the travel, accommodation and transport components fit together. Where a service must be delivered by a licensed Hajj Group Organiser, we say so plainly rather than implying otherwise.',
      'Alongside the scheme itself, we arrange the parts of the journey that surround it: air ticketing, Madinah and Makkah accommodation for extended stays, ziyarat arrangements, airport transfers, travel insurance and the pre-departure briefing that makes the difference between a stressful Hajj and a focused one.',
    ],
    features: [
      { icon: 'doc', title: 'Documentation Guidance', text: 'Passport validity, mahram documentation, vaccination records and the current season\'s requirements explained.' },
      { icon: 'plane', title: 'Flight Arrangements', text: 'Air ticketing to Jeddah and Madinah with baggage planning for pilgrimage travel.' },
      { icon: 'hotel', title: 'Accommodation Support', text: 'Makkah and Madinah hotel arrangements for pre- and post-Hajj stays.' },
      { icon: 'car', title: 'Ground Transport', text: 'Airport transfers and intercity transport between Jeddah, Makkah and Madinah.' },
      { icon: 'mosque', title: 'Ziyarat Arrangements', text: 'Guided visits to the historical sites of Makkah and Madinah.' },
      { icon: 'headset', title: 'Pre-Departure Briefing', text: 'A practical walkthrough of the rites, the timeline and what to pack.' },
    ],
    includes: [
      'Guidance on Government and Private Hajj Scheme routes',
      'Application timeline and document checklist for the current season',
      'Passport and vaccination requirement review',
      'Flight booking and baggage planning',
      'Makkah and Madinah accommodation arrangements',
      'Airport and intercity transfer coordination',
      'Ziyarat planning in both holy cities',
      'Travel insurance options for pilgrims',
    ],
    process: [
      { title: 'Initial Consultation', text: 'We discuss your circumstances, preferred scheme and budget, and explain the current season\'s framework.' },
      { title: 'Document Preparation', text: 'We give you a written checklist and review your documents before anything is submitted.' },
      { title: 'Travel Arrangements', text: 'Flights, accommodation, transport and insurance are arranged and confirmed in writing.' },
      { title: 'Pre-Departure Briefing', text: 'A practical session covering the rites, the schedule, health preparation and packing.' },
    ],
    faqs: [
      { q: 'Do you operate your own Hajj scheme?', a: '<p>Hajj quotas in Pakistan are allocated by the Ministry of Religious Affairs to the Government scheme and to licensed Hajj Group Organisers. We will tell you exactly what we can arrange directly and where a licensed organiser must be involved, and we will never imply a quota or approval we do not hold. Speak to our team for the current season\'s position.</p>' },
      { q: 'When do Hajj applications open in Pakistan?', a: '<p>The application window is announced annually by the Ministry of Religious Affairs, typically several months before the Hajj season, and is often followed by a balloting process for the Government scheme. Dates move each year, so contact us for the current announcement rather than relying on last season\'s timeline.</p>' },
      { q: 'What vaccinations are required for Hajj?', a: '<p>Saudi Arabia requires meningococcal ACYW vaccination for pilgrims, and Pakistani passport holders are additionally required to hold valid polio vaccination documentation. Pakistan has moved to NADRA-integrated digital vaccination records for outbound pilgrims. Requirements are updated regularly — we confirm the current position with you during the documentation review. See our <a href="/travel-guides/nadra-vaccination-certificate-umrah-hajj/">vaccination certificate guide</a>.</p>' },
      { q: 'Can women perform Hajj without a mahram?', a: '<p>Saudi regulations on mahram requirements for female pilgrims have changed in recent years and continue to be applied with conditions that vary by age and group arrangement. Because this materially affects eligibility, we confirm the current rule with you directly rather than publishing a position that may date.</p>' },
      { q: 'How far in advance should I start preparing?', a: '<p>Begin at least six to nine months ahead. Passport renewal, vaccination scheduling, savings planning and — for the Government scheme — the application and balloting window all need lead time. Pilgrims who start early get better accommodation and calmer preparation.</p>' },
    ],
    related: ['/umrah-packages/', '/services/ziyarat-tours/', '/hotels/makkah-hotels/', '/travel-guides/'],
  },

  /* ---------------------------------------------- Visa appointment (NEW) */
  {
    slug: 'visa-appointment-booking',
    heroImage: '/assets/img/visa-services.jpg',
    heroImageAlt: 'A passport, compass and travel planner on a world map',
    url: '/services/visa-appointment-booking/',
    icon: 'calendar',
    title: 'Visa Appointment Booking',
    blurb: 'VFS, TLScontact & embassy slots',
    h1: 'Visa Appointment Booking & Scheduling Assistance',
    metaTitle: 'Visa Appointment Booking Assistance Pakistan | VFS & TLScontact Slots',
    metaDescription:
      'Visa appointment booking assistance in Islamabad for VFS Global, TLScontact and embassy submissions. Slot monitoring, biometrics scheduling and document-day preparation.',
    lead:
      'Getting the appointment is often harder than filling the form. We help you secure and prepare for your visa submission appointment at the correct application centre — and make sure you walk in with a complete file.',
    intro: [
      'For most destinations, a Pakistani applicant does not submit directly to the embassy. Applications are routed through an outsourced visa application centre — VFS Global and TLScontact are the two most widely used in Pakistan, operating centres in Islamabad, Lahore and Karachi — where you attend in person to submit documents and give biometrics.',
      'Appointment availability at these centres fluctuates. In peak travel months, slots for popular destinations can be released in batches and taken quickly, and applicants who are not watching at the right moment end up waiting weeks longer than they needed to. Applicants also lose appointments by booking at the wrong centre, under the wrong visa category, or with a passport that does not have enough validity left.',
      'Our appointment desk handles the scheduling mechanics: identifying the correct centre and category for your application, creating and completing the online profile accurately, monitoring for released slots on your preferred dates, and preparing you for the submission day itself so that nothing is missing when you reach the counter.',
    ],
    features: [
      { icon: 'calendar', title: 'Slot Identification & Monitoring', text: 'We track appointment availability at the relevant centre and advise as soon as suitable dates open.' },
      { icon: 'building', title: 'Correct Centre & Category', text: 'Islamabad, Lahore or Karachi, and the right visa category — booked wrong, an appointment is wasted.' },
      { icon: 'passport', title: 'Online Profile Completion', text: 'Applicant profile, form data and appointment details completed accurately against your documents.' },
      { icon: 'stamp', title: 'Biometrics Scheduling', text: 'Fingerprint and photograph appointment arranged as part of the submission where required.' },
      { icon: 'doc', title: 'Document-Day File Check', text: 'A full review of your file before submission day, in the centre\'s required order.' },
      { icon: 'headset', title: 'Submission Day Briefing', text: 'What to carry, what to expect at the counter, and what happens after you submit.' },
    ],
    includes: [
      'Identification of the correct application centre and visa category',
      'Online applicant profile creation and data entry',
      'Appointment slot monitoring for your preferred travel window',
      'Appointment confirmation and calendar reminder',
      'Biometric enrolment scheduling where applicable',
      'Pre-submission document checklist and file ordering',
      'Guidance on optional services such as prime time or courier return',
      'Application tracking guidance after submission',
    ],
    process: [
      { title: 'Tell Us Your Destination', text: 'Share the country, visa category, city you will apply from and your intended travel dates.' },
      { title: 'Profile & Documents', text: 'We complete the online profile and issue you a document checklist tailored to your category.' },
      { title: 'Secure the Appointment', text: 'We monitor availability and confirm a slot that works with your travel plan and document readiness.' },
      { title: 'Submission Day', text: 'You attend with a checked, correctly ordered file. We brief you on the process beforehand.' },
    ],
    faqs: [
      { q: 'Can you guarantee an early appointment slot?', a: '<p>No, and be cautious of anyone who says they can. Appointment inventory is controlled by the visa application centre and the mission concerned. What we can do is make sure your profile is complete and correct, watch availability closely, and move quickly when suitable dates are released — which in practice is what gets applicants an earlier date.</p>' },
      { q: 'Which application centres do you work with?', a: '<p>We assist with submissions routed through the major outsourced application centres used in Pakistan — including VFS Global and TLScontact — as well as direct embassy and consulate submissions where a mission accepts them. The correct route depends on your destination country and visa category.</p>' },
      { q: 'Do I have to attend in person?', a: '<p>For almost all categories requiring biometrics, yes — fingerprints and a photograph must be given in person at the application centre. Some missions waive biometrics for applicants who have enrolled recently. We will confirm the position for your specific application.</p>' },
      { q: 'What happens if I miss my appointment?', a: '<p>A missed appointment usually has to be rebooked, and any centre fees already paid may not be recoverable. If you know in advance that you cannot attend, tell us as early as possible — rescheduling ahead of the date is far easier than recovering afterwards.</p>' },
      { q: 'Is the appointment fee included in your service?', a: '<p>No. Visa fees, application centre service charges and any optional services are paid separately at the prescribed rates and are not part of our assistance fee. We tell you the expected costs before you commit so there are no surprises.</p>' },
      { q: 'Does booking through you improve my chances of a visa?', a: '<p>It improves the quality and completeness of your submission, which matters. It does not influence the decision. Visa outcomes rest solely with the embassy, consulate or immigration authority concerned — please read our <a href="/visa-disclaimer/">visa disclaimer</a>.</p>' },
    ],
    related: ['/visa-services/', '/visa-services/schengen-visa/', '/visa-services/uk-visa/', '/travel-guides/'],
  },

  /* -------------------------------------------------------- Ziyarat (NEW) */
  {
    slug: 'ziyarat-tours',
    heroImage: '/assets/img/hotels/madinah-hotels.jpg',
    heroImageAlt: 'The Green Dome of Al-Masjid an-Nabawi in Madinah',
    url: '/services/ziyarat-tours/',
    icon: 'mosque',
    title: 'Ziyarat Tours',
    blurb: 'Makkah & Madinah historical sites',
    h1: 'Ziyarat Tours in Makkah & Madinah',
    metaTitle: 'Ziyarat Tours Makkah & Madinah | Guided Historical Site Visits',
    metaDescription:
      'Guided ziyarat tours of the historical sites of Makkah and Madinah for Umrah pilgrims from Pakistan — air-conditioned transport, Urdu-speaking guides and flexible scheduling.',
    lead:
      'The places where the Seerah happened are a short drive from your hotel. A guided ziyarat turns names you have read since childhood into places you have stood in — with someone who can tell you what actually happened there.',
    intro: [
      'Almost every pilgrim intends to visit the historical sites around Makkah and Madinah, and a great many run out of time or simply never find reliable transport. Ziyarat is included in most of our Umrah packages precisely because leaving it to chance so often means missing it.',
      'In Makkah, the standard ziyarat covers Jabal al-Nour and the area of the Cave of Hira, Jabal Thawr, the plains of Mina, Muzdalifah and Arafat with Jabal al-Rahmah, and Masjid al-Jinn and Masjid Aisha at Taneem — the latter also being where pilgrims commonly enter ihram for an additional Umrah.',
      'In Madinah, the route typically includes Masjid Quba — the first mosque of Islam — Masjid al-Qiblatayn, the site of the Battle of Uhud and the martyrs\' cemetery, the Seven Mosques area, and the date markets. Our vehicles are air-conditioned, our guides speak Urdu and English, and the pace is set so that older travellers are comfortable.',
    ],
    features: [
      { icon: 'mosque', title: 'Makkah Ziyarat', text: 'Jabal al-Nour, Jabal Thawr, Mina, Muzdalifah, Arafat, Masjid al-Jinn and Masjid Aisha.' },
      { icon: 'kaaba', title: 'Madinah Ziyarat', text: 'Masjid Quba, Masjid al-Qiblatayn, Uhud, the Seven Mosques and the date market.' },
      { icon: 'car', title: 'Air-Conditioned Transport', text: 'Cars, GMCs, Hiace vans and coaches depending on group size.' },
      { icon: 'headset', title: 'Urdu & English Guides', text: 'Knowledgeable guides who explain the history at each site.' },
      { icon: 'users', title: 'Private or Shared', text: 'Join a shared departure or book a private vehicle for your family.' },
      { icon: 'clock', title: 'Flexible Timing', text: 'Scheduled around prayer times and your ibadah, not against them.' },
    ],
    includes: [
      'Air-conditioned vehicle with driver',
      'Urdu and English speaking guide',
      'Hotel pick-up and drop-off in Makkah or Madinah',
      'Makkah ziyarat circuit (approximately 3–4 hours)',
      'Madinah ziyarat circuit (approximately 3–4 hours)',
      'Stop at Masjid Aisha (Taneem) for ihram where requested',
      'Scheduling around Fajr, Zuhr, Asr, Maghrib and Isha',
      'Private vehicle option for families and small groups',
    ],
    process: [
      { title: 'Tell Us Your Dates', text: 'Share your hotel and the days you are free in Makkah and Madinah.' },
      { title: 'Choose Shared or Private', text: 'Shared departures are economical; a private vehicle suits families and elderly travellers.' },
      { title: 'Confirm Your Slot', text: 'We confirm the pick-up time and vehicle, scheduled around prayer times.' },
      { title: 'Enjoy the Ziyarat', text: 'Your guide meets you at the hotel lobby and takes you through the sites at a comfortable pace.' },
    ],
    faqs: [
      { q: 'Is ziyarat included in your Umrah packages?', a: '<p>Yes — ziyarat in both Makkah and Madinah is included as standard in our Umrah packages. If you are travelling independently and only need the ziyarat component, we can arrange that separately.</p>' },
      { q: 'How long does the ziyarat take?', a: '<p>Allow roughly three to four hours in each city. The Makkah circuit covers more distance because Arafat and Mina are outside the city; the Madinah circuit is more compact but usually includes longer stops.</p>' },
      { q: 'Is the ziyarat suitable for elderly travellers?', a: '<p>Yes, with a private vehicle. Most sites are viewed from the vehicle or involve only a short walk on level ground; climbing Jabal al-Nour or Jabal Thawr is entirely optional and most pilgrims view them from the base. Tell us if anyone in your group has mobility needs and we will plan accordingly.</p>' },
      { q: 'Can we perform an additional Umrah during the ziyarat?', a: '<p>Yes. The Makkah circuit includes a stop at Masjid Aisha in Taneem, which is the nearest miqat for those already in Makkah and the usual point for entering ihram for an additional Umrah. Tell your guide in advance so the timing allows for it.</p>' },
    ],
    related: ['/umrah-packages/', '/hotels/madinah-hotels/', '/destinations/saudi-arabia/', '/services/airport-transfers/'],
  },

  /* ---------------------------------------------------------- Insurance */
  {
    slug: 'travel-insurance',
    heroImage: '/assets/img/guides/travel-insurance-guide-for-pakistani-travellers.jpg',
    heroImageAlt: 'Reviewing and signing an insurance policy document',
    url: '/services/travel-insurance/',
    icon: 'shield',
    title: 'Travel Insurance',
    blurb: 'Travel protection solutions',
    h1: 'Travel Insurance for Pakistani Travellers',
    metaTitle: 'Travel Insurance Pakistan | Schengen & Worldwide Travel Cover',
    metaDescription:
      'Travel insurance arrangement for Pakistani travellers — Schengen-compliant policies, worldwide medical cover, Umrah and Hajj travel protection. Islamabad-based assistance.',
    lead:
      'Some countries will not issue your visa without it. Everywhere else, it is the difference between an inconvenience abroad and a financial emergency. We arrange travel insurance that matches both the requirement and the reality.',
    intro: [
      'Travel insurance is a visa requirement for several destinations. Schengen states require applicants to hold medical cover valid throughout the Schengen area for the full duration of stay, with a minimum coverage level for medical expenses including emergency treatment and repatriation. A policy that does not meet the stated criteria is a common and entirely avoidable cause of refusal.',
      'Beyond the visa checklist, cover matters most for the things people do not plan for: a hospital admission abroad, a cancelled trip after a family bereavement, lost baggage on a connecting flight, or a medical evacuation. For Umrah and Hajj travellers in particular, where groups often include elderly parents, medical cover is worth arranging carefully rather than treating as a formality.',
      'We help you choose a policy appropriate to your destination, trip length, age band and any declarable conditions, and we make sure the certificate you receive states what the embassy expects to see.',
    ],
    features: [
      { icon: 'passport', title: 'Schengen-Compliant Cover', text: 'Policies meeting the medical cover criteria required for Schengen visa applications.' },
      { icon: 'globe', title: 'Worldwide Medical', text: 'Emergency medical treatment, hospitalisation and repatriation cover.' },
      { icon: 'kaaba', title: 'Umrah & Hajj Travel Cover', text: 'Policies suited to pilgrimage travel, including cover for older travellers.' },
      { icon: 'calendar', title: 'Trip Cancellation', text: 'Protection against cancellation and curtailment for covered reasons.' },
      { icon: 'briefcase', title: 'Baggage & Documents', text: 'Cover for lost, delayed or damaged baggage and lost travel documents.' },
      { icon: 'users', title: 'Family & Group Policies', text: 'Single-trip, multi-trip, family and group cover options.' },
    ],
    includes: [
      'Policy selection matched to your destination and visa requirement',
      'Schengen-compliant certificates where required',
      'Emergency medical and hospitalisation cover',
      'Emergency repatriation and evacuation',
      'Trip cancellation and curtailment options',
      'Baggage loss, delay and damage cover',
      'Passport and travel document loss assistance',
      'Age-banded options for elderly pilgrims',
    ],
    process: [
      { title: 'Share Your Trip', text: 'Destination, travel dates, travellers and ages, and whether the policy is for a visa application.' },
      { title: 'Compare Options', text: 'We present policies that meet the requirement, with the cover limits and exclusions explained.' },
      { title: 'Issue the Policy', text: 'The policy is issued and the certificate sent to you for your visa file or your records.' },
      { title: 'Travel Covered', text: 'You carry the emergency assistance number and policy details with your travel documents.' },
    ],
    faqs: [
      { q: 'Is travel insurance mandatory for a Schengen visa?', a: '<p>Yes. Schengen applicants must hold travel medical insurance valid across the Schengen area for the entire period of stay, covering emergency medical treatment and repatriation to a minimum specified level. Policies that fall short of the criteria, or that expire before the requested visa validity ends, are a frequent cause of refusal.</p>' },
      { q: 'Do I need insurance for Umrah?', a: '<p>Saudi Arabia has included medical insurance within the visa framework for pilgrims at various points, and requirements are adjusted from season to season. Independent of the requirement, we strongly recommend cover for Umrah travel — particularly where elderly parents are travelling — because medical treatment abroad is expensive and pilgrimage travel is physically demanding.</p>' },
      { q: 'Are pre-existing medical conditions covered?', a: '<p>Usually not by default. Most standard policies exclude pre-existing conditions unless they are declared and specifically accepted, sometimes at additional premium. Declare conditions honestly at the time of purchase — an undeclared condition is the most common reason a legitimate claim gets rejected.</p>' },
      { q: 'What is the maximum age for travel insurance?', a: '<p>Upper age limits vary by insurer and by policy, and premiums rise with age bands. Cover for travellers in their seventies and eighties is available but needs to be arranged specifically rather than assumed. Tell us the ages of all travellers up front.</p>' },
    ],
    related: ['/visa-services/schengen-visa/', '/umrah-packages/', '/services/air-ticketing/', '/travel-guides/'],
  },

  /* ---------------------------------------------------------- Transfers */
  {
    slug: 'airport-transfers',
    heroImage: '/assets/img/corporate-travel.jpg',
    heroImageAlt: 'A traveller with luggage in an airport terminal',
    url: '/services/airport-transfers/',
    icon: 'car',
    title: 'Airport Transfers',
    blurb: 'Meet, greet & ground transport',
    h1: 'Airport Transfers & Ground Transport',
    metaTitle: 'Airport Transfers & Ground Transport | Jeddah, Makkah, Madinah, Dubai',
    metaDescription:
      'Pre-booked airport transfers and intercity ground transport — Jeddah to Makkah, Makkah to Madinah, Dubai, Istanbul and Baku. Meet and greet service for Pakistani travellers.',
    lead:
      'Landing at 2am in an unfamiliar airport, tired, with luggage and family in tow, is the wrong moment to start negotiating with a taxi. Pre-booked transfers remove that entirely.',
    intro: [
      'Ground transport is the part of a trip most often left to chance and most reliably regretted. For Umrah travellers arriving at King Abdulaziz International Airport in Jeddah, the drive to Makkah takes roughly an hour and a half, and the Makkah–Madinah route is a four to five hour journey. Doing either in an unvetted vehicle after a long flight, with elderly parents in the group, is a false economy.',
      'We pre-book transfers so that a driver is waiting when you land, with your name on a board, a vehicle sized for your party and your luggage, and a fixed price agreed in advance. Where the Haramain High Speed Railway is the better option between Makkah and Madinah, we will tell you that instead.',
      'The same applies to leisure and business destinations: Dubai, Istanbul, Baku, Kuala Lumpur, Bangkok, London. A transfer booked in advance costs less than the airport rank and removes every conversation you do not want to have at the end of a flight.',
    ],
    features: [
      { icon: 'plane', title: 'Airport Meet & Greet', text: 'A driver waiting in arrivals with your name, tracking your flight for delays.' },
      { icon: 'kaaba', title: 'Jeddah – Makkah – Madinah', text: 'The full Umrah ground circuit, including Madinah airport and the return leg.' },
      { icon: 'users', title: 'Family-Sized Vehicles', text: 'Sedans, GMC Yukons, Hiace vans and coaches sized to your group and luggage.' },
      { icon: 'clock', title: 'Flight Tracking', text: 'Delays and early arrivals monitored so your driver is there when you actually land.' },
      { icon: 'wallet', title: 'Fixed Pricing', text: 'The fare is agreed before travel — no meters, no negotiation, no surprises.' },
      { icon: 'globe', title: 'Worldwide Destinations', text: 'Dubai, Istanbul, Baku, Kuala Lumpur, Bangkok, London and more.' },
    ],
    includes: [
      'Airport meet and greet with name board',
      'Flight tracking for delayed or early arrivals',
      'Air-conditioned vehicle appropriate to group size',
      'Luggage capacity confirmed at booking',
      'Jeddah airport to Makkah hotel transfer',
      'Makkah to Madinah intercity transfer',
      'Madinah hotel to Madinah airport transfer',
      'Child seats on request where available',
    ],
    process: [
      { title: 'Send Flight Details', text: 'Flight number, arrival time, number of passengers and pieces of luggage.' },
      { title: 'Confirm the Vehicle', text: 'We quote a fixed fare for the right vehicle class and confirm it in writing.' },
      { title: 'Receive Driver Details', text: 'Driver name and contact number sent to you by WhatsApp before departure.' },
      { title: 'Meet on Arrival', text: 'Your driver is waiting in the arrivals hall with your name on a board.' },
    ],
    faqs: [
      { q: 'What happens if my flight is delayed?', a: '<p>We track the flight. Your driver\'s timing is adjusted to the actual arrival, and waiting time within the standard allowance is included. For very long delays or diversions, contact us on WhatsApp and we will re-coordinate.</p>' },
      { q: 'Should I take a car or the train between Makkah and Madinah?', a: '<p>Both work. The Haramain High Speed Railway is fast and comfortable but runs to a fixed schedule and requires transfers at each end. A private vehicle is door to door and easier with a lot of luggage or elderly travellers, but the journey takes longer. We will recommend based on your group and timing.</p>' },
      { q: 'Can you provide a vehicle for the whole stay?', a: '<p>Yes. Vehicles can be booked with a driver on an hourly, daily or full-stay basis — useful for larger family groups, corporate visits and ziyarat combined with general movement.</p>' },
      { q: 'Are transfers included in Umrah packages?', a: '<p>Yes, all our Umrah packages include the airport and intercity transfers for the standard Jeddah–Makkah–Madinah routing. Additional or private movement can be added.</p>' },
    ],
    related: ['/umrah-packages/', '/services/ziyarat-tours/', '/hotels/', '/destinations/dubai/'],
  },

  /* ---- Hub cards: full sections live under their own URL trees --------- */
  {
    slug: 'umrah-packages', url: '/umrah-packages/', icon: 'kaaba', hub: true,
    title: 'Umrah Packages', blurb: 'Economy to Premium & VIP',
  },
  {
    slug: 'visa-services', url: '/visa-services/', icon: 'passport', hub: true,
    title: 'Visa Services', blurb: 'Visit, Tourist, Student & Work',
  },
  {
    slug: 'hotel-reservations', url: '/hotels/', icon: 'hotel', hub: true,
    title: 'Hotel Reservations', blurb: 'Worldwide accommodation',
  },
  {
    slug: 'international-tours', url: '/destinations/', icon: 'globe', hub: true,
    title: 'International Tours', blurb: 'Customized & group tours',
  },
  {
    slug: 'corporate-travel', url: '/corporate-travel/', icon: 'briefcase', hub: true,
    title: 'Corporate Travel', blurb: 'Business travel management',
  },
];

/** The eight cards shown on the homepage, in the order the brief specifies. */
const homepageServiceOrder = [
  'air-ticketing', 'umrah-packages', 'visa-services', 'hotel-reservations',
  'international-tours', 'corporate-travel', 'hajj-services', 'travel-insurance',
];

const bySlug = (slug) => services.find((s) => s.slug === slug);
const fullPages = services.filter((s) => !s.hub);

module.exports = { services, fullPages, homepageServiceOrder, bySlug };
