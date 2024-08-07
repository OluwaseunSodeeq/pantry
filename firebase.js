import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { firestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// const storage = getStorage(app);

export { app, firestore };

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBmvY7pPHhXxf6rMYT6A8Se-UTXTFETKgU",
//   authDomain: "pantry-app-90db2.firebaseapp.com",
//   projectId: "pantry-app-90db2",
//   storageBucket: "pantry-app-90db2.appspot.com",
//   messagingSenderId: "456142910387",
//   appId: "1:456142910387:web:20c814a834b0bce2d151c6",
// };

// // Initialize Firebase only on the client side
// const app =
//   typeof window !== "undefined" ? initializeApp(firebaseConfig) : null;
// const firestore = app ? getFirestore(app) : null;

// export { firestore };

// firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBmvY7pPHhXxf6rMYT6A8Se-UTXTFETKgU",
//   authDomain: "pantry-app-90db2.firebaseapp.com",
//   projectId: "pantry-app-90db2",
//   storageBucket: "pantry-app-90db2.appspot.com",
//   messagingSenderId: "456142910387",
//   appId: "1:456142910387:web:20c814a834b0bce2d151c6",
// };

// let firestore;

// if (typeof window !== "undefined") {
//   const app = initializeApp(firebaseConfig);
//   firestore = getFirestore(app);
// }

// export { firestore };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBmvY7pPHhXxf6rMYT6A8Se-UTXTFETKgU",
//   authDomain: "pantry-app-90db2.firebaseapp.com",
//   projectId: "pantry-app-90db2",
//   storageBucket: "pantry-app-90db2.appspot.com",
//   messagingSenderId: "456142910387",
//   appId: "1:456142910387:web:20c814a834b0bce2d151c6",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
// // export { firestore };
// export { firestore, collection, query, getDocs, doc, setDoc };

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
