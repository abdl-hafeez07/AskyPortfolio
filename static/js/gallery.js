/**
 * MOHAMED ASHIQ CM — People Editorial Gallery & Interactive Lightbox Controller
 * Handles Multi-Column Continuous Photo Collage, Watch Tutorial Action, Category Filtering, and Fullscreen Darkroom Lightbox
 */

function resolveAssetUrl(url) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("//")) {
        return url;
    }
    // When running under Django (HTTP environment)
    if (window.location && window.location.protocol && window.location.protocol.startsWith("http")) {
        if (url.startsWith("/static/")) return url;
        if (url.startsWith("static/")) return "/" + url;
        return "/static/" + (url.startsWith("/") ? url.slice(1) : url);
    }
    // Static HTML environment (file:// or plain server)
    if (url.startsWith("/static/")) return url.replace("/static/", "");
    if (url.startsWith("static/")) return url.replace("static/", "");
    return url;
}

class GalleryManager {
    constructor() {
        this.data = window.PORTFOLIO_DATA || {};
        this.currentLightboxIndex = 0;
        this.activePhotoList = [];
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.bindFilmCardEvents();
        this.bindWatchTutorialEvent();
        this.renderPeopleCollage();
        this.updateCategoryCounts();
        this.renderDedicatedGalleryGrid("all");
        this.bindDedicatedGalleryFilters();
        this.renderTestimonials();

        this.bindLightboxEvents();
        this.bindVideoModalEvents();

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const activeFilter = document.querySelector(".gallery-filter-btn.is-active");
                const currentCat = activeFilter ? activeFilter.getAttribute("data-filter") : "all";
                if (document.getElementById("gallery-masonry-grid")) {
                    this.renderDedicatedGalleryGrid(currentCat);
                }
            }, 200);
        });
    }

    // Category Normalization
    normalizeCategory(cat) {
        if (!cat) return "all";
        const c = cat.toLowerCase().trim();
        if (c === "all" || c === "all frames") return "all";
        if (c === "wedding" || c === "weddings") return "wedding";
        if (c === "portraits" || c === "portrait") return "portraits";
        if (c === "events" || c === "event") return "events";
        if (c === "cinematic" || c === "films" || c === "film") return "films";
        return c;
    }

    matchCategory(itemCategory, targetCategory) {
        const target = this.normalizeCategory(targetCategory);
        if (target === "all") return true;
        const item = this.normalizeCategory(itemCategory);
        return item === target;
    }

    // Dynamically update count badges on filter tabs
    updateCategoryCounts() {
        const allPhotos = this.data.photographyItems || [];
        const counts = {
            all: allPhotos.length,
            wedding: 0,
            portraits: 0,
            events: 0,
            cinematic: 0
        };

        allPhotos.forEach(p => {
            const norm = this.normalizeCategory(p.category || p.categoryLabel);
            if (norm === "wedding") counts.wedding++;
            else if (norm === "portraits") counts.portraits++;
            else if (norm === "events") counts.events++;
            else if (norm === "films") counts.cinematic++;
        });

        const formatCount = (n) => `[${n < 10 ? '0' + n : n}]`;

        const elAll = document.getElementById("count-all");
        const elWedding = document.getElementById("count-wedding");
        const elPortraits = document.getElementById("count-portraits");
        const elEvents = document.getElementById("count-events");
        const elCinematic = document.getElementById("count-cinematic");

        if (elAll) elAll.textContent = formatCount(counts.all);
        if (elWedding) elWedding.textContent = formatCount(counts.wedding);
        if (elPortraits) elPortraits.textContent = formatCount(counts.portraits);
        if (elEvents) elEvents.textContent = formatCount(counts.events);
        if (elCinematic) elCinematic.textContent = formatCount(counts.cinematic);
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
                        <img src="${resolveAssetUrl(proj.coverImage)}" alt="${proj.title}" class="film-thumb-img" loading="lazy">
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

    // Connect "Watch Tutorial" Button to Cinema Video Modal
    bindWatchTutorialEvent() {
        const btn = document.getElementById("people-watch-tutorial-btn");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const tutorialVideoUrl = (this.data.featuredProjects && this.data.featuredProjects[0] && this.data.featuredProjects[0].videoTeaser)
                ? this.data.featuredProjects[0].videoTeaser
                : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
            
            this.openVideoModal(tutorialVideoUrl, "People & Portraits — Cinematic BTS & Lighting Tutorial");
        });
    }

    // Render Dense Multi-Column Continuous Moving Photo Collage
    renderPeopleCollage() {
        const col1Track = document.getElementById("people-col-1");
        const col2Track = document.getElementById("people-col-2");
        const col3Track = document.getElementById("people-col-3");
        if (!col1Track || !col2Track || !this.data.photographyItems) return;

        const allPhotos = [...this.data.photographyItems];

        // Distribute photos cyclically across 3 columns with varied aspect ratios
        const col1Photos = [];
        const col2Photos = [];
        const col3Photos = [];

        const ratioSeq1 = ["ratio-portrait", "ratio-landscape", "ratio-tall", "ratio-square", "ratio-portrait", "ratio-landscape"];
        const ratioSeq2 = ["ratio-tall", "ratio-square", "ratio-portrait", "ratio-landscape", "ratio-tall", "ratio-portrait"];
        const ratioSeq3 = ["ratio-landscape", "ratio-portrait", "ratio-square", "ratio-tall", "ratio-landscape", "ratio-portrait"];

        allPhotos.forEach((item, idx) => {
            const colIndex = idx % 3;
            if (colIndex === 0) {
                col1Photos.push({ item, index: idx, ratio: ratioSeq1[col1Photos.length % ratioSeq1.length] });
            } else if (colIndex === 1) {
                col2Photos.push({ item, index: idx, ratio: ratioSeq2[col2Photos.length % ratioSeq2.length] });
            } else {
                col3Photos.push({ item, index: idx, ratio: ratioSeq3[col3Photos.length % ratioSeq3.length] });
            }
        });

        while (col1Photos.length < 6 && allPhotos.length > 0) {
            const pick = allPhotos[col1Photos.length % allPhotos.length];
            col1Photos.push({ item: pick, index: col1Photos.length % allPhotos.length, ratio: ratioSeq1[col1Photos.length % ratioSeq1.length] });
        }
        while (col2Photos.length < 6 && allPhotos.length > 0) {
            const pick = allPhotos[(col2Photos.length + 1) % allPhotos.length];
            col2Photos.push({ item: pick, index: (col2Photos.length + 1) % allPhotos.length, ratio: ratioSeq2[col2Photos.length % ratioSeq2.length] });
        }
        if (col3Track) {
            while (col3Photos.length < 6 && allPhotos.length > 0) {
                const pick = allPhotos[(col3Photos.length + 2) % allPhotos.length];
                col3Photos.push({ item: pick, index: (col3Photos.length + 2) % allPhotos.length, ratio: ratioSeq3[col3Photos.length % ratioSeq3.length] });
            }
        }

        const buildCardHtml = ({ item, index, ratio }) => `
            <article class="people-photo-card" data-photo-index="${index}" data-cursor="zoom">
                <div class="people-photo-box ${ratio}">
                    <img src="${resolveAssetUrl(item.image)}" alt="${item.title}" class="people-photo-img" loading="lazy">
                    <div class="people-photo-overlay">
                        <span class="people-photo-title">${item.title}</span>
                        <span class="people-photo-sub">${item.location || item.category}</span>
                    </div>
                </div>
            </article>
        `;

        const renderTrack = (trackEl, items) => {
            if (!trackEl) return;
            const innerPrimary = trackEl.querySelector(".people-col-inner:not(.clone)");
            const innerClone = trackEl.querySelector(".people-col-inner.clone");
            const html = items.map(buildCardHtml).join("");

            if (innerPrimary) innerPrimary.innerHTML = html;
            if (innerClone) innerClone.innerHTML = html;
        };

        renderTrack(col1Track, col1Photos);
        renderTrack(col2Track, col2Photos);
        if (col3Track) renderTrack(col3Track, col3Photos);

        // Attach Lightbox click listeners to all photo cards
        document.querySelectorAll(".people-photo-card").forEach(card => {
            card.addEventListener("click", () => {
                const idx = parseInt(card.getAttribute("data-photo-index"), 10);
                if (!isNaN(idx)) {
                    this.activePhotoList = allPhotos;
                    this.openLightbox(idx);
                }
            });
        });
    }

    // Render Dedicated Gallery Page Masonry Grid (gallery.html)
    renderDedicatedGalleryGrid(category = "all") {
        const grid = document.getElementById("gallery-masonry-grid");
        if (!grid || !this.data.photographyItems) return;

        const allPhotos = this.data.photographyItems;
        const targetNorm = this.normalizeCategory(category);
        const filtered = (targetNorm === "all")
            ? allPhotos
            : allPhotos.filter(item => this.matchCategory(item.category || item.categoryLabel, targetNorm));

        this.activePhotoList = filtered;

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="text-center py-5 w-100">
                    <p class="text-secondary font-monospace">No visual stills found in this category.</p>
                </div>
            `;
            return;
        }

        const width = window.innerWidth;
        const numCols = width < 768 ? 1 : (width < 992 ? 2 : 3);
        const cols = Array.from({ length: numCols }, () => []);

        const aspectRatios = ["ratio-portrait", "ratio-landscape", "ratio-tall", "ratio-square", "ratio-portrait", "ratio-landscape"];

        filtered.forEach((item, idx) => {
            const colIdx = idx % numCols;
            const ratio = item.aspectRatio
                ? (item.aspectRatio === "portrait" ? "ratio-portrait" : item.aspectRatio === "landscape" ? "ratio-landscape" : item.aspectRatio === "tall" ? "ratio-tall" : "ratio-square")
                : aspectRatios[idx % aspectRatios.length];
            const resolvedSrc = resolveAssetUrl(item.image);

            cols[colIdx].push(`
                <article class="gallery-grid-card" data-photo-index="${idx}" data-cursor="zoom">
                    <div class="gallery-card-aspect ${ratio}">
                        <div class="gallery-card-hud-top">
                            <span class="gallery-card-roll">${item.frameNum || `FR // 00${idx + 1}`}</span>
                            <span class="gallery-card-cat">${item.categoryLabel || item.category}</span>
                        </div>
                        <img src="${resolvedSrc}" alt="${item.title}" class="gallery-card-img" loading="eager" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85';">
                        <div class="gallery-card-hud-bottom">
                            <h3 class="gallery-card-title">${item.title}</h3>
                            <div class="gallery-card-meta">
                                <span class="gallery-card-lens">${item.lens || 'Cinema Prime'}</span>
                                <span class="gallery-card-zoom-btn">&#x2922;</span>
                            </div>
                        </div>
                    </div>
                </article>
            `);
        });

        grid.innerHTML = cols.map(colItems => `
            <div class="gallery-col">
                ${colItems.join("")}
            </div>
        `).join("");

        // Attach Lightbox click listeners
        grid.querySelectorAll(".gallery-grid-card").forEach(card => {
            card.addEventListener("click", () => {
                const idx = parseInt(card.getAttribute("data-photo-index"), 10);
                if (!isNaN(idx)) {
                    this.openLightbox(idx);
                }
            });
        });
    }

    // Bind Category Filter Buttons on Dedicated Gallery Page
    bindDedicatedGalleryFilters() {
        const filterWrapper = document.getElementById("gallery-filter-wrapper");
        if (!filterWrapper) return;

        filterWrapper.querySelectorAll(".gallery-filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                filterWrapper.querySelectorAll(".gallery-filter-btn").forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");

                const cat = btn.getAttribute("data-filter");
                this.renderDedicatedGalleryGrid(cat);
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
                        <img src="${resolveAssetUrl(test.avatar)}" alt="${test.clientName}" class="rounded-circle" style="width: 44px; height: 44px; object-fit: cover; border: 2px solid var(--accent-gold);">
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

        const closeModal = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const m = document.getElementById("cinematic-lightbox-modal");
            if (m) m.classList.remove("is-active");
        };

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (backdrop) backdrop.addEventListener("click", closeModal);

        document.addEventListener("click", (e) => {
            if (e.target.closest("#lightbox-close-btn") || e.target.classList.contains("lightbox-backdrop")) {
                closeModal(e);
            }
        });

        if (prevBtn) {
            prevBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.navigateLightbox(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.navigateLightbox(1);
            });
        }

        window.addEventListener("keydown", (e) => {
            const m = document.getElementById("cinematic-lightbox-modal");
            if (!m || !m.classList.contains("is-active")) return;
            if (e.key === "Escape") closeModal(e);
            if (e.key === "ArrowLeft") this.navigateLightbox(-1);
            if (e.key === "ArrowRight") this.navigateLightbox(1);
        });

        // Touch Swipe Navigation for mobile
        if (modal) {
            modal.addEventListener("touchstart", (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            modal.addEventListener("touchend", (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }
    }

    handleSwipe() {
        const diff = this.touchEndX - this.touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                // Swipe Left -> Next
                this.navigateLightbox(1);
            } else {
                // Swipe Right -> Prev
                this.navigateLightbox(-1);
            }
        }
    }

    navigateLightbox(direction) {
        if (!this.activePhotoList || !this.activePhotoList.length) return;
        this.currentLightboxIndex = (this.currentLightboxIndex + direction + this.activePhotoList.length) % this.activePhotoList.length;
        this.updateLightboxContent();
    }

    openLightbox(index) {
        const modal = document.getElementById("cinematic-lightbox-modal");
        if (!modal || !this.activePhotoList || !this.activePhotoList.length) return;

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
                <img src="${resolveAssetUrl(item.image)}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80';">
            </div>
        `).join("");

        filmstrip.querySelectorAll(".filmstrip-thumb").forEach(thumb => {
            thumb.addEventListener("click", (e) => {
                e.stopPropagation();
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
                if (img) img.src = resolveAssetUrl(item.image);
                if (title) title.textContent = item.title;
                if (meta) meta.innerHTML = `<span>${item.location || 'Location'}</span> <span>•</span> <span>${item.lens || 'Cinema Lens'}</span> <span>•</span> <span>${item.year || '2026'}</span>`;
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
            }, 100);
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
