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
const { routes } = require('../data/flights');
const umrah = require('../data/umrah');
const visaTypes = require('../data/visa-types');
const { countries } = require('../data/visa-countries');
const hotels = require('../data/hotels');

/* ---------------------------------------------------------------- Options */

/* Airport suggestions come from the routes we actually publish pages for,
   plus the departure cities the agency sells from. Free text is still
   allowed — the datalist is a shortcut, never a restriction. */
const AIRPORTS = (() => {
  const seen = new Map();
  const add = (city, code, name) => {
    if (!code || seen.has(code)) return;
    seen.set(code, `${city} (${code}) — ${name}`);
  };
  routes.forEach((r) => {
    add(r.from, r.fromCode, r.fromAirport);
    add(r.to, r.toCode, r.toAirport);
  });
  add('Madinah', 'MED', 'Prince Mohammad bin Abdulaziz International Airport');
  add('Peshawar', 'PEW', 'Bacha Khan International Airport');
  add('Multan', 'MUX', 'Multan International Airport');
  add('Sialkot', 'SKT', 'Sialkot International Airport');
  add('Faisalabad', 'LYP', 'Faisalabad International Airport');
  add('Quetta', 'UET', 'Quetta International Airport');
  return Array.from(seen.values()).sort();
})();

const CABINS = ['Economy', 'Premium Economy', 'Business', 'First'];

const PAX = ['1 Passenger', '2 Passengers', '3 Passengers', '4 Passengers', '5 Passengers',
  '6 Passengers', '7–10 Passengers', '11–20 Passengers', 'Group of 20+'];

const TRIP_TYPES = [
  { value: 'Return', label: 'Return' },
  { value: 'One Way', label: 'One Way' },
  { value: 'Multi-City', label: 'Multi-City' },
];

const HOTEL_CITIES = hotels.map((h) => h.city).filter(Boolean);

const HOTEL_CATEGORIES = ['5 Star', '4 Star', '3 Star', 'Apartment / Aparthotel', 'Nearest to Haram', 'Best value'];

const ROOMS = ['1 Room', '2 Rooms', '3 Rooms', '4 Rooms', '5+ Rooms'];

const GUESTS = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '7+ Guests'];

const TABS = [
  { key: 'flights', label: 'Flights', icon: 'plane' },
  { key: 'umrah', label: 'Umrah', icon: 'kaaba' },
  { key: 'visa', label: 'Visa', icon: 'passport' },
  { key: 'hotels', label: 'Hotels', icon: 'hotel' },
];

/* ------------------------------------------------------------- Field bits */

function options(list, { placeholder = '', selected = '' } = {}) {
  const head = placeholder ? `<option value="">${esc(placeholder)}</option>` : '';
  return head + list
    .map((o) => {
      const value = typeof o === 'string' ? o : o.value;
      const label = typeof o === 'string' ? o : o.label;
      return `<option value="${attr(value)}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`;
    })
    .join('');
}

/** A labelled control with an icon sitting inside the box. */
function field({ id, label, icon: name, control, cls = '', required = false, errorFor = '', error = '' }) {
  return `
            <div class="ts-field ${cls}">
              <label for="${attr(id)}">${esc(label)}${required ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
              <div class="ts-control">
                ${name ? `<span class="ts-control__icon">${icon(name, { size: 17 })}</span>` : ''}
                ${control}
              </div>
              ${errorFor ? `<span class="field__error" data-error-for="${attr(errorFor)}">${esc(error)}</span>` : ''}
            </div>`;
}

function input({ id, name, type = 'text', placeholder = '', list = '', extra = '' }) {
  return `<input class="ts-input" type="${attr(type)}" id="${attr(id)}" name="${attr(name)}"` +
    `${placeholder ? ` placeholder="${attr(placeholder)}"` : ''}` +
    `${list ? ` list="${attr(list)}" autocomplete="off"` : ''} ${extra}>`;
}

