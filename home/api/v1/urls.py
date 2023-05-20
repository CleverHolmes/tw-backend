from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    #Introduce New Company
    IntroduceCompanyViewSet,
    BusinessYearViewSet,
    NumberOfStaffViewSet,
    CurrencyListViewSet,
    PetSittingSoftwareViewSet,
    VetViewSet,
    PetViewSet,
    ClientViewSet,
    StaffviewSet,
    TaskViewSet,
    RoleViewSet,
    DocumentViewSet,
    keysViewSet,
    HistoryViewSet,

    #Setting Section 
    SettingCompanyViewSet,
    SettingPrimaryContactViewSet,
    SettingAddressViewSet,
    SettingEmergencyContactViewSet, 


    # Services
    ServiceViewSet,
    ServiceAutoFeeViewSet,
    ServiceFrequencyPeriodViewSet,
    PackageViewSet,
    InvoiceViewSet,
    # Staff
    StaffListViewSet,
    StaffActivityFieldViewSet,
    StaffKeyViewSet,
    StaffServiceViewSet,
    StaffRateViewSet,
    StaffDocumentViewSet,
    StaffPayStubViewSet

)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
#Introduce yourself for IntorduceYorselfViewset 
router.register("introduce_company", IntroduceCompanyViewSet, basename="introduce_company")
router.register("business_year", BusinessYearViewSet, basename="business_year")
router.register("number_of_staff", NumberOfStaffViewSet, basename="number_of_staff")
router.register("currency_list", CurrencyListViewSet, basename="currency_list")
router.register("pet_sitting_software", PetSittingSoftwareViewSet, basename="pet_sitting_software")
router.register("client_vet", VetViewSet, basename="client_vet")
router.register("client_pet", PetViewSet, basename="client_pet")
router.register("client", ClientViewSet, basename="client")
#Client Search
router.register("client", ClientViewSet, basename="client")
router.register("staff", StaffviewSet, basename="staff")
router.register("task", TaskViewSet, basename="task")
router.register("role", RoleViewSet, basename="role")
router.register("document", DocumentViewSet, basename="document")
router.register("keys", keysViewSet, basename="keys")
router.register("history", HistoryViewSet, basename="history")

router.register("setting_company", SettingCompanyViewSet, basename="setting_company")
router.register("setting_primary_contact", SettingPrimaryContactViewSet, basename="setting_primary_contact")
router.register("setting_address", SettingAddressViewSet, basename="setting_address")
router.register("setting_emergency_contact", SettingEmergencyContactViewSet, basename="setting_emergency_contact")

# Service
router.register("services", ServiceViewSet, basename="services")
router.register("services-auto-fees", ServiceAutoFeeViewSet, basename="services-auto-fees")
router.register("services-frequency-period", ServiceFrequencyPeriodViewSet, basename="services-frequency-period")
router.register("packages", PackageViewSet, basename="packages")
# Invoicing
router.register("invoice", InvoiceViewSet, basename="invoice")
# Staff
router.register("staff-list", StaffListViewSet, basename="staff-list")
router.register("staff-activity-field", StaffActivityFieldViewSet, basename="staff-activity-field")
router.register("staff-key", StaffKeyViewSet, basename="staff-key")
router.register("staff-service", StaffServiceViewSet, basename="staff-service")
router.register("staff-rate", StaffRateViewSet, basename="staff-rate")
router.register("staff-document", StaffDocumentViewSet, basename="staff-document")
router.register("staff-pay-stub", StaffPayStubViewSet, basename="staff-pay-stub")



urlpatterns = [
    path("", include(router.urls)),
]
