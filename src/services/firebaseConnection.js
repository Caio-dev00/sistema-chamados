import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyCuv96R8rPZspYNpafc7rRHOgg22et_-4w",
    authDomain: "sistema-chamados-a77db.firebaseapp.com",
    projectId: "sistema-chamados-a77db",
    storageBucket: "sistema-chamados-a77db.appspot.com",
    messagingSenderId: "837791593741",
    appId: "1:837791593741:web:2f6326c73f0b68f6376c44",
    measurementId: "G-7EQ85Z658L"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export {auth, db, storage};