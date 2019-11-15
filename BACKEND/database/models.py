from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
import datetime

from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
import rest_framework.authtoken.models
import pytz

@python_2_unicode_compatible
class Token(rest_framework.authtoken.models.Token):
    '''
    create multi token per user - override default rest_framework Token class
    replace model one-to-one relationship with foreign key
    '''
    key = models.CharField(_("Key"), max_length=40, db_index=True, unique=True)
    #Foreign key relationship to user for many-to-one relationship
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='auth_token',
        on_delete=models.CASCADE, verbose_name=_("User")
    )
    name = models.CharField(_("Name"), max_length=64)

    class Meta:
        # ensure user and name are unique
        unique_together = (('user', 'name'),)


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class Device(models.Model):
    serial = models.CharField(max_length=100)
    device_name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)

class Notification(models.Model):
    pass

class Month(models.Model):
    utc_now = timezone.now()
    utc_now = utc_now.replace(tzinfo=pytz.utc)
    month = models.IntegerField(primary_key=True, default=utc_now.month)


class Year(models.Model):
    utc_now = timezone.now()
    utc_now = utc_now.replace(tzinfo=pytz.utc)
    year = models.IntegerField(primary_key=True ,validators=[
          MinValueValidator(1984), max_value_current_year], default=utc_now.year)

class Day(models.Model):
    utc_now = timezone.now()
    utc_now = utc_now.replace(tzinfo=pytz.utc)
    day = models.IntegerField(primary_key=True, default=utc_now.day)

class Potency(models.Model):
    utc_now = timezone.now()
    utc_now = utc_now.replace(tzinfo=pytz.utc)
    value = models.FloatField(default=0)
    date = models.DateTimeField(null=True)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    month = models.ForeignKey(Month, on_delete=models.CASCADE, default=utc_now.month)
    year = models.ForeignKey(Year, on_delete=models.CASCADE, default=utc_now.year)
    day = models.ForeignKey(Day, on_delete=models.CASCADE, default=utc_now.day)


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
    sound = models.BooleanField(default=True)
    time_interval = models.IntegerField(default=2)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    config = models.OneToOneField(Config, on_delete=models.CASCADE)
    person = models.OneToOneField(Person, on_delete=models.DO_NOTHING)



