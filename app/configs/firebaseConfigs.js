// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGynAKy0gb7E4qejJ1llVO1NjhFoltfno",
  authDomain: "engineers-ed914.firebaseapp.com",
  projectId: "engineers-ed914",
  storageBucket: "engineers-ed914.appspot.com",
  messagingSenderId: "110876707953",
  appId: "1:110876707953:web:76b2f3b893abafa4511fd0",
  measurementId: "G-MV7ZQSHYQS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
