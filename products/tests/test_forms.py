from django.test import SimpleTestCase
from ..models import Category, Subcategories
from ..forms import ProductReviewForm, ProductForm


class TestForms(SimpleTestCase):
    databases = '__all__'

    def test_product_review_form_with_valid_data(self):
        ''' Tests if the form has required data and is valid '''

        form = ProductReviewForm(data={
            'content': 'test content',
            'stars': 4,
        })

        self.assertTrue(form.is_valid())

    def test_product_review_form_with_no_data(self):
        ''' Tests if the form is not valid and has no data '''

        form = ProductReviewForm(data={})

        self.assertFalse(form.is_valid())
        # 1 is set as form error length since there
        # is only 1 required field
        self.assertEquals(len(form.errors), 1)

    def test_product_review_form_with_invalid_data(self):
        ''' Tests if the star field has valid data '''

        form = ProductReviewForm(data={
            'content': 'test',
            'stars': 'string'
        })

        self.assertFalse(form.is_valid())
        self.assertEqual(
            form.errors['stars'][0], 'Enter a whole number.')

    def test_product_form_with_valid_data(self):
        ''' Tests product form with valid data '''

        category = Category.objects.create(
            name='test_category1', category_id=5)

        subcategory = Subcategories.objects.create(
            name='test_subcategory1', subcategory_id=5)

        form = ProductForm(data={
            'name': 'test_product',
            'category': category,
            'subcategory': subcategory,
            'friendlyname': 'test_friendlyname',
            'price': 45,
            'sku': '6545657',
        })

        self.assertTrue(form.is_valid())

    def test_product_form_with_no_data(self):
        ''' Tests product form with no data '''

        form = ProductForm(data={})

        self.assertFalse(form.is_valid())

    def test_product_form_with_invalid_data(self):
        ''' Tests product form with invalid data '''

        category = Category.objects.create(
            name='test_category1', category_id=8)

        subcategory = Subcategories.objects.create(
            name='test_subcategory1', subcategory_id=98)

        form = ProductForm(data={
            'name': '',
            'category': category,
            'subcategory': subcategory,
            'friendlyname': 'test_friendlyname',
            'price': 'none-int',
            'sku': '6545657',

        })

        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors['name'][0], 'This field is required.')
        self.assertEqual(form.errors['price'][0], 'Enter a number.')
