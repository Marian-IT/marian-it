import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {
     apiKey: "AIzaSyA_xfTNK6hhnuEsxHeY_2NFIF3oK5z1QZE",
    authDomain: "marianit-b6017.firebaseapp.com",
    projectId: "marianit-b6017",
    storageBucket: "marianit-b6017.firebasestorage.app",
    messagingSenderId: "136289406695",
    appId: "1:136289406695:web:7a374d4f21083fb8215c42"
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

        alert("Email sau parolă incorecte.");

    }

};