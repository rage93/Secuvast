#src/profiles/views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.urls import reverse
User = get_user_model()



from .forms import (
    BasicInfoForm, VisibilityForm,
    TwoFactorForm, PasswordChangeForm,
)
# ─────────────────────────────────────────────────────────────
# PERFIL - PÁGINA PRINCIPAL (My Profile)
# ─────────────────────────────────────────────────────────────
@login_required
def user_profile(request):
    """
    Perfil del usuario autenticado.  Solo muestra la plantilla estática
    por ahora; más adelante podrás pasar un formulario para editar datos.
    """
    return render(request, "profile/user_profile.html")



@login_required
def profile_list_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("user_list")
    else:
        form = UserCreationForm()

    context = {
        "object_list": User.objects.filter(is_active=True),
        "form": form,
    }
    return render(request, "profiles/list.html", context)


@login_required
def profile_detail_view(request, username=None):
    profile_user_obj = get_object_or_404(User, username=username)
    is_me = profile_user_obj == request.user
    context = {
        "object": profile_user_obj,
        "instance": profile_user_obj,
        "owner": is_me,
    }
    return render(request, "profiles/detail.html", context)


@login_required
def profile_edit_view(request):
    profile = request.user.profile
    if request.method == "POST":
        # ¿Desde qué formulario llegó?
        if "basic_info_submit" in request.POST:
            basic_form = BasicInfoForm(
                request.POST, request.FILES,
                instance=profile, user=request.user
            )
            if basic_form.is_valid():
                basic_form.save()
                messages.success(request, "Datos actualizados correctamente.")
                return redirect(request.path)  # evita re-POST
        elif "visibility_submit" in request.POST:
            vis_form = VisibilityForm(request.POST, instance=profile)
            if vis_form.is_valid():
                vis_form.save()
                messages.info(request, "Visibilidad actualizada.")
                return redirect(request.path)
        elif "2fa_submit" in request.POST:
            two_form = TwoFactorForm(request.POST, instance=profile)
            if two_form.is_valid():
                two_form.save()
                messages.info(request, "Preferencia 2FA guardada.")
                return redirect(request.path)
        elif "password_submit" in request.POST:
            pwd_form = PasswordChangeForm(user=request.user, data=request.POST)
            if pwd_form.is_valid():
                pwd_form.save()
                messages.success(request, "Contraseña cambiada.")
                return redirect(request.path)
    else:
        basic_form = BasicInfoForm(instance=profile, user=request.user)
        vis_form = VisibilityForm(instance=profile)
        two_form = TwoFactorForm(instance=profile)
        pwd_form = PasswordChangeForm(user=request.user)

    context = {
        "basic_form": basic_form,
        "vis_form": vis_form,
        "two_form": two_form,
        "pwd_form": pwd_form,
        # para no romper tu template actual:
        "profile": profile,
        "segment": "settings",
        "parent": "accounts",
    }
    return render(request, "profiles/profile.html", context)