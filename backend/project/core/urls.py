from django.urls import path
from rest_framework import routers

from .views import (
    BlogViewSet,
    CommentViewSet,
    api_login_view,
    check_login,
    check_post,
    get_csrf_token,
    get_user,
)

router = routers.DefaultRouter()

router.register(r"blogs", BlogViewSet, basename="blog")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = router.urls

urlpatterns += [
    path("csrf/", get_csrf_token, name="get_csrf_token"),
    path("login/", api_login_view, name="api-login"),
    path("check-login/", check_login, name="create"),
    path("check-post/", check_post, name="check_post"),
    path("user-detail/", get_user, name="get_user"),
]
