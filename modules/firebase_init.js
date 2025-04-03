// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVJM9Rrf9QhBzwCrbJuzzhCJPrwvgoFqk",
  authDomain: "shopone-b17c0.firebaseapp.com",
  projectId: "shopone-b17c0",
  storageBucket: "shopone-b17c0.firebasestorage.app",
  messagingSenderId: "367255647029",
  appId: "1:367255647029:web:c2343f7bdd54c9eaaf127c",
  measurementId: "G-BF1V9QCJX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };