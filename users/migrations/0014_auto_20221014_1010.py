# Generated by Django 2.2.26 on 2022-10-14 10:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='upload_document',
            field=models.FileField(upload_to='static/'),
        ),
        migrations.CreateModel(
            name='Keys',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keys', models.CharField(blank=True, max_length=255, null=True, verbose_name='Key')),
                ('assign_keys', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='keysgenerated_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
