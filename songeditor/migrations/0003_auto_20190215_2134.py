# Generated by Django 2.1.5 on 2019-02-15 21:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('songeditor', '0002_remove_songs_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songs',
            name='userId',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
