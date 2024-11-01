import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDrpNdndfYnP07eaYtHcwdJ5a7e7iGri58",
    authDomain: "inalert-7e839.firebaseapp.com",
    projectId: "inalert-7e839",
    storageBucket: "inalert-7e839.appspot.com",
    messagingSenderId: "904796968524",
    appId: "1:904796968524:web:5a498d8493d9c99e3f46e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);
export const storage = getStorage(app);
