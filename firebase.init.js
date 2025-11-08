// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs1HkQThyszf9rpTiYHO3pEapYGPVW2zo",
  authDomain: "explore-email-password-a-488fe.firebaseapp.com",
  projectId: "explore-email-password-a-488fe",
  storageBucket: "explore-email-password-a-488fe.firebasestorage.app",
  messagingSenderId: "1002346000277",
  appId: "1:1002346000277:web:8981228998a135511c909c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);