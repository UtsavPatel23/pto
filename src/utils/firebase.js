import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9atL2zOFWxnk51Ozl6gRblqW3Dk8_f8Q",
  authDomain: "pooltable-1792c.firebaseapp.com",
  projectId: "pooltable-1792c",
  storageBucket: "pooltable-1792c.appspot.com",
  messagingSenderId: "269993114604",
  appId: "1:269993114604:web:0189cdbef082125a11dec9",
  measurementId: "G-QKDBC54DRB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);