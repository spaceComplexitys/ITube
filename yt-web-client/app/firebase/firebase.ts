// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { loadEnvConfig } from '@next/env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfZRZgZ22t9WAMPdLcT8a79p6Fdj0RTKU",
  authDomain: "it-clone.firebaseapp.com",
  projectId: "it-clone",
  appId: "1:426529027827:web:7c051418b8fef8d5906986",
  measurementId: "G-MGZM961WNP"
};

 // storageBucket: "it-clone.appspot.com",
 // messagingSenderId: "426529027827",




// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

/**
 * Signs wthe user in with a Google popup.
 * @returns A promise that resolves with the user's credentials
 */

export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider);
}



/**
 * Signs wthe user in with a Google popup.
 * @returns A promise that resolves when the user signed out
 */

export function signOut() {
    return auth.signOut();
}

/*
    Trigger a callback when user auth state changes.
    @returns A function to unsubscribe callback.
*/ 
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}