import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { isSupported, getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Force long-polling so Firestore works reliably across proxies, extensions,
// and environments that block WebChannel (the default transport). Using
// forceLongPolling instead of autoDetect avoids the detection round-trip that
// can hang indefinitely when the unload Permissions-Policy blocks Firebase's
// internal beacon listener.
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch {
  firestoreDb = getFirestore(app);
}
export const db = firestoreDb;

// Analytics is initialised lazily after the page is interactive so its
// internal unload/pagehide listeners don't race with the Permissions-Policy
// restriction that blocks the unload event in modern browsers.
export const analyticsPromise: Promise<Analytics | null> =
  typeof window === "undefined"
    ? Promise.resolve(null)
    : new Promise((resolve) => {
        const init = () =>
          isSupported()
            .then((ok) => resolve(ok ? getAnalytics(app) : null))
            .catch(() => resolve(null));

        if (document.readyState === "complete") {
          init();
        } else {
          window.addEventListener("load", init, { once: true });
        }
      });
