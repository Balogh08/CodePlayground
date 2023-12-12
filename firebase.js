// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApFQwnusJflcfitilDIxDQLkGepBV61J8",
  authDomain: "codeplayground-f348a.firebaseapp.com",
  projectId: "codeplayground-f348a",
  storageBucket: "codeplayground-f348a.appspot.com",
  messagingSenderId: "475557783422",
  appId: "1:475557783422:web:65849e7e9cdf624c27f52f",
  measurementId: "G-6LCZ6NPEXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
