// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import Firebase from "firebase";
  const firebaseApp=Firebase.initializeApp({
    apiKey: "AIzaSyD7ybcFdhPkvAkAqauh2LaOfSeH-XkY-tg",
    authDomain: "instagram-clone-react-75f8e.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-75f8e-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-75f8e",
    storageBucket: "instagram-clone-react-75f8e.appspot.com",
    messagingSenderId: "551179295508",
    appId: "1:551179295508:web:a79fd299535813b555c001",
    measurementId: "G-SK08JXMVDH"

  });
  
  const db=firebaseApp.firestore();
  const auth=Firebase.auth();
  const storage=Firebase.storage();
  const provider = new Firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
//   export default db;