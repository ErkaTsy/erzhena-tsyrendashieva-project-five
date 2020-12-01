// import firebase SDK from npm install firebase nade package
import firebase from 'firebase/app';
// realtime database library
import 'firebase/database';

// goal tracker app configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA5rvQYwW9E00UGAAj8f0IxOQdkHbKgdFA",
  authDomain: "goal-tracker-app-53782.firebaseapp.com",
  databaseURL: "https://goal-tracker-app-53782.firebaseio.com",
  projectId: "goal-tracker-app-53782",
  storageBucket: "goal-tracker-app-53782.appspot.com",
  messagingSenderId: "747924635501",
  appId: "1:747924635501:web:4e5f0c23821f043ace2464",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;