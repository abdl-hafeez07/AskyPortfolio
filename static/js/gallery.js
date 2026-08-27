/**
 * MOHAMED ASHIQ CM — Cinematic Split-Screen Gallery & Interactive Lightbox Controller
 * Handles Parallax Visual Archive, Multi-Column Masonry, and Fullscreen Darkroom Lightbox
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

        // Fallback render if container has no items
        if (container.children.length === 0 && this.data.featuredProjects) {
            container.innerHTML = this.data.featuredProjects.map((proj) => `
                <article class="film-card-luxury" data-video-url="${proj.videoTeaser}" data-video-title="${proj.title}" data-cursor="play">
                    <div class="film-thumb-wrap">
                        <img src="${proj.coverImage}" alt="${proj.title}" class="film-thumb-img" loading="lazy">
                        <div class="film-gradient-overlay"></div>
                        <div class="film-category-pill">${proj.category}</div>
                        <div class="film-quality-pill">${proj.aspectRatio || '4K CINEMA'}</div>
                        <div class="film-play-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                        </div>
                    </div>
                    <div class="film-card-info">
                        <div class="film-card-body">
                            <div class="film-card-tags">
                                <span>${proj.category}</span>
                                <span class="tag-sep">•</span>
                                <span>${proj.location}</span>
                                <span class="tag-sep">•</span>
                                <span>${proj.year}</span>
                            </div>
                            <h3 class="film-card-title">${proj.title}</h3>
                            <p class="film-card-desc">${proj.overview || proj.subtitle}</p>
                        </div>
                        <div class="film-card-footer">
                            <span class="film-spec-badge">${proj.focalLength || 'DaVinci Graded'}</span>
                            <div class="film-watch-cta">
                                <span>Watch Film</span>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>
                </article>
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

    // Render Minimalist Category Navigation in Sidebar
    renderGalleryCategories() {
        const container = document.getElementById("gallery-category-nav");
        if (!container || !this.data.galleryCategories) return;

        const allPhotos = this.data.photographyItems || [];

        container.innerHTML = this.data.galleryCategories.map((cat, idx) => {
            const count = cat.id === "all"
                ? allPhotos.length
                : allPhotos.filter(p => p.category === cat.id).length;

            return `
                <button class="gallery-nav-pill ${idx === 0 ? 'is-active' : ''}" data-category="${cat.id}">
                    <div class="pill-label">
                        <span class="pill-indicator"></span>
                        <span>${cat.label}</span>
                    </div>
                    <span class="pill-count">[${count < 10 ? '0' + count : count}]</span>
                </button>
            `;
        }).join("");

        container.querySelectorAll(".gallery-nav-pill").forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("is-active")) return;

                container.querySelectorAll(".gallery-nav-pill").forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");

                const cat = btn.getAttribute("data-category");
                this.currentFilter = cat;

                // Animate shutter fade out & in
                const parallaxContainer = document.getElementById("gallery-parallax-container");
                if (parallaxContainer) {
                    parallaxContainer.classList.remove("gallery-shutter-animating");
                    void parallaxContainer.offsetWidth; // trigger reflow
                    parallaxContainer.classList.add("gallery-shutter-animating");
                }

                setTimeout(() => {
                    this.renderPhotographyGrid(cat);
                }, 180);
            });
        });
    }

    // Render Multi-Column Staggered Parallax Masonry Grid
    renderPhotographyGrid(filterCategory = "all") {
        const col1 = document.getElementById("gallery-stream-col-1");
        const col2 = document.getElementById("gallery-stream-col-2");
        if (!col1 || !col2 || !this.data.photographyItems) return;

        const filtered = filterCategory === "all"
            ? this.data.photographyItems
            : this.data.photographyItems.filter(item => item.category === filterCategory);

        this.activePhotoList = filtered;

        const col1Items = [];
        const col2Items = [];

        filtered.forEach((item, idx) => {
            if (idx % 2 === 0) {
                col1Items.push({ item, originalIndex: idx });
            } else {
                col2Items.push({ item, originalIndex: idx });
            }
        });

        const renderCard = ({ item, originalIndex }) => {
            let aspectClass = "aspect-landscape";
            if (item.aspectRatio === "portrait") aspectClass = "aspect-portrait";
            else if (item.aspectRatio === "tall") aspectClass = "aspect-tall";
            else if (item.aspectRatio === "cinema") aspectClass = "aspect-cinema";

            return `
                <article class="gallery-frame-card" data-photo-index="${originalIndex}" data-cursor="zoom">
                    <div class="frame-aspect-box ${aspectClass}">
                        <div class="frame-top-hud">
                            <span class="frame-roll-tag">${item.frameNum || `FR // 00${originalIndex + 1}`}</span>
                            <span class="frame-category-tag">${item.categoryLabel || item.category}</span>
                        </div>

                        <div class="frame-viewfinder-overlay" aria-hidden="true">
                            <span class="frame-corner top-left"></span>
                            <span class="frame-corner top-right"></span>
                            <span class="frame-corner bottom-left"></span>
                            <span class="frame-corner bottom-right"></span>
                        </div>

                        <img src="${item.image}" alt="${item.title}" class="gallery-frame-img" loading="lazy">

                        <div class="frame-bottom-gradient">
                            <h4 class="frame-title">${item.title}</h4>
                            <div class="frame-metadata-row">
                                <span class="frame-lens">${item.lens}</span>
                                <span class="frame-zoom-icon">&#x2922;</span>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        };

        col1.innerHTML = col1Items.map(renderCard).join("");
        col2.innerHTML = col2Items.map(renderCard).join("");

        // Attach Lightbox click listeners
        document.querySelectorAll(".gallery-frame-card").forEach(card => {
            card.addEventListener("click", () => {
                const idx = parseInt(card.getAttribute("data-photo-index"), 10);
                this.openLightbox(idx);
            });
        });

        // Refresh GSAP ScrollTrigger if active
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
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
                this.navigateLightbox(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                this.navigateLightbox(1);
            });
        }

        window.addEventListener("keydown", (e) => {
            if (!modal || !modal.classList.contains("is-active")) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") this.navigateLightbox(-1);
            if (e.key === "ArrowRight") this.navigateLightbox(1);
        });
    }

    navigateLightbox(direction) {
        if (!this.activePhotoList.length) return;
        this.currentLightboxIndex = (this.currentLightboxIndex + direction + this.activePhotoList.length) % this.activePhotoList.length;
        this.updateLightboxContent();
    }

    openLightbox(index) {
        const modal = document.getElementById("cinematic-lightbox-modal");
        if (!modal || !this.activePhotoList.length) return;

        this.currentLightboxIndex = Math.min(Math.max(0, index), this.activePhotoList.length - 1);
        this.renderLightboxFilmstrip();
        this.updateLightboxContent();
        modal.classList.add("is-active");
    }

    renderLightboxFilmstrip() {
        const filmstrip = document.getElementById("lightbox-filmstrip");
        if (!filmstrip || !this.activePhotoList) return;

        filmstrip.innerHTML = this.activePhotoList.map((item, idx) => `
            <div class="filmstrip-thumb ${idx === this.currentLightboxIndex ? 'is-active' : ''}" data-film-index="${idx}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
        `).join("");

        filmstrip.querySelectorAll(".filmstrip-thumb").forEach(thumb => {
            thumb.addEventListener("click", () => {
                const idx = parseInt(thumb.getAttribute("data-film-index"), 10);
                this.currentLightboxIndex = idx;
                this.updateLightboxContent();
            });
        });
    }

    updateLightboxContent() {
        const img = document.getElementById("lightbox-image");
        const title = document.getElementById("lightbox-title");
        const meta = document.getElementById("lightbox-meta");
        const counter = document.getElementById("lightbox-counter");
        const rollTag = document.getElementById("lightbox-roll-tag");
        const imgWrapper = document.getElementById("lightbox-image-wrapper");

        const item = this.activePhotoList[this.currentLightboxIndex];
        if (!item) return;

        if (imgWrapper) {
            imgWrapper.classList.add("is-animating");
            setTimeout(() => {
                if (img) img.src = item.image;
                if (title) title.textContent = item.title;
                if (meta) meta.innerHTML = `<span>${item.location}</span> <span>•</span> <span>${item.lens}</span> <span>•</span> <span>${item.year}</span>`;
                if (counter) counter.textContent = `${this.currentLightboxIndex + 1} / ${this.activePhotoList.length}`;
                if (rollTag) rollTag.textContent = item.frameNum || `ROLL // MASTER`;

                // Update filmstrip active state
                const filmstrip = document.getElementById("lightbox-filmstrip");
                if (filmstrip) {
                    filmstrip.querySelectorAll(".filmstrip-thumb").forEach((thumb, idx) => {
                        if (idx === this.currentLightboxIndex) {
                            thumb.classList.add("is-active");
                            thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        } else {
                            thumb.classList.remove("is-active");
                        }
                    });
                }

                imgWrapper.classList.remove("is-animating");
            }, 120);
        }
    }
}

// Auto-initialize when ready
function initGalleryApp() {
    if (!window.galleryManager) {
        window.galleryManager = new GalleryManager();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGalleryApp);
} else {
    initGalleryApp();
}
