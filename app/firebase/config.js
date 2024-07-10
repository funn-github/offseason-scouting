// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxS-1C7RnHGzPfA4j1Hpe1PzDDpwLTJ8A",
  authDomain: "offseasonscouting-8ae61.firebaseapp.com",
  projectId: "offseasonscouting-8ae61",
  storageBucket: "offseasonscouting-8ae61.appspot.com",
  messagingSenderId: "851050854779",
  appId: "1:851050854779:web:1b7e5b5a73db2e845a65de"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)