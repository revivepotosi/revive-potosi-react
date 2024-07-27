import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJfgBXR8Q7wGmNthi0EwcC88s2FhRmlMk",
  authDomain: "revivepotosi-4e6fb.firebaseapp.com",
  projectId: "revivepotosi-4e6fb",
  storageBucket: "revivepotosi-4e6fb.appspot.com",
  messagingSenderId: "1035190875734",
  appId: "1:1035190875734:web:1afa1564d9a169d9f82df7",
  measurementId: "G-W9C5SNGQQC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);

export default app;