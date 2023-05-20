from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    company_name = models.CharField(_("Company Name"), blank=True, null=True, max_length=255)
    # first_name = models.CharField(_("First Name"), blank=True, null=True, max_length=255)
    # last_name = models.CharField(_("Last Name"), blank=True, null=True, max_length=255)
    # email = models.EmailField(_('email address'), unique=True)
    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

#Admin Feature
#Name of The Business Year
class BusinessYearInterval(models.Model):
    business_year = models.CharField(_("Name of Business User"), blank=True, null=True, max_length=255)

    def __str__(self): #show the object's name
        return self.business_year

#Admin Feature
#Number of Staff
class NumberOfStaff(models.Model):
   number_of_staff = models.CharField(_("Name of Staff"), blank=True, null=True, max_length=255)  

   def __str__(self): #show the object's name
        return self.number_of_staff       

#Admin feature
# Pet sitting software company list
class PetsittingSoftware(models.Model):
    software_company_name = models.CharField(_("Name of Software Company"), blank=True, null=True, max_length=255)
    def __str__(self): #show the object's name
        return self.software_company_name   



#Admin Feature
# Currency List

class CurrencyList(models.Model):
    currency_name = models.CharField(_("Name of Currency"), blank=True, null=True, max_length=255)
    def __str__(self): #show the object's name
        return self.currency_name   


#Client Info

class Client(models.Model):
    full_name = models.CharField(_("Full Name"), blank=True, null=True, max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(_("Phone Number"), blank=True, null=True, max_length=255)
    address_1 = models.CharField(_("Address One"), blank=True, null=True, max_length=255)
    city = models.CharField(_("City"), blank=True, null=True, max_length=255)
    state = models.CharField(_("State"), blank=True, null=True, max_length=255)
    zip = models.CharField(_("Zip"), blank=True, null=True, max_length=255)

    def __str__(self):
        return self.full_name



#Introduce YourSelf(OnBoarding For The Company)
#Company Website,How Long in Business,Number of Staff,Used Pet Sitting Software,Currency,Hear ABout Furgis

    

class IntroduceYourself(models.Model):
    # Business_year_interval = (
    #     ("less_than_a_year", "Less than a year "),
    #     ("one_two_years","1-2 Years"),
    #     ("two_three_years","2-3 Years"),
    #     ("four_years_plus","4+ Years"),
    # )

    # Number_of_staff = (
    #     ("ten_person", "10 Person"),
    #     ("more_than_ten_persons","10+ person"),
    #     ("five_persons","5 persons"),
        
    # )

    company_website = models.CharField(_("Company Website"), blank=True, null=True, max_length=255)

    
    pet_sitting_company = models.ForeignKey(PetsittingSoftware, on_delete=models.CASCADE,unique=False,null=True)
    how_long_in_business  = models.ForeignKey(BusinessYearInterval, on_delete=models.CASCADE,unique=False,null=True)
    number_of_staff = models.ForeignKey(NumberOfStaff, on_delete=models.CASCADE,unique=False,null=True)
    currency = models.ForeignKey(CurrencyList, on_delete=models.CASCADE,unique=False,null=True)
    hear_about_furgis = models.CharField(_("Hear About Furgis"), blank=True, null=True, max_length=255)

    def __str__(self): #show the object's name
        return self.company_website   


#Vet Management 
class Vet(models.Model):
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    name = models.CharField(_("Name"), blank=True, null=True, max_length=255)
    email = models.EmailField(_('Email'))
    work_phone = models.CharField(_("Phone Number"), blank=True, null=True, max_length=255) 
    address1 = models.CharField(_("Address1"), blank=True, null=True, max_length=255) 
    address2 = models.CharField(_("Address2"), blank=True, null=True, max_length=255) 
    city =  models.CharField(_("City"), blank=True, null=True, max_length=255)   
    zip =  models.CharField(_("Zip"), blank=True, null=True, max_length=255)   
    state =  models.CharField(_("State"), blank=True, null=True, max_length=255)  
    notes = models.TextField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE,null=True)



#Pet Info

class Pet(models.Model):
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    name = models.CharField(_("Name"), blank=True, null=True, max_length=255)
    breed = models.CharField(_("Breed"), blank=True, null=True, max_length=255)
    birth_date = models.DateField()
    type = models.CharField(_("Type"), blank=True, null=True, max_length=255)
    color = models.CharField(_("Color"), blank=True, null=True, max_length=255)
    micro_chip = models.CharField(_("Micro Chip"), blank=True, null=True, max_length=255)
    vaccination_current = models.CharField(_("Vaccinations Current"), blank=True, null=True, max_length=255)
    sex = models.CharField(_("Sex"), blank=True, null=True, max_length=255)
    neutered = models.CharField(_("Neutered/Sprayed"), blank=True, null=True, max_length=255)
    primary_vet = models.CharField(_("Primary Vet"), blank=True, null=True, max_length=255)
    alternate_vet = models.CharField(_("Alternate Vet"), blank=True, null=True, max_length=255)
    notes = models.CharField(_("Notes"), blank=True, null=True, max_length=255)
    pet_photo = models.ImageField(upload_to = 'static/',blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE,null=True)

    
    def __str__(self):
        return self.name






class Role(models.Model):
    role_name = models.CharField(_("Role"), blank=True, null=True, max_length=255,unique=True)

    def __str__(self):
        return self.role_name

class Staff(models.Model):
    name = models.CharField(_("Name"), blank=True, null=True, max_length=255)
    email = models.EmailField()
    primary_phone = models.CharField(_("Primary Phone"), blank=True, null=True, max_length=255)        
    secondary_phone = models.CharField(_("Secondary Phone"), blank=True, null=True, max_length=255)   
    role =  models.ForeignKey(Role, on_delete=models.CASCADE)   

    def __str__(self):
        return self.name



