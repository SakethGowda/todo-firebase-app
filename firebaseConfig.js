import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAT_B6XxzpDkrIvZcsef0H_5b8j3JNcnPY",
  authDomain: "todo-firebase-app-bfa53.firebaseapp.com",
  projectId: "todo-firebase-app-bfa53",
  storageBucket: "todo-firebase-app-bfa53.appspot.com",
  messagingSenderId: "382932317617",
  appId: "1:382932317617:web:2a6bf5584e62c57b3b3990"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
