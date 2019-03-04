from __future__ import unicode_literals
from django.utils.translation import gettext as _
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.
import datetime


class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    direction = models.CharField(max_length=20, default="ltr")
    title = models.CharField(max_length=50)
    lyrics = models.CharField(max_length=10000)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title