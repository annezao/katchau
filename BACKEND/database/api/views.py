from django.http import Http404
from database.models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

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
