from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('gallery/', views.gallery_view, name='gallery'),
    path('gallery.html', views.gallery_view, name='gallery_html'),
    path('api/contact/', views.contact_submit, name='contact_submit'),
    path('contact/submit/', views.contact_submit, name='contact_submit_alt'),
    path('api/data/', views.api_portfolio_data, name='api_data'),
]
