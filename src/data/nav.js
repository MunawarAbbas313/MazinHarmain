/* ==========================================================================
   Primary navigation.
   Mirrors the menu tree in the client's brief (section 2) and drives both the
   desktop dropdowns and the mobile drawer from one definition.
   ========================================================================== */

const nav = [
  { label: 'Home', url: '/' },
  { label: 'About Us', url: '/about/' },
  {
    label: 'Services',
    url: '/services/',
    children: [
      { label: 'All Services', url: '/services/' },
      { label: 'Air Ticketing', url: '/services/air-ticketing/' },
      { label: 'Flight Routes', url: '/flights/' },
      { label: 'Umrah Packages', url: '/umrah-packages/' },
      { label: 'Hajj Services', url: '/services/hajj-services/' },
      { label: 'Visa Services', url: '/visa-services/' },
      { label: 'Visa Appointment Booking', url: '/services/visa-appointment-booking/' },
      { label: 'Hotel Reservations', url: '/hotels/' },
      { label: 'International Tours', url: '/destinations/' },
      { label: 'Ziyarat Tours', url: '/services/ziyarat-tours/' },
      { label: 'Corporate Travel', url: '/corporate-travel/' },
      { label: 'Travel Insurance', url: '/services/travel-insurance/' },
      { label: 'Airport Transfers', url: '/services/airport-transfers/' },
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
      { label: 'Student Visa', url: '/visa-services/student-visa/' },
      { label: 'Work Visa', url: '/visa-services/work-visa/' },
      { label: 'Family / Visit Sponsorship', url: '/visa-services/family-visa/' },
      { head: 'Popular Countries' },
      { label: 'UK Visa', url: '/visa-services/uk-visa/' },
      { label: 'USA Visa', url: '/visa-services/usa-visa/' },
      { label: 'Canada Visa', url: '/visa-services/canada-visa/' },
      { label: 'Schengen Visa', url: '/visa-services/schengen-visa/' },
      { label: 'UAE / Dubai Visa', url: '/visa-services/uae-visa/' },
      { label: 'Turkey Visa', url: '/visa-services/turkey-visa/' },
      { label: 'Visa Appointment Booking', url: '/services/visa-appointment-booking/' },
    ],
  },
  {
    label: 'Destinations',
    url: '/destinations/',
    children: [
      { label: 'All Destinations', url: '/destinations/' },
      { label: 'Turkey', url: '/destinations/turkey/' },
      { label: 'Azerbaijan', url: '/destinations/azerbaijan/' },
      { label: 'Dubai & UAE', url: '/destinations/dubai/' },
      { label: 'Thailand', url: '/destinations/thailand/' },
      { label: 'Malaysia', url: '/destinations/malaysia/' },
      { label: 'Maldives', url: '/destinations/maldives/' },
      { label: 'United Kingdom', url: '/destinations/united-kingdom/' },
      { label: 'Europe', url: '/destinations/europe/' },
      { label: 'Saudi Arabia', url: '/destinations/saudi-arabia/' },
    ],
  },
  { label: 'Corporate', url: '/corporate-travel/' },
  { label: 'Travel Guides', url: '/travel-guides/' },
  { label: 'Contact', url: '/contact/' },
];

/* Footer link columns */
const footerNav = {
  services: {
    title: 'Our Services',
    links: [
      { label: 'Umrah Packages', url: '/umrah-packages/' },
      { label: 'Hajj Services', url: '/services/hajj-services/' },
      { label: 'Visa Services', url: '/visa-services/' },
      { label: 'Visa Appointments', url: '/services/visa-appointment-booking/' },
      { label: 'Air Ticketing', url: '/services/air-ticketing/' },
      { label: 'Flight Routes', url: '/flights/' },
      { label: 'Hotel Reservations', url: '/hotels/' },
      { label: 'International Tours', url: '/destinations/' },
      { label: 'Corporate Travel', url: '/corporate-travel/' },
      { label: 'Travel Insurance', url: '/services/travel-insurance/' },
      { label: 'Airport Transfers', url: '/services/airport-transfers/' },
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
