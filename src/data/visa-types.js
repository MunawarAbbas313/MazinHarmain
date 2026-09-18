/* ==========================================================================
   Visa categories (the six in the client's menu).
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
  {
    slug: 'student-visa',
    title: 'Student Visa',
    icon: 'doc',
    h1: 'Student Visa Assistance from Pakistan',
    metaTitle: 'Student Visa from Pakistan | Study Abroad Visa Application Support',
    metaDescription:
      'Student visa assistance from Pakistan — admission documentation, financial evidence, language test requirements and appointment booking for study abroad applications.',
    lead: 'Student applications are document-heavy and deadline-driven. Getting the financial evidence right is usually the whole battle.',
    intro: [
      'A student visa follows an offer of admission, and the visa file is built around three things: that the offer is genuine, that you meet the academic and language requirements, and that the tuition and living costs are funded from a source that will hold up to scrutiny.',
      'Financial evidence is where most student applications come unstuck. Many countries require funds to have been held for a minimum period in an acceptable account, with a clear and documented source. Money moved into an account shortly before the application, without an explanation of where it came from, is a recognised refusal pattern.',
      'Timing is the other pressure. Admission deadlines, appointment availability, biometric enrolment and processing times all have to fit inside the window before your course starts. We work backwards from the course start date so the appointment is booked early enough to leave room for a resubmission if one is needed.',
    ],
    covers: [
      'Undergraduate and postgraduate study',
      'Language and foundation courses',
      'Professional and vocational programmes',
      'Research and exchange programmes',
    ],
    keyDocs: [
      'Offer letter or confirmation of acceptance from the institution',
      'Academic transcripts, degrees and certificates',
      'Language test results (IELTS, PTE, TOEFL or equivalent)',
      'Proof of tuition fee payment or deposit',
      'Financial evidence held for the required maintenance period',
      'Sponsor documentation and relationship proof where applicable',
      'Accommodation arrangements',
      'Medical and tuberculosis screening where required',
    ],
  },
  {
    slug: 'work-visa',
    title: 'Work Visa',
    icon: 'building',
    h1: 'Work Visa Assistance from Pakistan',
    metaTitle: 'Work Visa from Pakistan | Employment Visa Documentation Support',
    metaDescription:
      'Work visa documentation assistance from Pakistan — employment contracts, attestation, medical requirements and protectorate procedures for overseas employment.',
    lead: 'Work visas begin with a confirmed job offer and a sponsoring employer. Everything else follows from those two documents.',
    intro: [
      'A work visa requires an employer abroad who has offered you a role and is willing to sponsor the application. In most systems the employer initiates the process — obtaining a permit, certificate or sponsorship reference — and you apply against it. No legitimate route begins with the visa.',
      'For Gulf employment in particular, the sequence involves employment contract attestation, medical screening at approved centres, and for Pakistani workers, completion of Protectorate of Emigrants formalities before departure. Skipping any step creates problems that are difficult to fix after you have travelled.',
      'We assist with the documentation side: contract review, attestation routing, medical scheduling, document translation and the application itself. We are direct about the limits of that assistance — we are a travel agency, not a recruitment agency, and we do not offer, arrange or promise employment abroad.',
    ],
    covers: [
      'Employment in the Gulf states and Middle East',
      'Skilled worker routes to the UK, Europe and other destinations',
      'Intra-company transfers',
      'Seasonal and contract-based employment',
    ],
    keyDocs: [
      'Signed employment contract or offer letter',
      'Employer sponsorship reference, permit or certificate',
      'Educational certificates, attested as required',
      'Professional experience letters',
      'Medical screening from an approved centre',
      'Police character certificate',
      'Passport with sufficient validity',
      'Protectorate of Emigrants documentation where applicable',
    ],
    notice:
      'Mazin Haramain Tours & Travels provides travel and visa documentation assistance only. We are not a recruitment or manpower agency, we do not offer employment abroad, and we never charge for job placement. Be cautious of anyone who does.',
  },
  {
    slug: 'family-visa',
    title: 'Family Visa',
    icon: 'users',
    h1: 'Family Visa & Dependant Visa Assistance',
    metaTitle: 'Family & Dependant Visa from Pakistan | Spouse & Children',
    metaDescription:
      'Family and dependant visa documentation assistance from Pakistan — spouse, children and parent applications, relationship evidence, NADRA documents and attestation.',
    lead: 'Family applications rest on proving the relationship and the sponsor\'s ability to support — documented to the standard the mission expects.',
    intro: [
      'Family and dependant visas allow a spouse, children or in some cases parents to join a relative who is settled, working or studying abroad. The application has two halves: proving the relationship is genuine, and proving the sponsor can accommodate and support the family without recourse to public funds.',
      'Relationship evidence is more than a nikah nama. Missions look for a documented history — NADRA records, the family registration certificate, photographs across time, communication records, evidence of visits, and where children are involved, birth registration showing both parents. Documents that exist only from the month of the application invite scrutiny.',
      'The sponsor side requires income evidence meeting a stated threshold, accommodation adequate for the family size, and proof of immigration status. Requirements differ substantially between countries and change over time, so we confirm the current criteria for your destination before assembling the file.',
    ],
    covers: [
      'Spouse and partner applications',
      'Dependent children joining a parent',
      'Parents joining settled children where permitted',
      'Dependants accompanying a student or worker',
    ],
    keyDocs: [
      'Nikah nama and marriage registration certificate',
      'NADRA family registration certificate (FRC)',
      'Birth registration certificates for children (CRC)',
      'Sponsor\'s passport, visa or residence documentation',
      'Sponsor\'s income and employment evidence',
      'Accommodation evidence (tenancy or ownership)',
      'Relationship evidence over time',
      'Attested and translated documents where required',
    ],
  },
];

module.exports = visaTypes;
