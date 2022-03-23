from django.shortcuts import get_object_or_404, redirect, render, reverse
from .models import Product


def all_products(request):
    """ A view to return all products """
    products = Product.objects.all().order_by('name')

    template = 'products/products.html'
    context = {
        'products' : products,
    }
    

    return render(request, template, context)



    

   