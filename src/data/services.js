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
    heroImage: '/assets/img/services/air-ticketing.jpg',
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
    heroImage: '/assets/img/hero-kaaba-1600.jpg',
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
    heroImage: '/assets/img/services/visa-appointments.jpg',
    heroImageAlt: 'The gilded gate of a European consulate',
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
    heroImage: '/assets/img/services/ziyarat-tours.jpg',
    heroImageAlt: 'The green and white domes of Al-Masjid an-Nabawi in Madinah',
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

  {
    /* Car rental is delivered by MyCab Pakistan, the sister company in this
       same building (see site.partner). The page says so plainly rather than
       implying Mazin Haramain runs a fleet of its own. */
    slug: 'car-rental',
    heroImage: '/assets/img/car-rental.jpg',
    heroImageAlt: 'A black Range Rover Sport photographed at dusk',
    /* The section further down the home page uses heroImage. If the card used
       it too the same car appeared twice on one screen. */
    cardImage: '/assets/img/services/car-rental.jpg',
    cardImageAlt: 'A silver luxury SUV on a cobbled European street',
    url: '/services/car-rental/',
    icon: 'car',
    title: 'Car Rental',
    blurb: 'With a driver, through MyCab',
    h1: 'Car Rental With a Driver, in Islamabad and Across Pakistan',
    metaTitle: 'Rent a Car With Driver in Islamabad | Car Rental — Mazin Haramain',
    metaDescription:
      'Car rental with a driver in Islamabad and across Pakistan — airport transfers, city meetings, wedding cars, northern-areas tours. Economy to Land Cruiser and Mercedes, arranged with MyCab Pakistan.',
    lead: 'A car on its own is rarely what you need. A car, a driver who knows the route, and a phone number that answers — that is the whole job.',
    intro: [
      'Car rental in Pakistan is almost always rental <em>with</em> a driver, and that is deliberate. Road conditions, city traffic and the mountain routes north all reward someone who drives them every week, and the cost difference against self-drive is small enough that very few visitors choose otherwise.',
      'The vehicles come from <strong>MyCab Pakistan</strong>, which operates from this same office in Safdar Mansion and answers the same landline. That is the practical point of mentioning them at all: a car can be attached to a booking we are already making for you, and one conversation covers both.',
      'Airport pickups are the most common request — a driver in arrivals, tracking the flight, with the luggage space actually booked rather than hoped for. After that it is city meetings, wedding cars, and the Islamabad-to-Hunza or Skardu run, where the vehicle class matters far more than most people expect.',
    ],
    features: [
      { icon: 'plane', title: 'Airport Transfers', text: 'Islamabad International in both directions, with the flight tracked and waiting time allowed for.' },
      { icon: 'briefcase', title: 'Corporate & Executive', text: 'Daily or monthly hire for visiting staff and delegations, billed to the company.' },
      { icon: 'heart', title: 'Wedding Cars', text: 'Presentation vehicles for the baraat and walima, booked for the day rather than the hour.' },
      { icon: 'compass', title: 'Northern Areas', text: 'Murree, Naran, Hunza, Skardu and Swat — on vehicles chosen for the road, not just the price.' },
      { icon: 'users', title: 'Groups & Coaches', text: 'Hiace at 14 seats and Coaster at 29 for families, tour groups and ziyarat parties.' },
      { icon: 'award', title: 'VIP Class', text: 'Land Cruiser Prado and LC300, Audi A8 and Mercedes-Benz S-Class where the occasion calls for it.' },
    ],
    includes: [
      'A professional driver on every booking',
      'Fuel arrangement agreed and stated in writing before travel',
      'Unlimited mileage on standard city rentals',
      'Vehicle insurance in place',
      'Airport meet-and-greet on arrival transfers',
      'Intercity and interior-Pakistan routes quoted per trip',
      'Multi-day hire for tours and business visits',
      'One point of contact for the car and the rest of your travel',
    ],
    notice:
      'Vehicles are supplied and operated by MyCab Pakistan, a separate company at the same address. Rental terms, security deposits and insurance conditions are theirs, and we will put you in direct contact with them before anything is confirmed.',
    process: [
      { title: 'Tell Us the Journey', text: 'Dates, pickup point, how many passengers and how much luggage. For the north, the destination decides the vehicle.' },
      { title: 'Choose the Vehicle Class', text: 'We come back with what is available in your dates and what each class actually costs, fuel policy included.' },
      { title: 'Confirm in Writing', text: 'Vehicle class, driver, timings and the total. Nothing is charged before you have seen it.' },
      { title: 'Driver Meets You', text: 'Contact details are shared ahead of the pickup, and the office line stays open while you travel.' },
    ],
    faqs: [
      {
        q: 'Can I rent a car without a driver in Pakistan?',
        a: '<p>Self-drive is possible but uncommon, and the conditions are stricter: a larger security deposit, a longer list of documents, and restrictions on where the vehicle may be taken. For visitors in particular, hire with a driver is usually cheaper once the deposit and the risk are counted, and considerably less stressful in city traffic. Tell us which you want and we will quote both.</p>',
      },
      {
        q: 'Is the driver included in the price?',
        a: '<p>Yes. Quoted rates are for the vehicle with a driver. What varies is the fuel policy and whether the driver\'s meals and overnight accommodation are included on multi-day trips outside the city — both are stated explicitly in your written quote rather than left to be settled on the road.</p>',
      },
      {
        q: 'Which vehicle do I need for Hunza or Skardu?',
        a: '<p>For the Karakoram Highway to Hunza a good sedan is usually adequate in season, but for Skardu, Deosai or anything off the main highway a Revo or a Prado is the sensible choice, and in winter it is not really optional. We would rather tell you that before you book than have you discover it on a mountain road.</p>',
      },
      {
        q: 'Can a car be added to my Umrah or tour booking?',
        a: '<p>In Pakistan, yes — airport transfers at either end, and onward travel to your departure city. Inside Saudi Arabia transport is arranged separately as part of the Umrah package itself, with Makkah and Madinah transfers and ziyarat covered there.</p>',
      },
      {
        q: 'How far in advance should I book?',
        a: '<p>A day or two is usually enough for a city car or an airport pickup. Wedding season and the summer window for the northern areas are the exceptions — presentation vehicles and the larger SUVs go early, and in June and July the good Prados are often committed weeks ahead.</p>',
      },
    ],
    related: ['/services/airport-transfers/', '/destinations/', '/corporate-travel/', '/services/ziyarat-tours/'],
  },

  {
    /* ---- Document attestation ------------------------------------------
       Added September 2026: the client listed attestation, apostille and
       power-of-attorney work among the services the site was not showing.

       The procedural detail below (HEC for degrees, IBCC for board
       certificates, NADRA-issued personal documents, MOFA last before the
       embassy) reflects how the chain normally runs, but attestation rules
       and camp-office arrangements change without much notice. Every page
       in this group says so on the page itself, and the client should check
       the specifics against current MOFA guidance before launch. */
    slug: 'document-attestation',
    heroImage: '/assets/img/services/attestation.jpg',
    heroImageAlt: 'A clerk stamping documents at an office desk',
    url: '/services/document-attestation/',
    icon: 'stamp',
    title: 'Document Attestation',
    blurb: 'MOFA, HEC, IBCC & embassy attestation',
    h1: 'Document Attestation from Pakistan — MOFA, HEC, IBCC & Embassy',
    metaTitle: 'Document Attestation Services in Islamabad | MOFA, HEC & IBCC',
    metaDescription:
      'Document attestation from Pakistan — degrees through HEC, board certificates through IBCC, NADRA personal documents, then MOFA and the destination embassy. Islamabad-based, with the order of steps handled for you.',
    lead: 'Attestation fails on sequence more often than on paperwork. Get the order wrong and the document comes back unstamped, having cost you a fortnight.',
    intro: [
      'Attestation is a chain, and every link has to be in the right order. A university degree is verified by the <strong>Higher Education Commission</strong> before anyone else will touch it. A matriculation or intermediate certificate goes through the <strong>Inter Board Committee of Chairmen</strong> instead. Personal documents &mdash; birth, marriage, death, family registration &mdash; are only accepted in their <strong>NADRA-issued</strong> form, which catches people out who are holding a handwritten municipal certificate from thirty years ago.',
      'Only once that first verification is done does the <strong>Ministry of Foreign Affairs</strong> attest the document, and only after MOFA will the destination country&rsquo;s embassy legalise it. Skip a step and the file is returned. Present the wrong version of a document and it is returned. Neither refusal comes with much explanation.',
      'We run the sequence for you: working out which authority your particular document needs, getting it into the right form first, and moving it through MOFA and the embassy in the correct order. For documents going to a country that is party to the Hague Convention, an <a href="/services/apostille/">apostille</a> may replace embassy legalisation entirely &mdash; which is faster, and worth checking before you start.',
    ],
    features: [
      { icon: 'award', title: 'Educational Documents', text: 'Degrees, transcripts and diplomas through HEC; matriculation and intermediate certificates through IBCC.' },
      { icon: 'users', title: 'Personal Documents', text: 'NADRA birth, marriage, death and family registration certificates, in the form MOFA will accept.' },
      { icon: 'briefcase', title: 'Commercial Documents', text: 'Invoices, certificates of origin and company papers, via the Chamber of Commerce where required.' },
      { icon: 'building', title: 'MOFA Attestation', text: 'Submission and collection at the Ministry of Foreign Affairs, including the camp offices.' },
      { icon: 'globe', title: 'Embassy Legalisation', text: 'The final stamp from the destination mission, once MOFA attestation is in place.' },
      { icon: 'doc', title: 'Translation', text: 'Certified translation arranged where the receiving country will not accept English or Urdu.' },
    ],
    includes: [
      'Assessment of which authority each of your documents actually needs',
      'Confirmation that personal documents are in NADRA-issued form before submission',
      'HEC verification for university degrees and transcripts',
      'IBCC attestation for matriculation and intermediate certificates',
      'MOFA attestation, including camp-office submission',
      'Embassy or consulate legalisation for the destination country',
      'Certified translation where the receiving authority requires it',
      'Tracking, collection and secure return of your originals',
    ],
    notice:
      'Attestation requirements, fee schedules and camp-office arrangements are set by the authorities concerned and change from time to time. We confirm the current process for your specific documents and destination before you commit to anything, and we never hold your originals longer than the step in hand requires.',
    process: [
      { title: 'Send Us the List', text: 'Tell us what each document is and which country it is going to. Photographs of the documents are enough to start.' },
      { title: 'We Map the Chain', text: 'You get the actual sequence for your documents, the authorities involved, the realistic timeline and the total cost.' },
      { title: 'Verification First', text: 'HEC, IBCC, NADRA or the Chamber of Commerce, depending on the document. Nothing goes to MOFA before this is done.' },
      { title: 'MOFA, Then the Embassy', text: 'Attestation at the Ministry, then legalisation at the destination mission — or an apostille where that applies instead.' },
    ],
    faqs: [
      {
        q: 'How long does document attestation take in Pakistan?',
        a: '<p>For a straightforward set — a degree and a couple of NADRA certificates going to one country — a fortnight to three weeks is a fair expectation once verification is complete. HEC verification is usually the slowest link, particularly if the issuing university is slow to respond, and that part is outside anyone\'s control. We give you a timeline for your specific documents rather than a general one, and tell you which step is likely to hold things up.</p>',
      },
      {
        q: 'Do I need HEC or IBCC attestation?',
        a: '<p>It depends on who issued the document. University degrees, transcripts and diplomas go through the Higher Education Commission. Matriculation and intermediate certificates go through the Inter Board Committee of Chairmen instead, because they were issued by a board rather than a university. People often assume one covers both and lose time finding out otherwise.</p>',
      },
      {
        q: 'Will MOFA attest my old handwritten birth certificate?',
        a: '<p>Almost certainly not. Personal documents are expected in their NADRA-issued form — a computerised birth registration certificate rather than a union council or municipal record from decades ago. If you are holding the older version, the first step is obtaining the NADRA equivalent, and that is worth starting before anything else because it gates the whole chain.</p>',
      },
      {
        q: 'Do I have to hand over my original documents?',
        a: '<p>Yes. Attestation is a physical stamp on the document itself, so the originals have to travel. We keep the time we hold them to what the step actually requires, give you a receipt listing exactly what we have, and return everything together. If you need a document for something else mid-process, say so at the start and we will sequence around it.</p>',
      },
      {
        q: 'Can you attest documents for someone who is abroad?',
        a: '<p>Often, yes — this is a large part of the work. If your originals are in Pakistan with family, they can be handed to us here while you stay where you are. Where a signature or an authority to act is needed from you, that is usually handled with a <a href="/services/power-of-attorney/">power of attorney</a> executed at the Pakistani mission in your country.</p>',
      },
    ],
    related: ['/services/apostille/', '/services/power-of-attorney/', '/visa-services/', '/services/visa-appointment-booking/'],
  },

  {
    /* ---- Apostille ------------------------------------------------------
       Pakistan acceded to the Hague Apostille Convention and it came into
       force for Pakistan in March 2023, with MOFA as the Competent
       Authority. That is recent enough that a lot of people — and some
       employers — still assume embassy legalisation is the only route, which
       is the confusion this page exists to clear up. Worth re-checking the
       current member-state list before launch. */
    slug: 'apostille',
    heroImage: '/assets/img/services/apostille.jpg',
    heroImageAlt: 'A stamp resting on a legal document',
    url: '/services/apostille/',
    icon: 'certificate',
    title: 'Apostille Services',
    blurb: 'Hague Convention certification',
    h1: 'Apostille Services in Pakistan — Hague Convention Certification',
    metaTitle: 'Apostille Services in Islamabad | Hague Convention Attestation Pakistan',
    metaDescription:
      'Apostille certification for Pakistani documents under the Hague Convention — one MOFA certificate accepted across member states, with no embassy legalisation needed. Degrees, NADRA certificates and commercial papers.',
    lead: 'If your document is going to a Hague Convention country, one certificate can replace the whole embassy queue. A great many people still do not know that.',
    intro: [
      'An apostille is a single certificate that makes a public document valid in every other country party to the Hague Apostille Convention. No embassy stamp, no consular queue, no separate legalisation for each destination &mdash; one certificate, recognised across the membership.',
      'Pakistan joined the Convention relatively recently, with the <strong>Ministry of Foreign Affairs</strong> acting as the Competent Authority that issues the apostille. Because it is a recent change, plenty of people &mdash; and some overseas employers and universities &mdash; are still working from the older assumption that embassy legalisation is the only route. Sometimes they are right, because the destination is not a member; often they are not.',
      'The first question is therefore always the same: is the receiving country a party to the Convention, and will the receiving institution accept an apostille? We check both before recommending a route, because being sent down the apostille path by mistake costs exactly as much time as being sent down the embassy path by mistake. Where an apostille does not apply, the work becomes ordinary <a href="/services/document-attestation/">document attestation</a>.',
    ],
    features: [
      { icon: 'globe', title: 'Member-State Check', text: 'We confirm whether your destination is party to the Convention before anything is submitted.' },
      { icon: 'award', title: 'Educational Documents', text: 'Degrees and transcripts, after HEC or IBCC verification as the document requires.' },
      { icon: 'users', title: 'Personal Documents', text: 'NADRA birth, marriage and family registration certificates.' },
      { icon: 'briefcase', title: 'Commercial Papers', text: 'Company documents, powers of attorney and certificates of origin.' },
      { icon: 'building', title: 'MOFA Competent Authority', text: 'The apostille itself, issued by the Ministry of Foreign Affairs.' },
      { icon: 'clock', title: 'Faster Than Legalisation', text: 'One certificate rather than a separate embassy step for each destination.' },
    ],
    includes: [
      'Confirmation that the destination country accepts an apostille',
      'A check on whether the receiving institution will accept one',
      'Underlying verification through HEC, IBCC or NADRA first',
      'The apostille certificate issued by MOFA',
      'Certified translation where the destination requires it',
      'The ordinary attestation route instead, where an apostille does not apply',
      'Tracking and secure return of your originals',
      'A written note of what was issued, for your own records',
    ],
    notice:
      'The list of Hague Convention member states changes as countries join, and an individual university, employer or court can still ask for something in addition to an apostille. We verify the current position for your destination before starting, but the receiving institution has the final say on what it will accept.',
    process: [
      { title: 'Tell Us the Destination', text: 'The country and, where you know it, the institution asking for the document. Both matter.' },
      { title: 'We Confirm the Route', text: 'Apostille or embassy legalisation, with the reason stated plainly rather than assumed.' },
      { title: 'Underlying Verification', text: 'HEC, IBCC or NADRA first, exactly as with ordinary attestation. The apostille sits on top of that.' },
      { title: 'MOFA Issues the Apostille', text: 'The certificate is attached and your originals come back to you.' },
    ],
    faqs: [
      {
        q: 'What is the difference between an apostille and attestation?',
        a: '<p>An apostille is one certificate accepted by every country in the Hague Convention. Attestation, in the older sense, is a chain that ends with the specific destination country\'s embassy stamping your document — which means doing it again if you later need the same document for somewhere else. Where an apostille is available it is usually faster and cheaper; where the destination is not a member, it is not an option at all.</p>',
      },
      {
        q: 'Does Pakistan issue apostilles?',
        a: '<p>Yes. Pakistan is a party to the Hague Apostille Convention and the Ministry of Foreign Affairs is the Competent Authority that issues the certificate. This is a recent enough change that some employers and institutions abroad are still asking for embassy legalisation out of habit, so it is worth asking them directly what they will accept before you choose a route.</p>',
      },
      {
        q: 'Do I still need HEC or IBCC verification for an apostille?',
        a: '<p>Generally yes. The apostille certifies the document and the signature on it; it does not replace the underlying verification that a degree or board certificate is genuine. In practice the chain looks much the same up to the last step, and then an apostille is issued instead of the document going on to an embassy.</p>',
      },
      {
        q: 'Is an apostille accepted everywhere?',
        a: '<p>Only in countries party to the Convention — which is most of Europe, and a great many others, but not all. And membership is not quite the end of it: an individual university or licensing body can still ask for a translation, a notarisation or a copy certified some particular way. We check the country, and we encourage you to ask the receiving institution too.</p>',
      },
    ],
    related: ['/services/document-attestation/', '/services/power-of-attorney/', '/visa-services/', '/services/visa-appointment-booking/'],
  },

  {
    /* ---- Power of attorney ---------------------------------------------
       The overseas-Pakistani case is the common one: a POA executed at a
       Pakistani mission abroad, then attested by MOFA so it can be used
       here. Written from that direction because that is who asks. */
    slug: 'power-of-attorney',
    heroImage: '/assets/img/services/power-of-attorney.jpg',
    heroImageAlt: 'A person signing legal documents at a desk',
    url: '/services/power-of-attorney/',
    icon: 'doc',
    title: 'Power of Attorney',
    blurb: 'Drafting & attestation for overseas Pakistanis',
    h1: 'Power of Attorney Attestation for Overseas Pakistanis',
    metaTitle: 'Power of Attorney Attestation Pakistan | Overseas Pakistani POA Services',
    metaDescription:
      'Power of attorney attestation for overseas Pakistanis — drafting, execution at the Pakistani mission abroad, MOFA attestation and use in Pakistan for property, banking and court matters.',
    lead: 'A power of attorney is the difference between handling something from abroad and having to fly home for it.',
    intro: [
      'If you live abroad and something in Pakistan needs signing &mdash; a property sale, a bank matter, a case in court, a transfer at the registry &mdash; a power of attorney lets somebody you trust here act for you. It is one of the most useful documents an overseas Pakistani can hold, and one of the easiest to get wrong.',
      'The usual route runs the other way from most attestation work. The document is drafted to cover the specific act, executed and attested at the <strong>Pakistani embassy or consulate</strong> in the country where you live, and then attested by the <strong>Ministry of Foreign Affairs</strong> after it arrives in Pakistan so that the registry, bank or court here will accept it.',
      'Two things cause most of the trouble. The first is scope: a power of attorney drafted too narrowly will not cover the act when it comes to it, and one drafted too broadly may be refused, or grant far more authority than you intended. The second is that the institution receiving it &mdash; a particular sub-registrar, a particular bank &mdash; may have its own view on wording and attestation. We would rather establish that at the drafting stage than after your document has crossed a continent.',
    ],
    features: [
      { icon: 'doc', title: 'Drafting', text: 'Wording scoped to the actual act, whether that is a sale, a transfer or representation in a case.' },
      { icon: 'globe', title: 'Execution Abroad', text: 'Guidance on attestation at the Pakistani mission in your country of residence.' },
      { icon: 'building', title: 'MOFA Attestation', text: 'Attestation on arrival in Pakistan, so local institutions will accept it.' },
      { icon: 'handshake', title: 'Special or General', text: 'A special power for one transaction, or a general power where the matter genuinely needs it.' },
      { icon: 'shield', title: 'Revocation', text: 'Assistance with revoking a power of attorney that is no longer wanted.' },
      { icon: 'stamp', title: 'Registration', text: 'Guidance where the document has to be registered, as property matters usually require.' },
    ],
    includes: [
      'A discussion of what the attorney actually needs to be able to do',
      'Drafting scoped to that, rather than a generic template',
      'A note of which Pakistani mission to attend and what to take',
      'MOFA attestation once the executed document reaches Pakistan',
      'Guidance on registration where the transaction requires it',
      'Certified translation where a document is executed in another language',
      'Assistance with revocation if circumstances change',
      'A written record of the steps completed',
    ],
    notice:
      'We provide documentation and attestation assistance, not legal advice, and we are not a law firm. For a contested matter, a large property transaction or anything with a dispute attached, take independent legal advice on the wording before executing it — and confirm with the specific registry, bank or court what they will accept.',
    process: [
      { title: 'Tell Us the Act', text: 'What needs doing in Pakistan, by whom, and whether the receiving institution has said anything about its requirements.' },
      { title: 'Draft and Review', text: 'You see the wording before anything is signed, with the scope explained in plain terms.' },
      { title: 'Execute at the Mission', text: 'You attend the Pakistani embassy or consulate where you live, with a checklist of what to bring.' },
      { title: 'MOFA and Onward Use', text: 'The executed document is attested here and delivered to your attorney, ready to use.' },
    ],
    faqs: [
      {
        q: 'How does an overseas Pakistani make a power of attorney?',
        a: '<p>The document is drafted for the specific act, then signed and attested at the Pakistani embassy or consulate in the country where you live — in person, with your passport and usually your CNIC or NICOP. It is then sent to Pakistan and attested by the Ministry of Foreign Affairs, after which your attorney can use it. We prepare the draft and handle the Pakistan end.</p>',
      },
      {
        q: 'Special or general power of attorney?',
        a: '<p>A special power covers one defined act — selling a particular property, operating a particular account. A general power grants broad authority over your affairs. For most purposes a special power is the right choice and the safer one, because it limits what can be done in your name. A general power is occasionally necessary, and should not be given lightly or to someone you do not entirely trust.</p>',
      },
      {
        q: 'Does a power of attorney need to be registered?',
        a: '<p>For property transactions, usually yes, and an unregistered document is a common reason for a transfer stalling at the sub-registrar. Requirements vary by province and by the nature of the transaction. We tell you whether registration applies to your matter, because it changes both the timeline and what the wording needs to contain.</p>',
      },
      {
        q: 'Can I cancel a power of attorney?',
        a: '<p>Yes. A power of attorney can be revoked, and where the original was registered the revocation generally needs to be registered too, with notice given to the attorney and to anyone relying on it — a bank or a registry. Do not simply stop mentioning it: until it is properly revoked, it may still be acted upon.</p>',
      },
      {
        q: 'How long does the whole process take?',
        a: '<p>Drafting is quick, often a day or two. The part outside our control is the appointment at the Pakistani mission where you live, which varies enormously by country and season. Once the executed document reaches Pakistan, MOFA attestation is typically a few working days. We give you a realistic estimate for your country rather than a best case.</p>',
      },
    ],
    related: ['/services/document-attestation/', '/services/apostille/', '/visa-services/', '/contact/'],
  },

  /* ---- Hub cards: full sections live under their own URL trees --------- */
  {
    slug: 'umrah-packages', url: '/umrah-packages/', icon: 'kaaba', hub: true,
    title: 'Umrah Packages', blurb: 'Economy to Premium & VIP',
    cardImage: '/assets/img/services/umrah-packages.jpg',
    cardImageAlt: 'Pilgrims in ihram before the Kaaba at Masjid al-Haram',
  },
  {
    slug: 'visa-services', url: '/visa-services/', icon: 'passport', hub: true,
    title: 'Visa Services', blurb: 'Visit, Tourist & Business',
    cardImage: '/assets/img/visa-services.jpg',
    cardImageAlt: 'A passport, compass and travel planner laid out on a world map',
  },
  {
    slug: 'hotel-reservations', url: '/hotels/', icon: 'hotel', hub: true,
    title: 'Hotel Reservations', blurb: 'Worldwide accommodation',
    cardImage: '/assets/img/hotels/worldwide-hotels.jpg',
    cardImageAlt: 'The lobby of a luxury hotel',
  },
  {
    slug: 'international-tours', url: '/destinations/', icon: 'globe', hub: true,
    title: 'International Tours', blurb: 'Customized & group tours',
    cardImage: '/assets/img/services/international-tours.jpg',
    cardImageAlt: 'Sunset over the windmills and white houses of Oia, Santorini',
  },
  {
    slug: 'corporate-travel', url: '/corporate-travel/', icon: 'briefcase', hub: true,
    title: 'Corporate Travel', blurb: 'Business travel management',
    cardImage: '/assets/img/corporate-travel.jpg',
    cardImageAlt: 'A business traveller walking through an airport terminal with luggage',
  },
];

