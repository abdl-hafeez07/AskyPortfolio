import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import (
    Profile, Experience, Education, Skill,
    Service, Project, GalleryItem, VideoReel,
    Testimonial, ContactMessage
)

def get_active_profile():
    """Helper to return the primary active profile with fallback"""
    profile = Profile.objects.filter(is_active=True).first()
    if not profile:
        profile = Profile.objects.first()
    return profile

def get_portfolio_json_data():
    """Serialize all database records into complete, structured JSON matching frontend expectations"""
    profile = get_active_profile()
    
    profile_data = {
        'fullName': profile.full_name if profile else "Mohamed Ashiq CM",
        'brandName': profile.brand_name if profile else "ASKY",
        'role': profile.professional_title if profile else "Videographer & Video Editor",
        'location': profile.location if profile else "Bengaluru, India",
        'phone': profile.phone if profile else "9061733155",
        'email': profile.email if profile else "ashiqchangal@gmail.com",
        'whatsapp': profile.whatsapp_number if profile else "919061733155",
        'instagram': profile.instagram_handle if profile else "@askie._",
        'instagramUrl': profile.instagram_url if profile else "https://instagram.com/askie._",
        'youtubeUrl': profile.youtube_url if profile else "",
        'linkedinUrl': profile.linkedin_url if profile else "",
        'shortBio': profile.short_bio if profile else "",
        'heroHeadline': profile.hero_headline if profile else "",
        'heroSubheadline': profile.hero_subheadline if profile else "",
        'heroImage': profile.hero_image_src if profile else "/static/img/IMG_1013.JPG",
        'profilePhoto': profile.profile_photo_src if profile else "/static/img/mohamed_ashiq.jpeg",
        'resumeUrl': profile.resume_file.url if profile and profile.resume_file else "",
        'experienceYears': profile.experience_years if profile else "3+",
        'weddingFilmsDelivered': profile.wedding_films_delivered if profile else 50,
        'clientSatisfactionRate': profile.client_satisfaction_rate if profile else 99,
        'awardsCount': profile.awards_count if profile else 5,
    }

    projects_data = []
    for p in Project.objects.all():
        gallery = [img.image_src for img in p.gallery_images.all()]
        if not gallery and p.image_src:
            gallery = [p.image_src]
        projects_data.append({
            'id': f"proj-{p.id}",
            'title': p.title,
            'subtitle': p.subtitle,
            'category': p.get_category_display(),
            'categorySlug': p.category.lower(),
            'year': p.year,
            'location': p.location,
            'focalLength': p.focal_length,
            'aspectRatio': p.aspect_ratio,
            'coverImage': p.image_src,
            'videoTeaser': p.video_src,
            'client': p.client,
            'overview': p.overview,
            'awards': p.awards,
            'gallery': gallery,
            'isFeatured': p.is_featured,
        })

    reels_data = []
    for r in VideoReel.objects.all():
        reels_data.append({
            'id': f"reel-{r.id}",
            'title': r.title,
            'category': r.category,
            'duration': r.duration,
            'client': r.client_name,
            'videoUrl': r.video_src,
            'videoTeaser': r.video_src,
            'thumbnail': r.thumbnail_src,
            'aspectRatio': r.aspect_ratio,
            'isFeatured': r.is_featured,
        })

    # photographyItems for the Still Gallery and Homepage Continuous Collage
    photography_items = []
    for idx, g in enumerate(GalleryItem.objects.all()):
        photography_items.append({
            'id': f"gallery-{g.id}",
            'title': g.title,
            'category': g.category,
            'categoryLabel': g.get_category_display(),
            'image': g.image_src,
            'location': g.location,
            'year': g.year,
            'lens': g.camera_spec,
            'specs': g.camera_spec,
            'aspectRatio': g.aspect_type,
            'frameNum': f"FR // {str(idx + 1).zfill(3)}",
        })

    testimonials_data = []
    for t in Testimonial.objects.all():
        testimonials_data.append({
            'id': f"test-{t.id}",
            'clientName': t.client_name,
            'role': t.client_role,
            'project': t.project_title,
            'rating': t.rating,
            'quote': t.comment,
            'avatar': t.avatar_src,
        })

    services_data = []
    for s in Service.objects.all():
        services_data.append({
            'id': f"service-{s.id}",
            'title': s.title,
            'category': s.get_category_display(),
            'icon': s.icon,
            'description': s.description,
            'features': s.get_features_list(),
            'badgeLabel': s.badge_label,
            'isFeatured': s.is_featured,
        })

    skills_data = []
    for sk in Skill.objects.all():
        skills_data.append({
            'id': f"skill-{sk.id}",
            'name': sk.name,
            'category': sk.category,
            'categoryDisplay': sk.get_category_display(),
            'proficiency': sk.proficiency_percent,
            'badgeColor': sk.badge_color,
            'isFeatured': sk.is_featured,
        })

    return {
        'profile': profile_data,
        'featuredProjects': projects_data,
        'projects': projects_data,
        'videoReels': reels_data,
        'reels': reels_data,
        'photographyItems': photography_items,
        'gallery': photography_items,
        'testimonials': testimonials_data,
        'services': services_data,
        'skills': skills_data,
    }