function select({ id, name, list, placeholder = '', selected = '' }) {
  return `<select class="ts-input ts-input--select" id="${attr(id)}" name="${attr(name)}">` +
    `${options(list, { placeholder, selected })}</select>`;
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
function panelFoot({ p, label, note }) {
  return `
          <div class="hp-field" aria-hidden="true">
            <label for="${attr(p)}-company">Company (leave blank)</label>
            <input type="text" id="${attr(p)}-company" name="company" tabindex="-1" autocomplete="off">
          </div>
          <div class="ts-foot">
            <p class="ts-note">${note}</p>
            <button class="btn btn--gold btn--lg ts-submit" type="submit">${icon('search', { size: 16 })} ${esc(label)}</button>
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
            <label class="sr-only" for="${p}-pax">Passengers</label>
            <select class="ts-mini" id="${p}-pax" name="travellers">${options(PAX)}</select>
            <label class="ts-check" for="${p}-direct">
              <input type="checkbox" id="${p}-direct" name="directOnly" value="Direct flights only">
              <span>Direct only</span>
            </label>
          </div>

          <div class="ts-row ts-row--flights">
            ${field({
              id: `${p}-from`, label: 'Leaving From', icon: 'pin', required: true,
              errorFor: 'from', error: 'Where are you flying from?',
              control: input({ id: `${p}-from`, name: 'from', placeholder: 'City or airport', list: 'ts-airports' }),
            })}
            <button class="ts-swap" type="button" data-ts-swap aria-label="Swap departure and destination">${icon('swap', { size: 18 })}</button>
            ${field({
              id: `${p}-to`, label: 'Going To', icon: 'pin', required: true,
              errorFor: 'to', error: 'Where are you flying to?',
              control: input({ id: `${p}-to`, name: 'to', placeholder: 'City or airport', list: 'ts-airports' }),
            })}
            ${field({
              id: `${p}-depart`, label: 'Departing', icon: 'calendar', required: true,
              errorFor: 'departDate', error: 'Please choose a departure date.',
              control: input({ id: `${p}-depart`, name: 'departDate', type: 'date', extra: 'data-ts-today' }),
            })}
            ${field({
              id: `${p}-return`, label: 'Returning', icon: 'calendar', cls: 'ts-field--return',
              control: input({ id: `${p}-return`, name: 'returnDate', type: 'date', extra: 'data-ts-today data-ts-return' }),
            })}
            ${phoneField(p)}
          </div>

          <div class="ts-extra" data-ts-multicity hidden>
            <label for="${p}-itinerary">Your full itinerary</label>
            <textarea class="textarea" id="${p}-itinerary" name="itinerary" rows="2"
              placeholder="e.g. Islamabad → Jeddah 12 Mar, Madinah → Istanbul 19 Mar, Istanbul → Islamabad 24 Mar"></textarea>
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
            ${phoneField(p)}
          </div>

          ${panelFoot({
            p,
            label: 'Request Packages',
            note: 'Package pricing depends on the hotel, the distance from the Haram and the season. We send current options for your dates.',
          })}
        </form>`;
}

function visaPanel(hidden) {
  const p = 'tsv';
  const countryNames = [...countries.map((c) => c.name), 'Another country'];
  return `
        <form class="ts-panel" id="ts-panel-visa" role="tabpanel" aria-labelledby="ts-tab-visa"
              data-ts-panel="visa" data-ts-kind="Visa" novalidate${hidden ? ' hidden' : ''}>
          <div class="ts-row ts-row--3">
            ${field({
              id: `${p}-country`, label: 'Destination Country', icon: 'globe', required: true,
              errorFor: 'country', error: 'Please choose a destination country.',
              control: select({ id: `${p}-country`, name: 'country', list: countryNames, placeholder: 'Select a country' }),
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
            ${phoneField(p)}
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
              id: `${p}-city`, label: 'City or Area', icon: 'pin', required: true, cls: 'ts-field--wide',
              errorFor: 'city', error: 'Which city are you staying in?',
              control: input({ id: `${p}-city`, name: 'city', placeholder: 'e.g. Makkah, Madinah, Dubai', list: 'ts-hotel-cities' }),
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
              id: `${p}-cat`, label: 'Hotel Category', icon: 'star',
              control: select({ id: `${p}-cat`, name: 'category', list: HOTEL_CATEGORIES, placeholder: 'Any category' }),
            })}
            ${phoneField(p)}
          </div>

          ${panelFoot({
            p,
            label: 'Request Hotel Rates',
            note: 'Haram-view and walking-distance rooms move fastest in Ramadan and around Hajj. We confirm the real walking distance, not the marketing one.',
          })}
        </form>`;
}

const PANELS = { flights: flightsPanel, umrah: umrahPanel, visa: visaPanel, hotels: hotelsPanel };

/* ------------------------------------------------------------------ Widget */

/**
 * @param {object} opts
 * @param {string} opts.active   which tab opens first: flights | umrah | visa | hotels
 * @param {boolean} opts.overlap pull the card up over the hero above it
 * @param {string} opts.title    optional heading above the card
 */
function searchWidget({ active = 'flights', overlap = true, title = '' } = {}) {
  const panels = TABS.map((t) => PANELS[t.key](t.key !== active)).join('');

  return `
  <div class="ts${overlap ? ' ts--overlap' : ''}">
    <div class="container">
      ${title ? `<h2 class="ts__title">${esc(title)}</h2>` : ''}
      <div class="ts__card" data-ts data-ts-active="${attr(active)}">
        <div class="ts__head">
          <div class="ts__tabs" role="tablist" aria-label="What are you looking for?">
            ${each(TABS, (t) => `
            <button class="ts__tab${t.key === active ? ' is-active' : ''}" type="button" role="tab"
                    id="ts-tab-${attr(t.key)}" aria-controls="ts-panel-${attr(t.key)}"
                    aria-selected="${t.key === active}" tabindex="${t.key === active ? '0' : '-1'}"
                    data-ts-tab="${attr(t.key)}">${icon(t.icon, { size: 18 })} <span>${esc(t.label)}</span></button>`)}
          </div>
          <div class="ts__brand">
            <span class="ts__brand-name">${esc(site.shortName)}</span>
            <span class="ts__brand-sub">Travel Desk &middot; Islamabad</span>
          </div>
        </div>
        <div class="ts__body">
          ${panels}
        </div>
      </div>
    </div>
    <datalist id="ts-airports">${each(AIRPORTS, (a) => `<option value="${attr(a)}"></option>`)}</datalist>
    <datalist id="ts-hotel-cities">${each(HOTEL_CITIES, (h) => `<option value="${attr(h)}"></option>`)}</datalist>
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
