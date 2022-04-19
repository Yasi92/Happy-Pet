from math import prod
from django.test import TestCase
from ..models import Order, OrderLineItem
from products.models import Product, Category, Subcategories
from profiles.models import UserProfile, User

class TestModels(TestCase):
    def setUp(self):
        self.category= Category.objects.create(category_id=6, name='test_category', 
                                            friendlyname='test_friendlyname')
        self.subcategory = Subcategories.objects.create(subcategory_id=67, 
                                                name="test_subcategory")
        self.product = Product.objects.create(name='test_product',
                        category=self.category,
                        subcategory=self.subcategory,
                        price=11.2, sku=46576) 
        self.user = User.objects.create(
            username='username',
            password='password'
        )
        self.user_profile = UserProfile.objects.get(user=self.user)
        self.order = Order.objects.create(
            user_profile=self.user_profile,
            full_name='test_full_name',
            email='test@gmail.com',
            phone_number=56586767,
            country='nl',
            postcode='436hf',
            town_or_city='Amsterdam',
            street_address1 = 'test_street1',
        )
        self.order_line_item = OrderLineItem.objects.create(
            order=self.order,
            product=self.product,
            product_size='small',
            quantity=2,
        )


    def test_Order_model(self):
        ''' Tests _generate_order_number() method works and generate an order number '''

        self.assertIsNotNone(self.order.order_number)


    def test_string_mmethod_of_order_model(self):
        ''' Tests the string method formating of the model '''

        self.assertEquals(self.order.__str__(), self.order.order_number)    


    def test_updtae_order_total(self):
        ''' Tests that update_total() method return correct value '''

        self.assertEquals(self.order.grand_total, 
                            (self.product.price*self.order_line_item.quantity) 
                            + self.order.delivery_cost)
        self.assertEquals(self.order.grand_total, 24.64)
        self.assertIsNot(self.order.delivery_cost, 0)
        self.assertEquals(self.order.order_total, 
                            self.product.price*self.order_line_item.quantity)


    def test_order_line_item_model(self):
        ''' Tests the initial save method is overwritten and updates the lineitem total '''
        
        self.assertEquals(self.order_line_item.product, self.product)
        self.assertEquals(self.order_line_item.lineitem_total,
                             self.product.price * self.order_line_item.quantity)
        

    def test_string_method_of_order_line_item_model(self):
        '''Tests the string method formating of the model'''

        self.assertEquals(self.order_line_item.__str__(), 
                            f'SKU {self.product.sku} on order {self.order.order_number}') 






            


