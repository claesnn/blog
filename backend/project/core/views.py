"""Core views"""

import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer


@api_view(["GET"])
def get_csrf_token(request):
    """Get CSRF token"""
    csrf = get_token(request)
    response = Response({"detail": "CSRF cookie set", "csrftoekn": csrf})
    response.set_cookie("csrftoken", csrf)
    return response


@api_view(["POST"])
def api_login_view(request):
    """API login view"""

    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return JsonResponse(
            {"detail": f"{username} logged in successfully"}, status=200
        )
    return JsonResponse({"detail": "Invalid credentials"}, status=401)


@api_view(["GET"])
@ensure_csrf_cookie
def get_user(request):
    """Get users view"""

    if request.user.is_authenticated:
        return Response(
            {"username": request.user.username, "email": request.user.email},
            status=200,
        )
    else:
        return Response({"detail": "User is not authenticated"}, status=200)


@api_view(["GET"])
def check_login(request):
    """Check login view"""

    if request.user.is_authenticated:
        return Response(
            {"detail": "User is authenticated", "user": request.user.username},
            status=200,
        )
    else:
        return Response({"detail": "User is not authenticated"}, status=200)


@api_view(["POST"])
def check_post(request):
    """Check post view"""
    data = request.data
    return Response(data, status=200)


class BlogViewSet(viewsets.ModelViewSet):
    """Blog view set"""

    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=["get"])
    def comments(self, request, pk=None):
        """Get comments"""
        blog = self.get_object()
        comments = blog.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    """Comment view set"""

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [IsAuthenticatedOrReadOnly]
