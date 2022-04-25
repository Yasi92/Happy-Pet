from django.test import SimpleTestCase
from ..forms import UserProfileForm


class TestForms(SimpleTestCase):
    databases = '__all__'

    def test_user_profile_form_with_valid_data(self):
        ''' Tests if the form has required data and is valid '''

        form = UserProfileForm(data={
            'user': 'user1',
            'default_phone_number': '57645865',
            'default_country': 'NL',
            'default_postcode': '1937ff',
            'default_city': 'test_city',
            'default_street_address1': 'test_default_street_address1',
            'default_street_address2': 'test_default_street_address2',
            'default_county': 'test_default_county',

        })

        self.assertTrue(form.is_valid())

    def test_user_profile_form_with_no_data(self):
        ''' Tests if the form is not valid and has no data '''

        form = UserProfileForm(data={})

        self.assertTrue(form.is_valid())
        # Since there is no required field in user profile form
        self.assertEquals(len(form.errors), 0)

    def test_product_review_form_with_invalid_data(self):
        ''' Tests if the star field has valid data '''

        form = UserProfileForm(data={
            'default_phone_number': '57867',
            'default_country': 'non-existent country'
        })

        self.assertFalse(form.is_valid())
        # The default_country is a select field of\
        # countries and the value should be a valid choice

        # The flake8 warning redarding this line being too long
        # is disregarded since the AssertEqual needs the exact value
        # with the same indentation level as the errro messsage.
        self.assertEqual(form.errors['default_country'][0], 'Select a valid choice. non-existent country is not one of the available choices.')
