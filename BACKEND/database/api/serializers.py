from rest_framework import serializers
from database.models import *

#Address Serializer

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

#Potency Serializer

class PotencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Potency
        fields = '__all__'