from django.conf import settings
from decimal import Decimal
from django.conf import settings
from django.shortcuts import get_object_or_404
from products.models import Product

from happy_pet.settings import FREE_DELIVERY_THRESHOLD
from products.models import Product


def bag_contents(request):

    bag_items = []
    total = 0
    product_count = 0
    bag = request.session.get('bag', {})
    color = None
    size = None
    quantity = None

    for item_id, item_data in bag.items():
        if isinstance(item_data, int):
            product = get_object_or_404(Product, pk=item_id)
            total += item_data * product.price
            product_count += item_data
            bag_items.append({
                'item_id' : item_id,
                'quantity' : item_data,
                'product' : product,
            })
        else:
            product = get_object_or_404(Product, pk=item_id)
            if 'items_by_filter' in item_data:
                for item, quantity in item_data['items_by_filter'].items():
                
                    size = item.split('_')[1]
                    color = item.split('_')[2]
                    total += quantity * product.price
                    product_count += quantity

                    bag_items.append({
                    'item_id' : item_id,
                    'quantity' : quantity,
                    'product' : product,
                    'size' : size,
                    'color' : color,
                })

            elif 'items_by_size' in item_data:

                for size, quantity in item_data['items_by_size'].items():
                    quantity = quantity
                    total += quantity * product.price
                    product_count += quantity

                    bag_items.append({
                    'item_id' : item_id,
                    'quantity' : quantity,
                    'product' : product,
                    'size' : size,
            })


            elif 'items_by_color' in item_data:
                for color, quantity in item_data['items_by_color'].items():    

                    quantity = quantity
                    total += quantity * product.price
                    product_count += quantity

                    bag_items.append({
                    'item_id' : item_id,
                    'quantity' : quantity,
                    'product' : product,
                    'color' : color,
            })

    if total < FREE_DELIVERY_THRESHOLD:
        delivery = Decimal(total) * Decimal(settings.STANDARD_DELIVERY_PERCENTAGE/100)
        free_delivery_delta = FREE_DELIVERY_THRESHOLD - total
    else:
        delivery = 0
        free_delivery_delta = 0

    grand_total = delivery + Decimal(total)        
    
    context = {
        "bag_items":bag_items,
        "total":total,
        "product_count":product_count,
        "delivery":Decimal(delivery),
        "free_delivery_delta":free_delivery_delta,
        "free_delivery_threshold": FREE_DELIVERY_THRESHOLD,
        "grand_total":grand_total,
    }

    return context