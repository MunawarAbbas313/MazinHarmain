/* ==========================================================================
   Primary navigation.
   Mirrors the menu tree in the client's brief (section 2) and drives both the
   desktop dropdowns and the mobile drawer from one definition.
   ========================================================================== */

const { appointmentCountries } = require('./visa-countries');

/* The client named twenty-one countries and has asked three times for them to
   be the country list. Hand-typing them here is how the menu drifted out of
   step with the data in the first place — it still showed an eight-country
   list in a different order — so it is generated. */
const countryLinks = appointmentCountries.map((c) => ({
  label: `${c.short || c.name} Visa`,
  url: `/visa-services/${c.slug}/`,
}));

const nav = [
  { label: 'Home', url: '/' },
  {
    label: 'Services',
    url: '/services/',
    children: [
      /* The client's order (Sept 2026), matching the home grid and the
         services hub. The three attestation services and the remaining
         top-level services follow it. */
      { label: 'All Services', url: '/services/' },
      { label: 'Umrah Packages', url: '/umrah-packages/' },
      { label: 'Visa Appointment Booking', url: '/services/visa-appointment-booking/' },
      { label: 'Visa Services', url: '/visa-services/' },
      { label: 'Air Ticketing', url: '/services/air-ticketing/' },
      { label: 'Flight Routes', url: '/flights/' },
      { label: 'Hotel Reservations', url: '/hotels/' },
      { label: 'International Tours', url: '/destinations/' },
      { label: 'Car Rental', url: '/services/car-rental/' },
      { label: 'Hajj Services', url: '/services/hajj-services/' },
      { label: 'Ziyarat Tours', url: '/services/ziyarat-tours/' },
      { label: 'Corporate Travel', url: '/corporate-travel/' },
      { label: 'Travel Insurance', url: '/services/travel-insurance/' },
      { label: 'Airport Transfers', url: '/services/airport-transfers/' },
      { label: 'Document Attestation', url: '/services/document-attestation/' },
      { label: 'Apostille Services', url: '/services/apostille/' },
      { label: 'Power of Attorney', url: '/services/power-of-attorney/' },
    ],
  },
  {
    label: 'Umrah',
    url: '/umrah-packages/',
    children: [
      { head: 'By Category' },
      { label: 'All Umrah Packages', url: '/umrah-packages/' },
      { label: 'Economy Umrah', url: '/umrah-packages/economy-umrah-packages/' },
      { label: 'Executive Umrah', url: '/umrah-packages/executive-umrah-packages/' },
      { label: 'Premium Umrah', url: '/umrah-packages/premium-umrah-packages/' },
      { label: 'VIP Umrah', url: '/umrah-packages/vip-umrah-packages/' },
      { label: 'Customized Umrah', url: '/umrah-packages/customized-umrah-packages/' },
      { head: 'By Duration & Type' },
      { label: '10 Days Umrah', url: '/umrah-packages/10-days-umrah-package/' },
      { label: '15 Days Umrah', url: '/umrah-packages/15-days-umrah-package/' },
      { label: '21 Days Umrah', url: '/umrah-packages/21-days-umrah-package/' },
      { label: 'Ramadan Umrah', url: '/umrah-packages/ramadan-umrah-packages/' },
      { label: 'Family Umrah', url: '/umrah-packages/family-umrah-packages/' },
      { label: 'Group Umrah', url: '/umrah-packages/group-umrah-packages/' },
      { label: 'Umrah Visa', url: '/umrah-packages/umrah-visa/' },
    ],
  },
  {
    label: 'Visa',
    url: '/visa-services/',
    children: [
      { head: 'Visa Categories' },
      { label: 'All Visa Services', url: '/visa-services/' },
      { label: 'Visit Visa', url: '/visa-services/visit-visa/' },
      { label: 'Tourist Visa', url: '/visa-services/tourist-visa/' },
      { label: 'Business Visa', url: '/visa-services/business-visa/' },
      { head: 'Countries' },
      ...countryLinks,
      { label: 'Visa Appointment Booking', url: '/services/visa-appointment-booking/' },
    ],
  },
  {
    label: 'Destinations',
    url: '/destinations/',
    children: [
      /* Priority order, matching src/data/destinations.js. */
      { label: 'All Destinations', url: '/destinations/' },
      { label: 'Europe', url: '/destinations/europe/' },
      { label: 'United Kingdom', url: '/destinations/united-kingdom/' },
      { label: 'Turkey', url: '/destinations/turkey/' },
      { label: 'Dubai & UAE', url: '/destinations/dubai/' },
      { label: 'Azerbaijan', url: '/destinations/azerbaijan/' },
      { label: 'Maldives', url: '/destinations/maldives/' },
      { label: 'Thailand', url: '/destinations/thailand/' },
      { label: 'Malaysia', url: '/destinations/malaysia/' },
      { label: 'Saudi Arabia', url: '/destinations/saudi-arabia/' },
    ],
  },
  /* Promoted out of the Services dropdown to top level — the client's most
     requested service and the one they felt the site hid. */
  {
    /* Top level at the client's request. It carries the same twenty-one
       countries as the Visa menu and the form's dropdown: the client looks
       for them here, under the words "visa appointment", not only under
       "Visa". */
    label: 'Visa Appointments',
    url: '/services/visa-appointment-booking/',
    children: [
      { label: 'Book an Appointment', url: '/services/visa-appointment-booking/' },
      { head: 'Countries' },
      ...countryLinks,
    ],
  },
  /* Corporate and Travel Guides came off the top row: ten items crowded the
     header and the client asked for fewer. Both keep their place in the
     Services dropdown and the footer, so nothing is unreachable. */
  /* About Us sits at the end at the client's request (Sept 2026): the
     services are what visitors arrive looking for. */
  { label: 'About Us', url: '/about/' },
  { label: 'Contact', url: '/contact/' },
];

