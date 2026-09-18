/* ==========================================================================
   Umrah section.
   Three page families, all under /umrah-packages/:
     tiers      — Economy / Executive / Premium / VIP / Customized
     durations  — 10 / 14 / 15 / 21 / 28 day packages (high-intent searches)
     special    — Ramadan, Family, Group, Umrah Visa
     cities     — departure-city pages for local search
   Prices are deliberately "on request": the brief requires them to stay
   admin-editable and never to be published as fixed claims.
   ========================================================================== */

const PRICE_NOTE = 'Per person on sharing basis. Confirmed at time of booking.';

/* ------------------------------------------------------------------ Tiers */
const tiers = [
  {
    slug: 'economy-umrah-packages',
    tier: 'Economy',
    title: 'Economy Umrah Packages',
    h1: 'Economy Umrah Packages from Pakistan',
    metaTitle: 'Economy Umrah Packages from Pakistan | Affordable Umrah',
    metaDescription:
      'Affordable economy Umrah packages from Pakistan with visa, flights, hotels in Makkah and Madinah, transport and ziyarat included. Sharing rooms, honest pricing, no hidden extras.',
    subtitle: 'Affordable and comfortable',
    blurb: 'Well-organised Umrah at the most accessible price point, without cutting the things that matter.',
    lead:
      'A carefully budgeted Umrah that still gets the fundamentals right: a confirmed visa, a real hotel, included transport and ziyarat, and a team you can reach while you are there.',
    intro: [
      'An economy package is about spending where it counts. The saving comes from room sharing — typically quad or quint occupancy — and from hotels a little further from the Haram, usually served by shuttle. What does not change is the paperwork, the flights, the transfers and the support.',
      'For many families this is the sensible choice, particularly for a first Umrah, for younger travellers who do not mind the walk, or for groups travelling together who are happy to share rooms. Pilgrims spend most of their waking hours in the Haram rather than the hotel room, and an honest economy package acknowledges that.',
      'What we will not do is disguise a weak package as a cheap one. If the hotel is 1,200 metres from the Haram, we tell you it is 1,200 metres. If the flight has a long transit, you see it before you pay. The number of complaints in this segment comes almost entirely from agencies that describe an economy package as something it is not.',
    ],
    specs: [
      { label: 'Duration', value: '14 – 21 nights' },
      { label: 'Makkah Hotel', value: '2–3 star / shuttle service' },
      { label: 'Madinah Hotel', value: '2–3 star / walking distance' },
      { label: 'Room Sharing', value: 'Quad / Quint' },
      { label: 'Flights', value: 'Included (economy class)' },
      { label: 'Umrah Visa', value: 'Included' },
      { label: 'Transport', value: 'Included' },
      { label: 'Ziyarat', value: 'Included' },
    ],
    suitedTo: [
      'First-time pilgrims working to a fixed budget',
      'Groups travelling together who are comfortable sharing rooms',
      'Younger and fitter travellers who do not mind a shuttle or a walk',
      'Extended family groups keeping the per-person cost down',
    ],
    featured: false,
  },
  {
    slug: 'executive-umrah-packages',
    tier: 'Executive',
    title: 'Executive Umrah Packages',
    h1: 'Executive Umrah Packages from Pakistan',
    metaTitle: 'Executive Umrah Packages from Pakistan | 3-4 Star Hotels',
    metaDescription:
      'Executive Umrah packages with 3–4 star hotels closer to the Haram, triple or quad sharing, direct flight options, private transport and ziyarat. Enquire for current pricing.',
    subtitle: 'Enhanced comfort and convenience',
    blurb: 'A step up in hotel category and proximity — the most popular choice for families.',
    lead:
      'The middle ground most families actually want: hotels near enough to walk to the Haram, fewer people per room, and better flight timings — without moving into premium pricing.',
    intro: [
      'Executive packages are our most requested category, and the reason is straightforward. The jump from economy to executive buys the two things pilgrims notice most: distance from the Haram and the number of people in the room.',
      'Hotels in this tier are typically three to four star and positioned so that the Haram is a walk rather than a shuttle ride — a meaningful difference when you are going five times a day and travelling with parents. Rooms are usually triple or quad, so a family of four can have a room to themselves.',
      'Flight arrangements also improve: more direct routings, better departure times, and fewer of the punishing overnight transits that make the first two days of an Umrah a write-off. For most families comparing options, this is the tier where the value curve peaks.',
    ],
    specs: [
      { label: 'Duration', value: '14 – 21 nights' },
      { label: 'Makkah Hotel', value: '3–4 star / walking distance' },
      { label: 'Madinah Hotel', value: '3–4 star / close to Haram' },
      { label: 'Room Sharing', value: 'Triple / Quad' },
      { label: 'Flights', value: 'Included (direct options)' },
      { label: 'Umrah Visa', value: 'Included' },
      { label: 'Transport', value: 'Private transfers' },
      { label: 'Ziyarat', value: 'Included (both cities)' },
    ],
    suitedTo: [
      'Families of three to five travelling together',
      'Pilgrims travelling with elderly parents who need a shorter walk',
      'Travellers who want better flight timings and fewer transits',
      'Repeat pilgrims upgrading from a previous economy trip',
    ],
    featured: true,
  },
  {
    slug: 'premium-umrah-packages',
    tier: 'Premium',
    title: 'Premium Umrah Packages',
    h1: 'Premium Umrah Packages from Pakistan',
    metaTitle: 'Premium Umrah Packages from Pakistan | 5 Star Hotels Near Haram',
    metaDescription:
      'Premium Umrah packages with 5 star hotels close to Masjid al-Haram and Masjid an-Nabawi, double or triple rooms, direct flights, private transport and full ziyarat.',
    subtitle: 'Premium hotels and services',
    blurb: 'Five-star accommodation within close reach of both Harams, with double or triple occupancy.',
    lead:
      'For pilgrims who want the shortest possible walk to the Haram, a genuinely comfortable room, and a journey arranged so that nothing competes for attention with the ibadah.',
    intro: [
      'Premium packages are built around location. In Makkah that means hotels in or immediately around the central area — the walk to the mataf measured in minutes, not kilometres. In Madinah it means properties in the central zone facing or adjoining the Masjid an-Nabawi precinct.',
      'Rooms are double or triple, so couples travel together and families are not splitting across floors. Buffet meal plans are standard in this tier, which matters more than people expect: after Fajr and Isha in the Haram, finding food is a chore nobody wants.',
      'Flights are direct wherever the schedule allows, transfers are private, and ziyarat in both cities is included with a dedicated vehicle. For older pilgrims, for couples travelling alone, and for anyone who has done a longer-walk Umrah once and decided not to repeat it, this is the tier that solves the problem.',
    ],
    specs: [
      { label: 'Duration', value: '10 – 21 nights' },
      { label: 'Makkah Hotel', value: '5 star / close to Haram' },
      { label: 'Madinah Hotel', value: '5 star / central area' },
      { label: 'Room Sharing', value: 'Double / Triple' },
      { label: 'Flights', value: 'Direct flights included' },
      { label: 'Meals', value: 'Breakfast & dinner (buffet)' },
      { label: 'Transport', value: 'Private transfers' },
      { label: 'Ziyarat', value: 'Included with guide' },
    ],
    suitedTo: [
      'Couples and small families travelling together',
      'Pilgrims travelling with elderly or less mobile family members',
      'Travellers who want the shortest walk to the Haram',
      'Those who prefer full-board arrangements over finding meals',
    ],
    featured: false,
  },
  {
    slug: 'vip-umrah-packages',
    tier: 'VIP',
    title: 'VIP Umrah Packages',
    h1: 'VIP Umrah Packages from Pakistan',
    metaTitle: 'VIP Umrah Packages from Pakistan | Luxury Umrah, Haram-View Hotels',
    metaDescription:
      'VIP Umrah packages with luxury Haram-view hotels, business class flight options, private GMC transfers, dedicated coordinator and personalised ziyarat arrangements.',
    subtitle: 'A personalised travel experience',
    blurb: 'Haram-view accommodation, private transport throughout and a dedicated coordinator.',
    lead:
      'A fully personalised journey: the hotel you choose, the room category you want, private vehicles throughout, and one coordinator responsible for your group from departure to return.',
    intro: [
      'VIP is less a fixed package than a brief we build to. Pilgrims in this tier usually have specific requirements — a particular hotel, a Haram-facing room, business class on a direct flight, a private GMC on standby for the duration, or an itinerary shaped around a family occasion.',
      'Accommodation is selected from the landmark properties adjoining both Harams, with room categories that can include Kaaba-view and Haram-view where availability allows. These rooms are limited and price sharply by season, so early confirmation matters more in this tier than any other.',
      'Every VIP booking is assigned a named coordinator who handles the arrangements before departure and remains reachable throughout the journey — for a room change, an extra vehicle, a restaurant booking, or anything else that comes up while you are there.',
    ],
    specs: [
      { label: 'Duration', value: 'Fully flexible' },
      { label: 'Makkah Hotel', value: '5 star / Haram view available' },
      { label: 'Madinah Hotel', value: '5 star / facing Masjid an-Nabawi' },
      { label: 'Room Sharing', value: 'Single / Double' },
      { label: 'Flights', value: 'Business class available' },
      { label: 'Meals', value: 'Full board' },
      { label: 'Transport', value: 'Private GMC / luxury vehicle' },
      { label: 'Support', value: 'Dedicated coordinator' },
    ],
    suitedTo: [
      'Pilgrims who want a Haram-view room and the shortest possible walk',
      'Travellers requiring business class or a specific airline',
      'Families marking a special occasion with an Umrah journey',
      'Corporate and VIP guests requiring discretion and a single point of contact',
    ],
    featured: false,
  },
  {
    slug: 'customized-umrah-packages',
    tier: 'Custom',
    title: 'Customized Umrah Packages',
    h1: 'Customized Umrah Packages — Built Around Your Requirements',
    metaTitle: 'Customized Umrah Packages from Pakistan | Build Your Own Umrah',
    metaDescription:
      'Build your own Umrah package: choose your hotels, nights in Makkah and Madinah, airline, room category and departure date. Tailored quotations from Mazin Haramain, Islamabad.',
    subtitle: 'Built entirely around you',
    blurb: 'Choose your own hotels, nights, airline and dates — we price it and arrange it.',
    lead:
      'If none of the standard packages fits, we build one that does. You choose the hotels, the split of nights, the airline and the dates; we price it, confirm it and arrange it.',
    intro: [
      'Fixed packages are convenient until your requirements do not match them. A customized Umrah is the answer when you want fifteen nights split unevenly between the cities, a specific hotel a relative recommended, a departure that works around a school holiday, or an extended stay in Madinah before Ramadan.',
      'The process is straightforward. You tell us the constraints that are fixed — usually the dates and the budget — and the preferences that are flexible. We come back with a costed itinerary showing exactly which hotel, which room category, which flights and what is and is not included.',
      'This is also the right route for larger family groups with mixed requirements: grandparents needing a hotel close to the Haram while younger members are happy further out, or a group where some travel for ten days and others stay three weeks.',
    ],
    specs: [
      { label: 'Duration', value: 'Your choice' },
      { label: 'Makkah Hotel', value: 'Your selection' },
      { label: 'Madinah Hotel', value: 'Your selection' },
      { label: 'Room Sharing', value: 'Single to Quint' },
      { label: 'Flights', value: 'Preferred airline' },
      { label: 'Meals', value: 'Optional' },
      { label: 'Transport', value: 'Shared or private' },
      { label: 'Ziyarat', value: 'Optional' },
    ],
    suitedTo: [
      'Travellers with fixed dates that standard departures do not match',
      'Large family groups with different budgets and requirements',
      'Pilgrims wanting a specific hotel or an unusual split of nights',
      'Repeat pilgrims who know exactly what they want',
    ],
    featured: false,
  },
];

