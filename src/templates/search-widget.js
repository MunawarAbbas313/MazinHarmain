/* ==========================================================================
   Travel search widget — the portal-style panel that overlaps the hero.

   Four tabs (Flights, Umrah, Visa, Hotels), each a self-contained form.
   There is no booking engine behind it and we do not pretend otherwise:
   submitting formats the answers into a WhatsApp message for the ticketing
   desk, exactly like leadForm() in components.js. The buttons say "Request",
   not "Search", for the same reason the flight pages carry no fares.

   Rendered fully in HTML so it is present on first paint. main.js section 9
   adds the tab switching, the from/to swap and the message formatting; with
   JavaScript off the panels still show and the WhatsApp/phone links below
   them still work.
   ========================================================================== */

const site = require('../data/site');
const icon = require('../lib/icons');
const { esc, attr, each } = require('../lib/html');
const { AIRPORTS, HOTEL_PLACES, HOTEL_CATEGORIES, WORLD_COUNTRIES } = require('../data/places');
const umrah = require('../data/umrah');
const visaTypes = require('../data/visa-types');
const { countries, appointmentCountries } = require('../data/visa-countries');
const { asset } = require('../lib/assets');

/* ---------------------------------------------------------------- Options */

const CABINS = ['Economy', 'Premium Economy', 'Business', 'First'];

const PAX = ['1 Passenger', '2 Passengers', '3 Passengers', '4 Passengers', '5 Passengers',
  '6 Passengers', '7–10 Passengers', '11–20 Passengers', 'Group of 20+'];

/* Airlines quote per passenger TYPE, not per head: an infant under two is a
   fraction of an adult fare and a child between two and eleven is its own
   band. A single "Passengers" count made every family quote a guess, and the
   desk had to write back and ask. The bands are the airlines' own. */
const ADULTS = ['1 Adult', '2 Adults', '3 Adults', '4 Adults', '5 Adults', '6 Adults',
  '7 Adults', '8 Adults', '9 Adults', '10+ Adults'];
const CHILDREN = ['No children', '1 Child', '2 Children', '3 Children', '4 Children',
  '5 Children', '6+ Children'];
const INFANTS = ['No infants', '1 Infant', '2 Infants', '3 Infants', '4+ Infants'];

/* The carriers that actually fly the agency's routes out of Pakistan. Free
   text is not offered here because a preference is only useful if we can
   ticket it; anything else goes in the notes box. */
const AIRLINES = [
  'No preference',
  'Pakistan International Airlines', 'AirSial', 'Airblue', 'Fly Jinnah', 'Serene Air',
  'Emirates', 'Etihad Airways', 'Qatar Airways', 'Saudia', 'flynas', 'flydubai',
  'Air Arabia', 'Gulf Air', 'Kuwait Airways', 'Oman Air', 'Turkish Airlines',
  'Pegasus Airlines', 'Azerbaijan Airlines', 'Uzbekistan Airways',
  'British Airways', 'Virgin Atlantic', 'Lufthansa', 'KLM', 'Air France',
  'Swiss', 'Austrian Airlines', 'Iberia', 'ITA Airways', 'LOT Polish Airlines',
  'Aeroflot', 'China Southern', 'Thai Airways', 'Malaysia Airlines',
  'Singapore Airlines', 'Cathay Pacific', 'SriLankan Airlines',
];

const TRIP_TYPES = [
  { value: 'Return', label: 'Return' },
  { value: 'One Way', label: 'One Way' },
  { value: 'Multi-City', label: 'Multi-City' },
];

const ROOMS = ['1 Room', '2 Rooms', '3 Rooms', '4 Rooms', '5+ Rooms'];

const GUESTS = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7+ Guests'];

/* The client's order, the same one the services now run in everywhere. */
const TABS = [
  { key: 'umrah', label: 'Umrah', icon: 'kaaba' },
  { key: 'appointments', label: 'Visa Appointment', icon: 'calendar' },
  { key: 'visa', label: 'Visa', icon: 'passport' },
  { key: 'flights', label: 'Flights', icon: 'plane' },
  { key: 'hotels', label: 'Hotels', icon: 'hotel' },
];

/* Visa fees, appointment slots and document checklists are all per applicant,
   so the desk needs the count before it can answer anything. */
