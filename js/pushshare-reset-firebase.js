// Existing public web-app configuration, not an Admin SDK credential.
// Source: https://pushshare-d6da2.firebaseapp.com/__/firebase/init.json
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import {
  initializeAuth,
  inMemoryPersistence,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';

const app = initializeApp({
  apiKey: 'AIzaSyCzXMdE9fFjyk27wh_O_qT6HxPyTK_Hj6o',
  authDomain: 'pushshare-d6da2.firebaseapp.com',
  projectId: 'pushshare-d6da2',
  appId: '1:572744163280:web:3dc9f101eca2be17a023d5',
}, 'pushshare-password-reset');

// No sign-in session, analytics, Firestore, or account discovery is needed.
const auth = initializeAuth(app, { persistence: inMemoryPersistence });

export async function requestPasswordReset(email, language) {
  auth.languageCode = language;
  // Keep the existing Firebase email template and official hosted action page.
  // Deliberately omit ActionCodeSettings, continue URLs, and in-app handling.
  await sendPasswordResetEmail(auth, email);
}
