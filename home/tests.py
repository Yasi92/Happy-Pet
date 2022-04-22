from django.test import TestCase
from django.urls import reverse, resolve
from .views import index


class TestViews(TestCase):

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home/index.html')


class TestUrls(TestCase):

    def test_index(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, index)