/* -------------------------------------------------------------- Durations */
const durations = [
  {
    slug: '10-days-umrah-package',
    days: 10,
    title: '10 Days Umrah Package',
    h1: '10 Days Umrah Package from Pakistan',
    metaTitle: '10 Days Umrah Package from Pakistan | Short Umrah Trip',
    metaDescription:
      'A 10 day Umrah package from Pakistan with 5 nights Makkah and 4 nights Madinah, visa, flights, hotels, transport and ziyarat included. Ideal for working professionals.',
    makkah: 5, madinah: 4,
    lead: 'The shortest practical Umrah for travellers who cannot take extended leave — tightly planned so the days on the ground are not wasted.',
    intro: [
      'Ten days is the most requested short-format Umrah, and it works well provided the itinerary is built properly. With five nights in Makkah and four in Madinah, there is time to perform Umrah without rushing, attend prayers in both Harams, and complete ziyarat in each city.',
      'The pressure point in a short package is flight timing. A routing with a long transit on either leg can consume the better part of two days, which on a ten-day trip is a significant proportion. We build these itineraries around direct or short-connection flights wherever the schedule allows, even where that costs slightly more.',
      'This format suits working professionals, business owners who cannot be away for long, and families constrained by school terms. It is also a sensible choice for a second or third Umrah, where the traveller already knows the ground and does not need settling-in time.',
    ],
    bestFor: 'Working professionals and repeat pilgrims with limited leave',
  },
  {
    slug: '14-days-umrah-package',
    days: 14,
    title: '14 Days Umrah Package',
    h1: '14 Days Umrah Package from Pakistan',
    metaTitle: '14 Days Umrah Package from Pakistan | 2 Weeks Umrah — Mazin Haramain',
    metaDescription:
      'A 14 day Umrah package from Pakistan with 8 nights Makkah and 5 nights Madinah, visa, flights, hotel, transport and ziyarat included. The balanced two-week option.',
    makkah: 8, madinah: 5,
    lead: 'Two weeks is the balance point — enough time in Makkah to settle into a rhythm, and a proper stay in Madinah rather than a passing visit.',
    intro: [
      'Fourteen nights is where an Umrah stops feeling like a trip and starts feeling like a retreat. Eight nights in Makkah gives you time to perform Umrah on arrival, recover, and then establish a routine around the five daily prayers without watching the clock.',
      'Five nights in Madinah is generally the minimum most pilgrims find satisfying — enough to complete the Riyadul Jannah and Rawdah visits, attend prayers in Masjid an-Nabawi, and cover the ziyarat sites without compressing everything into one exhausting day.',
      'For first-time pilgrims in particular, this duration removes the most common regret we hear about shorter trips: leaving just as you had settled in.',
    ],
    bestFor: 'First-time pilgrims and families wanting a balanced itinerary',
  },
  {
    slug: '15-days-umrah-package',
    days: 15,
    title: '15 Days Umrah Package',
    h1: '15 Days Umrah Package from Pakistan',
    metaTitle: '15 Days Umrah Package from Pakistan | Visa, Flights & Hotels Included',
    metaDescription:
      'A 15 day Umrah package from Pakistan with 8 nights Makkah and 6 nights Madinah. Umrah visa, return flights, hotels, transport and ziyarat included. Enquire for current rates.',
    makkah: 8, madinah: 6,
    lead: 'A fifteen-day itinerary with an unhurried stay in both cities — our most frequently booked standard duration.',
    intro: [
      'Fifteen days is the classic Pakistani Umrah format and remains our most booked duration. The split of eight nights in Makkah and six in Madinah gives both cities proper weight, with a day in hand for travel between them.',
      'The extra night over a fourteen-day itinerary matters more than it sounds, because it usually lands in Madinah. Pilgrims consistently report that the Madinah portion is where they wish they had more time, and this duration accommodates that without extending into a three-week commitment.',
      'It also fits neatly around most airline schedules from Islamabad, Lahore and Karachi, which keeps flight pricing competitive and reduces the chance of an awkward routing.',
    ],
    bestFor: 'Families and couples wanting the standard, well-paced Umrah',
  },
  {
    slug: '21-days-umrah-package',
    days: 21,
    title: '21 Days Umrah Package',
    h1: '21 Days Umrah Package from Pakistan',
    metaTitle: '21 Days Umrah Package from Pakistan | 3 Weeks Umrah — Mazin Haramain',
    metaDescription:
      'A 21 day Umrah package from Pakistan with 10 nights Makkah and 10 nights Madinah, 4 star hotels, flights, visa, transport and ziyarat included. Extended Umrah journey.',
    makkah: 10, madinah: 10,
    lead: 'Three weeks, split evenly between the two cities — the format for pilgrims who want depth rather than a checklist.',
    intro: [
      'A twenty-one day Umrah with ten nights in each city is the itinerary the brief specifies as our flagship extended package, and it is the one repeat pilgrims most often move to.',
      'The length changes the nature of the journey. With ten nights in Makkah there is room to perform multiple Umrah — entering ihram again from Masjid Aisha at Taneem — and to spend long stretches in the Haram without the constant awareness of a departure date. The ten nights in Madinah allow the same unhurried pattern around Masjid an-Nabawi.',
      'It is also the most economical format per night, since the fixed costs of visa and airfare are spread across three weeks rather than ten days. For retired travellers, for those taking a sabbatical, and for anyone travelling in Ramadan, this is the format that makes the most of the trip.',
    ],
    bestFor: 'Retired travellers, repeat pilgrims and Ramadan journeys',
  },
  {
    slug: '28-days-umrah-package',
    days: 28,
    title: '28 Days Umrah Package',
    h1: '28 Days Umrah Package from Pakistan',
    metaTitle: '28 Days Umrah Package from Pakistan | Full Month Umrah & Ramadan',
    metaDescription:
      'A 28 day Umrah package from Pakistan — a full month in Makkah and Madinah with visa, flights, hotels, transport and ziyarat. Popular for complete Ramadan stays.',
    makkah: 14, madinah: 13,
    lead: 'A full month in the Haramain — most often booked to cover the whole of Ramadan, including the last ten nights.',
    intro: [
      'Twenty-eight nights is the format for pilgrims intending to spend the complete month of Ramadan in the Haramain, and for those who simply want the longest stay a single Umrah visa period comfortably allows.',
      'Splitting roughly fourteen nights in each city, this itinerary is built for people who intend to establish a routine: taraweeh in the Haram, i\'tikaf in the final ten nights for those who plan it, and the kind of extended presence that shorter trips cannot offer.',
      'Availability is the constraint rather than price. Ramadan accommodation in both cities is booked many months ahead, and the last ten nights in particular are the most contested rooms of the year. Pilgrims planning a full-month Ramadan stay should confirm as early as possible.',
    ],
    bestFor: 'Full-month Ramadan stays and extended spiritual retreats',
  },
];

