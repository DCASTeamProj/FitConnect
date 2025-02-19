from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet, CommentViewSet

# Crear un router y registrar nuestras vistas
router = DefaultRouter()
router.register(r'users', UserViewSet)      # GET, POST, PUT, DELETE para usuarios
router.register(r'posts', PostViewSet)      # GET, POST, PUT, DELETE para posts
router.register(r'comments', CommentViewSet) # GET, POST, PUT, DELETE para comentarios

# Definir las URLs de la API
urlpatterns = [
    path('', include(router.urls)),  # Incluir todas las rutas generadas automáticamente
]
