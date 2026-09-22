# Accreditation marks

Drop the official artwork in here and the trust strips pick it up on the
next `npm run build`. Nothing else to change.

    secp.svg   or  secp.png            SECP company registration
    fbr.svg    or  fbr.png             FBR tax registration
    dts.svg    or  dts.png             Dept. of Tourist Services licence
    iata.svg   or  iata.png            IATA accreditation
    mora.svg   or  mora.png            Ministry of Religious Affairs approval
    hotel-partners.svg / .png          Hotel partner lockup

SVG is preferred — it stays sharp at any size. Until a file exists the gold
line icon stands in, so the section never shows a broken image. The keys come
from `site.credentials` in `src/data/site.js`.

## What is here

    fbr.png    Federal Board of Revenue — the official lockup, downloaded
               September 2026 from
               download1.fbr.gov.pk/MediaManager/english/images/FBR-Logo.png
               and trimmed. 532x74, transparent.

The other four are still outstanding, and not for want of trying:

    SECP   secp.gov.pk serves its HTML but answers 403 to a direct request
           for the logo asset. Deliberate hotlink protection.
    MORA   no logo in the markup at mora.gov.pk.
    DTS    tourism.gov.pk publishes a "Salam Pakistan" tourism brand, not a
           Department of Tourist Services mark.
    IATA   iata.org exposes only a white "IATA Airlines" footer variant, not
           the accreditation mark an agent is issued.

Each of those should be in the client's own registration pack, which is the
right source anyway — it is the copy they were licensed to display.

## Why these are not already here

Every one of these marks belongs to someone else. SECP, FBR, DTS, IATA and
MORA each control how their name and emblem may be used, and the permission
normally comes with the accreditation itself — which means the client already
has the files, in the pack issued when they registered.

IATA is the strict one: its logo may only be displayed by a currently
accredited agent, under IATA's own brand rules, and it is actively policed.
Do not add `iata.png` unless the accreditation is current and the agency is
happy to show the certificate on request.

The client has since authorised using the organisations' official artwork,
which is their call to make — it is their accreditation and their site. FBR's
was obtainable from the official source and is installed. The rest are not
publicly served, so the file drop above remains the route.

One to keep in mind regardless of authorisation: IATA's mark may only be
displayed by a currently accredited agent, under IATA's own brand rules, and
it is actively policed. Add `iata.png` only while the accreditation is live
and the certificate can be produced on request.

## Better than a logo

Fill in `ref` on each entry in `site.credentials` — the licence or
registration number. A number can be checked against the registry; a logo
cannot. The strip renders it under the label automatically, and a cautious
customer trusts it more.
