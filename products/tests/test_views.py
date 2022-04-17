
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Category, Product, Subcategories
from profiles.models import User



class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.products_url = reverse('products')
        self.product = Product.objects.create(name='test_product1',
                                category=Category.objects.create(category_id=6, name='test'),
                                subcategory=Subcategories.objects.create(subcategory_id=67, name="sub_test"),
                                price=11.2, sku=46576)
        self.product_detail_url = reverse('product_detail', args=[self.product.product_id])
        self.add_product_url = reverse('add_product')


    def test_all_products(self):
        response = self.client.get(self.products_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/products.html')


    def test_product_detail(self):
        response = self.client.get(self.product_detail_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/product_detail.html')



    

class TestLogInRequiredViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='username', password='Mypassword')
        self.user.is_superuser = True
        self.user.save()
        self.client = Client()
        self.client.login(username=self.user.username, password='Mypassword')
        

     

    def test_add_product_GET_request(self):
        self.add_product_url = reverse('add_product')
        response = self.client.get(self.add_product_url)  

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/add_product.html')

 

    def test_add_product_POST_request(self):
        self.add_product_url = reverse('add_product')
        category= Category.objects.create(category_id=6, name='test_category')
        Subcategory = Subcategories.objects.create(subcategory_id=67, name="test_subcategory")

        response = self.client.post(self.add_product_url, {

            'name' : 'test_product2',
            'friendlyname' : 'firoend',
            'category' : category.category_id,
            'subcategory': Subcategory.subcategory_id,
            'price' : 11,
            'sku' : 4654576,
        })  

        
        product = Product.objects.get(sku=4654576)

        self.assertEquals(response.status_code, 302)
        self.assertEquals(product.name, 'test_product2')




    def test_edit_product_GET_request(self):  
        product_init = Product.objects.create(name='test_product3',
                        category=Category.objects.create(category_id=6, name='test_category'),
                        subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
                        price=11.2, sku=46576) 
        self.edit_product_url = reverse('edit_product', args=[product_init.product_id])
        response = self.client.get(self.edit_product_url)  

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/edit_product.html')  




    def test_edit_product_POST_request(self):
        product_init = Product.objects.create(name='test_product4',
                                category=Category.objects.create(category_id=6, name='test_category'),
                                subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
                                price=11.2, sku=465)                      

        self.edit_product_url = reverse('edit_product', args=[product_init.product_id])
        response = self.client.post(self.edit_product_url, {
            'name' : 'new_name',
            'friendlyname' : 'firoend',
            'category' : product_init.category.category_id,
            'subcategory': product_init.subcategory.subcategory_id,
            'price' : 11,
            'sku' : 465,

        })  

        product_init.refresh_from_db()
        product = Product.objects.get(sku=465)

        self.assertEquals(response.status_code, 302)
        self.assertEquals(product.name, 'new_name')



    def test_delete_product_GET_request(self):
        self.product_init = Product.objects.create(name='test_product5',
                                category=Category.objects.create(category_id=6, name='test_category'),
                                subcategory=Subcategories.objects.create(subcategory_id=67, name="test_subcategory"),
                                price=11.2, sku=46576)                      

        self.delete_product_url = reverse('delete_product', args=[self.product_init.product_id])
        response = self.client.post(self.delete_product_url)  
        self.product = Product.objects.all()

        self.assertEquals(response.status_code, 302)
        self.assertEquals(self.product.count(), 0)








