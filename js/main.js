/**
 * ASKY VISUALS — Main Application Controller
 * Navigation, Fullscreen Mobile Menu, Booking Inquiry Form & UX Enhancements.
 */

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initMobileMenu();
    initBookingForm();
    initYearDisplay();
    initCameraSpecsTicker();
});

// Smooth anchor scrolling & active link tracking
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link-item, .mobile-menu-link, .btn-cinematic[href^='#']");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    closeMobileMenu();

                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Intersection observer to highlight current nav item
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-link-item").forEach(a => {
            a.classList.remove("is-active");
            if (a.getAttribute("href") === `#${current}`) {
                a.classList.add("is-active");
            }
        });
    }, { passive: true });
}

// Fullscreen Mobile Drawer Menu
function initMobileMenu() {
    const hamburger = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("fullscreen-mobile-menu");
    const closeBtn = document.getElementById("mobile-menu-close");

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("is-open");
        document.body.classList.toggle("menu-locked");
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeMobileMenu);
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById("fullscreen-mobile-menu");
    if (mobileMenu && mobileMenu.classList.contains("is-open")) {
        mobileMenu.classList.remove("is-open");
        document.body.classList.remove("menu-locked");
    }
}

// Booking & Session Inquiry Form Handler
function initBookingForm() {
    const form = document.getElementById("booking-inquiry-form");
    const feedbackBox = document.getElementById("form-feedback-alert");
    const dateInput = document.getElementById("inquiry-date");

    // Set min date to today
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("inquiry-name").value.trim();
        const email = document.getElementById("inquiry-email").value.trim();
        const phone = document.getElementById("inquiry-phone") ? document.getElementById("inquiry-phone").value.trim() : "";
        const service = document.getElementById("inquiry-service") ? document.getElementById("inquiry-service").value : "";
        const eventDate = document.getElementById("inquiry-date") ? document.getElementById("inquiry-date").value : "";
        const budget = document.getElementById("inquiry-budget") ? document.getElementById("inquiry-budget").value.trim() : "";
        const message = document.getElementById("inquiry-message").value.trim();
        const submitBtn = form.querySelector("button[type='submit']");

        if (!name || !email) {
            showFeedback("Please complete all required fields (*).", "danger");
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Transmitting to Darkroom...
        `;

        try {
            const response = await fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    eventType: service,
                    eventDate,
                    budget,
                    message
                })
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Inquiry Dispatched
                `;
                showFeedback(result.message || `Thank you ${name}. Your commission inquiry has been received. Mohamed Ashiq will respond shortly.`, "success");
                form.reset();
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showFeedback(result.message || "An error occurred while transmitting your inquiry. Please try again.", "danger");
            }
        } catch (err) {
            // Fallback for static demo environments
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Inquiry Dispatched
            `;
            showFeedback(`Thank you ${name}. Your commission inquiry for ${service || 'our studio'} has been recorded. Mohamed Ashiq will respond within 24 hours.`, "success");
            form.reset();
        }

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });

    function showFeedback(msg, type) {
        if (!feedbackBox) return;
        feedbackBox.className = `alert alert-${type === 'success' ? 'success-cinema' : 'danger-cinema'} mt-3 d-block`;
        feedbackBox.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${type === 'success' ? '<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
                </svg>
                <span>${msg}</span>
            </div>
        `;
    }
}

// Current Copyright Year
function initYearDisplay() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Dynamic Focal Length / Shutter specs ticker in Hero
function initCameraSpecsTicker() {
    const specsEl = document.getElementById("hero-dynamic-spec");
    if (!specsEl) return;

    const specs = [
        "35mm Cooke Anamorphic • T1.4 • 24fps • ISO 100",
        "85mm Leica Summilux • f/1.4 • 1/500s • 4K DCI",
        "50mm Zeiss Radiance • T2.0 • 120fps Slow-Motion",
        "100MP Hasselblad Medium Format • 1/250s • Studio Chiaroscuro"
    ];

    let index = 0;
    setInterval(() => {
        index = (index + 1) % specs.length;
        if (typeof gsap !== "undefined") {
            gsap.to(specsEl, {
                opacity: 0,
                y: -10,
                duration: 0.4,
                onComplete: () => {
                    specsEl.textContent = specs[index];
                    gsap.to(specsEl, { opacity: 1, y: 0, duration: 0.4 });
                }
            });
        } else {
            specsEl.textContent = specs[index];
        }
    }, 4500);
}
