// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAKPL__IdJGmjdFKg1RK9Ug2TlzUhd3kaE",
    authDomain: "clone-4f5bf.firebaseapp.com",
    databaseURL: "https://clone-4f5bf.firebaseio.com",
    projectId: "clone-4f5bf",
    storageBucket: "clone-4f5bf.appspot.com",
    messagingSenderId: "354493041580",
    appId: "1:354493041580:web:a07632e7570892d7394809",
    measurementId: "G-J0RETF5K18"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };