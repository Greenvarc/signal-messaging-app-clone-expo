import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB-a63PLQrDy1oP9V_ST8xT8wZdUExLdLc",
  authDomain: "signal-clone-e6ad8.firebaseapp.com",
  projectId: "signal-clone-e6ad8",
  storageBucket: "signal-clone-e6ad8.appspot.com",
  messagingSenderId: "923519194994",
  appId: "1:923519194994:web:c8c07f0135f22d5a4eafeb"
};

// Initialize Firebase
let app;
if (firebase.apps.length===0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app()
}

const db=app.firestore()
const auth = firebase.auth()

export {db,auth};
