/* ==========================================================================
   CUSTOMER REVIEWS
   --------------------------------------------------------------------------
   This file ships EMPTY on purpose.

   The client's brief is explicit: "Do not use fake reviews, fake
   certifications, fake partner logos or unsupported claims." Inventing
   testimonials would also breach Google's review policies and expose the
   business to a consumer-protection complaint.

   HOW TO ADD REAL REVIEWS
   -----------------------
   Once you have genuine, permissioned customer feedback, add entries below
   and run `npm run build`. The homepage strip, the reviews page and the
   AggregateRating schema all populate automatically.

     {
       name: 'Full name as the customer gave it',
       city: 'Islamabad',
       service: 'Premium Umrah Package',
       rating: 5,                       // 1-5, as actually given
       date: '2026-03-14',              // ISO date
       text: 'The review, in the customer\'s own words.',
       source: 'Google',                // Google | Facebook | Direct
     }

   Only publish a review where the customer has agreed to it being shown.
   Do not edit the wording beyond removing personal details.

   GOOGLE BUSINESS PROFILE
   -----------------------
   The most credible route is to collect reviews on the Google Business
   Profile and link to them. Set `googleReviewUrl` below to the profile's
   "write a review" link and the site will surface it everywhere.
   ========================================================================== */

const reviews = [];

/* Paste the Google Business Profile review link here once the profile is
   verified, e.g. 'https://g.page/r/XXXXXXXXXXXX/review'                     */
const googleReviewUrl = '';

/* Public profile link, used for "read more reviews".                        */
const googleProfileUrl = '';

module.exports = { reviews, googleReviewUrl, googleProfileUrl };
