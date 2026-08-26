/**
 * MOHAMED ASHIQ CM — Gallery & Interactive Elements Controller
 * Handles clean rendering of Featured Films, Services, Still Gallery, Testimonials & Modals
 */

class GalleryManager {
    constructor() {
        this.data = window.PORTFOLIO_DATA || {};
        this.currentFilter = "all";
        this.currentLightboxIndex = 0;
        this.activePhotoList = [];

        this.init();
    }

    init() {
        this.bindFilmCardEvents();
        this.renderGalleryCategories();
        this.renderPhotographyGrid("all");
        this.renderTestimonials();

        this.bindLightboxEvents();
        this.bindVideoModalEvents();
    }

    // Attach click listeners to all film cards
    bindFilmCardEvents() {
        const container = document.getElementById("featured-works-grid");
        if (!container) return;

        // If container has no cards rendered from Django, render fallback from data.js
        if (container.children.length === 0 && this.data.featuredProjects) {
            container.innerHTML = this.data.featuredProjects.map((proj) => `
                <div class="col-12 col-lg-6 mb-4">
                    <article class="film-card-luxury" data-video-url="${proj.videoTeaser}" data-video-title="${proj.title}" data-cursor="play">
                        <div class="film-thumb-wrap">
                            <img src="${proj.coverImage}" alt="${proj.title}" class="film-thumb-img" loading="lazy">
                            <div class="film-gradient-overlay"></div>
                            <div class="film-play-badge">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                            </div>
                        </div>
                        <div class="film-card-info">
                            <div class="film-card-tags">
                                <span>${proj.category}</span>
                                <span>•</span>
                                <span>${proj.location}</span>
                                <span>•</span>
                                <span>${proj.year}</span>
                            </div>
                            <h3 class="film-card-title">${proj.title}</h3>
                            <p class="film-card-desc">${proj.overview || proj.subtitle}</p>
                        </div>
                    </article>
                </div>
            `).join("");
        }

        container.querySelectorAll(".film-card-luxury").forEach(card => {
            card.addEventListener("click", () => {
                const videoUrl = card.getAttribute("data-video-url");
                const videoTitle = card.getAttribute("data-video-title") || "Cinematic Film";
                if (videoUrl) {
                    this.openVideoModal(videoUrl, videoTitle);
                }
            });
        });
    }

    // Render Filter Pills for Still Photography
    renderGalleryCategories() {
        const container = document.getElementById("gallery-filter-bar");
        if (!container || !this.data.galleryCategories) return;

        container.innerHTML = this.data.galleryCategories.map((cat, idx) => `
            <button class="filter-pill ${idx === 0 ? 'is-active' : ''}" data-category="${cat.id}">
                ${cat.label}
            </button>
        `).join("");

        container.querySelectorAll(".filter-pill").forEach(btn => {
            btn.addEventListener("click", () => {
                container.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");
                const cat = btn.getAttribute("data-category");
                this.currentFilter = cat;
                this.renderPhotographyGrid(cat);
            });
        });
    }

    // Render Photography Masonry Grid
    renderPhotographyGrid(filterCategory = "all") {
        const container = document.getElementById("photography-masonry-grid");
        if (!container || !this.data.photographyItems) return;

        const filtered = filterCategory === "all"
            ? this.data.photographyItems
            : this.data.photographyItems.filter(item => item.category === filterCategory);

        this.activePhotoList = filtered;

        container.innerHTML = filtered.map((item, index) => {
            const aspectClass = item.aspectRatio === "portrait" ? "aspect-tall" : "";
            return `
                <div class="col-12 col-md-6 col-lg-4 mb-4 gallery-col">
                    <figure class="gallery-photo-card" data-photo-index="${index}" data-cursor="zoom">
                        <div class="gallery-img-box ${aspectClass}">
                            <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy">
                            <div class="gallery-overlay">
                                <h4 class="gallery-overlay-title">${item.title}</h4>
                                <span class="gallery-overlay-spec">${item.location} • ${item.lens}</span>
                            </div>
                        </div>
                    </figure>
                </div>
            `;
        }).join("");

        container.querySelectorAll(".gallery-photo-card").forEach(card => {
            card.addEventListener("click", () => {
                const idx = parseInt(card.getAttribute("data-photo-index"), 10);
                this.openLightbox(idx);
            });
        });
    }

