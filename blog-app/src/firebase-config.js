
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4ZX_9xPffaGlO29AMowkzAfNywy0FVBg",
  authDomain: "blog-app-5b4b8.firebaseapp.com",
  projectId: "blog-app-5b4b8",
  storageBucket: "blog-app-5b4b8.appspot.com",
  messagingSenderId: "866729888922",
  appId: "1:866729888922:web:e585db873ac1452522a323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();