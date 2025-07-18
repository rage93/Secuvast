# src/profiles/apps.py
from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "profiles"

    def ready(self):
        # importa las señales al arrancar Django
        from . import signals  # noqa: F401
