(() => {
  const COPY = {
    en: {
      skip: 'Skip to password reset', language: 'Language', eyebrow: 'Account help',
      title: 'Reset your password',
      intro: 'Enter the email you use for PushShare. We’ll request a new reset email when you press the button.',
      formTitle: 'Get a new reset email', emailLabel: 'Your PushShare email', emailHint: 'Use the address you signed up with.',
      loading: 'Loading secure form…', send: 'Send reset email', sending: 'Requesting email…', reload: 'Reload secure form',
      invalid: 'Enter a valid email address, such as name@example.com.',
      complete: 'If a PushShare account uses this email and a password, you’ll receive a reset email shortly. Check your inbox and spam or junk folder.',
      network: 'We couldn’t confirm the request. Check your connection and inbox, then try again when the button is available.',
      limited: 'Email requests are temporarily limited. Wait a few minutes, check your inbox, then try again when the button is available.',
      unavailable: 'We couldn’t complete the request. Please try again later. If the problem continues, contact jj@dosusu.com.',
      loadFailed: 'The secure form couldn’t load. Check your connection, then reload the form to try again.',
      wait: 'You can request another email in {seconds}s.',
      privacy: 'Your email address is used only to send you a password reset email.',
      nextTitle: 'What happens next?',
      stepOne: 'Check your inbox and spam or junk folder. Delivery can take a few minutes.',
      stepTwo: 'Open the latest reset email promptly. Its link opens the official Firebase page, where you choose your own new password.',
      stepThree: 'Return to PushShare and sign in with your new password.',
      expiredTitle: 'An old email link expired?',
      expiredBody: 'You can keep using this webpage to request a new email. The reset link inside each email expires; this webpage is the reusable starting point. If no email arrives after a few minutes, check the address and spam folder, then try again when the button is available.',
      support: 'Still need help?', back: 'About PushShare', privacyLink: 'Privacy policy',
    },
    ko: {
      skip: '비밀번호 재설정으로 건너뛰기', language: '언어', eyebrow: '계정 도움말',
      title: '비밀번호 재설정',
      intro: 'PushShare에 가입한 이메일을 입력해 주세요. 버튼을 누르는 시점에 새로운 재설정 메일을 요청합니다.',
      formTitle: '새 재설정 메일 받기', emailLabel: 'PushShare 가입 이메일', emailHint: '가입할 때 사용한 이메일 주소를 입력해 주세요.',
      loading: '안전한 요청 양식 불러오는 중…', send: '재설정 메일 요청', sending: '메일 요청 중…', reload: '요청 양식 새로고침',
      invalid: 'name@example.com과 같은 올바른 이메일 주소를 입력해 주세요.',
      complete: '입력한 이메일로 비밀번호를 사용하는 PushShare 계정이 있다면 잠시 후 재설정 메일을 받게 됩니다. 받은편지함과 스팸함을 확인해 주세요.',
      network: '요청 결과를 확인하지 못했습니다. 인터넷 연결과 받은편지함을 확인한 뒤, 버튼이 활성화되면 다시 시도해 주세요.',
      limited: '메일 요청이 일시적으로 제한되었습니다. 몇 분 기다리면서 받은편지함을 확인한 뒤, 버튼이 활성화되면 다시 시도해 주세요.',
      unavailable: '요청을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요. 계속 문제가 생기면 jj@dosusu.com으로 문의해 주세요.',
      loadFailed: '요청 양식을 불러오지 못했습니다. 인터넷 연결을 확인하고 양식을 새로고침해 주세요.',
      wait: '{seconds}초 후에 메일을 다시 요청할 수 있습니다.',
      privacy: '입력한 이메일은 비밀번호 재설정 메일을 보내는 용도로만 사용됩니다.',
      nextTitle: '이후에는 이렇게 진행하세요',
      stepOne: '받은편지함과 스팸함을 확인해 주세요. 메일 도착까지 몇 분 걸릴 수 있습니다.',
      stepTwo: '가장 최근에 받은 재설정 메일을 바로 열어 주세요. 메일의 링크로 연결되는 Firebase 공식 화면에서 직접 새 비밀번호를 설정합니다.',
      stepThree: 'PushShare 앱으로 돌아가 새 비밀번호로 로그인해 주세요.',
      expiredTitle: '예전 메일의 링크가 만료되었나요?',
      expiredBody: '이 웹페이지는 계속 사용해 새 메일을 요청할 수 있습니다. 메일 안의 실제 재설정 링크는 만료되므로, 필요할 때 이 페이지에서 다시 시작해 주세요. 몇 분이 지나도 메일이 없다면 이메일 주소와 스팸함을 확인하고 버튼이 활성화되면 다시 요청해 주세요.',
      support: '도움이 더 필요한가요?', back: 'PushShare 소개', privacyLink: '개인정보처리방침',
    },
  };

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
  try {
    const saved = localStorage.getItem('website-language');
    language = saved === 'ko' || saved === 'en' ? saved : (navigator.language?.startsWith('ko') ? 'ko' : 'en');
  } catch { language = navigator.language?.startsWith('ko') ? 'ko' : 'en'; }
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested === 'ko' || requested === 'en') language = requested;
  try {
    const saved = Number(sessionStorage.getItem(cooldownKey));
    if (Number.isFinite(saved)) nextRequestAt = Math.min(saved, Date.now() + 300000);
  } catch { /* The form also works when browser storage is unavailable. */ }

  function render() {
    const copy = COPY[language];
    const remaining = Math.max(0, Math.ceil((nextRequestAt - Date.now()) / 1000));
    document.documentElement.lang = language;
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
    language = selector.value === 'ko' ? 'ko' : 'en';
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
