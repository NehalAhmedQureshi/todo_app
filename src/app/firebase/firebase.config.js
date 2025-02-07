// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9gHzueF5q_tb5DWPjCWsWhIwfLKTFIyU",
  authDomain: "firestore-database-by-nehal.firebaseapp.com",
  projectId: "firestore-database-by-nehal",
  storageBucket: "firestore-database-by-nehal.firebasestorage.app",
  messagingSenderId: "497302924005",
  appId: "1:497302924005:web:a80217df2a11644866020c",
  measurementId: "G-700EZFRXVY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {
  db,
  firebaseConfig,
  app,
  analytics,
  collection,
  addDoc,
  setDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
};
