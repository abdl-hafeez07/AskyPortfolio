from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('api/contact/', views.contact_submit, name='contact_submit'),
    path('api/data/', views.api_portfolio_data, name='api_data'),
]
