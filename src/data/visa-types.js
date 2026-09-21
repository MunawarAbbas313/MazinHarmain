/* ==========================================================================
   Visa categories.

   Visit, Tourist and Business only — these are the three the agency actually
   processes. Student, Work and Family were removed in September 2026 at the
   client's instruction; advertising them produced enquiries they had to turn
   away. Their pages are 301'd in src/data/redirects.js.
   Country-specific detail lives in visa-countries.js; these pages explain the
   category itself and link out to the countries.
   ========================================================================== */

const visaTypes = [
  {
    slug: 'visit-visa',
    title: 'Visit Visa',
    icon: 'passport',
    h1: 'Visit Visa Assistance from Pakistan',
    metaTitle: 'Visit Visa from Pakistan | Documentation & Application Help',
    metaDescription:
      'Visit visa assistance from Pakistan for family and friends abroad — sponsor documentation, financial evidence, application forms and appointment booking. Islamabad-based consultants.',
    lead: 'Visiting family abroad is the most common reason Pakistanis apply for a visa — and the category where applications are refused most often for avoidable reasons.',
    intro: [
      'A visit visa covers travel to see family or friends who are settled abroad. The application turns on two questions the visa officer is really asking: can this trip be paid for, and will this person return to Pakistan at the end of it. Almost every refusal in this category traces back to one of those two points being left unanswered.',
      'Where a relative abroad is supporting the trip, their documentation matters as much as yours — status in the country, accommodation, income and a clear statement of what they are covering. Where you are funding it yourself, the financial history needs to show that the money is genuinely yours and has been there for a while, not deposited the week before you applied.',
      'We help you build a file that answers both questions before they are asked: consistent documents, a credible itinerary, evidence of your ties to Pakistan, and a sponsor undertaking that actually matches what the mission expects to see.',
    ],
    covers: [
      'Visiting family members settled abroad',
      'Visiting friends and extended relatives',
      'Attending a family wedding or event',
      'Short private stays with accommodation provided by a host',
    ],
    keyDocs: [
      'Valid passport with sufficient remaining validity',
      'CNIC and family registration certificate (FRC) where relationship must be proved',
      'Sponsor\'s invitation letter and status documents',
      'Sponsor\'s accommodation and income evidence',
      'Your own bank statements and proof of funds',
      'Employment or business documentation',
      'Evidence of ties to Pakistan (property, family, employment)',
      'Travel itinerary and return booking',
    ],
  },
  {
    slug: 'tourist-visa',
    title: 'Tourist Visa',
    icon: 'globe',
    h1: 'Tourist Visa Assistance from Pakistan',
    metaTitle: 'Tourist Visa from Pakistan | Holiday Visa Application Assistance',
    metaDescription:
      'Tourist visa assistance from Pakistan for holidays abroad — itinerary planning, hotel and flight bookings, financial documentation and appointment scheduling.',
    lead: 'A tourist application is judged on whether the trip you describe is one you could plausibly take — and afford.',
    intro: [
      'Tourist visas cover leisure travel: a holiday, a sightseeing trip, a honeymoon. The file is usually simpler than a visit visa because there is no sponsor to document, but it is judged on internal consistency. The itinerary, the hotel bookings, the flight dates and the money in the account all have to tell the same story.',
      'The mistakes we see most often are a mismatch between the stated itinerary and the actual bookings, a bank balance that cannot support the trip described, and leave arrangements that do not line up with the travel dates. Each is straightforward to avoid, and each is a frequent cause of refusal.',
      'Because we arrange the travel as well as the documentation, the bookings in your file are real bookings we have made — which removes an entire category of problem for applicants who have tried to assemble a file from unconfirmed reservations.',
    ],
    covers: [
      'Holidays and sightseeing trips',
      'Honeymoon and anniversary travel',
      'Group and family leisure tours',
      'Multi-country itineraries within one visa area',
    ],
    keyDocs: [
      'Valid passport and previous travel history',
      'Confirmed return flight reservation',
      'Confirmed hotel bookings for the full stay',
      'Day-by-day travel itinerary',
      'Bank statements covering the required period',
      'Employment leave approval or business ownership proof',
      'Travel medical insurance where required',
      'Evidence of ties to Pakistan',
    ],
  },
  {
    slug: 'business-visa',
    title: 'Business Visa',
    icon: 'briefcase',
    h1: 'Business Visa Assistance from Pakistan',
    metaTitle: 'Business Visa from Pakistan | Corporate Travel Visa Assistance',
    metaDescription:
      'Business visa assistance from Pakistan — invitation letters, company documentation, trade registration, conference and exhibition travel. Corporate visa support from Islamabad.',
    lead: 'Business applications succeed on the strength of the commercial relationship you can evidence — on both sides.',
    intro: [
      'A business visa covers meetings, negotiations, conferences, trade fairs, site visits and training. The core of the application is the invitation from the company abroad, supported by documentation showing that your own business or employer is real and that you have a genuine commercial reason to travel.',
      'Missions look closely at whether the two companies have an existing relationship. Correspondence, purchase orders, contracts, prior transactions and exhibition registrations all strengthen a file considerably. An invitation letter with nothing behind it is the weakest version of this application.',
      'We assist both individual business travellers and corporate accounts, including exhibition and conference delegations where several employees travel together. For companies that send staff abroad regularly, our <a href="/corporate-travel/">corporate travel desk</a> maintains the standing documentation so each new application does not start from scratch.',
    ],
    covers: [
      'Business meetings and client negotiations',
      'Trade fairs, exhibitions and conferences',
      'Supplier and factory visits',
      'Corporate training and internal company travel',
    ],
    keyDocs: [
      'Invitation letter from the host company abroad',
      'Your company\'s registration and incorporation documents',
      'Chamber of commerce membership certificate',
      'Company bank statements and tax registration',
      'Employment letter and salary evidence, or ownership proof',
      'Evidence of the commercial relationship (contracts, orders, correspondence)',
      'Exhibition or conference registration confirmation',
      'Travel itinerary and accommodation booking',
    ],
  },
];

module.exports = visaTypes;
