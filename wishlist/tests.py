from audioop import add
from django.test import TestCase, SimpleTestCase
from django.urls import reverse, resolve
from wishlist.views import view_wishlist, add_to_wishlist, remove_from_wishlist


# Testing urls are learned from (https://www.youtube.com/watch?v=0MrgsYswT1c&list=PLbpAWbHbi5rMF2j5n6imm0enrSD9eQUaM&index=2)

class TestUrls(TestCase):
    
    def test_wishlist(self):
        url = reverse('wishlist')
        self.assertEquals(resolve(url).func, view_wishlist)


    def test_add_to_wishlist(self):
        url = reverse('add_to_wishlist', args=[54])
        self.assertEquals(resolve(url).func, add_to_wishlist)    


    def test_remove_from_wishlist(self):
        url = reverse('remove_from_wishlist', args=[54])
        self.assertEquals(resolve(url).func, remove_from_wishlist)  