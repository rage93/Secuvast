from django.db import models
from django.conf import settings
import helpers.billing

User = settings.AUTH_USER_MODEL # "auth.user"


# public schema -> customer accounts
# enterprise schema no customer account
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_id = models.CharField(max_length=120, null=True, blank=True)
    init_email = models.EmailField(blank=True, null=True)
    init_email_confirmed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username}"
    
    
    
    
    
    