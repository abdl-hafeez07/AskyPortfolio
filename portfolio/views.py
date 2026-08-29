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
    }
    return render(request, 'index.html', context)


def gallery_view(request):
    """Dedicated full-page visual gallery and still archive - Mohamed Ashiq CM"""
    profile = get_active_profile()
    gallery_items = GalleryItem.objects.all()
    featured_projects = Project.objects.all()

    context = {
        'profile': profile,
        'gallery_items': gallery_items,
        'featured_projects': featured_projects,
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
    profile = get_active_profile()
    
    profile_data = {
        'fullName': profile.full_name if profile else "Mohamed Ashiq CM",
        'brandName': profile.brand_name if profile else "ASKY",
        'role': profile.professional_title if profile else "Videographer & Video Editor",
        'location': profile.location if profile else "Bengaluru, India",
        'phone': profile.phone if profile else "9061733155",
        'email': profile.email if profile else "ashiqchangal@gmail.com",
        'instagram': profile.instagram_handle if profile else "@askie._",
        'instagramUrl': profile.instagram_url if profile else "https://instagram.com/askie._",
        'shortBio': profile.short_bio if profile else "",
        'experienceYears': profile.experience_years if profile else "3+",
        'weddingFilmsDelivered': profile.wedding_films_delivered if profile else 50,
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
            'year': p.year,
            'location': p.location,
            'focalLength': p.focal_length,
            'aspectRatio': p.aspect_ratio,
            'coverImage': p.image_src,
            'videoTeaser': p.video_url,
            'client': p.client,
            'overview': p.overview,
            'awards': p.awards,
            'gallery': gallery,
        })

    gallery_data = []
    for g in GalleryItem.objects.all():
        gallery_data.append({
            'id': f"gallery-{g.id}",
            'title': g.title,
            'category': g.category,
            'image': g.image_src,
            'location': g.location,
            'year': g.year,
            'specs': g.camera_spec,
            'aspect': g.aspect_type,
        })

    return JsonResponse({
        'profile': profile_data,
        'projects': projects_data,
        'gallery': gallery_data,
    })
