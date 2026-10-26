(() => {
  const {copy: COPY, names, normalize, resolve} = window.PushShareReset;

  const form = document.getElementById('reset-form');
  const email = document.getElementById('reset-email');
  const button = document.getElementById('reset-submit');
  const selector = document.getElementById('reset-language');
  const error = document.getElementById('email-error');
  const status = document.getElementById('reset-status');
  const cooldown = document.getElementById('reset-cooldown');
  const cooldownKey = 'pushshare-reset-next-request-at';
  let language = 'en';
  let busy = false;
  let loading = true;
  let loadFailed = false;
  let message = '';
  let invalid = false;
  let requestReset;
  let nextRequestAt = 0;

  // Only a language preference and a UX cooldown timestamp are stored.
  // The cooldown is not a server-side abuse protection mechanism.
  let saved;
  try { saved = localStorage.getItem('website-language'); } catch { /* Optional preference. */ }
  language = resolve(new URLSearchParams(window.location.search).get('lang'), saved, navigator.languages || [navigator.language]);
  selector.replaceChildren(...Object.keys(COPY).map((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = names[key];
    return option;
  }));
  try {
    const saved = Number(sessionStorage.getItem(cooldownKey));
    if (Number.isFinite(saved)) nextRequestAt = Math.min(saved, Date.now() + 300000);
  } catch { /* The form also works when browser storage is unavailable. */ }

  function render() {
    const copy = COPY[language];
    const remaining = Math.max(0, Math.ceil((nextRequestAt - Date.now()) / 1000));
    document.documentElement.lang = language;
    document.documentElement.dir = ['ar', 'fa', 'ur'].includes(language) ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-reset-link]').forEach((link) => {
      const supported = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW', 'ru', 'tr', 'es'];
      link.setAttribute('href', `pushshare.html?lang=${supported.includes(language) ? language : 'en'}`);
    });
    document.title = `${copy.title} | PushShare`;
    document.querySelector('meta[name="description"]').content = copy.intro;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (copy[key] && element !== button && element.textContent !== copy[key]) element.textContent = copy[key];
    });
    selector.value = language;
    button.disabled = loading || busy || remaining > 0;
    const buttonText = copy[loading ? 'loading' : busy ? 'sending' : loadFailed ? 'reload' : 'send'];
    if (button.textContent !== buttonText) button.textContent = buttonText;
    email.disabled = busy;
    form.setAttribute('aria-busy', String(busy));
    email.setAttribute('aria-invalid', String(invalid));
    const fieldError = invalid ? copy.invalid : '';
    if (error.textContent !== fieldError) error.textContent = fieldError;
    cooldown.textContent = remaining ? copy.wait.replace('{seconds}', String(remaining)) : '';
    status.hidden = !message;
    status.dataset.state = message === 'complete' ? 'complete' : 'error';
    const nextMessage = message ? copy[message] : '';
    // Avoid re-announcing an unchanged status on every cooldown tick.
    if (status.textContent !== nextMessage) status.textContent = nextMessage;
  }

  function waitBeforeRetry(milliseconds) {
    nextRequestAt = Date.now() + milliseconds;
    try { sessionStorage.setItem(cooldownKey, String(nextRequestAt)); } catch { /* UX only. */ }
  }

  selector.addEventListener('change', () => {
    language = normalize(selector.value) || 'en';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState(null, '', url);
    try { localStorage.setItem('website-language', language); } catch { /* Optional preference. */ }
    render();
  });
  email.addEventListener('input', () => {
    if (busy) return;
    invalid = false;
    message = '';
    render();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (loading || busy || Date.now() < nextRequestAt) return;
    if (loadFailed) { window.location.reload(); return; }
    email.value = email.value.trim();
    invalid = !email.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    if (invalid) { message = ''; render(); email.focus(); return; }
    if (!navigator.onLine) { message = 'network'; render(); status.focus(); return; }

    busy = true;
    message = '';
    render();
    try {
      await requestReset(email.value, language);
      message = 'complete';
      email.value = '';
      waitBeforeRetry(60000);
    } catch (failure) {
      // Never display or log Firebase error messages, email addresses, or tokens.
      switch (failure?.code) {
        case 'auth/user-not-found':
        case 'auth/user-disabled':
        case 'auth/invalid-credential':
          message = 'complete';
          email.value = '';
          waitBeforeRetry(60000);
          break;
        case 'auth/invalid-email': invalid = true; break;
        case 'auth/too-many-requests':
        case 'auth/quota-exceeded': message = 'limited'; waitBeforeRetry(300000); break;
        case 'auth/timeout':
        case 'auth/network-request-failed': message = 'network'; waitBeforeRetry(60000); break;
        default: message = 'unavailable'; waitBeforeRetry(60000);
      }
    } finally {
      busy = false;
      render();
      if (invalid) email.focus(); else status.focus();
    }
  });

  // No form control has a name: even a failed script cannot submit an email in a URL.
  window.addEventListener('pagehide', () => { email.value = ''; });
  render();
  window.setInterval(render, 1000);
  import('./pushshare-reset-firebase.js')
    .then((client) => { requestReset = client.requestPasswordReset; })
    .catch(() => { loadFailed = true; message = 'loadFailed'; })
    .finally(() => { loading = false; render(); });
})();
