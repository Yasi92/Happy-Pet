from django.shortcuts import render
from django.shortcuts import get_object_or_404, redirect, render, HttpResponse
from django.contrib import messages
from products.models import Product
from django.http import HttpResponseRedirect







# Create your views here.
def view_wishlist(request):
    """ A view to return the wishlist page """


    wishlist_bag = request.session.get('wishlist_bag', {})

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
    wishlist_item_id = request.session.get('wishlist_item_id', [])

    # Returns to the current url
    # The method is borroewed from the thread on slack community
    # (https://stackoverflow.com/questions/23026337/django-get-current-url-path-from-actual-current-page)
    current_url = request.META['HTTP_REFERER']
    next = request.GET.get('next')
    print(next)

    
    if item_id in list(wishlist_bag.keys()):
        messages.info(request, f'{ product.name } Already exists in your wish list')

    else:
        wishlist_bag[item_id] = True
        wishlist_item_id.append(int(item_id)) 

        messages.info(request, f'{ product.name } Added to your wish list')

    request.session['wishlist_bag'] = wishlist_bag
    request.session['wishlist_item_id'] = wishlist_item_id

    return HttpResponseRedirect(current_url) 





def remove_from_wishlist(request, item_id):
    product = get_object_or_404(Product, product_id=item_id)
    wishlist_bag = request.session.get('wishlist_bag', {})

    # A wishlist_item_id is used here to toggle the favorite icon based on 
    # whether the item exists in the wish list or not.

    # A seperate list is prefered over iterating through keys and values 
    # in wishlist_bag since the for loop to get the item_id value 
    # conflicts the outer for loop of products.
    wishlist_item_id = request.session.get('wishlist_item_id', [])


    # Returns to the current url
    # The method is borroewed from the thread on slack community
    # (https://stackoverflow.com/questions/23026337/django-get-current-url-path-from-actual-current-page)
    current_url = request.META['HTTP_REFERER']


    wishlist_item_id.remove(int(item_id))
    del wishlist_bag[item_id]
    messages.info(request, f'{ product.name } Removed from your wish list')


    request.session['wishlist_bag'] = wishlist_bag
    request.session['wishlist_item_id'] = wishlist_item_id

    return redirect(current_url)   

