document.addEventListener("DOMContentLoaded", function () {


const nav = document.querySelector(".nav-links");
const overlay = document.querySelector(".overlay");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const form = document.querySelector("form");

// ✅ MOBILE MENU TOGGLE (ONLY ONE FUNCTION - GLOBAL)
window.toggleMenu = function (event) {
    if (event) event.stopPropagation();

    if (nav) nav.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");

    console.log("Menu toggled ✅");
};

// ✅ PREVENT MENU CLOSE WHEN CLICKING INSIDE
if (nav) {
    nav.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}

// ✅ CLOSE MENU WHEN CLICKING OUTSIDE
document.addEventListener("click", function () {
    if (nav) nav.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
});

// ✅ DROPDOWN CLICK (SCHEDULE)
dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const parent = this.parentElement;

        document.querySelectorAll(".dropdown").forEach(drop => {
            if (drop !== parent) {
                drop.classList.remove("active");
            }
        });

        parent.classList.toggle("active");
    });
});

// ✅ CLOSE MENU WHEN CLICKING NORMAL LINKS
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function () {

        if (this.classList.contains("dropdown-toggle")) return;

        if (nav) nav.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
    });
});

// ✅ SET ACTIVE NAV LINK
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// ✅ FORM SUBMISSION
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (typeof sendEmail === "function") {
            sendEmail(e);
        }
    });
}

// ✅ SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ✅ INITIAL ANIMATION SETUP
const elements = document.querySelectorAll(".class-card, .schedule-item, .contact-item");

elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
});

setTimeout(animateOnScroll, 100);


});

// ✅ NAVBAR BACKGROUND ON SCROLL
window.addEventListener("scroll", function () {
const header = document.querySelector("header");


if (header) {
    if (window.scrollY > 100) {
        header.style.background = "teal";
    } else {
        header.style.background = "linear-gradient(135deg, teal, rgba(45,205,214))";
    }
}

animateOnScroll();


});

// ✅ SCROLL ANIMATION
function animateOnScroll() {
const elements = document.querySelectorAll(".class-card, .schedule-item, .contact-item");


elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    }
});


}

// ✅ SCHEDULE TAB FUNCTION
function showTab(tabName, event) {
const grids = document.querySelectorAll(".schedule-grid");


grids.forEach(grid => {
    grid.classList.remove("active");
    grid.style.display = "none";
});

const selected = document.getElementById(tabName);

if (selected) {
    selected.classList.add("active");
    selected.style.display = "block";
}

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
});

if (event && event.target) {
    event.target.classList.add("active");
}


}

// ✅ PAGE LOAD FADE EFFECT
window.addEventListener("load", function () {
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s";


setTimeout(() => {
    document.body.style.opacity = "1";
}, 100);


});
