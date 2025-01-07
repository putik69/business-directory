// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnghAzzbmMYZHIhDNJ9_4csuThxSoV2GI",
  authDomain: "business-directory-23ae7.firebaseapp.com",
  projectId: "business-directory-23ae7",
  storageBucket: "business-directory-23ae7.firebasestorage.app",
  messagingSenderId: "812548167838",
  appId: "1:812548167838:web:0852c0dfc7f48e6864038f",
  measurementId: "G-KZE43B7J3F"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);