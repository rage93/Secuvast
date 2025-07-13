# src/profiles/models.py
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

User = get_user_model()


class Profile(models.Model):
    """Datos ampliados del usuario que aparecen en profile.html."""
    GENDER_CHOICES = (
        ("male",   _("Male")),
        ("female", _("Female")),
        ("other",  _("Other")),
    )

    # relación 1-a-1 con el usuario base
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
    )

    # ───── datos básicos ─────────────────────────────────────────────
    first_name   = models.CharField(max_length=30, blank=True)
    last_name    = models.CharField(max_length=30, blank=True)

    slug         = models.SlugField(max_length=60, unique=True, blank=True, null=True)

    gender       = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    birth_date   = models.DateField(blank=True, null=True)
    location     = models.CharField(max_length=120, blank=True)

    phone_regex  = RegexValidator(
        r"^\+?1?\d{9,15}$",
        _("Use formato internacional: +999999999.")
    )
    phone        = models.CharField(            #  ← nombre que usan los forms
        validators=[phone_regex], max_length=17, blank=True
    )

    secondary_email  = models.EmailField(blank=True)
    bio          = models.TextField(blank=True) #  ← nuevo: lo pide el template
    language     = models.CharField(max_length=40, blank=True)
    skills       = models.CharField(
        max_length=255, blank=True,
        help_text=_("Lista separada por comas")
    )

    # ───── preferencias ─────────────────────────────────────────────
    timezone            = models.CharField(max_length=50, blank=True)
    dark_mode           = models.BooleanField(default=False)
    newsletter_opt_in   = models.BooleanField(default=True)

    is_visible          = models.BooleanField(default=True)
    two_factor_enabled  = models.BooleanField(default=False)

    # ───── timestamps ───────────────────────────────────────────────
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("user__username",)          # permite order_by() cruzando relación

    def __str__(self):
        return f"{self.user.username} profile"

    # helpers para las plantillas
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def save(self, *args, **kwargs):
        if not self.slug and self.user:
            base = self.user.get_username()
            self.slug = slugify(base)[:60]
        super().save(*args, **kwargs)