/** The eight cards shown on the homepage, in the order the brief specifies. */
const homepageServiceOrder = [
  /* The client's own order, given September 2026, and the same order the
     Services menu, the services hub and the footer column now use. Nine,
     three across, so the grid fills exactly.

     Corporate Travel came off the home grid to make room for Ziyarat Tours;
     it keeps its top-level place in the Services menu and the footer. */
  'umrah-packages',
  'visa-appointment-booking',
  'visa-services',
  'air-ticketing',
  'hotel-reservations',
  'international-tours',
  'car-rental',
  'hajj-services',
  'ziyarat-tours',
];

/* ---- One canonical order, everywhere -------------------------------------
   The client's order is not just the home grid's — it is how services should
   read wherever they are listed. Rather than repeat it at each call site and
   watch the copies drift, `services` is exported already sorted, so anything
   that iterates it inherits the order for free: the services hub, the
   sitemap page, and anything added later.

   Services outside the client's nine keep their declared order, after it.
   -------------------------------------------------------------------------- */
const rankOf = (slug) => {
  const i = homepageServiceOrder.indexOf(slug);
  return i === -1 ? homepageServiceOrder.length + services.findIndex((x) => x.slug === slug) : i;
};

const ordered = [...services].sort((a, b) => rankOf(a.slug) - rankOf(b.slug));

/* URL -> rank, for the hand-written "Related Services" lists. Those name a
   mix of service hubs and individual pages, so they are matched on URL and
   anything unrecognised keeps its position at the end. */
const RANK_BY_URL = new Map(ordered.map((s, i) => [s.url, i]));

/**
 * Sort a list of {label, url} links into the canonical service order.
 * Links that are not services (a visa category, say) fall to the end in the
 * order they were written.
 */
function orderServiceLinks(links) {
  return [...links].sort((a, b) => {
    const ra = RANK_BY_URL.has(a.url) ? RANK_BY_URL.get(a.url) : Infinity;
    const rb = RANK_BY_URL.has(b.url) ? RANK_BY_URL.get(b.url) : Infinity;
    if (ra === rb) return links.indexOf(a) - links.indexOf(b);
    return ra - rb;
  });
}

const bySlug = (slug) => services.find((s) => s.slug === slug);
const fullPages = ordered.filter((s) => !s.hub);

module.exports = {
  services: ordered,
  fullPages,
  homepageServiceOrder,
  orderServiceLinks,
  bySlug,
};
