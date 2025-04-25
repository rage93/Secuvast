from typing import Any
from django.core.management.base import BaseCommand

from subscriptions.models import Subscription

#CFE
# class Command(BaseCommand): 

#     def handle(self, *args: Any, **options: Any):
#         #print("Recuperando los Subs perm")
#         qs = Subscription.objects.filter(active=True)
#         for obj in qs:
#             #print(obj.groups.all())
#             for group in obj.groups.all():
#                 for per in obj.permissions.all():
#                     group.permissions.add(per)
           
class Command(BaseCommand):
    help = "Replaces group permissions with those defined in the Subscription."

    def handle(self, *args: Any, **options: Any):
        print("Syncing subscription permissions...")

        qs = Subscription.objects.filter(active=True).prefetch_related('groups', 'permissions')

        for subscription in qs:
            perms = list(subscription.permissions.all())  # Convert queryset to list
            print(f"Syncing Subscription: {subscription.name}")
            print(f"→ Groups: {[g.name for g in subscription.groups.all()]}")
            print(f"→ Permissions: {[p.codename for p in perms]}")

            for group in subscription.groups.all():
                group.permissions.set(perms)  # Replace existing perms
                print(f"✔ Permissions updated for group: {group.name}")

        print("✅ All subscriptions synced cleanly.")          