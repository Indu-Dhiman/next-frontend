

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  OAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANrygyQ6HXLHe3A3nt8YJVviqCsJEI_eI",
  authDomain: "mietwohl-b31c4.firebaseapp.com",
  projectId: "mietwohl-b31c4",
  storageBucket: "mietwohl-b31c4.appspot.com",
  messagingSenderId: "23530108993",
  appId: "1:23530108993:web:1fdff53d648b6d800beec0",
  measurementId: "G-5C9TZRHJRG"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

googleProvider.setCustomParameters({
  prompt: 'select_account'
});


export { auth, googleProvider as provider, facebookProvider, appleProvider };