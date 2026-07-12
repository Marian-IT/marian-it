// ===========================
// NAVBAR SCROLL
// ===========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.style.background = "rgba(5,11,22,.98)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
    } else {
        header.style.background = "rgba(5,11,22,.90)";
        header.style.boxShadow = "none";
    }

});

// ===========================
// SCROLL REVEAL
// ===========================

const reveals = document.querySelectorAll(
    ".service-card, .why-box, .step, .testimonial, .price-card"
);

const revealOnScroll = () => {

    reveals.forEach((item) => {

        const top = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            item.classList.add("show");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===========================
// BACK TO TOP BUTTON
// ===========================

const topBtn = document.createElement("button");

topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn.classList.add("active");
    } else {
        topBtn.classList.remove("active");
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===========================
// ACTIVE MENU
// ===========================

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

/* ===========================
   ANIMATII
=========================== */

.service-card,
.why-box,
.step,
.testimonial,
.price-card{

opacity:0;

transform:translateY(40px);

transition:.7s ease;

}

.show{

opacity:1;

transform:translateY(0);

}

/* ===========================
   BUTON TOP
=========================== */

#topBtn{

position:fixed;

right:25px;

bottom:25px;

width:55px;

height:55px;

border:none;

border-radius:50%;

background:#2196ff;

color:white;

font-size:20px;

cursor:pointer;

opacity:0;

visibility:hidden;

transition:.3s;

box-shadow:0 0 20px rgba(33,150,255,.4);

z-index:9999;

}

#topBtn.active{

opacity:1;

visibility:visible;

}

#topBtn:hover{

transform:translateY(-5px);

background:#0b7cff;

}

// HERO PARALLAX

const heroImage = document.querySelector(".pc-image");

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/60;

const y=(window.innerHeight/2-e.clientY)/60;

heroImage.style.transform=
`rotateY(${x}deg) rotateX(${-y}deg)`;

});

@keyframes float{

0%{

transform:translateY(0);

}

50%{

transform:translateY(-12px);

}

100%{

transform:translateY(0);

}

}