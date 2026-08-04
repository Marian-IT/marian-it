import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
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
const db = getFirestore(app);
const auth = getAuth(app);

// Protejează pagina
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.href = "login.html";
        return;
    }

    loadReviews();

});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {

    await signOut(auth);

    location.href = "login.html";

});

// Încarcă recenziile
async function loadReviews() {

    const snapshot = await getDocs(collection(db, "reviews"));

    const tbody = document.getElementById("reviewsTable");

    tbody.innerHTML = "";

    let totalStars = 0;

    snapshot.forEach((reviewDoc) => {

        const data = reviewDoc.data();

        totalStars += data.stars;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${data.name}</td>
            <td>${"⭐".repeat(data.stars)}</td>
            <td>${data.review}</td>
            <td>
                <button class="delete" data-id="${reviewDoc.id}">
                    Șterge
                </button>
            </td>
        `;

        tbody.appendChild(tr);

    });

    const total = snapshot.size;

    document.getElementById("totalReviews").textContent = total;

    document.getElementById("averageStars").textContent =
        total ? (totalStars / total).toFixed(1) : "0.0";

    document.querySelectorAll(".delete").forEach(btn => {

        btn.onclick = async () => {

            if (!confirm("Ștergi această recenzie?")) return;

            await deleteDoc(doc(db, "reviews", btn.dataset.id));

            loadReviews();

        };

    });

}