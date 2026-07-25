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

whatsapp.href = "https://wa.me/40724568180";

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

