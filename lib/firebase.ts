import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyB7zt-8wfAEgjf4Ng1TSInMvofxDDNXaBw",
  authDomain: "wear-saint-paul.firebaseapp.com",
  databaseURL: "https://wear-saint-paul-default-rtdb.firebaseio.com",
  projectId: "wear-saint-paul",
  storageBucket: "wear-saint-paul.firebasestorage.app",
  messagingSenderId: "459527692359",
  appId: "1:459527692359:web:3dbc726dc622db334d1162",
  measurementId: "G-MHW886C1GB"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
export const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app)

// Initialize Database
export const db = getDatabase(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
