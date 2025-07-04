// Firebase + Wallet connect (module script)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-Your-Key",
  authDomain: "kikundi.firebaseapp.com",
  projectId: "kikundi",
  databaseURL: "https://kikundi-default-rtdb.firebaseio.com",
  storageBucket: "kikundi.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function logUser(wallet) {
  set(ref(db, 'users/' + wallet), {
    joined: new Date().toISOString(),
    ref: document.referrer || null
  });
}
