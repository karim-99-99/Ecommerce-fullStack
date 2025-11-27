from django.shortcuts import render
from rest_framework import viewsets , permissions ,parsers
from .models import Product, Category, ProductImage
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response
#  Create your views here.

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin users to edit objects.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to admin users.
        return bool(request.user and request.user.is_staff)

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object   

    to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user
        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser | permissions.IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def create(self, request, *args, **kwargs):
        # Get all image files from request
        image_files = request.FILES.getlist('images') or []
        main_image = request.FILES.get('image')
        
        # Create product with main image
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save(owner=request.user)
        
        # Create ProductImage instances for additional images
        for image_file in image_files:
            ProductImage.objects.create(product=product, image=image_file)
        
        # If no main image but we have additional images, use first one as main
        if not main_image and image_files:
            product.image = image_files[0]
            product.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    @action(detail=False, url_path='category/(?P<slug>[^/.]+)')
    def by_category(self, request, slug=None):
        products = Product.objects.filter(category__slug__iexact=slug)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)  