// No network or real email: run with node --experimental-vm-modules --test tests/pushshare-reset-password.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/pushshare-reset-password.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'pushshare-reset-password.html'), 'utf8');
const flush = () => new Promise((resolve) => setImmediate(resolve));

async function mount({ outcome, language = 'en-US', search = '', savedLanguage, storageBlocked = false, loadFailure = false, session } = {}) {
  let now = 1000000;
  let tick;
  let calls = [];
  let reloads = 0;
  const elements = new Map();
  class Element {
    value = ''; textContent = ''; disabled = false; hidden = false; dataset = {}; attributes = {}; handlers = {};
    setAttribute(key, value) { this.attributes[key] = value; }
    addEventListener(type, callback) { this.handlers[type] = callback; }
    focus() { document.activeElement = this; }
    get validity() { return { valid: !!this.value && this.value.length <= 254 && /^[^\s@]+@[^\s@]+$/.test(this.value) }; }
  }
  const document = {
    documentElement: {},
    getElementById(id) { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); },
    querySelector() { return this.meta; },
    querySelectorAll() { return this.translated; },
    meta: {},
    translated: [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => Object.assign(new Element(), { dataset: { i18n: match[1] } })),
  };
  const saved = new Map(savedLanguage ? [['website-language', savedLanguage]] : []);
  const sessionMap = session || new Map();
  const storage = (map) => ({
    getItem(key) { if (storageBlocked) throw Error('blocked'); return map.get(key) || null; },
    setItem(key, value) { if (storageBlocked) throw Error('blocked'); map.set(key, value); },
  });
  const navigator = { language, onLine: true };
  const window = { location: { search, reload() { reloads++; } }, setInterval(callback) { tick = callback; }, addEventListener() {} };
  const context = vm.createContext({ document, window, navigator, localStorage: storage(saved), sessionStorage: storage(sessionMap), URLSearchParams, Date: { now: () => now } });
  const client = new vm.SyntheticModule(['requestPasswordReset'], function () {
    this.setExport('requestPasswordReset', async (email, lang) => {
      calls.push({ email, lang });
      if (typeof outcome === 'function') return outcome();
      if (outcome) throw { code: outcome, message: 'SECRET RAW ERROR must never be displayed' };
    });
  }, { context });
  await client.link(() => {});
  await client.evaluate();
  vm.runInContext(source, context, { importModuleDynamically: async () => {
    if (loadFailure) throw Error('network');
    return client;
  } });
  await flush();
  return {
    document, navigator, calls, sessionMap, saved,
    el: (id) => document.getElementById(`reset-${id}`),
    error: () => document.getElementById('email-error').textContent,
    submit: () => document.getElementById('reset-form').handlers.submit({ preventDefault() {} }),
    advance(ms) { now += ms; tick(); },
    get reloads() { return reloads; },
  };
}

test('invalid and empty addresses never reach Firebase; errors are accessible', async () => {
  const page = await mount();
  for (const email of ['', 'broken', 'a@b', 'name @example.com']) {
    page.el('email').value = email;
    await page.submit();
    assert.equal(page.calls.length, 0);
    assert.match(page.error(), /valid email/);
    assert.equal(page.el('email').attributes['aria-invalid'], 'true');
    assert.equal(page.document.activeElement, page.el('email'));
  }
});

test('pending request blocks duplicate submits; trims address and clears it after completion', async () => {
  let finish;
  const page = await mount({ outcome: () => new Promise((resolve) => { finish = resolve; }) });
  page.el('email').value = ' name@example.invalid ';
  const pending = page.submit();
  await page.submit();
  assert.equal(page.calls.length, 1);
  assert.deepEqual(page.calls[0], { email: 'name@example.invalid', lang: 'en' });
  assert.equal(page.el('submit').disabled, true);
  assert.equal(page.el('email').disabled, true);
  assert.equal(page.el('form').attributes['aria-busy'], 'true');
  finish();
  await pending;
  assert.equal(page.el('email').value, '');
  assert.equal(page.el('email').disabled, false);
  assert.match(page.el('status').textContent, /If a PushShare account/);
  assert.doesNotMatch(page.el('status').textContent, /name@example/);
  await page.submit();
  assert.equal(page.calls.length, 1);
  page.advance(60000);
  assert.equal(page.el('submit').disabled, false);
  assert.equal(page.el('cooldown').textContent, '');
  assert.deepEqual([...page.sessionMap.keys()], ['pushshare-reset-next-request-at']);
});

