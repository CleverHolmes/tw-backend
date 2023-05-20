from ast import arg

from django.db.models import IntegerField

from users.models import User
from django.conf import settings
from django.db import models
from django.utils.timezone import now


class Service(models.Model):
    "Generated Model"
    service_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    default_duration = models.IntegerField(null=True)
    duration_unit = models.CharField(default="Minutes", max_length=100, blank=True)
    mobile_app_timer = models.IntegerField(null=True)
    mobile_app_timer_unit = models.CharField(default="min", max_length=20, blank=True)
    selectable_by_client = models.BooleanField(default=False)
    gps_route_tracking = models.CharField(max_length=25, default=None, blank=True, null=True)
    late_reminder = models.CharField(max_length=25, default=None, blank=True, null=True)
    description = models.TextField(null=True)
    private_note = models.TextField(null=True)
    cost = models.IntegerField(null=True)
    taxable = models.BooleanField(default=False)
    default_staff_rate = models.IntegerField(null=True)
    default_staff_rate_unit = models.CharField(default="%", max_length=25, blank=True)
    extra_pet_rate = models.IntegerField(null=True)
    extra_pet_rate_unit = models.CharField(default="pet", max_length=25, blank=True)
    staff_extra_pet_rate = models.IntegerField(null=True)
    staff_extra_pet_rate_unit = models.CharField(default="%", max_length=25, blank=True)
    service_group = models.CharField(null=True, max_length=25, blank=True)
    service_scheduling = models.TextField(null=True)
    created_at = models.DateTimeField(default=now, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    order_by = models.IntegerField(null=True)


class ServiceAutoFee(models.Model):
    "Generated Model"
    service = models.ForeignKey(Service, on_delete=models.CASCADE, default=None, blank=True, null=True)
    after_hours_enabled = models.BooleanField(default=False)
    work_hours = models.CharField(max_length=10, default=None, blank=True, null=True)
    work_hours_shift = models.CharField(max_length=20, default=None, blank=True, null=True)
    additional_fee_charged = models.CharField(max_length=100, default=None, blank=True, null=True)
    additional_fee_charged_unit = models.CharField(max_length=10, default="$", blank=True, null=True)
    staff_rate_for_after_hours = models.CharField(max_length=100, default=None, blank=True, null=True)
    staff_rate_for_after_hours_unit = models.CharField(max_length=10, default="$", blank=True, null=True)
    weekend_fees_enabled = models.BooleanField(default=False)
    weekend_fee_charged = models.CharField(max_length=100, default=None, blank=True, null=True)
    weekend_fee_charged_unit = models.CharField(max_length=10, default="$", blank=True, null=True)
    staff_rate_for_weekend = models.CharField(max_length=100, default=None, blank=True, null=True)
    staff_rate_for_weekend_unit = models.CharField(max_length=10, default="$", blank=True, null=True)


class ServiceFrequencyPeriod(models.Model):
    "Generated Model"
    service = models.ForeignKey(Service, on_delete=models.CASCADE, default=None, blank=True, null=True)
    frequency_period = models.BooleanField(default=False)
    level = models.IntegerField(default=0)
    when = models.IntegerField(null=True)
    charge = models.IntegerField(null=True)
    pay_type = models.CharField(max_length=30, default=None, blank=True, null=True)
    pay_number = models.IntegerField(null=True)
    pay_unit = models.CharField(default="%", max_length=10, blank=True)


class Package(models.Model):
    "Generated Model"
    package_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    package_limit = models.CharField(max_length=50, default=None, blank=True, null=True)
    package_type = models.CharField(max_length=50, default=None, blank=True, null=True)
    taxable = models.BooleanField(default=False)
    selectable_client = models.BooleanField(default=False)
    description = models.TextField(null=True)
    connected_service = models.TextField(null=True)
    disabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=now, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    order_by = models.IntegerField(null=True)


class Invoice(models.Model):
    "Generated Model"
    invoice_id = models.CharField(primary_key=True, unique=True, auto_created=True, max_length=30, default=None,
                                  blank=True)
    due_date = models.DateField(auto_now=True, blank=True, null=True)
    date = models.DateField(auto_now=True, blank=True, null=True)
    client = models.CharField(max_length=50, default=None, blank=True)
    amount = models.CharField(max_length=50, default=None, blank=True)
    balance = models.CharField(max_length=50, default=None, blank=True)
    status = models.CharField(max_length=30, default=None, blank=True)

class StaffList(models.Model):
    "Generated Model"
    staff_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    avatar = models.FileField(upload_to = 'static/', null=True)
    flag = models.BooleanField(default=False)
    staff_role = models.CharField(max_length=50, default=None, blank=True, null=True)
    phone_number = models.CharField(max_length=50, default=None, blank=True, null=True)
    secondary_phone_number = models.CharField(max_length=50, default=None, blank=True, null=True)
    email = models.CharField(max_length=50, default=None, blank=True, null=True)
    street = models.CharField(max_length=50, default=None, blank=True, null=True)
    city = models.CharField(max_length=50, default=None, blank=True, null=True)
    state = models.CharField(max_length=50, default=None, blank=True, null=True)
    zipcode = models.CharField(max_length=50, default=None, blank=True, null=True)
    
class StaffActivityField(models.Model):
    "Generated Model"
    staff = models.ForeignKey(StaffList, on_delete=models.CASCADE, default=None, blank=True)
    description = models.TextField(null=True)
    date = models.DateField(auto_now=True, blank=True, null=True)
    
class StaffKey(models.Model):
    "Generated Model"
    staff = models.ForeignKey(StaffList, on_delete=models.CASCADE, default=None, blank=True)
    client_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    key = models.CharField(max_length=50, default=None, blank=True, null=True)
    took_posession = models.DateTimeField(auto_now=True, blank=True)
    
class StaffService(models.Model):
    "Generated Model"
    staff = models.ForeignKey(StaffList, on_delete=models.CASCADE, default=None, blank=True)
    staff_service = models.CharField(max_length=100, default=None, blank=True, null=True)
    client_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    paid = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default=None, blank=True, null=True)
    date = models.DateTimeField(auto_now=True, blank=True)
    
class StaffRate(models.Model):
    "Generated Model"
    staff = models.ForeignKey(StaffList, on_delete=models.CASCADE, default=None, blank=True)
    staff_service = models.CharField(max_length=100, default=None, blank=True, null=True)
    staff_service_cost = models.CharField(max_length=50, default=None, blank=True, null=True)
    current_rate = models.CharField(max_length=50, default=None, blank=True, null=True)
    staff_default_rate = models.CharField(max_length=50, default=None, blank=True, null=True)
    staff_current_rate = models.CharField(max_length=50, default=None, blank=True, null=True)
    
class StaffDocument(models.Model):
    staff = models.ForeignKey(StaffList, on_delete=models.CASCADE, default=None, blank=True)
    upload_document = models.FileField(upload_to = 'static/')
    uploaded_on = models.DateTimeField(auto_now_add=True)
    
class StaffPayStub(models.Model):
    staff = models.ForeignKey(StaffList, on_delete=models.CASCADE, default=None, blank=True)
    pay_stub = models.FileField(upload_to = 'static/')
    pay_period_start = models.DateField(auto_now_add=True)
    pay_period_end = models.DateField(auto_now_add=True)
    uploaded_on = models.DateTimeField(auto_now_add=True)

class Approval(models.Model):
    additional_fee_charged_unit = models.CharField(max_length=10, default="$", blank=True, null=True)
