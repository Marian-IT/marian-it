import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot
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
const searchInput = document.getElementById("searchReview");

const ratingAverage = document.getElementById("ratingAverage");
const reviewsCount = document.getElementById("reviewsCount");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");

let reviews = [];
let filtered = [];

let currentPage = 1;
const perPage = 12;

function render() {

    reviewsGrid.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    filtered.slice(start, end).forEach(review => {

        const card = document.createElement("div");

        card.className = "review-card";

        const stars = "★".repeat(review.stars);

        let date = "";

        if (review.createdAt?.seconds) {

            date = new Date(review.createdAt.seconds * 1000)
                .toLocaleDateString("ro-RO");

        }

        card.innerHTML = `
            <div style="font-size:22px;color:#FFD700">
                ${stars}
            </div>

            <p>"${review.review}"</p>

            <h4>${review.name}</h4>

            <small>${date}</small>
        `;

        reviewsGrid.appendChild(card);

    });

    pageNumber.textContent = currentPage;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= filtered.length;

}

const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc")
);

onSnapshot(q, snapshot => {

    reviews = snapshot.docs.map(doc => doc.data());

    filtered = [...reviews];

    const total = reviews.length;

    const avg = total
        ? reviews.reduce((a, b) => a + b.stars, 0) / total
        : 0;

    ratingAverage.innerHTML = `⭐ ${avg.toFixed(1)}`;

    reviewsCount.innerHTML = `${total} recenzii`;

    currentPage = 1;

    render();

});

searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase();

    filtered = reviews.filter(r =>
        r.name.toLowerCase().includes(text)
    );

    currentPage = 1;

    render();

});

nextBtn.addEventListener("click", () => {

    currentPage++;

    render();

});

prevBtn.addEventListener("click", () => {

    currentPage--;

    render();

});