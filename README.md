# Maryam Abdolbeigi

## Happy Pet
![Responsive Design](/readme-assets/img/home.png)
[The Website In Action](https://happy-pet.herokuapp.com/)

This is a website for an online pet shop. On this website, users can purchase any necessary or accessory products for their pets. Furthermore, customers are able to rate products and write a review about purchased items for a better quality of services and products.
**NOTE** The purpose of this website is educational only.

## Table of Contents
1. [UX](#ux)
    * [Goals](#goals)
    * [User Stories](#user-stories)
    * [Wireframes](#wireframes)
    * [Flowchart](#flowchart)
2. [Features](#features)
    * [Design In Depth](#des-in-depth)
    * [Navigation Bar](#nav)
    * [Home Page](#home)
    * []()
    * []()
    * []()
    * []()
    * [Custom 404 Page](#404)
    * [Custom 500 PAge](#500)
    * [Footer](#footer)
    * [Yet to be implemented](#yet-to-be-implemented)
3. [Data Architecture](#data-info)
    * [Database Choice](#db)
    * [Examples of database collections in JSON format](#json-format)
4. [Technologies](#tech)
5. [Languages](#langs)
6. [IDE](#ide)
7. [Libraries and CDNs](#libs)
8. [Testing](TESTING.md)
9. [Deployement](#deploy)
    * [Heroku Deployement](#heroku)
    * [Local Clone](#local-run)
10. [Credits](#credits)
    * [Content](#content)
    * [Media](#media)
    * [Code](#code)
    * [Acknowledgement](#ackn)
    * [Disclaimer](#disc)


## UX   <a id="ux"></a>

The effort has been put into this website to be as intuitive as possible.
All pages on this website are responsive to desktop, iPad and, mobile screens.

### The business objectives of this website are: <a id="goals"></a>

- The website sells products and tries to make the users' purchase experience as pleasant as possible to convince them to want to return to the website again.
- Visitors are able to have a personalized account and keep track of their order history.
- Visitors are able to rate and write a review on purchased items.
- Provide a professional online shop that makes users feel safe to make a purchase.
- The delivery of orders will be free for orders above 30€.

###  The customer objectives of this website are:

- Users can make orders with free delivery of orders above 30 €.
- Users can have a personal account on the website to keep track of their orders and be able to evaluate their purchased items.
- Users can buy high-quality, trustworthy products for their pets.
- Users are able to navigate conveniently throughout the website without getting lost.
- Users are able to save their personal info safely for their future purchases and, update them easily as required.


### The Ideal customer for this website:
- Has a pet.
- Speaks English.
- Is a fan of online shopping.


### User Stories: <a id="user-stories"></a>

1. As a first-time visitor, I would like to browse on the website to buy an item for my pet.
2. As a first-time visitor, I would like to find a specific item I am looking for and buy it.
3. As a first-time visitor, I would like to find out more about a specific item I am curious about and read other consumers' reviews about it.
4. As a first-time visitorr, I would like to find some similar products for the item I am looking for.
5. As a returning visitor, I would like to have a personalized account and save my billing address info.
6. As a returning visitor, I would like to rate a product I recently bought and let other users know about my opinion.
7. As a returning visitor, I would like to make a purchase and update my new profile info for my future purchases.
8. As store owner , I would like to add a new product to the website to be sold.
9. As store owner , I would like to update an existing product on the website.
10. As store owner , I would like to remove a out of stuck product from the website.
11. As store owner , I would like to keep track of the orders and be able to see the details of all orders.



### Wireframe Mockups: <a id="wireframes"></a>


Home page:
[Home page wireframes PDF](static/readme-assets/wireframes/home.pdf)


## Features <a id="features"></a>

### Existing Features


* ### Design in Depth <a id="des-in-depth"></a>
     * The main colors used for the design are as shown below.
     ![color theme](/readme-assets/img/color-theme.png)
     * The website is mono-font and the primary font 'Lato' is chosen for this website.





![navigation bar](/readme-assets/img/nav-bag-wishlist-not-empy.png)
![navigation bar](/readme-assets/img/nav-ipad.png)


*   ### Navigation Bar <a id="nav"></a>
    * Featured on all pages to allow for easy navigation.
    * This section will allow users to easily navigate from page to page across all devices without having to revert to the previous page via the back button.
    * It contains a search bar where users can search for a specific query and get the result as expected as a quick search.
    * It contains the logo for brand awareness purposes.
    * 'My account' link is a dropdown containing different links based on whether the user has logged in.
    * The 'My account' icon represents 'My Profile' and 'Logout' links when the user is not signed in.
    * The 'My account' icon represents 'Login' and 'Register' links when the user is not signed in.
    * The 'heart' icon represents the number of items added to the wishlist.
    * If the wish list is not empty, the heart icon color turns red and if not, the color is set to black.
    * The shopping cart icon shows the total amount of added products.
    * If the bag is not empty, the shopping cart icon color turns blue and if not, the color is set to black.
    * The main product navbar displays different categories of the products and when it is hovered over, a dropdown list of subcategories will be displayed.
    * Small icons of every main category is added for the purpose of UI design.
    * On iPad and mobile devices, the main product navbar will be collapsed to a burger button on top of the page.



![Home page](/readme-assets/img/home.png)

*   ### Home page provides: <a id="home"></a>
    * On desktop and larger screens the animal images have an animation effect for entering the screen.
    * Each of the animal images is a link to the relevant category of products and filters the products accordingly.
    * The 'Shop All' button navigates to the products page and displays all products of all categories.
    * The layout of the page is different on mobile and images will be displayed stacked on top of each other.
    * The 'Shop All' button is displayed at the bottom of the images on mobile devices.




![Product page](/readme-assets/img/products.png)
*   ### Products Page
    * Products page displays products in card groups based on selected category and/or subcategory.
    * The default page displays all products with the total number of products on the website.
    * A sort selector bar is on the right side of the products to sort products based on different sorting methods.
    * The layout of the page is different on mobile and iPad devices.
    * Depending on the device size, the number of cards on each row differs.




![Product page with current category](/readme-assets/img/current-category.png)

*   ### Products Page With a Selected Specific Category
    * Products page with a selected specific category displays the relevant products of that category.
    * All relevant subcategories of the selected category will be listed in small buttons under the category button for better access.
    * If any specific subcategory is selected, the other subcategory buttons will be hidden and they could be accessible again by clicking on the category button.



![Product card](/readme-assets/img/product-card.png)

*   ### Product Cards
    * Product cards contains summary of a product in different sections.
    * The product cards contains an image, name, price, current category and subcategory as a link, and rating of the product.
    * The cards are links to product detail page of the relevant product.
    * The cards are hoverable for a better user wxperince and accessibility.
    * If the user is verified as staff, a 'delete' and 'edit' links will be displayed on the cards for the user to either easily navigate to the edit product page or remove the product.
    * If users intents to delete an item, a modal will open to the screen for the user to confirm the deletion of the product for avoiding unintentional deletion of products.


![Product Detail](/readme-assets/img/product-detail.png)

*   ### Product Detail Page
    * Product detail page has different sections:
        #### 'Keep Shopping' Button
        - 'Keep Shopping' button on the top left of the page to navigate to the product page.
        #### 'Add' or 'Remove' Button
        - 'Add' or 'Remove' button to add product to or remove it from the wish list accordingly.
        #### Product Description
        - Full name, image, price, category, and subcategory as links, rating, a quantity selector, and a 'Add to bag' button.
        - Since a product may have multiple images, in that case, multiple images are displayed in a carousel.
        #### Delet/Edit links
        - If the user is verified as staff, the 'edit' and 'delete' links will be visible on this page to enable users edit or delete the product conviniently.
        - Once the 'delete' button is clicked, a modal will open to the screen for the user to confirm the deletion of the product for avoiding unintentional deletion of products.

        #### Add to bag form
        - A quantity selector box that enables users to chose the number of products they are about to buy.
        ![size and color select box](/readme-assets/img/color-size-selector.png)
        - A select box for avaibale sizes and colors will be placed on the product form if the product is available in different colors and sizes.
        - An outstanding 'Add To Bag' button to add the selected product to the shopping cart.
        #### Product Description
        - ![Product desciption and review section](/readme-assets/img/review-desc.png)
        - The product description is displayed in an accordion containing all details about the product.
        #### Review Section
        - The product review section is displayed in an accordion containing rows displaying user reviews content, star rating and date of added reviews.
        #### Similar Products Section
        - ![similar product carousel](/readme-assets/img/sim-carousel.png)
        - Similar products of the same category and subcategory are displayed in similar products section.
        - This section is displayed in a carousel if the number of similar products is more than 4 and, displayed in a single row if it is less than 4 items on the list.
        - This section is slightly diffrent on mobile devices in the way that if there is more than 4 products on the list, the item cards will be displayed one by one in the carousel.
    * The layout of the product detail page is different on mobile devices in the way that the product form and product image will be displayed on seperated rows.



![Profile Page](/readme-assets/img/profile.png)

*   ### Profile Page
    * Profile page is accessible from the 'My account' link on the navbar only if the user has signed in.
    * The layout of the profile page is different on mobile devices in the way that the 2 sections are stacked on top of each other.
    * Profile page consists of 2 different sections:
        1. The user profile info
            - The user profile section displays the default info of the users' account if there is any data.
            - Users can update their profile info as intended.
            ![Profile Page](/readme-assets/img/update-profile.png)
            - The update profile form is in an off-canvas opening to the right side of the window.

        2. The order summary
            - The order summary section contains the user's order history.
            - The order history is ordered by date.
            - On the order history table there is a 'Add a review' link that navigates users to add a review page where users can write a review for purchased products.
            - Users can navigate to each order history detail by clicking on the order number.



![Product Review Page](/readme-assets/img/product-review.png)

*   ### Product Review Page
    * Product review page is accessible from the embedded links from the order history table on the profile page.
    * The star rating is provided for users to easily rate a product.
    * The content of the review is an optional field to enable users to share their experiences in detail.
    * The product user is going to rate is displayed on the right side of the page to avoid any confusion.
    * The layout of the page is different on mobile devices.




![Wish list](/readme-assets/img/wishlist.png)

*   ### Wish list
    * On the wish list page, favorite products are listed in cards.
    * A small bin icon is on the right side of the cards to easily remove the item from the wish list.
    * By clicking on the cards it navigates to the product detail page where users are able to add products to the bag.
    **Note** Since some products are available in different sizes and colors, it was preferred not to directly add a 'add to bag' button on the cards. This is considered a feature to be added in the future.
    * Once a product is added to the list, a toast message pops up on the top right of the page to let users know that the product successfully has been added to the list.




![Shopping cart](/readme-assets/img/bag.png)

*   ### Shopping cart
    * All the products added to the shopping cart are displayed in separated rows.
    * On every single product on the shopping cart, the price, selected size/color, selected quantity, and a subtotal of the product are displayed.
    * A quantity selector is also embedded on each row of added products to enable users to adjust the quantity as intended.
    * A delete and update links are provided under the quantity selector to enable users to adjust or delete the product easily.
    * If the items in the shopping cart are deleted or adjusted, a toast message pops up in the window informing them that the update/deletion was successful.
    * The layout of the page is different on mobile devices for responsive design's sake.
    * Below all the rows of added products a total section is displayed with a light beige background to stand out from the rest of the page.
    * The total section provides an overview of the delivery cost and grand total amount.
    * If there is any delivery cost for the order, a small note will be also displayed under the grand total amount to convince users to buy more in order to have free delivery.
    * At the bottom of the page, a button with the text 'continue shopping' is placed for better accessibility in case users intend to shop more.
    * A 'checkout' button is placed beside the 'continue shopping' button that navigated users to the checkout page.


![checkout page](/readme-assets/img/checkout.png)

*   ### Checkout Page
    * The checkout page consists of 2 different sections:
        1. The payment form section
            * The payment form will be slightly different depending on whether the user has already an account.
                1. The user has an account and has signed in:
                    - A small box with the username and email address of the user will be displayed above the form.
                    - The payment form will be prefilled with users' information.
                    - A checkbox is implemented under the form to ask the users whether they want to save the delivery information to their profile.
                2. The user has an account but has not signed in or the user does not have an account:
                    - The payment form is not prefilled.
                    - There are 2 links under the form to convince users to log in or create an account.
            * As stripe now offer a pre-built checkout, I opted to use this as my payment page, as it hands over much of the back-end coding needed for making payment to Stripe.
            * The Stripe payment page includes a summary of what the user is buying, and fields to enter credit card information.
            * All the validation and messages to the user on this page are handled by stripe.
            * By clicking on the "Complete order" button and on successful completion of payment, the user is redirected to the order confirmation page.
            * By completing an order, an email will be sent to the username's email address containing an overview of their order along with a toast message popping up on the screen informing the user that a confirmation email will be sent to the user's email address.
            * 'Adjust Bag' button is placed under the payment field to enable users to go back and adjust their shopping cart if needed.
        2. Order summary section:
            * In this section, a quick overview of products to be bought, order total, delivery, and grand total will be displayed once again.




![Order Confirmation](/readme-assets/img/order-conf.png)

*   ### Order Confirmation
    * The order confirmation page contains a detailed overview of the order such as order info, product name, selected size/color, the quantity of each item, delivery address, and an overview of billing info.
    * Under the order summary, a 'Back to store' button is placed to navigate users to the product page.



![Registeration Page](/readme-assets/img/sign-up.png)

*   ### Registration Page
    * A user who has not registered on the website can create a new account using the register page. The page on this form includes a username (which must be unique), email address, password, and password conformation fields.



![Login Page](/readme-assets/img/sign-in.png)

*   ### Login Page
    * A user who has already registered on the website can log in through this page and have access to their profile page.
    * Validation for this form is handled in the back end and relevant feedback is sent to the user when they sign in.
    * If the user has forgotten their password, they can recover their password by clicking on the 'Forgot password' link, and then they will be navigated to a page where they can set a new password for their account.
    * All the authentication processes throughout this website are handled in the backend using allauth Django.



![Log out Page](/readme-assets/img/sign-out-page.png)

*   ### Logout Page
    * Any user who clicks on "Log out" from the navigation bar is automatically logged out and their session data is cleared. They are taken to a page that informs them that they have been logged out and provides a link to log back in if they wish.



![Add Product Page](/readme-assets/img/add_product.png)

*   ### Add Product Page
    * This page is only accessible for store owners and staff members to enable them to add a product to the website.
    * After adding the new product, the user will be directed to the product detail page.


![All Orders](/readme-assets/img/all_orders.png)

*   ### All Orders Page
    * This page is only accessible for store owners and staff members to enable them to have an overview of all orders.
    * To design this page, accordion components are used to contain each order's overview and a quick summary.



![Custom 404 Page](/readme-assets/img/404-page.png)
*  ### Custom 404 / 500 Page: <a id="404"></a>
    * The custom 404 page prevents users from confusion and redirects them to the home page if the URL is unavailable or does not exist.
    * The same design and style applies for the 500 error handling page.



![Back To Top Button](/readme-assets/img/btt-btn.png)
*  ### Back To Top Button: <a id="back-btn"></a>
    * A back-to-top button is featured on all pages to enable users to jump to the top of the page quickly without the need to scroll all the way up to the page.


![Footer](/readme-assets/img/footer.png)
*  ### Footer: <a id="footer"></a>
    * The footer is identical on all pages and it provides a copyright of the happy pet website.
    * the footer is sticky to the bottom of the page on small and medium devices.
    **Note** The footer is fixed on medium and small devices such as iPad and mobile as a quick fix for different size of body content across all pages.
    If this is removed, the footer will jump up to the middle of the page when
    navbar toggler expands.


### Yet to be implemented <a id="yet-to-be-implemented"></a>
    1. More features on all orders page for the store owner to view, manage and modify an order if needed.
    2. Add sorting selector to product management page to enable users to sort orders based on different sorting methods such as date, number, alphabetically, and so on.
    3. Getting a product image change according to the selected color of the product. Unfortunately this is not working and as a result no matter what color user has selected, the image of product remains the same.
    4. Enable users to register on the website with their social accounts using Django allauth social authentication tokens.
    5. Add additional payment methods. The current free version of Stripe checkout only allows customers to pay via credit card. Many people prefer to pay via PayPal, bank transfer, or iDeal.



## Information Architecture <a id="data-info"></a>

### Database Choice <a id="db"></a>
* As a framework Django works with SQL databases. During development on my local machine I worked with MySQL Workbench.
On deployment, the SQL database provided by Heroku is a PostgreSQL database.
The data base is designed by myself from the scratch using the handy visual database design tool 'MySQL Workbench'.


### Data Models <a id="db"></a>
- User
    -  The User model utilized for this project is the standard one provided by django.contrib.auth.models


- Category Model
    - Whithin the products app, category model holds the data needed for differenet categories.


| Name | Key in db | Validation | Field Type |
| ----------- | ----------- | ----------- | ----------- |
| category_id | category_ID | primary_key=True | AutoField |
| name | name | max_length=45 | CharField |
| friendlyname | friendlyName | max_length=45, blank=True, null=True | CharField |


- Subcategories Model
    - Whithin the products app, subcategory model holds the data needed for differenet subcategories.


| Name | Key in db | Validation | Field Type |
| ----------- | ----------- | ----------- | ----------- |
| subcategory_id | subcategory_ID | primary_key=True | AutoField |
| name | name | max_length=45 | CharField |
| friendlyname | friendlyName | max_length=45, blank=True, null=True | CharField |
| category | Category | max_length=350, choices=categories, blank=True, null=True | MultiSelectField |

- The categories choices are defined whithin the Subcategories model.
- Category and Subcategory models have a many-to-many relation and that is the reason it is prefered to have category field as a multiselectField to represent the category options.




- Products model
    - Within the products app, the Product model holds all the data needed for the products in the shop.

| Name | Key in db | Validation | Field Type |
| ----------- | ----------- | ----------- | ----------- |
| product_id | Product_ID | primary_key=True | AutoField |
| name | name | max_length=45 | charfield |
| friendlyname | friendlyName | max_length=45 | charfield |
| category | Category | on_delete=models.DO_NOTHING | ForeignKey To Category |
| subcategory | Subcategories | on_delete=models.DO_NOTHING | ForeignKey To Subcategory |
| description | description | blank=True, null=True | charfield |
| price | price | max_digits=6, decimal_places=2 | DecimalField |
| rating | rating | max_digits=6, decimal_places=2, blank=True, null=True | DecimalField |
| image1 | image1 | blank=True, null=True | ImageField |
| image2 | image2 | blank=True, null=True | ImageField |
| image3 | image3 | blank=True, null=True | ImageField |
| sku | sku | unique=True, max_length=254 | CharField |
| has_sizes | has_sizes | max_length=350, choices=has_sizes, blank=True, null=True | MultiSelectField |
| colors | colors | max_length=350, choices=colors, blank=True, null=True | MultiSelectField |


- The has_sizes and color choices are defined whithin the Product model.
- The Product model uses Pillow to store all image files in an AWS S3 bucket.




- ProductReview Model
    - Whithin the products app, ProductReview model holds the data needed for product reviews.


| Name | Key in db | Validation | Field Type |
| ----------- | ----------- | ----------- | ----------- |
| product | product | related_name='reviews', on_delete=models.CASCADE | ForeignKey to Product |
| user | user | related_name='reviews', on_delete=models.CASCADE | ForeignKey to User |
| content | content | blank=True, null=True | TextField |
| stars | stars | - | IntegerField |
| date | date | auto_now_add=True | DateTimeField |



- UserProfile Model
    - Whithin the profiles app, UserProfile model holds the data for each users' default data.

| user | user | User, on_delete=models.CASCADE | OneToOneField |
| default_phone_number | default_phone_number | max_length=20, null=True,blank=True  | CharField |
| default_country | default_country | blank_label='Country *', null=True, blank=True | CountryField |
| default_postcode | default_postcode | max_length=20, null=True, blank=True | CharField |
| default_city | default_city | max_length=40, null=True, blank=True | CharField |
| default_street_address1 | default_street_address1 | max_length=80, null=True, blank=True | CharField |
| default_street_address2 | default_street_address2 | max_length=80, null=True, blank=True | CharField |
| default_county | default_county | max_length=80, null=True, blank=True | CharField |


- The UserProfile model is autogenerated after every User model is created.


- Order Model
    - Whithin the checkout app, Order model holds the data needed for orders.


| Name | Key in db | Validation | Field Type |
| ----------- | ----------- | ----------- | ----------- |
| order_number | order_number | max_length=32, null=False, editable=False | CharField |
| user_profile | user_profile | on_delete=models.SET_NULL,
        null=True, blank=True, related_name='orders' | ForeignKey to UserProfile |
| full_name | full_name | max_length=50, null=False, blank=False | CharField |
| email | email | max_length=254, null=False, blank=False | EmailField |
| phone_number | phone_number | max_length=20, null=False, blank=False | CharField |
| country | Country | blank_label="Country *", null=False, blank=False |  CountryField|
| postcode | postcode | max_length=20, null=True, blank=True | CharField |
| town_or_city | town_or_city | max_length=40, null=False, blank=False | CharField |
| street_address1 | street_address1 | max_length=80, null=False, blank=False | CharField |
| street_address2 | street_address2 | max_length=80, null=True, blank=True | CharField |
| county | county | max_length=80, null=True, blank=True | CharField |
| date | date | auto_now_add=True | DateTimeField |
| delivery_cost | delivery_cost | max_digits=6, decimal_places=2, null=False, default=0 | DecimalField |
| order_total | order_total | max_digits=10, decimal_places=2, null=False, default=0 | DecimalField |
| grand_total | grand_total | max_digits=10, decimal_places=2, null=False, default=0 | DecimalField |
| original_bag | original_bag | null=False, blank=False, default='' | TextField |
| stripe_pid | stripe_pid | max_length=254, null=False, blank=False, default='' | CharField |


- An instance of the Order model is created before any OrderLineItem, as the latter relies on the former for a ForeignKey.



- OrderLineItem Model
    - Whithin the checkout app, OrderLineItem model holds the data for each individual item in the shopping cart.

| order | order | Order, null=False, blank=False,
        on_delete=models.CASCADE, related_name='lineitems' | ForeignKey To Order |
| product | product | Product, null=False, blank=False,
        on_delete=models.CASCADE | ForeignKey To Product |
| product_size | product_size | max_length=10, null=True, blank=True | CharField |
| product_color | product_color | max_length=15, null=True, blank=True | CharField |
| quantity | quantity | null=False, blank=False, default=0 | IntegerField |
| lineitem_total | lineitem_total | blank=False, null=False, editable=False | FloatField |

- An instance of OrderLineItem is created for each unique product in the users cart. It links to the already existing Order for this user, the relevant product and the quantity the user wishes to buy.



## Technologies Used <a id="tech"></a>
### Languages <a id="langs"></a>
- HTML5
- CSS
- JavaScript
- Python3


### IDE <a id="ide"></a>
- VScode

### Tools: <a id="libs"></a>


1. [Django](https://www.djangoproject.com/)
- As python web framework for rapid development and clean design.

2. [Balsamiq](https://balsamiq.com/wireframes/)
- This was used to create mockups during the design process.

3. [GitHub](https://github.com/)
- Github was used as a remote repository and to deploy the website.

4. [Git](https://git-scm.com/)
- Git was used as version control to keep track of files and push them to the remote repository.

5. [FontAwesome](https://fontawesome.com/start)
- Font Awesome was used throughout the website to add icons.

6. [Google Fonts](https://fonts.google.com/)
- Google fonts were used to import the font styles in the website.

7. [Chrome Developer Tools:](https://developer.chrome.com/docs/devtools/)
- This was used for debugging and for checking the responsiveness of the website.

8. [Ami Responsive](http://ami.responsivedesign.is/)
- This was used to test the website responsiveness.

9. [HTMLValidationService](https://validator.w3.org/)
- This was used to check the markup validity of the web documents.

10. [CSSValidationService](https://validator.w3.org/)
- This was used to check the markup validity of the web documents.

11. [Coolors.co](https://coolors.co/eae8ed-bcdadd-b3d1bb-62a9af-af70c2-500966)
- This was used to choose the color theme used in the website.

12. [Unicorn Revealer Extention](https://chrome.google.com/webstore/detail/unicorn-revealer/lmlkphhdlngaicolpmaakfmhplagoaln?hl=en-GB)
- This is a developer-friendly tool to locate the overflows and was used throughout the process.

13. [w3schools](https://www.w3schools/)
- This was used for documentation for most troubles and errors.

14. [jQuery](https://jquery.com/)
- This was used as Javascript library to write less Javascript codes.

15. [Pinterest](https://nl.pinterest.com/)
- This was used to download images for the website.

16. [favicon.io](https://favicon.io/)
- This was used to create and insert a favicon.

17. [Stripe](https://stripe.com/nl)
- As payment platform to validate and accept credit card payments securely.

18. [AWS S3 Bucket](https://aws.amazon.com/)
- To store images entered into the database.

19. [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
- To enable creation, configuration and management of AWS S3.

20. [Coverage](https://coverage.readthedocs.io/en/6.3.2/)
- To measure code coverage of python unittests.

21. [Django Crispy Forms](https://django-crispy-forms.readthedocs.io/en/latest/)
- To style django forms.

22. [Django Storages](https://django-storages.readthedocs.io/en/latest/)
- A collection of custom storage backends with django to work with boto3 and AWS S3.

23. [Gunicorn](https://pypi.org/project/gunicorn/)
- WSGI HTTP Server for UNIX to aid in deployment of the Django project to heroku.

24. [Heroku](https://dashboard.heroku.com/login)
- This was used as the deployment platform.

25. [Pillow](https://pillow.readthedocs.io/en/stable/)
- as python imaging library to aid in processing image files to store in database.

26. [Psycopg2](https://pypi.org/project/psycopg2/)
- as PostgreSQL database adapter for Python.

27. [PIP](https://pip.pypa.io/en/stable/installing/)
- for installation of tools needed in this project.

28. [Browserstack](https://www.browserstack.com/)
- to test functionality on all browsers and devices.

29. [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- to Access Google APIs for sending emails.

30. [google-auth-oauthlib ](https://pypi.org/project/google-auth-oauthlib/)
- This library provides oauthlib integration with google-auth.

31. [python-dotenv 0.20.0](https://pypi.org/project/python-dotenv/)
- Used to set local variables.
### Databases
* [PostgreSQL](https://www.postgresql.org/)
- for production database, provided by heroku.
* [MySQL](https://www.mysql.com/)
- as development database.



### Libraries
* [Bootstrap5](https://getbootstrap.com/)
- to simplify the structure of the website and make the website responsive easily.
* [FontAwesome](https://fontawesome.com/)
- to provide icons for The House of Mouse webshop.
* [JQuery](https://jquery.com/)
- to simplify DOM manipulation.
* [GSAP](https://greensock.com/gsap/)
- a popular set of JavaScript tools for building animations on the web.




## Testing <a id="test"></a>
Testing information can be found in a separate [TESTING.md file](TESTING.md)
## Deployment <a id="deploy"></a>
### Local Clone <a id="local-run"></a>
This is used to make changes to the project code.

1. log in to Github and locate the intended repository.
2. Above the Repository files, click on the "Code" button.
3. You then see three options, HTTPS, SSH and GitHub CLI. Select one and copy the URL.
4. Open a new terminal on Git Bash.
5. Now change the current working directory to the location you'd like the cloned directory to be made.
6. Type git clone, and then paste the URL you copied from the remote repository.

`$ git clone https://github.com/Yasi92/Happy-Pet.git`

### How to run this project locally

To run this project on your own IDE follow the instructions below:
Ensure you have the following tools and packages installed on your machine:

 - An IDE such as [Visual Studio Code](https://code.visualstudio.com/)
 - PIP
 - Python3
 - Git

To allow you to access all functionality on the site locally, ensure you have created free accounts with the following services: - [Stripe](https://dashboard.stripe.com/) - [AWS](https://aws.amazon.com/) and set up an S3 bucket.



#### Instructions
1. Clone the repository with the following command.
`$ git clone https://github.com/Yasi92/Happy-Pet.git`

2. cd to the correct repository location.

3. If needed, Upgrade pip locally with
`pip install --upgrade pip`

4. Install all required modules with the command
`pip -r requirements.txt`

5. In your local IDE create a file called .env.py in the same level as your settings.py

6. Inside the .env.py set the following variables:

    - SECRET_KEY = Your Django SECRET KEY
    - DATABASE_PASSWORD = Your database password
    - STRIPE_PUBLIC_KEY = Your STRIPE PUBLIC KEY
    - STRIPE_SECRET_KEY = Your STRIPE SECRET KEY
    - STRIPE_WH_SECRET = Your STRIPE WH SECRET
    - DEVELOPMENT = True
**Note** that the data in the .env.py are confidential and as a result it won't be provided here.


- DEVELOPMENT environment variable is set only within the development environment, it does not exist in the deployed version, making it possible to have different settings for the two environments. For example setting DEBUG to True only when working in development and not on the deployed site.

7. Set the ALLOWED HOSTS variable in setting.py to your localhost.
8. Switch the database to Django default database.
**Note** Add the following db as your DATABASES variable in settings.py since the database used in development for this project was not the default sqlite3.
```DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'mydatabase',
    }
}
```

9. Migrate the admin panel models to create your database template with the terminal command.
`python3 manage.py migrate`

10. Create your superuser to access the django admin panel and database with the following command, and then follow the steps to add your admin username and password:
`python3 manage.py createsuperuser`

11. You can now run the program locally with the following command:
`python3 manage.py runserver`

12. Once the program is running, go to the local link provided and add /admin to the end of the URL. Here log in with your superuser account and create instances of Category, Subcategories and Product within the new database.

13. Once instances of these items exist in your database your local site will run as expected.



### Heroku Deployement <a id="heroku"></a>
1. Create a requirements.txt file using the terminal command `pip freeze > requirements.txt.`
2. Create a Procfile with the terminal command `echo web: gunicorn happy_pet.wsgi:application`
3. git add and git commit the new requirements and Procfile and then git push the project to GitHub.
4. Create a new app on the Heroku website by clicking the "New" button in your dashboard. Give it a name and set the region to Europe.
5. From the heroku dashboard of your newly created application, click on "Deploy" > "Deployment method" and select GitHub.
6. Confirm the linking of the heroku app to the correct GitHub repository.
7. In the heroku dashboard for the application, click on "Settings" > "Reveal Config Vars".
8. Set the following config vars:

| Key | Value |
| ----------- | ----------- |
| AWS_ACCESS_KEY_ID | your secret key |
| AWS_SECRET_ACCESS_KEY | your secret key |
| DATABASE_URL | your postgres database url |
| EMAIL_HOST_PASS | your email host pass |
| EMAIL_HOST_USER | your email user |
| SECRET_KEY | your secret key |
| STRIPE_PUBLIC_KEY | your public key |
| STRIPE_SECRET_KEY | your secret key |
| STRIPE_WH_SECRET | your wh secret key |
| USE_AWS | True |

9. From the command line of your local IDE:
    - Enter the Heroku Postgres shell
    - Migrate the database models
    - Create your superuser account in your new database
- Instructions on how to do these steps can be found in the [heroku dev center documentation](https://devcenter.heroku.com/articles/heroku-postgresql).
10. In the Heroku dashboard, click "Deploy".
11. In the "Manual Deployment" section of this page, make sure the master branch is selected and then click "Deploy Branch".
11. From the link provided add /admin to the end of the URL, log in with your superuser account, and create instances of Category, Subcategories, and Product within the new database.
12. Once instances of these items exist in your database your heroku site will run as expected.



## Credits <a id="credits"></a>
### Content <a id="content"></a>
- The content of products on this website are taken from different online pet shops and are collected by myself for the purpose of generating a database for this project. All the borrowed content on this website are for the educational purposes only.

### Media <a id="media"></a>
- The animal images on the home page are from [Pinterest](https://nl.pinterest.com/).



### Code <a id="code"></a>
- The core concept of stripe payment are directly coming from Boutique-ado project and Stripe documentaion.
- The main functionalities and methods throughout the website are learned and/or borrowed from code institute tutorial videos.
- The star rating of products are learned form [this tutorial](https://www.youtube.com/watch?v=YN2jW4Fp7tM).
- Unit testing the python code is learned from [these tutorial series](https://www.youtube.com/playlist?list=PLbpAWbHbi5rMF2j5n6imm0enrSD9eQUaM).


## Acknowledgements <a id="ackn"></a>

- Special thanks to my mentor **Richard Wells** for his constant valuable feedback and ideas throughout the project.
- Tutors at Code Institute for their continued support.
- Code Institute's Slack community was a great help every step of the way during the project.
- Stack Overflow.
- I have learned more in detail about how to complete my README from **Anna Gilhespy**'s project, provided in the Code Institute's Slack community as a README template.


## Disclaimer <a id="disc"></a>
The content of this website is educational purposes only.
