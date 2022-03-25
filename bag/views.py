from django.shortcuts import get_object_or_404, redirect, render, HttpResponse
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

    bag = request.session.get('bag', {})

    if size and color:
        if item_id in list(bag.keys()):
            if size in bag[item_id]['items_by_filter']['size'] and color in bag[item_id]['items_by_filter']['color']:
                bag[item_id]['items_by_filter']['size'] = size
                bag[item_id]['items_by_filter']['color'] = color
                bag[item_id]['items_by_filter']['quantity'] += quantity
            else:
           
                    bag[item_id]['items_by_filter']['size'] = size
                    bag[item_id]['items_by_filter']['color'] = color  
                    bag[item_id]['items_by_filter']['quantity'] = quantity  
        else:   
            bag[item_id] = {'items_by_filter' : {'size' : size,
                                                'color' : color,
                                                'quantity' : quantity,
                                                }}
    elif size:
        if item_id in list(bag.keys()):
            if size in bag[item_id]['items_by_size'].keys():
                bag[item_id]['items_by_size'][size] += quantity
            else:
                bag[item_id]['items_by_size'][size] = quantity
        else:
            bag[item_id] = {'items_by_size' : {size : quantity}}

    elif color:
        if item_id in list(bag.keys()):
            if color in bag[item_id]['items_by_color'].keys():
                bag[item_id]['items_by_color'][color] += quantity
            else:
                bag[item_id]['items_by_color'][color] = quantity
        else:
            bag[item_id] = {'items_by_color' : {color : quantity}}
    else:        
        if item_id in list(bag.keys()):
            bag[item_id] += quantity
        else:
            bag[item_id] = quantity

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

    bag = request.session.get('bag', {})

    if size and color:
        if quantity > 0 :
            bag[item_id]['items_by_filter']['quantity'] = quantity
        else:
            del bag[item_id]['items_by_filter']
    elif size:
        if quantity > 0 :
            bag[item_id]['items_by_size'][size] = quantity
        else:
            del bag[item_id]['items_by_size'][size]
            if not bag[item_id]['items_by_size']:
                bag.pop(item_id)
    elif color:
        if quantity > 0 :
            bag[item_id]['items_by_color'][color] = quantity
        else:
            del bag[item_id]['items_by_color'][color]
            if not bag[item_id]['items_by_color']:
                bag.pop(item_id)
    else:
        if quantity > 0 :
            bag[item_id] = quantity
        else:
            bag.pop(item_id)

    request.session['bag'] = bag
    return redirect('bag') 



def remove_from_bag(request, item_id):
    """ adjust the shopping bag items """
    product = get_object_or_404(Product, pk=item_id)
    try:
        size = None
        color = None
        if 'product_size' in request.POST:
            size = request.POST['product_size']
            print(f'/////////////////////{size}')    
        if 'product_color' in request.POST:
            color = request.POST['product_color']
            print(f'/////////////////////{color}')    
        bag = request.session.get('bag', {})
        # if size and color:
        #     del bag[item_id]['items_by_filter']['size']
        #     del bag[item_id]['items_by_filter']['color']
        #     del bag[item_id]['items_by_filter']['quantity']
        if size:
            del bag[item_id]['items_by_size'][size]
            if not bag[item_id]['items_by_size']:
                bag.pop(item_id)
            print('-----------------size removed')    
        elif color:
            del bag[item_id]['items_by_color'][color]
            if not bag[item_id]['items_by_color']:
                bag.pop(item_id)
            print('-----------------color removed')    
        else:
            bag.pop(item_id)
            print('-----------------item removed')    
        request.session['bag'] = bag
        return HttpResponse(status=200)    
    except Exception as e:
        return HttpResponse(status=500)
        




