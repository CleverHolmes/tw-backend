# Generated by Django 2.2.26 on 2022-09-20 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20220920_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='introduceyourself',
            name='company_website',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Company Website'),
        ),
    ]
