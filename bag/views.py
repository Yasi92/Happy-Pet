from audioop import reverse
from django.shortcuts import get_object_or_404, redirect, render, HttpResponse
from django.contrib import messages
from products.models import Product


def view_bag(request):
    """ A view to return the bag contents page """
    return render(request, 'bag/bag.html')