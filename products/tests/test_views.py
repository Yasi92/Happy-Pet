
from math import prod
from unicodedata import category
from django.test import TestCase
from ..models import Category, Product, Subcategories
from ..forms import ProductForm

class TestViews(TestCase):

    def test_all_products(self):
        response = self.client.get('/products/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/products.html')


    def test_product_detail(self):
        product = Product.objects.create(name='test product',
                                 category=Category.objects.create(category_id=6, name='test'),
                                  subcategory=Subcategories.objects.create(subcategory_id=67, name="sub_test"),
                                   price=11.2, sku=46576)


        response = self.client.get(f'/products/{product.product_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/product_detail.html')


    def test_add_product(self):

        response = self.client.get('/products/add/')
        form = ProductForm({
            'name' : 'test',
            })

        self.assertTrue(form.is_valid())    


        # self.assertEqual(response.status_code, 200)
        # self.assertTemplateUsed(response, 'products/add_product.html')


