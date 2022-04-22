from django.test import TestCase
from django.urls import reverse, resolve
from ..views import view_bag, add_to_bag, adjust_bag, remove_from_bag
# Testing urls are learned from (https://www.youtube.com/watch?v=0MrgsYswT1c&list=PLbpAWbHbi5rMF2j5n6imm0enrSD9eQUaM&index=2)

class TestUrls(TestCase):
    
    def test_view_bag(self):
        url = reverse('bag')
        self.assertEquals(resolve(url).func, view_bag)


    def test_add_to_bag(self):
        url = reverse('add_to_bag', args=[55])
        self.assertEquals(resolve(url).func, add_to_bag)


    def test_adjust_bag(self):
        url = reverse('adjust_bag', args=[44])
        self.assertEquals(resolve(url).func, adjust_bag)


    def test_remove_bag(self):
        url = reverse('remove_from_bag', args=[44])
        self.assertEquals(resolve(url).func, remove_from_bag)




        