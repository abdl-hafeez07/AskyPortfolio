/**
 * MOHAMED ASHIQ CM — Cinematic Hero Synchronization & Scroll Motion
 * Seamlessly coordinates the 3D DSLR Lens Emergence, Parallax Split-Screen Gallery, and 3D Card Dynamics
 */

class CinematicAnimations {
    constructor() {
        this.hasGSAP = typeof gsap !== "undefined";
        this.hasScrollTrigger = typeof ScrollTrigger !== "undefined";

        if (this.hasGSAP && this.hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.heroRevealed = false;
        this.initHeroState();
        this.initCardSpotlightHover();
        this.initMagneticButtons();
        this.initScrollAnimations();
        this.initServicesStackAnimation();
        this.initGalleryParallax();
        this.initStatsCounter();
    }

    initHeroState() {
        if (!this.hasGSAP) return;

        const heroSection = document.querySelector(".hero-section");
        if (!heroSection) return;

        const mainHeader = document.querySelector(".main-header");
        if (mainHeader) {
            gsap.set(mainHeader, { opacity: 0, y: -20 });
        }

        const heroAnimElements = document.querySelectorAll(".hero-pill-badge, .hero-title-main, .hero-lead-text, .hero-cta-row .btn-cinematic, .hero-metrics-bar .metric-item, .hero-scroll-indicator");
        if (heroAnimElements.length) {
            gsap.set(heroAnimElements, { opacity: 0, y: 25 });
        }

        const heroVisual = document.querySelector(".hero-visual-container");
        if (heroVisual) {
            gsap.set(heroVisual, { opacity: 0, scale: 0.95, y: 30 });
        }

        const heroBadges = document.querySelectorAll(".hero-floating-badge");
        if (heroBadges.length) {
            gsap.set(heroBadges, { opacity: 0, scale: 0.85 });
        }

        // Safety reveal timer
        setTimeout(() => {
            if (!this.heroRevealed) {
                this.revealHeroContent();
            }
        }, 2200);

        // If no loader stage exists, reveal immediately
        const loaderStage = document.getElementById("cinematic-loader-stage");
        if (!loaderStage) {
            setTimeout(() => {
                this.revealHeroContent();
            }, 80);
        }
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

        const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
                if (typeof ScrollTrigger !== "undefined") {
                    ScrollTrigger.refresh();
                }
            }
        });

        const mainHeader = document.querySelector(".main-header");
        if (mainHeader) {
            heroTl.to(mainHeader, { y: 0, opacity: 1, duration: 0.7, clearProps: "transform,opacity" }, 0);
        }

        const heroVisual = document.querySelector(".hero-visual-container");
        if (heroVisual) {
            heroTl.to(heroVisual, { y: 0, scale: 1, opacity: 1, duration: 0.9, clearProps: "opacity" }, 0.1);
        }

        const heroBadges = document.querySelectorAll(".hero-floating-badge");
        if (heroBadges.length) {
            heroTl.to(heroBadges, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.5)", clearProps: "opacity" }, 0.3);
        }

        const pillBadge = document.querySelector(".hero-pill-badge");
        if (pillBadge) {
            heroTl.to(pillBadge, { y: 0, opacity: 1, duration: 0.6, clearProps: "all" }, 0.1);
        }

        const heroTitle = document.querySelector(".hero-title-main");
        if (heroTitle) {
            heroTl.to(heroTitle, { y: 0, opacity: 1, duration: 0.7, clearProps: "all" }, 0.2);
        }

        const heroLead = document.querySelector(".hero-lead-text");
        if (heroLead) {
            heroTl.to(heroLead, { y: 0, opacity: 1, duration: 0.65, clearProps: "all" }, 0.28);
        }

        const ctaBtns = document.querySelectorAll(".hero-cta-row .btn-cinematic");
        if (ctaBtns.length) {
            heroTl.to(ctaBtns, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, clearProps: "opacity" }, 0.34);
        }

        const metrics = document.querySelectorAll(".hero-metrics-bar .metric-item");
        if (metrics.length) {
            heroTl.to(metrics, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, clearProps: "all" }, 0.4);
        }

        const scrollIndicator = document.querySelector(".hero-scroll-indicator");
        if (scrollIndicator) {
            heroTl.to(scrollIndicator, { opacity: 1, y: 0, duration: 0.5, clearProps: "opacity" }, 0.5);
        }
    }

    initScrollAnimations() {
        if (!this.hasScrollTrigger) return;

        // Navbar glass blur on scroll
        const header = document.querySelector(".main-header");
        if (header) {
            ScrollTrigger.create({
                start: "top -40",
                end: 99999,
                toggleClass: {
                    className: "nav-scrolled",
                    targets: header
                }
            });
        }

        // Clean Section Headers Reveal
        const headers = gsap.utils.toArray(".section-header-clean, .section-tag-pill, .section-title-large");
        if (headers.length) {
            headers.forEach((hdr) => {
                gsap.from(hdr, {
                    scrollTrigger: {
                        trigger: hdr,
                        start: "top 92%",
                        once: true
                    },
                    y: 24,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    clearProps: "all"
                });
            });
        }

        // About section focus cards
        const focusCards = document.querySelectorAll(".focus-pillar-card");
        if (focusCards.length) {
            gsap.from(focusCards, {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 85%",
                    once: true
                },
                y: 25,
                opacity: 0,
                stagger: 0.1,
                duration: 0.65,
                ease: "power2.out",
                clearProps: "all"
            });
        }

        // Film Cards Stagger Reveal
        const filmCards = document.querySelectorAll(".film-card-luxury");
        if (filmCards.length) {
            gsap.from(filmCards, {
                scrollTrigger: {
                    trigger: "#featured-works-grid",
                    start: "top 90%",
                    once: true
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: "power2.out",
                clearProps: "all"
            });
        }
    }

    // Stacked Cards Cinematic Scroll Animation for Services
    initServicesStackAnimation() {
        if (!this.hasGSAP || !this.hasScrollTrigger) return;

        const stackContainer = document.getElementById("services-stack-container");
        if (!stackContainer) return;

        const stackCards = gsap.utils.toArray(".service-stack-card");
        if (!stackCards.length) return;

        // Entrance reveal
        gsap.from(stackCards, {
            scrollTrigger: {
                trigger: stackContainer,
                start: "top 88%",
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all"
        });

        // Dynamic depth stacking effect
        stackCards.forEach((card, i) => {
            if (i < stackCards.length - 1) {
                const nextCard = stackCards[i + 1];

                ScrollTrigger.create({
                    trigger: nextCard,
                    start: "top 75%",
                    end: "top 25%",
                    scrub: 0.3,
                    onUpdate: (self) => {
                        const p = self.progress;
                        const scale = 1 - p * 0.035;
                        const brightness = 1 - p * 0.22;
                        const opacity = 1 - p * 0.06;

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
    }

    // People Editorial Section Scroll Reveal
    initGalleryParallax() {
        if (!this.hasGSAP || !this.hasScrollTrigger) return;

        const section = document.querySelector(".people-gallery-section");
        const leftPanel = document.querySelector(".people-left-panel");
        const rightCollage = document.querySelector(".people-right-collage");

        if (!section || !leftPanel || !rightCollage) return;

        gsap.from([leftPanel, rightCollage], {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true
            },
            y: 25,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
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
            }, { passive: true });
        });
    }

    initMagneticButtons() {
        if (!this.hasGSAP) return;
        const magneticBtns = document.querySelectorAll(".btn-cinematic, .direct-quick-link");

        magneticBtns.forEach((btn) => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.18,
                    y: y * 0.18,
                    duration: 0.25,
                    ease: "power2.out"
                });
            }, { passive: true });

            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
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
                    start: "top 92%",
                    onEnter: () => {
                        const obj = { val: 0 };
                        gsap.to(obj, {
                            val: target,
                            duration: 1.6,
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
