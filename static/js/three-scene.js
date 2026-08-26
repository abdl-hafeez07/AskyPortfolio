/**
 * MOHAMED ASHIQ CM (ASKY) — Pure Centered DSLR Camera & Through-the-Lens Intro
 * 
 * Sequence:
 * Pure black background → Centered realistic DSLR camera facing viewer
 * → Subtle realistic breathing movement
 * → Camera moves toward viewer, lens fills the entire screen
 * → Travel directly THROUGH the DSLR lens (glass, aperture blades, optical depth)
 * → Seamlessly emerge from inside the lens directly into the website hero section.
 */

class CenteredDSLRJourney {
    constructor(containerId = "hero-three-canvas") {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        // 3D Groups
        this.cameraRig = new THREE.Group();
        this.bodyGroup = new THREE.Group();
        this.lensBarrelGroup = new THREE.Group();
        this.apertureBlades = new THREE.Group();
        this.goldRings = new THREE.Group();
        this.glassElements = new THREE.Group();
        this.opticalDepthChamber = new THREE.Group();

        // Lighting
        this.keySpotLight = null;
        this.rimLight = null;
        this.internalOpticalGlow = null;

        // State & Timing
        this.clock = new THREE.Clock();
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.isMobile = window.innerWidth < 992;
        this.introFinished = false;

        this.init();
    }

    init() {
        // Pure black scene — zero particles, zero extra clutter
        this.scene = new THREE.Scene();
        this.scene.background = null;

        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
        this.camera.position.set(0, 0, 8.0);

        try {
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.3;
            this.container.appendChild(this.renderer.domElement);
        } catch (e) {
            console.warn("WebGL initialization failed:", e);
            return;
        }

        this.setupCinematicLighting();
        this.buildRealisticDSLRBody();
        this.buildCinemaLensBarrel();
        this.buildChampagneGoldAccents();
        this.buildMechanicalApertureBlades();
        this.buildOpticalGlassShaders();
        this.buildInternalOpticalChamber();

        // Assemble Hierarchy
        this.lensBarrelGroup.add(this.goldRings);
        this.lensBarrelGroup.add(this.apertureBlades);
        this.lensBarrelGroup.add(this.glassElements);
        this.lensBarrelGroup.add(this.opticalDepthChamber);

        this.cameraRig.add(this.bodyGroup);
        this.cameraRig.add(this.lensBarrelGroup);
        this.scene.add(this.cameraRig);

        // INITIAL STATE: EXACTLY CENTERED, FACING FORWARD
        const startScale = this.isMobile ? 0.8 : 1.05;
        this.cameraRig.position.set(0, 0, 0);
        this.cameraRig.rotation.set(0, 0, 0);
        this.cameraRig.scale.set(startScale, startScale, startScale);

        this.bindEvents();

        // Start render loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);

        // Run the master through-the-lens sequence
        this.playThroughTheLensSequence();
    }

    setupCinematicLighting() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(ambient);

        // Key Warm Studio Light
        this.keySpotLight = new THREE.DirectionalLight(0xfce7b0, 4.2);
        this.keySpotLight.position.set(5, 5, 6);
        this.scene.add(this.keySpotLight);

        // Cool Anamorphic Rim Light
        this.rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
        this.rimLight.position.set(-5, -4, 4);
        this.scene.add(this.rimLight);

