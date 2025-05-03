from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet, CommentViewSet
from rest_framework_nested.routers import NestedSimpleRouter

# Crear un router y registrar nuestras vistas
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')      # GET, POST, PUT, DELETE para usuarios
router.register(r'posts', PostViewSet, basename='post')      # GET, POST, PUT, DELETE para posts
# router.register(r'comments', CommentViewSet) # GET, POST, PUT, DELETE para comentarios

# Nested router for comments under posts
posts_router = NestedSimpleRouter(router, r'posts', lookup='post')
posts_router.register(r'comments', CommentViewSet, basename='post-comments')

# Definir las URLs de la API
urlpatterns = [
    path('', include(router.urls)), 
    path('', include(posts_router.urls)),# Incluir todas las rutas generadas automáticamente
]
