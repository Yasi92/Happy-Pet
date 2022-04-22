from django.test import TestCase, Client
from django.urls import reverse

from products.models import Product, Category, Subcategories
from profiles.models import User


class TestViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='username', password='Mypassword')
        self.user.save()
        self.client = Client()
        self.wishlist_url = reverse('wishlist')


    def test_wishlist_view(self):
        ''' Tests the wishlist view '''
        response = self.client.get(self.wishlist_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'wishlist/wishlist.html')


    def test_add_to_wishlist(self):
        ''' Tests add to wish list '''
        product = Product.objects.create(name='test_product3',
                        category=Category.objects.create(category_id=6, name='test_category'),
                        subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
                        price=11.2, sku=46576) 
        self.add_to_wishlist_url = reverse('add_to_wishlist', args=[product.product_id])
        session = self.client.session
        session['wishlist_bag'] = {product.product_id : True}
        session['wishlist_item_id'] = [product.product_id]
        session.save()
        response = self.client.get(self.add_to_wishlist_url, HTTP_REFERER='happy-pet.com')

        self.assertEquals(response.status_code, 302)
        self.assertIn(product.product_id, session['wishlist_bag'])
        


    def test_remove_from_wishlist(self):
        ''' Tests remove item from wishlist '''
        product = Product.objects.create(name='test_product3',
                        category=Category.objects.create(category_id=6, name='test_category'),
                        subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
                        price=11.2, sku=46576) 
        self.remove_from_wishlist_url = reverse('remove_from_wishlist', args=[product.product_id])
        session = self.client.session
        session['wishlist_bag'] = {product.product_id : True}
        session['wishlist_item_id'] = [product.product_id]
        session.save()  
        response = self.client.get(self.remove_from_wishlist_url, HTTP_REFERER='happy-pet.com')

        self.assertEquals(response.status_code, 302)
       


        

