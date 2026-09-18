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
  var EMAIL = CONFIG.email || 'mazinharamain@gmail.com';
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
     6. Quick inquiry bar (hero) — routes to the matching service page
     ====================================================================== */
  (function quickBar() {
    var form = $('[data-quickbar]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var checked = form.querySelector('input[name="quick-service"]:checked');
      var url = checked ? checked.getAttribute('data-url') : '/get-a-quote/';
      window.location.href = url || '/get-a-quote/';
    });
  })();

  /* ======================================================================
     7. Lead forms
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
     8. Current year (footer fallback)
     ====================================================================== */
  $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
