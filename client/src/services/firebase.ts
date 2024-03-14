import { initializeApp, deleteApp } from "firebase/app";
import { getAuth as firebaseGetAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore as firebaseGetFirestore,
  connectFirestoreEmulator,
} from "@firebase/firestore";
import {
  getStorage as firestoreGetStorage,
  connectStorageEmulator,
} from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// <FIX:FIREBASE_CREDENTIALS> should be replaced with the actual credentials
const firebaseCredentials = {
  // apiKey: "<api-key>",
  // authDomain: "<FIX:FIREBASE_PROJECT>.firebaseapp.com",
  // projectId: "<FIX:FIREBASE_PROJECT>",
  // storageBucket: "<FIX:FIREBASE_PROJECT>.appspot.com",
  // messagingSenderId: "<messagingSenderId>",
  // appId: "<app-id>",
  // measurementId: "<measurementId>", // if you have analytics enabled
};

export const createFirebase = (name?: string) => {
  const firebase = initializeApp(firebaseCredentials, name);

  if (!import.meta.env.DEV) {
    initializeAppCheck(firebase, {
      provider: new ReCaptchaV3Provider("<FIX:recaptchaProvider>"),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true,
    });
  }

  const auth = firebaseGetAuth(firebase);
  if (import.meta.env.DEV) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }

  const firestore = firebaseGetFirestore(firebase);
  if (import.meta.env.DEV) {
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  }

  const storage = firestoreGetStorage(firebase);
  if (import.meta.env.DEV) {
    connectStorageEmulator(storage, "127.0.0.1", 9199);
  }

  return {
    firebase,
    auth,
    firestore,
    storage,
    deleteApp: () => deleteApp(firebase),
  };
};

const defaultFirebaseApp = createFirebase();

export const firebase = defaultFirebaseApp.firebase;
export const auth = defaultFirebaseApp.auth;
export const firestore = defaultFirebaseApp.firestore;
export const storage = defaultFirebaseApp.storage;
