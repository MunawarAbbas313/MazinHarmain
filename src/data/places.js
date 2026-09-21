/* ==========================================================================
   Places the search widget can suggest.

   Kept apart from search-widget.js because it is a long, purely factual list
   and it changes for different reasons than the markup does.

   These are suggestions, never restrictions: every field that uses them
   accepts free text, because a traveller will always eventually want
   somewhere the list does not have.
   ========================================================================== */

const { routes } = require('./flights');
const hotels = require('./hotels');

/* Airports: departure points across Pakistan, then the destinations the
   agency actually ticketed most. Each entry is searched on city, IATA code
   and airport name, so "khi", "jinnah" and "karachi" all find the same row. */
const EXTRA_AIRPORTS = [
  /* Pakistan */
  ['Islamabad', 'ISB', 'Islamabad International Airport'],
  ['Lahore', 'LHE', 'Allama Iqbal International Airport'],
  ['Karachi', 'KHI', 'Jinnah International Airport'],
  ['Peshawar', 'PEW', 'Bacha Khan International Airport'],
  ['Multan', 'MUX', 'Multan International Airport'],
  ['Sialkot', 'SKT', 'Sialkot International Airport'],
  ['Faisalabad', 'LYP', 'Faisalabad International Airport'],
  ['Quetta', 'UET', 'Quetta International Airport'],
  ['Skardu', 'KDU', 'Skardu International Airport'],
  ['Gilgit', 'GIL', 'Gilgit Airport'],
  ['Sukkur', 'SKZ', 'Sukkur Airport'],
  ['Bahawalpur', 'BHV', 'Bahawalpur Airport'],
  ['Gwadar', 'GWD', 'Gwadar International Airport'],
  ['Turbat', 'TUK', 'Turbat International Airport'],

  /* Saudi Arabia and the Gulf */
  ['Jeddah', 'JED', 'King Abdulaziz International Airport'],
  ['Madinah', 'MED', 'Prince Mohammad bin Abdulaziz International Airport'],
  ['Riyadh', 'RUH', 'King Khalid International Airport'],
  ['Dammam', 'DMM', 'King Fahd International Airport'],
  ['Taif', 'TIF', 'Taif International Airport'],
  ['Dubai', 'DXB', 'Dubai International Airport'],
  ['Dubai', 'DWC', 'Al Maktoum International Airport'],
  ['Abu Dhabi', 'AUH', 'Zayed International Airport'],
  ['Sharjah', 'SHJ', 'Sharjah International Airport'],
  ['Doha', 'DOH', 'Hamad International Airport'],
  ['Muscat', 'MCT', 'Muscat International Airport'],
  ['Kuwait City', 'KWI', 'Kuwait International Airport'],
  ['Manama', 'BAH', 'Bahrain International Airport'],

  /* Türkiye, Caucasus and Central Asia */
  ['Istanbul', 'IST', 'Istanbul Airport'],
  ['Istanbul', 'SAW', 'Sabiha Gokcen International Airport'],
  ['Antalya', 'AYT', 'Antalya Airport'],
  ['Ankara', 'ESB', 'Esenboga International Airport'],
  ['Baku', 'GYD', 'Heydar Aliyev International Airport'],
  ['Tbilisi', 'TBS', 'Tbilisi International Airport'],
  ['Tashkent', 'TAS', 'Islam Karimov Tashkent International Airport'],
  ['Almaty', 'ALA', 'Almaty International Airport'],

  /* United Kingdom and Ireland */
  ['London', 'LHR', 'Heathrow Airport'],
  ['London', 'LGW', 'Gatwick Airport'],
  ['London', 'STN', 'Stansted Airport'],
  ['Manchester', 'MAN', 'Manchester Airport'],
  ['Birmingham', 'BHX', 'Birmingham Airport'],
  ['Glasgow', 'GLA', 'Glasgow Airport'],
  ['Edinburgh', 'EDI', 'Edinburgh Airport'],
  ['Dublin', 'DUB', 'Dublin Airport'],

  /* Europe — the client's priority visa markets */
  ['Rome', 'FCO', 'Leonardo da Vinci Fiumicino Airport'],
  ['Milan', 'MXP', 'Milan Malpensa Airport'],
  ['Venice', 'VCE', 'Venice Marco Polo Airport'],
  ['Madrid', 'MAD', 'Adolfo Suarez Madrid Barajas Airport'],
  ['Barcelona', 'BCN', 'Josep Tarradellas Barcelona El Prat Airport'],
  ['Paris', 'CDG', 'Charles de Gaulle Airport'],
  ['Lisbon', 'LIS', 'Humberto Delgado Airport'],
  ['Porto', 'OPO', 'Francisco Sa Carneiro Airport'],
  ['Athens', 'ATH', 'Athens International Airport'],
  ['Budapest', 'BUD', 'Budapest Ferenc Liszt International Airport'],
  ['Vienna', 'VIE', 'Vienna International Airport'],
  ['Zurich', 'ZRH', 'Zurich Airport'],
  ['Geneva', 'GVA', 'Geneva Airport'],
  ['Frankfurt', 'FRA', 'Frankfurt Airport'],
  ['Munich', 'MUC', 'Munich Airport'],
  ['Berlin', 'BER', 'Berlin Brandenburg Airport'],
  ['Amsterdam', 'AMS', 'Amsterdam Schiphol Airport'],
  ['Brussels', 'BRU', 'Brussels Airport'],
  ['Warsaw', 'WAW', 'Warsaw Chopin Airport'],
  ['Krakow', 'KRK', 'Krakow John Paul II International Airport'],
  ['Stockholm', 'ARN', 'Stockholm Arlanda Airport'],
  ['Oslo', 'OSL', 'Oslo Gardermoen Airport'],
  ['Copenhagen', 'CPH', 'Copenhagen Airport'],
  ['Helsinki', 'HEL', 'Helsinki Vantaa Airport'],
  ['Sofia', 'SOF', 'Sofia Airport'],
  ['Bratislava', 'BTS', 'M. R. Stefanik Airport'],
  ['Prague', 'PRG', 'Vaclav Havel Airport Prague'],

  /* North America */
  ['New York', 'JFK', 'John F. Kennedy International Airport'],
  ['Newark', 'EWR', 'Newark Liberty International Airport'],
  ['Washington', 'IAD', 'Washington Dulles International Airport'],
  ['Chicago', 'ORD', "O'Hare International Airport"],
  ['Los Angeles', 'LAX', 'Los Angeles International Airport'],
  ['Houston', 'IAH', 'George Bush Intercontinental Airport'],
  ['Toronto', 'YYZ', 'Toronto Pearson International Airport'],
  ['Vancouver', 'YVR', 'Vancouver International Airport'],
  ['Montreal', 'YUL', 'Montreal Trudeau International Airport'],

  /* Asia Pacific */
  ['Kuala Lumpur', 'KUL', 'Kuala Lumpur International Airport'],
  ['Bangkok', 'BKK', 'Suvarnabhumi Airport'],
  ['Phuket', 'HKT', 'Phuket International Airport'],
  ['Singapore', 'SIN', 'Changi Airport'],
  ['Jakarta', 'CGK', 'Soekarno Hatta International Airport'],
  ['Bali', 'DPS', 'Ngurah Rai International Airport'],
  ['Tokyo', 'NRT', 'Narita International Airport'],
  ['Tokyo', 'HND', 'Haneda Airport'],
  ['Osaka', 'KIX', 'Kansai International Airport'],
  ['Seoul', 'ICN', 'Incheon International Airport'],
  ['Beijing', 'PEK', 'Beijing Capital International Airport'],
  ['Guangzhou', 'CAN', 'Guangzhou Baiyun International Airport'],
  ['Hong Kong', 'HKG', 'Hong Kong International Airport'],
  ['Colombo', 'CMB', 'Bandaranaike International Airport'],
  ['Male', 'MLE', 'Velana International Airport'],
  ['Kathmandu', 'KTM', 'Tribhuvan International Airport'],
  ['Sydney', 'SYD', 'Sydney Kingsford Smith Airport'],
  ['Melbourne', 'MEL', 'Melbourne Airport'],
  ['Cairo', 'CAI', 'Cairo International Airport'],
  ['Casablanca', 'CMN', 'Mohammed V International Airport'],
];

