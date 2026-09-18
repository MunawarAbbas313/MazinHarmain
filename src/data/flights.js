/* ==========================================================================
   Flight route pages.
   "islamabad to jeddah flight" is one of the highest-intent searches a
   Pakistani travel agency can rank for, and a generic air-ticketing page
   never captures it. One page per route does.

   Deliberately no fares and no timetables: both change constantly and
   publishing them creates complaints. Carriers are listed as "airlines that
   commonly serve this route", flying times as approximate ranges, and every
   page sends the visitor to a live quotation.
   ========================================================================== */

const routes = [
  {
    slug: 'islamabad-to-jeddah',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'Jeddah', toCode: 'JED', toAirport: 'King Abdulaziz International Airport',
    category: 'umrah', featured: true,
    duration: 'approximately 4 to 5 hours direct',
    carriers: ['Saudia', 'Pakistan International Airlines', 'AirSial', 'flynas', 'Air Blue'],
    lead: 'The primary Umrah route from the capital, and the one we book most.',
    intro: [
      'Islamabad to Jeddah is the busiest Umrah sector we handle. Direct services operate on this route, which matters more than most travellers realise: a direct flight of four to five hours versus a connection through the Gulf can be the difference between arriving fit to perform Umrah the same evening and losing a day to recovery.',
      'Jeddah is the standard arrival airport for Umrah, with the drive to Makkah taking roughly an hour and a half. Many pilgrims prefer to fly into Jeddah, perform Umrah first, then travel on to Madinah and fly home from there — an open-jaw itinerary we can price either way.',
      'Baggage is the detail most people get wrong on this route. Umrah travellers almost always return heavier than they left, with Zamzam, dates and gifts. We confirm the checked allowance for both legs before ticketing, because the outbound and return allowances are not always the same.',
    ],
    notes: [
      'Direct services available — worth the premium for older pilgrims',
      'Zamzam is carried under a separate airline allowance, not your normal baggage',
      'Ihram is usually worn from Islamabad or changed into before the miqat announcement',
      'Peak fares in Ramadan and the weeks around Hajj; book several months ahead',
    ],
  },
  {
    slug: 'lahore-to-jeddah',
    from: 'Lahore', fromCode: 'LHE', fromAirport: 'Allama Iqbal International Airport',
    to: 'Jeddah', toCode: 'JED', toAirport: 'King Abdulaziz International Airport',
    category: 'umrah', featured: true,
    duration: 'approximately 4.5 to 5.5 hours direct',
    carriers: ['Saudia', 'Pakistan International Airlines', 'AirSial', 'flynas'],
    lead: 'Strong direct connectivity from Punjab, and often the most competitive Umrah fares.',
    intro: [
      'Lahore has solid direct service to Jeddah, which makes it the departure point of choice for pilgrims across central and northern Punjab. Fares on this sector are frequently competitive with Islamabad and occasionally better, so it is worth comparing both if you can reach either airport.',
      'For families travelling from Gujranwala, Sialkot, Faisalabad and Sheikhupura, Lahore is usually the practical choice even where a closer airport has a seasonal service, simply because the frequency and the routing options are better.',
      'We quote Lahore and Islamabad side by side when the difference is material, including the cost of getting to the airport, so you can see the real total rather than just the airfare.',
    ],
    notes: [
      'Direct services operate on this sector',
      'Often price-competitive with Islamabad — worth comparing both',
      'Convenient for Gujranwala, Sialkot, Faisalabad and Sheikhupura',
      'Group allocations available for ten passengers or more',
    ],
  },
  {
    slug: 'karachi-to-jeddah',
    from: 'Karachi', fromCode: 'KHI', fromAirport: 'Jinnah International Airport',
    to: 'Jeddah', toCode: 'JED', toAirport: 'King Abdulaziz International Airport',
    category: 'umrah', featured: true,
    duration: 'approximately 3.5 to 4.5 hours direct',
    carriers: ['Saudia', 'Pakistan International Airlines', 'Serene Air', 'flynas', 'flyadeal'],
    lead: 'The shortest flying time to Jeddah from anywhere in Pakistan.',
    intro: [
      'Karachi is geographically closest to Jeddah, and the flying time reflects it — commonly around three and a half to four and a half hours direct. It also has the widest choice of carriers of any Pakistani departure city, which tends to keep fares keen.',
      'For pilgrims in Sindh and Balochistan this is the obvious departure point. It is also worth considering for travellers elsewhere in Pakistan during peak season, when a domestic connection to Karachi plus a shorter international leg occasionally prices better than a direct flight from a northern city.',
      'The shorter sector has a practical benefit beyond cost: less time in the air means less fatigue, which matters when you intend to perform Umrah soon after landing.',
    ],
    notes: [
      'Shortest flying time to Jeddah from Pakistan',
      'Widest choice of carriers, which helps fares',
      'Practical for pilgrims across Sindh and Balochistan',
      'Less in-flight fatigue before performing Umrah',
    ],
  },
  {
    slug: 'islamabad-to-madinah',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'Madinah', toCode: 'MED', toAirport: 'Prince Mohammad Bin Abdulaziz International Airport',
    category: 'umrah', featured: true,
    duration: 'approximately 4.5 to 5.5 hours direct',
    carriers: ['Saudia', 'Pakistan International Airlines', 'flynas'],
    lead: 'Fly into Madinah first — a gentler start to the journey, and often the better itinerary.',
    intro: [
      'Flying into Madinah rather than Jeddah is an itinerary many experienced pilgrims prefer, and one we recommend more often than most agencies do. Madinah is calmer, the airport is smaller and quicker to clear, and the hotel is usually a short drive from arrivals rather than an hour and a half away.',
      'Starting in Madinah also lets you rest and acclimatise before entering ihram, then travel on to Makkah to perform Umrah. Pilgrims arriving from a long flight frequently find this sequence considerably easier than landing at Jeddah and going straight into tawaf.',
      'The route can be flown as a return, or combined open-jaw with a Jeddah departure. We price both so you can compare properly, including the intercity transport in each case.',
    ],
    notes: [
      'Faster arrival formalities than Jeddah in most cases',
      'Hotel transfer is short — Madinah airport is close to the Central Zone',
      'Allows rest before entering ihram for Umrah',
      'Can be combined open-jaw with a Jeddah return',
    ],
  },
  {
    slug: 'islamabad-to-dubai',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'Dubai', toCode: 'DXB', toAirport: 'Dubai International Airport',
    category: 'leisure', featured: true,
    duration: 'approximately 2.5 to 3 hours direct',
    carriers: ['Emirates', 'flydubai', 'Pakistan International Airlines', 'AirSial', 'Air Blue'],
    lead: 'High frequency, short hop, and the easiest international trip to arrange from the capital.',
    intro: [
      'Islamabad to Dubai is one of the most frequently served international routes from Pakistan, with multiple daily departures across several carriers. Flying time is under three hours, which makes even a long weekend viable.',
      'The frequency is what makes this route flexible. If a schedule change or a delay affects you, there is usually another option the same day — which is not true of most long-haul sectors. It also means fares vary widely by time of day and day of week, so a small change to your dates can save a meaningful amount.',
      'We arrange the UAE visa alongside the ticket, and it is issued electronically in a matter of days. See our <a href="/visa-services/uae-visa/">UAE visa page</a> and our <a href="/destinations/dubai/">Dubai packages</a>.',
    ],
    notes: [
      'Multiple daily departures across several airlines',
      'Under three hours — a long weekend is realistic',
      'UAE visa arranged alongside the ticket',
      'Popular as a stopover on the return from Umrah',
    ],
  },
  {
    slug: 'lahore-to-dubai',
    from: 'Lahore', fromCode: 'LHE', fromAirport: 'Allama Iqbal International Airport',
    to: 'Dubai', toCode: 'DXB', toAirport: 'Dubai International Airport',
    category: 'leisure',
    duration: 'approximately 3 to 3.5 hours direct',
    carriers: ['Emirates', 'flydubai', 'Pakistan International Airlines', 'AirSial'],
    lead: 'Frequent direct service from Punjab, for both leisure and business travel.',
    intro: [
      'Lahore to Dubai is well served by both full-service and low-cost carriers, giving a wide spread of fares and departure times. The route carries a mix of leisure travellers, families visiting relatives in the UAE, and a steady stream of business traffic.',
      'For business travellers the morning departures allow a same-day meeting in Dubai, and the late evening returns make a one-night trip practical. For families, the low-cost options can be considerably cheaper if you can travel with cabin baggage only or pay for a specific allowance.',
      'We explain the baggage economics clearly on this route, because the headline fare on a low-cost carrier can end up higher than the full-service fare once checked bags are added for a family.',
    ],
    notes: [
      'Both full-service and low-cost carriers operate',
      'Morning out, late evening back makes a day trip possible',
      'Check baggage costs before comparing low-cost fares',
      'UAE visa arranged with the booking',
    ],
  },
  {
    slug: 'karachi-to-dubai',
    from: 'Karachi', fromCode: 'KHI', fromAirport: 'Jinnah International Airport',
    to: 'Dubai', toCode: 'DXB', toAirport: 'Dubai International Airport',
    category: 'leisure',
    duration: 'approximately 2 to 2.5 hours direct',
    carriers: ['Emirates', 'flydubai', 'Pakistan International Airlines', 'Serene Air', 'AirSial'],
    lead: 'The shortest international flight from Pakistan, with departures throughout the day.',
    intro: [
      'At around two hours, Karachi to Dubai is the shortest international sector from Pakistan and among the busiest. Departures run throughout the day across several carriers, and the route functions almost like a shuttle for business travellers.',
      'It is also the most common first international trip for families from Sindh. The short flight, the electronic visa and the familiarity of Dubai make it a gentle introduction to travelling abroad, particularly with young children.',
      'Because frequency is so high, this is one of the few routes where last-minute travel is usually possible without an extreme fare — useful for urgent business or family matters.',
    ],
    notes: [
      'Around two hours — the shortest international sector from Pakistan',
      'Departures throughout the day',
      'Last-minute travel is usually feasible',
      'Good first international trip for families',
    ],
  },
  {
    slug: 'islamabad-to-istanbul',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'Istanbul', toCode: 'IST', toAirport: 'Istanbul Airport',
    category: 'leisure', featured: true,
    duration: 'approximately 6 to 7 hours direct',
    carriers: ['Turkish Airlines', 'Pakistan International Airlines'],
    lead: 'Direct service to Turkey, and a gateway onward to Europe.',
    intro: [
      'Islamabad to Istanbul is served directly, and the six to seven hour flight puts Turkey within comfortable reach for a week-long holiday. Istanbul Airport is also one of the best-connected hubs in the world, which makes this the natural routing for onward travel into Europe, the UK and North America.',
      'For travellers heading to Europe, an Istanbul connection is often both cheaper and more comfortable than a Gulf routing, simply because the first leg is shorter and the transit is usually briefer. It also opens the option of a stopover — a few days in Istanbul on the way to or from your main destination, at little or no extra airfare.',
      'Note that Istanbul Airport is a considerable distance from the city centre. If you are stopping over, pre-book the <a href="/services/airport-transfers/">transfer</a> rather than arranging it on arrival.',
    ],
    notes: [
      'Direct service — six to seven hours',
      'Strong onward connections to Europe, the UK and North America',
      'Stopover in Istanbul often available at little extra airfare',
      'Turkey visa required — see our Turkey visa page',
    ],
  },
  {
    slug: 'islamabad-to-london',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'London', toCode: 'LHR', toAirport: 'London Heathrow / Gatwick',
    category: 'family', featured: true,
    duration: 'approximately 8 to 9 hours direct, 11 to 16 hours via a hub',
    carriers: ['British Airways', 'Pakistan International Airlines', 'Emirates', 'Qatar Airways', 'Etihad Airways', 'Turkish Airlines'],
    lead: 'The busiest family-visit route from Pakistan, direct or via a Gulf or Istanbul hub.',
    intro: [
      'Islamabad to London carries an enormous volume of family travel, and the choice is essentially between a direct flight and a connection. Direct is quicker and easier, particularly with children or elderly parents. A connection via Dubai, Doha, Abu Dhabi or Istanbul usually costs less and sometimes considerably less.',
      'The variable people underestimate is transit length. A four-hour connection is manageable; a nine-hour overnight transit with a family is punishing, and the saving rarely justifies it. We show you the transit times explicitly alongside the fares so the comparison is honest.',
      'This route is also where the visa matters most. A UK visit visa is the harder part of the trip, not the flight — see our <a href="/visa-services/uk-visa/">UK visa page</a> and our <a href="/travel-guides/uk-visit-visa-guide-from-pakistan/">application guide</a>. We generally advise against non-refundable tickets before the visa is issued.',
    ],
    notes: [
      'Direct and connecting options — we show transit times, not just fares',
      'Heathrow and Gatwick both served; confirm which suits your onward travel',
      'Do not buy non-refundable tickets before the visa is issued',
      'Baggage allowances vary widely between carriers on this route',
    ],
  },
  {
    slug: 'lahore-to-london',
    from: 'Lahore', fromCode: 'LHE', fromAirport: 'Allama Iqbal International Airport',
    to: 'London', toCode: 'LHR', toAirport: 'London Heathrow / Gatwick',
    category: 'family',
    duration: 'approximately 8.5 to 9.5 hours direct, 12 to 17 hours via a hub',
    carriers: ['British Airways', 'Pakistan International Airlines', 'Emirates', 'Qatar Airways', 'Etihad Airways'],
    lead: 'Heavy family-visit traffic from Punjab, with both direct and connecting options.',
    intro: [
      'Lahore to London is dominated by family travel, with a long-established community connection between Punjab and cities across the UK. Direct services operate, alongside a wide choice of Gulf connections.',
      'Because so much of this traffic is families visiting relatives, baggage tends to matter more here than on almost any other route — people carry gifts out and bring goods back. Comparing fares without comparing the checked allowance is how travellers end up paying excess baggage at the counter.',
      'If your final destination is Birmingham, Manchester or Glasgow rather than London, tell us. A connection routed through a different UK entry point is sometimes cheaper and almost always shorter overall than flying to London and travelling on by rail.',
    ],
    notes: [
      'Direct and Gulf-connection options available',
      'Compare checked baggage allowances, not just fares',
      'Birmingham, Manchester or Glasgow may route better than London',
      'UK visit visa required — plan the timeline around it',
    ],
  },
  {
    slug: 'islamabad-to-kuala-lumpur',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'Kuala Lumpur', toCode: 'KUL', toAirport: 'Kuala Lumpur International Airport',
    category: 'leisure',
    duration: 'approximately 7 to 8 hours direct, 11 to 15 hours via a hub',
    carriers: ['Malaysia Airlines', 'Pakistan International Airlines', 'Emirates', 'Thai Airways', 'Sri Lankan Airlines'],
    lead: 'The most comfortable long-haul family destination from Pakistan.',
    intro: [
      'Kuala Lumpur is the destination we most often recommend to families making a first long-haul trip, and the route is served both directly and through Gulf and South Asian hubs. Flying time is around seven to eight hours direct.',
      'Malaysia works so well for Pakistani families because the friction is low at the far end: an electronic visa, halal food as the default rather than the exception, widespread English, and a currency that goes a long way. The flight is the hardest part of the trip, and it is not very hard.',
      'The route also connects onward to Thailand, Singapore and Indonesia, which makes a two-country itinerary straightforward. See our <a href="/destinations/malaysia/">Malaysia packages</a>.',
    ],
    notes: [
      'Direct and connecting options',
      'Electronic visa — straightforward for Pakistani passport holders',
      'Combines easily with Thailand or Singapore',
      'Halal food and prayer facilities everywhere',
    ],
  },
  {
    slug: 'islamabad-to-baku',
    from: 'Islamabad', fromCode: 'ISB', fromAirport: 'Islamabad International Airport',
    to: 'Baku', toCode: 'GYD', toAirport: 'Heydar Aliyev International Airport',
    category: 'leisure',
    duration: 'approximately 4 to 5 hours direct, 8 to 13 hours via a hub',
    carriers: ['Azerbaijan Airlines', 'Pakistan International Airlines', 'Emirates', 'Turkish Airlines', 'Qatar Airways'],
    lead: 'Short-haul Europe-feel travel with one of the easiest visas available to Pakistani passports.',
    intro: [
      'Baku has grown quickly as a destination for Pakistani travellers, and the route from Islamabad is short enough — four to five hours where flown directly — to make a five or six night trip worthwhile without a punishing journey at either end.',
      'The appeal is the combination: European-style architecture and a Caspian seafront, mountain excursions within a few hours\' drive, costs well below western Europe, and an electronic visa that is among the simplest available to Pakistani passport holders.',
      'Azerbaijan also pairs naturally with Turkey on a single itinerary — Istanbul and Baku are a short hop apart, and it is one of our most-booked two-country formats. See our <a href="/destinations/azerbaijan/">Azerbaijan packages</a>.',
    ],
    notes: [
      'Direct service available; connections via Istanbul or the Gulf',
      'ASAN e-Visa is quick and straightforward',
      'Pairs well with Istanbul on one itinerary',
      'Halal food widely available',
    ],
  },
];

