from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    images = ProductImageSerializer(many=True, read_only=True)  # ← NEW
    category = CategorySerializer(read_only=True)
    owner_username = serializers.ReadOnlyField(source='owner.username')
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price',
            'category', 'category_id',
            'stock_quantity', 'image', 'images',
            'created_at', 'owner_username'
        ]

        read_only_fields = ['id', 'created_at', 'owner_username']

    def validate(self, data):
        if data['price'] <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        if data['stock_quantity'] < 0:
            raise serializers.ValidationError("Stock quantity cannot be negative.")
        return data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['owner'] = request.user
        return super().create(validated_data)

    def to_representation(self, instance):
        """ ✅ Ensure full image URL is returned with HTTPS """
        representation = super().to_representation(instance)
        if instance.image:
            image_url = instance.image.url
            request = self.context.get('request')
            
            # If URL is already absolute (Cloudinary URLs are absolute)
            if image_url.startswith('http://') or image_url.startswith('https://'):
                # Force HTTPS for production (convert HTTP to HTTPS)
                if image_url.startswith('http://'):
                    representation['image'] = image_url.replace('http://', 'https://', 1)
                else:
                    representation['image'] = image_url
            else:
                # Build absolute URI using request
                if request:
                    absolute_url = request.build_absolute_uri(image_url)
                    # Force HTTPS in production
                    if absolute_url.startswith('http://') and not request.get_host().startswith('localhost'):
                        representation['image'] = absolute_url.replace('http://', 'https://', 1)
                    else:
                        representation['image'] = absolute_url
                else:
                    # Fallback: construct HTTPS URL manually for production
                    from django.conf import settings
                    if not settings.DEBUG:
                        base_url = 'https://ecommerce-fullstack-django.up.railway.app'
                        representation['image'] = f"{base_url}{image_url}" if image_url.startswith('/') else f"{base_url}/{image_url}"
                    else:
                        representation['image'] = image_url
        return representation


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']
