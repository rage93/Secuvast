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
    email      = forms.EmailField(required=True, label="Correo")

    class Meta:
        model = Profile
        fields = [
            "first_name", "last_name", "gender", "birth_date",
            "location", "phone", "language", "skills",
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
            self.fields["email"].initial      = user.email

    def save(self, commit=True):
        profile = super().save(commit=False)
        if commit:
            profile.save()
            if self.user:
                self.user.first_name = self.cleaned_data["first_name"]
                self.user.last_name  = self.cleaned_data["last_name"]
                self.user.email      = self.cleaned_data["email"]
                self.user.save()
        return profile


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
