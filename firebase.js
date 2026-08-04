import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

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

const reviewsGrid = document.getElementById("reviewsGrid");
const sendButton = document.getElementById("sendReview");
const stars = document.querySelectorAll(".stars-select .star");

let selectedStars = 5;

function updateStars() {

    stars.forEach(star => {

        const value = Number(star.dataset.value);

        if (value <= selectedStars) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }

    });

}

updateStars();

stars.forEach(star => {

    star.addEventListener("click", () => {

        selectedStars = Number(star.dataset.value);

        updateStars();

    });

});
function renderReview(data) {

    const card = document.createElement("div");

    card.className = "review-card";

    const stars = "★".repeat(data.stars);

    let date = "";

    if (data.createdAt?.seconds) {

        date = new Date(data.createdAt.seconds * 1000)
            .toLocaleDateString("ro-RO");

    }

    card.innerHTML = `
        <div style="font-size:22px;color:#FFD700;">
            ${stars}
        </div>

        <p>"${data.review}"</p>

        <h4>${data.name}</h4>

        <small>${date}</small>
    `;

    reviewsGrid.appendChild(card);
}

const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc")
);

onSnapshot(
    q,
    (snapshot) => {

        console.log("Documente:", snapshot.size);

        reviewsGrid.innerHTML = "";

        snapshot.forEach((doc) => {

            console.log(doc.data());

            renderReview(doc.data());

        });

    },
    (error) => {

        console.error("Firestore:", error);

    }
);

sendButton.addEventListener("click", async () => {

    const review = document
        .getElementById("reviewText")
        .value
        .trim();

    const name = document
        .getElementById("reviewName")
        .value
        .trim();

    const stars = selectedStars;

    if (!review || !name) {

        showToast("Completează toate câmpurile!");

        return;

    }

    try {

    await addDoc(collection(db, "reviews"), {

        review,
        name,
        stars,
        createdAt: serverTimestamp()

    });

    document.getElementById("reviewText").value = "";
    document.getElementById("reviewName").value = "";

    showToast("Recenzia a fost trimisă cu succes!");

} catch(error){

    console.error(error);

}

});