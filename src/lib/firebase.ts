// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWLYonmMYUbZLXAqUGFGf9MI0mfwHYF_A",
  authDomain: "langage-sensei.firebaseapp.com",
  projectId: "langage-sensei",
  storageBucket: "langage-sensei.firebasestorage.app",
  messagingSenderId: "755940264121",
  appId: "1:755940264121:web:9dbf971487bd9f682ff368",
  measurementId: "G-7J7GXCMN7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();