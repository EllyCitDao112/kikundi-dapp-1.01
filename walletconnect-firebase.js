import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-Your-Key",
  authDomain: "kikundi.firebaseapp.com",
  databaseURL: "https://kikundi-default-rtdb.firebaseio.com",
  projectId: "kikundi",
  storageBucket: "kikundi.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "groupchat/kikundi-alpha");

onChildAdded(chatRef, (snapshot) => {
  const msg = snapshot.val();
  const el = document.createElement("div");
  el.textContent = `🗨️ ${msg.name || "Anon"}: ${msg.text}`;
  document.getElementById("chat-box").appendChild(el);
});

window.sendMessage = function() {
  const text = document.getElementById("chat-input").value;
  const name = localStorage.getItem("wallet") || "Anon";
  if (text.trim()) {
    push(chatRef, { name, text });
    document.getElementById("chat-input").value = "";
  }
};