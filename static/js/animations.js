/**
 * MOHAMED ASHIQ CM — Cinematic Hero Synchronization & Scroll Motion
 * Seamlessly coordinates the 3D DSLR Lens Emergence, Parallax Split-Screen Gallery, and 3D Card Dynamics
 */

class CinematicAnimations {
    constructor() {
        this.hasGSAP = typeof gsap !== "undefined";
        this.hasScrollTrigger = typeof ScrollTrigger !== "undefined";

        if (this.hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.heroRevealed = false;
        this.initHeroState();
        this.initCardSpotlightHover();
        this.initMagneticButtons();
        this.initScrollAnimations();
        this.initGalleryParallax();
        this.initGalleryCardTilt();
        this.initStatsCounter();
    }

    initHeroState() {
        if (!this.hasGSAP) return;

        // Keep pure black & clean during the centered DSLR sequence
        gsap.set(".main-header", {
            opacity: 0,
            y: -20
        });

        gsap.set(".hero-pill-badge, .hero-title-main, .hero-lead-text, .hero-cta-row .btn-cinematic, .hero-metrics-bar .metric-item, .hero-scroll-indicator", {
            opacity: 0,
            y: 35
        });

        // Fallback safety: If 3D scene takes more than 4.5s or WebGL is disabled, auto reveal
        setTimeout(() => {
            if (!this.heroRevealed) {
                this.revealHeroContent();
            }
        }, 4500);
    }

    revealHeroContent() {
        if (this.heroRevealed) return;
        this.heroRevealed = true;

        if (!this.hasGSAP) {
            document.querySelectorAll(".main-header, .hero-pill-badge, .hero-title-main, .hero-lead-text, .hero-cta-row .btn-cinematic, .hero-metrics-bar .metric-item, .hero-scroll-indicator").forEach(el => {
                el.style.opacity = "1";
                el.style.transform = "none";
            });
            return;
        }

        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        heroTl
            .to(".main-header", {
                y: 0,
                opacity: 1,
                duration: 0.9
            }, 0)
            .to(".hero-pill-badge", {
                y: 0,
                opacity: 1,
                duration: 0.9
            }, 0.1)
            .to(".hero-title-main", {
                y: 0,
                opacity: 1,
                duration: 1.1
            }, 0.2)
            .to(".hero-lead-text", {
                y: 0,
                opacity: 1,
                duration: 1.0
            }, 0.3)
            .to(".hero-cta-row .btn-cinematic", {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 0.8
            }, 0.4)
            .to(".hero-metrics-bar .metric-item", {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8
            }, 0.5)
            .to(".hero-scroll-indicator", {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, 0.6);
    }

    initScrollAnimations() {
        if (!this.hasScrollTrigger) return;

        // Navbar glass blur on scroll
        ScrollTrigger.create({
            start: "top -50",
            end: 99999,
            toggleClass: {
                className: "nav-scrolled",
                targets: ".main-header"
            }
        });

        // Clean Section Headers Reveal
        gsap.utils.toArray(".section-header-clean").forEach((header) => {
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 35,
                opacity: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: "power3.out"
            });
        });

        // Film Cards Stagger Reveal
        ScrollTrigger.batch(".film-card-luxury", {
            start: "top 88%",
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 40,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.9,
                    ease: "power3.out"
                });
            },
            once: true
        });

        // Service Cards Stagger Reveal
        ScrollTrigger.batch(".service-clean-card", {
            start: "top 88%",
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 35,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.9,
                    ease: "power3.out"
                });
            },
            once: true
        });

        // Focus Pillars Stagger Reveal
        ScrollTrigger.batch(".focus-pillar-card", {
            start: "top 90%",
            onEnter: (batch) => {
                gsap.from(batch, {
                    x: -25,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                });
            },
            once: true
        });

        // Timeline Nodes Stagger Reveal
        ScrollTrigger.batch(".timeline-node", {
            start: "top 90%",
            onEnter: (batch) => {
                gsap.from(batch, {
                    x: 30,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out"
                });
            },
            once: true
        });
    }

    // Split-Screen Multi-Column Parallax ScrollTrigger
    initGalleryParallax() {
        if (!this.hasGSAP || !this.hasScrollTrigger) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const col1 = document.getElementById("gallery-stream-col-1");
            const col2 = document.getElementById("gallery-stream-col-2");
            const section = document.querySelector(".gallery-split-section");

            if (!col1 || !col2 || !section) return;

            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2
                }
            })
            .to(col1, {
                y: -60,
                ease: "none"
            }, 0)
            .to(col2, {
                y: -180,
                ease: "none"
            }, 0);

            // Subtle 3D perspective shift on cards as they traverse viewport
            gsap.utils.toArray(".gallery-frame-card").forEach((card) => {
                gsap.fromTo(card,
                    {
                        scale: 0.97,
                        opacity: 0.85
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "top 60%",
                            scrub: 0.8
                        }
                    }
                );
            });
        });
    }

    // 3D Cinematic Card Tilt & Spotlight
    initGalleryCardTilt() {
        const attachTilt = () => {
            const cards = document.querySelectorAll(".gallery-frame-card");

            cards.forEach(card => {
                if (card.getAttribute("data-tilt-bound")) return;
                card.setAttribute("data-tilt-bound", "true");

                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;

                    // Subtle 3D rotation
                    const rotX = -deltaY * 5; // max 5 deg
                    const rotY = deltaX * 5;

                    if (this.hasGSAP) {
                        gsap.to(card, {
                            rotateX: rotX,
                            rotateY: rotY,
                            transformPerspective: 900,
                            duration: 0.35,
                            ease: "power2.out"
                        });
                    }
                });

                card.addEventListener("mouseleave", () => {
                    if (this.hasGSAP) {
                        gsap.to(card, {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.6,
                            ease: "power3.out"
                        });
                    }
                });
            });
        };

        attachTilt();

        // Re-attach whenever category changes / cards re-render
        const categoryNav = document.getElementById("gallery-category-nav");
        if (categoryNav) {
            categoryNav.addEventListener("click", () => {
                setTimeout(attachTilt, 260);
            });
        }
    }

    initCardSpotlightHover() {
        const cards = document.querySelectorAll(".film-card-luxury, .service-clean-card, .contact-glass-panel, .gallery-sticky-sidebar");

        cards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });
    }

    initMagneticButtons() {
        const magneticBtns = document.querySelectorAll(".btn-cinematic, .direct-quick-link");

        magneticBtns.forEach((btn) => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.4)"
                });
            });
        });
    }

    initStatsCounter() {
        const numbers = document.querySelectorAll(".stat-number-val");
        if (!numbers.length) return;

        numbers.forEach((num) => {
            const target = parseInt(num.getAttribute("data-target"), 10);
            if (isNaN(target)) return;

            if (this.hasScrollTrigger) {
                ScrollTrigger.create({
                    trigger: num,
                    start: "top 90%",
                    onEnter: () => {
                        const obj = { val: 0 };
                        gsap.to(obj, {
                            val: target,
                            duration: 2.0,
                            ease: "power2.out",
                            onUpdate: () => {
                                num.textContent = Math.floor(obj.val);
                            }
                        });
                    },
                    once: true
                });
            } else {
                num.textContent = target;
            }
        });
    }
}

// Auto initialize on DOM ready
function initCinematicAnim() {
    if (!window.cinematicAnim) {
        window.cinematicAnim = new CinematicAnimations();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCinematicAnim);
} else {
    initCinematicAnim();
}