/* --------------------------------------------------------------- Special */
const special = [
  {
    slug: 'ramadan-umrah-packages',
    title: 'Ramadan Umrah Packages',
    h1: 'Ramadan Umrah Packages from Pakistan',
    metaTitle: 'Ramadan Umrah Packages from Pakistan | Last 10 Nights & Full Month',
    metaDescription:
      'Ramadan Umrah packages from Pakistan — first Ashra, last 10 nights and full month options with hotels near the Haram, flights, visa, transport and ziyarat included.',
    icon: 'mosque',
    lead: 'Ramadan in the Haramain is the most sought-after Umrah of the year — and the one that punishes late planning hardest.',
    intro: [
      'The reward for Umrah in Ramadan is why these departures sell out first. Demand concentrates on the last ten nights, when Laylatul Qadr is sought, and hotel rates in both cities rise steeply as the month progresses.',
      'We arrange three common formats: a first-Ashra package for travellers who want Ramadan in the Haram at a more accessible price, a last-ten-nights package for those specifically seeking the final Ashra, and a full-month package for pilgrims staying the entire Ramadan.',
      'The practical advice is the same every year and is worth repeating: book early. Rooms for the last ten nights are committed many months in advance, and pilgrims who wait for a better price generally end up paying more for a worse location, or not travelling at all.',
    ],
    options: [
      { title: 'First Ashra (Days 1–10)', text: 'Ramadan in the Haram at the most accessible rates of the month.' },
      { title: 'Middle Ashra (Days 11–20)', text: 'A balance of availability and atmosphere as the month builds.' },
      { title: 'Last 10 Nights', text: 'The most requested — and the first to sell out. Book many months ahead.' },
      { title: 'Full Month (28–30 nights)', text: 'The complete Ramadan, including taraweeh and the final Ashra.' },
    ],
    faqs: [
      { q: 'When should I book a Ramadan Umrah?', a: '<p>As early as you reasonably can — six months ahead is not excessive, and for the last ten nights, earlier still. Hotel inventory near both Harams for Ramadan is committed well in advance, and prices only move in one direction as the month approaches.</p>' },
      { q: 'Why are Ramadan packages more expensive?', a: '<p>Hotel rates in Makkah and Madinah rise sharply during Ramadan because demand vastly exceeds the rooms available near the Harams, and airfares rise alongside. The package price reflects those underlying costs rather than a premium we add.</p>' },
      { q: 'Is Umrah in Ramadan physically demanding?', a: '<p>It can be. Fasting, crowds, heat and long periods standing in prayer combine in a way that catches people out — particularly older pilgrims. Plan for rest during the day, stay hydrated in non-fasting hours, and choose a hotel close to the Haram if mobility is a concern.</p>' },
      { q: 'Can I perform i\'tikaf during the last ten nights?', a: '<p>Many pilgrims do. It requires planning around your accommodation and your group, and the Haram authorities manage access during the busiest nights. Tell us at the time of booking if this is your intention so we can advise on hotel choice and timings.</p>' },
    ],
  },
  {
    slug: 'family-umrah-packages',
    title: 'Family Umrah Packages',
    h1: 'Family Umrah Packages from Pakistan',
    metaTitle: 'Family Umrah Packages from Pakistan | Umrah with Children & Parents',
    metaDescription:
      'Family Umrah packages from Pakistan arranged around children and elderly parents — connecting rooms, hotels near the Haram, private transport and wheelchair assistance.',
    icon: 'users',
    lead: 'Travelling with children and elderly parents changes every decision — the hotel, the distance, the flights and the pace.',
    intro: [
      'A family Umrah is not an individual Umrah with more people attached. The constraints are different: a toddler who needs a nap, a mother who cannot manage a kilometre walk five times a day, a grandfather who needs a wheelchair for the tawaf, and a flight schedule that has to avoid a 3am departure with four children.',
      'We plan family packages backwards from those constraints. Hotel selection prioritises proximity over category, because a four-star hotel 200 metres away beats a five-star hotel 900 metres away when you are walking it with children. Rooms are arranged as family rooms or connecting doubles rather than splitting the group.',
      'We also arrange the practical support that families need and rarely think to ask for: wheelchair assistance at the airports and in the Haram, private vehicles rather than shared shuttles, meal plans so nobody is searching for food after Isha, and a ziyarat schedule paced for children and grandparents rather than for a tour operator.',
    ],
    options: [
      { title: 'Family Rooms & Connecting Doubles', text: 'Everyone on the same floor, children with parents.' },
      { title: 'Proximity Over Category', text: 'Hotels chosen for the walk to the Haram, not the star rating.' },
      { title: 'Wheelchair & Mobility Support', text: 'Airport assistance and wheelchair arrangements in both Harams.' },
      { title: 'Private Transport Throughout', text: 'No shared shuttles with tired children and luggage.' },
    ],
    faqs: [
      { q: 'What is the minimum age for children to travel for Umrah?', a: '<p>There is no minimum age — infants travel for Umrah regularly. What changes is the practical planning: infant fares and bassinets on flights, pram access, feeding and nap timing, and choosing a hotel close enough that a tired child can be taken back quickly. Tell us the ages at enquiry and we will plan accordingly.</p>' },
      { q: 'Can you arrange wheelchair assistance in the Haram?', a: '<p>Yes. Wheelchair assistance can be arranged at the airports, and wheelchairs are available at both Harams for tawaf and sa\'i, including pusher services. For pilgrims with significant mobility needs we recommend a hotel within the closest ring and a private vehicle rather than the shuttle.</p>' },
      { q: 'Do children need their own Umrah visa?', a: '<p>Yes — every traveller, including infants, needs their own valid passport and visa. Children should be included in the booking from the start rather than added later, as this affects room allocation, flight seating and the visa application.</p>' },
      { q: 'Are meals included for family packages?', a: '<p>They can be, and we usually recommend it for families. Buffet breakfast and dinner at the hotel removes a daily logistical problem — particularly after Isha, when finding a restaurant that suits everyone with tired children is nobody\'s idea of a good evening.</p>' },
    ],
  },
  {
    slug: 'group-umrah-packages',
    title: 'Group Umrah Packages',
    h1: 'Group Umrah Packages from Pakistan',
    metaTitle: 'Group Umrah Packages from Pakistan | Jamaat, Masjid & Corporate Groups',
    metaDescription:
      'Group Umrah packages from Pakistan for masjid jamaats, families, schools, madaris and corporate groups. Group airfares, block hotel bookings, coaches and a dedicated coordinator.',
    icon: 'users',
    lead: 'For masjid jamaats, extended families, madaris and workplace groups — group fares, block bookings and one coordinator handling the whole party.',
    intro: [
      'Group Umrah is a logistics exercise before it is anything else. Twenty or forty people mean one flight allocation rather than twenty separate bookings, a block of rooms in one hotel rather than a scatter across three, coaches rather than cars, and one person responsible for keeping the whole party together.',
      'We handle groups from ten upwards. Above that threshold airlines release group fares, which are usually held with a deposit and finalised closer to departure — this is what allows a group to confirm seats before every individual has paid. Hotels work similarly, with blocks held against a deposit.',
      'Each group is assigned a coordinator who manages the documentation collection, the visa applications, the rooming list, the flight manifest and the ground arrangements. For masjid and madrasah groups travelling with an ameer or a scholar, we work to their schedule for lectures and collective programmes.',
    ],
    options: [
      { title: 'Group Airfares', text: 'Ten passengers or more on one allocation, held with a deposit.' },
      { title: 'Block Hotel Bookings', text: 'The whole group in one hotel, on the same floors where possible.' },
      { title: 'Coaches & Group Transport', text: 'Vehicles sized to the party for transfers and ziyarat.' },
      { title: 'Dedicated Group Coordinator', text: 'One point of contact for documentation, rooming and ground logistics.' },
    ],
    faqs: [
      { q: 'What is the minimum group size?', a: '<p>Group fares from airlines generally begin at ten passengers travelling together on the same itinerary. Below that we can still book the party together, but on individual fares rather than a group allocation.</p>' },
      { q: 'Do you offer a free place for the group leader?', a: '<p>Arrangements of this kind depend on the group size and the airline allocation, and we discuss them openly at the quotation stage rather than advertising a blanket promise. Ask our team for the position on your specific group.</p>' },
      { q: 'How do you handle documents for a large group?', a: '<p>Your coordinator issues a single checklist and collects documents centrally, tracking who has submitted what. For masjid and institutional groups this is usually done through one nominated person on your side, which keeps the process manageable.</p>' },
      { q: 'Can the group travel together but stay in different hotel categories?', a: '<p>Yes. It is common for a group to share flights, transfers and ziyarat while individual families choose different room categories or hotels according to budget. We price it transparently so each family knows what they are paying for.</p>' },
    ],
  },
  {
    slug: 'umrah-visa',
    title: 'Umrah Visa',
    h1: 'Umrah Visa Assistance from Pakistan',
    metaTitle: 'Umrah Visa from Pakistan | Requirements, Documents & Process 2026',
    metaDescription:
      'Umrah visa assistance from Pakistan — requirements, documents, Nusuk registration, vaccination rules and processing times explained by Mazin Haramain Tours & Travels.',
    icon: 'passport',
    lead: 'The Umrah visa has moved almost entirely online, which has made it faster — and less forgiving of incomplete applications.',
    intro: [
      'Umrah travel from Pakistan is administered through the Saudi Ministry of Hajj and Umrah, whose Nusuk platform manages pilgrim registration, bookings and permits. Applications are submitted electronically, and the confirmed accommodation booking is part of what the application is assessed against — which is why a visa cannot sensibly be arranged in isolation from the package.',
      'The documentation itself is not complicated: a machine-readable passport with sufficient validity, photographs to specification, confirmed accommodation and flights, and vaccination records meeting the current requirements. What catches applicants out is detail — a passport expiring too soon, a photograph that fails the specification, a name spelled differently across documents, or vaccination records that are not in the accepted digital format.',
      'Pakistan now requires NADRA-integrated digital vaccination proof for outbound Hajj and Umrah travellers, covering the vaccinations mandated for pilgrims. Paper cards that were acceptable in previous seasons are no longer sufficient on their own. We check this as part of the file review, because it is currently the single most common reason a traveller is stopped at the airport rather than at the visa stage.',
    ],
    options: [
      { title: 'Document Review', text: 'Passport validity, photograph specification and name consistency checked before submission.' },
      { title: 'Nusuk Registration', text: 'Registration and booking confirmation on the Saudi Ministry of Hajj and Umrah platform.' },
      { title: 'Vaccination Compliance', text: 'NADRA-integrated digital vaccination records verified against current requirements.' },
      { title: 'Application & Tracking', text: 'Electronic submission and status updates until the visa is issued.' },
    ],
    faqs: [
      { q: 'What documents do I need for an Umrah visa?', a: '<p>A machine-readable passport with sufficient remaining validity, recent photographs meeting the required specification, confirmed accommodation and return flight bookings, your CNIC, and vaccination documentation in the currently accepted format. We issue a written checklist for your specific case, since requirements are adjusted between seasons.</p>' },
      { q: 'How long does the Umrah visa take?', a: '<p>When the file is complete and correct, processing is typically a few working days. During Ramadan and the peak seasons it takes longer, and applications submitted with errors take longer still because they have to be corrected and resubmitted. Allow a comfortable margin before your travel date.</p>' },
      { q: 'What vaccinations are required?', a: '<p>Meningococcal ACYW vaccination is required for pilgrims, and polio vaccination documentation is required of Pakistani passport holders. Pakistan has moved to NADRA-integrated digital vaccination proof for outbound Hajj and Umrah travellers. Because these requirements are updated regularly, we confirm the current position with you at the time of application — see our <a href="/travel-guides/nadra-vaccination-certificate-umrah-hajj/">vaccination guide</a>.</p>' },
      { q: 'Can I get an Umrah visa without booking a package?', a: '<p>In practice, no — the application is tied to confirmed accommodation and travel arrangements registered on the official platform. This is why Umrah visas are arranged as part of a package rather than as a standalone document service.</p>' },
      { q: 'How long can I stay on an Umrah visa?', a: '<p>The permitted duration is set by the Saudi authorities and has changed across recent seasons. Your visa will state the validity applicable to your issue — do not rely on what applied to a relative who travelled in a previous year.</p>' },
      { q: 'Can women travel for Umrah without a mahram?', a: '<p>Saudi rules on this have changed in recent years and are applied with conditions relating to age and travelling arrangements. Because it directly affects eligibility, we confirm the current position with you at the time of enquiry rather than publishing a rule that may date.</p>' },
    ],
  },
];

