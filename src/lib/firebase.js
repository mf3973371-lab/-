import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL3iEhI2PzoVFV-YUq4kcsCQrBMHFNhOw",
  authDomain: "shefaa-web.firebaseapp.com",
  projectId: "shefaa-web",
  storageBucket: "shefaa-web.firebasestorage.app",
  messagingSenderId: "376192887840",
  appId: "1:376192887840:web:ad601d146cd7008c722045"
};

// Initialize Firebase and Firestore safely with force long polling enabled
// to prevent gRPC streaming connection hangs in Node.js server environments.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let db;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (e) {
  db = getFirestore(app);
}

export { app, db };

