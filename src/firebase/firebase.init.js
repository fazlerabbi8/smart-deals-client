// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYAUAUzpfWVtD9PCgLccNnpZsyKlLKiuI",
  authDomain: "smart-deals-auth-78d5f.firebaseapp.com",
  projectId: "smart-deals-auth-78d5f",
  storageBucket: "smart-deals-auth-78d5f.firebasestorage.app",
  messagingSenderId: "457139728665",
  appId: "1:457139728665:web:fb15b5e45fb530823b5588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;