const featured = routes.filter((r) => r.featured);

const byCategory = {
  umrah: routes.filter((r) => r.category === 'umrah'),
  leisure: routes.filter((r) => r.category === 'leisure'),
  family: routes.filter((r) => r.category === 'family'),
};

/* Shared FAQs for every route page. */
const routeFaqs = [
  {
    q: 'Do you publish flight prices?',
    a: '<p>No, and no honest agency can. Airfares change several times a day with demand, seat availability and fare class, so a published price would be wrong within hours. Send us your dates and we will quote the live fare, with the baggage allowance and fare rules stated in writing before you pay.</p>',
  },
  {
    q: 'Is a direct flight worth the extra cost?',
    a: '<p>Often, yes — particularly with elderly parents, young children, or where you intend to perform Umrah soon after landing. A connection with a long overnight transit can consume the better part of two days. We show you the transit times next to the fares so you can judge for yourself rather than discovering it on the itinerary.</p>',
  },
  {
    q: 'How far in advance should I book?',
    a: '<p>For ordinary travel, six to ten weeks usually finds a reasonable fare. For Ramadan, Hajj season, the summer holidays and the December peak, book several months ahead — on those dates the cheap fare classes sell out first and the price only moves upward.</p>',
  },
  {
    q: 'What baggage allowance will I get?',
    a: '<p>It depends on the airline, the fare class and sometimes the direction of travel. We confirm the checked and cabin allowance for both legs in writing before ticketing, because the outbound and return are not always the same — a detail that catches out a lot of Umrah travellers on the way home.</p>',
  },
  {
    q: 'Can I change or refund the ticket?',
    a: '<p>That is set by the fare rules of the specific ticket, which we explain before issuing. Promotional fares are usually non-refundable and carry change fees; flexible fares cost more but can be amended. If a visa is pending, tell us — we will advise on how to limit your exposure.</p>',
  },
  {
    q: 'Do you handle group bookings on this route?',
    a: '<p>Yes. Airlines release group fares from around ten passengers travelling together, generally held with a deposit and finalised closer to departure. See our <a href="/umrah-packages/group-umrah-packages/">group travel arrangements</a>.</p>',
  },
];

module.exports = { routes, featured, byCategory, routeFaqs };
