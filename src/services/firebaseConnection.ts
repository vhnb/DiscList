import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCIOWycq6d46aXV4XLzKvG6WPHh-FtTYFw",
  authDomain: "disclogin-8c5e1.firebaseapp.com",
  projectId: "disclogin-8c5e1",
  storageBucket: "disclogin-8c5e1.appspot.com",
  messagingSenderId: "694937802226",
  appId: "1:694937802226:web:3d1b78c04e3dd2c53c476b"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
export {db}