/* Footer link columns */
const footerNav = {
  services: {
    title: 'Our Services',
    links: [
      { label: 'Umrah Packages', url: '/umrah-packages/' },
      { label: 'Visa Appointments', url: '/services/visa-appointment-booking/' },
      { label: 'Visa Services', url: '/visa-services/' },
      { label: 'Air Ticketing', url: '/services/air-ticketing/' },
      { label: 'Flight Routes', url: '/flights/' },
      { label: 'Hotel Reservations', url: '/hotels/' },
      { label: 'International Tours', url: '/destinations/' },
      { label: 'Car Rental', url: '/services/car-rental/' },
      { label: 'Hajj Services', url: '/services/hajj-services/' },
      { label: 'Ziyarat Tours', url: '/services/ziyarat-tours/' },
      { label: 'Corporate Travel', url: '/corporate-travel/' },
      { label: 'Travel Insurance', url: '/services/travel-insurance/' },
      { label: 'Airport Transfers', url: '/services/airport-transfers/' },
      { label: 'Document Attestation', url: '/services/document-attestation/' },
      { label: 'Apostille Services', url: '/services/apostille/' },
      { label: 'Power of Attorney', url: '/services/power-of-attorney/' },
    ],
  },
  company: {
    title: 'Quick Links',
    links: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about/' },
      { label: 'Travel Agency in Islamabad', url: '/travel-agency-in-islamabad/' },
      { label: 'Travel Guides', url: '/travel-guides/' },
      { label: 'Customer Reviews', url: '/reviews/' },
      { label: 'FAQs', url: '/faqs/' },
      { label: 'Get a Free Quote', url: '/get-a-quote/' },
      { label: 'Contact Us', url: '/contact/' },
      { label: 'Site Map', url: '/sitemap/' },
    ],
  },
};

const legalNav = [
  { label: 'Privacy Policy', url: '/privacy-policy/' },
  { label: 'Terms & Conditions', url: '/terms-and-conditions/' },
  { label: 'Booking Terms', url: '/booking-terms/' },
  { label: 'Refund & Cancellation Policy', url: '/refund-and-cancellation-policy/' },
  { label: 'Visa Disclaimer', url: '/visa-disclaimer/' },
];

module.exports = { nav, footerNav, legalNav };
