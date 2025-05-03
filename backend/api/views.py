from rest_framework import viewsets
from .models import User, Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework.exceptions import ValidationError

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')  # Últimos posts primero
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        # Allow the user to be explicitly passed in the request data
        user_id = self.request.data.get('user')
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                serializer.save(user=user)
            except User.DoesNotExist:
                raise ValueError("Invalid user ID provided.")
        else:
            raise ValueError("User ID is required to create a post.")

class CommentViewSet(viewsets.ModelViewSet):
    # queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        # Get `post_pk` from the nested route
        post_id = self.kwargs.get('post_pk')
        if post_id:
            return Comment.objects.filter(post_id=post_id)
        return Comment.objects.all()

    def perform_create(self, serializer):
        # Get the post from the nested route
        post_id = self.kwargs.get('post_pk')
        if not post_id:
            raise ValidationError("Post ID is required to create a comment.")

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise ValidationError("Invalid post ID provided.")

        # Get the user ID from the request data
        user_id = self.request.data.get('user')
        if not user_id:
            raise ValidationError("User ID is required to create a comment.")

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise ValidationError("Invalid user ID provided.")

        # Save the comment with the post and user
        serializer.save(post=post, user=user)