from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('me/', views.me, name='me'),
    path('stats/', views.user_stats, name='user_stats'),
    path('profile/', views.update_profile, name='update_profile'),
    path('logout/', views.logout_view, name='logout'),
    path('send-otp/', views.send_otp, name='send_otp'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
]
