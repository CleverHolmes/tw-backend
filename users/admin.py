import imp
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm

#Load models

from .models import (BusinessYearInterval,
CurrencyList,IntroduceYourself,
NumberOfStaff,PetsittingSoftware,
Vet,Pet,Role,Staff,Task,Keys,History,Document) 

models = [BusinessYearInterval,CurrencyList,IntroduceYourself,NumberOfStaff,PetsittingSoftware,Vet,Pet,Role,Staff,Task,Keys,History,Document]
admin.site.register(models)
User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name",)}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser"]
    search_fields = ["name"]
