import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgXvKhAto3OYPs8BDQYiTedHmaf1VcNbw",
  authDomain: "chat-app-1899a.firebaseapp.com",
  projectId: "chat-app-1899a",
  storageBucket: "chat-app-1899a.appspot.com",
  messagingSenderId: "144293496360",
  appId: "1:144293496360:web:9e1dbde5e1039183b8171d"
};

// Initialize Firebase and Auth
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
