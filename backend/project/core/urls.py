from rest_framework import routers

from .views import BlogViewSet, CommentViewSet

router = routers.DefaultRouter()

router.register(r"blogs", BlogViewSet, basename="blog")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = router.urls
