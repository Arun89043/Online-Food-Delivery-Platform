from django.db import models
from django.conf import settings


class Restaurant(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="restaurants"
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class MenuItem(models.Model):

    CATEGORY_CHOICES = (
        ('food', 'Food'),
        ('drink', 'Drink'),
    )

    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="menu_items"
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=True)

    # ✅ NEW FIELD
    category = models.CharField(
        max_length=10,
        choices=CATEGORY_CHOICES,
        default='food'
    )

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"
