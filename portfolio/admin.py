from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import (
    Profile, Experience, Education, Skill,
    Service, Project, ProjectGalleryImage,
    GalleryItem, VideoReel, Testimonial, ContactMessage
)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'brand_name', 'professional_title', 'phone', 'email', 'location', 'experience_start_year', 'wedding_films_delivered', 'is_active')
    fieldsets = (
        ('Basic Information', {
            'fields': ('full_name', 'brand_name', 'professional_title', 'location', 'is_active')
        }),
        ('Biographies & Taglines', {
            'fields': ('short_bio', 'hero_headline', 'hero_subheadline')
        }),
        ('Contact & Social Media', {
            'fields': ('phone', 'email', 'whatsapp_number', 'instagram_handle', 'instagram_url', 'youtube_url', 'linkedin_url')
        }),
        ('Stats & Milestones', {
            'fields': ('experience_start_year', 'wedding_films_delivered', 'client_satisfaction_rate', 'awards_count')
        }),
        ('Media & Documents', {
            'fields': ('hero_image', 'hero_image_url', 'profile_photo', 'profile_photo_url', 'resume_file')
        }),
    )

    def has_add_permission(self, request):
        # Prevent creating multiple profiles if one already exists
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'location', 'duration', 'duration_length', 'is_current', 'display_order')
    list_editable = ('display_order', 'is_current')
    search_fields = ('role', 'company', 'responsibilities')
    list_filter = ('is_current', 'company')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'period', 'display_order')
    list_editable = ('display_order',)
    search_fields = ('degree', 'institution')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency_percent', 'is_featured', 'display_order')
    list_editable = ('proficiency_percent', 'is_featured', 'display_order')
    list_filter = ('category', 'is_featured')
    search_fields = ('name',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'icon', 'badge_label', 'is_featured', 'display_order')
    list_editable = ('is_featured', 'display_order')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'description', 'features')


class ProjectGalleryImageInline(admin.TabularInline):
    model = ProjectGalleryImage
    extra = 2
    fields = ('image', 'image_url', 'caption', 'display_order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year', 'thumbnail_preview', 'video_status', 'is_featured', 'display_order')
    list_editable = ('is_featured', 'display_order')
    list_filter = ('category', 'is_featured', 'year')
    search_fields = ('title', 'subtitle', 'client', 'overview')
    inlines = [ProjectGalleryImageInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'subtitle', 'category', 'year', 'client', 'location', 'is_featured', 'display_order')
        }),
        ('Video Upload & Source', {
            'fields': ('video_file', 'video_url'),
            'description': 'Upload an MP4/MOV video directly OR provide an external video URL.'
        }),
        ('Artwork & Thumbnail (PNG, JPG, WebP)', {
            'fields': ('cover_image', 'cover_image_url', 'focal_length', 'aspect_ratio', 'overview', 'awards'),
            'description': 'Upload your reel / film thumbnail directly (PNG / JPG / WebP supported).'
        }),
    )

    def thumbnail_preview(self, obj):
        src = obj.image_src
        if src:
            return format_html('<img src="{}" style="width: 54px; height: 36px; object-fit: cover; border-radius: 4px; border: 1px solid #d4af37;" />', src)
        return "-"
    thumbnail_preview.short_description = "Thumbnail"

    def video_status(self, obj):
        if obj.video_file:
            return mark_safe('<span style="color: #22c55e; font-weight: 600;">📁 Uploaded File</span>')
        elif obj.video_url:
            return mark_safe('<span style="color: #3b82f6; font-weight: 600;">🔗 External URL</span>')
        return mark_safe('<span style="color: #94a3b8;">No Video</span>')
    video_status.short_description = "Video Source"


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'year', 'aspect_type', 'image_preview', 'display_order')
    list_editable = ('category', 'aspect_type', 'display_order')
    list_filter = ('category', 'aspect_type')
    search_fields = ('title', 'location', 'camera_spec')
    fieldsets = (
        ('Frame Details', {
            'fields': ('title', 'category', 'location', 'year', 'camera_spec', 'aspect_type', 'display_order')
        }),
        ('Photo / Still Image', {
            'fields': ('image', 'image_url'),
            'description': 'Upload your high-resolution photograph or film still directly from your computer OR paste an external image URL.'
        }),
    )

    def image_preview(self, obj):
        src = obj.image_src
        if src:
            return format_html('<img src="{}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;" />', src)
        return "-"
    image_preview.short_description = "Preview"


@admin.register(VideoReel)
class VideoReelAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'duration', 'thumbnail_preview', 'video_status', 'is_featured', 'display_order')
    list_editable = ('is_featured', 'display_order')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'client_name')
    fieldsets = (
        ('Reel Details', {
            'fields': ('title', 'category', 'duration', 'client_name', 'aspect_ratio', 'is_featured', 'display_order')
        }),
        ('Video Upload & Source', {
            'fields': ('video_file', 'video_url'),
            'description': 'Upload your video file (MP4, WebM, MOV) directly from your computer OR paste an external video link.'
        }),
        ('Thumbnail / Poster Image (PNG, JPG, WebP)', {
            'fields': ('thumbnail', 'thumbnail_url'),
            'description': 'Upload a custom thumbnail image (PNG / JPG / WebP).'
        }),
    )

    def thumbnail_preview(self, obj):
        src = obj.thumbnail_src
        if src:
            return format_html('<img src="{}" style="width: 54px; height: 36px; object-fit: cover; border-radius: 4px; border: 1px solid #d4af37;" />', src)
        return "-"
    thumbnail_preview.short_description = "Thumbnail"

    def video_status(self, obj):
        if obj.video_file:
            return mark_safe('<span style="color: #22c55e; font-weight: 600;">📁 Uploaded File</span>')
        elif obj.video_url:
            return mark_safe('<span style="color: #3b82f6; font-weight: 600;">🔗 External URL</span>')
        return mark_safe('<span style="color: #94a3b8;">No Video</span>')
    video_status.short_description = "Video Source"


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'project_title', 'rating', 'avatar_preview', 'is_featured', 'display_order')
    list_editable = ('rating', 'is_featured', 'display_order')
    list_filter = ('rating', 'is_featured')
    search_fields = ('client_name', 'comment')
    fieldsets = (
        ('Client Information', {
            'fields': ('client_name', 'client_role', 'project_title', 'rating', 'is_featured', 'display_order')
        }),
        ('Feedback Message', {
            'fields': ('comment',)
        }),
        ('Client Avatar / Photo', {
            'fields': ('avatar', 'avatar_url')
        }),
    )

    def avatar_preview(self, obj):
        src = obj.avatar_src
        if src:
            return format_html('<img src="{}" style="width: 36px; height: 36px; object-fit: cover; border-radius: 50%;" />', src)
        return "-"
    avatar_preview.short_description = "Avatar"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'event_type', 'event_date', 'budget', 'created_at', 'is_read')
    list_editable = ('is_read',)
    list_filter = ('is_read', 'event_type', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('name', 'email', 'phone', 'event_type', 'event_date', 'budget', 'message', 'created_at')
