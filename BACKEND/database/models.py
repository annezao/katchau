from django.db import models
from django.contrib.auth.models import User
import datetime
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


class Potency(models.Model):
    value = models.FloatField(default=0)
    date =  models.DateField(default=datetime.date.today)


class Device(models.Model):
    potency = models.ForeignKey(Potency, on_delete=models.CASCADE, null=True)


class Monitors(models.Model):
    person = models.ForeignKey(Person, on_delete=models.DO_NOTHING, null=True)
    device = models.ForeignKey(Device, on_delete=models.DO_NOTHING, null=True)



# User
# Role
