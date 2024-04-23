import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFCz3kh_CNmD0vtzxdWyRHJY617QFJmMk",
  authDomain: "classpulse-85a03.firebaseapp.com",
  projectId: "classpulse-85a03",
  storageBucket: "classpulse-85a03.appspot.com",
  messagingSenderId: "307162928550",
  appId: "1:307162928550:web:fbb281ddfff86a4b45ab67"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth =  getAuth(app);