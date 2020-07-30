import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/firebase-storage'

var firebaseConfig = {
    apiKey: "AIzaSyDvpEVfy2DbDFx0HyxslflrlZJgOLORvAQ",
    authDomain: "distribution-site-kindle.firebaseapp.com",
    databaseURL: "https://distribution-site-kindle.firebaseio.com",
    projectId: "distribution-site-kindle",
    storageBucket: "distribution-site-kindle.appspot.com",
    messagingSenderId: "676760649859",
    appId: "1:676760649859:web:a8a73feeb7c9bef428dbb6",
    measurementId: "G-6LMJ1BVRXJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
