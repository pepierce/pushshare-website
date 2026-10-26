# PushShare password reset request page

Permanent entry point: https://www.dosusu.com/pushshare-reset-password.html
English link: https://www.dosusu.com/pushshare-reset-password.html?lang=en
Korean link: https://www.dosusu.com/pushshare-reset-password.html?lang=ko

The page requests a fresh email with the official Firebase Web SDK's
`sendPasswordResetEmail(auth, email)`. It does not accept a password, sign a user
in, create an account, or confirm a password reset. The recipient opens the latest
email and changes their own password on Firebase's existing hosted action page.

## Existing production configuration

- Firebase project: `pushshare-d6da2`, matching the shipping Android/iOS app.
- Existing public web app: `1:572744163280:web:3dc9f101eca2be17a023d5`.
- Public configuration source: https://pushshare-d6da2.firebaseapp.com/__/firebase/init.json
- Existing reset email handler, confirmed in Firebase Console → Authentication
  → Templates → Password reset: `https://pushshare-d6da2.firebaseapp.com/__/auth/action`.
- No ActionCodeSettings/continue URL, OAuth, authorized-domain, API-key,
  security-rule, or shared email-template changes are required or included.
- The web config API key identifies the existing Firebase client project. It is
  public, unlike service-account private keys, OAuth client secrets, or Admin SDK
  credentials, none of which belong in this site.

Only Firebase App and Auth modules are loaded from Google's pinned official SDK
CDN. No Analytics, Firestore, Admin SDK, or sign-in persistence is initialized.
The entered address is sent only in the Firebase authentication request body;
the page does not put it in the URL, browser storage, telemetry, or console logs.
The form has no named input and a `form-action 'none'` CSP as a fallback against
native URL submission. Do not add email prefill parameters or analytics.

## Language and retries

The reset page supports all 23 active app locales, including Arabic, Persian,
and Urdu with RTL layout. The PushShare product page retains its existing eight
languages; the studio homepage retains Korean/English. Unsupported product-page
languages safely resolve to a supported browser language or English.

On the reset page, precedence is a supported explicit `?lang`, saved
`website-language`, the browser language list, then English. Region/script tags
are normalized, including zh-Hans/zh-Hant and zh-HK/zh-MO. Selecting a language
updates the URL, visible status and page language/direction. Only the selected
language is passed to Firebase for this request's email. No project email template
or hosted password-change handler is changed.

Success and account-specific errors show the same conditional completion copy.
Network and service errors show retry guidance without exposing raw errors.
Requests are locked while pending. A session-only timestamp provides a 60-second
retry delay (5 minutes after a Firebase rate/quota error), including across page
refreshes. This client cooldown is a UX aid, not server abuse protection. Firebase
enforcement and project security settings are unchanged.

## Validation

Run from this repository with Node 22+:

```sh
node --check js/pushshare-reset-password.js
node --check js/pushshare-reset-firebase.js
node --experimental-vm-modules --test tests/pushshare-reset-password.test.cjs
git diff --check
```

Tests inject an isolated mock Firebase module into a VM: they never access the
network or send email. They cover validation, duplicate submits, pending state,
uniform completion, network/quota/service errors, retry expiry, refresh, language
changes, blocked storage, SDK loading failure, and sensitive-data safeguards.

Browser checks performed with the real SDK: initial load, empty and malformed
addresses, accessible labels/focus, and console errors. Mock-only browser checks:
pending/completion and rate limiting, with Korean/English switching and 320/375px
responsive layouts. A malformed-address API probe returned `INVALID_EMAIL`
using the existing public web config and the official-site Origin/Referer; no
mailbox was used. These checks do not prove actual email delivery.

Only send a real validation email if the user identifies an existing approved test
account. Do not create a new account, use a customer's address, or change a
customer password for testing. End-to-end delivery and a real password change
remain unverified until such an approved test is performed.

## Deployment

This `website` directory is a separate Git submodule repository:
`pepierce/pushshare-website`, branch `main`. As verified on 2026-10-19, the live
`www.dosusu.com` DNS resolves to `pepierce.github.io`, HTTPS serves `GitHub.com`,
and the latest commit has a successful `pages build and deployment` Actions run.
The domain is served by GitHub Pages; do not infer Cloud Run from other Dosusu
services. Pushing the website's `main` branch triggers the existing Pages build.
Verify the exact pushed commit's Actions result and the HTTPS response bytes.
No PushShare app, native build, backend deployment, or submodule-pointer commit
in the parent repository is part of this website-only change.
