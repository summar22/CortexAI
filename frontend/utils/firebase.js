// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-2d188.firebaseapp.com",
  projectId: "cortexai-2d188",
  storageBucket: "cortexai-2d188.firebasestorage.app",
  messagingSenderId: "487044052467",
  appId: "1:487044052467:web:a7fbc2a56de393f2474e86"
};

// Initialize Firebase (guard against duplicate init on Vite HMR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()