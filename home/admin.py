from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import (
  Service,
  ServiceAutoFee,
  ServiceFrequencyPeriod,
)

# Register your models here.


admin.site.register(Service)
admin.site.register(ServiceAutoFee)
admin.site.register(ServiceFrequencyPeriod)
