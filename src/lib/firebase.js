import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL3iEhI2PzoVFV-YUq4kcsCQrBMHFNhOw",
  authDomain: "shefaa-web.firebaseapp.com",
  projectId: "shefaa-web",
  storageBucket: "shefaa-web.firebasestorage.app",
  messagingSenderId: "376192887840",
  appId: "1:376192887840:web:ad601d146cd7008c722045"
};

// Initialize Firebase only if it hasn't been initialized already
// This prevents Next.js hot-reloading from throwing an error
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
