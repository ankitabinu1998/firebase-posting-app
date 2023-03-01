// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLHTNlkzYewXGOGAyocT8MNFvkgbu-6DQ",
  authDomain: "fir-project-test-d28dd.firebaseapp.com",
  projectId: "fir-project-test-d28dd",
  storageBucket: "fir-project-test-d28dd.appspot.com",
  messagingSenderId: "693619011736",
  appId: "1:693619011736:web:32ed0bc72270924129a0ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
