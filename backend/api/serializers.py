from rest_framework import serializers
from .models import User, Post, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'bio', 'profile_picture']

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Muestra info del usuario en lugar de solo el ID

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'image', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at']
