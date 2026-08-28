/**
 * MOHAMED ASHIQ CM (ASKY) — Structured Data Layer
 * Videographer & Video Editor Portfolio
 * Mirrors Django Backend Models: Profile, Experience, Education, Skill, Service, Project, GalleryItem, VideoReel
 */

window.PORTFOLIO_DATA = {
    profile: {
        name: "Mohamed Ashiq CM",
        brandName: "ASKY",
        fullName: "Mohamed Ashiq CM",
        role: "Videographer & Video Editor",
        tagline: "Capturing the poetry of light, authentic emotion, and cinematic storytelling.",
        location: "Bengaluru, India",
        experienceYears: "2+",
        email: "ashiqchangal@gmail.com",
        phone: "+91 9061733155",
        whatsapp: "https://wa.me/919061733155",
        instagram: "@askie._",
        instagramUrl: "https://www.instagram.com/askie._?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
        profileImage: "img/mohamed_ashiq.jpeg",
        vimeo: "",
        bio: [
            "Mohamed Ashiq CM is a professional Videographer and Video Editor with hands-on experience in wedding videography, content creation, and high-end video post-production.",
            "Skilled in directing video shoots, managing on-site production teams, and coordinating with clients from initial concept through final delivery. Experienced in social media content creation, event coordination, and cross-functional team communication."
        ],
        specializations: [
            "Wedding Videography",
            "Video Editing & Post-Production",
            "Content Creation & Social Media Reels",
            "Cinematography & Framing",
            "Directing & On-Location Production",
            "Event Management & Coordination"
        ],
        software: [
            "Adobe Premiere Pro",
            "DaVinci Resolve"
        ],
        education: {
            degree: "Bachelor of Hospital Administration (BHA)",
            institution: "Yenepoya School of Allied Health Sciences, Mangalore",
            period: "2023 – 2026"
        },
        experience: [
            {
                role: "Freelance Videographer & Content Creator",
                company: "Self-Employed",
                duration: "2022 – Present",
                durationLength: "2+ Years",
                achievement: "Directed and edited projects for multiple clients and delivered 50+ wedding films",
                responsibilities: [
                    "Directed on-location shoots for weddings, brand events, and creative projects.",
                    "Created ongoing high-retention content for clients' social media platforms.",
                    "Managed direct client communication throughout production lifecycle.",
                    "Ensured cinematic projects were delivered on schedule and exceeded expectations."
                ]
            },
            {
                role: "Video Editing Intern",
                company: "Lenzpire Media",
                location: "Bengaluru",
                duration: "August 2025 – September 2025",
                durationLength: "1 Month",
                achievement: "Supported post-production pipelines across commercial and creative video edits",
                responsibilities: [
                    "Supported the senior editing team with multi-camera post-production tasks.",
                    "Organized, synchronized, and cataloged raw footage archives.",
                    "Assisted senior editors with rough cuts, pacing, and color passes.",
                    "Mastered professional production workflows from filming through final delivery."
                ]
            }
        ],
        gearList: [
            { category: "Editing Suite", items: ["DaVinci Resolve Studio", "Adobe Premiere Pro", "Color Grading & LUTs", "Sound Design Suite"] },
            { category: "Camera & Optics", items: ["4K Cinema Cameras", "Fast Prime Lenses (35mm / 50mm / 85mm)", "Variable ND Optics", "Low-Light Sensors"] },
            { category: "Grip & Audio", items: ["3-Axis Motorized Gimbal", "Wireless Lavalier Audio Systems", "On-Camera LED Lighting", "High-Speed Storage Arrays"] }
        ]
    },

    stats: [
        { label: "Wedding Films Delivered", value: 50, suffix: "+", description: "Emotional, cinematic wedding memories" },
        { label: "Years of Freelance Craft", value: 3, suffix: "+", description: "Filming & editing experience since 2022" },
        { label: "Client Satisfaction", value: 100, suffix: "%", description: "Dedicated client communication & delivery" },
        { label: "Software Mastery", value: 2, suffix: " Pro Suites", description: "DaVinci Resolve & Premiere Pro" }
    ],

    // Featured Work for Editorial Highlights (Selected Projects)
    featuredProjects: [
        {
            id: "proj-royal-vows",
            title: "Eternal Vows: The Royal Celebration",
            subtitle: "Luxury Wedding Cinematography & Film",
            category: "Wedding Film",
            year: "2025",
            location: "Bengaluru, India",
            focalLength: "50mm T1.4 & 85mm",
            aspectRatio: "2.39:1 CinemaScope",
            coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
            layoutType: "hero-wide",
            client: "Arjun & Sneha",
            overview: "A lavish 3-day wedding celebration capturing traditional rituals, intimate sunset vows, and grand reception energy. Directed on-location and graded in DaVinci Resolve.",
            gallery: [
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
                "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"
            ],
            videoTeaser: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            awards: "50+ Wedding Films Delivered Milestone"
        },
        {
            id: "proj-golden-reverie",
            title: "Golden Hour Reverie",
            subtitle: "Cinematic Pre-Wedding Teaser",
            category: "Cinematic Video",
            year: "2025",
            location: "Coorg & Mysore",
            focalLength: "35mm Prime f/1.8",
            aspectRatio: "16:9 4K UHD",
            coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
            layoutType: "portrait-tall",
            client: "Farhan & Ayesha",
            overview: "Cinematic pre-wedding film set against misty hillscapes and golden sunsets, blending slow-motion intimacy with emotive soundtrack pacing.",
            gallery: [
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
                "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85"
            ],
            videoTeaser: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            awards: "Client Choice Best Teaser"
        },
        {
            id: "proj-social-pulse",
            title: "Urban Rhythm & Brand Pulse",
            subtitle: "Social Media Campaign & Commercial Reel",
            category: "Commercial Film",
            year: "2024",
            location: "Bengaluru, India",
            focalLength: "24-70mm Cinema Zoom",
            aspectRatio: "9:16 & 16:9 Multi-Format",
            coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
            layoutType: "wide-banner",
            client: "Lenzpire Media Collaboration",
            overview: "High-energy commercial reel showcasing dynamic transitions, speed ramps, and neon reflections. Post-produced using Premiere Pro and DaVinci Resolve.",
            gallery: [
                "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
                "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=85"
            ],
            videoTeaser: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            awards: "High Engagement Commercial Reel"
        }
    ],

    // Photography Gallery with dynamic category filtering
    galleryCategories: [
        { id: "all", label: "All Frames", count: 16 },
        { id: "wedding", label: "Weddings", count: 4 },
        { id: "portraits", label: "Portraits", count: 4 },
        { id: "events", label: "Events", count: 4 },
        { id: "films", label: "Films", count: 4 }
    ],

    photographyItems: [
        {
            id: "photo-01",
            title: "The Filmmaker in Nature (Mohamed Ashiq)",
            category: "portraits",
            categoryLabel: "Portraits",
            location: "Wayanad Forests, India",
            lens: "Sony A7S III • 35mm f/1.4 Cinema",
            frameNum: "FR // 001",
            image: "img/IMG_1013.JPG",
            aspectRatio: "portrait",
            year: "2026"
        },
        {
            id: "photo-02",
            title: "Canopy Perspective & Master Direction",
            category: "films",
            categoryLabel: "Films",
            location: "Bengaluru Reserve",
            lens: "Sony FX3 • 24-70mm GM",
            frameNum: "FR // 002",
            image: "img/IMG_1011.JPG",
            aspectRatio: "landscape",
            year: "2026"
        },
        {
            id: "photo-03",
            title: "Sangeet Rhythm & Luminescence",
            category: "events",
            categoryLabel: "Events",
            location: "The Leela Palace, BLR",
            lens: "Sony FX3 • 24mm f/1.8 G",
            frameNum: "FR // 003",
            image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "landscape",
            year: "2024"
        },
        {
            id: "photo-04",
            title: "Neon Cyberpunk Narrative",
            category: "films",
            categoryLabel: "Films",
            location: "MG Road Studio",
            lens: "DaVinci Cinema • 35mm T2.0 Anamorphic",
            frameNum: "FR // 004",
            image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "portrait",
            year: "2024"
        },
        {
            id: "photo-05",
            title: "Intimate Haldi Ceremonial",
            category: "wedding",
            categoryLabel: "Weddings",
            location: "Coorg Plantation",
            lens: "Sony A7S III • 85mm f/1.4 GM",
            frameNum: "FR // 005",
            image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
            aspectRatio: "portrait",
            year: "2025"
        },
        {
            id: "photo-06",
            title: "Elysian Runway Portrait",
            category: "portraits",
            categoryLabel: "Portraits",
            location: "Bengaluru Fashion Week",
            lens: "Sony FX3 • 70-200mm f/2.8 GM II",
            frameNum: "FR // 006",
            image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
            aspectRatio: "landscape",
            year: "2025"
        },
        {
            id: "photo-07",
            title: "Festival of Echoes Live",
            category: "events",
            categoryLabel: "Events",
            location: "Jaymahal Palace",
            lens: "Sony A7S III • 50mm f/1.2 GM",
            frameNum: "FR // 007",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "portrait",
            year: "2024"
        },
        {
            id: "photo-08",
            title: "Midnight Drive Cinema Frame",
            category: "films",
            categoryLabel: "Films",
            location: "Nandi Hills Expressway",
            lens: "ARRI Alexa Mini Look • 40mm CinemaScope",
            frameNum: "FR // 008",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "landscape",
            year: "2024"
        },
        {
            id: "photo-09",
            title: "Vows in the Whispering Mist",
            category: "wedding",
            categoryLabel: "Weddings",
            location: "Ooty Heritage Resort",
            lens: "Sony FX3 • 35mm T1.3 Cinema",
            frameNum: "FR // 009",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "landscape",
            year: "2025"
        },
        {
            id: "photo-10",
            title: "Studio Monochrome Shadow",
            category: "portraits",
            categoryLabel: "Portraits",
            location: "Indiranagar Daylight Studio",
            lens: "Leica SL2-S • 50mm Summilux",
            frameNum: "FR // 010",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
            aspectRatio: "portrait",
            year: "2024"
        },
        {
            id: "photo-11",
            title: "Electronic Pulse Arena",
            category: "events",
            categoryLabel: "Events",
            location: "Sunburn Arena BLR",
            lens: "Sony A7S III • 16-35mm f/2.8 GM",
            frameNum: "FR // 011",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "landscape",
            year: "2024"
        },
        {
            id: "photo-12",
            title: "Urban Architecture Chronicle",
            category: "films",
            categoryLabel: "Films",
            location: "UB City Metropolis",
            lens: "DaVinci Resolve Color • 28mm T1.5",
            frameNum: "FR // 012",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "portrait",
            year: "2025"
        },
        {
            id: "photo-13",
            title: "Pheras by the Sacred Fire",
            category: "wedding",
            categoryLabel: "Weddings",
            location: "Taj West End",
            lens: "Sony FX3 • 50mm T1.4 Cinema",
            frameNum: "FR // 013",
            image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "portrait",
            year: "2025"
        },
        {
            id: "photo-14",
            title: "Vogue Elegance Gaze",
            category: "portraits",
            categoryLabel: "Portraits",
            location: "Koramangala Studio",
            lens: "Sony FX3 • 85mm f/1.4 GM",
            frameNum: "FR // 014",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85",
            aspectRatio: "landscape",
            year: "2025"
        },
        {
            id: "photo-15",
            title: "Illuminated Symphony Gala",
            category: "events",
            categoryLabel: "Events",
            location: "ITC Gardenia BLR",
            lens: "Sony A7S III • 35mm f/1.4 GM",
            frameNum: "FR // 015",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "portrait",
            year: "2024"
        },
        {
            id: "photo-16",
            title: "Cinema Noir Teaser Frame",
            category: "films",
            categoryLabel: "Films",
            location: "Old Bangalore Alley",
            lens: "Cooke Anamorphic • 65mm Cinema",
            frameNum: "FR // 016",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=85",
            aspectRatio: "landscape",
            year: "2024"
        }
    ],

    // Videography Showreel & Films
    videographyShowcase: [
        {
            id: "vid-01",
            title: "The Royal Bangalore Wedding Film",
            category: "Wedding Videography",
            year: "2025",
            duration: "03:45",
            aspect: "2.39:1 CinemaScope",
            location: "Bengaluru, India",
            thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            description: "Full-scale cinematic wedding film directed and edited by Mohamed Ashiq, featuring multi-cam coverage and DaVinci Resolve color grading."
        },
        {
            id: "vid-02",
            title: "Misty Hills: Pre-Wedding Teaser",
            category: "Cinematic Highlight",
            year: "2025",
            duration: "01:15",
            aspect: "16:9 4K UHD",
            location: "Coorg, India",
            thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            description: "Intimate cinematic shots with dynamic gimbal movements and romantic sound design."
        },
        {
            id: "vid-03",
            title: "Brand Motion & Commercial Reel",
            category: "Social Media Reel",
            year: "2024",
            duration: "00:58",
            aspect: "9:16 Reel Format",
            location: "Bengaluru",
            thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            description: "High-retention vertical reel engineered for social media visibility with fast cuts and sound sync."
        }
    ],

    // Professional Services
    services: [
        {
            number: "01",
            title: "Wedding Films & Wedding Videography",
            category: "Videography",
            deliverables: [
                "Full-day on-location cinematic coverage of rituals and reception",
                "4K Ultra-HD multi-camera recording and gimbal stabilization",
                "Cinematic Teaser Trailer (60s) + Full Length Feature Film",
                "Bespoke color grading in DaVinci Resolve & licensed audio",
                "Delivered on fast schedule with high satisfaction"
            ],
            bestFor: "Couples looking for a cinematic, movie-like wedding film."
        },
        {
            number: "02",
            title: "Cinematic Videos & Event Videography",
            category: "Videography",
            deliverables: [
                "Dynamic video coverage for private events, sangeet nights, and concerts",
                "High frame rate slow-motion captures for emotional beats",
                "Multi-source audio recording for clear speeches and performances",
                "Fast-turnaround event highlight recap for social media sharing"
            ],
            bestFor: "Events, celebrations, music performances, and corporate functions."
        },
        {
            number: "03",
            title: "Social Media Content Creation & Reels",
            category: "Production",
            deliverables: [
                "High-retention 9:16 vertical video reels & shorts",
                "Trend-aware editing, smooth speed ramps, and beat-synced transitions",
                "Engaging captions and title typography",
                "Ongoing content packages for creators, businesses, and influencers"
            ],
            bestFor: "Instagram creators, brand pages, and dynamic personal branding."
        },
        {
            number: "04",
            title: "Video Direction & On-Location Production",
            category: "Production",
            deliverables: [
                "Pre-production shot-listing, storyboarding, and vision alignment",
                "On-location crew direction, camera positioning, and lighting setup",
                "Direct client communication and live shoot coordination",
                "Flawless on-set workflow management from concept to wrap"
            ],
            bestFor: "Shoots requiring professional creative direction and on-set management."
        },
        {
            number: "05",
            title: "Post-Production & Video Editing",
            category: "Post-Production",
            deliverables: [
                "Professional editing in Adobe Premiere Pro and DaVinci Resolve",
                "Multi-cam timeline synchronization and raw footage organization",
                "Cinematic color grading, skin tone enhancement, and film look LUTs",
                "Sound design, audio cleanup, and master export in multiple aspect ratios"
            ],
            bestFor: "Clients with raw footage seeking high-end cinema polish."
        }
    ],

    // Client Testimonials
    testimonials: [
        {
            id: "test-01",
            clientName: "Arjun & Sneha",
            role: "Wedding Couple, Bengaluru",
            quote: "Mohamed Ashiq was phenomenal on our wedding day! His direction made us feel so comfortable, and the final film edited on DaVinci Resolve looked like a movie from the big screen. We keep rewatching it!",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "test-02",
            clientName: "Rohit Verma",
            role: "Event Organizer, Bengaluru",
            quote: "Outstanding speed and aesthetic sense. Ashiq captured every highlight of our 2-day festival and turned it into viral reels that boosted our social engagement significantly.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "test-03",
            clientName: "Priya & Farhan",
            role: "Pre-Wedding & Wedding Film",
            quote: "Delivered 50+ wedding films experience really shows! From managing the on-site team to the subtle color grading and music selection, Ashiq is our go-to videographer.",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
        }
    ],

    // Instagram / Darkroom Feed
    instagramFeed: [
        { image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", caption: "Wedding film teaser #DaVinciResolve @askie._", likes: "1.4k" },
        { image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80", caption: "Bridal glow in golden hour light @askie._", likes: "2.1k" },
        { image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", caption: "Bengaluru night street commercial shoot @askie._", likes: "3.8k" },
        { image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", caption: "Sunset pre-wedding frames @askie._", likes: "1.9k" },
        { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", caption: "Color grading session in DaVinci Resolve @askie._", likes: "2.6k" },
        { image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80", caption: "Sangeet celebration energy @askie._", likes: "4.2k" }
    ]
};

// Export for module or global browser use
if (typeof window !== "undefined") {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
