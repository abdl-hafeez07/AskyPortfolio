/**
 * MOHAMED ASHIQ CM (ASKY) — Cinematic Viewfinder Intro & 3D Hero Controller
 * Features:
 * 1. Viewfinder Camera HUD Calibration & Optical Focus Pull on IMG_1013.JPG
 * 2. Anamorphic Flare Shimmer & Optical Flash Reveal
 * 3. Interactive 3D Perspective Tilt with Multi-Layer Parallax Badges
 */

class CinematicLoaderEngine {
    constructor() {
        this.stage = document.getElementById("cinematic-loader-stage");
        if (!this.stage) return;

        this.rig = document.getElementById("loader-viewfinder-rig");
        this.irisImg = document.getElementById("loader-iris-image");
        this.progressBar = document.getElementById("loader-focus-progress");
        this.flash = document.getElementById("loader-flash-transition");
        this.flare = document.querySelector(".loader-lens-anamorphic-flare");

        this.isComplete = false;
        this.init();
    }

    init() {
        // Lock body scrolling during the quick cinematic intro
        document.body.style.overflow = "hidden";

        // Safety fallback timer to guarantee page is never blocked
        this.safetyTimer = setTimeout(() => {
            if (!this.isComplete) {
                this.completeLoader();
            }
        }, 3200);

        // Click to skip support
        this.stage.addEventListener("click", () => {
            this.completeLoader();
        });

        // Run GSAP sequence
        this.runIntroSequence();
    }

    runIntroSequence() {
        if (typeof gsap === "undefined") {
            setTimeout(() => this.completeLoader(), 1200);
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
                this.completeLoader();
            }
        });

        // Stage 1: Fade-in HUD & soft focus (0.0s - 0.5s)
        gsap.set(this.rig, { opacity: 0, scale: 0.94, y: 15 });
        gsap.set(this.irisImg, { filter: "blur(8px) brightness(0.8)", scale: 1.15 });

        tl.to(this.rig, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, 0)
        .to(this.progressBar, {
            width: "100%",
            duration: 1.4,
            ease: "power2.inOut"
        }, 0.1)

        // Stage 2: Optical Snap & Focus Pull on IMG_1013.JPG (0.5s - 1.4s)
        .to(this.irisImg, {
            filter: "blur(0px) brightness(1.05)",
            scale: 1.02,
            duration: 0.9,
            ease: "power3.out"
        }, 0.5)
        .to(this.flare, {
            left: "100%",
            duration: 0.8,
            ease: "power2.inOut"
        }, 0.6)

        // Stage 3: Smooth Flash Emergence into Hero (1.4s - 1.9s)
        .to(this.flash, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.in"
        }, 1.3)
        .to(this.stage, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, 1.6);
    }

    completeLoader() {
        if (this.isComplete) return;
        this.isComplete = true;

        if (this.safetyTimer) clearTimeout(this.safetyTimer);

        document.body.style.overflow = "";
        document.body.style.pointerEvents = "auto";

        if (this.stage) {
            this.stage.classList.add("is-complete");
            setTimeout(() => {
                if (this.stage) this.stage.style.display = "none";
            }, 600);
        }

        // Trigger smooth Hero entrance
        if (window.cinematicAnim && typeof window.cinematicAnim.revealHeroContent === "function") {
            window.cinematicAnim.revealHeroContent();
        }
    }
}

class HeroArtworkController {
    constructor() {
        this.heroCard = document.getElementById("hero-visual-card");
        this.heroShowcase = document.getElementById("hero-visual-showcase");
        this.floatingBadges = document.querySelectorAll(".hero-floating-badge");
        this.lensGlint = document.querySelector(".hero-lens-flare-glint");

        if (!this.heroCard) return;

        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.isHovered = false;
        this.rafId = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderLoop = this.renderLoop.bind(this);
        this.rafId = requestAnimationFrame(this.renderLoop);
    }

    bindEvents() {
        window.addEventListener("mousemove", (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            this.mouse.targetX = (e.clientX - centerX) / centerX; // -1 to 1
            this.mouse.targetY = (e.clientY - centerY) / centerY; // -1 to 1
        }, { passive: true });

        if (this.heroShowcase) {
            this.heroShowcase.addEventListener("mouseenter", () => {
                this.isHovered = true;
            });
            this.heroShowcase.addEventListener("mouseleave", () => {
                this.isHovered = false;
            });
        }
    }

    renderLoop() {
        // Smooth dampening
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.07;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.07;

        if (this.heroCard) {
            const rotY = this.mouse.x * (this.isHovered ? 12 : 7);
            const rotX = -this.mouse.y * (this.isHovered ? 12 : 7);
            const transZ = this.isHovered ? 20 : 0;

            this.heroCard.style.transform = `perspective(1000px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateZ(${transZ}px)`;
        }

        // Parallax offset on floating badges
        if (this.floatingBadges && this.floatingBadges.length > 0) {
            const badgeShiftX = this.mouse.x * 15;
            const badgeShiftY = this.mouse.y * 12;
            this.floatingBadges.forEach((badge, idx) => {
                const mult = idx === 0 ? 1 : -0.8;
                badge.style.transform = `translate3d(${badgeShiftX * mult}px, ${badgeShiftY * mult}px, 30px)`;
            });
        }

        // Parallax on lens flare glint
        if (this.lensGlint) {
            const glintX = this.mouse.x * 18;
            const glintY = this.mouse.y * 14;
            this.lensGlint.style.transform = `translate(calc(-50% + ${glintX}px), calc(-50% + ${glintY}px)) scale(${this.isHovered ? 1.25 : 1.0})`;
        }

        this.rafId = requestAnimationFrame(this.renderLoop);
    }
}

// Auto-initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cinematic-loader-stage")) {
        window.cinematicLoaderInstance = new CinematicLoaderEngine();
    }
    window.heroArtworkInstance = new HeroArtworkController();
});
