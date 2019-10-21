from django.urls import path
from .views import (
    AddressList,
    AddressDetail,
    PotencyList,
    PotencyDetail,
)

urlpatterns = [
    path('api/address/', AddressList.as_view()),
    path('api/address/<int:pk>/', AddressDetail.as_view()),
    path('api/potency/', PotencyList.as_view()),
    path('api/potency/<int:pk>/', PotencyDetail.as_view()),
    
]