const APPLICANTS = ['1 applicant', '2 applicants', '3 applicants', '4 applicants',
  '5 applicants', '6 applicants', '7–10 applicants', '11–20 applicants',
  'Group of 20+'];

/* The centre the applicant will submit at, named by its city. It used to name
   the operators — "VFS Global — Lahore", "TLScontact — Islamabad" — which
   asked the applicant to know which company runs the centre for their
   destination. They rarely do, and working that out is our job.

   Three cities, because three is where the application centres actually are:
   Islamabad, Lahore and Karachi. Free text is still accepted for the rare
   case that is none of them. */
const APPOINTMENT_CITIES = [
  'Islamabad', 'Lahore', 'Karachi', 'Not sure — advise me',
];

/* The categories an appointment can be BOOKED for, which is a longer list
   than the ones the agency processes itself. The client withdrew work, study
   and family-reunion visas as services — those pages are gone and redirected
   — but the appointment desk still secures a slot at the centre whatever the
   category, so they belong here and nowhere else. The visa tab keeps the
   three services in src/data/visa-types.js. */
/* The country type-ahead's suggestions. The client's twenty-one lead it,
   every other country follows, and the field is a text input rather than a
   <select> — two hundred countries in a dropdown is a scroll, not a choice.
   Typing "ger", "neth" or "uae" finds the row; anything typed that is not on
   the list is still accepted, which is what the old "Another country" option
   and its follow-up box existed to do. */
function countrySuggestions(lead) {
  const leadNames = lead.map((c) => c.name);
  const seen = new Set(leadNames.map((n) => n.toLowerCase()));
  const rest = WORLD_COUNTRIES.filter((c) => !seen.has(c.toLowerCase())).sort();
  return [...leadNames, ...rest];
}

const APPOINTMENT_VISA_TYPES = [
  'Visit Visa', 'Tourist Visa', 'Business Visa',
  'Work Visa', 'Study Visa', 'Family Reunion Visa',
];

/* ------------------------------------------------------------- Field bits */

function options(list, { placeholder = '', selected = '' } = {}) {
  const head = placeholder ? `<option value="">${esc(placeholder)}</option>` : '';
  return head + list
    .map((o) => {
      /* { group, items } renders an <optgroup>. The country lists run to two
         hundred entries, and the twenty-one the client named have to stay at
         the top without the rest being cut — a heading is what separates
         them. */
      if (o && o.group) {
        return `<optgroup label="${attr(o.group)}">` +
          options(o.items, { selected }) + '</optgroup>';
      }
      const value = typeof o === 'string' ? o : o.value;
      const label = typeof o === 'string' ? o : o.label;
      return `<option value="${attr(value)}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`;
    })
    .join('');
}

/**
 * A labelled control with an icon sitting inside the box.
 * `combo: true` adds the listbox main.js turns into a type-ahead. The
 * <datalist> stays on the input as the no-JS fallback; main.js strips the
 * `list` attribute when it takes over so the two do not both appear.
 */
function field({ id, label, icon: name, control, cls = '', required = false, errorFor = '', error = '', combo = false }) {
  return `
            <div class="ts-field ${cls}">
              <label for="${attr(id)}">${esc(label)}${required ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
              <div class="ts-control${combo ? ' ts-combo' : ''}"${combo ? ' data-ts-combo' : ''}>
                ${name ? `<span class="ts-control__icon">${icon(name, { size: 17 })}</span>` : ''}
                ${control}
                ${combo ? `<ul class="ts-combo__list" id="${attr(id)}-list" role="listbox" aria-label="${attr(label)} suggestions" hidden></ul>` : ''}
              </div>
              ${errorFor ? `<span class="field__error" data-error-for="${attr(errorFor)}">${esc(error)}</span>` : ''}
            </div>`;
}

/** ARIA wiring every combobox input needs. */
function comboAttrs(id) {
  return `role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${attr(id)}-list"`;
}

function input({ id, name, type = 'text', placeholder = '', list = '', extra = '' }) {
  return `<input class="ts-input" type="${attr(type)}" id="${attr(id)}" name="${attr(name)}"` +
    `${placeholder ? ` placeholder="${attr(placeholder)}"` : ''}` +
    `${list ? ` list="${attr(list)}" autocomplete="off"` : ''} ${extra}>`;
}

