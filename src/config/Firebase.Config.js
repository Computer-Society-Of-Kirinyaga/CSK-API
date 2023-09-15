// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkTb6ICJv0jlKqdDT8ZZinepWAz_i1M24",
    authDomain: "cskapi-a97c8.firebaseapp.com",
    projectId: "cskapi-a97c8",
    storageBucket: "cskapi-a97c8.appspot.com",
    messagingSenderId: "298685204235",
    appId: "1:298685204235:web:538f2585d053b87b5fc40e",
    storageBucket: 'gs://cskapi-a97c8.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);