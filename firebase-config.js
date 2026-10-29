// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7xJx3gNrMuu0--UKjHkgbSXCfCbYGQiY",
  authDomain: "project-management-porta-2a53f.firebaseapp.com",
  projectId: "project-management-porta-2a53f",
  storageBucket: "project-management-porta-2a53f.firebasestorage.app",
  messagingSenderId: "337427504644",
  appId: "1:337427504644:web:9fe4fe0f831a9511501f51",
  measurementId: "G-H6S4FLVL2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
