'use strict';

// Run the actual browser script against a small DOM fixture. All network,
// navigation and analytics calls are local fakes: no test inquiry is sent.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../../assets/js/main.js'), 'utf8');

function element(attrs = {}) {
  const classes = new Set();
  return {
    ...attrs, attrs: { ...attrs }, listeners: {}, value: attrs.value || '',
    classList: {
      add: (c) => classes.add(c), remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
      toggle(c, on) { if (on) classes.add(c); else classes.delete(c); },
    },
    getAttribute(name) { return this.attrs[name] ?? null; },
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
    addEventListener(name, fn) { this.listeners[name] = fn; },
    focus() { this.focused = true; },
  };
}

function fixture({ hash = '', endpoint = '', response, fetchError, stalled = false } = {}) {
  const inputs = [
    element({ name: 'name', type: 'text', value: 'Test Traveller', required: true }),
    element({ name: 'phone', type: 'tel', value: '03001234567', required: true }),
    element({ name: 'email', type: 'email', value: '' }),
    element({ name: 'service', tagName: 'SELECT', value: 'Umrah Package', required: true }),
    element({ name: 'consent', type: 'checkbox', checked: true, required: true }),
    element({ name: 'company', type: 'text' }),
  ];
  const errors = inputs.filter((el) => el.name !== 'company')
    .map((el) => element({ 'data-error-for': el.name }));
  const status = element();
  const button = element({ textContent: 'Submit Inquiry', disabled: false });
  const form = element({ id: 'test-form', 'data-success-url': '../thank-you/index.html' });
  form.resetCount = 0;
  form.reset = () => { form.resetCount++; };
  form.querySelectorAll = (selector) => {
    if (selector === '[required]') return inputs.filter((el) => el.required);
    if (selector === '[data-error-for]') return errors;
    if (selector === 'input, select, textarea') return inputs;
    return [];
  };
  form.querySelector = (selector) => {
    if (selector === '[data-form-status]') return status;
    if (selector === '[type="submit"]') return button;
    const name = selector.match(/^\[name="(.*)"\]$/);
    if (name) return inputs.find((el) => el.name === name[1]) || null;
    const error = selector.match(/^\[data-error-for="(.*)"\]$/);
    return error ? errors.find((el) => el.getAttribute('data-error-for') === error[1]) : null;
  };
  const timers = new Map();
  const calls = { network: [], analytics: [], popups: [], hashes: [] };
  const window = {
    MH_CONFIG: { formEndpoint: endpoint },
    location: { hash, href: 'http://localhost/get-a-quote/' },
    matchMedia: () => ({ matches: false }),
    setTimeout(fn) { const id = timers.size + 1; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
    open: (...args) => calls.popups.push(args),
    gtag: (...args) => calls.analytics.push(args),
  };
  const document = {
    querySelector(selector) {
      if (selector.startsWith('#') && selector !== '#mobile-nav' &&
          selector !== '#site-header' && selector !== '#back-to-top') {
        throw new Error('Unsafe hash selector reached querySelector');
      }
      return null;
    },
    querySelectorAll: (selector) => selector === '[data-lead-form]' ? [form] : [],
    getElementById(id) { calls.hashes.push(id); return null; },
  };
  vm.runInNewContext(source, {
    window, document, AbortController,
    fetch: (url, options) => {
      calls.network.push({ url, options });
      if (stalled) return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new Error('Timed out')));
      });
      if (fetchError) return Promise.reject(new Error('Offline'));
      return Promise.resolve(response || { ok: true, status: 200, json: async () => ({ success: true }) });
    },
  });
  return {
    form, status, button, inputs, errors, calls, window, timers,
    submit: () => form.listeners.submit({ preventDefault() {} }),
    settle: () => new Promise((resolve) => setImmediate(resolve)),
  };
}

test('special and malformed URL fragments do not disable inquiry forms', () => {
  for (const hash of ['#123', '#[', '#%E0%A4%A', '#home%2Dfaq%2D1']) {
    const f = fixture({ hash });
    assert.equal(typeof f.form.listeners.submit, 'function');
    assert.equal(f.calls.hashes.length, 1);
  }
});

test('validation links errors to controls and focuses the first invalid field', () => {
  const f = fixture();
  f.inputs[0].value = '';
  f.submit();
  assert.equal(f.inputs[0].focused, true);
  assert.equal(f.inputs[0].getAttribute('aria-invalid'), 'true');
  assert.equal(f.inputs[0].getAttribute('aria-describedby'), f.errors[0].id);
  assert.equal(f.calls.network.length, 0);
  assert.match(f.status.innerHTML, /highlighted fields/);
  f.inputs[0].value = 'Updated Traveller';
  f.inputs[0].listeners.input();
  assert.equal(f.inputs[0].getAttribute('aria-invalid'), null);
});

test('WhatsApp fallback preserves details and never claims a sent lead', () => {
  const f = fixture();
  f.inputs[0].value = '<img src=x>';
  f.submit();
  assert.match(f.status.innerHTML, /has not been sent/);
  assert.match(f.status.innerHTML, /https:\/\/wa.me\//);
  assert.match(f.status.innerHTML, /mailto:/);
  assert.ok(!f.status.innerHTML.includes('<img'));
  assert.equal(f.form.resetCount, 0);
  assert.equal(f.inputs[0].value, '<img src=x>');
  assert.equal(f.calls.analytics.length, 0);
  assert.equal(f.calls.popups.length, 0);
  assert.equal(f.button.disabled, false);
});

for (const [name, options] of [
  ['network failure', { fetchError: true }],
  ['HTTP rejection', { response: { ok: false, status: 500 } }],
  ['JSON rejection in HTTP 200', { response: { ok: true, status: 200, json: async () => ({ success: false }) } }],
  ['unreadable response', { response: { ok: true, status: 200, json: async () => { throw new Error('Not JSON'); } } }],
]) {
  test(name + ' offers fallback without losing the inquiry', async () => {
    const f = fixture({ endpoint: '/test-endpoint', ...options });
    f.submit();
    await f.settle();
    assert.match(f.status.innerHTML, /could not confirm delivery/);
    assert.equal(f.form.resetCount, 0);
    assert.equal(f.button.disabled, false);
    assert.equal(f.calls.analytics.length, 0);
    assert.equal(f.timers.size, 0);
    assert.equal(f.window.location.href, 'http://localhost/get-a-quote/');
  });
}

test('slow endpoint times out and restores the inquiry controls', async () => {
  const f = fixture({ endpoint: '/test-endpoint', stalled: true });
  f.submit();
  assert.equal(f.button.disabled, true);
  for (const expire of f.timers.values()) expire();
  await f.settle();
  assert.match(f.status.innerHTML, /could not confirm delivery/);
  assert.equal(f.button.disabled, false);
  assert.equal(f.form.resetCount, 0);
  assert.equal(f.timers.size, 0);
});

for (const status of [200, 204]) {
  test('confirmed HTTP ' + status + ' delivery uses the portable success URL', async () => {
    const f = fixture({
      endpoint: '/test-endpoint',
      response: { ok: true, status, json: async () => ({ success: true }) },
    });
    f.submit();
    await f.settle();
    assert.equal(f.form.resetCount, 1);
    assert.equal(f.calls.analytics.length, 1);
    assert.equal(f.calls.analytics[0][1], 'generate_lead');
    assert.equal(f.window.location.href, '../thank-you/index.html');
    assert.equal(f.button.disabled, false);
    assert.equal(f.timers.size, 0);
    assert.equal(JSON.parse(f.calls.network[0].options.body).service, 'Umrah Package');
  });
}