function select({ id, name, list, placeholder = '', selected = '', extra = '' }) {
  return `<select class="ts-input ts-input--select" id="${attr(id)}" name="${attr(name)}"` +
    `${extra ? ` ${extra}` : ''}>${options(list, { placeholder, selected })}</select>`;
}

/** Name field — every panel carries one. The desk was receiving requests
    with a number and no name on them. */
function nameField(p) {
  return field({
    id: `${p}-name`,
    label: 'Your Name',
    icon: 'userTie',
    required: true,
    errorFor: 'name',
    error: 'Please tell us your name.',
    control: input({ id: `${p}-name`, name: 'name', placeholder: 'Full name', extra: 'autocomplete="name"' }),
  });
}

/** Phone field — every panel ends with the same one. */
function phoneField(p) {
  return field({
    id: `${p}-wa`,
    label: 'WhatsApp Number',
    icon: 'whatsapp',
    required: true,
    errorFor: 'phone',
    error: 'Please enter a valid WhatsApp number.',
    control: input({ id: `${p}-wa`, name: 'phone', type: 'tel', placeholder: 'e.g. 0313 5500022', extra: 'inputmode="tel" autocomplete="tel"' }),
  });
}

/** Honeypot + status box + submit row, shared by all four panels. */
/* Every panel ends with the same button saying the same thing.

   It used to be "Request Packages", "Request Fares", "Check Availability",
   "Check Eligibility", "Request Hotel Rates" — five labels for one action, so
   the same form looked like five different things depending on the tab. The
   button opens WhatsApp, so it says so, and it carries WhatsApp's own mark
   rather than a magnifying glass, which promised a search this has never
   done. The per-panel label is kept in the signature and ignored, because it
   still reads as documentation of what each tab is for. */
function panelFoot({ p, label, note }) {
  return `
          <div class="hp-field" aria-hidden="true">
            <label for="${attr(p)}-company">Company (leave blank)</label>
            <input type="text" id="${attr(p)}-company" name="company" tabindex="-1" autocomplete="off">
          </div>
          <div class="ts-foot">
            <p class="ts-note">${note}</p>
            <button class="btn btn--whatsapp btn--lg ts-submit" type="submit">${icon('whatsapp', { size: 17 })} Send on WhatsApp</button>
          </div>
          <div class="form-status" role="status" aria-live="polite" data-form-status></div>`;
}

/* ----------------------------------------------------------------- Panels */