/* ----------------------------------------------------------------- Cities */
const cities = [
  { slug: 'umrah-packages-from-islamabad', city: 'Islamabad', airport: 'Islamabad International Airport (ISB)', note: 'Our head office is in Blue Area, a short drive from most of the city, so Islamabad and Rawalpindi clients are welcome to visit us in person to review options and submit documents.' },
  { slug: 'umrah-packages-from-rawalpindi', city: 'Rawalpindi', airport: 'Islamabad International Airport (ISB)', note: 'Rawalpindi pilgrims depart from the same airport as Islamabad. Our Blue Area office is easily reached from Saddar, Committee Chowk and the surrounding areas via the Metro Bus.' },
  { slug: 'umrah-packages-from-lahore', city: 'Lahore', airport: 'Allama Iqbal International Airport (LHE)', note: 'Lahore has strong direct connectivity to Jeddah and Madinah, which usually means shorter journeys and competitive fares for pilgrims departing from Punjab.' },
  { slug: 'umrah-packages-from-karachi', city: 'Karachi', airport: 'Jinnah International Airport (KHI)', note: 'Karachi offers the widest choice of carriers and the shortest flying time to Jeddah of any Pakistani departure city, which often produces the most competitive package pricing.' },
  { slug: 'umrah-packages-from-peshawar', city: 'Peshawar', airport: 'Bacha Khan International Airport (PEW)', note: 'Peshawar pilgrims can depart directly or connect via Islamabad, which is under two hours by road and frequently offers better fares and timings.' },
  { slug: 'umrah-packages-from-faisalabad', city: 'Faisalabad', airport: 'Faisalabad International Airport (LYP)', note: 'Faisalabad has seasonal direct services, and we regularly arrange departures via Lahore or Islamabad where the routing and fare work out better.' },
  { slug: 'umrah-packages-from-multan', city: 'Multan', airport: 'Multan International Airport (MUX)', note: 'Multan has direct services to Jeddah on several carriers, making it a practical departure point for pilgrims across south Punjab.' },
  { slug: 'umrah-packages-from-sialkot', city: 'Sialkot', airport: 'Sialkot International Airport (SKT)', note: 'Sialkot is well served for Gulf and Saudi routes and is a convenient departure point for pilgrims from Gujranwala, Gujrat and the surrounding districts.' },
];

