from cProfile import Profile
from django.shortcuts import redirect, render, reverse
from django.contrib import messages
from .forms import OrderForm
from profiles.forms import UserProfileForm
from .models import Order, UserProfile

def checkout(request):
    profile = None
    bag = request.session.get('bag', {})

    if not bag:
        messages.error(request, "There is nothing in your bag at the moment")
        return redirect('products')
    if request.user.is_authenticated:
        profile = UserProfile.objects.get(user=request.user)

    profile_update_form = UserProfileForm(instance=profile)
    order_form = OrderForm(instance=profile)    
    
    template = 'checkout/checkout.html'
    context = {
        'order_form' : order_form,
        'profile' : profile,
        'profile_update_form' : profile_update_form,
        'stripe_public_key' : 'pk_test_51KkQS5DU2roDlZ9zDCN7mosc3z077ghwoUBVUwC03kVHy0ZNW3vRC0ey1EuIi7FPdHreTgQHALoSf1qKzzbi5Xbx00ZBfxvkX7',
        'client_secret' : 'test client secret',
    }

    return render(request, template, context)