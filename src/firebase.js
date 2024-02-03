// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChnzo46E8K6YbVzlUKYxmE0dpJoBwRkxI",
  authDomain: "qwerhacks24.firebaseapp.com",
  projectId: "qwerhacks24",
  storageBucket: "qwerhacks24.appspot.com",
  messagingSenderId: "369462593174",
  appId: "1:369462593174:web:9b7634c85791b4782124b7",
  measurementId: "G-Z7LPFNDYQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();