from django.shortcuts import get_object_or_404, render
from django.contrib import messages
from profiles.models import UserProfile
from .forms import UserProfileForm
from checkout.models import Order

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
        orders = profile.orders.all()



    if request.method == "POST":
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')    

    # form = UserProfileForm()
    orders = profile.orders.all()


    template = "profiles/profile.html"
    context = {
        'form' : form,
        'profile' : profile,
        'orders' : orders,
        'on_profile_page' : True,
    }

    return render(request, template, context) 



def order_history(request, order_number):
    order = get_object_or_404(Order, order_number=order_number)
    messages.info(request, (
        f'This is a past confirmation for order numebr {order_number}.'
        'A confirmation email was sent on the order date.'
    ))

    template = 'checkout/checkout_success.html'
    context = {
        'order' : order,
        'from_profile' : True,
    }

    return render (request, template, context)

