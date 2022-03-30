from django.shortcuts import get_object_or_404, render
from django.contrib import messages
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

    if request.method == "POST":
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')    

    form = UserProfileForm(instance=profile)


    template = "profiles/profile.html"
    context = {
        'form' : form,
        'profile' : profile,
        'on_profile_page' : True,
    }

    return render(request, template, context) 