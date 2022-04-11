
from django.db import models
from multiselectfield import MultiSelectField
from django.contrib.auth.models import User


class Category(models.Model):
    category_id = models.IntegerField(db_column='category_ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=45)
    friendlyname = models.CharField(db_column='friendlyName', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'category'
        verbose_name_plural = 'Categories'


    def __str__(self):
        return self.name

    def get_friendly_name(self):
        return self.friendly_name



class Product(models.Model):
    small = 'Small'
    medium = 'Medium'
    large = 'Large'
    x_large = 'X-large'

    red = 'red'
    pink = 'Pink'
    green = 'Green'
    blue = 'Blue'
    grey = 'Grey'
    black = 'Black'
    white = 'White'
    brown = 'Brown'

    has_sizes = [
        (small, 'Small'),
        (medium, 'Medium'),
        (large, 'Large'),
        (x_large, 'X-large'),
    ]

    colors = [
        (red, 'Red'),
        (pink, 'Pink'),
        (green, 'Green'),
        (blue, 'Blue'),
        (grey, 'Grey'),
        (black, 'Black'),
        (white, 'White'),
        (brown, 'Brown')
    ]

    product_id = models.AutoField(db_column='Product_ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=45)
    friendlyname = models.CharField(db_column='friendlyName', max_length=45)  # Field name made lowercase.
    category = models.ForeignKey('Category', models.DO_NOTHING, db_column='category_ID')  # Field name made lowercase.
    subcategory = models.ForeignKey('Subcategories', models.DO_NOTHING, db_column='subcategory_ID')  # Field name made lowercase.
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    image1 = models.ImageField(blank=True, null=True)
    image2 = models.ImageField(blank=True, null=True)
    image3 = models.ImageField(blank=True, null=True)
    sku = models.CharField(unique=True, max_length=254)
    has_sizes = MultiSelectField(max_length=350, choices=has_sizes, blank=True, null=True)
    colors = MultiSelectField(max_length=350, choices=colors, blank=True, null=True)



    class Meta:
        managed = False
        db_table = 'Products'         
              

    def __str__(self):
        return self.name

    def CategoryName(self):
        return self.category.name

    def SubCategoryName(self):
        return self.subcategory.name



class Subcategories(models.Model):

    dogs = 'dogs'
    cats = 'cats'
    birds = 'birds'
    rodents = 'rodents'

    categories = [
        (dogs, 'dogs'),
        (cats, 'cats'),
        (birds, 'birds'),
        (rodents, 'rodents'),
    ]


    subcategory_id = models.AutoField(db_column='subcategory_ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=45)
    friendly_name = models.CharField(max_length=45, blank=True, null=True)
    category = MultiSelectField(max_length=350, choices=categories, blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'SUBCATEGORIES'   
        verbose_name_plural = 'Subcategories'


    def __str__(self):
        return self.name



class ProductReview(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    stars = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

