from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
import datetime
# Create your models here.


class Potency(models.Model):
    value = models.FloatField(default=0)
    date = models.DateField(default=datetime.date.today)


class Device(models.Model):
    potency = models.ForeignKey(Potency, on_delete=models.CASCADE, null=True)


class Person(models.Model):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    cellphone = models.CharField(max_length=25)
    device = models.ManyToManyField(Device)


class Address(models.Model):
    street = models.CharField(max_length=350)
    neighborhood = models.TextField(max_length=350)
    n = models.CharField(max_length=100)
    cep = models.CharField(max_length=8)
    person = models.ForeignKey(Person, on_delete=models.DO_NOTHING, null=True)


class Config(models.Model):
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    vibrate = models.BooleanField(default=True)
    som = models.BooleanField(default=True)
    time_interval = models.IntegerField(default=2)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    config = models.OneToOneField(Config, on_delete=models.CASCADE)
    person = models.OneToOneField(Person, on_delete=models.DO_NOTHING)


@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_account(sender, instance, **kwargs):
    instance.Account.save()