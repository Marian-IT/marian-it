import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

document.getElementById("loginBtn").onclick = async ()=>{

    const email=document.getElementById("email").value;
    const pass=document.getElementById("password").value;

    try{

        await signInWithEmailAndPassword(auth,email,pass);

        location.href="admin.html";

    }catch(e){

        showToast("Email sau parolă incorecte.");

    }

};