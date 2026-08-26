from django.contrib import admin
from django.utils.html import format_html
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
            'fields': ('profile_photo', 'profile_photo_url', 'resume_file')
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
    list_display = ('title', 'category', 'year', 'client', 'location', 'is_featured', 'display_order')
    list_editable = ('is_featured', 'display_order')
    list_filter = ('category', 'is_featured', 'year')
    search_fields = ('title', 'subtitle', 'client', 'overview')
    inlines = [ProjectGalleryImageInline]


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'year', 'aspect_type', 'display_order', 'image_preview')
    list_editable = ('category', 'aspect_type', 'display_order')
    list_filter = ('category', 'aspect_type')
    search_fields = ('title', 'location', 'camera_spec')

    def image_preview(self, obj):
        src = obj.image_src
        if src:
            return format_html('<img src="{}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;" />', src)
        return "-"
    image_preview.short_description = "Preview"


@admin.register(VideoReel)
class VideoReelAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'duration', 'client_name', 'is_featured', 'display_order')
    list_editable = ('is_featured', 'display_order')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'client_name')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'project_title', 'rating', 'is_featured', 'display_order')
    list_editable = ('rating', 'is_featured', 'display_order')
    list_filter = ('rating', 'is_featured')
    search_fields = ('client_name', 'comment')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'event_type', 'event_date', 'budget', 'created_at', 'is_read')
    list_editable = ('is_read',)
    list_filter = ('is_read', 'event_type', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('name', 'email', 'phone', 'event_type', 'event_date', 'budget', 'message', 'created_at')
