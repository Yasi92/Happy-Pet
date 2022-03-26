from django.shortcuts import get_object_or_404, render

from profiles.models import UserProfile
from .forms import UserProfileForm

# Create your views here.
def profile(request):
    """
    Display the user's profile
    """
    profile = None
    # profile = get_object_or_404(UserProfile, user=request.user)
    if request.user.is_authenticated:
        profile = get_object_or_404(UserProfile, user=request.user)

    form = UserProfileForm(instance=profile)


    template = "profiles/profile.html"
    context = {
        'form' : form,
        'profile' : profile,
    }

    return render(request, template, context) 