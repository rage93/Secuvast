# src/profiles/forms.py
from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordChangeForm as DjangoPwdForm

from .models import Profile

User = get_user_model()


# ------------------------------
#  A. Datos básicos del perfil
# ------------------------------
class BasicInfoForm(forms.ModelForm):
    # también editamos datos del propio User
    first_name = forms.CharField(max_length=150, required=False, label="Nombre")
    last_name  = forms.CharField(max_length=150, required=False, label="Apellidos")
    slug       = forms.SlugField(max_length=60, required=False, label="Slug")

    class Meta:
        model = Profile
        fields = [
            "first_name", "last_name", "slug",
            "gender", "birth_date",
            "location", "language", "skills",
        ]
        widgets = {
            "birth_date": forms.DateInput(attrs={"type": "date"}),
            "skills": forms.TextInput(
                attrs={"placeholder": "vuejs, angular, react"}
            ),
        }

    def __init__(self, *args, user=None, **kwargs):
        """ Cargamos datos iniciales del usuario (nombre, email)."""
        super().__init__(*args, **kwargs)
        self.user = user
        if user:
            self.fields["first_name"].initial = user.first_name
            self.fields["last_name"].initial  = user.last_name
            self.fields["slug"].initial       = getattr(user.profile, "slug", "")

    def save(self, commit=True):
        profile = super().save(commit=False)
        if commit:
            profile.save()
            if self.user:
                self.user.first_name = self.cleaned_data["first_name"]
                self.user.last_name  = self.cleaned_data["last_name"]
                if self.cleaned_data.get("slug"):
                    self.user.profile.slug = self.cleaned_data["slug"]
                self.user.save()
        return profile


# ------------------------------
#  B. Información de contacto
# ------------------------------
class ContactForm(forms.ModelForm):
    email = forms.EmailField(required=True, label="Correo")
    email2 = forms.EmailField(label="Confirma tu email")

    class Meta:
        model = Profile
        fields = ["email", "email2", "secondary_email", "phone"]

    def __init__(self, *args, user=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = user
        if user:
            self.fields["email"].initial = user.email

    def clean(self):
        cleaned = super().clean()
        if cleaned.get("email") != cleaned.get("email2"):
            raise forms.ValidationError("Los correos no coinciden.")
        return cleaned

    def save(self, commit=True):
        profile = super().save(commit=False)
        if commit:
            profile.save()
            if self.user:
                self.user.email = self.cleaned_data["email"]
                self.user.save()
        return profile


# ------------------------------
#  C. Preferencias del usuario
# ------------------------------
class PreferencesForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ["language", "timezone", "dark_mode", "newsletter_opt_in"]
        widgets = {
            "timezone": forms.TextInput(attrs={"placeholder": "UTC"}),
        }


# ------------------------------
#  B. Visibilidad (ejemplo)
# ------------------------------
class VisibilityForm(forms.ModelForm):
    class Meta:
        model  = Profile
        fields = ["bio"]               # o algún booleano como `is_public`
        labels = {"bio": "Descripción pública"}


# ------------------------------
#  C. 2-Factor Auth (placeholder)
# ------------------------------
class TwoFactorForm(forms.ModelForm):
    two_factor_enabled = forms.BooleanField(required=False, label="Activar 2FA")

    class Meta:
        model  = Profile
        fields = ["two_factor_enabled"]  # añade el campo si lo creas en el modelo


# ------------------------------
#  D. Cambio de contraseña
# ------------------------------
class PasswordChangeForm(DjangoPwdForm):
    """Solo re-exportamos para usarlo en la vista."""
    pass
