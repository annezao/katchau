from django.http import Http404, JsonResponse
from database.models import *
from .serializers import *
from rest_framework import status, viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

# views.py

from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
import datetime
from django.utils import timezone
from ..models import Token
import pytz

# Authentication classes

class ObtainMultiAuthToken(ObtainAuthToken):
    '''
    create persistent tokens that user can manually create for connecting devices
    '''
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            name = request.data['token_name']
            token, created = Token.objects.get_or_create(user=user, name=name)
            
            return Response({'token': token.key,
                             'token_name': name,
                             'user': user.username})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, )
 
class ObtainExpiringAuthToken(generics.GenericAPIView):
    '''
    Create token that expires every 24hrs
    Used for login in users from mobile and desktop clients
    '''

    permission_classes = (AllowAny,)
    serializer_class = ObtainTokenSerializer
 
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            user = serializer.user

            # if get_or_create() didn't have to create an object, variable create is FALSE
            token, created = Token.objects.get_or_create(user=user, name='auth-token')
            utc_now = timezone.now()
            utc_now = utc_now.replace(tzinfo=pytz.utc)

            # if the object exist and isn't valid (less than 24hrs), so delet it and create another one
            if not created and token.created < utc_now - datetime.timedelta(minutes=24):
                token.delete()
                token = Token.objects.create(user=user, name='auth-token')
                token.created = utc_now
                token.save()

            return Response({'token': token.key,
                             'id': user.pk,
                             'email': user.email,
                             'username': user.username})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, )

# Potency

class PotencyList(APIView):

    def get(self, request, format=None):
        potency = Potency.objects.all()
        serializer = PotencySerializer(potency, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PotencySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PotencyDetail(APIView):

    def get_object(self, pk):
        try:
            return Potency.objects.get(pk=pk)
        except Potency.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        potency = self.get_object(pk)
        serializer = PotencySerializer(potency)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        potency = self.get_object(pk)
        serializer = PotencySerializer(potency, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        potency = self.get_object(pk)
        potency.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DevicePotencyMonth(APIView):
    def get_object(self, pk):
        try:
            return Device.objects.get(pk=pk)
        except Device.DoesNotExist:
            raise Http404

    def get(self,  request, pk, pk2, pk3, format=None):
        device = self.get_object(pk)
        serializer = PotencySerializer(
            device.potency_set.filter(month=pk2, year=pk3), many=True)
        return Response(serializer.data)


class DevicePotencyYear(APIView):
    def get_object(self, pk):
        try:
            return Device.objects.get(pk=pk)
        except Device.DoesNotExist:
            raise Http404

    def get(self,  request, pk, pk2, format=None):
        device = self.get_object(pk)
        serializer = PotencySerializer(
            device.potency_set.filter(year=pk2), many=True)
        return Response(serializer.data)

class DevicePotencyDay(APIView):
    def get_object(self, pk):
        try:
            return Device.objects.get(pk=pk)
        except Device.DoesNotExist:
            raise Http404

    def get(self,  request, pk, pk2, pk3, pk4, format=None):
        device = self.get_object(pk)
        serializer = PotencySerializer(
            device.potency_set.filter(day=pk2, month=pk3, year=pk4), many=True)
        return Response(serializer.data)

# Month

class MonthList(APIView):

    def get(self, request, format=None):
        month = Month.objects.all()
        serializer = MonthSerializer(month, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MonthSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MonthDetail(APIView):

    def get_object(self, pk):
        try:
            return Month.objects.get(pk=pk)
        except Month.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        month = self.get_object(pk)
        serializer = MonthSerializer(month)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        month = self.get_object(pk)
        serializer = MonthSerializer(month, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        month = self.get_object(pk)
        month.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Year


class YearList(APIView):

    def get(self, request, format=None):
        year = Year.objects.all()
        serializer = YearSerializer(year, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = YearSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class YearDetail(APIView):

    def get_object(self, pk):
        try:
            return Year.objects.get(pk=pk)
        except Year.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        year = self.get_object(pk)
        serializer = YearSerializer(year)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        year = self.get_object(pk)
        serializer = YearSerializer(year, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        year = self.get_object(pk)
        year.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Day


class DayList(APIView):

    def get(self, request, format=None):
        day = Day.objects.all()
        serializer = DaySerializer(day, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DayDetail(APIView):

    def get_object(self, pk):
        try:
            return Day.objects.get(pk=pk)
        except Day.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        day = self.get_object(pk)
        serializer = DaySerializer(day)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        day = self.get_object(pk)
        serializer = YearSerializer(day, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        day = self.get_object(pk)
        day.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Device


class DeviceList(APIView):

    def get(self, request, format=None):
        device = Device.objects.all()
        serializer = DeviceSerializer(device, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeviceDetail(APIView):

    def get_object(self, pk):
        try:
            return Device.objects.get(pk=pk)
        except Device.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        device = self.get_object(pk)
        serializer = DeviceSerializer(device)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        device = self.get_object(pk)
        serializer = DeviceSerializer(device, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        device = self.get_object(pk)
        device.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# User


class UserList(APIView):

    def get(self, request, format=None):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserDevice(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self,  request, pk, format=None):
        user = self.get_object(pk)
        serializer = DeviceSerializer(
            user.account.person.device.all(), many=True)
        return Response(serializer.data)


class DevicePotency(APIView):

    def get_object(self, pk):
        try:
            return Device.objects.get(pk=pk)
        except Device.DoesNotExist:
            raise Http404

    def get(self,  request, pk, format=None):
        device = self.get_object(pk)
        serializer = PotencySerializer(device.potency_set.all(), many=True)
        return Response(serializer.data)

# Person


class PersonList(APIView):

    def get(self, request, format=None):
        person = Person.objects.all()
        serializer = PersonSerializer(person, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PersonDetail(APIView):

    def get_object(self, pk):
        try:
            return Person.objects.get(pk=pk)
        except Person.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        person = self.get_object(pk)
        serializer = PersonSerializer(person)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        person = self.get_object(pk)
        serializer = PersonSerializer(person, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        person = self.get_object(pk)
        person.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Address


class AddressList(APIView):

    def get(self, request, format=None):
        address = Address.objects.all()
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressDetail(APIView):

    def get_object(self, pk):
        try:
            return Address.objects.get(pk=pk)
        except Address.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        address = self.get_object(pk)
        serializer = AddressSerializer(address)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        address = self.get_object(pk)
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        address = self.get_object(pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Config
class ConfigList(APIView):

    def get(self, request, format=None):
        config = Config.objects.all()
        serializer = ConfigSerializer(config, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ConfigSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfigDetail(APIView):

    def get_object(self, pk):
        try:
            return Config.objects.get(pk=pk)
        except Config.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        config = self.get_object(pk)
        serializer = ConfigSerializer(config)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        config = self.get_object(pk)
        serializer = ConfigSerializer(config, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        config = self.get_object(pk)
        config.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Account

class AccountList(APIView):

    def get(self, request, format=None):
        account = Account.objects.all()
        serializer = AccountSerializer(account, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
