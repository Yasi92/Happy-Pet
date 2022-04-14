from audioop import add
from django.test import TestCase, SimpleTestCase
from django.urls import reverse, resolve
from checkout.views import cache_checkout_data, checkout, checkout_success
from checkout.webhooks import webhook


# Testing urls are learned from (https://www.youtube.com/watch?v=0MrgsYswT1c&list=PLbpAWbHbi5rMF2j5n6imm0enrSD9eQUaM&index=2)

class TestUrls(TestCase):
    
    def test_cache_checkout_data(self):
        url = reverse('cache_checkout_data')
        self.assertEquals(resolve(url).func, cache_checkout_data)


    def test_checkout(self):
        url = reverse('checkout')
        self.assertEquals(resolve(url).func, checkout)


    def test_checkout_success(self):
        url = reverse('checkout_success', args=[655])
        self.assertEquals(resolve(url).func, checkout_success)


    def test_webhook(self):
        url = reverse('webhook')
        self.assertEquals(resolve(url).func, webhook)