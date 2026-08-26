from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import (
    Profile, Experience, Education, Skill,
    Service, Project, ProjectGalleryImage,
    GalleryItem, VideoReel, Testimonial
)

class Command(BaseCommand):
    help = "Seed database with Mohamed Ashiq CM portfolio information, experiences, services, and default admin"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("[*] Seeding Mohamed Ashiq CM Portfolio Database..."))

        # 1. Profile
        Profile.objects.all().delete()
        profile = Profile.objects.create(
            full_name="Mohamed Ashiq CM",
            brand_name="ASKY",
            professional_title="Videographer & Video Editor",
            short_bio=(
                "Videographer and Video Editor with hands-on experience in wedding videography, "
                "content creation, and video post-production. Skilled in directing video shoots, "
                "managing on-site production teams, and coordinating with clients from concept to "
                "final delivery. Experienced in social media content creation, event coordination, "
                "and team communication."
            ),
            hero_headline="Capturing The Poetry of Light & Cinematic Stories",
            hero_subheadline=(
                "Freelance Videographer & Editor specializing in emotive wedding films, "
                "brand content, and precision post-production on DaVinci Resolve & Premiere Pro."
            ),
            location="Bengaluru, India",
            phone="9061733155",
            email="ashiqchangal@gmail.com",
            whatsapp_number="919061733155",
            instagram_handle="@askie._",
            instagram_url="https://www.instagram.com/askie._?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
            youtube_url="",
            linkedin_url="",
            experience_start_year=2022,
            wedding_films_delivered=50,
            client_satisfaction_rate=100,
            awards_count=5,
            profile_photo_url="/media/uploads/IMG_1011.JPG.jpeg",
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS("[OK] Profile created"))

        # 2. Experiences
        Experience.objects.all().delete()
        exp1 = Experience.objects.create(
            role="Freelance Videographer & Content Creator",
            company="Self-Employed",
            location="Bengaluru & Pan-India",
            duration="2022 – Present",
            duration_length="2+ Years",
            achievement="Directed and edited projects for multiple clients and delivered 50+ wedding films",
            responsibilities=(
                "Directed on-location shoots for weddings, brands, and creative campaigns.\n"
                "Created ongoing high-engagement content for clients' social media platforms.\n"
                "Managed end-to-end client communication and creative vision throughout production.\n"
                "Ensured high-standard cinematic projects were delivered consistently on schedule."
            ),
            is_current=True,
            display_order=1
        )

        exp2 = Experience.objects.create(
            role="Video Editing Intern",
            company="Lenzpire Media",
            location="Bengaluru, India",
            duration="August 2025 – September 2025",
            duration_length="1 Month",
            achievement="Supported post-production across commercial and creative video pipelines",
            responsibilities=(
                "Supported senior editing teams with cutting-edge post-production workflows.\n"
                "Organized and transcoded extensive multi-camera raw footage archives.\n"
                "Assisted in pacing, audio synchronization, and color grading passes.\n"
                "Mastered industry-standard production workflows from filming through final export."
            ),
            is_current=False,
            display_order=2
        )
        self.stdout.write(self.style.SUCCESS("[OK] Work Experiences created"))

        # 3. Education
        Education.objects.all().delete()
        Education.objects.create(
            degree="Bachelor of Hospital Administration (BHA)",
            institution="Yenepoya School of Allied Health Sciences, Mangalore",
            period="2023 - 2026",
            description="Developing strong organizational management, team coordination, logistics planning, and executive communication skills.",
            display_order=1
        )
        self.stdout.write(self.style.SUCCESS("[OK] Education created"))

        # 4. Skills
        Skill.objects.all().delete()
        skills_data = [
            # Software
            ("Adobe Premiere Pro", "SOFTWARE", 95, 1),
            ("DaVinci Resolve", "SOFTWARE", 92, 2),
            ("Color Grading & LUTs", "SOFTWARE", 90, 3),
            ("Audio Mastering & Sound Design", "SOFTWARE", 85, 4),
            # Videography & Cinematography
            ("Wedding Videography", "VIDEOGRAPHY", 98, 5),
            ("Cinematography & Framing", "VIDEOGRAPHY", 92, 6),
            ("Event Videography", "VIDEOGRAPHY", 90, 7),
            ("Lighting & Gimbal Operation", "VIDEOGRAPHY", 88, 8),
            # Production & Directing
            ("Video Directing & Vision", "PRODUCTION", 90, 9),
            ("On-Location Production", "PRODUCTION", 92, 10),
            ("Social Media Content Creation", "PRODUCTION", 95, 11),
            ("Reels & Shorts Production", "PRODUCTION", 94, 12),
            # Management
            ("Client Communication", "MANAGEMENT", 96, 13),
            ("Event Coordination & Logistics", "MANAGEMENT", 90, 14),
            ("Production Team Management", "MANAGEMENT", 88, 15),
        ]
        for name, category, prof, order in skills_data:
            Skill.objects.create(
                name=name,
                category=category,
                proficiency_percent=prof,
                display_order=order,
                is_featured=True
            )
        self.stdout.write(self.style.SUCCESS("[OK] Skills & Tooling created"))

        # 5. Services
        Service.objects.all().delete()
        services_data = [
            (
                "Wedding Films & Highlights",
                "VIDEOGRAPHY",
                "film",
                "Cinematic wedding films that capture intimate emotion, traditional grandeur, and joyous celebrations with movie-grade storytelling.",
                "Full-day on-location cinematic coverage\n4K Ultra-HD Multi-camera recording\nEmotive teaser trailer + Full feature film\nBespoke color grading & licensed soundtrack",
                "Most Requested",
                1
            ),
            (
                "Cinematic Event Videography",
                "VIDEOGRAPHY",
                "camera",
                "Dynamic video coverage for private celebrations, gala events, music performances, and corporate functions.",
                "High-frame rate slow-motion captures\nCrisp multi-source audio recording\nSame-day / Fast-turnaround teaser reel\nHighlight recap film for social & archive",
                "Popular",
                2
            ),
            (
                "Social Media Content Creation & Reels",
                "PRODUCTION",
                "zap",
                "Viral, high-retention 9:16 vertical reels and shorts engineered for Instagram, YouTube, and brand visibility.",
                "Trend-aware dynamic editing & transitions\nHook-first visual pacing\nOptimized typography & captions\nBatch production workflows for creators & brands",
                "High Impact",
                3
            ),
            (
                "Video Direction & On-Location Production",
                "PRODUCTION",
                "video",
                "Complete on-set leadership guiding talent, camera setups, lighting, and timeline execution from concept to wrap.",
                "Pre-production shot-listing & storyboarding\nOn-location crew & camera direction\nClient coordination & live monitoring\nSeamless execution under tight schedules",
                "",
                4
            ),
            (
                "Post-Production & Color Grading",
                "POST_PRODUCTION",
                "edit",
                "Precision editing in DaVinci Resolve & Premiere Pro, transforming raw footage into polished, cinema-grade deliverables.",
                "Multi-cam timeline synchronization\nCinematic film-emulation color grading\nDialogue cleanup & ambient sound design\nMaster export in all deliverable formats",
                "Studio Grade",
                5
            ),
            (
                "Client Project Management & Delivery",
                "PRODUCTION",
                "aperture",
                "Smooth, transparent communication ensuring your vision is brought to life on time and exceeding expectations.",
                "Detailed milestone scheduling\nCollaborative feedback reviews\nCloud delivery of 4K master files\nRaw footage archiving & backup",
                "",
                6
            ),
        ]
        for title, cat, icon, desc, feats, badge, order in services_data:
            Service.objects.create(
                title=title,
                category=cat,
                icon=icon,
                description=desc,
                features=feats,
                badge_label=badge,
                display_order=order,
                is_featured=True
            )
        self.stdout.write(self.style.SUCCESS("[OK] Services created"))

        # 6. Featured Projects
        Project.objects.all().delete()
        projects_data = [
            {
                "title": "Eternal Vows: Traditional Elegance",
                "subtitle": "Cinematic Luxury Wedding Film",
                "category": "WEDDING",
                "year": "2025",
                "location": "Bengaluru, Karnataka",
                "client": "Arjun & Sneha",
                "focal_length": "50mm T1.4 & 85mm Prime",
                "aspect_ratio": "2.39:1 CinemaScope",
                "cover_image_url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
                "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                "overview": "A 3-day lavish wedding film capturing regal rituals, golden hour vows, and energetic reception festivities. Directed and color graded in DaVinci Resolve.",
                "awards": "50+ Wedding Films Milestone",
                "display_order": 1,
                "gallery": [
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"
                ]
            },
            {
                "title": "Golden Hour Reverie",
                "subtitle": "Destination Pre-Wedding & Teaser",
                "category": "WEDDING",
                "year": "2025",
                "location": "Mysuru & Coorg Hills",
                "client": "Farhan & Ayesha",
                "focal_length": "35mm Prime - f/1.8",
                "aspect_ratio": "2.39:1 CinemaScope",
                "cover_image_url": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
                "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                "overview": "Scenic mist-covered hillscapes combined with intimate sunset strolls, featuring warm tones and emotive acoustic pacing.",
                "awards": "Client Choice Best Teaser",
                "display_order": 2,
                "gallery": [
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85"
                ]
            },
            {
                "title": "Urban Pulse: Brand Campaign",
                "subtitle": "High-Energy Commercial Reel",
                "category": "COMMERCIAL",
                "year": "2024",
                "location": "Bengaluru City",
                "client": "Lenzpire Media Collaboration",
                "focal_length": "24-70mm Cinema Zoom",
                "aspect_ratio": "16:9 4K UHD",
                "cover_image_url": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
                "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                "overview": "Fast-paced rhythmic commercial piece emphasizing dynamic motion, speed ramps, and vivid street lights.",
                "awards": "Commercial Showcase",
                "display_order": 3,
                "gallery": [
                    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
                    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=85"
                ]
            }
        ]

        for p_data in projects_data:
            gallery_urls = p_data.pop("gallery", [])
            proj = Project.objects.create(**p_data, is_featured=True)
            for idx, g_url in enumerate(gallery_urls):
                ProjectGalleryImage.objects.create(
                    project=proj,
                    image_url=g_url,
                    display_order=idx + 1
                )
        self.stdout.write(self.style.SUCCESS("[OK] Projects created"))

        # 7. Gallery Items
        GalleryItem.objects.all().delete()
        gallery_items = [
            ("Grand Mandap Vows", "wedding", "Bengaluru", "2025", "50mm - T1.4", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", "landscape", 1),
            ("Bridal Elegance", "wedding", "Bengaluru", "2025", "85mm - f/1.4", "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85", "portrait", 2),
            ("Sunset Couple Silhouette", "wedding", "Coorg", "2025", "35mm - f/2.0", "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", "square", 3),
            ("Sangeet Night Celebration", "events", "Bengaluru", "2024", "24mm - f/1.8", "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85", "landscape", 4),
            ("Festival Beats & Light", "events", "Mangalore", "2024", "50mm - f/1.4", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85", "portrait", 5),
            ("Chiaroscuro Studio Portrait", "portraits", "Bengaluru", "2025", "85mm - f/1.2", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85", "portrait", 6),
            ("Urban Street Glow", "commercial", "Bengaluru", "2024", "35mm - T2.0", "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85", "landscape", 7),
            ("Modern Cinematic Frame", "commercial", "Bengaluru", "2025", "50mm - T1.5", "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85", "portrait", 8),
        ]
        for title, cat, loc, yr, spec, img_url, aspect, order in gallery_items:
            GalleryItem.objects.create(
                title=title,
                category=cat,
                location=loc,
                year=yr,
                camera_spec=spec,
                image_url=img_url,
                aspect_type=aspect,
                display_order=order
            )
        self.stdout.write(self.style.SUCCESS("[OK] Gallery Items created"))

        # 8. Video Reels
        VideoReel.objects.all().delete()
        reels_data = [
            ("The Royal Bangalore Wedding", "Wedding Film", "02:15", "Aditya & Divya", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", 1),
            ("Pre-Wedding Cinematic Reel", "Teaser Reel", "00:60", "Rahul & Priya", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", 2),
            ("Urban Brand Story Reel", "Commercial", "01:10", "Lenzpire Creative", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85", 3),
        ]
        for title, cat, dur, cl, vurl, thumb, order in reels_data:
            VideoReel.objects.create(
                title=title,
                category=cat,
                duration=dur,
                client_name=cl,
                video_url=vurl,
                thumbnail_url=thumb,
                display_order=order,
                is_featured=True
            )
        self.stdout.write(self.style.SUCCESS("[OK] Video Reels created"))

        # 9. Testimonials
        Testimonial.objects.all().delete()
        testimonials_data = [
            ("Karthik & Ananya", "Wedding Couple", "Bangalore Wedding Film", 5, "Mohamed Ashiq was incredible on our wedding day! His direction made us feel so comfortable, and the final film edited in DaVinci Resolve looked like a high-budget cinema movie. We have watched it a hundred times!", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", 1),
            ("Rohit Verma", "Event Producer", "Corporate & Concert Gala", 5, "Outstanding professionalism and super fast turnaround. Ashiq knows how to capture the vibe of an event and turn it into engaging social media reels.", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", 2),
            ("Sameer Khan", "Creative Director", "Commercial Campaign", 5, "Top-tier video editing skills. His understanding of pacing, color grading, and music synchronization makes every cut impactful.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", 3),
        ]
        for name, role, proj, rating, comment, av, order in testimonials_data:
            Testimonial.objects.create(
                client_name=name,
                client_role=role,
                project_title=proj,
                rating=rating,
                comment=comment,
                avatar_url=av,
                display_order=order,
                is_featured=True
            )
        self.stdout.write(self.style.SUCCESS("[OK] Testimonials created"))

        # 10. Superuser Admin
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "ashiqchangal@gmail.com", "admin123")
            self.stdout.write(self.style.SUCCESS("[OK] Superuser created (Username: admin | Password: admin123)"))
        else:
            self.stdout.write(self.style.NOTICE("[INFO] Superuser 'admin' already exists"))

        self.stdout.write(self.style.SUCCESS("[SUCCESS] Successfully seeded all Mohamed Ashiq CM portfolio data!"))
