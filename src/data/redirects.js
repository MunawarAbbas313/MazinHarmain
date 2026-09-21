/* ==========================================================================
   Permanent redirects.

   When a page is retired its URL does not stop existing — it stays in
   Google's index, in other people's links and in visitors' history. Each
   entry here sends one of those old URLs somewhere useful instead of a 404.

   Single source of truth: build.js writes dist/_redirects from this list,
   and qa.js checks vercel.json declares the same set, so the two hosts can
   never drift apart. Adding an entry here means adding it to vercel.json.
   ========================================================================== */

const redirects = [
  /* The agency processes Visit, Tourist and Business visas only. The other
     three categories were withdrawn in September 2026 because they produced
     enquiries the team had to turn away. */
  { from: '/visa-services/student-visa/', to: '/visa-services/', status: 301 },
  { from: '/visa-services/work-visa/', to: '/visa-services/', status: 301 },
  { from: '/visa-services/family-visa/', to: '/visa-services/', status: 301 },
];

module.exports = redirects;