function flightsPanel(hidden) {
  const p = 'tsf';
  return `
        <form class="ts-panel" id="ts-panel-flights" role="tabpanel" aria-labelledby="ts-tab-flights"
              data-ts-panel="flights" data-ts-kind="Flight" novalidate${hidden ? ' hidden' : ''}>
          <div class="ts-opts">
            <div class="ts-seg" role="radiogroup" aria-label="Trip type">
              ${each(TRIP_TYPES, (t, i) => `
              <div class="ts-seg__opt">
                <input type="radio" name="tripType" id="${p}-trip-${i}" value="${attr(t.value)}"${i === 0 ? ' checked' : ''} data-ts-trip>
                <label for="${p}-trip-${i}">${esc(t.label)}</label>
              </div>`)}
            </div>
            <div class="ts-opts__spacer"></div>
            <label class="sr-only" for="${p}-cabin">Cabin class</label>
            <select class="ts-mini" id="${p}-cabin" name="cabin">${options(CABINS)}</select>
            <label class="sr-only" for="${p}-adults">Adults, twelve and over</label>
            <select class="ts-mini" id="${p}-adults" name="adults">${options(ADULTS)}</select>
            <label class="sr-only" for="${p}-children">Children, two to eleven</label>
            <select class="ts-mini" id="${p}-children" name="children">${options(CHILDREN)}</select>
            <label class="sr-only" for="${p}-infants">Infants, under two</label>
            <select class="ts-mini" id="${p}-infants" name="infants">${options(INFANTS)}</select>
            <label class="ts-check" for="${p}-direct">
              <input type="checkbox" id="${p}-direct" name="directOnly" value="Direct flights only">
              <span>Direct only</span>
            </label>
          </div>

          <div class="ts-row ts-row--flights">
            ${field({
              id: `${p}-from`, label: 'Leaving From', icon: 'pin', required: true, combo: true,
              errorFor: 'from', error: 'Where are you flying from?',
              control: input({ id: `${p}-from`, name: 'from', placeholder: 'City or airport', list: 'ts-airports', extra: comboAttrs(`${p}-from`) }),
            })}
            <button class="ts-swap" type="button" data-ts-swap aria-label="Swap departure and destination">${icon('swap', { size: 18 })}</button>
            ${field({
              id: `${p}-to`, label: 'Going To', icon: 'pin', required: true, combo: true,
              errorFor: 'to', error: 'Where are you flying to?',
              control: input({ id: `${p}-to`, name: 'to', placeholder: 'City or airport', list: 'ts-airports', extra: comboAttrs(`${p}-to`) }),
            })}
          </div>

          ${/* A second, ordinary row. The row above is a three-column grid
                built around the 44px swap button, and every field placed in it
                is positioned by an explicit nth-child rule. Adding a field to
                it dropped that field into the swap button's 44px column: the
                airline select came out one icon wide with its label broken
                across four lines. Everything that is not from/swap/to lives
                here instead, where the grid is uniform. */ ''}
          <div class="ts-row ts-row--4">
            ${field({
              id: `${p}-depart`, label: 'Departing', icon: 'calendar', required: true,
              errorFor: 'departDate', error: 'Please choose a departure date.',
              control: input({ id: `${p}-depart`, name: 'departDate', type: 'date', extra: 'data-ts-today' }),
            })}
            ${field({
              id: `${p}-return`, label: 'Returning', icon: 'calendar', cls: 'ts-field--return',
              control: input({ id: `${p}-return`, name: 'returnDate', type: 'date', extra: 'data-ts-today data-ts-return' }),
            })}
            ${nameField(p)}
            ${phoneField(p)}
            ${field({
              id: `${p}-airline`, label: 'Preferred Airline', icon: 'plane',
              control: select({ id: `${p}-airline`, name: 'airline', list: AIRLINES, selected: 'No preference' }),
            })}
          </div>

          ${/* Always shown. It used to appear only for Multi-City, which hid
                the one field people most wanted on a simple return — extra
                baggage, a preferred carrier, a stopover they cannot make. */ ''}
          <div class="ts-extra">
            <label for="${p}-itinerary">Itinerary &amp; Special Requests</label>
            <textarea class="textarea" id="${p}-itinerary" name="itinerary" rows="2"
              data-ts-itinerary
              data-ph-default="Stopover limits, seat or meal requirements, extra baggage for Zamzam, a budget to work to…"
              data-ph-multi="e.g. Islamabad → Jeddah 12 Mar, Madinah → Istanbul 19 Mar, Istanbul → Islamabad 24 Mar"
              placeholder="Stopover limits, seat or meal requirements, extra baggage for Zamzam, a budget to work to…"></textarea>
          </div>

          ${panelFoot({
            p,
            label: 'Request Fares',
            note: 'Fares move through the day, so we quote live for your dates &mdash; with baggage, routing and fare rules in writing before anything is charged.',
          })}
        </form>`;
}

function umrahPanel(hidden) {
  const p = 'tsu';
  const tiers = umrah.tiers.map((t) => t.title.replace(/ Umrah Packages$/, ''));
  const durations = umrah.durations.map((d) => `${d.days} Days`);
  return `
        <form class="ts-panel" id="ts-panel-umrah" role="tabpanel" aria-labelledby="ts-tab-umrah"
              data-ts-panel="umrah" data-ts-kind="Umrah" novalidate${hidden ? ' hidden' : ''}>
          <div class="ts-row ts-row--4">
            ${field({
              id: `${p}-tier`, label: 'Package Type', icon: 'kaaba', required: true,
              errorFor: 'packageType', error: 'Please choose a package type.',
              control: select({ id: `${p}-tier`, name: 'packageType', list: tiers, placeholder: 'Select a package' }),
            })}
            ${field({
              id: `${p}-duration`, label: 'Stay Duration', icon: 'clock',
              control: select({ id: `${p}-duration`, name: 'duration', list: durations, placeholder: 'Any duration' }),
            })}
            ${field({
              id: `${p}-date`, label: 'Travel Date', icon: 'calendar', required: true,
              errorFor: 'departDate', error: 'Please choose an approximate travel date.',
              control: input({ id: `${p}-date`, name: 'departDate', type: 'date', extra: 'data-ts-today' }),
            })}
            ${field({
              id: `${p}-pax`, label: 'Travellers', icon: 'users',
              control: select({ id: `${p}-pax`, name: 'travellers', list: PAX, selected: '1 Passenger' }),
            })}
            ${nameField(p)}
            ${phoneField(p)}
          </div>

          <div class="ts-extra">
            <label for="${p}-notes">Requirements &amp; Preferences</label>
            <textarea class="textarea" id="${p}-notes" name="notes" rows="2"
              placeholder="Room sharing, distance from the Haram, departure city, wheelchair or ground-floor needs, travelling with children…"></textarea>
          </div>

          ${panelFoot({
            p,
            label: 'Request Packages',
            note: 'Package pricing depends on the hotel, the distance from the Haram and the season. We send current options for your dates.',
          })}
        </form>`;
}

