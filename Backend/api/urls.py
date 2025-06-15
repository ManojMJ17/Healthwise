from django.urls import path
from .views import register, login, get_profile_details, update_profile

urlpatterns = [
    path('register/', register, name='register'),  
    path('login/', login, name='login'), 
    path('get-profile-details/', get_profile_details),
    path('update-profile/', update_profile),
]