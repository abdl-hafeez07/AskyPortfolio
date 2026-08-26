from django.db import models
from django.utils import timezone

class Profile(models.Model):
    """Personal & Professional Profile for Mohamed Ashiq CM"""
    full_name = models.CharField(max_length=150, default="Mohamed Ashiq CM")
    brand_name = models.CharField(max_length=100, default="ASKY")
    professional_title = models.CharField(max_length=200, default="Videographer & Video Editor")
    short_bio = models.TextField(
        default="Videographer and Video Editor with hands-on experience in wedding videography, content creation, and video post-production. Skilled in directing video shoots, managing on-site production teams, and coordinating with clients from concept to final delivery. Experienced in social media content creation, event coordination, and team communication."
    )
    hero_headline = models.CharField(max_length=200, default="Capturing The Poetry of Light & Cinematic Stories")
    hero_subheadline = models.TextField(
        default="Specializing in emotive wedding films, dynamic social content, and precision post-production edited with DaVinci Resolve & Premiere Pro."
    )
    location = models.CharField(max_length=150, default="Bengaluru, India")
    phone = models.CharField(max_length=30, default="9061733155")
    email = models.EmailField(default="ashiqchangal@gmail.com")
    whatsapp_number = models.CharField(max_length=30, default="919061733155", blank=True)
    instagram_handle = models.CharField(max_length=100, default="@askie._")
    instagram_url = models.URLField(default="https://instagram.com/askie._", blank=True)
    youtube_url = models.URLField(blank=True, default="")
    linkedin_url = models.URLField(blank=True, default="")
    
    # Career Stats
    experience_start_year = models.IntegerField(default=2022)
    wedding_films_delivered = models.IntegerField(default=50)
    client_satisfaction_rate = models.IntegerField(default=99)
    awards_count = models.IntegerField(default=5)
    
    # Assets
    profile_photo = models.ImageField(upload_to='profile/', blank=True, null=True)
    profile_photo_url = models.URLField(blank=True, default="")
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Personal Profile"
        verbose_name_plural = "Personal Profile"

    def __str__(self):
        return f"{self.full_name} ({self.brand_name})"

    @property
    def experience_years(self):
        current_year = timezone.now().year
        return f"{max(1, current_year - self.experience_start_year)}+"


class Experience(models.Model):
    """Career timeline entries"""
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=150, default="Bengaluru, India")
    duration = models.CharField(max_length=100, help_text="e.g. 2022 – Present or August 2025 – September 2025")
    duration_length = models.CharField(max_length=100, blank=True, help_text="e.g. 1 Month or 3+ Years")
    achievement = models.CharField(max_length=300, blank=True)
    responsibilities = models.TextField(help_text="Enter key points separated by newlines")
    is_current = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-id']
        verbose_name = "Work Experience"
        verbose_name_plural = "Work Experiences"

    def __str__(self):
        return f"{self.role} at {self.company} ({self.duration})"

    def get_responsibilities_list(self):
        return [r.strip() for r in self.responsibilities.split('\n') if r.strip()]


class Education(models.Model):
    """Educational qualifications"""
    degree = models.CharField(max_length=250, default="Bachelor of Hospital Administration (BHA)")
    institution = models.CharField(max_length=250, default="Yenepoya School of Allied Health Sciences, Mangalore")
    period = models.CharField(max_length=100, default="2023 – 2026")
    description = models.TextField(blank=True, default="Comprehensive management, communication, and operational leadership training.")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-id']
        verbose_name = "Education"
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Skill(models.Model):
    """Skills & Tooling"""
    CATEGORY_CHOICES = [
        ('SOFTWARE', 'Software & Post-Production'),
        ('VIDEOGRAPHY', 'Videography & Cinematography'),
        ('PRODUCTION', 'Production & Directing'),
        ('MANAGEMENT', 'Management & Communication'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='VIDEOGRAPHY')
    proficiency_percent = models.IntegerField(default=90)
    badge_color = models.CharField(max_length=30, default="gold", blank=True)
    is_featured = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'display_order', 'name']
        verbose_name = "Skill & Expertise"
        verbose_name_plural = "Skills & Expertise"

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Service(models.Model):
    """Services offered to clients"""
    CATEGORY_CHOICES = [
        ('VIDEOGRAPHY', 'Videography'),
        ('PRODUCTION', 'Video Production'),
        ('POST_PRODUCTION', 'Post-Production'),
    ]
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='VIDEOGRAPHY')
    icon = models.CharField(max_length=50, default="film", help_text="e.g. film, camera, video, edit, aperture, zap")
    description = models.TextField()
    features = models.TextField(help_text="Features separated by newlines")
    badge_label = models.CharField(max_length=50, blank=True, default="")
    is_featured = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Service Offering"
        verbose_name_plural = "Service Offerings"

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

    def get_features_list(self):
        return [f.strip() for f in self.features.split('\n') if f.strip()]


