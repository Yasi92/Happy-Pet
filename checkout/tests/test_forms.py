from django.test import TestCase
from ..forms import OrderForm


class TestOrderForm(TestCase):

    def test_full_name_is_required(self):

        form = OrderForm({'full_name': ''})

        self.assertFalse(form.is_valid())
        # checks whether or not the name key is on the error list
        self.assertIn('full_name', form.errors.keys())
        # checks whether this error is equal to "this field is required"
        self.assertEqual(form.errors['full_name'][0],
                         'This field is required.')

    def test_street_address2_is_not_required(self):

        form = OrderForm({'street_address2': ''})
        self.assertFalse(form.is_valid())

    def test_fields_are_explicit_in_form_metaclass(self):

        form = OrderForm()
        self.assertEqual(
            form.Meta.fields, (
                'full_name', 'email', 'phone_number',
                'street_address1', 'street_address2',
                'town_or_city', 'postcode', 'country',
                'county'))
