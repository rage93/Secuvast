# src/profiles/signals.py
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """
    ▸ Si el usuario es nuevo → crea su Profile.
    ▸ Si el usuario existe → garantiza que siempre haya uno y lo guardamos.
    """
    Profile.objects.get_or_create(user=instance)
    instance.profile.save()
