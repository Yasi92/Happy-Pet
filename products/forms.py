from django import forms
from .models import Product, ProductReview, Subcategories, Category
from .widgets import CustomClearableFileInput



class ProductReviewForm(forms.ModelForm):
    class Meta:
        model = ProductReview
        fields = ('content', 'stars',)

    
    def __init__(self, *args, **kwargs):
        """
        Add placeholders and classes, remove auto-generated
        labels and set autofocus on first field
        """
        super().__init__(*args, **kwargs)
        placeholders = {
            'content': 'Write your review here',
            'stars': 'Rate',
   
        }

        self.fields['content'].widget.attrs['autofocus'] = True
        for field in self.fields:
            if self.fields[field].required:
                placeholder = f'{placeholders[field]} *'
            else:
                placeholder = placeholders[field]
            self.fields[field].widget.attrs['placeholder'] = placeholder
            self.fields[field].widget.attrs['class'] = 'product-review-form'
            self.fields[field].label = False




class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    image1 = forms.ImageField(label='Image1', required=False, widget=CustomClearableFileInput)    
    image2 = forms.ImageField(label='Image2', required=False, widget=CustomClearableFileInput)    
    image3 = forms.ImageField(label='Image3', required=False, widget=CustomClearableFileInput)    

  

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        categories = Category.objects.all()                
        subcategories = Subcategories.objects.all()    
        category_name = [(c.category_id, c.name) for c in categories]          
        subcategories_name = [(s.subcategory_id, s.name) for s in subcategories]          

        self.fields['category'].choices = category_name
        self.fields['subcategory'].choices = subcategories_name

        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'border-black my-1'
