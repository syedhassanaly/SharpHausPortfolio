import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCM0oU73u6GSG91hB4L_FS80s9FEL26ti8",
  authDomain: "sharphauscreatives.firebaseapp.com",
  projectId: "sharphauscreatives",
  storageBucket: "sharphauscreatives.firebasestorage.app",
  messagingSenderId: "451895673966",
  appId: "1:451895673966:web:e90c40268491cabc7fd27f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;