# Generated by Django 2.2.26 on 2022-10-14 11:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20221014_1020'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='keys',
            name='assign_keys',
        ),
        migrations.AddField(
            model_name='keys',
            name='assign_keys',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_keys', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