function appointmentsPanel(hidden) {
  const p = 'tsa';
  /* The client's twenty-one, and nothing else. */
  return `
        <form class="ts-panel" id="ts-panel-appointments" role="tabpanel" aria-labelledby="ts-tab-appointments"
              data-ts-panel="appointments" data-ts-kind="Appointment" novalidate${hidden ? ' hidden' : ''}>
          <div class="ts-row ts-row--4">
            ${field({
              id: `${p}-country`, label: 'Destination Country', icon: 'globe', required: true, combo: true,
              errorFor: 'country', error: 'Which country is the appointment for?',
              control: input({ id: `${p}-country`, name: 'country', placeholder: 'Type a country…', list: 'ts-countries', extra: comboAttrs(`${p}-country`) }),
            })}
            ${field({
              id: `${p}-type`, label: 'Visa Type', icon: 'passport',
              control: select({ id: `${p}-type`, name: 'visaType', list: APPOINTMENT_VISA_TYPES, placeholder: 'Select a visa type' }),
            })}
            ${field({
              id: `${p}-centre`, label: 'Application Centre', icon: 'building', combo: true,
              control: input({ id: `${p}-centre`, name: 'centre', placeholder: 'Islamabad, Lahore or Karachi', list: 'ts-centres', extra: comboAttrs(`${p}-centre`) }),
            })}
            ${field({
              id: `${p}-applicants`, label: 'Number of Applicants', icon: 'users',
              control: select({ id: `${p}-applicants`, name: 'applicants', list: APPLICANTS, selected: '1 applicant' }),
            })}
            ${field({
              id: `${p}-date`, label: 'Earliest Date You Can Travel', icon: 'calendar',
              control: input({ id: `${p}-date`, name: 'departDate', type: 'date', extra: 'data-ts-today' }),
            })}
            ${nameField(p)}
            ${phoneField(p)}
          </div>

          <div class="ts-extra">
            <label for="${p}-notes">Anything We Should Know</label>
            <textarea class="textarea" id="${p}-notes" name="notes" rows="2"
              placeholder="Whether the file is already prepared, dates you cannot attend, a deadline you are working to…"></textarea>
          </div>

          ${panelFoot({
            p,
            label: 'Check Availability',
            note: 'Slots are released by the centre, not by us, and they move. We monitor the ones for your country and tell you honestly what the realistic wait is.',
          })}
        </form>`;
}

function visaPanel(hidden) {
  const p = 'tsv';
  return `
        <form class="ts-panel" id="ts-panel-visa" role="tabpanel" aria-labelledby="ts-tab-visa"
              data-ts-panel="visa" data-ts-kind="Visa" novalidate${hidden ? ' hidden' : ''}>
          <div class="ts-row ts-row--3">
            ${field({
              id: `${p}-country`, label: 'Destination Country', icon: 'globe', required: true, combo: true,
              errorFor: 'country', error: 'Please choose a destination country.',
              control: input({ id: `${p}-country`, name: 'country', placeholder: 'Type a country…', list: 'ts-countries', extra: comboAttrs(`${p}-country`) }),
            })}
            ${field({
              id: `${p}-type`, label: 'Visa Type', icon: 'passport', required: true,
              errorFor: 'visaType', error: 'Please choose a visa type.',
              control: select({ id: `${p}-type`, name: 'visaType', list: visaTypes.map((v) => v.title), placeholder: 'Select a visa type' }),
            })}
            ${field({
              id: `${p}-date`, label: 'Intended Travel Date', icon: 'calendar',
              control: input({ id: `${p}-date`, name: 'departDate', type: 'date', extra: 'data-ts-today' }),
            })}
            ${field({
              id: `${p}-applicants`, label: 'Number of Applicants', icon: 'users',
              control: select({ id: `${p}-applicants`, name: 'applicants', list: APPLICANTS, selected: '1 applicant' }),
            })}
            ${nameField(p)}
            ${phoneField(p)}
          </div>

          <div class="ts-extra">
            <label for="${p}-notes">Anything We Should Know</label>
            <textarea class="textarea" id="${p}-notes" name="notes" rows="2"
              placeholder="Previous refusals, travel history, who is travelling with you, employment or sponsorship, a deadline you are working to…"></textarea>
          </div>

          ${panelFoot({
            p,
            label: 'Check Eligibility',
            note: 'We assess your profile against the current requirements before you pay an embassy fee. No visa can be guaranteed &mdash; the decision rests with the mission.',
          })}
        </form>`;
}

