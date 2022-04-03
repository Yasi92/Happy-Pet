from locale import currency
from django.shortcuts import redirect, render, reverse
from django.contrib import messages
from django.conf import settings

from happy_pet.settings import STRIPE_SECRET_KEY
from .forms import OrderForm
from profiles.forms import UserProfileForm
from .models import Order, UserProfile
from bag.contexts import bag_contents

import stripe


def checkout(request):
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY

    profile = None
    bag = request.session.get('bag', {})

    if not bag:
        messages.error(request, "There is nothing in your bag at the moment")
        return redirect('products')
    if request.user.is_authenticated:
        profile = UserProfile.objects.get(user=request.user)


    current_bag = bag_contents(request)
    total = current_bag['grand_total']
    stripe_total = round(total * 100)    
    stripe.api_key = stripe_secret_key
    intent = stripe.PaymentIntent.create(
        amount = stripe_total,
        currency = settings.STRIPE_CURRENCY,
    )

    print(intent)

    profile_update_form = UserProfileForm(instance=profile)
    order_form = OrderForm(instance=profile)    
    
    template = 'checkout/checkout.html'
    context = {
        'order_form' : order_form,
        'profile' : profile,
        'profile_update_form' : profile_update_form,
        'stripe_public_key' : stripe_public_key,
        'client_secret' : intent.client_secret,
    }

    return render(request, template, context)