class Task(models.Model):
    name = models.CharField(_("Name"), blank=True, null=True, max_length=255)        
    client = models.CharField(_("Name"), blank=True, null=True, max_length=255)        
    assign_to = models.ForeignKey(Staff, on_delete=models.CASCADE)        
    description = models.TextField()
    due_date = models.DateField(_("Due Date"))  

    def __str__(self):
        return self.name   



class Document(models.Model):
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    upload_document = models.FileField(upload_to = 'static/')

    uploaded_on = models.DateTimeField(auto_now_add=True)

    client = models.ForeignKey(Client, on_delete=models.CASCADE,null=True)
    
    # def __str__(self):
    #     return self.upload_document 



class Keys(models.Model):
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    keys = models.CharField(_("Key"), blank=True, null=True, max_length=255)

    assign_keys = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name = 'assigned_keys')

    client = models.ForeignKey(Client, on_delete=models.CASCADE,null=True)  
    
    def __str__(self):
        return self.keys         




class History(models.Model):
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    action_name = models.CharField(_("Action Name"), blank=True, null=True, max_length=255) 
    action_details = models.CharField(_("Action Details"), blank=True, null=True, max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.action_name  


#Setting Section API

class SettingCompany(models.Model):
    company_name = models.CharField(_("Company Name"), blank=True, null=True, max_length=255)
    email = models.EmailField()
    company_website = models.CharField(_("Company Website"), blank=True, null=True, max_length=255)
    primary_phone_number = models.CharField(_("Primary Phone Number"), blank=True, null=True, max_length=255)
    secondary_phone_number = models.CharField(_("Secondrary Phone Number"), blank=True, null=True, max_length=255)
    address_1 = models.CharField(_("Address One"), blank=True, null=True, max_length=255)
    address_2 = models.CharField(_("Address Two"), blank=True, null=True, max_length=255)
    city = models.CharField(_("City"), blank=True, null=True, max_length=255)
    state = models.CharField(_("State"), blank=True, null=True, max_length=255)
    zip = models.CharField(_("Zip"), blank=True, null=True, max_length=255)

    def __str__(self):
        return self.email        

    
class SettingPrimaryContact(models.Model):
    full_name = models.CharField(_("Full Name"), blank=True, null=True, max_length=255)
    email = models.EmailField()
    cc_email = models.EmailField(_("CC Email"))
    primary_phone_number = models.CharField(_("Primary Phone Number"), blank=True, null=True, max_length=255)
    secondary_phone_number = models.CharField(_("Secondrary Phone Number"), blank=True, null=True, max_length=255)
    how_did_you_find_us = models.CharField(_("How Did You Find Us"), blank=True, null=True, max_length=255)
    def __str__(self):
        return self.email 


class SettingAddress(models.Model):

    address_instruction = models.CharField(_("Address Instruction"), blank=True, null=True, max_length=255)
    address_instruction_client_visible = models.BooleanField(default=False)
    address_instruction_client_editable = models.BooleanField(default=False)
    address_1 = models.CharField(_("Address One"), blank=True, null=True, max_length=255)
    address1_client_visible = models.BooleanField(default=False)
    address1_client_editable = models.BooleanField(default=False)
    address_2 = models.CharField(_("Address Two"), blank=True, null=True, max_length=255)
    address2_client_visible = models.BooleanField(default=False)
    address2_client_editable = models.BooleanField(default=False)
    city = models.CharField(_("City"), blank=True, null=True, max_length=255)
    city_client_visible = models.BooleanField(default=False)
    city_client_editable = models.BooleanField(default=False)
    state = models.CharField(_("State"), blank=True, null=True, max_length=255)
    state_client_visible = models.BooleanField(default=False)
    state_client_editable = models.BooleanField(default=False)
    zip = models.CharField(_("Zip"), blank=True, null=True, max_length=255)
    zip_client_visible = models.BooleanField(default=False)
    zip_client_editable = models.BooleanField(default=False)


class EmergencyContact(models.Model):  

    name = models.CharField(_("Name"), blank=True, null=True, max_length=255)
    name_client_visible = models.BooleanField(default=False)
    name_client_editable = models.BooleanField(default=False)  
    relationship = models.CharField(_("Relationship"), blank=True, null=True, max_length=255)
    relationship_client_visible = models.BooleanField(default=False)
    relationship_client_editable = models.BooleanField(default=False) 
    email = models.CharField(_("Email"), blank=True, null=True, max_length=255)
    email_client_visible = models.BooleanField(default=False)
    email_client_editable = models.BooleanField(default=False) 
    primary_phone = models.CharField(_("Primary Phone"), blank=True, null=True, max_length=255)
    primary_phone_client_visible = models.BooleanField(default=False)
    primary_phone_client_editable = models.BooleanField(default=False) 
    secondary_phone = models.CharField(_("Primary Phone"), blank=True, null=True, max_length=255)
    secondary_phone_client_visible = models.BooleanField(default=False)
    secondary_phone_client_editable = models.BooleanField(default=False) 

    preffered = models.CharField(_("Preffered & Do Not Schedule"), blank=True, null=True, max_length=255)
    preffered_client_visible = models.BooleanField(default=False)
    preffered_client_editable = models.BooleanField(default=False) 

    private_note = models.CharField(_("Private Note"), blank=True, null=True, max_length=255)
    private_note_client_visible = models.BooleanField(default=False)
    private_note_client_editable = models.BooleanField(default=False) 

    client_added_date = models.CharField(_("Client Added Date"), blank=True, null=True, max_length=255)
    client_added_date_client_visible = models.BooleanField(default=False)
    client_added_date_client_editable = models.BooleanField(default=False) 



     



    

