document.addEventListener("DOMContentLoaded", function () {

    const nav = document.querySelector(".nav-links");
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    const form = document.querySelector("form");

    // ✅ MOBILE MENU TOGGLE (GLOBAL)
    window.toggleMenu = function () {
        if (nav) {
            nav.classList.toggle("active");
        }
    };

    // ✅ PREVENT MENU CLOSE WHEN CLICKING INSIDE
    if (nav) {
        nav.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    // ✅ CLOSE MENU WHEN CLICK OUTSIDE
    // Mobile menu toggle
function toggleMenu(event) {
    event.stopPropagation(); // 🔥 VERY IMPORTANT
    if (nav) {
        nav.classList.toggle('active');
        console.log("Hamburger clicked ✅");
    }
}

    // ✅ DROPDOWN CLICK (SCHEDULE)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const parent = this.parentElement;

            // Close other dropdowns
            document.querySelectorAll(".dropdown").forEach(drop => {
                if (drop !== parent) {
                    drop.classList.remove("active");
                }
            });

            // Toggle current dropdown
            parent.classList.toggle("active");
        });
    });

    // ✅ CLOSE MENU ONLY FOR NORMAL LINKS
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {

            // Don't close if it's dropdown toggle
            if (this.classList.contains("dropdown-toggle")) return;

            if (nav) nav.classList.remove("active");
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

    // ✅ FORM SUBMISSION (FIXED)
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            sendEmail(e);
        });
    }

    // ✅ SMOOTH SCROLL FIXED
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


// ✅ SCROLL ANIMATION FUNCTION
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


// ✅ SCHEDULE TAB FUNCTION (UNCHANGED BUT CLEAN)
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
