from ..models import User, UserProfile
from django.test import TestCase


class TestModels(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='username',
            password='mypassword'
        )

        self.user_profile = UserProfile.objects.get(user=self.user)

    # Tests whether signals are working and a userprofile
    #  is created/updated for every created user
    def test_user_profile_model(self):
        self.assertEquals(self.user_profile.user.username, self.user.username)

    def test_updating_userprofile_fields(self):
        self.user_profile.default_phone_number = 7567565
        self.user_profile.save()

        self.assertEquals(self.user_profile.default_phone_number, 7567565)
        self.assertEquals(self.user_profile.default_street_address1, None)

    # Tests initial string method of the model
    def test_str_method_of_UserProfile_model(self):

        self.assertEquals(self.user_profile.__str__(), self.user.username)
        self.assertEquals(self.user_profile.__str__(), 'username')
