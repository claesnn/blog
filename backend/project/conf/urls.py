"""URL Configuration for the project."""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("api/api-auth/", include("rest_framework.urls")),
]
