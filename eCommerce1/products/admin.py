from django.contrib import admin
from .models import Category, Product, ProductImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


class ProductImageInline(admin.TabularInline):      # 👈 NEW
    model = ProductImage
    extra = 3                                       # How many empty upload fields to show


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_quantity', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    inlines = [ProductImageInline]                  # 👈 ENABLE MULTIPLE IMAGES
