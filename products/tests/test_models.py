from django.contrib.auth.models import User
from django.test import TestCase
from ..models import Category, Subcategories, Product, ProductReview


class TestModels(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='username',
            password='password'
        )
        self.category = Category.objects.create(
            category_id=6, name='test_category',
            friendlyname='test_friendlyname')
        self.subcategory = Subcategories.objects.create(
            subcategory_id=67, name="test_subcategory")

        self.product = Product.objects.create(
            name='test_product',
            category=self.category,
            subcategory=self.subcategory,
            price=11.2, sku=46576, has_sizes='small, medium')

        self.product_review = ProductReview.objects.create(
            product=self.product,
            user=self.user,
            stars=3,
            content="test review product content",
        )

    # Tests Category models creates an instance of the model
    def test_category_model(self):
        self.assertEquals(self.category.name, 'test_category')
        self.assertEquals(self.category.category_id, 6)

    # Tests initial string method of the model
    def test_str_method_of_category_model(self):
        self.assertEquals(self.category.__str__(),
                          'test_category')

    def test_category_get_friendly_name_method(self):
        self.assertEquals(self.category.get_friendly_name(),
                          'test_friendlyname')

    # Tests Subcategory models creates an instance of the model
    def test_subcategory_model(self):
        self.assertEquals(self.subcategory.name, 'test_subcategory')
        self.assertEquals(self.subcategory.subcategory_id, 67)

    # Tests initial string method of the model
    def test_str_method_of_subcategory_model(self):
        self.assertEquals(self.subcategory.__str__(), 'test_subcategory')

    # Tests Product models creates an instance of the model
    def test_product_model(self):
        self.assertEquals(self.product.name, 'test_product')
        self.assertEquals(self.product.subcategory.name,
                          'test_subcategory')
        self.assertEquals(self.product.category.name, 'test_category')
        self.assertEquals(self.product.sku, 46576)
        self.assertEquals(self.product.has_sizes, 'small, medium')

    # Tests initial string method of the model
    def test_str_method_of_product_model(self):
        self.assertEquals(self.product.__str__(), 'test_product')

    def test_ProductReview_model(self):
        self.assertEquals(self.product_review.user.username, 'username')
        self.assertEquals(self.product_review.product.name, 'test_product')
        self.assertEquals(self.product_review.stars, 3)
        self.assertEquals(self.product_review.content,
                          'test review product content')
        self.assertTrue(self.product_review.date, None)
