from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
#load models

from users.models import (
    IntroduceYourself,BusinessYearInterval, Keys,
    NumberOfStaff,CurrencyList, Pet,
    PetsittingSoftware,Vet,
    Client,Staff,Role,Task,Document,History,
    SettingCompany,
    SettingPrimaryContact,
    SettingAddress,
    EmergencyContact,
    )
import random
User = get_user_model()

from home.models import (
    Service,
    ServiceAutoFee,
    ServiceFrequencyPeriod,
    Package,
    Invoice,
    StaffList,
    StaffActivityField,
    StaffKey,
    StaffService,
    StaffRate,
    StaffDocument,
    StaffPayStub
)

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #,'company_name','first_name','last_name'
        fields = ('id',  'email', 'password','company_name','first_name','last_name')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'company_name': {
                'required': True,
                'allow_blank': False,
            },
            'first_name': {
                'required': True,
                'allow_blank': False,
            },
            'last_name': {
                'required': True,
                'allow_blank': False,
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            company_name=validated_data.get('company_name'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm


#Introduce Yourself Serializer Generator 

class IntroduceYourselfSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntroduceYourself
        fields = '__all__' 
        extra_kwargs = {
            
            'company_website': {
                'required': True,
                'allow_blank': False,
            },
            # 'pet_sitting_company': {
            #     'required': True,
            #     'allow_blank': False,
            # },
            # 'how_long_in_business': {
            #     'required': True,
            #     'allow_blank': False,
            # },
            # 'number_of_staff': {
            #     'required': True,
            #     'allow_blank': False,
            # },
            # 'currency': {
            #     'required': True,
            #     'allow_blank': False,
            # },
            'hear_about_furgis': {
                'required': True,
                'allow_blank': False,
            },
            
        }


    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request





#Serializer   Business Year Interval       

class BusinessYearIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessYearInterval
        fields = '__all__' 



#Serilizer Number Of Staff

class NumberOfStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberOfStaff
        fields = '__all__' 




#Currency List Serializer
class CurrencyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyList
        fields = '__all__' 



#PetSitting Software List 



class PetsittingSoftwareSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetsittingSoftware
        fields = '__all__' 


#For Vet Management 


class VetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vet
        fields = '__all__' 


#Pet Serilizer

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'        


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'  

    

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'        



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'              

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'    


class DocumentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault(),source = 'user.username',)
    class Meta:
        model = Document
        fields = '__all__' 

          




class KeysSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault(),source = 'user.username',)
    class Meta:
        model = Keys
        fields = '__all__'   

    def create(self, validated_data):
        try:
            data  = validated_data.get('assign_keys')
            _client  = validated_data.get('client')
            print("Data:",data)
            # _assign_user = User.objects.get(id=data)
            # print(_assign_user)
            _keys = Keys(
            
            )   

            if _keys:
                key_value=  random.randint(0,99999)
                _keys.keys=key_value
                _keys.assign_keys =  data
                _keys.user = self.context.get("request").user
                _keys.client = _client

                _keys.save()

                return _keys

        except (User.DoesNotExist):
            print("User Does not Exist!")    


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'    


class SettingCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingCompany
        fields = '__all__'    


class SettingPrimaryContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingPrimaryContact
        fields = '__all__'     


class SettingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingAddress
        fields = '__all__'     


class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = '__all__'                     



                  
        

class ServiceAutoFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceAutoFee
        fields = "__all__"


class ServiceFrequencyPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFrequencyPeriod
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    serviceautofee_set = ServiceAutoFeeSerializer(many=True, read_only=True)
    servicefrequencyperiod_set = ServiceFrequencyPeriodSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = "__all__"


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'
        
class StaffActivityFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffActivityField
        fields = '__all__'
        
class StaffKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffKey
        fields = '__all__'
        
class StaffServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffService
        fields = '__all__'
        
class StaffRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffRate
        fields = '__all__'
        
class StaffDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffDocument
        fields = '__all__'
        
class StaffPayStubSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffPayStub
        fields = '__all__'
        
class StaffListSerializer(serializers.ModelSerializer):
    staffactivityfield_set = StaffActivityFieldSerializer(many=True, read_only=True)
    staffkey_set = StaffKeySerializer(many=True, read_only=True)
    staffservice_set = StaffServiceSerializer(many=True, read_only=True)
    staffrate_set = StaffRateSerializer(many=True, read_only=True)
    staffdocument_set = StaffDocumentSerializer(many=True, read_only=True)
    staffpaystub_set = StaffPayStubSerializer(many=True, read_only=True)
    
    class Meta:
        model = StaffList
        fields = '__all__'