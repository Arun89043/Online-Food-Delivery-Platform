from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant, MenuItem


# ✅ List Active Restaurants
@api_view(['GET'])
def list_restaurants(request):
    restaurants = Restaurant.objects.filter(is_active=True)

    data = [
        {
            "id": r.id,
            "name": r.name,
            "description": r.description,
            "address": r.address,
            "phone": r.phone_number,
            "owner": r.owner.username
        }
        for r in restaurants
    ]

    return Response(data)


# ✅ List Menu Items (With Category Filter Support)
@api_view(['GET'])
def list_menu_items(request, restaurant_id):
    category = request.GET.get("category")  # <-- NEW

    menu_items = MenuItem.objects.filter(
        restaurant_id=restaurant_id,
        is_available=True
    )

    # 🔥 If category provided, filter it
    if category:
        menu_items = menu_items.filter(category=category)

    data = [
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "price": item.price,
            "category": item.category   # <-- optional but useful
        }
        for item in menu_items
    ]

    return Response(data)
