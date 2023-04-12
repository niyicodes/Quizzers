import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 onAuthStateChanged,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB-3e0urCAKgAFYJOU697uVOuk2Yv5sYwY",
  authDomain: "quizerrs.firebaseapp.com",
  projectId: "quizerrs",
  storageBucket: "quizerrs.appspot.com",
  messagingSenderId: "358887523280",
  appId: "1:358887523280:web:225d5e6d3371e451af6fd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
// const db = getFirestore();


const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
 try {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
 } catch (err) {
  console.error(err);
  alert(err.message);
 }
};

export { db, auth, signInWithGoogle, onAuthStateChanged };