        // Glowing Internal Optical Core
        this.internalOpticalGlow = new THREE.PointLight(0xe5c378, 3.5, 12);
        this.internalOpticalGlow.position.set(0, 0, 0.4);
        this.lensBarrelGroup.add(this.internalOpticalGlow);
    }

    buildRealisticDSLRBody() {
        // 1. Main Magnesium Body
        const bodyGeo = new THREE.BoxGeometry(3.6, 2.3, 1.4);
        const bodyMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a0e,
            metalness: 0.9,
            roughness: 0.28
        });
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
        bodyMesh.position.set(0, 0, -1.0);
        this.bodyGroup.add(bodyMesh);

        // 2. Leather Grip
        const gripGeo = new THREE.CylinderGeometry(0.72, 0.78, 2.2, 32);
        const gripMat = new THREE.MeshStandardMaterial({
            color: 0x131318,
            metalness: 0.5,
            roughness: 0.75
        });
        const gripMesh = new THREE.Mesh(gripGeo, gripMat);
        gripMesh.position.set(1.7, 0, -0.7);
        gripMesh.scale.set(0.75, 1.0, 1.15);
        this.bodyGroup.add(gripMesh);

        // 3. Top Prism Viewfinder
        const prismGeo = new THREE.ConeGeometry(0.9, 0.7, 4);
        const prismMat = new THREE.MeshStandardMaterial({
            color: 0x0e0e14,
            metalness: 0.92,
            roughness: 0.22
        });
        const prismMesh = new THREE.Mesh(prismGeo, prismMat);
        prismMesh.position.set(0, 1.42, -0.9);
        prismMesh.rotation.y = Math.PI / 4;
        this.bodyGroup.add(prismMesh);

        // 4. Gold Shutter Release Dial
        const dialGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 24);
        const dialMat = new THREE.MeshStandardMaterial({
            color: 0xe5c378,
            metalness: 0.95,
            roughness: 0.15
        });
        const shutter = new THREE.Mesh(dialGeo, dialMat);
        shutter.position.set(1.5, 1.22, -0.5);
        this.bodyGroup.add(shutter);

        // 5. Red Recording Tally LED
        const tallyGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const tallyMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const tally = new THREE.Mesh(tallyGeo, tallyMat);
        tally.position.set(-1.4, 0.85, -0.28);
        this.bodyGroup.add(tally);
    }

    buildCinemaLensBarrel() {
        const stages = [
            { rTop: 1.65, rBot: 1.75, len: 0.8, z: -0.2 },
            { rTop: 1.75, rBot: 1.85, len: 0.7, z: 0.5 },
            { rTop: 1.85, rBot: 1.95, len: 0.8, z: 1.2 }
        ];

        const barrelMat = new THREE.MeshStandardMaterial({
            color: 0x101016,
            metalness: 0.92,
            roughness: 0.22,
            side: THREE.DoubleSide
        });

        stages.forEach((s) => {
            const geo = new THREE.CylinderGeometry(s.rTop, s.rBot, s.len, 64, 1, true);
            const mesh = new THREE.Mesh(geo, barrelMat);
            mesh.rotation.x = Math.PI / 2;
            mesh.position.z = s.z;
            this.lensBarrelGroup.add(mesh);
        });

        // Knurled Focus Teeth Ring
        const ridgeGeo = new THREE.TorusGeometry(1.82, 0.04, 16, 80);
        const ridgeMat = new THREE.MeshStandardMaterial({
            color: 0x20202a,
            metalness: 0.95,
            roughness: 0.2
        });
        for (let z = 0.2; z <= 0.8; z += 0.15) {
            const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
            ridge.position.z = z;
            this.lensBarrelGroup.add(ridge);
        }
    }

    buildChampagneGoldAccents() {
        const goldMat = new THREE.MeshStandardMaterial({
            color: 0xe5c378,
            metalness: 0.94,
            roughness: 0.2,
            emissive: 0x5a4417,
            emissiveIntensity: 0.4
        });

        // Front Signature Lens Ring
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.07, 24, 90), goldMat);
        ring1.position.z = 1.6;
        this.goldRings.add(ring1);

        // Focal Length Index Ring
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.86, 0.045, 16, 80), goldMat);
        ring2.position.z = 0.85;
        this.goldRings.add(ring2);

        // Mount Gold Base Ring
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.045, 16, 80), goldMat);
        ring3.position.z = -0.55;
        this.goldRings.add(ring3);
    }

    buildMechanicalApertureBlades() {
        const count = 9;
        const radius = 1.15;
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0.9, 0.3);
        shape.lineTo(1.15, 0.85);
        shape.lineTo(0.3, 0.95);
        shape.closePath();

        const geom = new THREE.ShapeGeometry(shape);
        const bladeMat = new THREE.MeshStandardMaterial({
            color: 0x16161f,
            metalness: 0.95,
            roughness: 0.25,
            side: THREE.DoubleSide
        });

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const blade = new THREE.Mesh(geom, bladeMat);
            blade.position.set(Math.cos(angle) * radius * 0.45, Math.sin(angle) * radius * 0.45, 0.3);
            blade.rotation.z = angle + 0.35;
            blade.scale.set(0.92, 0.92, 0.92);
            this.apertureBlades.add(blade);
        }
    }

    buildOpticalGlassShaders() {
        // Front Curved Convex Optical Glass
        const glassGeo1 = new THREE.SphereGeometry(1.85, 32, 32, 0, Math.PI * 2, 0, Math.PI / 3.6);
        const glassMat1 = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.08,
            roughness: 0.03,
            transmission: 0.96,
            thickness: 0.8,
            transparent: true,
            opacity: 0.65,
            reflectivity: 0.95,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
        });
        const glass1 = new THREE.Mesh(glassGeo1, glassMat1);
        glass1.position.z = 1.55;
        glass1.rotation.x = Math.PI;
        this.glassElements.add(glass1);

        // Internal Condenser Glass
        const glassGeo2 = new THREE.SphereGeometry(1.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 4.0);
        const glassMat2 = glassMat1.clone();
        glassMat2.opacity = 0.45;
        const glass2 = new THREE.Mesh(glassGeo2, glassMat2);
        glass2.position.z = 0.6;
        glass2.rotation.x = Math.PI;
        this.glassElements.add(glass2);
    }

    buildInternalOpticalChamber() {
        // Multi-depth Optical Rings inside the lens that expand during the dive
        const count = 10;
        for (let i = 0; i < count; i++) {
            const z = -i * 0.6 + 0.5;
            const r = 1.3 - i * 0.08;
            const geo = new THREE.TorusGeometry(r, 0.035, 16, 64);
            const mat = new THREE.MeshBasicMaterial({
                color: 0xe5c378,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.Mesh(geo, mat);
            ring.position.z = z;
            this.opticalDepthChamber.add(ring);
        }
    }

    /**
     * MASTER PURE CENTERED DSLR → THROUGH THE LENS → HERO SEQUENCE
     */
    playThroughTheLensSequence() {
        if (typeof gsap === "undefined") {
            this.introFinished = true;
            this.settleOnRightSide();
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            onComplete: () => {
                this.introFinished = true;
                this.settleOnRightSide();
            }
        });

        // -------------------------------------------------------------
        // STAGE 1 (0.0s – 1.6s): Centered DSLR with subtle realistic breathing
        // -------------------------------------------------------------
        tl.to(this.cameraRig.rotation, {
            y: 0.06,
            x: -0.04,
            duration: 1.6,
            ease: "sine.inOut"
        }, 0)
        .to(this.keySpotLight, {
            intensity: 5.5,
            duration: 1.6,
            ease: "power2.inOut"
        }, 0);

        // -------------------------------------------------------------
        // STAGE 2 (1.6s – 2.8s): Camera moves toward viewer & lens fills the screen
        // -------------------------------------------------------------
        tl.to(this.cameraRig.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.2,
            ease: "power2.inOut"
        }, 1.6)
        .to(this.cameraRig.position, {
            z: 3.5,
            duration: 1.2,
            ease: "power2.in"
        }, 1.6)
        .to(this.cameraRig.scale, {
            x: 1.35,
            y: 1.35,
            z: 1.35,
            duration: 1.2,
            ease: "power2.in"
        }, 1.6)
        .to(this.apertureBlades.rotation, {
            z: Math.PI * 0.5,
            duration: 1.0,
            ease: "power2.out"
        }, 1.8);

        // -------------------------------------------------------------
        // STAGE 3 (2.8s – 3.8s): TRAVEL DIRECTLY THROUGH THE DSLR LENS
        // -------------------------------------------------------------
        tl.to(this.cameraRig.position, {
            z: 8.5,
            duration: 1.2,
            ease: "power3.in",
            onUpdate: () => {
                const z = this.cameraRig.position.z;
                // Optical depth transit effect as screen physically enters inside the lens
                const progress = Math.min(1, Math.max(0, (z - 3.5) / 5.0));
                this.opticalDepthChamber.children.forEach((child, idx) => {
                    if (child.material) {
                        child.material.opacity = Math.sin(progress * Math.PI) * 0.95;
                        child.scale.setScalar(1 + (1 - progress) * idx * 0.25);
                    }
                });
            }
        }, 2.8);

        // -------------------------------------------------------------
        // STAGE 4 (3.8s – 5.2s): EMERGE FROM LENS DIRECTLY INTO HERO SECTION
        // -------------------------------------------------------------
        const endX = this.isMobile ? 0 : 1.4;
        const endScale = this.isMobile ? 0.6 : 0.9;
        const endZ = this.isMobile ? -2 : 0;

        tl.to(this.cameraRig.position, {
            x: endX,
            y: this.isMobile ? 0.3 : 0,
            z: endZ,
            duration: 1.4,
            ease: "expo.out"
        }, 3.8)
        .to(this.cameraRig.scale, {
            x: endScale,
            y: endScale,
            z: endScale,
            duration: 1.4,
            ease: "expo.out"
        }, 3.8)
        .to(this.opticalDepthChamber.children.map(c => c.material), {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        }, 4.0);

        // Reveal the website hero synchronously at the moment of emergence (3.8s)
        tl.call(() => {
            if (window.cinematicAnim && typeof window.cinematicAnim.revealHeroContent === "function") {
                window.cinematicAnim.revealHeroContent();
            }
        }, null, 3.8);
    }

    settleOnRightSide() {
        this.isMobile = window.innerWidth < 992;
        if (this.isMobile) {
            this.cameraRig.position.set(0, 0.3, -2);
            this.cameraRig.scale.set(0.6, 0.6, 0.6);
        } else {
            this.cameraRig.position.set(1.4, 0, 0);
            this.cameraRig.scale.set(0.9, 0.9, 0.9);
        }
    }

    bindEvents() {
        window.addEventListener("mousemove", (e) => {
            this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        window.addEventListener("resize", () => {
            if (!this.container || !this.renderer || !this.camera) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);

            if (this.introFinished) {
                this.settleOnRightSide();
            }
        });
    }

    animate() {
        requestAnimationFrame(this.animate);

        const time = this.clock.getElapsedTime();

        // Mouse inertia smoothing
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // Continuous Ambient Parallax after intro completes
        if (this.introFinished) {
            this.cameraRig.rotation.y = this.mouse.x * 0.2 + Math.sin(time * 0.4) * 0.04;
            this.cameraRig.rotation.x = -this.mouse.y * 0.16 + Math.cos(time * 0.5) * 0.03;
            this.cameraRig.position.y = (this.isMobile ? 0.3 : 0) + Math.sin(time * 0.7) * 0.07;

            // Slow luxury rotation of gold rings and lens
            this.goldRings.rotation.z = time * 0.06;
            this.lensBarrelGroup.rotation.z = -time * 0.03;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Global handle & auto-init
window.cinematicJourneyInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    if (typeof THREE !== "undefined" && document.getElementById("hero-three-canvas")) {
        window.cinematicJourneyInstance = new CenteredDSLRJourney("hero-three-canvas");
    }
});
