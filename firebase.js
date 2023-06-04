// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJrGmjc9PCGN3Knwu9hxAWPtnf9wO_AB8",
  authDomain: "smdproject-79fb1.firebaseapp.com",
  projectId: "smdproject-79fb1",
  storageBucket: "smdproject-79fb1.appspot.com",
  messagingSenderId: "894047879703",
  appId: "1:894047879703:web:03675bdf4638e5063c9252",
  measurementId: "G-WE8Z3RF24T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db};