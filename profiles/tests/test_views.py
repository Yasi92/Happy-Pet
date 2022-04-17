
from django.test import TestCase, Client
from django.urls import reverse

from products.models import Product, Category, ProductReview, Subcategories
from ..models import User, UserProfile
from checkout.models import Order




class TestViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='username', password='Mypassword')
        self.user.save()
        self.client = Client()
        self.client.login(username=self.user.username, password='Mypassword')
        self.profile_url = reverse('profile')



    # Tests profile page for logged in users
    def test_profile_GET_request(self):
        response = self.client.get(self.profile_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'profiles/profile.html')
        


    # Tests update profile info
    def test_profile_POST_request(self):

        self.init_user= UserProfile.objects.get(user=self.user)

        response = self.client.post(self.profile_url, {
            'user' : self.user,
            'default_city' : 'Amsterdam',
            'default_county' : 'test_county',

        })

        self.init_user.refresh_from_db()
        new_data = UserProfile.objects.get(user=self.user)

        self.assertEquals(new_data.default_city, 'Amsterdam')
        self.assertEquals(new_data.default_county, 'test_county')
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'profiles/profile.html')


    # Tests order history of a client
    def test_order_history(self):
        self.init_user= UserProfile.objects.get(user=self.user)

        order = Order.objects.create(
            order_number=5545476868657,
            user_profile = self.init_user,
            full_name = 'user',
            email='test@gmail.com',
            phone_number= '0618435737',
            country= 'ir',
            town_or_city='anywhere',
            street_address1='borneo',
            stripe_pid = 5786755,
    
        )


        self.order_history_url = reverse('order_history', args=[order.order_number])
        response = self.client.get(self.order_history_url, args=[order.order_number])

        self.assertTemplateUsed(response, 'checkout/checkout_success.html')
        self.assertEquals(response.status_code, 200)


    def test_add_review_GET_request(self):
        product = Product.objects.create(
        name='test_product',
        category=Category.objects.create(category_id=6, name='test_category'),
        subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
        price=11.2, sku=46576,
        )

        self.add_review_url = reverse('add_review', args=[product.product_id])    
        response = self.client.get(self.add_review_url)

        self.assertTemplateUsed('profiles/add_review.html')
        self.assertEquals(response.status_code, 200)





    # Tests adding reviews to products
    def test_add_review_POST_request(self):
        product = Product.objects.create(
            name='test_product',
            category=Category.objects.create(category_id=6, name='test_category'),
            subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
            price=11.2, sku=46576
        )

        self.add_review_url = reverse('add_review', args=[product.product_id])    
        response = self.client.post(self.add_review_url, {
            'stars' : 3,
            'content' : 'test review',
        })

   
        review_added = ProductReview.objects.get(product=product.product_id)

        self.assertEquals(response.status_code, 302)
        self.assertEquals(review_added.content, 'test review')
        self.assertEquals(review_added.stars, 3)
        self.assertTemplateUsed('profiles/add_review.html')




            





    

