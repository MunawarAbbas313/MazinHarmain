/* ==========================================================================
   MAZIN HARAMAIN TOURS & TRAVELS — site behaviour
   Vanilla JS, no dependencies. Every block is defensive: if an element is not
   on the page the feature simply does not initialise.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Config injected at build time ----------------------------------- */
  var CONFIG = window.MH_CONFIG || {};
  var WA_NUMBER = CONFIG.whatsapp || '923135500022';
  /* Both inboxes. A mailto takes a comma-separated list, so an enquiry does
     not depend on which one is being watched that day. */
  var EMAIL = [CONFIG.email, CONFIG.emailAlt].filter(Boolean).join(',') || 'info@mhtravel.pk';
  var ENDPOINT = CONFIG.formEndpoint || '';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ======================================================================
     1. Mobile navigation drawer
     ====================================================================== */
  (function mobileNav() {
    var toggle = $('.nav-toggle');
    var drawer = $('#mobile-nav');
    var backdrop = $('.backdrop');
    if (!toggle || !drawer || !backdrop) return;

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.hidden = false;
      // next frame so the transition runs
      requestAnimationFrame(function () { backdrop.classList.add('is-open'); });
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('no-scroll');
      var first = drawer.querySelector('a, button');
      if (first) first.focus();
    }

    function close() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.classList.remove('is-open');
      window.setTimeout(function () {
        if (!backdrop.classList.contains('is-open')) backdrop.hidden = true;
      }, 300);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    }

    toggle.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) { close(); } else { open(); }
    });

    $$('[data-close-nav]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });

    // Trap focus inside the drawer while it is open
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = $$('a[href], button:not([disabled])', drawer).filter(function (el) {
        return el.offsetParent !== null;
      });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Sub-menu expanders
    $$('.m-toggle', drawer).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var panel = btn.nextElementSibling;
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.classList.toggle('is-open', !expanded);
      });
    });

    // Close the drawer if the viewport grows past the desktop breakpoint
    var mq = window.matchMedia('(min-width: 992px)');
    var onChange = function (e) { if (e.matches && drawer.classList.contains('is-open')) close(); };
    if (mq.addEventListener) { mq.addEventListener('change', onChange); }
    else if (mq.addListener) { mq.addListener(onChange); }
  })();

  /* ======================================================================
     2. Sticky header shadow
     ====================================================================== */
  (function stickyHeader() {
    var header = $('#site-header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ======================================================================
     3. Accordions (FAQ)
     ====================================================================== */
  (function accordions() {
    $$('[data-accordion]').forEach(function (root) {
      var buttons = $$('.accordion__btn', root);
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          var panel = document.getElementById(btn.getAttribute('aria-controls'));
          // single-open behaviour
          buttons.forEach(function (other) {
            if (other === btn) return;
            other.setAttribute('aria-expanded', 'false');
            var p = document.getElementById(other.getAttribute('aria-controls'));
            if (p) p.classList.remove('is-open');
          });
          btn.setAttribute('aria-expanded', String(!expanded));
          if (panel) panel.classList.toggle('is-open', !expanded);
        });
      });
    });

    // Open the accordion item targeted by the URL hash
    if (window.location.hash) {
      var targetId;
      try { targetId = decodeURIComponent(window.location.hash.slice(1)); }
      catch (_) { targetId = window.location.hash.slice(1); }
      var target = document.getElementById(targetId);
      if (target && target.classList.contains('accordion__panel')) {
        var ctrl = $$('.accordion__btn').filter(function (btn) {
          return btn.getAttribute('aria-controls') === target.id;
        })[0];
        if (ctrl) ctrl.click();
      }
    }
  })();

  /* ======================================================================
     4. Back to top
     ====================================================================== */
  (function backToTop() {
    var btn = $('#back-to-top');
    if (!btn) return;
    var ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    update();
  })();

  /* ======================================================================
     5. Reveal on scroll
     ====================================================================== */
  (function reveal() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
    items.forEach(function (el) {
      io.observe(el);
      el.classList.add('is-pending');
    });
  })();

  /* ======================================================================
     6. Lead forms
     ----------------------------------------------------------------------
     Order of preference:
       1. POST to the configured endpoint (a real CRM / form service)
       2. Otherwise hand the lead to WhatsApp, pre-formatted
       3. mailto: is always offered as a secondary route
     ====================================================================== */
  (function leadForms() {
    var forms = $$('[data-lead-form]');
    if (!forms.length) return;

    var LABELS = {
      name: 'Name', phone: 'Phone / WhatsApp', email: 'Email', service: 'Service',
      destination: 'Destination', travelDate: 'Travel date', travellers: 'Travellers',
      budget: 'Budget', message: 'Message',
    };

    function setError(field, show) {
      var input = field.input;
      var msg = field.error;
      if (input) {
        input.classList.toggle('is-invalid', show);
        input.setAttribute('aria-invalid', String(show));
      }
      if (msg) msg.classList.toggle('is-visible', show);
    }

    function fieldsOf(form) {
      return $$('[required]', form).map(function (input) {
        var name = input.getAttribute('name');
        return { input: input, name: name, error: form.querySelector('[data-error-for="' + name + '"]') };
      });
    }

    function validEmail(v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
    function validPhone(v) { return (v.replace(/[^0-9]/g, '').length >= 10); }

    function validate(form) {
      var ok = true;
      var firstBad = null;
      fieldsOf(form).forEach(function (f) {
        var el = f.input;
        var value = el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
        var bad = el.type === 'checkbox' ? !value : !value;
        if (!bad && f.name === 'phone' && !validPhone(value)) bad = true;
        setError(f, bad);
        if (bad) { ok = false; if (!firstBad) firstBad = el; }
      });
      // optional email, but must look like one if filled
      var email = form.querySelector('[name="email"]');
      if (email) {
        var emailBad = !validEmail(String(email.value || '').trim());
        var emailErr = form.querySelector('[data-error-for="email"]');
        setError({ input: email, error: emailErr }, emailBad);
        if (emailBad) { ok = false; if (!firstBad) firstBad = email; }
      }
      if (firstBad) firstBad.focus();
      return ok;
    }

    function collect(form) {
      var data = {};
      $$('input, select, textarea', form).forEach(function (el) {
        var name = el.getAttribute('name');
        if (!name || name === 'company') return;
        if (el.type === 'checkbox') { data[name] = el.checked ? 'Yes' : 'No'; return; }
        var v = String(el.value || '').trim();
        if (v) data[name] = v;
      });
      return data;
    }

    function asText(data) {
      var lines = ['*New Travel Inquiry — Mazin Haramain Tours & Travels*', ''];
      Object.keys(LABELS).forEach(function (key) {
        if (data[key]) lines.push(LABELS[key] + ': ' + data[key]);
      });
      lines.push('', 'Sent from ' + window.location.href);
      return lines.join('\n');
    }

    function status(form, kind, html) {
      var box = $('[data-form-status]', form);
      if (!box) return;
      box.className = 'form-status is-visible form-status--' + kind;
      box.innerHTML = html;
    }

    forms.forEach(function (form) {
      // Associate the existing inline messages with their form controls.
      $$('[data-error-for]', form).forEach(function (error) {
        var input = form.querySelector('[name="' + error.getAttribute('data-error-for') + '"]');
        if (!input) return;
        error.id = form.id + '-' + input.name + '-error';
        var describedBy = input.getAttribute('aria-describedby');
        input.setAttribute('aria-describedby', (describedBy ? describedBy + ' ' : '') + error.id);
      });
      // Clear the error state as soon as the visitor fixes a field
      $$('input, select, textarea', form).forEach(function (el) {
        var evt = (el.tagName === 'SELECT' || el.type === 'checkbox' || el.type === 'date') ? 'change' : 'input';
        el.addEventListener(evt, function () {
          var name = el.getAttribute('name');
          var err = form.querySelector('[data-error-for="' + name + '"]');
          el.classList.remove('is-invalid');
          el.removeAttribute('aria-invalid');
          if (err) err.classList.remove('is-visible');
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Honeypot — a filled "company" field means a bot
        var hp = form.querySelector('[name="company"]');
        if (hp && hp.value) return;

        if (!validate(form)) {
          status(form, 'err', 'Please complete the highlighted fields and try again.');
          return;
        }

        var data = collect(form);
        var text = asText(data);
        var submitBtn = form.querySelector('[type="submit"]');
        var original = submitBtn ? submitBtn.textContent : '';

        function restoreButton() {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = original; }
        }

        function finish(endpointFailed) {
          var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
          var mailUrl = 'mailto:' + EMAIL +
            '?subject=' + encodeURIComponent('Travel Inquiry — ' + (data.name || 'Website')) +
            '&body=' + encodeURIComponent(text.replace(/\*/g, ''));
          status(
            form, 'ok',
            '<strong>Thank you, ' + (data.name ? escapeHtml(data.name.split(' ')[0]) : 'there') + '.</strong> ' +
            (endpointFailed ? 'We could not confirm delivery through the form. ' : '') +
            'Your inquiry is ready, but has not been sent. Choose WhatsApp or email below and send your message to our team:<br><br>' +
            '<a class="btn btn--whatsapp btn--sm" href="' + waUrl + '" target="_blank" rel="noopener">Send on WhatsApp</a> ' +
            '<a class="btn btn--ghost btn--sm" href="' + mailUrl + '">Send by Email</a>'
          );
          // Keep details until delivery is confirmed. Explicit links also
          // work when browsers block popups after asynchronous requests.
          restoreButton();
        }

        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

        if (ENDPOINT) {
          var controller = new AbortController();
          var timeout = window.setTimeout(function () { controller.abort(); }, 15000);
          fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
            signal: controller.signal,
          })
            .then(function (res) {
              if (!res.ok) throw new Error('Bad response');
              return res.status === 204 ? null : res.json();
            })
            .then(function (result) {
              if (result && (result.success === false || result.ok === false || result.error || (result.errors && (!Array.isArray(result.errors) || result.errors.length)))) {
                throw new Error('Inquiry rejected');
              }
              status(form, 'ok', '<strong>Thank you.</strong> Your inquiry has been received — our team will contact you shortly.');
              if (window.gtag) window.gtag('event', 'generate_lead', { event_label: data.service || 'general' });
              form.reset();
              restoreButton();
              window.location.href = form.getAttribute('data-success-url') || '/thank-you/';
            })
            .catch(function () { finish(true); })
            .finally(function () { window.clearTimeout(timeout); });
        } else {
          finish();
        }
      });
    });

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }
  })();

  /* ======================================================================
     7. Travel search widget
     ----------------------------------------------------------------------
     Tab switching, the from/to swap, the trip-type rules and the date
     floors. Submitting follows the same order of preference as the lead
     forms above: the configured endpoint first, otherwise a pre-formatted
     WhatsApp message with a mailto fallback. There is no booking engine
     behind this — the buttons say "Request" because that is what happens.
     ====================================================================== */
  (function travelSearch() {
    var widgets = $$('[data-ts]');
    if (!widgets.length) return;

    /* Field order and wording of the message the consultant receives. */
    var LABELS = {
      tripType: 'Trip type', from: 'From', to: 'To',
      departDate: 'Departing', returnDate: 'Returning', itinerary: 'Itinerary',
      cabin: 'Cabin', travellers: 'Travellers', directOnly: 'Preference',
      adults: 'Adults', children: 'Children', infants: 'Infants', airline: 'Preferred airline',
      packageType: 'Package', duration: 'Duration',
      country: 'Destination', visaType: 'Visa type', centre: 'Application centre',
      city: 'City / area', checkIn: 'Check in', checkOut: 'Check out',
      guests: 'Guests', rooms: 'Rooms', category: 'Hotel category',
      notes: 'Requirements', name: 'Name', applicants: 'Applicants', phone: 'WhatsApp',
    };
    /* One order per tab, so the consultant reads the request in the order
       the visitor filled it in. */
    var ORDER = {
      Flight: ['name', 'tripType', 'from', 'to', 'departDate', 'returnDate', 'adults', 'children', 'infants', 'cabin', 'airline', 'directOnly', 'itinerary', 'phone'],
      Umrah: ['name', 'packageType', 'duration', 'departDate', 'travellers', 'notes', 'phone'],
      Visa: ['name', 'country', 'visaType', 'applicants', 'departDate', 'notes', 'phone'],
      Appointment: ['name', 'country', 'visaType', 'centre', 'applicants', 'departDate', 'notes', 'phone'],
      Hotel: ['name', 'city', 'checkIn', 'checkOut', 'guests', 'rooms', 'category', 'notes', 'phone'],
    };
    /* "Departing" is right for a flight and wrong for the other three. */
    var LABEL_OVERRIDES = {
      Umrah: { departDate: 'Travel date' },
      Visa: { departDate: 'Intended travel date' },
      Appointment: { departDate: 'Earliest travel date' },
    };
    var HEADINGS = {
      Flight: 'Flight Fare Request',
      Umrah: 'Umrah Package Request',
      Visa: 'Visa Eligibility Request',
      Appointment: 'Visa Appointment Request',
      Hotel: 'Hotel Rate Request',
    };
    var DATE_KEYS = { departDate: 1, returnDate: 1, checkIn: 1, checkOut: 1 };

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function todayISO() {
      var d = new Date();
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    /* "2026-03-12" -> "12 Mar 2026". Built in UTC so the day never slips. */
    function prettyDate(iso) {
      var parts = String(iso).split('-');
      if (parts.length !== 3) return iso;
      var d = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
      if (isNaN(d.getTime())) return iso;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    }

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    function validPhone(v) { return v.replace(/[^0-9]/g, '').length >= 10; }

    function setError(input, show) {
      if (!input) return;
      var form = input.form;
      var err = form ? form.querySelector('[data-error-for="' + input.name + '"]') : null;
      input.classList.toggle('is-invalid', show);
      if (show) { input.setAttribute('aria-invalid', 'true'); } else { input.removeAttribute('aria-invalid'); }
      if (err) err.classList.toggle('is-visible', show);
    }

    function status(form, kind, html) {
      var box = $('[data-form-status]', form);
      if (!box) return;
      box.className = 'form-status is-visible form-status--' + kind;
      box.innerHTML = html;
    }

    /* ---- Tabs ---------------------------------------------------------- */
    function initTabs(widget) {
      var tabs = $$('[data-ts-tab]', widget);
      var panels = $$('[data-ts-panel]', widget);
      if (!tabs.length) return;

      function activate(key, focus) {
        var found = false;
        tabs.forEach(function (tab) {
          var on = tab.getAttribute('data-ts-tab') === key;
          if (on) found = true;
          tab.classList.toggle('is-active', on);
          tab.setAttribute('aria-selected', String(on));
          tab.tabIndex = on ? 0 : -1;
          if (on && focus) tab.focus();
        });
        if (!found) return;
        panels.forEach(function (panel) {
          panel.hidden = panel.getAttribute('data-ts-panel') !== key;
        });
        widget.setAttribute('data-ts-active', key);
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activate(tab.getAttribute('data-ts-tab'));
        });
      });

      // Roving focus, as the tablist pattern expects.
      widget.addEventListener('keydown', function (e) {
        if (tabs.indexOf(document.activeElement) === -1) return;
        var i = tabs.indexOf(document.activeElement);
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        e.preventDefault();
        activate(next.getAttribute('data-ts-tab'), true);
      });

      /* Deep links: /umrah-packages/#umrah and ?tab=umrah both work, so a
         campaign link can open the widget on the right tab. */
      var wanted = '';
      try {
        var q = new URLSearchParams(window.location.search).get('tab');
        if (q) wanted = q.toLowerCase();
      } catch (_) { /* older browsers: hash only */ }
      if (!wanted && window.location.hash) wanted = window.location.hash.slice(1).toLowerCase();
      if (wanted) activate(wanted);
    }

    /* ---- Type-ahead comboboxes -----------------------------------------
       The place fields were plain <datalist>s, which only match from the
       start of the string and give up entirely on a typo: "jedah" found
       nothing, and "jinnah" would not find Karachi. These search the city,
       the IATA code and the airport name together, and tolerate a slip or
       two in the spelling.

       Progressive enhancement: the <datalist> stays in the markup and keeps
       working without JavaScript. We strip the `list` attribute only once
       we have successfully taken over, so the two never open at once.
       -------------------------------------------------------------------- */
    var MAX_SUGGESTIONS = 8;

    function normalise(v) {
      var s = String(v).toLowerCase();
      return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s;
    }

    /* Levenshtein, abandoned the moment it exceeds `max` — the question is
       only ever "within one or two edits?", never "how far apart?". */
    function within(a, b, max) {
      if (Math.abs(a.length - b.length) > max) return false;
      var prev = [];
      var cur = [];
      var i, j;
      for (j = 0; j <= b.length; j++) prev[j] = j;
      for (i = 1; i <= a.length; i++) {
        cur[0] = i;
        var best = i;
        for (j = 1; j <= b.length; j++) {
          cur[j] = Math.min(
            prev[j] + 1,
            cur[j - 1] + 1,
            prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1)
          );
          if (cur[j] < best) best = cur[j];
        }
        if (best > max) return false;
        prev = cur.slice();
      }
      return prev[b.length] <= max;
    }

    /* Lower rank is a better match. null means "no match at all". */
    function scoreToken(opt, token) {
      var at = opt.norm.indexOf(token);
      if (at === 0) return { rank: 0, at: 0, len: token.length };

      var k;
      for (k = 0; k < opt.words.length; k++) {
        if (opt.words[k].indexOf(token) === 0) {
          return { rank: 1, at: opt.norm.indexOf(opt.words[k]), len: token.length };
        }
      }
      if (at > 0) return { rank: 2, at: at, len: token.length };

      /* Truncated with a wrong last letter — "barca" for Barcelona. Without
         this the only hit for that query was Bursa, which is worse than
         nothing: a confident wrong answer. */
      if (token.length >= 4) {
        var stem = token.slice(0, -1);
        for (k = 0; k < opt.words.length; k++) {
          if (opt.words[k].indexOf(stem) === 0) {
            return { rank: 2, at: opt.norm.indexOf(opt.words[k]), len: stem.length };
          }
        }
      }

      var tol = token.length <= 4 ? 1 : 2;
      for (k = 0; k < opt.words.length; k++) {
        if (within(opt.words[k], token, tol)) {
          return { rank: 3, at: opt.norm.indexOf(opt.words[k]), len: opt.words[k].length };
        }
      }
      return null;
    }

    function search(options, query) {
      var tokens = normalise(query).split(/\s+/).filter(Boolean);
      if (!tokens.length) {
        return options.slice(0, MAX_SUGGESTIONS).map(function (o) {
          return { opt: o, mark: null };
        });
      }

      var hits = [];
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var worst = 0;
        var mark = null;
        var ok = true;
        for (var t = 0; t < tokens.length; t++) {
          var sc = scoreToken(opt, tokens[t]);
          if (!sc) { ok = false; break; }
          if (sc.rank > worst) worst = sc.rank;
          if (!mark || sc.at < mark.at) mark = sc;
        }
        if (ok) hits.push({ opt: opt, rank: worst, mark: mark });
      }

      hits.sort(function (a, b) {
        return a.rank - b.rank || a.opt.value.localeCompare(b.opt.value);
      });
      return hits.slice(0, MAX_SUGGESTIONS);
    }

    function initCombo(wrap) {
      var input = wrap.querySelector('input');
      var list = wrap.querySelector('.ts-combo__list');
      if (!input || !list) return;

      var source = document.getElementById(input.getAttribute('list') || '');
      if (!source) return;

      var options = $$('option', source).map(function (o) {
        var value = o.value;
        var norm = normalise(value);
        return { value: value, norm: norm, words: norm.split(/[^a-z0-9]+/).filter(Boolean) };
      });
      if (!options.length) return;

      input.removeAttribute('list');   // we are in charge now

      var hits = [];
      var active = -1;

      function close() {
        if (list.hidden) return;
        list.hidden = true;
        active = -1;
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
      }

      function highlight(li, text, mark) {
        li.textContent = '';
        if (!mark || mark.at < 0) { li.textContent = text; return; }
        /* Built as DOM nodes, never as an HTML string: the option text is
           ours, but the query the visitor typed is not. */
        li.appendChild(document.createTextNode(text.slice(0, mark.at)));
        var m = document.createElement('mark');
        m.textContent = text.slice(mark.at, mark.at + mark.len);
        li.appendChild(m);
        li.appendChild(document.createTextNode(text.slice(mark.at + mark.len)));
      }

      function setActive(i) {
        var items = $$('li', list);
        if (!items.length) return;
        if (i < 0) i = items.length - 1;
        if (i >= items.length) i = 0;
        active = i;
        items.forEach(function (li, n) {
          var on = n === i;
          li.classList.toggle('is-active', on);
          li.setAttribute('aria-selected', String(on));
          if (on) {
            input.setAttribute('aria-activedescendant', li.id);
            if (li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
          }
        });
      }

      function open(query) {
        hits = search(options, query);
        list.textContent = '';
        if (!hits.length) { close(); return; }

        hits.forEach(function (hit, n) {
          var li = document.createElement('li');
          li.className = 'ts-combo__opt';
          li.id = list.id + '-opt-' + n;
          li.setAttribute('role', 'option');
          li.setAttribute('aria-selected', 'false');
          highlight(li, hit.opt.value, hit.mark);
          li.addEventListener('mousedown', function (e) {
            e.preventDefault();     // keep focus; blur would close us first
            choose(n);
          });
          list.appendChild(li);
        });

        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        active = -1;
      }

      function choose(i) {
        var hit = hits[i];
        if (!hit) return;
        input.value = hit.opt.value;
        close();
        /* Let the panel's own listeners clear any error state. */
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }

      input.addEventListener('input', function () { open(input.value); });
      input.addEventListener('focus', function () { open(input.value); });
      input.addEventListener('blur', function () { window.setTimeout(close, 120); });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          if (list.hidden) { open(input.value); if (list.hidden) return; }
          e.preventDefault();
          setActive(active + (e.key === 'ArrowDown' ? 1 : -1));
          return;
        }
        if (e.key === 'Enter' && !list.hidden && active > -1) {
          e.preventDefault();
          choose(active);
          return;
        }
        if (e.key === 'Escape' && !list.hidden) {
          e.preventDefault();
          close();
        }
      });
    }

    /* ---- Per-panel behaviour ------------------------------------------- */
    function initPanel(form) {
      var min = todayISO();
      $$('[data-ts-today]', form).forEach(function (el) { el.min = min; });

      // A return can never precede the outbound, nor a check-out the check-in.
      function chain(firstName, secondName) {
        var first = form.querySelector('[name="' + firstName + '"]');
        var second = form.querySelector('[name="' + secondName + '"]');
        if (!first || !second) return;
        first.addEventListener('change', function () {
          second.min = first.value || min;
          if (second.value && second.value < first.value) second.value = '';
        });
      }
      chain('departDate', 'returnDate');
      chain('checkIn', 'checkOut');

      // Swap the two airport fields.
      var swap = $('[data-ts-swap]', form);
      if (swap) {
        swap.addEventListener('click', function () {
          var from = form.querySelector('[name="from"]');
          var to = form.querySelector('[name="to"]');
          if (!from || !to) return;
          var tmp = from.value;
          from.value = to.value;
          to.value = tmp;
          setError(from, false);
          setError(to, false);
        });
      }

      // Trip type governs the return date and the multi-city itinerary box.
      var trips = $$('[data-ts-trip]', form);
      var ret = $('[data-ts-return]', form);
      var retField = ret ? ret.closest('.ts-field') : null;
      var itinerary = $('[data-ts-itinerary]', form);
      function applyTrip() {
        var checked = form.querySelector('[data-ts-trip]:checked');
        var value = checked ? checked.value : 'Return';
        if (ret) {
          var off = value !== 'Return';
          ret.disabled = off;
          if (off) ret.value = '';
          if (retField) retField.classList.toggle('is-off', off);
        }
        /* The box stays on for every trip type; only the prompt changes,
           because a multi-city request needs the sectors spelled out and a
           simple return usually does not. */
        if (itinerary) {
          var key = value === 'Multi-City' ? 'phMulti' : 'phDefault';
          if (itinerary.dataset[key]) itinerary.placeholder = itinerary.dataset[key];
        }
      }
      trips.forEach(function (t) { t.addEventListener('change', applyTrip); });
      if (trips.length) applyTrip();

      $$('[data-ts-combo]', form).forEach(initCombo);

      // Clear a field's error as soon as the visitor touches it.
      $$('input, select, textarea', form).forEach(function (el) {
        var evt = (el.tagName === 'SELECT' || el.type === 'checkbox' || el.type === 'date') ? 'change' : 'input';
        el.addEventListener(evt, function () { setError(el, false); });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submit(form, 'whatsapp');
      });

      var emailBtn = $('[data-ts-email]', form);
      if (emailBtn) {
        emailBtn.addEventListener('click', function () { submit(form, 'email'); });
      }
    }

    /* ---- Validation ----------------------------------------------------- */
    function validate(form) {
      var ok = true;
      var firstBad = null;

      function fail(el) {
        setError(el, true);
        ok = false;
        if (!firstBad) firstBad = el;
      }

      $$('[data-error-for]', form).forEach(function (err) {
        var el = form.querySelector('[name="' + err.getAttribute('data-error-for') + '"]');
        if (!el || el.disabled) return;
        var value = String(el.value || '').trim();
        if (!value) { fail(el); return; }
        if (el.name === 'phone' && !validPhone(value)) { fail(el); return; }
        setError(el, false);
      });

      // Same city both ends is a typo, not a booking.
      var from = form.querySelector('[name="from"]');
      var to = form.querySelector('[name="to"]');
      if (ok && from && to && from.value.trim() && from.value.trim().toLowerCase() === to.value.trim().toLowerCase()) {
        fail(to);
        status(form, 'err', 'Your departure and destination are the same — please check them.');
        to.focus();
        return false;
      }

      if (firstBad) firstBad.focus();
      return ok;
    }

    /* ---- Collect and format --------------------------------------------- */
    function collect(form) {
      var data = {};
      $$('input, select, textarea', form).forEach(function (el) {
        var name = el.getAttribute('name');
        if (!name || name === 'company' || el.disabled) return;
        if (el.type === 'radio') { if (el.checked) data[name] = el.value; return; }
        if (el.type === 'checkbox') { if (el.checked) data[name] = el.value; return; }
        var v = String(el.value || '').trim();
        if (v) data[name] = DATE_KEYS[name] ? prettyDate(v) : v;
      });
      return data;
    }

    function asText(data, kind) {
      var lines = ['*' + (HEADINGS[kind] || 'Travel Inquiry') + ' — Mazin Haramain Tours & Travels*', ''];
      var order = ORDER[kind] || Object.keys(LABELS);
      var overrides = LABEL_OVERRIDES[kind] || {};
      order.forEach(function (key) {
        if (data[key]) lines.push((overrides[key] || LABELS[key]) + ': ' + data[key]);
      });
      lines.push('', 'Sent from ' + window.location.href);
      return lines.join('\n');
    }

    /* ---- Submit ---------------------------------------------------------- */
    function submit(form, channel) {
      var hp = form.querySelector('[name="company"]');
      if (hp && hp.value) return; // honeypot: a bot filled the hidden field

      if (!validate(form)) {
        if (!$('[data-form-status]', form).classList.contains('form-status--err')) {
          status(form, 'err', 'Please complete the highlighted fields and try again.');
        }
        return;
      }

      var kind = form.getAttribute('data-ts-kind') || 'Travel';
      var data = collect(form);
      data.service = kind;
      var text = asText(data, kind);

      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      var mailUrl = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent((HEADINGS[kind] || 'Travel Inquiry') + ' — Website') +
        '&body=' + encodeURIComponent(text.replace(/\*/g, ''));

      if (channel === 'email') {
        /* mailto opens the visitor's own mail client with everything already
           written. Assigning location rather than window.open, because a
           mailto in a new tab leaves an empty tab behind on most desktops. */
        window.location.href = mailUrl;
        status(
          form, 'ok',
          '<strong>Your email is ready to send.</strong> It should have opened in your ' +
          'mail app with the details filled in. Nothing opened? ' +
          '<a href="' + mailUrl + '">Open it here</a> or ' +
          '<a href="' + waUrl + '" target="_blank" rel="noopener">send on WhatsApp</a> instead.'
        );
        if (window.gtag) window.gtag('event', 'generate_lead', { event_label: kind + ' (email)' });
        return;
      }

      /* Straight to WhatsApp.

         This used to hand the visitor a second panel — "your request is ready,
         now send it" — with its own WhatsApp and email buttons. Two clicks to
         do one thing, and the panel read as though the form had failed. The
         button they pressed is the send.

         window.open has to happen HERE, synchronously inside the click that
         triggered the submit. Called from a .then() after the fetch below, a
         pop-up blocker eats it and nothing happens at all. */
      var win = window.open(waUrl, '_blank');
      var blocked = !win || win.closed || typeof win.closed === 'undefined';

      if (blocked) {
        /* A blocker, or an in-app browser that refuses new windows. Give them
           the link rather than a dead button. */
        status(
          form, 'ok',
          '<strong>Your browser blocked the WhatsApp window.</strong> ' +
          'Open it here to send your request:<br><br>' +
          '<a class="btn btn--whatsapp btn--sm" href="' + waUrl + '" target="_blank" rel="noopener">Send on WhatsApp</a> ' +
          '<a class="btn btn--ghost btn--sm" href="' + mailUrl + '">Send by Email</a>'
        );
      } else {
        /* Deliberately not "sent". Nothing has been sent until they press
           send inside WhatsApp, and telling them otherwise is how a request
           gets abandoned in a draft nobody reads. */
        status(
          form, 'ok',
          '<strong>WhatsApp is open in a new tab.</strong> Press send there to reach our desk. ' +
          'Nothing opened? <a href="' + waUrl + '" target="_blank" rel="noopener">Open WhatsApp</a> ' +
          'or <a href="' + mailUrl + '">send by email</a>.'
        );
      }

      if (window.gtag) window.gtag('event', 'generate_lead', { event_label: kind });

      /* A copy for the desk's own records, if an endpoint is configured. It
         runs in the background and its outcome changes nothing the visitor
         sees: they have already been handed to WhatsApp, and telling them a
         silent background POST failed would only be confusing. */
      if (ENDPOINT) {
        var controller = new AbortController();
        var timer = window.setTimeout(function () { controller.abort(); }, 15000);
        fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
          signal: controller.signal,
        })
          .catch(function () { /* the visitor already has the message */ })
          .finally(function () { window.clearTimeout(timer); });
      }

      /* The form stays usable. It used to disable its own button and leave it
         disabled, so a visitor who wanted to ask about a second trip — or who
         closed WhatsApp by mistake — had to reload the page to send anything
         again. Nothing here is single-use. */
    }

    widgets.forEach(function (widget) {
      initTabs(widget);
      $$('[data-ts-panel]', widget).forEach(initPanel);
    });
  })();

  /* ======================================================================
     8. Rotating hero
     ----------------------------------------------------------------------
     The opening frame ships in the HTML with its srcset and is the LCP
     candidate. The remaining frames carry only data-src, because they sit
     inside the viewport where loading="lazy" defers nothing — so they are
     attached once the page has finished loading and never compete with
     first paint. Without JavaScript the hero stays a single static image.
     ====================================================================== */
  (function heroSlides() {
    var stage = $('[data-hero-slides]');
    if (!stage) return;

    var slides = $$('.hero__slide', stage);
    if (slides.length < 2) return;

    /* Honour a reduced-motion preference by not rotating at all — which
       also means the extra frames are never downloaded. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function hydrate() {
      slides.forEach(function (img) {
        var src = img.getAttribute('data-src');
        if (!src) return;
        /* srcset before src, so the browser picks the retina copy on a
           high-DPI screen rather than fetching the 1600 first. */
        var set = img.getAttribute('data-srcset');
        if (set) { img.srcset = set; img.removeAttribute('data-srcset'); }
        img.src = src;
        img.removeAttribute('data-src');
      });
    }
    if (document.readyState === 'complete') hydrate();
    else window.addEventListener('load', hydrate);

    var HOLD = 5000;
    var at = 0;
    var timer = null;

    function show(next) {
      slides[at].classList.remove('is-active');
      at = (next + slides.length) % slides.length;
      slides[at].classList.add('is-active');
    }

    function start() { if (!timer) timer = window.setInterval(function () { show(at + 1); }, HOLD); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    /* No point animating a tab nobody is looking at. */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  })();

  /* ======================================================================
     9. Current year (footer fallback)
     ====================================================================== */
  $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
