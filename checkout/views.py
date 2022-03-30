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
    }

    return render(request, template, context)