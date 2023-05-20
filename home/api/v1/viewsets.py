from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
#Authentication 
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

#Load Models 
from django.contrib.auth import get_user_model
User=get_user_model()
from users.models import (BusinessYearInterval,CurrencyList, Keys,NumberOfStaff, 
Pet,PetsittingSoftware, Staff, Vet,Client,Task,Role,Document,History,
SettingCompany,
SettingPrimaryContact,
SettingAddress,
EmergencyContact,
)

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    #Introduce  yourself serializer 
    IntroduceYourselfSerializer,
    BusinessYearIntervalSerializer,
    NumberOfStaffSerializer,
    CurrencyListSerializer,
    PetsittingSoftwareSerializer,
    VetSerializer,
    PetSerializer,
    ClientSerializer,
    StaffSerializer,
    TaskSerializer,
    RoleSerializer,
    DocumentSerializer,
    KeysSerializer,
    HistorySerializer,

    SettingCompanySerializer,
    SettingPrimaryContactSerializer,
    SettingAddressSerializer,
    EmergencyContactSerializer,
    ServiceSerializer,
    ServiceAutoFeeSerializer,
    ServiceFrequencyPeriodSerializer,
    PackageSerializer,
    InvoiceSerializer,
    # Staff
    StaffActivityFieldSerializer,
    StaffKeySerializer,
    StaffServiceSerializer,
    StaffRateSerializer,
    StaffDocumentSerializer,
    StaffPayStubSerializer,
    StaffListSerializer

)

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

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


#IntorduceYourself  Viewset 

class IntroduceCompanyViewSet(ModelViewSet):
    serializer_class = IntroduceYourselfSerializer
    http_method_names = ["post"]



#Business Year Interval  Viewset 

class BusinessYearViewSet(ModelViewSet):
    serializer_class = BusinessYearIntervalSerializer
    http_method_names = ["get"]  
    queryset = BusinessYearInterval.objects.all()   


#Number Of Staff Viewset 

class NumberOfStaffViewSet(ModelViewSet):
    serializer_class = NumberOfStaffSerializer
    http_method_names = ["get"]   
    queryset = NumberOfStaff.objects.all()   


#Currency List Viewset 


class CurrencyListViewSet(ModelViewSet):
    serializer_class = CurrencyListSerializer
    http_method_names = ["get"]   
    queryset = CurrencyList.objects.all()   


#Pet Sitting Software Viewset 

class PetSittingSoftwareViewSet(ModelViewSet):
    serializer_class = PetsittingSoftwareSerializer
    http_method_names = ["get"]    
    queryset = PetsittingSoftware.objects.all()


#Vet Management  Viewset 
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class VetViewSet(ModelViewSet):
    serializer_class = VetSerializer
    http_method_names = ["get","post","put","delete"]    
    queryset = Vet.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message':'Vet Has Been Deleted Successfully!'}) 

    def get_queryset(self):
        """
        This view should return a list of all the services
        for the currently authenticated user.
        """
        # _user = self.request.user
        
        get_user = self.request.query_params.get('cid')
        if get_user:
            _user = Client.objects.filter(id=get_user)[:1]
            queryset =  Vet.objects.filter(client=_user).order_by('-id') 
        
        else:
            queryset = Vet.objects.all()
        return queryset         


#Pet Management  Viewset 
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class PetViewSet(ModelViewSet):
    serializer_class = PetSerializer
    http_method_names = ["get","post","put","delete"]    
    queryset = Pet.objects.all() 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message':'Pet Has Been Deleted Successfully!'})   

    def get_queryset(self):
        """
        This view should return a list of all the services
        for the currently authenticated user.
        """
        # _user = self.request.user
        
        get_user = self.request.query_params.get('cid')
        if get_user:
            _user = Client.objects.filter(id=get_user)[:1]
            queryset =  Pet.objects.filter(client=_user).order_by('-id') 
        
        else:
            queryset = Pet.objects.all()
        return queryset    


#Pet Management  Viewset 
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ClientViewSet(ModelViewSet):
    serializer_class = ClientSerializer
    http_method_names = ["get","post","put"]    
    queryset = Client.objects.all()       



