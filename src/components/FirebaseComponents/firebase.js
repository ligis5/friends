import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCZ5LtkwMmGOXIiKKtWw4HHUg5e7RAWeTk",
  authDomain: "friends-6f994.firebaseapp.com",
  projectId: "friends-6f994",
  storageBucket: "friends-6f994.appspot.com",
  messagingSenderId: "472178657516",
  appId: "1:472178657516:web:b503468f35c111b5e1bdc9",
  measurementId: "G-9HVB9M7BJV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleAuth = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider);
};

export default firebase;
