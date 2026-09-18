/* ==========================================================================
   FAQ bank.
   `homepage` is the short set the brief asks for on the home page; `groups`
   drives the full /faqs/ page and its FAQPage schema.
   ========================================================================== */

const homepage = [
  {
    q: 'Do you provide Umrah packages from Pakistan?',
    a: '<p>Yes. We arrange Umrah packages from Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Faisalabad, Multan and Sialkot, in economy, executive, premium and VIP categories. Every package includes the Umrah visa, return flights, hotels in Makkah and Madinah, all transfers and ziyarat in both cities. See our <a href="/umrah-packages/">Umrah packages</a>.</p>',
  },
  {
    q: 'Can I customise my Umrah package?',
    a: '<p>Yes — most of our bookings are adjusted in some way. You can change the hotels, the number of nights in each city, the airline, the room category and the departure date. See <a href="/umrah-packages/customized-umrah-packages/">customized Umrah packages</a>.</p>',
  },
  {
    q: 'Do you provide visa assistance?',
    a: '<p>Yes, for more than forty destinations including the UK, USA, Canada, the Schengen area, UAE, Turkey, Azerbaijan, Malaysia and Thailand. We assist with eligibility guidance, document checklists, application completion, appointment booking and interview preparation. Visa decisions rest solely with the relevant embassy or consulate — see our <a href="/visa-disclaimer/">visa disclaimer</a>.</p>',
  },
  {
    q: 'Can you arrange flights and hotels together?',
    a: '<p>Yes. Booking them together is usually both cheaper and simpler, and it means the confirmations in your visa file are consistent with each other. We also arrange transfers, insurance and tours as part of the same booking.</p>',
  },
  {
    q: 'Do you offer corporate travel services?',
    a: '<p>Yes. Our corporate desk handles air ticketing, hotels, visas, group travel and MICE arrangements with a dedicated account manager, consolidated invoicing and travel reporting. See <a href="/corporate-travel/">corporate travel solutions</a>.</p>',
  },
  {
    q: 'Can I book through WhatsApp?',
    a: '<p>Yes. Many clients handle the entire process over WhatsApp — sending documents, receiving quotations and confirming the booking. Message us on <a href="https://wa.me/923135500022" target="_blank" rel="noopener">0313 5500022</a>.</p>',
  },
  {
    q: 'How can I request a travel quotation?',
    a: '<p>Use the <a href="/get-a-quote/">quote form</a>, message us on WhatsApp, or call <a href="tel:+92518465006">051-8465006-7</a>. Tell us your destination, dates and number of travellers and we will come back with options and pricing.</p>',
  },
  {
    q: 'What documents are required for visa applications?',
    a: '<p>It varies by destination and category, but most applications need a valid passport, CNIC, photographs, bank statements, employment or business documents, travel bookings and evidence of ties to Pakistan. We issue a written checklist specific to your case — see our <a href="/visa-services/">visa services</a>.</p>',
  },
];

const groups = [
  {
    title: 'Umrah & Hajj',
    icon: 'kaaba',
    items: [
      {
        q: 'What is included in your Umrah packages?',
        a: '<p>The Umrah visa, return economy airfare, hotel accommodation in Makkah and Madinah, airport and intercity transfers, and ziyarat in both cities. Meals are included in premium and VIP packages and can be added to others. Your written confirmation lists exactly what is and is not included before you pay.</p>',
      },
      {
        q: 'How much does an Umrah package cost from Pakistan?',
        a: '<p>It depends on the season, hotel category, distance from the Haram, room occupancy and the airfare at the time of booking — all of which move considerably through the year. We quote current pricing on request rather than publishing figures that date within weeks.</p>',
      },
      {
        q: 'How far in advance should I book Umrah?',
        a: '<p>Six to eight weeks for a standard departure. For Ramadan, several months — the last ten nights in particular are committed very early, and late bookings mean worse locations at higher prices.</p>',
      },
      {
        q: 'What vaccinations do I need for Umrah?',
        a: '<p>Meningococcal ACYW vaccination is required for pilgrims, and polio vaccination documentation is required of Pakistani passport holders. Pakistan requires NADRA-integrated digital vaccination proof for outbound pilgrims. See our <a href="/travel-guides/nadra-vaccination-certificate-umrah-hajj/">vaccination guide</a>.</p>',
      },
      {
        q: 'Can I perform Umrah with my elderly parents?',
        a: '<p>Yes, and we plan specifically for it: hotels within the closest walking ring, wheelchair assistance at the airports and in the Haram, private transfers rather than shared shuttles, and meal plans so nobody is searching for food after Isha.</p>',
      },
      {
        q: 'Do you arrange group Umrah for masjid jamaats?',
        a: '<p>Yes. Groups of ten or more qualify for group airfares and block hotel bookings, with a dedicated coordinator handling documentation, rooming lists and ground logistics. See <a href="/umrah-packages/group-umrah-packages/">group Umrah packages</a>.</p>',
      },
      {
        q: 'Do you operate your own Hajj scheme?',
        a: '<p>Hajj quotas in Pakistan are allocated by the Ministry of Religious Affairs to the Government scheme and to licensed Hajj Group Organisers. We will tell you exactly what we can arrange directly and where a licensed organiser must be involved. See <a href="/services/hajj-services/">Hajj services</a>.</p>',
      },
      {
        q: 'Is ziyarat included in the package?',
        a: '<p>Yes, ziyarat in both Makkah and Madinah is included as standard, with an air-conditioned vehicle and an Urdu and English speaking guide. See <a href="/services/ziyarat-tours/">ziyarat tours</a>.</p>',
      },
    ],
  },
  {
    title: 'Visa Services',
    icon: 'passport',
    items: [
      {
        q: 'Can you guarantee my visa will be approved?',
        a: '<p>No, and nobody legitimately can. Visa decisions are made solely by the relevant embassy, consulate or immigration authority. What we do is make sure your application is complete, consistent and properly evidenced — which is what actually affects outcomes. Please read our <a href="/visa-disclaimer/">visa disclaimer</a>.</p>',
      },
      {
        q: 'Which countries do you provide visa assistance for?',
        a: '<p>More than forty, including the UK, USA, Canada, all Schengen states, UAE, Turkey, Azerbaijan, Saudi Arabia, Malaysia, Thailand, Singapore, China, Japan, Australia and more. See the full list on our <a href="/visa-services/">visa services page</a>.</p>',
      },
      {
        q: 'Can you book my visa appointment?',
        a: '<p>Yes. We identify the correct application centre and category, complete the online profile, monitor slot availability and prepare you for submission day. See <a href="/services/visa-appointment-booking/">visa appointment booking</a>.</p>',
      },
      {
        q: 'How much bank balance do I need?',
        a: '<p>Most missions publish no minimum. The assessment is whether your funds are sufficient for the trip you describe and whether their source is explained. A modest balance with consistent history is stronger than a large recent deposit.</p>',
      },
      {
        q: 'What if my visa is refused?',
        a: '<p>Read the refusal notice — it states the grounds. A fresh application must address those grounds specifically with new evidence. We will review the notice with you and advise honestly on whether reapplying is sensible.</p>',
      },
      {
        q: 'Are visa fees included in your service charge?',
        a: '<p>No. Embassy fees, application centre charges and any optional services are paid separately at the prescribed rates. We tell you the expected costs before you commit.</p>',
      },
      {
        q: 'Do you provide job or immigration services?',
        a: '<p>No. We are a travel agency providing travel and visa documentation assistance. We are not a recruitment or immigration consultancy, we do not offer employment abroad, and we never charge for job placement.</p>',
      },
    ],
  },
  {
    title: 'Flights, Hotels & Tours',
    icon: 'plane',
    items: [
      {
        q: 'Can you find cheaper flights than booking online?',
        a: '<p>Often, but the more consistent benefit is getting the right ticket — with the baggage allowance, fare rules and routing explained before you pay. Where an online fare genuinely is best, we will tell you.</p>',
      },
      {
        q: 'What happens if my flight schedule changes?',
        a: '<p>Tickets issued through us are monitored for schedule changes. If your flight moves materially we contact you and rebook you under the airline\'s policy, with no service charge from our side.</p>',
      },
      {
        q: 'Can I change or refund my ticket?',
        a: '<p>That depends on the fare rules of the ticket you bought, which we confirm in writing before issuing. Promotional fares are usually non-refundable with change fees; flexible fares cost more but can be amended.</p>',
      },
      {
        q: 'Do you book hotels without a full package?',
        a: '<p>Yes, worldwide. Note that the Umrah visa is tied to accommodation registered on the official platform, so if you need the visa too, it is arranged together.</p>',
      },
      {
        q: 'Do you arrange customised tours?',
        a: '<p>Yes. Most of our tour bookings are adjusted to the traveller — different cities, durations, hotel categories or dates. Tell us what you want and we will cost it.</p>',
      },
      {
        q: 'Do you arrange honeymoon packages?',
        a: '<p>Yes — the Maldives, Turkey, Thailand, Dubai and Malaysia are the most requested. We arrange resort selection, transfers, board basis and honeymoon amenities.</p>',
      },
    ],
  },
  {
    title: 'Booking & Payment',
    icon: 'wallet',
    items: [
      {
        q: 'How do I book?',
        a: '<p>Send us your requirements by <a href="/get-a-quote/">quote form</a>, WhatsApp or phone. We send a written quotation with the inclusions and exclusions listed. You confirm, pay as agreed, and we issue the confirmations and documents.</p>',
      },
      {
        q: 'What payment methods do you accept?',
        a: '<p>Bank transfer to the company account, and cash at our Blue Area office. Always obtain a receipt, and never transfer funds to a personal account in an individual\'s name for a company booking.</p>',
      },
      {
        q: 'Do I need to pay the full amount upfront?',
        a: '<p>Usually not. Most bookings are confirmed with a deposit, with the balance due before ticketing or before departure. The schedule is set out in your written confirmation.</p>',
      },
      {
        q: 'Can I cancel or change my booking?',
        a: '<p>Yes, subject to the terms of the airlines, hotels and suppliers involved, which vary considerably. Cancellation charges are set out in our <a href="/refund-and-cancellation-policy/">refund and cancellation policy</a> and in your booking confirmation.</p>',
      },
      {
        q: 'Will I get everything in writing?',
        a: '<p>Yes. Every booking is confirmed in writing with the inclusions, exclusions, payment schedule and cancellation terms stated. If anything is unclear, ask before you pay.</p>',
      },
      {
        q: 'Are your prices per person?',
        a: '<p>Package prices are quoted per person on a stated sharing basis unless the quotation says otherwise. Single occupancy carries a supplement, which we state explicitly.</p>',
      },
    ],
  },
  {
    title: 'About Mazin Haramain',
    icon: 'building',
    items: [
      {
        q: 'Where is your office?',
        a: `<p>Office # 14, Second Floor, Safdar Mansion, Fazal-e-Haq Road, Blue Area, Islamabad. You are welcome to visit during business hours — see our <a href="/contact/">contact page</a> for a map and directions.</p>`,
      },
      {
        q: 'What are your business hours?',
        a: '<p>Monday to Saturday, 9:30 AM to 6:30 PM (PKT). WhatsApp messages outside those hours are answered the next working day, and we monitor the line for travellers already abroad.</p>',
      },
      {
        q: 'Do you assist clients outside Islamabad?',
        a: '<p>Yes. Most of our bookings are handled remotely by phone, WhatsApp and email for clients across Pakistan and for overseas Pakistanis arranging travel for family at home.</p>',
      },
      {
        q: 'What licences and registrations do you hold?',
        a: '<p>Ask our team and we will share copies of the specific licences, memberships and approvals held by Mazin Haramain Tours & Travels. We only display credentials we actually hold.</p>',
      },
      {
        q: 'Do you support clients while they are travelling?',
        a: '<p>Yes. Our WhatsApp line is monitored for clients already abroad, and we assist with schedule changes, hotel issues and emergencies during your trip.</p>',
      },
    ],
  },
];

/* Flattened list, used for the FAQPage schema on /faqs/. */
const all = groups.reduce((acc, g) => acc.concat(g.items), []);

module.exports = { homepage, groups, all };
