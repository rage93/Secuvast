## File: saas/src/customers/serializers.py
# Serializers define the API representation of the model.
# They allow complex data types, such as querysets and model instances, to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types.
## Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after
from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
