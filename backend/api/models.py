from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):  
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    friends = models.ManyToManyField("self", blank=True)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )

    def __str__(self):
        return self.username


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')  # Relación con usuario
    content = models.TextField()  # Texto del post
    image = models.ImageField(upload_to='posts/', blank=True, null=True)  # Imagen opcional
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha automática

    def __str__(self):
        return f"{self.user.username} - {self.created_at}"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')  # Relación con Post
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relación con Usuario
    content = models.TextField()  # Contenido del comentario
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha automática

    def __str__(self):
        return f"{self.user.username} - {self.post.id}"
