import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBxqQ_4tt-Dx0Ru7-GU7lvLhvInrd0Z1r4",
  authDomain: "unipathai-245e1.firebaseapp.com",
  projectId: "unipathai-245e1",
  storageBucket: "unipathai-245e1.firebasestorage.app",
  messagingSenderId: "614039402511",
  appId: "1:614039402511:web:b74b4627c5a58bd9cf8b7a",
  measurementId: "G-47EQW23FMS"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app