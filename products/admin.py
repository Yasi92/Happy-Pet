from django.contrib import admin
from .models import Category, Product, Subcategories, ProductReview

class AdminProduct(admin.ModelAdmin):
    list_display = (
        'sku',
        'name',
        'price',
        'rating',
        'CategoryName',
        'SubCategoryName',
    )
    ordering = ('name',)

class AdminCategory(admin.ModelAdmin):
    list_display = (
        'name',
        'friendlyname',
    )

class AdminSubcategories(admin.ModelAdmin):
    list_display = (
        'name',
    )    

class AdminProductReview(admin.ModelAdmin):
    list_display = (
        'user',
        'product',
        'stars',
    )


admin.site.register(Category, AdminCategory)
admin.site.register(Product, AdminProduct)
admin.site.register(Subcategories, AdminSubcategories)
admin.site.register(ProductReview, AdminProductReview)