/* --------------------------------------------- Shared inclusions / FAQs */
const standardIncludes = [
  'Umrah visa processing',
  'Return economy air ticket',
  'Hotel accommodation in Makkah',
  'Hotel accommodation in Madinah',
  'Airport transfers (Jeddah / Madinah)',
  'Makkah to Madinah intercity transport',
  'Ziyarat in Makkah and Madinah',
  'Zamzam water as per airline allowance',
  'Pre-departure briefing and travel documents',
  'WhatsApp support throughout your journey',
];

const standardExcludes = [
  'Meals unless specified in your package',
  'Personal expenses, shopping and gifts',
  'Travel insurance unless added to the package',
  'Excess baggage charges',
  'Qurbani, sadaqah and additional Umrah transport',
  'Any service not listed in your written confirmation',
];

const umrahFaqs = [
  { q: 'What is included in your Umrah packages?', a: '<p>Every package includes the Umrah visa, return airfare, hotel accommodation in both Makkah and Madinah, all airport and intercity transfers, and ziyarat in both cities. Meals are included in the premium and VIP tiers and can be added to others. Your written confirmation lists exactly what is and is not included before you pay anything.</p>' },
  { q: 'Can I customise a package?', a: '<p>Yes — most of our bookings are adjusted in some way. You can change the hotels, the number of nights in each city, the airline, the room category and the departure date. See our <a href="/umrah-packages/customized-umrah-packages/">customized Umrah packages</a>.</p>' },
  { q: 'How far in advance should I book?', a: '<p>For a standard departure, six to eight weeks gives comfortable margin for the visa and good hotel availability. For Ramadan, book several months ahead — the last ten nights in particular are committed very early and late bookings mean worse locations at higher prices.</p>' },
  { q: 'How much does an Umrah package cost from Pakistan?', a: '<p>It depends on the season, the hotel category, the distance from the Haram, the room sharing arrangement and the airfare at the time of booking — all of which move considerably through the year. Rather than publish a figure that would be out of date within weeks, we quote current pricing on request. Send us your dates and requirements and we will come back with real numbers.</p>' },
  { q: 'Do you arrange Umrah for elderly parents travelling alone?', a: '<p>Yes, and it is a common request. We arrange wheelchair assistance at the airports, hotels within the closest walking ring, private transfers rather than shared shuttles, and meal plans so they are not searching for food. Group departures with a coordinator are often the best option for parents travelling without family.</p>' },
  { q: 'What is the difference between economy and executive packages?', a: '<p>Principally hotel distance from the Haram and the number of people per room. Economy typically means quad or quint sharing with a shuttle to the Haram; executive means triple or quad sharing in a hotel within walking distance, usually with better flight timings.</p>' },
  { q: 'Do you provide transport between Makkah and Madinah?', a: '<p>Yes, intercity transport is included in every package. Depending on your group and preference this is either a private vehicle or the Haramain High Speed Railway, and we will advise which suits you better.</p>' },
  { q: 'Can I book Umrah through WhatsApp?', a: '<p>Yes. Many of our clients handle the entire process over WhatsApp — sending documents, receiving the quotation and confirming the booking. Message us on <a href="https://wa.me/923135500022" target="_blank" rel="noopener">0313 5500022</a> and a consultant will assist you.</p>' },
];

module.exports = {
  tiers, durations, special, cities,
  standardIncludes, standardExcludes, umrahFaqs, PRICE_NOTE,
};
