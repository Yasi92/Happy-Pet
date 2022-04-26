# Happy Pet - Testing in detils

[The Website In Action](https://happy-pet.herokuapp.com/)
[Main README.md file](README.md)



## Table of Contents
1. [Automated Testing](#auto-test)
    * [Validation Services](#val-services)
    * [Python Testing](#python-test)
        * [How to run Python tests](#python-test-run)
        * [Coverage](#coverage)
2. [Bugs & Solutions](#bugs-solutions)
3. [Known Issues](#known-issues)
4. [User Stories Testing](#user-story-testing)
5. [Logical/Manual Testing](#manual-testing)
    - [Navigation Bar](#nav-test)
    - [Home](#home)
    - [Products Page](#products)
    - [Product Detail Page](#product-detail-test)
    - [Profile Page](#profile-test)
    - [Product Review](#product-review-test)
    - [Wishlist](#wishlist-test)
    - [Shopping Cart](#bag-test)
    - [Checkout Page](#checkout-test)
    - [Order Confirmation](#order-conf-test)
    - [Registration Page](#register-test)
    - [Login Page](#login-test)
    - [Logout Page](#logout-test)
    - [Add Product Page](#add-product)
    - [Edit Product Page](#edit-product)
    - [Delete a Product](#delete-product)
    - [All Orders Page](#all-orders)
    - [404 page](#404-test)
    - [Back To Top Button](#back-top-btn-test)
    - [Footer](#footer-test)
3. [Further Testing](#further-testing)
    - [Devices](#devices)





## Automated Testing <a id="auto-test"></a>
### Validation Services  <a id="val-services"></a>
The following validation services and linter were used to check the validity of the website code.

- [HTML Validation](https://validator.w3.org/)
was used to validate all the HTML files.
  * **Important Note** on the pages with the jinja template, the W3c validator throws many errors in regards to the syntax and variable names inserted by the jinja template.
  To get around this issue all the html files were validated by manually direct input of each file. The files were extracted from the 'view page source' on the browser.
- All the files have been validated and all essential errors were fixed.


![CSS validation report](/readme-assets/img/css_validation.png)
- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) was used to validate the code in my style.css file.
- The website has been tested with the Lighthouse for each page separately and on both desktop and mobile devices and, required actions have been taken to improve the functionality of the website as much as possible.
- Lighthouse was also used to check the overall performance of the website and as a way to improve the website performance.
**Note** Due to time constraints, not all the required actions were taken to improve the performance and speed of the site.
For instance, since images across this project have all been downloaded from different platforms with different sizes, the required action to resize all the images in a proper ratio is time-consuming, and as mentioned before due to time constraints for this project it has been disregarded.


[JSHint](https://jshint.com/)  was used to validate javascript.
- All the errors and warnings from JSHint such as missing semicolons and unused variables have been fixed properly.



[Python extension for Visual Studio Code ](https://code.visualstudio.com/docs/languages/python)   was used to validate Python.
[Flake8](https://flake8.pycqa.org/en/latest/)   was used to fix the linting issue and to check my code base against coding style PEP8.
* To check this you can run the following command in your terminal:
    ` python3 -m flake8 `




### Python Testing   <a id="python-test"></a>
#### How to run Python tests  <a id="python-test-run"></a>
To run the existing Python tests:
    1. After running the project locally in your IDE run the following command:
    ` python3 manage.py test `
    2. If you wish to run the tests within a specific app only you can specify with:
    ` python3 manage.py test <app name here> `
    3. The test results will be shown within the terminal.

### Covarage   <a id="coverage"></a>
[Coverage.py](https://coverage.readthedocs.io/en/6.3.2/) was used to provide feedback during testing to check that enough of my code had been tested.
How to run coverage

In the terminal enter the following command:
1. ` coverage run --source=<app name> manage.py test`
2. ` coverage report `
3. ` coverage html `
4. ` python3 -m http.server `

- [home app coverage report](/readme-assets/img/home_coverage_html.png)
- [products app coverage report](/readme-assets/img/products_coverage_html.png)
- [profile app coverage report](/readme-assets/img/profiles_coverage_html.png)
- [checkout app coverage report](/readme-assets/img/checkout_coverage_html.png)
- [bag app coverage report](/readme-assets/img/bag_coverage_html.png)
- [whishlist app coverage report](/readme-assets/img/wishlist_coverage_html.png)



 <a id="bugs-solutions"></a>
| Bugs | Solutions |
| ---------- | ---------- |
| While pushing to the Github at the first stage of the project, the DATABASE credentials such as my database password and my Django secret key has been unintentionally pushed to my remote repository. | To fix this issue, I cleaned my settings.py and all its content from the previous commit histories using the 'BFG' repo-cleaner |
| Since the min-height of my main section across all templates is set by javascript calculating it based on the header and footer size, Once the navbar is collapsed on mobile and iPad devices the footer would jump up to the middle of the page. | As a quick fix for this issue, the footer is set fixed at the bottom of the screen on medium and down devices. This is not the perfect solution for this issue however as this issue was known at a late stage of the project it has been preferred to be temporarily fixed this way. |
| When trying to add an item with an existing item_id in a bag session with a different color/size the new item would replace the previous item with the same item_id in the bag even though the increment quantity was defined to add the new item. | An f-string method was used to get around this issue and generate a unique value of the item for the bag session dictionary. This is caused by python dictionaries not excepting duplicated keys. The code is shown below before and after the solution. |


### Before fixing the bug
```
if item_id in list(bag.keys()):
  if size in bag[item_id][items_by_filter][size] and color in bag[item_id]['items_by_filter'][color]:
      bag[item_id]['items_by_filter'][size] = size
      bag[item_id]['items_by_filter'][color] = color
      bag[item_id]['items_by_filter'][quantity] += quantity
  else:
      bag[item_id]['items_by_filter'][size] = size
      bag[item_id]['items_by_filter'][color] = color
      bag[item_id]['items_by_filter'][quantity] = quantity
else:
  bag[item_id] = { 'items_by_filter' : {
    size :size,
    color : color,
    quantity : quantity
  }
}
```


### After fixing the bug
```
item = f'{item_id}_{size}_{color}'

if size and color:
    if item_id in list(bag.keys()):
        if item in bag[item_id]['items_by_filter'].keys():
            bag[item_id]['items_by_filter'][item] += quantity
        else:
            bag[item_id]['items_by_filter'][item] = quantity
    else:
        bag[item_id] = {'items_by_filter': {item: quantity}}

```


 <a id="known-issues"></a>

 
| Known Issues | Causes |
| --------------- | --------------- |
| When running flake8, some warnings in regards to the line being too long have been disregarded in test.py files. | Since the values being asserted should be exactly the same with the same indentation levels these warnings have been disregarded. EXP: profiles/tests/test_forms.py:49:80: |
| The site users (registered users) are supposed to be able to rate and leave a review only on the products they ordered an item from however, currently users are able to navigate to the product review page for all products if they know the proper URL. | This is caused by not filtering products that are going to be reviewed based on whether the user has ordered them. |
| Some product on the site is available in different sizes and/or colors and as it should when the user selects a different color, the image of the product added to the shopping cart should match the selected color however this is not the case at the moment. | This is a result of not having proper modeling for products and should be improved for real-life online stores. |



## User stories testing: <a id="user-story-testing"></a>

### Testing client stories from UX section of [README.md](README.md)

#### As a shopper
1. I would like to browse the website to buy an item for my pet.
    * The product page contains all the products where users are able to browse the page and view all products.
2. I would like to find a specific item I am looking for and buy it.
    * The search box in the navbar enable users to search for the product they are looking for easily.
    * The different category and subcategory links enable the user to search for their intended product.
3. I would like to, select the size and quantity of a product when purchasing it.
    * On the product details page,  select size and color selectors enable users to select their intended size and/or color to their shopping cart.
4. I would like to, view selected products in my bag ready for checkout.
    * The shopping cart icon on the top right of the page provides a link to the shopping bag cart as well as displays the current total of the added orders.
5. I would like to, adjust the number of selected items in the bag.
    * Once on the shopping cart page, the quantity selector box enables users to adjust the number of items in the bag.
    * The 'Delete' link under the quantity selector on the page enables users to completely remove the item from their shopping cart.
6. I would like to, enter my payment info safely.
    * The checkout page, features a safe payment method provided by Stripe that enables users to securely proceed with their payments.
7. I would like to, view an order confirmation after checkout.
    * After the payment has been succeeded, a toast message pops up on the window informing users that their order has been placed successfully and that they will receive a confirmation email.
    * Once the order is completed, the user will be navigated to the checkout success page where they will be provided with a summary of their order details. This page is accessible from the order links on their profile page as well.
8. I would like to, receive a confirmation email after the checkout.
    * After the payment is completed a confirmation email will be sent to the email address of the email address provided on the payment form containing a summary of their order.
9. I would like to see the product I searched for and the number of results.
    * Either when a product is searched in the search box or filtered by selecting a specific category or subcategory, the number of results for the query will be displayed on the top left of the products.
10. I would like to search for a product by name or description.
    * The search box in the navbar enable users to search for the product they are looking for easily.
11. I would like to have the possibility to check the total of my added items easily.
    * The shopping cart icon in the navbar displays the total of the added items.
12. I would like to find some similar products for the item I am looking for.
    * Down the product detail page, all similar products of the product are displayed in a carousel and accessible with a click.
13. I would like to be able to add my favorite items to my wishlist.
    * The 'Add' button with the heart icon on the product detail page, enables users to add their favorite product to their wish list and once it is clicked for a better user feedback the heart icon will turn red, and the 'Add' text changes to 'Remove'.
14. I would like to be able to sort the list of products in different sorting options as I wish.
    * The sort selector above the products enables users to sort products based on different sorting options such as price, rate, name, and so on.




#### As a site user (Returning user)

1. I would like to have a personalized account and save my billing address info.
    * Once the user is registered and logged in, a small checkbox under the payment form enables the user to save or update their profile info for their next purchase.
2. I would like to log in and log out.
    * The login and logout pages are accessible by the links in the navbar.
3. I would like to Be able to write a review on a purchased product.
    * The product review page could be accessed from the profile page on the order history table. For each product on every order a 'Add a Review' link is provided to navigate the user to the product profile page.
4. I would like to rate a product I recently bought and let other users know about my opinion.
    * From the product review page users can choose if they would like to only rate the product quickly with the star rating method or add content and full review about it.
5. I would like to make a purchase and update my new profile info for my future purchases.
    * The profile page features an 'Update Profile' button which opens a modal containing an update profile form that let users update their profile info.
6. I would like to register for an account on the site.
    * From the navbar > profile, the register link is available as well as on the payment form when the user is asked to log in or register to save the entered info for their next purchase.
7. I would like to recover my password in case I forget it.
    * From the login page, the 'forgot password link navigates to a reset password page where users can recover their password.


#### As Store Owner (Admin)
1. I would like to add a new product to the website to be sold.
    * The add product page is accessible from the Profile dropdown in the navbar where the admin would be able to add a product to the website.
2. I would like to update an existing product on the website.
    * The Edit product link is accessible from 2 different paths:
      - From the product page on every product card.
      - From the Product deatils page under the product price.
  From the edit product page, the admin will be provided with a prefilled product form and is able to update any field as needed.
3. I would like to remove an out-of-stock product from the website.
    * The Delete product link is accessible from 2 different paths:
      - From the product page on every product card.
      - From the Product deatils page under the product price
  Once the 'Delete' button is clicked a deletion confirmation opens in a modal asking the user to confirm the process to avoid aby unindented deletion of products.
4. I would like to keep track of the orders and be able to see the details of all orders.
    * The all order page is accessible from the Profile dropdown in the navbar and the admin can have an overview of all processed orders on this page.



## Manual (logical) testing of all elements and functionality on every page.   <a id="manual-testing"></a>

###  Navigation Bar  <a id="nav-test"></a>
  * Click each link in the navbar to confirm that it leads to the correct page.
  * Confirm that when logged out the options "Register" and "Log in" are visible and that "Account" and "Log out" are not.
  * log in to the site, confirm that options "Account" and "Log out" are visible and that "Register" and "Log in" are not.
  * log in to the site with an admin account and ensure that the "Add product" and "All Orders" links are visible.
  * Add a few items to the shopping cart and ensure that the correct total appears on the link.
  * Add a few items to the wishlist and ensure that the color of the heart icon turns red as well as display the number of items added to the bag.
  * Hover over the links on the main category navbar and ensure the items will display.
  * Resize the window into medium and small sizes and make sure the navbar collapses as expected.
  * Click on each category link and confirm that they work as expected and display the relevant products and that it displays the selected category and its relevant subcategories in small badges on the page.
  * Make a search query using the search box and ensure it displays the expected result as well as the number of results.


### Home page  <a id="home"></a>
  * Reload the page and ensure the animation runs as expected.
  * Click on each animal images and meke sure it navigates to the products page with filtering the products based on the relevant category.
  * Click on the 'Shop All' button and ensure it navigates to the product page displaying all products.
  * Resize the window and make sure the animation does not run on small devices.
  * Click on each category and subcategory badge and make sure they work as expected and display relevant products.
  * Resize the window and make sure the layout of the page changes as expected.



### Products Page  <a id="products"></a>
  * Hover over the product cards and confirm that the box-shadow style is applied when the cards have hovered over.
  * click on different options of the sorting selector and confirm that it sorts the products as expected.
  * Click on the current category and subcategories shown on product cards and confirm that it filters the relevant category and subcategory properly.
  * Resize the page and confirm the expected layout on medium and small devices applied to the page.
  * Click on the product cards and ensure it navigates to the relevant product detail page in a new tab.
  * log in to the site with an admin account and ensure that the 'Delete' and 'Edit' links are visible on the cards for the admin user and ensure the links work as expected.




### Product Detail Page  <a id="product-detail-test"></a>
  * Click on the 'Keep shopping' button and confirm it navigates to the products page.
  * Click the "Add" button with the heart icon and confirm the product is added to the wishlist.
  * Make sure when the product exists in the wishlist, the heart icon color is red and the "Add" text is changed to "Remove".
  * Click on the minus and plus quantity selector and confirm it works as expected and that the minimum value of it is set to 1.
  * Add the product to the shopping cart and ensure the toast message appears on the top right of the page for 5 seconds.
  * Check the toast message containing the bag items and ensure it displays the correct data.
  * Find a product with more than 1 image and confirm that the product images are displayed in a carousel.
  * Find a product that is available in different sizes and colors and ensure that the selected color and size are added to the bag.
  * Repeat the last step and add the product with the same size and color value to the bag and ensure the quantity of the item is adjusted properly.
  * Select a different size and/or color of the same product and confirm that the new selected size and/or color is added to the shopping cart.
  * Click on the description accordion button and confirm that the description text displays.
  * Find a product without a description and ensure the description section is not visible.
  * Click the review accordion button and ensure the product reviews are visible.
  * Find a product without any review and ensure the 'No Review' text appears in the section.
  * Scroll down the page and confirm the similar products carousel is working as expected.
  * Click on the next and previous carousel buttons and confirm they work properly.
  * Click on a product card in the similar products carousel and confirm it navigates to the relevant product detail page in a new tab.
  * Find a single product in a subcategory and confirm that the similar product section is not visible.
  * Find a product from a subcategory with less than 4 products and confirm that the similar products are displayed in a single row containing the product cards and not in a carousel anymore.
  * Resize the window and ensure the responsive style is added to the page.
  * log in to the site with an admin account and ensure that the 'Delete' and 'Edit' links are visible on the page for the admin user and ensure the links work as expected.
### Profile Page  <a id="prfile-test"></a>
  * Log in to the site and confirm the "Profile" link is visible in the navbar.
  * Confirm the data added on the profile info are correct.
  * Click on the "Update Profile" button and ensure that it opens a modal containing the profile update form.
  * Confirm that the update profile form is prefilled with the correct data.
  * Update a field on the form and click submit to ensure the data is updated as expected.
  * Confirm all the orders from the user are listed on the order history box.
  * Click on the order number and ensure it navigates to the checkout success page with the order summary info.
  * Confirm that once navigated to the checkout success page, a toast message appears on the screen informing that this is a past confirmation.
  * Ensure that there is a "Add a Review" link for each product in the order history table.
  * Click on the "Add a Review" link and confirm it navigates to the product review page for the relevant product.
  * Resize the window and ensure the responsive style applies to the layout of the page.


### Product Review Page  <a id="product-review-test"></a>
  * Click on the "Back to Profile" button and confirm it navigates to the profile page.
  * Confirm that the product detail of the product going to be rated is properly displayed next to the form.
  * Check that the default star rating is applied and is set to 1.
  * Click on all the stars one by one and make sure they all change color as expected.
  * Submit the form without any value and ensure the submission passes successfully as the default value is set to 1.
  * Deselect the stars and confirm the color reverts as expected.
  * Add some text into the text area and submit the form and confirm that it redirects to the profile page with a toast message thanking the user for their review.
  * Resize the window and ensure the responsive style applies to the layout of the page.
  * Try to click on the same rated product and confirm that the rating form is not visible anymore and instead the user is provided with their previous review on the product.


### Wish list  <a id="wishlist-test"></a>
  * Add a few items to the wish list and navigates to the wish list.
  * Confirm that the added products are displayed in separate rows containing the product name, SKU, and price.
  * Add an item with available different sizes and/or colors and confirm that the available sizes and colors are displayed on the product row.
  * Click on the bin icon and ensure the product has been removed from the wish list.
  * Click on the product and confirm it navigates to the relevant product.
  * Empty the wish list and confirm the wish list heart icon turn black and displays (0) number.
  * Resize the window and ensure the responsive style applies to the layout of the page.

### Shopping cart   <a id="bag-test"></a>
  * Click on the "Continue Shopping" button and confirm it navigates to the products page.
  * Add a few different items to the bag and confirm all added items are displayed in separate rows with the correct size, color, and quantity values.
  * Adjust the quantity of an item with the quantity selector on each row, click update and confirm the quantity has been updated as expected.
  * Confirm that after updating the quantity of a product, the total of the bag in the navbar updates accordingly.
  * Click on the "Delete" link and confirm the item has been removed from the bag.
  * Add some items to the bag with a total of less than 30€ and ensure the delivery cost is calculated correctly.
  * Add some items to the bag with a total of more than 30€ and ensure the delivery cost is set to 0.
  * Resize the window and ensure the responsive style applies to the layout of the page.
 * Confirm that after every adjustment in the bag a toast message containing the new update appears on the window for 5 seconds.
 * Click on the "Checkout" button and confirm it navigates to the checkout page.




### Checkout Page  <a id="checkout-test"></a>
  * Confirm all the added items are listed on the page with the expected size, color, and quantity values.
  * Login to the site and make sure your username and email address are visible on a small box above the payment form and, the payment form is prefilled with the profile info.
  * Log out and make sure the profile infobox is not visible anymore and that the payment form is empty.
  * Try to click the checkout button without having filled a required field and confirm the form won't be submitted and that it navigates to the field causing the error.
  * After having filled the form, check the save info checkbox and navigate to your profile page confirming the profile data has been updated.
  * Fill out the form without checking the save info checkbox, navigate to the profile page and confirm data has not been changed.
  * Ensure that a small red text warning the user about the amount going to be charged from their account is displayed under the card payment field.
  * Enter a valid credit card number from stripe cards and click the "Complete Order" button, confirm during the payment process a pink screen with a spinning circle is displayed.
  * Confirm that after the payment is completed it navigates to the checkout success page.
  * Resize the window and ensure the responsive style applies to the layout of the page.
  * click on the "Adjust Bag" button and ensure it redirects to the shopping cart.

 ### Order Confirmation  <a id="order-conf-test"></a>
  * confirm being navigated to the order confirmation/checkout success page after placing an order and completing the payment.
  * If navigating from the profile page, ensure a toast message appears on the screen informing that this is a past order confirmation.
  * Confirm that the order confirmation table includes all products on the order.
  * Resize the window and ensure the responsive style applies to the layout of the page.
  * Click on the "Back To Profile" button and make sure it works as expected.
  * Confirm that if navigated from the profile page, a "Back to Profile" is added at the bottom of the page and otherwise it is replaced with a "Back To Store" button.
  * Confirm that if navigated from the profile page, a "Add a Review" link is featured on all product lines to enable users to navigate to the product review page otherwise this link is not visible.



### Registration Page  <a id="register-test"></a>
  * Confirm this page is accessible from the link in the Profile dropdown in the navbar.
  * Resize the window and confirm that the background image of the page is not visible on mobile devices for the purpose of maintaining the proper contrast.
  * Fill out the registration form and make a new account on the page.
  * Ensure you are asked to verify your email address and that an email asking you to confirm your email address has been sent to your email address.
  * Ensure that after following the link in the email you can confirm your email address and a success toast message appears on the screen informing you that you are registered successfully.

### Login Page  <a id="login-test"></a>
  * This page is accessible from the login link in the Profile dropdown in the navbar only when logged out.
  * Enter an existing username and password and confirm you are successfully logged in.
  * Click on the "Forgot password" link and confirm it navigates to a reset password page where you can recover the password.
  * Click on the "Home" button and ensure it navigates to the home page.
  * Resize the window and confirm that the background image of the page is not visible on mobile devices for the purpose of maintaining the proper contrast.



### Logout Page  <a id="logout-test"></a>
  * Confirm this page is accessible from the profile dropdown link only if the user is logged in.
  * Resize the window and confirm that the background image of the page is not visible on mobile devices for the purpose of maintaining the proper contrast.
  * Click on the checkout link and ensure it navigates to the logout confirmation page.
  * Click on the "Sign Out" button and ensure it successfully logs the user out and redirects to the home page.
  * Click on the "Cancel" button and confirm it ignores the logout and redirects to the home page.

### Add Product Page  <a id="add-product"></a>
  * Login to the site with an admin account and confirm the "Add a Product" is visible from the profile dropdown link in the navbar.
  * Click on the "Add a Product" link and confirm it navigates to the product management page with a form to add a product.
  * Fill out the form properly and confirm it redirects to the product detail page with the correct product data.
  * Leave off a required field on the form and try to submit the form, confirm the form won't be submitted and that the window location jumps to the field causing the error.
  * Add a product without an image and ensure the default no-image image is set to the product.
  * Add a product with multiple images and confirm that all images of the product are displayed in a carousel on the product detail page.
  * Attempt to get this page by manually adding the URL while the user is not an admin and make sure an error toast message pops on the screen informing the user that this action is only allowed for the store owners.



  ### Edit Product Page  <a id="edit-product"></a>
  * Confirm the form is prefilled with the product data that is going to be edited.
  * Modify a field on the form and confirm it navigates to the product detail page with the updated data.
  * Confirm that once landed on the page and info toast message pops on the screen informing the user which product is being edited.
  * Attempt to get this page by manually adding the URL while the user is not an admin and make sure an error toast message pops on the screen informing the user that this action is only allowed for the store owners.


 ### Delete a Product  <a id="delete-product"></a>
  * Click on the "Delete" button and confirm a confirmation modal opens to the screen asking the user if they are sure they want to delete the product.
  * Confirm the deletion by clicking the "Yes" button and ensure the product has been removed properly.


### All Orders Page  <a id="all-orders"></a>
  * Confirm this page is accessible only for the admin accounts.
  * Click on each accordion button and ensure it displays the order details.


### 404 page  <a id="404-test"></a>
  * Deliberately Enter a non-existent URL into the URL box and ensure it renders the custom 404 page letting the user know the page has not been found.
  * Click on the "Let's go back home" button and confirms it redirects to the home page.
  * Resize the window and confirm that the background image of the page is not visible on mobile devices for the purpose of maintaining the proper contrast.
**Note** This is something that you can examine only on production and not in your development environment when the debugger is set to True.

### Back To Top Button   <a id="back-top-btn-test"></a>
  * Confirm the button is invisible once the page is at the top and not scrolled to the bottom.
  * Click on the button and make sure that the animation effect works properly and the page scrolls to the top smoothly.


### Footer  <a id="footer-test"></a>
  * Confirm the footer position is fixed at the bottom of the page on desktop and larger screens and sticky bottom on medium and small devices.



## Further Testing  <a id="further-testing"></a>
I have tested the live website on the following browsers and devices with [BrowserStack](https://live.browserstack.com/)

- Google Chrome
- Safari
- Firefox
- IE
- Edge
- Opera

### Devices  <a id="devices"></a>
  - iPhone X/12/12 pro (Chrome Developer Tools, On physical devices)
  - Galaxy S21 (Chrome Developer Tools, On physical device)
  - iPad (Chrome Developer Tools, On physical devices)
  - iPad Pro (Chrome Developer Tools, BrowserStack)
  - iPad mini (Chrome Developer Tools, BrowserStack)
    (The responsive design is not working as expected on iPad mini series)
  - Galaxy Note 3 (Chrome Developer Tools, BrowserStack)
  - Galaxy S III (Chrome Developer Tools, BrowserStack)
  - Macbook
  - iPad Air




All the links and buttons on the website were checked repeatedly.
The website has been manually tested and evaluated by my mentor "Richard Wells" and I was provided with valuable feedback and ideas.
Friends and acquaintances were asked to review the website, its content, and the user experience overall.
