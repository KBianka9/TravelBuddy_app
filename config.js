// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfrJJtZ2FJrt7yiYNXZ1OVbOMOPFHBMS4",
  authDomain: "travelbuddy-1436a.firebaseapp.com",
  projectId: "travelbuddy-1436a",
  storageBucket: "travelbuddy-1436a.appspot.com",
  messagingSenderId: "65910613561",
  appId: "1:65910613561:web:3a474aac651fb2952e8fe8",
  measurementId: "G-CE08H57ZF2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