function hotelsPanel(hidden) {
  const p = 'tsh';
  return `
        <form class="ts-panel" id="ts-panel-hotels" role="tabpanel" aria-labelledby="ts-tab-hotels"
              data-ts-panel="hotels" data-ts-kind="Hotel" novalidate${hidden ? ' hidden' : ''}>
          <div class="ts-row ts-row--hotels">
            ${field({
              id: `${p}-city`, label: 'City or Area', icon: 'pin', required: true, cls: 'ts-field--wide', combo: true,
              errorFor: 'city', error: 'Which city are you staying in?',
              control: input({ id: `${p}-city`, name: 'city', placeholder: 'City, area or hotel', list: 'ts-hotel-cities', extra: comboAttrs(`${p}-city`) }),
            })}
            ${field({
              id: `${p}-in`, label: 'Check In', icon: 'calendar', required: true,
              errorFor: 'checkIn', error: 'Please choose a check-in date.',
              control: input({ id: `${p}-in`, name: 'checkIn', type: 'date', extra: 'data-ts-today' }),
            })}
            ${field({
              id: `${p}-out`, label: 'Check Out', icon: 'calendar',
              control: input({ id: `${p}-out`, name: 'checkOut', type: 'date', extra: 'data-ts-today' }),
            })}
            ${field({
              id: `${p}-guests`, label: 'Guests', icon: 'users',
              control: select({ id: `${p}-guests`, name: 'guests', list: GUESTS, selected: '2 Guests' }),
            })}
            ${field({
              id: `${p}-rooms`, label: 'Rooms', icon: 'bed',
              control: select({ id: `${p}-rooms`, name: 'rooms', list: ROOMS }),
            })}
            ${field({
              id: `${p}-cat`, label: 'Hotel Category', icon: 'star', combo: true,
              control: input({ id: `${p}-cat`, name: 'category', placeholder: 'Any category', list: 'ts-hotel-categories', extra: comboAttrs(`${p}-cat`) }),
            })}
            ${nameField(p)}
            ${phoneField(p)}
          </div>

          <div class="ts-extra">
            <label for="${p}-notes">Requirements &amp; Preferences</label>
            <textarea class="textarea" id="${p}-notes" name="notes" rows="2"
              placeholder="Haram view, connecting or family rooms, late check-in, breakfast included, walking distance…"></textarea>
          </div>

          ${panelFoot({
            p,
            label: 'Request Hotel Rates',
            note: 'Haram-view and walking-distance rooms move fastest in Ramadan and around Hajj. We confirm the real walking distance, not the marketing one.',
          })}
        </form>`;
}

const PANELS = {
  umrah: umrahPanel,
  appointments: appointmentsPanel,
  visa: visaPanel,
  flights: flightsPanel,
  hotels: hotelsPanel,
};

/* ------------------------------------------------------------------ Widget */

/**
 * @param {object} opts
 * @param {string} opts.active   which tab opens first: flights | umrah | visa | hotels
 * @param {boolean} opts.overlap pull the card up over the hero above it
 * @param {string} opts.title    optional heading above the card
 */
