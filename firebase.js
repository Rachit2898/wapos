// import firebase from 'firebase/app';

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDNQGi5FNRyaOf1NJddH3u4XhGG85TBU6E",
  authDomain: "wapos-f5180.firebaseapp.com",
  projectId: "wapos-f5180",
  storageBucket: "wapos-f5180.appspot.com",
  messagingSenderId: "447919629992",
  appId: "1:447919629992:web:943940b16b6ca994ac049d",
  measurementId: "G-PSZWC84V3G",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firebaseapp = firebase.app();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, firebaseapp, db, storage };