test('completion copy and cooldown do not reveal account existence', async () => {
  let completion;
  for (const outcome of [undefined, 'auth/user-not-found', 'auth/user-disabled', 'auth/invalid-credential']) {
    const page = await mount({ outcome });
    page.el('email').value = 'name@example.invalid';
    await page.submit();
    completion ||= page.el('status').textContent;
    assert.equal(page.el('status').textContent, completion);
    assert.equal(page.el('submit').disabled, true);
    assert.equal(page.el('status').dataset.state, 'complete');
  }
});

test('offline request stays local and can be retried after reconnecting', async () => {
  const page = await mount();
  page.el('email').value = 'name@example.invalid';
  page.navigator.onLine = false;
  await page.submit();
  assert.equal(page.calls.length, 0);
  assert.match(page.el('status').textContent, /connection/);
  page.navigator.onLine = true;
  await page.submit();
  assert.equal(page.calls.length, 1);
});

for (const [outcome, expected, delay] of [
  ['auth/network-request-failed', /connection/, 60000],
  ['auth/too-many-requests', /temporarily limited/, 300000],
  ['auth/quota-exceeded', /temporarily limited/, 300000],
  ['auth/operation-not-allowed', /couldn’t complete/, 60000],
]) test(`${outcome} has a safe message and retry delay`, async () => {
  const page = await mount({ outcome });
  page.el('email').value = 'name@example.invalid';
  await page.submit();
  assert.match(page.el('status').textContent, expected);
  assert.doesNotMatch(page.el('status').textContent, /SECRET|name@example/);
  assert.equal(page.el('status').dataset.state, 'error');
  page.advance(delay - 1000);
  assert.equal(page.el('submit').disabled, true);
  page.advance(1000);
  assert.equal(page.el('submit').disabled, false);
});

test('SDK email validation error focuses the address without revealing raw error', async () => {
  const page = await mount({ outcome: 'auth/invalid-email' });
  page.el('email').value = 'name@example.invalid';
  await page.submit();
  assert.match(page.error(), /valid email/);
  assert.equal(page.el('status').hidden, true);
  assert.equal(page.el('submit').disabled, false);
});

test('English fallback, Korean override and live language switching also localize status', async () => {
  const page = await mount({ language: 'fr-FR', savedLanguage: 'ja', search: '?lang=ko' });
  assert.equal(page.document.documentElement.lang, 'ko');
  page.el('email').value = 'name@example.invalid';
  await page.submit();
  assert.match(page.el('status').textContent, /계정이 있다면/);
  assert.equal(page.calls[0].lang, 'ko');
  page.el('language').value = 'en';
  page.el('language').handlers.change();
  assert.match(page.el('status').textContent, /If a PushShare account/);
  assert.equal(page.saved.get('website-language'), 'en');
  const fallback = await mount({ language: 'ja-JP', search: '?lang=ar' });
  assert.equal(fallback.document.documentElement.lang, 'en');
});

test('storage restrictions do not break the form; SDK load failure offers reload', async () => {
  const page = await mount({ storageBlocked: true, language: 'ko-KR' });
  page.el('email').value = 'name@example.invalid';
  await page.submit();
  assert.equal(page.calls.length, 1);
  const failed = await mount({ loadFailure: true });
  assert.match(failed.el('status').textContent, /couldn’t load/);
  assert.equal(failed.el('submit').textContent, 'Reload secure form');
  await failed.submit();
  assert.equal(failed.reloads, 1);
});

test('refresh preserves only the cooldown timestamp, never an email', async () => {
  const page = await mount();
  page.el('email').value = 'name@example.invalid';
  await page.submit();
  const refreshed = await mount({ session: page.sessionMap });
  assert.equal(refreshed.el('email').value, '');
  assert.equal(refreshed.el('submit').disabled, true);
});

test('static page prevents email URL submission; adapter uses only public SDK and existing action flow', () => {
  assert.match(html, /form-action 'none'/);
  assert.match(html, /name="referrer" content="no-referrer"/);
  assert.doesNotMatch(html, /<input[^>]*\bname=|type="password"|<iframe|google-analytics/i);
  const adapter = fs.readFileSync(path.join(root, 'js/pushshare-reset-firebase.js'), 'utf8');
  assert.match(adapter, /projectId: 'pushshare-d6da2'/);
  assert.match(adapter, /sendPasswordResetEmail\(auth, email\)/);
  assert.doesNotMatch(adapter, /private_key|firebase-admin|service_account|measurementId|getAnalytics|fetchSignInMethods|confirmPasswordReset/);
  assert.doesNotMatch(source, /console\.|innerHTML|location\.href\s*=|searchParams\.set/);
});
