// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAviXzMlOpcjs95YouBH7GAWyV_u0_H208",
    authDomain: "challenge-b6dbb.firebaseapp.com",
    databaseURL: "https://challenge-b6dbb.firebaseio.com",
    projectId: "challenge-b6dbb",
    storageBucket: "challenge-b6dbb.appspot.com",
    messagingSenderId: "646898815070",
    appId: "1:646898815070:web:1ba274de553883dc4be4cf",
    measurementId: "G-KRZK449ETF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();

