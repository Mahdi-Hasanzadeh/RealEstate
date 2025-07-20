// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // apiKey: "AIzaSyBAzzVs3x7SGNXkEVRA9fVXnTrRjSHp9Ds",
  authDomain: "mernestate-3fd69.firebaseapp.com",
  projectId: "mernestate-3fd69",
  storageBucket: "mernestate-3fd69.appspot.com",
  messagingSenderId: "977832260487",
  appId: "1:977832260487:web:27f652f74693896211d922",
  measurementId: "G-PND4YGW8QL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
