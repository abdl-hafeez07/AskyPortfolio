/**
 * MOHAMED ASHIQ CM — Cinematic Subtle Custom Cursor
 * Enhances desktop interaction with fluid trailing and magnetic pull without disabling native pointers.
 */

class CinematicCursor {
    constructor() {
        this.cursor = document.querySelector(".custom-cursor");
        this.cursorDot = document.querySelector(".custom-cursor-dot");
        this.cursorText = document.querySelector(".custom-cursor-text");

        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.speed = 0.18;
        this.isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 992;
        this.active = false;
        this.magneticTarget = null;

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

            this.cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, { passive: true });

        document.addEventListener("mouseleave", () => {
            this.cursor.classList.remove("is-active");
            this.cursorDot.classList.remove("is-active");
        });

        document.addEventListener("mouseenter", () => {
            this.cursor.classList.add("is-active");
            this.cursorDot.classList.add("is-active");
        });

        this.bindHoverElements();
        this.renderLoop();
    }

    bindHoverElements() {
        document.addEventListener("mouseover", (e) => {
            const target = e.target.closest("[data-cursor]");
            const magneticEl = e.target.closest("[data-magnetic]");

            if (target) {
                const cursorType = target.getAttribute("data-cursor");
                this.setCursorState(cursorType, target.getAttribute("data-cursor-text"));
            }

            if (magneticEl) {
                this.magneticTarget = magneticEl;
            }
        });

        document.addEventListener("mouseout", (e) => {
            const target = e.target.closest("[data-cursor]");
            const magneticEl = e.target.closest("[data-magnetic]");

            if (target) {
                this.resetCursorState();
            }

            if (magneticEl && this.magneticTarget === magneticEl) {
                this.magneticTarget.style.transform = "translate3d(0, 0, 0)";
                this.magneticTarget = null;
            }
        });

        document.addEventListener("mousedown", () => {
            this.cursor.classList.add("is-clicking");
        });

        document.addEventListener("mouseup", () => {
            this.cursor.classList.remove("is-clicking");
        });
    }

    setCursorState(type, customText) {
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
        this.cursor.className = "custom-cursor is-active";
        if (this.cursorText) {
            this.cursorText.textContent = "";
        }
    }

    renderLoop() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

        if (this.magneticTarget) {
            const rect = this.magneticTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (this.mouse.x - centerX) * 0.25;
            const deltaY = (this.mouse.y - centerY) * 0.25;
            this.magneticTarget.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        }

        requestAnimationFrame(() => this.renderLoop());
    }
}

// Auto-initialize
window.addEventListener("DOMContentLoaded", () => {
    window.cinematicCursorInstance = new CinematicCursor();
});
