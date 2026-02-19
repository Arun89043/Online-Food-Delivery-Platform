from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import Order, OrderItem
from restaurants.models import MenuItem


# ✅ CREATE ORDER
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    items = request.data.get("items", [])

    if not items:
        return Response({"error": "No items provided"}, status=400)

    with transaction.atomic():
        order = Order.objects.create(
            customer=user,
            payment_status='unpaid'
        )

        total_price = 0

        for item in items:
            menu_item_id = item.get("menu_item_id")
            quantity = item.get("quantity", 1)

            try:
                menu_item = MenuItem.objects.get(id=menu_item_id)
            except MenuItem.DoesNotExist:
                return Response({"error": "Menu item not found"}, status=404)

            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=quantity
            )

            total_price += menu_item.price * quantity

        order.total_price = total_price
        order.save()

    return Response({
        "message": "Order created successfully",
        "order_id": order.id,
        "total_price": order.total_price,
        "payment_status": order.payment_status
    })


# ✅ MY ORDERS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user
    orders = Order.objects.filter(customer=user)

    data = []

    for order in orders:
        items = []

        for item in order.items.all():
            items.append({
                "menu_item": item.menu_item.name,
                "quantity": item.quantity,
                "price": item.menu_item.price,
            })

        data.append({
            "order_id": order.id,
            "status": order.status,
            "payment_status": order.payment_status,
            "total_price": order.total_price,
            "items": items
        })

    return Response(data)


# ✅ UPDATE ORDER STATUS (Restaurant Owner Only)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    user = request.user
    restaurant_owner = order.items.first().menu_item.restaurant.owner

    if not (user == restaurant_owner or user.is_staff):
        return Response({"error": "You are not allowed to update this order"}, status=403)

    new_status = request.data.get("status")

    valid_statuses = [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled"
    ]

    if new_status not in valid_statuses:
        return Response({"error": "Invalid status"}, status=400)

    order.status = new_status
    order.save()

    return Response({
        "message": "Order status updated",
        "order_id": order.id,
        "new_status": order.status
    })


# ✅ CANCEL ORDER (Customer Only)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    if request.user != order.customer:
        return Response({"error": "You can only cancel your own order"}, status=403)

    if order.status != "pending":
        return Response({"error": "Only pending orders can be cancelled"}, status=400)

    order.status = "cancelled"
    order.save()

    return Response({
        "message": "Order cancelled successfully",
        "order_id": order.id,
        "status": order.status
    })


# ✅ MARK PAYMENT AS PAID (Customer Only)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_order_paid(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    if request.user != order.customer:
        return Response({"error": "You can only pay for your own order"}, status=403)

    if order.payment_status == "paid":
        return Response({"error": "Order already paid"}, status=400)

    order.payment_status = "paid"
    order.save()

    return Response({
        "message": "Payment successful",
        "order_id": order.id,
        "payment_status": order.payment_status
    })
