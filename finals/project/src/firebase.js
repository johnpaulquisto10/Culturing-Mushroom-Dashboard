import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGMvQyALWUSR6LFjuWDJ0oVi2pjlKMu0A",
    authDomain: "vue3-88ae6.firebaseapp.com",
    projectId: "vue3-88ae6",
    storageBucket: "vue3-88ae6.firebasestorage.app",
    messagingSenderId: "305835778414",
    appId: "1:305835778414:web:384a53cc239a846fc4217f",
    measurementId: "G-BCM64D0B26"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
