
from django.urls import path

from . import views

urlpatterns = [
    path("", views.profile_view),
    path("<str:username>/", views.profile_view),
]