def home_view(request):
    """Main portfolio landing page view"""
    profile = get_active_profile()
    experiences = Experience.objects.all()
    educations = Education.objects.all()
    skills = Skill.objects.all()
    services = Service.objects.all()
    featured_projects = Project.objects.filter(is_featured=True)
    if not featured_projects.exists():
        featured_projects = Project.objects.all()
    gallery_items = GalleryItem.objects.all()
    video_reels = VideoReel.objects.all()
    testimonials = Testimonial.objects.all()

    # Skills grouped by category for clear presentation
    software_skills = skills.filter(category='SOFTWARE')
    videography_skills = skills.filter(category__in=['VIDEOGRAPHY', 'PRODUCTION', 'MANAGEMENT'])

    portfolio_data_dict = get_portfolio_json_data()

    context = {
        'profile': profile,
        'experiences': experiences,
        'educations': educations,
        'skills': skills,
        'software_skills': software_skills,
        'videography_skills': videography_skills,
        'services': services,
        'featured_projects': featured_projects,
        'gallery_items': gallery_items,
        'video_reels': video_reels,
        'testimonials': testimonials,
        'portfolio_data_json': json.dumps(portfolio_data_dict),
    }
    return render(request, 'index.html', context)


def gallery_view(request):
    """Dedicated full-page visual gallery and still archive - Mohamed Ashiq CM"""
    profile = get_active_profile()
    gallery_items = GalleryItem.objects.all()
    featured_projects = Project.objects.all()
    portfolio_data_dict = get_portfolio_json_data()

    context = {
        'profile': profile,
        'gallery_items': gallery_items,
        'featured_projects': featured_projects,
        'portfolio_data_json': json.dumps(portfolio_data_dict),
    }
    return render(request, 'gallery.html', context)


@csrf_exempt
@require_POST
def contact_submit(request):
    """Handle booking/contact form submission via AJAX or standard POST"""
    try:
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            phone = data.get('phone', '').strip()
            event_type = data.get('eventType', data.get('event_type', '')).strip()
            event_date = data.get('eventDate', data.get('event_date', '')).strip()
            budget = data.get('budget', '').strip()
            message = data.get('message', '').strip()
        else:
            name = request.POST.get('name', '').strip()
            email = request.POST.get('email', '').strip()
            phone = request.POST.get('phone', '').strip()
            event_type = request.POST.get('event_type', request.POST.get('eventType', '')).strip()
            event_date = request.POST.get('event_date', request.POST.get('eventDate', '')).strip()
            budget = request.POST.get('budget', '').strip()
            message = request.POST.get('message', '').strip()

        if not name or not email:
            return JsonResponse({
                'status': 'error',
                'message': 'Please provide at least your name and email address.'
            }, status=400)

        inquiry = ContactMessage.objects.create(
            name=name,
            email=email,
            phone=phone,
            event_type=event_type,
            event_date=event_date,
            budget=budget,
            message=message
        )

        return JsonResponse({
            'status': 'success',
            'message': f'Thank you {name}! Your inquiry has been received. Mohamed Ashiq will get in touch with you shortly.',
            'inquiry_id': inquiry.id
        })
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': f'An error occurred while submitting your message: {str(e)}'
        }, status=500)


def api_portfolio_data(request):
    """JSON API endpoint returning all portfolio data for dynamic clients"""
    return JsonResponse(get_portfolio_json_data())
