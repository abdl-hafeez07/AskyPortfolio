/**
 * MOHAMED ASHIQ CM — Cinematic Hero Synchronization & Scroll Motion
 * Seamlessly coordinates the 3D DSLR Lens Emergence into the Live Hero Section
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

    initCardSpotlightHover() {
        const cards = document.querySelectorAll(".film-card-luxury, .service-clean-card, .contact-glass-panel");

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
document.addEventListener("DOMContentLoaded", () => {
    window.cinematicAnim = new CinematicAnimations();
});
