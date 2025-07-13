# src/profiles/urls.py
from django.urls import path
from . import views

app_name = "profiles"

urlpatterns = [
    #  /profiles/me/  → PERFIL del usuario autenticado
    path("me/", views.profile_edit_view, name="user_profile"),

    #  /profiles/           → listado
    path("", views.profile_list_view,   name="user_list"),

    #  /profiles/<username>/ → detalle público
    path("<str:username>/", views.profile_detail_view, name="profile_detail"),
]
