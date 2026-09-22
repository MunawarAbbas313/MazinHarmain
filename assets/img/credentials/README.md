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

All five regulator marks are installed. The client supplied SECP, DTS and
IATA directly; FBR and MORA were obtainable from the official sources.

    secp.png   Seal of the Registrar of Companies — supplied by the client
    fbr.png    Federal Board of Revenue — download1.fbr.gov.pk, trimmed
    dts.png    Department of Tourist Services — supplied by the client
    iata.png   IATA Ground Handling Partner — supplied by the client, masked
               to its circle because it arrived on a black square and the
               strip puts it on a white plate
    mora.png   State Emblem of Pakistan, as the Ministry of Religious Affairs
               uses it — mora.gov.pk/SiteImage/Setting/GoP.png

Hotel Partners keeps a glyph on purpose: it is a partnership rather than an
accreditation, and it should not dress as a seal it was never issued.

Note the IATA artwork reads "Ground Handling Partner", which is a different
credential from IATA Accredited Agent. The label under it was changed to
match the badge rather than the other way round.

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
