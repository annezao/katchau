from django.http import Http404
from database.models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User

#Address

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
            return Address.objects.get(pk = pk)
        except Address.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        address = self.get_object(pk)
        serializer = Address(address)
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

#Potency
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
            return Potency.objects.get(pk = pk)
        except Potency.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        potency = self.get_object(pk)
        serializer = Potency(potency)
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
