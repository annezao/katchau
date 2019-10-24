from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView

from .views import (
    AddressList,
    AddressDetail,
    PersonList,
    PersonDetail,
    ConfigList,
    ConfigDetail,
    PotencyList,
    PotencyDetail,
    DeviceList,
    DeviceDetail,    
    MonitorsList,
    MonitorsDetail,
)
'''

'''
urlpatterns = [
    path('api/address/', AddressList.as_view()),
    path('api/address/<int:pk>/', AddressDetail.as_view()),
    path('api/person/', PersonList.as_view()),
    path('api/person/<int:pk>/', PersonDetail.as_view()),
    path('api/config/', ConfigList.as_view()),
    path('api/config/<int:pk>/', ConfigDetail.as_view()),
    path('api/potency/', PotencyList.as_view()),
    path('api/potency/<int:pk>/', PotencyDetail.as_view()),
    path('api/device/', DeviceList.as_view()),
    path('api/device/<int:pk>/', DeviceDetail.as_view()),
    path('api/monitors/', MonitorsList.as_view()),
    path('api/monitors/<int:pk>/', MonitorsDetail.as_view()),
   

    path('user/login', LoginView.as_view(template_name= 'admin/login.html')),
    path('user/logout', LogoutView),

]

'''

path('user/<int:pk>', UserDetail.as_view()),

'''