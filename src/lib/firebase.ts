// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3fwdOMG_1KvYtPSUDz8nDIZFLcYlgQLg",
  authDomain: "nemora-eb68d.firebaseapp.com",
  projectId: "nemora-eb68d",
  storageBucket: "nemora-eb68d.firebasestorage.app",
  messagingSenderId: "983279568233",
  appId: "1:983279568233:web:c8727027ad4fe14431e9f8",
  measurementId: "G-VP8GPLVTG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;