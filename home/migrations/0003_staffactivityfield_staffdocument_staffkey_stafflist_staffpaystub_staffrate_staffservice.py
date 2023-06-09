# Generated by Django 2.2.26 on 2022-11-23 10:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_invoice_package_service_serviceautofee_servicefrequencyperiod'),
    ]

    operations = [
        migrations.CreateModel(
            name='StaffList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff_name', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('avatar', models.FileField(null=True, upload_to='static/')),
                ('flag', models.BooleanField(default=False)),
                ('staff_role', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('phone_number', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('secondary_phone_number', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('email', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('street', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('city', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('state', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('zipcode', models.CharField(blank=True, default=None, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='StaffService',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff_service', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('client_name', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('paid', models.BooleanField(default=False)),
                ('status', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('date', models.DateTimeField(auto_now=True)),
                ('staff', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='home.StaffList')),
            ],
        ),
        migrations.CreateModel(
            name='StaffRate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff_service', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('staff_service_cost', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('current_rate', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('staff_default_rate', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('staff_current_rate', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('staff', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='home.StaffList')),
            ],
        ),
        migrations.CreateModel(
            name='StaffPayStub',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pay_stub', models.FileField(upload_to='static/')),
                ('pay_period_start', models.DateField(auto_now_add=True)),
                ('pay_period_end', models.DateField(auto_now_add=True)),
                ('uploaded_on', models.DateTimeField(auto_now_add=True)),
                ('staff', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='home.StaffList')),
            ],
        ),
        migrations.CreateModel(
            name='StaffKey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_name', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('key', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('took_posession', models.DateTimeField(auto_now=True)),
                ('staff', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='home.StaffList')),
            ],
        ),
        migrations.CreateModel(
            name='StaffDocument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload_document', models.FileField(upload_to='static/')),
                ('uploaded_on', models.DateTimeField(auto_now_add=True)),
                ('staff', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='home.StaffList')),
            ],
        ),
        migrations.CreateModel(
            name='StaffActivityField',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(null=True)),
                ('date', models.DateField(auto_now=True, null=True)),
                ('staff', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='home.StaffList')),
            ],
        ),
    ]
