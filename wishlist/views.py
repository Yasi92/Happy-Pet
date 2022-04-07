from math import prod
from django.shortcuts import render
from audioop import reverse
from django.shortcuts import get_object_or_404, redirect, render, HttpResponse
from django.contrib import messages
from flask import current_app
from products.models import Product
import wishlist


# Create your views here.
def view_wishlist(request):
    """ A view to return the wishlist page """


    wishlist_bag = request.session.get('wishlist_bag', {})
    print(wishlist_bag)

    products = []

    for item, value in wishlist_bag.items():
        product = get_object_or_404(Product, product_id=item)
        products.append(product)

    tempalte = 'wishlist/wishlist.html'
    context = {
        'products' : products,
    }

    return render(request, tempalte, context)






def add_to_wishlist(request, item_id):
    product = get_object_or_404(Product, product_id=item_id)
    wishlist_bag = request.session.get('wishlist_bag', {})

    # Returns to the current url
    # The method is borroewed from the thread on slack community
    # (https://stackoverflow.com/questions/23026337/django-get-current-url-path-from-actual-current-page)
    current_url = request.META['HTTP_REFERER']



    if item_id in list(wishlist_bag.keys()):
        messages.success(request, f'{ product.name } Already exists in your wish list')

    else:
        wishlist_bag[item_id] = True
        messages.success(request, f'Added { product.name } to your wish list')  


    request.session['wishlist_bag'] = wishlist_bag
    return redirect(current_url)

