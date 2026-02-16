from django.urls import path
from .views import create_order, my_orders, update_order_status, cancel_order, mark_order_paid

urlpatterns = [
    path('orders/', create_order),
    path('orders/my/', my_orders),
    path('orders/<int:order_id>/status/', update_order_status),
    path('orders/<int:order_id>/cancel/', cancel_order),
    path('orders/<int:order_id>/pay/', mark_order_paid),
]
