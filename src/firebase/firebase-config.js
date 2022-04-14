import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAZczukGDUgfgUeMcrrSYVU_A6dIG1SYXE",
    authDomain: "react-app-curso-8ceb7.firebaseapp.com",
    projectId: "react-app-curso-8ceb7",
    storageBucket: "react-app-curso-8ceb7.appspot.com",
    messagingSenderId: "172747501439",
    appId: "1:172747501439:web:48d4f9ae1b185cc434b44a",
    measurementId: "G-TDWRR4SESV"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const googleAuthProvider = new GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      app
  }
