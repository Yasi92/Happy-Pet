from django.test import TestCase
from django.urls import reverse, resolve
from products.views import (
    all_products, product_detail,
    add_product, edit_product, delete_product,
    orders_overview)


# Testing urls are learned from
# (https://www.youtube.com/watch?v=0MrgsYswT1c&list=PLbpAWbHbi5rMF2j5n6imm0enrSD9eQUaM&index=2)


class TestUrls(TestCase):

    def test_all_products_url(self):
        url = reverse('products')
        self.assertEquals(resolve(url).func, all_products)

    def test_product_detail(self):
        url = reverse('product_detail', args=[77])
        self.assertEquals(resolve(url).func, product_detail)

    def test_add_products_url(self):
        url = reverse('add_product')
        self.assertEquals(resolve(url).func, add_product)

    def test_edit_product(self):
        url = reverse('edit_product', args=[77])
        self.assertEquals(resolve(url).func, edit_product)

    def test_delete_product(self):
        url = reverse('delete_product', args=[77])
        self.assertEquals(resolve(url).func, delete_product)

    def test_order_overviews(self):
        url = reverse('orders_overview')
        self.assertEquals(resolve(url).func, orders_overview)
