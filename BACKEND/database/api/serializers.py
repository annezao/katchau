from rest_framework import serializers
from database.models import *
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

# Potency


class PotencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Potency
        fields = '__all__'

#Month


class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Month
        fields = '__all__'

#Year


class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = '__all__'

#Day


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'


# DeviceSerializer


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'

# PersonSerializer


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

# Address Serializer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


# ConfigSerializer

class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = '__all__'


# Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

# User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# Auth Token

class ObtainTokenSerializer(serializers.Serializer):
    password = serializers.CharField(required=False)

    default_error_messages = {
        'inactive_account': 'User account is disabled.',
        'invalid_credentials': 'Unable to login with provided credentials.',
    }

    def __init__(self, *args, **kwargs):
        super(ObtainTokenSerializer, self).__init__(*args, **kwargs)
        self.user = None
        self.fields[User.USERNAME_FIELD] = serializers.CharField(
            required=False)

    def validate(self, attrs):
        self.user = authenticate(
            username=attrs[User.USERNAME_FIELD], password=attrs['password'])
        if self.user:
            if not self.user.is_active:
                raise serializers.ValidationError(
                    self.error_messages['inactive_account'], )
            return attrs
        else:
            raise serializers.ValidationError(
                self.error_messages['invalid_credentials'])
