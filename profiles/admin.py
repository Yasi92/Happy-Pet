from django.contrib import admin
from .models import UserProfile


class AdminUserProfile(admin.ModelAdmin):
    list_display = (
        'user',
    )


admin.site.register(UserProfile, AdminUserProfile)
