// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5m3iPTtIci2H0i5ANCUELJFSmkX4Ue24",
    authDomain: "camlsas.firebaseapp.com",
    projectId: "camlsas",
    storageBucket: "camlsas.appspot.com",
    messagingSenderId: "330051080449",
    appId: "1:330051080449:web:caf34fa2ec658daa6e0b00"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)