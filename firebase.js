import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmvY7pPHhXxf6rMYT6A8Se-UTXTFETKgU",
  authDomain: "pantry-app-90db2.firebaseapp.com",
  projectId: "pantry-app-90db2",
  storageBucket: "pantry-app-90db2.appspot.com",
  messagingSenderId: "456142910387",
  appId: "1:456142910387:web:20c814a834b0bce2d151c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };

/* 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEBvBkFSUhLq3oelG_jP1uSq13ADi9aPA",
  authDomain: "pantry-69311.firebaseapp.com",
  projectId: "pantry-69311",
  storageBucket: "pantry-69311.appspot.com",
  messagingSenderId: "998796580674",
  appId: "1:998796580674:web:d98c0d4e11c1162a7e9adb",
  measurementId: "G-J5FLSL0BP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


*/
