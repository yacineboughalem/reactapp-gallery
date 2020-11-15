import firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyAJKWT3PAz1jXSJBkpEstVIWa01uAAzqa0",
    authDomain: "react-tuto-f5ee7.firebaseapp.com",
    databaseURL: "https://react-tuto-f5ee7.firebaseio.com",
    projectId: "react-tuto-f5ee7",
    storageBucket: "react-tuto-f5ee7.appspot.com",
    messagingSenderId: "761368847850",
    appId: "1:761368847850:web:54bd6e6d8fc44051327e93"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase