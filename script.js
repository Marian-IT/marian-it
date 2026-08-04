/* ==========================================
   Marian IT v2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Navbar Sticky
    ========================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "rgba(8,18,31,.95)";
            header.style.boxShadow = "0 15px 30px rgba(0,0,0,.35)";

        } else {

            header.style.background = "rgba(8,18,31,.75)";
            header.style.boxShadow = "none";

        }

    });

    /* ==========================
       Counter
    ========================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let current = 0;

        const speed = target / 120;

        function updateCounter() {

            current += speed;

            if (current < target) {

                counter.innerText = Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target + "+";

            }

        }

        updateCounter();

    });

    /* ==========================
       Scroll Reveal
    ========================== */

    const revealItems = document.querySelectorAll(

        ".service-card,.why-card,.process-card,.price-card,.review-card,.stat-box"

    );

    const reveal = () => {

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < window.innerHeight - 80) {

                item.style.opacity = "1";
                item.style.transform = "translateY(0)";

            }

        });

    };

    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = ".6s";

    });

    reveal();

    window.addEventListener("scroll", reveal);

    /* ==========================
       FAQ
    ========================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const answer = item.querySelector("p");

        answer.style.display = "none";

        item.addEventListener("click", () => {

            const open = answer.style.display === "block";

            document.querySelectorAll(".faq-item p").forEach(p => {

                p.style.display = "none";

            });

            answer.style.display = open ? "none" : "block";

        });

    });

});

/* ==========================
   Back To Top
========================== */

const topButton = document.createElement("div");

topButton.className = "back-top";

topButton.innerHTML = '<i class="fas fa-chevron-up"></i>';

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500)

        topButton.classList.add("show");

    else

        topButton.classList.remove("show");

});

topButton.onclick = () =>

window.scrollTo({

    top:0,

    behavior:"smooth"

});

/* ==========================
   WhatsApp Floating
========================== */

const whatsapp = document.createElement("a");

whatsapp.href = "https://wa.me/40771797399";

whatsapp.target = "_blank";

whatsapp.className = "float-whatsapp";

whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';

document.body.appendChild(whatsapp);

/* ==========================
   Active Menu
========================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        const height=section.offsetHeight;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/* ===========================
   EMAILJS
=========================== */

emailjs.init({
    publicKey: "XJmMnf8L39Cnf6iT1"
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    const button = contactForm.querySelector("button");

    button.disabled = true;
    button.innerHTML = "Se trimite...";

    emailjs.sendForm(
        "service_MarianIT",
        "template_lj3ukwq",
        contactForm
    )
    .then(() => {

        button.innerHTML = "✓ Mesaj trimis";
        contactForm.reset();

        setTimeout(()=>{
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Trimite mesaj';
        },2000);

    })
    .catch((error)=>{

        console.error(error);

        button.disabled = false;
        button.innerHTML = '<i class="fas fa-paper-plane"></i> Trimite mesaj';

        alert("A apărut o eroare.");
    });

});

/*==============================
SCROLL PROGRESS
==============================*/

window.addEventListener("scroll",()=>{

const winScroll=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const scrolled=(winScroll/height)*100;

document.getElementById("scroll-progress").style.width=scrolled+"%";

});

/*==============================
CURSOR
==============================*/

const cursor=document.querySelector(".cursor");

const dot=document.querySelector(".cursor-dot");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

dot.style.left=e.clientX+"px";
dot.style.top=e.clientY+"px";

});

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.style.width="50px";
cursor.style.height="50px";

});

el.addEventListener("mouseleave",()=>{

cursor.style.width="32px";
cursor.style.height="32px";

});

});

/*==============================
3D CARDS
==============================*/

document.querySelectorAll(".service-card,.price-card,.review-card,.why-card,.process-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/12;

const rotateX=-(y-rect.height/2)/12;

card.style.transform=`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});

});

const waPopup = document.querySelector(".wa-popup");

function showWhatsAppPopup() {

    if(!waPopup) return;
    waPopup.classList.add("show");

    setTimeout(() => {

        waPopup.classList.remove("show");

    }, 5000);

}

// Prima apariție după 5 secunde
setTimeout(() => {

    showWhatsAppPopup();

    // Apoi la fiecare 30 secunde
    setInterval(showWhatsAppPopup, 30000);

}, 5000);

window.addEventListener("load", () => {

    const waPopup = document.querySelector(".wa-popup");

    if (!waPopup) return;

    setTimeout(() => {

        if(!waPopup) return;
    waPopup.classList.add("show");

        setTimeout(() => {

            waPopup.classList.remove("show");

        }, 5000);

    }, 5000);

});

const hamburger=document.getElementById("hamburger");

const navMenu=document.getElementById("navMenu");

hamburger.addEventListener("click",()=>{

navMenu.classList.toggle("active");

hamburger.classList.toggle("active");

});

document.querySelectorAll(".nav-menu a").forEach(link=>{

link.addEventListener("click",()=>{

navMenu.classList.remove("active");

});

});

// =========================
// TOAST
// =========================

window.showToast = function(message){

    const toast = document.getElementById("toast");
    const text = document.getElementById("toastMessage");

    if(!toast || !text) return;

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },3000);

}