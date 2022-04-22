from django.shortcuts import (get_object_or_404,
                             redirect, render, 
                             HttpResponse)
from django.contrib import messages
from products.models import Product


def view_bag(request):
    """ A view to return the bag contents page """

    return render(request, 'bag/bag.html')


def add_to_bag(request, item_id):
    """ Add a items to the shopping bag """

    product = get_object_or_404(Product, pk=item_id)
    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    size = None
    color = None
    
    if 'product_size' in request.POST:
        size = request.POST['product_size']        

    if 'product_color' in request.POST:
        color = request.POST['product_color']

    item = f'{item_id}_{size}_{color}'
    bag = request.session.get('bag', {})


    if size and color:
        if item_id in list(bag.keys()):
            if item in bag[item_id]['items_by_filter'].keys():
                bag[item_id]['items_by_filter'][item] += quantity
                messages.success(request, 
                    f'Updated {size} {color} { product.name } quantity to\
                    {bag[item_id]["items_by_filter"][item]}')

            else:
                bag[item_id]['items_by_filter'][item] = quantity
                messages.success(request, 
                f'Added size {size} color {color} { product.name } to your bag')

        else:   
            bag[item_id] = {'items_by_filter' : {item : quantity}}
            messages.success(request, 
            f'Added size {size} color \
            {color} { product.name } to your bag')

    elif size:
        if item_id in list(bag.keys()):
            if size in bag[item_id]['items_by_size'].keys():
                bag[item_id]['items_by_size'][size] += quantity
                messages.success(request, 
                f'Updated size {size} { product.name } \
                quantity to {bag[item_id]["items_by_size"][size]}')

            else:
                bag[item_id]['items_by_size'][size] = quantity
                messages.success(request, 
                f'Added size {size} { product.name } to your bag')

        else:
            bag[item_id] = {'items_by_size' : {size : quantity}}
            messages.success(request, 
            f'Added size {size} { product.name } to your bag')

    elif color:
        if item_id in list(bag.keys()):
            if color in bag[item_id]['items_by_color'].keys():
                bag[item_id]['items_by_color'][color] += quantity
                messages.success(request, 
                f'Updated color {color} { product.name } quantity to\
                {bag[item_id]["items_by_color"][color]}')

            else:
                bag[item_id]['items_by_color'][color] = quantity
                messages.success(request, 
                f'Added color {color} { product.name } to your bag')

        else:
            bag[item_id] = {'items_by_color' : {color : quantity}}
            messages.success(request, 
            f'Added color {color} { product.name } to your bag')

    else:        
        if item_id in list(bag.keys()):
            bag[item_id] += quantity
            messages.success(request, 
            f'Updated { product.name } quantity to {bag[item_id]}')

        else:
            bag[item_id] = quantity
            messages.success(request, 
            f'Added { product.name } to your bag')

    request.session['bag'] = bag
    return redirect(redirect_url)




def adjust_bag(request, item_id):
    """ adjust the shopping bag items """

    product = get_object_or_404(Product, pk=item_id)
    quantity = int(request.POST.get('quantity'))
    size = None
    color = None
    
    if 'product_size' in request.POST:
        size = request.POST['product_size']        

    if 'product_color' in request.POST:
        color = request.POST['product_color']

    item = f'{item_id}_{size}_{color}'
    bag = request.session.get('bag', {})

    if size and color:
        if quantity > 0 :
            bag[item_id]['items_by_filter'][item] = quantity
            messages.success(request, 
            f'Updated size {size} color {color} { product.name }\
            quantity to {bag[item_id]["items_by_filter"][item]}')

        else:
            del bag[item_id]['items_by_filter'][item]
            if not bag[item_id]['items_by_filter']:
                bag.pop(item_id)
            messages.success(request, 
            f'Removed Size {size} color\
            {color} { product.name } from your bag')

    elif size:
        if quantity > 0 :
            bag[item_id]['items_by_size'][size] = quantity
            messages.success(request, 
            f'Updated size {size} { product.name } quantity to\
            {bag[item_id]["items_by_size"][size]}')

        else:
            del bag[item_id]['items_by_size'][size]
            if not bag[item_id]['items_by_size']:
                bag.pop(item_id)
            messages.success(request, 
            f'Removed Size {size} { product.name } from your bag')

    elif color:
        if quantity > 0 :
            bag[item_id]['items_by_color'][color] = quantity
            messages.success(request, 
            f'Updated color {color} { product.name } \
            quantity to {bag[item_id]["items_by_color"][color]}')

        else:
            del bag[item_id]['items_by_color'][color]
            if not bag[item_id]['items_by_color']:
                bag.pop(item_id)
            messages.success(request, 
            f'Removed Color {color} { product.name } from your bag')
    
    else:
        if quantity > 0 :
            bag[item_id] = quantity
            messages.success(request, 
            f'Updated { product.name } quantity to {bag[item_id]}')

        else:
            bag.pop(item_id)
            messages.success(request, 
            f'Removed { product.name } from your bag')

    request.session['bag'] = bag
    return redirect('bag') 



def remove_from_bag(request, item_id):
    """ adjust the shopping bag items """

    try:
        product = get_object_or_404(Product, pk=item_id)
        size = None
        color = None
        if 'product_size' in request.POST:
            size = request.POST['product_size']
   
        if 'product_color' in request.POST:
            color = request.POST['product_color']

        item = f'{item_id}_{size}_{color}'
        bag = request.session.get('bag', {})

        if size and color:
            del bag[item_id]['items_by_filter'][item]
            if not bag[item_id]['items_by_filter']:
                bag.pop(item_id)
            messages.success(request, 
            f'Removed size {size} color \
            {color} {product.name} from your bag')

        elif size:
            del bag[item_id]['items_by_size'][size]
            if not bag[item_id]['items_by_size']:
                bag.pop(item_id)
            messages.success(request, 
            f'Removed size {size} {product.name} from your bag')

        elif color:
            del bag[item_id]['items_by_color'][color]
            if not bag[item_id]['items_by_color']:
                bag.pop(item_id)
            messages.success(request, 
            f'Removed color {color} {product.name} from your bag')

        else:
            bag.pop(item_id) 
            messages.success(request, 
            f'Removed {product.name} from your bag')

        request.session['bag'] = bag
        return HttpResponse(status=200)    

    except Exception as e:
        messages.error(request, f'Error removing item: {e}')
        return HttpResponse(status=500)
        




