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
        this.initServicesStackAnimation();
        this.initGalleryParallax();
        this.initGalleryCardTilt();
        this.initStatsCounter();
    }

    initHeroState() {
        if (!this.hasGSAP) return;

        gsap.set(".main-header", { opacity: 0, y: -25 });
        gsap.set(".hero-pill-badge, .hero-title-main, .hero-lead-text, .hero-cta-row .btn-cinematic, .hero-metrics-bar .metric-item, .hero-scroll-indicator", {
            opacity: 0,
            y: 30
        });
        gsap.set(".hero-visual-container", {
            opacity: 0,
            scale: 0.92,
            y: 40
        });
        gsap.set(".hero-floating-badge", {
            opacity: 0,
            scale: 0.8
        });

        // Trigger entrance immediately on load with a smooth 100ms micro-delay
        setTimeout(() => {
            this.revealHeroContent();
        }, 100);
    }

    revealHeroContent() {
        if (this.heroRevealed) return;
        this.heroRevealed = true;

        if (!this.hasGSAP) {
            document.querySelectorAll(".main-header, .hero-pill-badge, .hero-title-main, .hero-lead-text, .hero-cta-row .btn-cinematic, .hero-metrics-bar .metric-item, .hero-scroll-indicator, .hero-visual-container, .hero-floating-badge").forEach(el => {
                el.style.opacity = "1";
                el.style.transform = "none";
            });
            return;
        }

        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
            .to(".main-header", {
                y: 0,
                opacity: 1,
                duration: 0.8
            }, 0)
            .to(".hero-visual-container", {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }, 0.1)
            .to(".hero-floating-badge", {
                scale: 1,
                opacity: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, 0.4)
            .to(".hero-pill-badge", {
                y: 0,
                opacity: 1,
                duration: 0.8
            }, 0.1)
            .to(".hero-title-main", {
                y: 0,
                opacity: 1,
                duration: 0.9
            }, 0.2)
            .to(".hero-lead-text", {
                y: 0,
                opacity: 1,
                duration: 0.85
            }, 0.3)
            .to(".hero-cta-row .btn-cinematic", {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.75
            }, 0.4)
            .to(".hero-metrics-bar .metric-item", {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.75
            }, 0.5)
            .to(".hero-scroll-indicator", {
                opacity: 1,
                y: 0,
                duration: 0.7
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
                    ease: "power3.out",
                    clearProps: "transform"
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

    // Stacked Cards Cinematic Scroll Animation for Services
    initServicesStackAnimation() {
        if (!this.hasGSAP || !this.hasScrollTrigger) return;

        const stackContainer = document.getElementById("services-stack-container");
        if (!stackContainer) return;

        const stackCards = gsap.utils.toArray(".service-stack-card");
        if (!stackCards.length) return;

        // Entrance stagger reveal for all cards as the section reaches viewport
        gsap.from(stackCards, {
            scrollTrigger: {
                trigger: stackContainer,
                start: "top 85%",
                once: true
            },
            y: 45,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "y,opacity"
        });

        // Dynamic depth stacking effect as user scrolls each card
        stackCards.forEach((card, i) => {
            if (i < stackCards.length - 1) {
                const nextCard = stackCards[i + 1];

                ScrollTrigger.create({
                    trigger: nextCard,
                    start: "top 75%",
                    end: "top 25%",
                    scrub: 0.4,
                    onUpdate: (self) => {
                        const p = self.progress;
                        // Progressive subtle scale-down and depth dimming
                        const scale = 1 - p * 0.045;
                        const brightness = 1 - p * 0.28;
                        const opacity = 1 - p * 0.08;

                        gsap.set(card, {
                            scale: scale,
                            filter: `brightness(${brightness})`,
                            opacity: opacity,
                            transformOrigin: "center top"
                        });
                    }
                });
            }
        });

        // Interactive hover responsiveness on stacked cards
        stackCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    scale: 1.015,
                    filter: "brightness(1.06)",
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener("mouseleave", () => {
                ScrollTrigger.refresh();
            });
        });
    }

    // People Editorial Section Scroll Reveal
    initGalleryParallax() {
        if (!this.hasGSAP || !this.hasScrollTrigger) return;

        const section = document.querySelector(".people-gallery-section");
        const leftPanel = document.querySelector(".people-left-panel");
        const rightCollage = document.querySelector(".people-right-collage");

        if (!section || !leftPanel || !rightCollage) return;

        gsap.from(leftPanel.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            },
            y: 35,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out"
        });

        gsap.from(rightCollage, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            },
            scale: 0.96,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out"
        });
    }

    initGalleryCardTilt() {
        // GPU keyframes drive the continuous vertical flow
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