    // Render Testimonials with Swiper
    renderTestimonials() {
        const container = document.getElementById("testimonials-slider-wrapper");
        if (!container || !this.data.testimonials) return;

        container.innerHTML = this.data.testimonials.map(test => `
            <div class="swiper-slide">
                <div class="p-4 rounded-4 h-100" style="background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div class="mb-3" style="color: var(--accent-gold); font-size: 0.9rem;">★★★★★</div>
                        <p class="text-light mb-4" style="font-size: 1rem; line-height: 1.7; font-style: italic;">"${test.quote}"</p>
                    </div>
                    <div class="d-flex align-items-center gap-3 pt-3" style="border-top: 1px solid var(--border-subtle);">
                        <img src="${test.avatar}" alt="${test.clientName}" class="rounded-circle" style="width: 44px; height: 44px; object-fit: cover; border: 2px solid var(--accent-gold);">
                        <div>
                            <strong class="d-block text-white" style="font-size: 0.95rem;">${test.clientName}</strong>
                            <span class="small text-muted font-monospace">${test.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");

        if (typeof Swiper !== "undefined" && document.querySelector(".testimonials-swiper")) {
            new Swiper(".testimonials-swiper", {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 }
                },
                pagination: {
                    el: ".testimonial-pagination",
                    clickable: true
                }
            });
        }
    }

    // Video Theater Modal
    bindVideoModalEvents() {
        const modal = document.getElementById("cinematic-video-modal");
        const closeBtn = document.getElementById("video-modal-close-btn");
        const player = document.getElementById("video-modal-player");
        const backdrop = modal ? modal.querySelector(".modal-backdrop-cinematic") : null;

        const closeModal = () => {
            if (!modal) return;
            modal.classList.remove("is-active");
            if (player) {
                player.pause();
                player.src = "";
            }
        };

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (backdrop) backdrop.addEventListener("click", closeModal);

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal && modal.classList.contains("is-active")) {
                closeModal();
            }
        });
    }

    openVideoModal(videoUrl, title = "Cinematic Showreel") {
        const modal = document.getElementById("cinematic-video-modal");
        const titleEl = document.getElementById("video-modal-title");
        const player = document.getElementById("video-modal-player");

        if (!modal || !player) return;

        if (titleEl) titleEl.textContent = title;
        player.src = videoUrl;
        modal.classList.add("is-active");
        player.play().catch(() => {});
    }

    // Lightbox Modal
    bindLightboxEvents() {
        const modal = document.getElementById("cinematic-lightbox-modal");
        const closeBtn = document.getElementById("lightbox-close-btn");
        const prevBtn = document.getElementById("lightbox-prev-btn");
        const nextBtn = document.getElementById("lightbox-next-btn");
        const backdrop = modal ? modal.querySelector(".lightbox-backdrop") : null;

        const closeModal = () => {
            if (modal) modal.classList.remove("is-active");
        };

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (backdrop) backdrop.addEventListener("click", closeModal);

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.activePhotoList.length) % this.activePhotoList.length;
                this.updateLightboxContent();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.activePhotoList.length;
                this.updateLightboxContent();
            });
        }

        window.addEventListener("keydown", (e) => {
            if (!modal || !modal.classList.contains("is-active")) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
            if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
        });
    }

    openLightbox(index) {
        const modal = document.getElementById("cinematic-lightbox-modal");
        if (!modal || !this.activePhotoList.length) return;

        this.currentLightboxIndex = index;
        this.updateLightboxContent();
        modal.classList.add("is-active");
    }

    updateLightboxContent() {
        const img = document.getElementById("lightbox-image");
        const title = document.getElementById("lightbox-title");
        const meta = document.getElementById("lightbox-meta");
        const counter = document.getElementById("lightbox-counter");

        const item = this.activePhotoList[this.currentLightboxIndex];
        if (!item) return;

        if (img) img.src = item.image;
        if (title) title.textContent = item.title;
        if (meta) meta.textContent = `${item.location} • ${item.lens}`;
        if (counter) counter.textContent = `${this.currentLightboxIndex + 1} / ${this.activePhotoList.length}`;
    }
}

// Auto-initialize when ready
document.addEventListener("DOMContentLoaded", () => {
    window.galleryManager = new GalleryManager();
});
