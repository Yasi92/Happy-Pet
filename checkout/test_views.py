from django.test import TestCase

class TestViews(TestCase):

    def test_checkout_view(self):
        response = self.client.post('/checkout/cache_checkout_data/', {"user_name" : "yasi", 'save_info' : True, "bag" : {}})
        self.assertEqual(response.status_code, 200)



