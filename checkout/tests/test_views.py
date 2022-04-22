from django.test import TestCase, Client
from django.urls import reverse
from products.models import Product, Category, Subcategories
from checkout.models import Order
from profiles.models import User, UserProfile


class TestViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
                                    username='username',
                                    password='Mypassword')
        self.user.save()
        self.client = Client()
        self.client.login(username=self.user.username,
                          password='Mypassword')
        self.checkout_url = reverse('checkout')
        self.user_profile = UserProfile.objects.get(user=self.user)

    def test_checkout_view_if_bag_is_not_empty(self):
        ''' Tests the checkout view with stuffed bag '''
        product = Product.objects.create(
            name='test_product3',
            category=Category.objects.create(
                category_id=6, name='test_category'),
            subcategory=Subcategories.objects.create(
                subcategory_id=67, name="test_subcategory"),
            price=11.2, sku=46576)
        session = self.client.session
        session['bag'] = {product.product_id: 2}
        session.save()
        response = self.client.get(self.checkout_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'checkout/checkout.html')

    def test_checkout_view_if_bag_is_empty(self):
        ''' Tests the checkout view with empty bag '''

        session = self.client.session
        session['bag'] = {}
        session.save()

        response = self.client.get(self.checkout_url)

        self.assertEquals(response.status_code, 302)
        self.assertRedirects(response, '/products/')

    def test_checkout_seccess_view_if_save_info_is_checked(self):
        ''' Tests the checkout success
        view and updated profile
        if the save-info button is checked '''

        session = self.client.session
        session['save_info'] = True
        session.save()
        self.order = Order.objects.create(
            user_profile=self.user_profile,
            full_name='test_full_name',
            email='test@gmail.com',
            phone_number='56586767',
            country='NL',
            postcode='436hf',
            town_or_city='Amsterdam',
            street_address1='test_street1',
            county='',
        )

        self.checkout_success_url = reverse(
            'checkout_success', args=[self.order.order_number])
        response = self.client.get(self.checkout_success_url)
        self.user_profile.refresh_from_db()
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed('checkout/checkout_success.html')
        self.assertEqual(self.user_profile.default_city, 'Amsterdam')
        self.assertEqual(self.user_profile.default_country, 'NL')

    def test_checkout_seccess_view_if_save_info_is_not_checked(self):
        ''' Tests the profile model is not updated
            if the save-info button is not checked '''

        session = self.client.session
        session['save_info'] = False
        session.save()
        self.order = Order.objects.create(
            user_profile=self.user_profile,
            full_name='test_full_name',
            email='test@gmail.com',
            phone_number='56586767',
            country='NL',
            postcode='436hf',
            town_or_city='Amsterdam',
            street_address1='test_street1',
            county='',
        )
        self.checkout_success_url = reverse(
            'checkout_success', args=[self.order.order_number])
        response = self.client.get(self.checkout_success_url)
        self.user_profile.refresh_from_db()

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed('checkout/checkout_success.html')
        self.assertFalse(self.user_profile.default_city, 'Amsterdam')
        self.assertEquals(self.user_profile.default_city, None)
        self.assertFalse(self.user_profile.default_country, 'NL')
        self.assertEquals(self.user_profile.default_country, None)
