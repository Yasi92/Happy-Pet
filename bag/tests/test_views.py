from django.test import TestCase, Client
from django.urls import reverse

from products.models import Product, Category, Subcategories
from profiles.models import User

class TestViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='username', password='Mypassword')
        self.user.save()
        self.client = Client()
        self.bag_url = reverse('bag')


    def test_bag_view(self):
        ''' Tests the bag view '''

        response = self.client.get(self.bag_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'bag/bag.html')


    def test_add_to_bag_view(self):
        """ Tests remove item from bag """

        product = Product.objects.create(name='test_product3',
                        category=Category.objects.create(category_id=6, 
                                                        name='test_category'),
                        subcategory=Subcategories.objects.create(subcategory_id=67,
                                                        name="test_subcategory"),
                        price=11.2, sku=46576) 
        self.add_to_bag_url = reverse('add_to_bag', args=[product.product_id])
        session = self.client.session
        session['bag'] = {product.product_id : 3}
        session.save()
        response = self.client.post(self.add_to_bag_url, {
            'quantity' :3,
            'redirect_url': f'/products/{product.product_id}/',
        })

        self.assertEquals(response.status_code, 302)
        self.assertIn(product.product_id, session['bag'])
        self.assertRedirects(response, f'/products/{product.product_id}/')


    def test_adjust_bag(self):
        """ Tests adjusting bag """

        product = Product.objects.create(name='test_product3',
                        category=Category.objects.create(category_id=6, name='test_category'),
                        subcategory=Subcategories.objects.create(subcategory_id=67, 
                                                            name="test_subcategory"),
                        price=11.2, sku=46576) 
        self.adjust_bag_url = reverse('adjust_bag', args=[product.product_id])
        session = self.client.session
        session['bag'] = {product.product_id : 2}
        response = self.client.post(self.adjust_bag_url, {
            'quantity' : 4,
        })
        session.save()

        self.assertEquals(response.status_code, 302)
        self.assertRedirects(response, '/bag/')

        

    def test_remove_from_bag(self):
        """ Tests remove item from bag """

        product = Product.objects.create(name='test_product3',
                        category=Category.objects.create(category_id=6, name='test_category'),
                        subcategory=Subcategories.objects.create(subcategory_id=67, 
                                                                name="test_subcategory"),
                        price=11.2, sku=46576) 
        self.remove_from_bag_url = reverse('remove_from_bag', args=[product.product_id])
        session = self.client.session
        session['bag'] = {product.product_id : 1}
        session.save()  
        response = self.client.get(self.remove_from_bag_url)

        self.assertEquals(response.status_code, 200)

       


        

