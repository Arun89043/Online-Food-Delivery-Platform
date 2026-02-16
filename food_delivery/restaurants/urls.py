from django.urls import path
from .views import list_restaurants, list_menu_items

urlpatterns = [
    path('restaurants/', list_restaurants),
    path('restaurants/<int:restaurant_id>/menu/', list_menu_items),
]
