/* ==========================================================================
   Hotel reservation pages.
   These describe hotel ZONES and categories rather than claiming partnerships
   or publishing rates — accurate, useful, and safe to leave up all year.
   ========================================================================== */

const hotels = [
  {
    slug: 'makkah-hotels', city: 'Makkah', flag: '🕋', order: 1, featured: true,
    metaTitle: 'Hotels in Makkah Near Haram | Book Makkah Accommodation from Pakistan',
    metaDescription:
      'Book hotels in Makkah near Masjid al-Haram — Clock Tower, Jabal Omar, Ajyad and Kudai areas explained, with room categories, meal plans and distance guidance.',
    lead: 'In Makkah you are not really choosing a hotel. You are choosing a walk — and you will do it five times a day.',
    intro: [
      'Everything about a Makkah hotel comes back to distance from the Haram. A property 200 metres away and one 1,200 metres away may have identical star ratings and near-identical rooms, and be entirely different experiences for a pilgrim in their sixties walking it after Isha.',
      'The closest accommodation sits in the Abraj Al Bait complex directly facing the Haram, and in the Jabal Omar development on the opposite side — both within a few minutes\' walk of the mataf. The Ajyad and Misfalah areas sit in the next ring at roughly 500 metres to a kilometre, where value improves noticeably. Beyond that, the Kudai and Aziziyah districts are considerably cheaper and served by shuttle buses.',
      'When we quote a Makkah hotel we state the actual walking distance and whether a shuttle is provided, because that is the number that determines whether your Umrah is comfortable. Star ratings in this city tell you about the room. Distance tells you about the trip.',
    ],
    zones: [
      { name: 'Haram-facing (Clock Tower / Abraj Al Bait)', text: 'Direct access to the Haram, the shortest possible walk, and the highest rates of any accommodation in the city.' },
      { name: 'Jabal Omar', text: 'The development opposite the Haram — a short walk via escalators and walkways, with modern five-star properties.' },
      { name: 'Ajyad & Misfalah', text: 'Roughly 500m to 1km. The best balance of price and walking distance, popular with executive packages.' },
      { name: 'Kudai, Aziziyah & Shisha', text: 'Further out with shuttle service. The most economical option and the basis of most economy packages.' },
    ],
    considerations: [
      'Actual walking distance, not the "distance from Haram" a booking site quotes',
      'Whether a shuttle runs, how often, and whether it stops at night',
      'Room occupancy — double, triple, quad or quint',
      'Meal plan: room only, breakfast, half board or full board',
      'Lift capacity in the building during peak season',
      'Whether the rate is for the Haram-view side or the rear',
    ],
    faqs: [
      { q: 'How close should my Makkah hotel be?', a: '<p>If anyone in your group is elderly or has mobility difficulty, stay within about 500 metres. For fit travellers, a kilometre is manageable but you will feel it by the third day. Below 300 metres you are paying a significant premium for convenience that, for many pilgrims, is worth it.</p>' },
      { q: 'Is a Haram-view room worth the extra cost?', a: '<p>For most pilgrims, no — you will spend your time in the Haram itself rather than looking at it. For elderly travellers who cannot attend every prayer, being able to follow the Haram from the room can matter a great deal. It depends entirely on who is travelling.</p>' },
      { q: 'Are meals included in Makkah hotels?', a: '<p>It varies by hotel and by the package tier. Our premium and VIP packages include buffet breakfast and dinner as standard; other tiers can have meals added. We recommend a meal plan for families, as finding food after Isha with tired children is a daily problem otherwise.</p>' },
      { q: 'Can you book a Makkah hotel without a full package?', a: '<p>Yes, we book accommodation independently. Note that the Umrah visa itself is tied to confirmed accommodation registered on the official platform, so if you need the visa too, it is arranged together.</p>' },
    ],
  },
  {
    slug: 'madinah-hotels', city: 'Madinah', flag: '🕌', order: 2, featured: true,
    metaTitle: 'Hotels in Madinah Near Masjid an-Nabawi | Book from Pakistan',
    metaDescription:
      'Book hotels in Madinah near Masjid an-Nabawi — Central Zone (Markaziyah) explained, room categories, meal plans and walking distances for Pakistani pilgrims.',
    lead: 'Madinah is kinder than Makkah. The Central Zone puts almost everything within a short, level walk of the Masjid.',
    intro: [
      'Madinah\'s hotel geography is simpler and more forgiving. The Central Zone — Markaziyah — surrounds Masjid an-Nabawi on all sides, and most properties within it are between 100 and 500 metres from a gate. The ground is level, the walkways are wide and shaded, and the walk is pleasant rather than an exercise in endurance.',
      'The distinction that matters here is which side of the Masjid you are on. The northern Markaziyah is closest to the women\'s entrances and the Rawdah access routes, while the southern and eastern sides put you nearer to Bab as-Salam and Jannat al-Baqi. If your group includes women intending to visit the Rawdah, the northern side saves a considerable walk each time.',
      'Outside the Central Zone, rates fall sharply and shuttles operate. For pilgrims on longer stays who do not attend every prayer in the Masjid, this can be a sensible saving.',
    ],
    zones: [
      { name: 'Central Zone North (Markaziyah)', text: 'Closest to the women\'s entrances and Rawdah access routes. Usually the most convenient for families.' },
      { name: 'Central Zone South & East', text: 'Near Bab as-Salam and Jannat al-Baqi, within a few minutes of the Masjid.' },
      { name: 'Central Zone Outer Ring', text: 'Roughly 400 to 700 metres — good value with a short, level walk.' },
      { name: 'Outside Markaziyah', text: 'Shuttle-served and considerably cheaper, suited to longer stays and economy packages.' },
    ],
    considerations: [
      'Which side of the Masjid the hotel sits on',
      'Proximity to the women\'s entrances if applicable',
      'Walking distance to the nearest gate, not to the complex boundary',
      'Room occupancy and whether family rooms are available',
      'Meal plan and buffet timings around prayer',
      'Distance to Jannat al-Baqi for ziyarat',
    ],
    faqs: [
      { q: 'How far is the Central Zone from Masjid an-Nabawi?', a: '<p>Most Central Zone hotels are between 100 and 500 metres from a gate, on level ground with shaded walkways. It is a materially easier walk than the equivalent distance in Makkah.</p>' },
      { q: 'Which side of the Masjid should I stay on?', a: '<p>If women in your group intend to visit the Rawdah, the northern Markaziyah is closest to their entrances and saves a long walk each time. Otherwise the southern and eastern sides are equally convenient and often better value.</p>' },
      { q: 'How many nights should I spend in Madinah?', a: '<p>Five nights is the minimum most pilgrims find satisfying — enough for the Rawdah, the ziyarat sites and several prayers in the Masjid without rushing. Shorter stays are the most common regret we hear afterwards.</p>' },
      { q: 'Do Madinah hotels include meals?', a: '<p>Many offer buffet breakfast, and half board is widely available. Timings are generally arranged around prayer, which is worth confirming at booking if you are travelling with elderly family.</p>' },
    ],
  },
  {
    slug: 'dubai-hotels', city: 'Dubai', flag: '🇦🇪', order: 3,
    metaTitle: 'Dubai Hotel Booking from Pakistan | Deira, Marina & Downtown',
    metaDescription:
      'Book Dubai hotels from Pakistan — Deira, Bur Dubai, Downtown, Marina and JBR areas compared, with family rooms, halal dining and package rates.',
    lead: 'Dubai\'s hotel rates swing more by season than by star rating — the same room can double between August and December.',
    intro: [
      'Choosing where to stay in Dubai is mostly a question of what you want within walking distance. Downtown puts you at the Burj Khalifa and the Dubai Mall. Marina and JBR give you the beach and the promenade. Deira and Bur Dubai are the older, cheaper districts with the souks, the creek and the best value for families who intend to be out all day anyway.',
      'The bigger variable is season. Dubai hotel rates fall dramatically in the summer months and peak between November and March, and the difference for an identical room can be a factor of two or more. If your dates are flexible, that is the single largest saving available on a Dubai trip.',
      'We book alcohol-free and family-oriented properties for clients who ask, and can select hotels close to halal dining and mosques.',
    ],
    zones: [
      { name: 'Downtown & Business Bay', text: 'Burj Khalifa and Dubai Mall on your doorstep. Highest rates, best for a short sightseeing trip.' },
      { name: 'Dubai Marina & JBR', text: 'Beach, promenade and restaurants. The usual choice for honeymooners and longer stays.' },
      { name: 'Deira & Bur Dubai', text: 'The older districts — souks, the creek, and by far the best value for families.' },
      { name: 'Palm Jumeirah', text: 'Resort properties with private beaches. Premium rates, strong for honeymoon and family resorts.' },
    ],
    considerations: [
      'Season — summer rates are a fraction of winter rates',
      'Distance to the metro if you plan to move around independently',
      'Whether the property is alcohol-free, if that matters to you',
      'Family room and connecting room availability',
      'Breakfast inclusion, which varies widely',
      'Resort fees and tourism dirham charges',
    ],
    faqs: [
      { q: 'Which area is best for families?', a: '<p>Deira and Bur Dubai for value, Marina or JBR for the beach, Downtown if sightseeing is the priority. For families with young children, a beach property usually wins over a city-centre one.</p>' },
      { q: 'Are alcohol-free hotels available?', a: '<p>Yes, a number of properties are alcohol-free and market themselves accordingly. Tell us at enquiry and we will shortlist only those.</p>' },
      { q: 'When are Dubai hotels cheapest?', a: '<p>June to September, by a wide margin. It is hot, but everything of note is indoors and air-conditioned, and the savings are substantial.</p>' },
    ],
  },
  {
    slug: 'istanbul-hotels', city: 'Istanbul', flag: '🇹🇷', order: 4,
    metaTitle: 'Istanbul Hotel Booking from Pakistan | Sultanahmet & Taksim',
    metaDescription:
      'Book Istanbul hotels from Pakistan — Sultanahmet, Taksim, Şişli and Bosphorus areas compared for sightseeing, shopping and family travel.',
    lead: 'In Istanbul the district decides your trip: Sultanahmet for the monuments, Taksim for the shopping and the food.',
    intro: [
      'Sultanahmet is the historic peninsula — the Blue Mosque, Hagia Sophia, Topkapi and the Grand Bazaar all within walking distance of each other. Staying there means you step out of the hotel into the sightseeing, which for a short trip is the right trade.',
      'Taksim and Beyoğlu are the modern centre: İstiklal Avenue, the restaurants and the nightlife, better connected by metro to the rest of the city. Şişli and Mecidiyeköy sit near the big shopping malls and offer better value with a short metro ride to everything.',
      'For families staying five nights or more, splitting between Sultanahmet and Taksim is worth considering — it removes a lot of travel time and gives you two quite different experiences of the city.',
    ],
    zones: [
      { name: 'Sultanahmet', text: 'The historic peninsula — monuments on your doorstep. Best for short sightseeing trips.' },
      { name: 'Taksim & Beyoğlu', text: 'The modern centre with İstiklal Avenue, restaurants and metro connections.' },
      { name: 'Şişli & Mecidiyeköy', text: 'Near the shopping malls with good value and quick metro access.' },
      { name: 'Bosphorus & Ortaköy', text: 'Waterfront properties with views — premium rates, strong for honeymoons.' },
    ],
    considerations: [
      'Sultanahmet for monuments, Taksim for food and shopping',
      'Proximity to a metro or tram stop',
      'Whether the hotel has a lift — many historic buildings do not',
      'Family room availability in the older districts',
      'Breakfast inclusion, which is standard at most Turkish hotels',
      'Airport transfer distance — Istanbul Airport is a long way out',
    ],
    faqs: [
      { q: 'Sultanahmet or Taksim?', a: '<p>Sultanahmet if your priority is the historic sites and your trip is short. Taksim if you want food, shopping and better transport links. For five nights or more, consider splitting between the two.</p>' },
      { q: 'How far is Istanbul Airport from the city?', a: '<p>Istanbul Airport is a considerable distance from both Sultanahmet and Taksim, and transfer time varies heavily with traffic. Pre-booked transfers are worth arranging — see our <a href="/services/airport-transfers/">transfer service</a>.</p>' },
      { q: 'Is halal food an issue in Istanbul?', a: '<p>No. Turkey is a Muslim-majority country and halal food is the default throughout.</p>' },
    ],
  },
  {
    slug: 'baku-hotels', city: 'Baku', flag: '🇦🇿', order: 5,
    metaTitle: 'Baku Hotel Booking from Pakistan | Old City & Seafront Hotels',
    metaDescription:
      'Book Baku hotels from Pakistan — Old City (Icherisheher), Fountain Square and Caspian seafront areas compared, with family rooms and halal dining nearby.',
    lead: 'Central Baku is compact enough that almost anywhere inside the ring road puts you within walking distance of the Old City.',
    intro: [
      'Baku\'s centre is small and walkable. The Old City, Fountain Square and the Caspian seafront boulevard sit within a few hundred metres of each other, so a hotel anywhere in that zone puts the main sights on foot.',
      'Properties immediately around Fountain Square offer the best balance of location and value, while the seafront hotels carry a premium for the Caspian views. The Old City itself has a number of boutique properties inside the walls, which are atmospheric but often lack lifts and parking.',
      'Outside the centre, rates drop considerably, and the metro makes the centre accessible — a reasonable option for longer stays or larger groups.',
    ],
    zones: [
      { name: 'Icherisheher (Old City)', text: 'Boutique properties inside the walls — atmospheric, though often without lifts.' },
      { name: 'Fountain Square', text: 'The best balance of location and value, walking distance to everything central.' },
      { name: 'Caspian Seafront', text: 'Premium properties with sea views along the boulevard.' },
      { name: 'Outside the Centre', text: 'Noticeably cheaper with metro access — suited to longer stays and groups.' },
    ],
    considerations: [
      'Central Baku is walkable — location premiums are smaller than elsewhere',
      'Lift availability in Old City boutique hotels',
      'Proximity to halal restaurants, of which there are many',
      'Family and connecting room availability',
      'Airport transfer distance from Heydar Aliyev International',
      'Season — summer and Novruz are the busiest periods',
    ],
    faqs: [
      { q: 'Where should I stay in Baku?', a: '<p>Anywhere between Fountain Square and the seafront puts you within walking distance of the Old City and the boulevard. Fountain Square usually offers the best value for that location.</p>' },
      { q: 'Is halal food easy to find?', a: '<p>Yes. Azerbaijan is Muslim-majority and halal food is widely available, including Turkish and Pakistani restaurants in the centre.</p>' },
      { q: 'Are Baku hotels expensive?', a: '<p>Considerably less than western Europe for comparable quality, which is a large part of the destination\'s appeal.</p>' },
    ],
  },
  {
    slug: 'london-hotels', city: 'London', flag: '🇬🇧', order: 6,
    metaTitle: 'London Hotel Booking from Pakistan | Central London Accommodation',
    metaDescription:
      'Book London hotels from Pakistan — central areas compared, family rooms, halal dining nearby and transport links. Accommodation for visit visa applications.',
    lead: 'London hotel rooms are small and expensive. Choosing by transport links rather than by postcode is what makes a trip work.',
    intro: [
      'Two things surprise first-time visitors to London: how small the rooms are, and how much they cost. Accepting both, the way to choose well is by transport rather than by area prestige — a hotel two minutes from a tube station on a direct line beats a nominally better address with a fifteen-minute walk at each end.',
      'Areas around Paddington, Bayswater and Edgware Road are popular with travellers from Pakistan for the halal dining and the direct rail link from Heathrow. Kensington and Bloomsbury offer more space for the money than the West End. East London is cheaper again with good line connections.',
      'For visit visa applications, the hotel booking in your file needs to cover every night of the stated stay. Where you are staying with family for part of the trip, that portion is documented by your host instead.',
    ],
    zones: [
      { name: 'Paddington & Bayswater', text: 'Halal dining, the Heathrow rail link and good value for central London.' },
      { name: 'Kensington & South Kensington', text: 'The museums nearby and more room for the money than the West End.' },
      { name: 'Bloomsbury & King\'s Cross', text: 'Central, well connected, and convenient for onward rail travel.' },
      { name: 'East London', text: 'Cheaper with good tube connections — a sensible option for longer stays.' },
    ],
    considerations: [
      'Distance to the nearest tube station and which lines it serves',
      'Room size — London rooms are small by international standards',
      'Whether breakfast is included, as it often is not',
      'Family room availability, which is limited and books early',
      'Proximity to halal restaurants',
      'Full-stay coverage if the booking supports a visa application',
    ],
    faqs: [
      { q: 'Do I need a hotel booking for a UK visa?', a: '<p>Your application should evidence where you will stay for the whole visit. That can be hotel bookings, or your host\'s accommodation documentation where you are staying with family. See our <a href="/visa-services/uk-visa/">UK visa page</a>.</p>' },
      { q: 'Which area has the best halal food?', a: '<p>Edgware Road, Whitechapel and Southall are the best known, with good options around Bayswater and Green Street too. We can select a hotel near whichever suits your itinerary.</p>' },
      { q: 'Are London hotels expensive?', a: '<p>Yes, and rooms are small. Booking well ahead and choosing by transport links rather than by address is where the value is.</p>' },
    ],
  },
  {
    slug: 'europe-hotels', city: 'Europe', flag: '🇪🇺', order: 7,
    metaTitle: 'Europe Hotel Booking from Pakistan | Schengen Accommodation',
    metaDescription:
      'Book European hotels from Pakistan for tours and Schengen visa applications — confirmed bookings covering every night, city-centre locations and family rooms.',
    lead: 'For a Schengen application the hotel booking is not a detail — it is evidence, and it has to cover every night.',
    intro: [
      'European hotel bookings serve two purposes on a trip from Pakistan: the accommodation itself, and the documentary evidence in your visa file. Schengen applications require confirmed accommodation for the full duration of the stay, matching the itinerary you have described.',
      'This is where self-assembled applications frequently fail. Unconfirmed reservations, bookings that cover only part of the stay, or hotels in cities that do not appear on the stated itinerary all create inconsistencies the visa officer will notice.',
      'Because we book the trip and prepare the file together, the confirmations in your application are real bookings for the itinerary you are actually travelling. Where the itinerary spans several countries, we make sure the pattern of nights supports the main-destination mission you are applying to.',
    ],
    zones: [
      { name: 'City Centre', text: 'Walking distance to the sights — more expensive but saves daily transport time and cost.' },
      { name: 'Near Central Stations', text: 'Ideal for rail-based multi-city itineraries with luggage.' },
      { name: 'Airport Hotels', text: 'Useful for early departures on multi-country trips.' },
      { name: 'Apartments & Family Rooms', text: 'Better value for families and longer stays across several cities.' },
    ],
    considerations: [
      'Bookings must cover every night of the stated visa itinerary',
      'Consistency between hotel cities and the stated main destination',
      'Proximity to central stations for rail-based itineraries',
      'City tourist taxes, which are usually charged separately',
      'Family room availability, which is limited in older European hotels',
      'Breakfast inclusion, which varies by country and property',
    ],
    faqs: [
      { q: 'Do hotel bookings need to be confirmed for a Schengen visa?', a: '<p>Yes. The application requires confirmed accommodation covering the full duration of the stay, consistent with your stated itinerary. Unconfirmed or partial bookings weaken the file considerably.</p>' },
      { q: 'What if my plans change after the visa is issued?', a: '<p>Reasonable changes after issuance are normal and are not a problem in themselves. What matters is that the application you submitted reflected a genuine intended itinerary at the time.</p>' },
      { q: 'Can you book hotels across several countries?', a: '<p>Yes — multi-country itineraries are a core part of what we arrange, and we make sure the booking pattern supports the mission you are applying to.</p>' },
    ],
  },
  {
    slug: 'worldwide-hotels', city: 'Worldwide', flag: '🌍', order: 8,
    metaTitle: 'Worldwide Hotel Booking from Pakistan | Global Accommodation',
    metaDescription:
      'Worldwide hotel reservations from Pakistan — city hotels, beach resorts, apartments and corporate accommodation booked and confirmed by Mazin Haramain, Islamabad.',
    lead: 'If we are not listing the city, it does not mean we cannot book it — tell us where you are going.',
    intro: [
      'Beyond the destinations we describe in detail, we book accommodation worldwide: city hotels, beach resorts, serviced apartments and corporate accommodation, whether as part of a package or as a standalone reservation.',
      'Booking through us rather than an online platform is worth it in three situations in particular. When the reservation supports a visa application, you get a confirmation in the format the mission expects. When you are travelling as a family or a group, we can secure connecting rooms and confirm capacity rather than hoping. And when something goes wrong at the property, you have someone in Pakistan to call rather than an overseas helpline.',
      'For corporate clients we hold preferred property lists and consolidate accommodation onto a single monthly invoice — see our <a href="/corporate-travel/">corporate travel desk</a>.',
    ],
    zones: [
      { name: 'City Hotels', text: 'Business and leisure accommodation in any major city worldwide.' },
      { name: 'Beach & Island Resorts', text: 'Honeymoon and family resorts with board basis and transfers arranged.' },
      { name: 'Serviced Apartments', text: 'Better value for families and stays beyond a week.' },
      { name: 'Corporate Accommodation', text: 'Preferred properties, negotiated rates and consolidated billing.' },
    ],
    considerations: [
      'Confirmation format where the booking supports a visa application',
      'Connecting and family rooms confirmed rather than requested',
      'Board basis — room only, breakfast, half or full board',
      'Cancellation terms, which vary enormously by property',
      'Local taxes and resort fees charged at the property',
      'A contact in Pakistan if something goes wrong on arrival',
    ],
    faqs: [
      { q: 'Can you book any hotel worldwide?', a: '<p>In the great majority of cases, yes. Send us the city, your dates and your budget, and we will come back with options and confirmed rates.</p>' },
      { q: 'Why book through you instead of online?', a: '<p>Three reasons: confirmations in the format visa missions expect, connecting and family rooms actually confirmed rather than requested, and a local contact if something goes wrong at the property.</p>' },
      { q: 'Do you handle corporate accommodation?', a: '<p>Yes — preferred property lists, negotiated rates and consolidated monthly invoicing. See our <a href="/corporate-travel/">corporate travel page</a>.</p>' },
    ],
  },
];

module.exports = hotels;