class Project(models.Model):
    """Featured Films and Projects"""
    CATEGORY_CHOICES = [
        ('WEDDING', 'Wedding Film & Highlights'),
        ('CINEMATIC', 'Cinematic Film'),
        ('EVENT', 'Event Videography'),
        ('COMMERCIAL', 'Commercial & Brand'),
        ('REEL', 'Social Media Reel'),
    ]
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=250, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='WEDDING')
    year = models.CharField(max_length=10, default="2025")
    location = models.CharField(max_length=150, default="Bengaluru, India")
    client = models.CharField(max_length=150, blank=True)
    focal_length = models.CharField(max_length=100, default="35mm & 50mm Prime", blank=True)
    aspect_ratio = models.CharField(max_length=50, default="2.39:1 CinemaScope", blank=True)
    cover_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    cover_image_url = models.URLField(blank=True, default="")
    video_url = models.URLField(blank=True, default="", help_text="Direct MP4 URL or YouTube/Vimeo link")
    overview = models.TextField(blank=True)
    awards = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-created_at']
        verbose_name = "Featured Project"
        verbose_name_plural = "Featured Projects"

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

    @property
    def image_src(self):
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url or "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"


class ProjectGalleryImage(models.Model):
    """Additional frames for a project"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='project_gallery/', blank=True, null=True)
    image_url = models.URLField(blank=True, default="")
    caption = models.CharField(max_length=200, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    @property
    def image_src(self):
        if self.image:
            return self.image.url
        return self.image_url


class GalleryItem(models.Model):
    """Photography & Film Still Gallery with category filtering"""
    CATEGORY_CHOICES = [
        ('wedding', 'Wedding Photography'),
        ('events', 'Events'),
        ('portraits', 'Portraits'),
        ('commercial', 'Commercial'),
    ]
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='wedding')
    location = models.CharField(max_length=150, default="Bengaluru, India", blank=True)
    year = models.CharField(max_length=10, default="2025", blank=True)
    camera_spec = models.CharField(max_length=150, default="Sony Cinema / 50mm T1.4", blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.URLField(blank=True, default="")
    aspect_type = models.CharField(
        max_length=30,
        choices=[('portrait', 'Portrait Tall (4:5)'), ('landscape', 'Landscape Wide (16:9)'), ('square', 'Square (1:1)')],
        default='landscape'
    )
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-id']
        verbose_name = "Photography / Still Item"
        verbose_name_plural = "Photography / Still Gallery"

    def __str__(self):
        return f"{self.title} [{self.get_category_display()}]"

    @property
    def image_src(self):
        if self.image:
            return self.image.url
        return self.image_url or "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"


class VideoReel(models.Model):
    """Video reels and cinematic short showcase"""
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default="Wedding Cinema")
    duration = models.CharField(max_length=30, default="01:30")
    client_name = models.CharField(max_length=150, blank=True)
    video_url = models.URLField(help_text="Direct MP4 URL, YouTube, or Vimeo")
    thumbnail = models.ImageField(upload_to='video_reels/', blank=True, null=True)
    thumbnail_url = models.URLField(blank=True, default="")
    aspect_ratio = models.CharField(max_length=30, default="16:9 Cinema", blank=True)
    is_featured = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-id']
        verbose_name = "Video Reel"
        verbose_name_plural = "Video Reels"

    def __str__(self):
        return f"{self.title} ({self.duration})"

    @property
    def thumbnail_src(self):
        if self.thumbnail:
            return self.thumbnail.url
        return self.thumbnail_url or "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"


class Testimonial(models.Model):
    """Client feedback & testimonials"""
    client_name = models.CharField(max_length=150)
    client_role = models.CharField(max_length=150, default="Wedding Client")
    project_title = models.CharField(max_length=200, blank=True)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    avatar_url = models.URLField(blank=True, default="")
    is_featured = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-id']
        verbose_name = "Client Testimonial"
        verbose_name_plural = "Client Testimonials"

    def __str__(self):
        return f"{self.client_name} ({self.client_role})"


class ContactMessage(models.Model):
    """Inquiries sent from the portfolio booking / contact form"""
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    event_type = models.CharField(max_length=100, blank=True)
    event_date = models.CharField(max_length=100, blank=True)
    budget = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Client Inquiry"
        verbose_name_plural = "Client Inquiries"

    def __str__(self):
        return f"Inquiry from {self.name} ({self.email}) - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
