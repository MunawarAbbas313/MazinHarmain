/* ==========================================================================
   International tour destinations.
   Each generates a destination landing page with sample itineraries. Prices
   stay on request so the admin can move them without a code change.
   ========================================================================== */

const destinations = [
  {
    slug: 'turkey', name: 'Turkey', flag: '🇹🇷', region: 'Europe / Asia', order: 3, featured: true,
    tagline: 'Istanbul, Cappadocia and the Turquoise Coast',
    metaTitle: 'Turkey Tour Packages from Pakistan | Istanbul & Cappadocia Tours',
    metaDescription:
      'Turkey tour packages from Pakistan — Istanbul, Cappadocia, Bursa and Antalya with flights, hotels, transfers, guided tours and visa assistance. Enquire for current rates.',
    lead: 'The most requested holiday destination for Pakistani travellers, and with good reason — Istanbul alone justifies the trip.',
    intro: [
      'Turkey works for almost every kind of traveller. Istanbul offers the Blue Mosque, Hagia Sophia, Topkapi Palace and the Grand Bazaar within walking distance of each other, alongside a Bosphorus cruise that remains the single most photographed hour of most people\'s trip. For Pakistani families, the familiarity of the food, the ease of halal dining and the widespread understanding of Urdu among traders make it an unusually comfortable first trip to Europe.',
      'Beyond Istanbul, Cappadocia\'s fairy chimneys and hot air balloons draw travellers for two or three nights, Bursa offers the ski slopes of Uludağ and the historic Ottoman quarter, and the southern coast at Antalya and Bodrum provides the beach portion for those wanting a longer trip.',
      'Turkey also combines naturally with Azerbaijan for a two-country itinerary, which is one of our most booked formats — a week split between Istanbul and Baku, with a short flight between them.',
    ],
    highlights: ['Blue Mosque and Hagia Sophia', 'Bosphorus dinner cruise', 'Cappadocia hot air balloons', 'Topkapi Palace and Grand Bazaar', 'Bursa and Uludağ', 'Antalya beaches'],
    packages: [
      { title: '5 Nights Istanbul', nights: 5, text: 'Istanbul city tour, Bosphorus cruise, Asian side and Grand Bazaar.' },
      { title: '7 Nights Istanbul & Cappadocia', nights: 7, text: 'Four nights Istanbul, three in Cappadocia with a balloon ride option.' },
      { title: '9 Nights Turkey Grand Tour', nights: 9, text: 'Istanbul, Cappadocia, Bursa and Antalya with internal flights.' },
      { title: '10 Nights Turkey & Azerbaijan', nights: 10, text: 'Istanbul and Baku combined, with the short connecting flight included.' },
    ],
    bestTime: 'April to June and September to November. July and August are hot and busy; winter suits Bursa skiing and lower prices in Istanbul.',
    visaUrl: '/visa-services/turkey-visa/',
    faqs: [
      { q: 'Do Pakistani travellers need a visa for Turkey?', a: '<p>Yes. Turkey requires a visa for Pakistani passport holders, obtained either through the consulate or, where the specific eligibility conditions are met, through the electronic system. See our <a href="/visa-services/turkey-visa/">Turkey visa page</a>.</p>' },
      { q: 'Is Turkey suitable for families with children?', a: '<p>Very much so. Distances within Istanbul are manageable, halal food is universal, and the major sites are close together. Cappadocia\'s balloon rides have minimum age requirements, so check before booking if you are travelling with young children.</p>' },
      { q: 'How many days do I need for Turkey?', a: '<p>Five nights covers Istanbul properly. Seven lets you add Cappadocia without rushing. Nine or more allows the coast or Bursa as well. Fewer than four nights means spending a disproportionate share of the trip in transit.</p>' },
    ],
  },
  {
    slug: 'azerbaijan', name: 'Azerbaijan', flag: '🇦🇿', region: 'Caucasus', order: 5, featured: true,
    tagline: 'Baku, Gabala and the Caucasus mountains',
    metaTitle: 'Azerbaijan Tour Packages from Pakistan | Baku Tours & e-Visa',
    metaDescription:
      'Baku and Azerbaijan tour packages from Pakistan with flights, hotels, transfers, city tours, Gabala excursions and e-Visa assistance from Mazin Haramain, Islamabad.',
    lead: 'Baku offers European architecture, Caspian seafront and mountain excursions — with one of the simplest visa processes available to Pakistani travellers.',
    intro: [
      'Azerbaijan\'s rise as a destination for Pakistani travellers has been rapid, and the reasons are practical: a straightforward electronic visa, short flying time, costs well below western Europe, and a capital that genuinely looks the part. Baku\'s Old City sits beneath the Flame Towers, and the seafront boulevard along the Caspian is among the most pleasant city walks anywhere in the region.',
      'Outside the capital, Gabala offers cable cars and mountain scenery, Guba is known for its waterfalls and orchards, and Sheki preserves an eighteenth-century palace and a caravanserai still operating as a hotel. Most itineraries pair three or four nights in Baku with a night or two in the mountains.',
      'Azerbaijan is also the natural second leg of a Turkey trip, and the overland route to Georgia makes a three-country Caucasus itinerary straightforward for travellers with more time.',
    ],
    highlights: ['Baku Old City and Maiden Tower', 'Flame Towers and Highland Park', 'Caspian seafront boulevard', 'Gabala cable car', 'Guba waterfalls', 'Sheki Khan\'s Palace'],
    packages: [
      { title: '4 Nights Baku', nights: 4, text: 'City tour, Old City, Flame Towers and the Absheron peninsula.' },
      { title: '6 Nights Baku & Gabala', nights: 6, text: 'Four nights Baku and two in the mountains at Gabala.' },
      { title: '8 Nights Grand Azerbaijan', nights: 8, text: 'Baku, Gabala, Guba and Sheki with private transport throughout.' },
      { title: '10 Nights Turkey & Azerbaijan', nights: 10, text: 'Istanbul and Baku combined on one itinerary.' },
    ],
    bestTime: 'April to June and September to October. Summer is warm but pleasant in the mountains; winter is cold with snow in Gabala.',
    visaUrl: '/visa-services/azerbaijan-visa/',
    faqs: [
      { q: 'How difficult is the Azerbaijan visa?', a: '<p>It is among the easiest available to Pakistani travellers — an electronic application through the ASAN system with light documentation and quick processing. Accuracy at submission is the main thing that matters. See our <a href="/visa-services/azerbaijan-visa/">Azerbaijan visa page</a>.</p>' },
      { q: 'Is halal food available in Baku?', a: '<p>Yes. Azerbaijan is a Muslim-majority country and halal food is widely available, including Turkish and Pakistani restaurants in central Baku.</p>' },
      { q: 'Can I combine Baku with Turkey or Georgia?', a: '<p>Both are common. Istanbul to Baku is a short flight and one of our most booked combinations. Tbilisi is reachable overland or by a short flight for a three-country Caucasus itinerary.</p>' },
    ],
  },
  {
    slug: 'dubai', name: 'Dubai & UAE', flag: '🇦🇪', region: 'Middle East', order: 4, featured: true,
    tagline: 'Burj Khalifa, desert safari and the Gulf coast',
    metaTitle: 'Dubai Tour Packages from Pakistan | UAE Holidays & Visa',
    metaDescription:
      'Dubai tour packages from Pakistan with flights, hotels, visa, desert safari, Burj Khalifa tickets and city tours. Family and honeymoon packages from Islamabad.',
    lead: 'The shortest international flight from Pakistan that still feels like a proper holiday — and the easiest visa of any major destination.',
    intro: [
      'Dubai remains the default first international trip for a large share of Pakistani families, and the logic is hard to argue with: under three hours in the air, an electronic visa issued in days, and enough to fill four or five days without a long transfer anywhere.',
      'The standard itinerary covers the Burj Khalifa observation decks, the Dubai Mall and fountain, a desert safari with dinner, the Marina and JBR waterfront, Global Village in season, and a day trip to Abu Dhabi for the Sheikh Zayed Grand Mosque. Families add IMG Worlds or Atlantis Aquaventure; honeymooners add a dhow cruise and a beach hotel.',
      'Dubai also works as a stopover. Pilgrims returning from Umrah frequently add two or three nights in Dubai on the way home, which is straightforward to arrange as part of the same booking.',
    ],
    highlights: ['Burj Khalifa observation deck', 'Desert safari with BBQ dinner', 'Dubai Marina and JBR', 'Sheikh Zayed Grand Mosque, Abu Dhabi', 'Dubai Mall and fountain show', 'Palm Jumeirah and Atlantis'],
    packages: [
      { title: '4 Nights Dubai Explorer', nights: 4, text: 'City tour, Burj Khalifa, desert safari and dhow cruise.' },
      { title: '5 Nights Dubai & Abu Dhabi', nights: 5, text: 'Dubai highlights plus a full day in Abu Dhabi.' },
      { title: '6 Nights Dubai Family', nights: 6, text: 'Theme parks, aquarium and beach time alongside the city tour.' },
      { title: '3 Nights Umrah Stopover', nights: 3, text: 'Added to your Umrah return — hotel, transfers and a city tour.' },
    ],
    bestTime: 'November to March for comfortable temperatures. Summer is very hot but hotel rates fall sharply.',
    visaUrl: '/visa-services/uae-visa/',
    faqs: [
      { q: 'How long does the Dubai visa take?', a: '<p>UAE tourist visas are issued electronically, usually within a few working days when documents are in order. See our <a href="/visa-services/uae-visa/">UAE visa page</a>.</p>' },
      { q: 'Can I add Dubai to my Umrah trip?', a: '<p>Yes, and many clients do. A two or three night Dubai stopover on the return leg is straightforward to arrange with the flights, hotel and visa handled as part of the same booking.</p>' },
      { q: 'Is Dubai expensive?', a: '<p>It varies enormously by season and hotel choice. Summer rates are a fraction of winter rates for the same properties. Tell us your budget and we will build the itinerary to fit rather than quoting a single fixed package.</p>' },
    ],
  },
  {
    slug: 'malaysia', name: 'Malaysia', flag: '🇲🇾', region: 'Southeast Asia', order: 8, featured: true,
    tagline: 'Kuala Lumpur, Langkawi and Penang',
    metaTitle: 'Malaysia Tour Packages from Pakistan | Kuala Lumpur & Langkawi',
    metaDescription:
      'Malaysia tour packages from Pakistan — Kuala Lumpur, Langkawi, Penang and Genting with flights, hotels, transfers, tours and visa assistance from Islamabad.',
    lead: 'Familiar food, easy visas, halal everywhere and beaches an hour from the capital — Malaysia is the most comfortable long-haul family destination from Pakistan.',
    intro: [
      'Malaysia is the destination we recommend most often to families making their first long-haul trip. The practical friction is low: an electronic visa, direct and one-stop flights, halal food as the default rather than the exception, and a level of English that makes getting around straightforward.',
      'Kuala Lumpur covers the Petronas Towers, Batu Caves, the Sunway and Genting attractions and excellent shopping. Langkawi provides the beach and island-hopping portion with a cable car and duty-free status, while Penang adds heritage architecture and what is generally agreed to be the best street food in the country.',
      'Malaysia also anchors multi-country trips: Singapore is a short hop, and Thailand is an easy addition for travellers with ten days or more.',
    ],
    highlights: ['Petronas Twin Towers', 'Batu Caves', 'Genting Highlands', 'Langkawi Sky Bridge and island hopping', 'Penang heritage quarter', 'Sunway Lagoon'],
    packages: [
      { title: '5 Nights Kuala Lumpur', nights: 5, text: 'City tour, Batu Caves, Genting and Putrajaya.' },
      { title: '7 Nights KL & Langkawi', nights: 7, text: 'Four nights in the capital and three on the island.' },
      { title: '9 Nights Malaysia Complete', nights: 9, text: 'Kuala Lumpur, Langkawi and Penang with internal flights.' },
      { title: '10 Nights Malaysia & Singapore', nights: 10, text: 'Both countries on one itinerary — separate visas required.' },
    ],
    bestTime: 'Year-round. March to October is driest on the west coast; November to February brings more rain but lower rates.',
    visaUrl: '/visa-services/malaysia-visa/',
    faqs: [
      { q: 'Is Malaysia good for families?', a: '<p>It is among the best. Halal food is universal, prayer facilities are everywhere, distances are manageable, and there is enough variety between city, highlands and beach to keep children engaged across a week or more.</p>' },
      { q: 'Can I visit Singapore from Malaysia?', a: '<p>Yes — it is a short flight or a bus across the causeway. Singapore requires its own visa, submitted through an authorised agent, which we arrange alongside the Malaysian one.</p>' },
      { q: 'How long should I go for?', a: '<p>Seven nights is the sweet spot — enough for Kuala Lumpur and one island without rushing. Five works if you stay in and around KL. Ten or more lets you add Penang or Singapore.</p>' },
    ],
  },
  {
    slug: 'thailand', name: 'Thailand', flag: '🇹🇭', region: 'Southeast Asia', order: 7, featured: true,
    tagline: 'Bangkok, Phuket and Krabi',
    metaTitle: 'Thailand Tour Packages from Pakistan | Bangkok, Phuket & Krabi',
    metaDescription:
      'Thailand tour packages from Pakistan — Bangkok, Pattaya, Phuket and Krabi with flights, hotels, transfers, island tours and visa assistance from Islamabad.',
    lead: 'Beaches, islands and a capital that never slows down — at prices that make a longer trip realistic.',
    intro: [
      'Thailand delivers more holiday per rupee than almost any comparable destination. Bangkok offers temples, floating markets and shopping at every price point; Phuket and Krabi provide the beaches and the island excursions to Phi Phi and James Bond Island that fill most people\'s photographs.',
      'For Pakistani travellers the practical considerations are halal food and alcohol-free hotel options, both of which are readily available — Bangkok in particular has a well-established halal dining scene, and we select hotels accordingly for families who ask.',
      'Thailand suits honeymooners, groups of friends and families alike, though the itinerary differs considerably between them. Tell us which you are and we will shape it properly rather than sending the same seven-night template to everyone.',
    ],
    highlights: ['Grand Palace and Wat Arun', 'Floating and night markets', 'Phi Phi Islands day trip', 'James Bond Island, Phang Nga Bay', 'Krabi beaches and Railay', 'Coral Island, Pattaya'],
    packages: [
      { title: '5 Nights Bangkok & Pattaya', nights: 5, text: 'City tour, Coral Island and the floating market.' },
      { title: '7 Nights Bangkok & Phuket', nights: 7, text: 'Three nights in the capital and four on the island with Phi Phi tour.' },
      { title: '9 Nights Thailand Islands', nights: 9, text: 'Bangkok, Phuket and Krabi with island excursions throughout.' },
      { title: '6 Nights Honeymoon Thailand', nights: 6, text: 'Beach resort with private transfers, dinner and a couples\' excursion.' },
    ],
    bestTime: 'November to March is the cool dry season and the peak. April to June is hot; July to October brings monsoon rain and the lowest rates.',
    visaUrl: '/visa-services/thailand-visa/',
    faqs: [
      { q: 'Is halal food available in Thailand?', a: '<p>Yes, particularly in Bangkok, Phuket and Krabi, all of which have established Muslim communities and halal-certified restaurants. We can select hotels close to halal dining and flag alcohol-free options for families.</p>' },
      { q: 'Do Pakistani travellers need a Thai visa?', a: '<p>Yes. Thailand issues visas to Pakistani passport holders through its electronic platform. The rules have changed several times recently, so we confirm the current requirement at enquiry — see our <a href="/visa-services/thailand-visa/">Thailand visa page</a>.</p>' },
      { q: 'Bangkok or the islands?', a: '<p>Both, if you have seven nights. Bangkok alone gets repetitive after three days, and the islands alone means missing the temples and markets. A three-and-four split is the format most travellers are happiest with.</p>' },
    ],
  },
  {
    slug: 'maldives', name: 'Maldives', flag: '🇲🇻', region: 'South Asia', order: 6, featured: true,
    tagline: 'Overwater villas and turquoise atolls',
    metaTitle: 'Maldives Honeymoon Packages from Pakistan | Resort Holidays',
    metaDescription:
      'Maldives honeymoon and holiday packages from Pakistan — resort selection, overwater villas, seaplane transfers, meal plans and flights. Visa on arrival for Pakistani passports.',
    lead: 'Our most requested honeymoon destination — and the one where choosing the right resort matters more than anything else.',
    intro: [
      'The Maldives is not a destination you tour; it is a resort you choose, and the choice determines the entire holiday. Atoll location dictates the transfer — a speedboat of thirty minutes or a seaplane of forty-five, at very different costs. Board basis determines whether you are paying separately for every meal on an island with no alternatives. Villa category determines whether you wake up over the water or behind it.',
      'This is why we do not publish a single Maldives package. We ask what matters to you — budget, privacy, house reef for snorkelling, all-inclusive versus half board — and then recommend specific resorts that fit, with the transfer costs made clear up front rather than discovered later.',
      'For Pakistani travellers the entry process is as easy as it gets: a free visa on arrival, granted on presentation of a confirmed resort booking and onward travel. Flying time is short and there is no application to make in advance.',
    ],
    highlights: ['Overwater and beach villas', 'Seaplane and speedboat transfers', 'House reef snorkelling', 'All-inclusive resort options', 'Private candlelit dinners', 'Sunset dolphin cruises'],
    packages: [
      { title: '4 Nights Honeymoon', nights: 4, text: 'Beach villa, half board, speedboat transfer and honeymoon amenities.' },
      { title: '5 Nights Overwater', nights: 5, text: 'Overwater villa with seaplane transfer and all-inclusive board.' },
      { title: '6 Nights Family Resort', nights: 6, text: 'Family beach villa with kids\' club and all-inclusive dining.' },
      { title: '4 Nights Budget Guesthouse', nights: 4, text: 'Local island guesthouse with excursions — a lower-cost route.' },
    ],
    bestTime: 'November to April is the dry season and the peak. May to October brings occasional rain and noticeably lower rates.',
    visaUrl: '/visa-services/maldives-visa/',
    faqs: [
      { q: 'Do Pakistanis need a visa for the Maldives?', a: '<p>A free visa on arrival is granted to travellers meeting the entry conditions — valid passport, confirmed accommodation, onward travel and sufficient funds. No advance application is required.</p>' },
      { q: 'What is the difference between a speedboat and a seaplane resort?', a: '<p>Distance from Malé. Nearer resorts use speedboats, which are cheaper and operate at any hour. Distant resorts require seaplanes, which cost considerably more per person and only fly in daylight — so a late arrival may mean an overnight in Malé.</p>' },
      { q: 'Is the Maldives affordable?', a: '<p>It spans a wide range. Local island guesthouses are a fraction of the cost of a resort island, and shoulder-season resort rates are far below peak. Tell us your budget honestly and we will show you what it actually buys.</p>' },
    ],
  },
  {
    slug: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', order: 2, featured: true,
    tagline: 'London, Manchester and the Scottish Highlands',
    metaTitle: 'UK Tour Packages from Pakistan | London & Scotland Holidays',
    metaDescription:
      'UK tour packages from Pakistan — London, Manchester, Birmingham, Edinburgh and the Scottish Highlands with flights, hotels, transfers and visa assistance.',
    lead: 'For many Pakistani travellers the UK is a family visit first and a holiday second — we plan for both.',
    intro: [
      'A large share of UK travel from Pakistan is to see family in London, Birmingham, Manchester, Bradford or Glasgow. Those trips still benefit from proper planning: the flights, the visa file, and often a week of touring built around the family stay.',
      'For the touring portion, London holds most people for four or five days — the Tower, Buckingham Palace, the museums, Oxford Street and a day trip to Windsor or Oxford. Beyond it, the Lake District, Edinburgh and the Scottish Highlands are the additions that turn a family visit into a holiday.',
      'The visa is the hard part rather than the itinerary, and it is where we spend most of the effort. See our <a href="/visa-services/uk-visa/">UK visa page</a> for what the file needs to contain.',
    ],
    highlights: ['London landmarks and museums', 'Windsor Castle and Oxford', 'Manchester and Birmingham', 'Lake District', 'Edinburgh Old Town', 'Scottish Highlands and Loch Ness'],
    packages: [
      { title: '6 Nights London', nights: 6, text: 'City sightseeing, museums and a Windsor or Oxford day trip.' },
      { title: '9 Nights London & Scotland', nights: 9, text: 'London plus Edinburgh and a Highlands excursion.' },
      { title: '7 Nights Family Visit Support', nights: 7, text: 'Flights, visa file and transfers built around a family stay.' },
      { title: '12 Nights UK Grand Tour', nights: 12, text: 'London, Lake District, Edinburgh and the Highlands by road.' },
    ],
    bestTime: 'May to September for the longest days and mildest weather. Winter is cold and dark but hotel rates are lower.',
    visaUrl: '/visa-services/uk-visa/',
    faqs: [
      { q: 'How hard is the UK visit visa?', a: '<p>It is demanding on documentation rather than complicated in process. The file has to evidence funding, purpose and ties to Pakistan to a standard that leaves no gaps. See our <a href="/visa-services/uk-visa/">UK visa page</a>.</p>' },
      { q: 'Can you arrange the trip if family are hosting me?', a: '<p>Yes. We handle the flights, the visa file including your sponsor\'s documentation, and any touring you want to add around the family stay.</p>' },
      { q: 'Is a Schengen visa valid for the UK?', a: '<p>No. The UK is outside the Schengen area and requires its own visa. Ireland likewise requires a separate visa.</p>' },
    ],
  },
  {
    slug: 'europe', name: 'Europe', flag: '🇪🇺', region: 'Europe', order: 1, featured: true,
    tagline: 'Multi-country Schengen itineraries',
    metaTitle: 'Europe Tour Packages from Pakistan | Multi-Country Schengen Tours',
    metaDescription:
      'Europe tour packages from Pakistan — multi-country Schengen itineraries covering France, Italy, Switzerland, Germany, Spain and Austria with flights, hotels and visa assistance.',
    lead: 'One visa, several countries, and an itinerary that has to be built to satisfy both the traveller and the embassy.',
    intro: [
      'A European tour from Pakistan is two projects at once. The first is the holiday: which cities, how long in each, how you move between them. The second is the visa file, which must demonstrate a coherent itinerary with accommodation for every night, compliant insurance and sufficient funds — and must be submitted to the correct main-destination mission.',
      'We build the two together. The itinerary you travel is the itinerary in your application, with real bookings behind it. That alignment removes the most common reason multi-country applications get refused: a stated plan that the supporting documents do not actually support.',
      'The classic circuits are Paris–Switzerland–Italy, the central European loop of Prague–Vienna–Budapest, and the Spain–Portugal pairing. Which works best depends on your dates, your budget and how much time you are willing to spend on trains.',
    ],
    highlights: ['Paris, Eiffel Tower and Versailles', 'Swiss Alps — Interlaken and Jungfrau', 'Rome, Venice and Florence', 'Prague, Vienna and Budapest', 'Barcelona and Madrid', 'Amsterdam and Brussels'],
    packages: [
      { title: '8 Nights France & Switzerland', nights: 8, text: 'Paris, Interlaken and Lucerne with rail transfers.' },
      { title: '10 Nights Classic Europe', nights: 10, text: 'Paris, Switzerland and Italy on one Schengen visa.' },
      { title: '9 Nights Central Europe', nights: 9, text: 'Prague, Vienna and Budapest with rail travel between them.' },
      { title: '8 Nights Spain & Portugal', nights: 8, text: 'Madrid, Barcelona and Lisbon with internal flights.' },
    ],
    bestTime: 'May to September for the best weather. December offers Christmas markets; January to March is cheapest but cold.',
    visaUrl: '/visa-services/schengen-visa/',
    faqs: [
      { q: 'Which embassy do I apply to for a multi-country trip?', a: '<p>The country where you will spend the most time. If the time is split equally, the country you enter first. Applying elsewhere is a recognised misuse and a reliable route to refusal. See our <a href="/visa-services/schengen-visa/">Schengen visa page</a>.</p>' },
      { q: 'How many countries can I cover in ten days?', a: '<p>Three is comfortable; four is rushed; five means you have booked a series of train journeys rather than a holiday. We would rather talk you into fewer cities and a better trip.</p>' },
      { q: 'Is travel insurance mandatory?', a: '<p>Yes, and it must meet the Schengen criteria — valid across the whole area for the full stay, covering emergency treatment and repatriation to the required minimum. We arrange <a href="/services/travel-insurance/">compliant policies</a>.</p>' },
    ],
  },
  {
    slug: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', order: 9,
    tagline: 'Makkah, Madinah, AlUla and the Red Sea',
    metaTitle: 'Saudi Arabia Tour Packages | Makkah, Madinah, AlUla & Riyadh',
    metaDescription:
      'Saudi Arabia travel from Pakistan — Umrah packages, ziyarat, AlUla, Riyadh and Jeddah tours with flights, hotels, transport and visa assistance.',
    lead: 'Beyond the Haramain, Saudi Arabia has opened to leisure travel — and AlUla in particular is worth the trip.',
    intro: [
      'For most of our clients Saudi Arabia means Makkah and Madinah, and our <a href="/umrah-packages/">Umrah packages</a> cover that in full. But the Kingdom\'s tourist visa has made a genuinely different kind of trip possible alongside the pilgrimage.',
      'AlUla holds Hegra, the Nabataean city that shares its builders with Petra, alongside dramatic desert landscapes and the mirrored Maraya concert hall. Jeddah\'s Al-Balad historic district has been restored, Riyadh has Diriyah and the Edge of the World escarpment, and the Red Sea coast offers some of the least-dived reefs in the region.',
      'Pilgrims increasingly add two or three nights in Jeddah or AlUla to an Umrah trip, which is straightforward to arrange within the same booking.',
    ],
    highlights: ['Masjid al-Haram, Makkah', 'Masjid an-Nabawi, Madinah', 'Hegra and AlUla old town', 'Al-Balad historic Jeddah', 'Diriyah and Edge of the World, Riyadh', 'Red Sea diving'],
    packages: [
      { title: 'Umrah Packages', nights: 0, text: 'Our full range of Umrah itineraries from every major Pakistani city.' },
      { title: '3 Nights Jeddah Extension', nights: 3, text: 'Added to an Umrah trip — Al-Balad, the corniche and the Red Sea.' },
      { title: '4 Nights AlUla', nights: 4, text: 'Hegra, Elephant Rock, the old town and Maraya.' },
      { title: '6 Nights Riyadh & AlUla', nights: 6, text: 'The capital and the heritage sites with internal flights.' },
    ],
    bestTime: 'October to March for comfortable temperatures across the Kingdom. Umrah travel runs year-round, peaking in Ramadan.',
    visaUrl: '/visa-services/saudi-arabia-visa/',
    faqs: [
      { q: 'Can I add a leisure trip to my Umrah?', a: '<p>Often yes, and it is increasingly common. The arrangements depend on your visa category and its conditions, which we confirm at the time of booking — see our <a href="/visa-services/saudi-arabia-visa/">Saudi visa page</a>.</p>' },
      { q: 'Is AlUla worth visiting?', a: '<p>If you have any interest in archaeology or landscape, yes. Hegra is a UNESCO World Heritage site and comparable to Petra with a fraction of the crowds. Four nights covers it comfortably.</p>' },
      { q: 'Do you arrange ziyarat separately?', a: '<p>Yes — see our <a href="/services/ziyarat-tours/">ziyarat tours</a> for guided visits to the historical sites of Makkah and Madinah.</p>' },
    ],
  },
  {
    slug: 'singapore', name: 'Singapore', flag: '🇸🇬', region: 'Southeast Asia', order: 10,
    tagline: 'Marina Bay, Sentosa and Gardens by the Bay',
    metaTitle: 'Singapore Tour Packages from Pakistan | Sentosa & Marina Bay',
    metaDescription:
      'Singapore tour packages from Pakistan — Marina Bay, Sentosa, Universal Studios and Gardens by the Bay with flights, hotels, transfers and visa assistance.',
    lead: 'Compact, efficient and exceptionally easy to travel with children — usually combined with Malaysia.',
    intro: [
      'Singapore is small enough to cover properly in three or four days and organised enough that nothing goes wrong. Marina Bay Sands, Gardens by the Bay and the Merlion cover the skyline; Sentosa holds Universal Studios, the aquarium and the beaches; and Little India and Kampong Glam provide the food and the halal dining.',
      'It is expensive relative to its neighbours, which is why most travellers pair it with Malaysia — a short flight or a bus across the causeway — rather than making it the whole trip.',
      'Note that Singapore visa applications from Pakistan must be submitted through an authorised agent or sponsor rather than directly, which we handle as part of the booking.',
    ],
    highlights: ['Marina Bay Sands and SkyPark', 'Gardens by the Bay', 'Universal Studios Sentosa', 'S.E.A. Aquarium', 'Kampong Glam and Sultan Mosque', 'Singapore Zoo and Night Safari'],
    packages: [
      { title: '3 Nights Singapore', nights: 3, text: 'City tour, Gardens by the Bay and Sentosa.' },
      { title: '5 Nights Singapore Family', nights: 5, text: 'Universal Studios, aquarium, zoo and the city highlights.' },
      { title: '10 Nights Malaysia & Singapore', nights: 10, text: 'Kuala Lumpur, Langkawi and Singapore on one itinerary.' },
    ],
    bestTime: 'Year-round, with rain possible in any month. February to April is marginally drier.',
    visaUrl: '/visa-services/singapore-visa/',
    faqs: [
      { q: 'How do I apply for a Singapore visa?', a: '<p>Applications from Pakistan are submitted through an authorised visa agent, a local sponsor or an approved travel agency rather than directly. We handle the submission as part of your booking.</p>' },
      { q: 'How many days do I need?', a: '<p>Three nights covers the highlights; five if you are doing Universal Studios and the zoo with children. Beyond that, combine it with Malaysia.</p>' },
      { q: 'Is halal food available?', a: '<p>Widely. Singapore has a large Muslim population and halal certification is well established, with Kampong Glam and Little India particularly good for it.</p>' },
    ],
  },
  {
    slug: 'georgia', name: 'Georgia', flag: '🇬🇪', region: 'Caucasus', order: 11,
    tagline: 'Tbilisi, Batumi and the Caucasus mountains',
    metaTitle: 'Georgia Tour Packages from Pakistan | Tbilisi & Batumi Tours',
    metaDescription:
      'Georgia tour packages from Pakistan — Tbilisi, Batumi, Kazbegi and Borjomi with flights, hotels, transfers, mountain excursions and visa assistance.',
    lead: 'European scenery and architecture at Caucasus prices — and it pairs naturally with Azerbaijan.',
    intro: [
      'Georgia offers a great deal for the money: a walkable old capital with sulphur baths and cable cars, Black Sea beaches at Batumi, and the Greater Caucasus mountains at Kazbegi within a few hours\' drive of Tbilisi.',
      'It has become a popular second leg for travellers already going to Baku, with the overland route between the two capitals well established and the flight short. For those with ten days, a Turkey–Georgia–Azerbaijan itinerary covers a great deal of ground.',
      'Halal food is available in Tbilisi and Batumi though less universal than in Turkey or Azerbaijan, and we select restaurants and hotels accordingly for families who ask.',
    ],
    highlights: ['Tbilisi Old Town and sulphur baths', 'Kazbegi and Gergeti Trinity Church', 'Batumi Black Sea coast', 'Borjomi national park', 'Mtskheta ancient capital', 'Wine country at Kakheti'],
    packages: [
      { title: '5 Nights Tbilisi', nights: 5, text: 'City tour, Mtskheta and a Kazbegi mountain day trip.' },
      { title: '7 Nights Georgia Explorer', nights: 7, text: 'Tbilisi, Kazbegi and Batumi with private transport.' },
      { title: '10 Nights Georgia & Azerbaijan', nights: 10, text: 'Tbilisi and Baku combined, overland or by air.' },
    ],
    bestTime: 'May to October. Summer suits Batumi; autumn is best for the mountains and wine country.',
    visaUrl: '/visa-services/georgia-visa/',
    faqs: [
      { q: 'Is the Georgia visa difficult?', a: '<p>No — Georgia operates an electronic visa portal with straightforward requirements. See our <a href="/visa-services/georgia-visa/">Georgia visa page</a>.</p>' },
      { q: 'Can I combine Georgia with Azerbaijan?', a: '<p>Yes, and many travellers do. The two capitals are connected by a short flight or an overland route, and each requires its own visa.</p>' },
      { q: 'Is halal food available?', a: '<p>In Tbilisi and Batumi, yes, though less universally than in Turkey. We select hotels near halal dining where this matters to you.</p>' },
    ],
  },
  {
    slug: 'uzbekistan', name: 'Uzbekistan', flag: '🇺🇿', region: 'Central Asia', order: 12,
    tagline: 'Samarkand, Bukhara and Islamic heritage',
    metaTitle: 'Uzbekistan Tour Packages from Pakistan | Samarkand & Bukhara Ziyarat',
    metaDescription:
      'Uzbekistan tour packages from Pakistan — Samarkand, Bukhara, Khiva and Tashkent with Imam Bukhari ziyarat, flights, hotels, guides and e-Visa assistance.',
    lead: 'The Islamic heritage circuit that draws Pakistani travellers for ziyarat as much as for sightseeing.',
    intro: [
      'Uzbekistan holds a particular significance for travellers from the subcontinent. The shrine of Imam Bukhari outside Samarkand, the resting places of Imam Tirmidhi and Bahauddin Naqshband near Bukhara, and the madrasas of the Registan draw ziyarat-focused groups every season.',
      'The architecture alone would justify the trip. Samarkand\'s Registan and Shah-i-Zinda, Bukhara\'s Poi Kalyan complex and Khiva\'s walled inner city are among the best-preserved Islamic monuments anywhere, and the restoration work has been substantial.',
      'Practicalities are easy: an electronic visa, direct or one-stop flights, halal food everywhere and a level of hospitality towards Pakistani visitors that most travellers comment on afterwards.',
    ],
    highlights: ['Imam Bukhari shrine, Samarkand', 'Registan Square and Shah-i-Zinda', 'Poi Kalyan and Bahauddin Naqshband, Bukhara', 'Khiva walled city', 'Tashkent old town and bazaars', 'Imam Tirmidhi shrine'],
    packages: [
      { title: '6 Nights Ziyarat Uzbekistan', nights: 6, text: 'Tashkent, Samarkand and Bukhara with the major shrines.' },
      { title: '8 Nights Silk Road', nights: 8, text: 'Tashkent, Samarkand, Bukhara and Khiva with internal flights.' },
      { title: '5 Nights Samarkand & Bukhara', nights: 5, text: 'The two heritage cities with a guided ziyarat programme.' },
    ],
    bestTime: 'April to June and September to October. Summer is very hot; winter is cold but the sites are empty.',
    visaUrl: '/visa-services/uzbekistan-visa/',
    faqs: [
      { q: 'Do you arrange ziyarat groups to Uzbekistan?', a: '<p>Yes. Group departures with an Urdu-speaking guide and a scholar-led programme are among our most requested Central Asia itineraries. Tell us your group size and preferred dates.</p>' },
      { q: 'How is the Uzbekistan visa?', a: '<p>Straightforward — an electronic visa with light documentation and quick processing. See our <a href="/visa-services/uzbekistan-visa/">Uzbekistan visa page</a>.</p>' },
      { q: 'Is it suitable for elderly travellers?', a: '<p>Yes, with a private vehicle and a paced itinerary. The sites involve walking on uneven stone in places, so tell us about any mobility needs and we will plan the days accordingly.</p>' },
    ],
  },
  {
    slug: 'sri-lanka', name: 'Sri Lanka', flag: '🇱🇰', region: 'South Asia', order: 13,
    tagline: 'Beaches, hill country and heritage',
    metaTitle: 'Sri Lanka Tour Packages from Pakistan | Colombo, Kandy & Bentota',
    metaDescription:
      'Sri Lanka tour packages from Pakistan — Colombo, Kandy, Nuwara Eliya and Bentota with flights, hotels, transfers, tea country tours and ETA assistance.',
    lead: 'A short flight, an easy travel authorisation and a remarkable amount of variety for a small island.',
    intro: [
      'Sri Lanka packs beaches, mountains, tea plantations, wildlife and ancient cities into an island you can cross in a day. For Pakistani families it works as an affordable first international trip, with an electronic travel authorisation that takes minutes rather than weeks.',
      'The standard circuit runs Colombo to Kandy for the Temple of the Tooth, up to Nuwara Eliya through the tea country by train — one of the most scenic rail journeys anywhere — and down to Bentota or Galle for the coast.',
      'Costs are low by regional standards, which means a longer trip or a better hotel for the same budget as a shorter Gulf holiday.',
    ],
    highlights: ['Temple of the Tooth, Kandy', 'Nuwara Eliya tea country', 'Ella and the Nine Arch Bridge', 'Bentota and Galle beaches', 'Sigiriya rock fortress', 'Yala wildlife safari'],
    packages: [
      { title: '5 Nights Sri Lanka Highlights', nights: 5, text: 'Colombo, Kandy and Bentota with the tea country train.' },
      { title: '7 Nights Island Explorer', nights: 7, text: 'Adds Nuwara Eliya, Ella and Sigiriya to the standard circuit.' },
      { title: '6 Nights Honeymoon', nights: 6, text: 'Hill country and a beach resort with private transport throughout.' },
    ],
    bestTime: 'December to March for the west and south coasts; May to September for the east. Hill country is pleasant year-round.',
    visaUrl: '/visa-services/sri-lanka-visa/',
    faqs: [
      { q: 'How easy is the Sri Lanka visa?', a: '<p>Among the easiest available — an Electronic Travel Authorisation with minimal documentation and fast processing. See our <a href="/visa-services/sri-lanka-visa/">Sri Lanka visa page</a>.</p>' },
      { q: 'Is halal food available?', a: '<p>Yes, particularly in Colombo and the coastal towns, which have established Muslim communities. We select hotels and restaurants accordingly where you ask.</p>' },
      { q: 'How many days do I need?', a: '<p>Five nights covers the essentials; seven lets you add the hill country properly without spending every day in a vehicle.</p>' },
    ],
  },
];

/* Sorted, not just filtered: the array is still in its original authoring
   order but `order` now reflects the client's priority markets (Sept 2026),
   with Europe and the UK first. */
const featured = destinations.filter((d) => d.featured).sort((a, b) => a.order - b.order);

/* Exported in priority order so every listing — the hub grid, the sidebar
   and the nav dropdown — leads with the markets the client actually sells. */
const byPriority = [...destinations].sort((a, b) => a.order - b.order);

module.exports = { destinations: byPriority, featured };
