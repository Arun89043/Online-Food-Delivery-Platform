from django.urls import path
from .views import test_users

urlpatterns = [
    path('test-users/', test_users),
]