const AIRPORTS = (() => {
  const seen = new Map();
  const add = (city, code, name) => {
    if (!code || seen.has(code)) return;
    seen.set(code, `${city} (${code}) — ${name}`);
  };
  /* Routes first: these are the sectors with their own landing pages. */
  routes.forEach((r) => {
    add(r.from, r.fromCode, r.fromAirport);
    add(r.to, r.toCode, r.toAirport);
  });
  EXTRA_AIRPORTS.forEach(([city, code, name]) => add(city, code, name));
  return Array.from(seen.values()).sort();
})();

/* Hotel destinations. The Haram districts are listed by name because
   "how far from the Haram" is the question every Umrah booking turns on,
   but the list runs well beyond Makkah and Madinah — the agency sells
   worldwide and the old eight-city dropdown did not say so. */
const HOTEL_PLACES = (() => {
  const seen = new Set();
  const out = [];
  const add = (label) => {
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(label);
  };

  hotels.forEach((h) => h.city && add(h.city));

  [
    'Makkah — Ajyad', 'Makkah — Misfalah', 'Makkah — Jabal Omar', 'Makkah — Shisha',
    'Madinah — Central Zone', 'Madinah — Markaziyah', 'Jeddah', 'Riyadh', 'Taif',
    'Dubai — Deira', 'Dubai — Marina', 'Dubai — Downtown', 'Abu Dhabi', 'Sharjah',
    'Doha', 'Muscat', 'Kuwait City', 'Manama',
    'Istanbul — Sultanahmet', 'Istanbul — Taksim', 'Antalya', 'Bursa', 'Trabzon',
    'Baku', 'Tbilisi', 'Tashkent', 'Almaty',
    'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Dublin',
    'Rome', 'Milan', 'Venice', 'Florence', 'Madrid', 'Barcelona', 'Paris', 'Nice',
    'Lisbon', 'Porto', 'Athens', 'Santorini', 'Budapest', 'Vienna', 'Salzburg',
    'Zurich', 'Geneva', 'Interlaken', 'Frankfurt', 'Munich', 'Berlin',
    'Amsterdam', 'Brussels', 'Warsaw', 'Krakow', 'Prague', 'Stockholm', 'Oslo',
    'Copenhagen', 'Helsinki', 'Sofia', 'Bratislava',
    'New York', 'Washington', 'Chicago', 'Los Angeles', 'Toronto', 'Vancouver',
    'Kuala Lumpur', 'Langkawi', 'Bangkok', 'Phuket', 'Pattaya', 'Singapore',
    'Bali', 'Jakarta', 'Tokyo', 'Osaka', 'Kyoto', 'Seoul', 'Hong Kong',
    'Colombo', 'Kandy', 'Male', 'Maldives — Resort Island', 'Kathmandu',
    'Sydney', 'Melbourne', 'Cairo', 'Casablanca', 'Marrakesh',
    'Islamabad', 'Lahore', 'Karachi', 'Murree', 'Naran', 'Hunza', 'Skardu', 'Swat',
  ].forEach(add);

  return out;
})();

/* Suggestions only — the field takes free text, because "nearest to the
   Haram" means nothing in Barcelona and the agency sells both. */
const HOTEL_CATEGORIES = [
  '5 Star', '4 Star', '3 Star', 'Apartment / Aparthotel', 'Serviced Apartment',
  'Boutique Hotel', 'Resort', 'Best value', 'Walking distance to the Haram',
  'Haram view', 'Near the city centre', 'Near the airport', 'Family rooms',
];

module.exports = { AIRPORTS, HOTEL_PLACES, HOTEL_CATEGORIES };
