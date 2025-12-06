// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDrUFgRUWCuMgmkl5wrJMjLP920EhSVlDg",
  authDomain: "student-f5d72.firebaseapp.com",
  projectId: "student-f5d72",
  storageBucket: "student-f5d72.firebasestorage.app",
  messagingSenderId: "347252722068",
  appId: "1:347252722068:web:afc65596db209ed033e781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)