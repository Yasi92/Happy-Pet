from django.shortcuts import render


def page_not_found_view(request, exception):
    return render(request, '404_page.html', status=404)



def internal_error_page(request):
    return render(request, '500_page.html', status=500)