#src/profiles/views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.urls import reverse
User = get_user_model()



from .forms import (
    BasicInfoForm, ContactForm, PreferencesForm,
    VisibilityForm, TwoFactorForm, PasswordChangeForm,
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
    forms_map = {
        "basic": BasicInfoForm,
        "contact": ContactForm,
        "preferences": PreferencesForm,
        "visibility": VisibilityForm,
        "twofactor": TwoFactorForm,
        "password": PasswordChangeForm,
    }

    section = request.POST.get("_section", request.GET.get("tab", "basic"))
    form_cls = forms_map.get(section, BasicInfoForm)

    def init_form(cls, **kwargs):
        if cls is PasswordChangeForm:
            return cls(user=request.user, **kwargs)
        params = {"instance": profile}
        if "user" in cls.__init__.__code__.co_varnames:
            params["user"] = request.user
        params.update(kwargs)
        return cls(**params)

    form = init_form(form_cls, data=request.POST or None, files=request.FILES or None)

    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Cambios guardados.")
        return redirect(f"{request.path}?tab={section}")

    context = {name + "_form": init_form(cls)
               for name, cls in forms_map.items()}
    context["active_tab"] = section
    context.update({
        "profile": profile,
        "segment": "settings",
        "parent": "accounts",
    })
    return render(request, "profiles/profile.html", context)