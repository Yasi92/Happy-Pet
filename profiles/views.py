from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from profiles.models import UserProfile
from .forms import UserProfileForm
from checkout.models import Order
from products.models import Product, ProductReview
from products.forms import ProductReviewForm

# Create your views here.
def profile(request):
    """
    Display the user's profile
    """
    profile = None
    # profile = get_object_or_404(UserProfile, user=request.user)
    if request.user.is_authenticated:
        profile = get_object_or_404(UserProfile, user=request.user)
        form = UserProfileForm(instance=profile)
        orders = profile.orders.all()



    if request.method == "POST":
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')    

    # form = UserProfileForm()
    orders = profile.orders.all()


    template = "profiles/profile.html"
    context = {
        'form' : form,
        'profile' : profile,
        'orders' : orders,
        'on_profile_page' : True,
    }

    return render(request, template, context) 



def order_history(request, order_number):
    order = get_object_or_404(Order, order_number=order_number)
    messages.info(request, (
        f'This is a past confirmation for order numebr {order_number}.'
        'A confirmation email was sent on the order date.'
    ))

    template = 'checkout/checkout_success.html'
    context = {
        'order' : order,
        'from_profile' : True,
    }

    return render (request, template, context)



def add_review(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)

    if request.method == 'POST' and request.user.is_authenticated:

        stars = request.POST['stars']
        content = request.POST['content']

        ProductReview.objects.create(product=product, user=request.user, stars=stars, content=content)    

    form = ProductReviewForm()   


    template = 'profiles/add_review.html'
    context = {
        'product' : product,
        'form' : form,

    }


    form = ProductReviewForm()   

    return render(request, template, context)