function searchWidget({ active = 'flights', overlap = true, title = '', backdrop = false } = {}) {
  const panels = TABS.map((t) => PANELS[t.key](t.key !== active)).join('');

  /* The client's reference design sits the form on a photograph rather than
     on flat page colour. It is an <img>, not a CSS background, because
     /assets/* is served immutable and only markup can carry the cache-
     busting hash that asset() appends. */
  const photo = backdrop ? `
    <div class="ts__backdrop" aria-hidden="true">
      <img src="${attr(asset('/assets/img/search-backdrop.jpg'))}"
           srcset="${attr(asset('/assets/img/search-backdrop.jpg'))} 1600w,
                   ${attr(asset('/assets/img/search-backdrop-2560.jpg'))} 2560w"
           sizes="100vw" alt="" width="1600" height="900" decoding="async" fetchpriority="low">
    </div>` : '';

  return `
  ${/* data-ts lives on the OUTER block, not on the card. The tab strip sits
        outside the card, and main.js scopes its tab lookup to the data-ts
        element — with the hook on the card it found no tabs, returned early,
        and every tab showed the Umrah panel. */ ''}
  <div class="ts${overlap ? ' ts--overlap' : ''}${backdrop ? ' ts--photo' : ''}" data-ts data-ts-active="${attr(active)}">
    ${photo}
    <div class="container">
      ${title ? `<h2 class="ts__title">${esc(title)}</h2>` : ''}
      ${/* The tab strip sits OUTSIDE the card, so the tabs read as tabs —
            attached to the panel, with the page showing between and beside
            them — rather than as a toolbar inside a white box. */ ''}
      <div class="ts__tabs" role="tablist" aria-label="What are you looking for?">
        ${each(TABS, (t) => `
        <button class="ts__tab${t.key === active ? ' is-active' : ''}" type="button" role="tab"
                id="ts-tab-${attr(t.key)}" aria-controls="ts-panel-${attr(t.key)}"
                aria-selected="${t.key === active}" tabindex="${t.key === active ? '0' : '-1'}"
                data-ts-tab="${attr(t.key)}">${icon(t.icon, { size: 18 })} <span>${esc(t.label)}</span></button>`)}
      </div>
      <div class="ts__card">
        <div class="ts__body">
          ${panels}
        </div>
      </div>
    </div>
    <datalist id="ts-airports">${each(AIRPORTS, (a) => `<option value="${attr(a)}"></option>`)}</datalist>
    <datalist id="ts-hotel-cities">${each(HOTEL_PLACES, (h) => `<option value="${attr(h)}"></option>`)}</datalist>
    <datalist id="ts-hotel-categories">${each(HOTEL_CATEGORIES, (h) => `<option value="${attr(h)}"></option>`)}</datalist>
    <datalist id="ts-centres">${each(APPOINTMENT_CITIES, (h) => `<option value="${attr(h)}"></option>`)}</datalist>
    <datalist id="ts-countries">${each(countrySuggestions(appointmentCountries), (c) => `<option value="${attr(c)}"></option>`)}</datalist>
  </div>`;
}

/* -------------------------------------------------------------------------
   Assurance strip — the four short promises that sit directly under the
   widget on the ticketing pages. Deliberately four one-line claims, each
   of which the agency can actually stand behind; the licence copies
   themselves are covered by trustStrip() on the home page.
   ------------------------------------------------------------------------- */
const ASSURANCES = {
  flights: [
    { icon: 'award', title: 'IATA Accredited', text: 'Ticketed through an accredited desk, not a reseller.' },
    { icon: 'globe', title: 'Worldwide Airlines', text: 'Full-service and low-cost carriers on every major route.' },
    { icon: 'wallet', title: 'Live Fares', text: 'Current price for your dates, with the fare rules in writing.' },
    { icon: 'headset', title: 'Support After Booking', text: 'Date changes, reissues and cancellations handled by a person.' },
  ],
};

/**
 * @param {string} key  which set of promises to render (currently 'flights')
 */
function assuranceStrip(key = 'flights') {
  const items = ASSURANCES[key];
  if (!items) return '';
  return `
  <div class="assure">
    <div class="container">
      <div class="assure__grid">
        ${each(items, (a) => `
        <div class="assure__item">
          <span class="assure__icon">${icon(a.icon, { size: 22 })}</span>
          <div>
            <h3 class="assure__title">${esc(a.title)}</h3>
            <p class="assure__text">${esc(a.text)}</p>
          </div>
        </div>`)}
      </div>
    </div>
  </div>`;
}

module.exports = { searchWidget, assuranceStrip, TABS };
