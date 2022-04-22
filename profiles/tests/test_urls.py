from django.test import TestCase
from django.urls import reverse, resolve
from profiles.views import profile, order_history, add_review


# Testing urls are learned from
# (https://www.youtube.com/watch?v=0MrgsYswT1c&list=PLbpAWbHbi5rMF2j5n6imm0enrSD9eQUaM&index=2)

class TestUrls(TestCase):

    def test_profile(self):
        url = reverse('profile')
        self.assertEquals(resolve(url).func, profile)

    def test_order_history(self):
        url = reverse('order_history', args=[764])
        self.assertEquals(resolve(url).func, order_history)

    def test_add_review(self):
        url = reverse('add_review', args=[76])
        self.assertEquals(resolve(url).func, add_review)
