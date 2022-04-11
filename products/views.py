from audioop import reverse
import re
from django.shortcuts import get_object_or_404, redirect, render, reverse
from django.contrib import messages
from django.db.models import Q
from .models import Product, Category, ProductReview, Subcategories

from django.db.models.functions import Lower
from .forms import ProductForm


def all_products(request):
    """ A view to return all products """
    products = Product.objects.all().order_by('name')
    query = None
    categories = None
    subcategories = None
    sort = None
    direction = None
    related_subcategory = None
    


    if request.GET:
        if 'sort' and 'direction' in request.GET:
            sortkey = request.GET['sort']
            direction = request.GET['direction']

            sort = sortkey
            if sortkey == 'name':
                sortkey = 'lower_name'
                products = products.annotate(lower_name=Lower('name'))

            if sortkey == 'category':
                sortkey = 'category__name'

        
            if direction == "desc":
                sortkey = f'-{sortkey}'
                
            products = products.order_by(sortkey)



        if 'category' and 'subcategory' in request.GET:
            categories = request.GET['category'].split(',')
            subcategories = request.GET['subcategory'].split(',')

            # Gets the related subcategories of the selected category to pass it as a url param to filter all subcategories of the selected category
            related_subcategory = Subcategories.objects.filter(category__icontains=categories[0]).values_list('name', flat=True)
          
            products = products.filter(category__name__in=categories, subcategory__name__in=subcategories)
            categories = Category.objects.filter(name__in=categories)
            subcategories = Subcategories.objects.filter(name__in=subcategories)

         

        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "You did not enter any search criteria!")
                return redirect(reverse('products'))

            queries = Q(name__icontains=query) | Q(description__icontains=query)
            products = products.filter(queries)    

    current_sorting = f'{sort}_{direction}'


    template = 'products/products.html'
    context = {
        'products' : products,
        'search_term' : query,
        'current_categories' : categories,
        'current_subcategories' :subcategories,
        'current_sorting' : current_sorting,
        'related_subcategory' :related_subcategory,
    }
    

    return render(request, template, context)



def product_detail(request, product_id):
    """ A view to return product details and similar products """

    products = Product.objects.all()
    product = get_object_or_404(Product, pk=product_id)
    similar_products = products.filter(category=product.category,
                                subcategory=product.subcategory).exclude(
                                product_id=product.product_id)



    template = 'products/product_detail.html'
    context = {
        'product' : product,
        'similar_products' : similar_products,
    }

    return render(request, template, context)        






def add_product(request):
    """
    Add a product to the store
    """
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            messages.success(request, "Successfully added product")
            return redirect(reverse('add_product'))
        else:
            messages.error(request, "Failed to add product. Please ensure the form is valid.")
    else:
        form = ProductForm()

    template = 'products/add_product.html'
    context = {
        'form' : form,
        'from_product_page' :True,
    }

    return render(request, template, context)





def edit_product(request, product_id):
    """
    Edit a product to the store
    """
    product = get_object_or_404(Product, product_id=product_id)


    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES, instance=product)


        if form.is_valid():
            form.save()
            messages.success(request, "Successfully Updated product")
            return redirect(reverse('product_detail', args=[product.product_id]))
        else:
            messages.error(request, "Failed to Edit product. Please ensure the form is valid.")


    else:
        form = ProductForm(instance=product)
        messages.info(request, f'You are editing {product.name}.')


    template = 'products/edit_product.html'
    context = {
        'form' : form,
        'product' : product,
        'from_product_page' :True,
    }

    return render(request, template, context)