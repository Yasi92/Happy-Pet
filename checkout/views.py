
from django.shortcuts import redirect, render, reverse, get_object_or_404, HttpResponse

from django.contrib import messages
from django.conf import settings
from django.views.decorators.http import require_POST
from .forms import OrderForm
from profiles.forms import UserProfileForm
from .models import Order, OrderLineItem, UserProfile
from bag.contexts import bag_contents
from products.models import Product

import json
import stripe



@require_POST
def cache_checkout_data(request):
    try:
        pid = request.POST.get('client_secret').split('_secret')[0]
        stripe.api_key = settings.STRIPE_SECRET_KEY
        stripe.PaymentIntent.modify(pid, metadata={
            'bag': json.dumps(request.session.get('bag', {})),
            'save_info': request.POST.get('save_info'),
            'username': request.user,
        })
        return HttpResponse(status=200)
    except Exception as e:
        messages.error(request, 'Sorry, your payment cannot be \
            processed right now. Please try again later.')
        return HttpResponse(content=e, status=400)




def checkout(request):
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY

    if request.method == "POST":
        bag = request.session.get('bag', {})


            
        form_data = {
            'full_name': request.POST['full_name'],
            'email': request.POST['email'],
            'phone_number': request.POST['phone_number'],
            'country': request.POST['country'],
            'postcode': request.POST['postcode'],
            'town_or_city': request.POST['town_or_city'],
            'street_address1': request.POST['street_address1'],
            'street_address2': request.POST['street_address2'],
            'county': request.POST['county'],
        }
        order_form = OrderForm(form_data)
        if order_form.is_valid():
            order = order_form.save(commit=False)
            pid = request.POST.get('client_secret').split('_secret')[0]
            order.stripe_pid = pid
            order.original_bag = json.dumps(bag)
            order.save()


            for item_id, item_data in bag.items():
                product = get_object_or_404(Product, pk=item_id)

                if isinstance(item_data, int):
                    order_line_item = OrderLineItem(
                        order=order,
                        product=product,
                        quantity=item_data,
                    )
                    order_line_item.save()                   
                else:
                    if 'items_by_filter' in item_data:
                        for item, quantity in item_data['items_by_filter'].items():
                            size = item.split('_')[1]
                            color = item.split('_')[2]
                            order_line_item = OrderLineItem(
                            order=order,
                            product=product,
                            quantity=quantity,
                            product_size=size,
                            product_color=color,
                            )
                            order_line_item.save()                                                               
                    elif 'items_by_size' in item_data:
                        for size, quantity in item_data['items_by_size'].items():

                            order_line_item = OrderLineItem(
                            order=order,
                            product=product,
                            quantity=quantity,
                            product_size=size,
                            )
                            order_line_item.save()
                    elif 'items_by_color' in item_data:
                        for color, quantity in item_data['items_by_color'].items():    

                            order_line_item = OrderLineItem(
                            order=order,
                            product=product,
                            quantity=quantity,
                            product_color=color,
                            )
                            order_line_item.save()
            request.session['save_info'] = 'save-info' in request.POST
            save = request.session.get('save_info')
            print(f'--------------{save} in checkout view post method')
            return redirect(reverse('checkout_success', args=[order.order_number]))

        else:
            messages.error(request, 'There was an error with your form \
                Please double check your information.')


    else:    

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

        if request.user.is_authenticated:
            try:
                profile = UserProfile.objects.get(user=request.user)
                order_form = OrderForm(initial={
                    'full_name' : profile.user.get_full_name(),
                    'email' : profile.user.email,
                    'phone_number': profile.default_phone_number,
                    'country': profile.default_country,
                    'postcode': profile.default_postcode,
                    'town_or_city': profile.default_city,
                    'street_address1': profile.default_street_address1,
                    'street_address2': profile.default_street_address2,
                    'county': profile.default_county,

                })
            except UserProfile.DoesNotExist:
                order_form = OrderForm()    
        else:
            order_form = OrderForm()    
    
    template = 'checkout/checkout.html'
    context = {
        'order_form' : order_form,
        'profile' : profile,
        'stripe_public_key' : stripe_public_key,
        'client_secret' : intent.client_secret,
    }

    return render(request, template, context)


def checkout_success(request, order_number):
    profile =  None
    save_info = request.session['save_info']
    print(save_info)
    order = get_object_or_404(Order, order_number=order_number)
    messages.success(request, f'Order {order_number} successfully processed! \
                        A confiramation email will be sent to {order.email}. ')

    if request.user.is_authenticated:
        profile = UserProfile.objects.get(user=request.user)
        order.user_profile = profile
        order.save()
       
    if save_info == True:
        profile_data ={
            'default_phone_number': order.phone_number,
            'default_country': order.country,
            'default_postcode': order.postcode,
            'default_city': order.town_or_city,
            'default_street_address1': order.street_address1,
            'default_street_address2': order.street_address2,
            'default_county': order.county,
        }    
        for key, value in profile_data.items():
            print(f'//////////////////{key} : {value}')
        user_profile_form = UserProfileForm(profile_data, instance=profile)
        if user_profile_form.is_valid():
            user_profile_form.save()


    if 'bag' in request.session:
        del request.session['bag']

    template = 'checkout/checkout_success.html' 
    context = {
        'order' : order,
    }   

    return render(request, template, context)