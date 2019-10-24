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
    path('api/Address/', AddressList.as_view()),
    path('api/Address/<int:pk>/', AddressDetail.as_view()),
    path('api/Person/', PersonList.as_view()),
    path('api/Person/<int:pk>/', PersonDetail.as_view()),
    path('api/Config/', ConfigList.as_view()),
    path('api/Config/<int:pk>/', ConfigDetail.as_view()),
    path('api/Potency/', PotencyList.as_view()),
    path('api/Potency/<int:pk>/', PotencyDetail.as_view()),
    path('api/Device/', DeviceList.as_view()),
    path('api/Device/<int:pk>/', DeviceDetail.as_view()),
    path('api/Monitors/', MonitorsList.as_view()),
    path('api/Monitors/<int:pk>/', MonitorsDetail.as_view()),
   

    path('user/login', LoginView.as_view(template_name= 'admin/login.html')),
    path('user/logout', LogoutView),

]

'''

path('user/<int:pk>', UserDetail.as_view()),

'''