#Pet Management  Viewset 
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffviewSet(ModelViewSet):
    serializer_class = StaffSerializer
    http_method_names = ["post","get","put"]    
    queryset = Staff.objects.all()       



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    http_method_names = ["post","get","put"]    
    queryset = Task.objects.all()    


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class RoleViewSet(ModelViewSet):
    serializer_class = RoleSerializer
    http_method_names = ["post","get","put"]    
    queryset = Role.objects.all()    



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class DocumentViewSet(ModelViewSet):
    serializer_class = DocumentSerializer
    http_method_names = ["post","get","put","delete"]    
    queryset = Document.objects.all() 

    def get_queryset(self):
        """
        This view should return a list of all the services
        for the currently authenticated user.
        """
        # _user = self.request.user
        
        get_user = self.request.query_params.get('cid')
        if get_user:
            _user = Client.objects.filter(id=get_user)[:1]
            queryset =  Document.objects.filter(client=_user).order_by('-id') 
        
        else:
            queryset = Document.objects.all()
        return queryset  

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message':'Document Has Been Deleted Successfully!'})   

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)     



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class keysViewSet(ModelViewSet):
    serializer_class = KeysSerializer
    http_method_names = ["post","get","delete"]    
    queryset = Keys.objects.all()   

    def get_queryset(self):
        """
        This view should return a list of all the services
        for the currently authenticated user.
        """
        # _user = self.request.user
        
        get_user = self.request.query_params.get('cid')
        if get_user:
            _user = Client.objects.filter(id=get_user)[:1]
            queryset =  Keys.objects.filter(client=_user).order_by('-id') 
        
        else:
            queryset = Keys.objects.all()
        return queryset 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)   


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "message":"Keys deleted successfully"
        },
        status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()    



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class HistoryViewSet(ModelViewSet):
    serializer_class = HistorySerializer
    http_method_names = ["get",]    
    queryset = History.objects.all()    

    def get_queryset(self):
        """
        This view should return a list of all the services
        for the currently authenticated user.
        """
        # _user = self.request.user
        
        get_user = self.request.query_params.get('cid')
        if get_user:
            _user = Client.objects.filter(id=get_user)[:1]
            queryset =  History.objects.filter(client=_user).order_by('-id') 
        
        else:
            queryset = History.objects.all()
        return queryset     



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SettingCompanyViewSet(ModelViewSet):
    serializer_class = SettingCompanySerializer
    http_method_names = ["post",]    
    queryset = SettingCompany.objects.all()   


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SettingPrimaryContactViewSet(ModelViewSet):
    serializer_class = SettingPrimaryContactSerializer
    http_method_names = ["post",]    
    queryset = SettingPrimaryContact.objects.all()   


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SettingAddressViewSet(ModelViewSet):
    serializer_class = SettingAddressSerializer
    http_method_names = ["post",]    
    queryset = SettingAddress.objects.all()  


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SettingEmergencyContactViewSet(ModelViewSet):
    serializer_class = EmergencyContactSerializer
    http_method_names = ["post",]    
    queryset = EmergencyContact.objects.all()                              


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer
    http_method_names = ["get","post","put","delete"]    
    queryset = Service.objects.all()


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ServiceAutoFeeViewSet(ModelViewSet):
    serializer_class = ServiceAutoFeeSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = ServiceAutoFee.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ServiceFrequencyPeriodViewSet(ModelViewSet):
    serializer_class = ServiceFrequencyPeriodSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = ServiceFrequencyPeriod.objects.all()


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class PackageViewSet(ModelViewSet):
    serializer_class = PackageSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = Package.objects.all()


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class InvoiceViewSet(ModelViewSet):
    serializer_class = InvoiceSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = Invoice.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffListViewSet(ModelViewSet):
    serializer_class = StaffListSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffList.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffActivityFieldViewSet(ModelViewSet):
    serializer_class = StaffActivityFieldSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffActivityField.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffKeyViewSet(ModelViewSet):
    serializer_class = StaffKeySerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffKey.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffServiceViewSet(ModelViewSet):
    serializer_class = StaffServiceSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffService.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffRateViewSet(ModelViewSet):
    serializer_class = StaffRateSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffRate.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffDocumentViewSet(ModelViewSet):
    serializer_class = StaffDocumentSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffDocument.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class StaffPayStubViewSet(ModelViewSet):
    serializer_class = StaffPayStubSerializer
    http_method_names = ["get","post","put","delete"]
    queryset = StaffPayStub.objects.all()
