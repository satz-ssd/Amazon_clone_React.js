import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBeGPz28LD82nDPOSKE2FqLXDxRo7ndnas",
  authDomain: "clone-75b23.firebaseapp.com",
  projectId: "clone-75b23",
  storageBucket: "clone-75b23.appspot.com",
  messagingSenderId: "182566061966",
  appId: "1:182566061966:web:4b35dbc2e4f0e2f14cc6df"
  }; 
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };