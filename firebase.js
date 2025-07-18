// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNB7ev5Rqt-UIM6GPEimxh-imVR6vex6c",
  authDomain: "safiz-family-portal-a1855.firebaseapp.com",
  projectId: "safiz-family-portal-a1855",
  storageBucket: "safiz-family-portal-a1855.appspot.com",
  messagingSenderId: "397644387764",
  appId: "1:397644387764:web:af6275bf2c4410dbf34ee1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
