from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView

from .views import (
    PotencyList,
    PotencyDetail,
    DeviceList,
    DeviceDetail,
    PersonList,
    PersonDetail,
    AddressList,
    AddressDetail,
    ConfigList,
    ConfigDetail,
    AccountList,

)

urlpatterns = [
    path('api/Potency/', PotencyList.as_view()),
    path('api/Potency/<int:pk>/', PotencyDetail.as_view()),
    path('api/Device/', DeviceList.as_view()),
    path('api/Device/<int:pk>/', DeviceDetail.as_view()),
    path('api/Person/', PersonList.as_view()),
    path('api/Person/<int:pk>/', PersonDetail.as_view()),
    path('api/Address/', AddressList.as_view()),
    path('api/Address/<int:pk>/', AddressDetail.as_view()),
    path('api/Config/', ConfigList.as_view()),
    path('api/Config/<int:pk>/', ConfigDetail.as_view()),
    path('api/Account/', AccountList.as_view()),


]