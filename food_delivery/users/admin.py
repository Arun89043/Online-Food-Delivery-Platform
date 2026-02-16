from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User

    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {
            "fields": ("user_type", "phone_number", "address")
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Info", {
            "fields": ("user_type", "phone_number", "address")
        }),
    )


admin.site.register(User, CustomUserAdmin)
