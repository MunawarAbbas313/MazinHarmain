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

## Why these are not already here

Every one of these marks belongs to someone else. SECP, FBR, DTS, IATA and
MORA each control how their name and emblem may be used, and the permission
normally comes with the accreditation itself — which means the client already
has the files, in the pack issued when they registered.

IATA is the strict one: its logo may only be displayed by a currently
accredited agent, under IATA's own brand rules, and it is actively policed.
Do not add `iata.png` unless the accreditation is current and the agency is
happy to show the certificate on request.

Taking these logos off the organisations' websites instead would put a
trademark on the site without permission, and would also state a credential
nobody here has verified. Hence the file drop.

## Better than a logo

Fill in `ref` on each entry in `site.credentials` — the licence or
registration number. A number can be checked against the registry; a logo
cannot. The strip renders it under the label automatically, and a cautious
customer trusts it more.
