# Images

Drop correctly named files into this folder and they are used on the next
`npm run build`. **No code change is needed.**

Until a file exists, a branded SVG placeholder renders in its place, so the
site never displays a broken image and can be shown to the client as-is.

## Generated automatically — do not replace by hand

These are produced by `npm run icons`:

| File | Size | Used for |
|---|---|---|
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `icon-192.png` | 192×192 | Android / PWA manifest |
| `icon-512.png` | 512×512 | PWA manifest |
| `logo.png` | 512×512 | Schema.org organisation logo |
| `og-default.png` | 1200×630 | Default social share card |
| `placeholder.svg` | 800×600 | Fallback for any missing photo |

Replace `og-default.png` with a photographic version once licensed imagery is
available — it is what appears when a link is shared on WhatsApp or Facebook.

## Photography to supply

### Hero (highest priority)

| File | Size | Subject |
|---|---|---|
| `hero-kaaba.jpg` | 1920×1080 | The Kaaba / Masjid al-Haram. This is the first thing every visitor sees. |
| `corporate-travel.jpg` | 800×600 | Business traveller at an airport terminal |

### Destinations — `destinations/`

1200×900, landscape. Filename must match the destination slug:

```
turkey.jpg          azerbaijan.jpg      dubai.jpg
malaysia.jpg        thailand.jpg        maldives.jpg
united-kingdom.jpg  europe.jpg          saudi-arabia.jpg
singapore.jpg       georgia.jpg         uzbekistan.jpg
sri-lanka.jpg
```

### Hotels — `hotels/`

1200×900. Filename must match the hotel page slug:

```
makkah-hotels.jpg     madinah-hotels.jpg    dubai-hotels.jpg
istanbul-hotels.jpg   baku-hotels.jpg       london-hotels.jpg
europe-hotels.jpg     worldwide-hotels.jpg
```

### Travel guides — `guides/`

1200×900. Filename must match the article slug:

```
umrah-guide-for-pakistani-travellers.jpg
nadra-vaccination-certificate-umrah-hajj.jpg
nusuk-registration-guide-for-umrah.jpg
uk-visit-visa-guide-from-pakistan.jpg
schengen-visa-guide-from-pakistan.jpg
how-to-prepare-for-your-umrah-journey.jpg
best-hotels-near-masjid-al-haram.jpg
best-hotels-near-masjid-an-nabawi.jpg
dubai-visa-guide-from-pakistan.jpg
turkey-travel-guide-for-pakistani-tourists.jpg
international-travel-checklist-from-pakistan.jpg
travel-insurance-guide-for-pakistani-travellers.jpg
```

## Preparation guidance

- **Format:** JPEG for photographs. WebP is better if your host serves it —
  change the extension in the data file if you switch.
- **Compress before uploading.** Target under 200 KB for cards and under
  400 KB for the hero. Squoosh or TinyPNG. Large images are the single most
  common cause of a poor Core Web Vitals score.
- **Crop to the stated aspect ratio** (4:3 for cards, 16:9 for the hero) so
  nothing important is lost to the CSS crop.
- **Licensing is the client's responsibility.** Use the agency's own
  photography, or properly licensed stock. Do not take images from competitor
  websites — it is copyright infringement and it is trivially detected.

## Alt text

Alt text is generated from the content data, not from the filename, and is
already written for every image. If you need to change a specific one, edit the
`imageAlt` value in the relevant `src/data/*.js` entry.

---

## THE BRAND LOGO — action needed

The site currently renders a **built-in placeholder mark** (a gold hexagon) in
the header and footer. The real logo artwork has not been added to the project
yet.

To install it, save the logo files here and run `npm run build`:

| File | Used for | Recommended |
|---|---|---|
| `logo.png` | Header, on every page | **Wide/horizontal lockup**, about 320×80, transparent PNG or SVG |
| `logo-full.png` | Footer | The full stacked artwork (mark + wordmark + tagline), about 560×560 |

**That is the entire installation step.** The template checks for these files at
build time: if they exist they are used, if they do not the placeholder mark
renders instead. Nothing ever shows as a broken image.

### Why two files

The header is only ~82px tall. The full stacked logo — mark, wordmark, "Your
Journey • Our Commitment" and the four service badges — becomes illegible at
that size. A horizontal lockup (mark to the left, wordmark to the right, without
the service badges) reads correctly in a header. The footer has room for the
full artwork.

If you only have the square artwork, save it as **both** filenames and it will
still work; the header version will simply be more compressed than ideal.

### Also worth supplying

- `logo.svg` — if you have vector artwork, it will stay crisp at every size.
  Change the extension in `logo()` in `src/templates/layout.js`.
- A **transparent-background** version. The logo sits on white in the header and
  on dark green in the footer, so a white box around it will show on the footer.
- A **light/reversed** version for the dark footer, if the green in the logo is
  too dark against the footer background.

`assets/img/logo-mark.png` and `icon-*.png` are generated by `npm run icons` —
leave those alone, or regenerate them from the real logo once it is supplied.
