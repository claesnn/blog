"""Serializers for the core app."""

from rest_framework import serializers

from .models import Blog, Comment


class BlogSerializer(serializers.ModelSerializer):
    """Blog serializer"""

    class Meta:
        model = Blog
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    """Comment serializer"""

    class Meta:
        model = Comment
        fields = "__all__"
