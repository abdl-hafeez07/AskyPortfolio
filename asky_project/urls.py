"""
asky_project URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Admin header & title customization
admin.site.site_header = "Mohamed Ashiq CM • Portfolio CMS"
admin.site.site_title = "ASKY Admin Portal"
admin.site.index_title = "Portfolio Management System"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
