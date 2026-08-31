/**
 * MOHAMED ASHIQ CM — Cinematic Subtle Custom Cursor
 * Enhances desktop interaction with fluid trailing and micro-states without lag.
 */

class CinematicCursor {
    constructor() {
        this.cursor = document.querySelector(".custom-cursor");
        this.cursorDot = document.querySelector(".custom-cursor-dot");
        this.cursorText = document.querySelector(".custom-cursor-text");

        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.speed = 0.2;
        this.active = false;
        this.isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 992;

        if (this.isTouch || !this.cursor || !this.cursorDot) {
            if (this.cursor) this.cursor.style.display = "none";
            if (this.cursorDot) this.cursorDot.style.display = "none";
            return;
        }

        this.init();
    }

    init() {
        window.addEventListener("mousemove", (e) => {
            if (!this.active) {
                this.active = true;
                this.cursor.classList.add("is-active");
                this.cursorDot.classList.add("is-active");
            }
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Instantly update dot without lag
            this.cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, { passive: true });

        document.addEventListener("mouseleave", () => {
            if (this.cursor) this.cursor.classList.remove("is-active");
            if (this.cursorDot) this.cursorDot.classList.remove("is-active");
        });

        document.addEventListener("mouseenter", () => {
            if (this.active) {
                if (this.cursor) this.cursor.classList.add("is-active");
                if (this.cursorDot) this.cursorDot.classList.add("is-active");
            }
        });

        this.bindHoverElements();
        this.renderLoop();
    }

    bindHoverElements() {
        document.addEventListener("mouseover", (e) => {
            const target = e.target.closest("[data-cursor]");
            if (target) {
                const cursorType = target.getAttribute("data-cursor");
                this.setCursorState(cursorType, target.getAttribute("data-cursor-text"));
            }
        });

        document.addEventListener("mouseout", (e) => {
            const target = e.target.closest("[data-cursor]");
            if (target) {
                const nextTarget = e.relatedTarget ? e.relatedTarget.closest("[data-cursor]") : null;
                if (!nextTarget) {
                    this.resetCursorState();
                } else if (nextTarget !== target) {
                    const cursorType = nextTarget.getAttribute("data-cursor");
                    this.setCursorState(cursorType, nextTarget.getAttribute("data-cursor-text"));
                }
            }
        });

        document.addEventListener("mousedown", () => {
            if (this.cursor) this.cursor.classList.add("is-clicking");
        });

        document.addEventListener("mouseup", () => {
            if (this.cursor) this.cursor.classList.remove("is-clicking");
        });
    }

    setCursorState(type, customText) {
        if (!this.cursor) return;
        this.cursor.className = `custom-cursor is-active is-${type}`;
        if (this.cursorText) {
            let label = customText || "";
            if (!label) {
                switch (type) {
                    case "view": label = "VIEW"; break;
                    case "play": label = "PLAY"; break;
                    case "zoom": label = "ZOOM"; break;
                    default: label = "";
                }
            }
            this.cursorText.textContent = label;
        }
    }

    resetCursorState() {
        if (!this.cursor) return;
        this.cursor.className = "custom-cursor is-active";
        if (this.cursorText) {
            this.cursorText.textContent = "";
        }
    }

    renderLoop() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        if (this.cursor) {
            this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
        }

        requestAnimationFrame(() => this.renderLoop());
    }
}

// Auto-initialize
window.addEventListener("DOMContentLoaded", () => {
    window.cinematicCursorInstance = new CinematicCursor();
});
