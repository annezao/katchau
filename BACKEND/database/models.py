from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Address(models.Model):
    street = models.CharField(max_length=350)
    neighborhood = models.TextField(max_length=350)
    n = models.CharField(max_length=100)
    cep = models.CharField(max_length=8)


class Person(models.Model):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    cellphone = models.CharField(max_length=25)
    address = models.ForeignKey(Address, on_delete=models.DO_NOTHING)


class Config(models.Model):
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    vibrate = models.BooleanField(default=True)
    som = models.BooleanField(default=True)
    time_interval = models.IntegerField(default=2)


class Device(models.Model):
    pass


class Monitors(models.Model):
    pass


class Potency(models.Model):
    pass

# User
# Role
