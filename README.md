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
    * [Data Type](#data-type)
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
            * By completing an order, an email will be sent to the username's email address containing an overview of their order.
            * 'Adjust Bag' button is paced under the payment field to enable users go back and adjust their shopping cart if needed.
        2. Order summary section:
            * In this section, a quick overview of products to be bought, order total, delivery, and grand total will be displayed once again.




![Order Confirmation](/readme-assets/img/order-conf.png)

*   ### Order Confirmation
    * The order confirmation page contains a detailed overview of the order such as order info, product name, selected size/color, the quantity of each item, delivery address, and an overview of billing info.
    * Under the order summary, a 'Back to store' button is placed to navigate users to the product page.


![Registeration Page](/readme-assets/img/sign-up.png)

*   ### Registeration Page
    * A user who has not register on the website can create a new account using the register page. The page on this form includes a username (which must be unique), email address, password and password conformation fields.



![Login Page](/readme-assets/img/sign-in.png)

*   ### Login Page
    * A user who has already registered on the website can login throught this page and have access to their profile page.
    * Validation for this form is handled in the back end and relevant feedback is sent to the user when they sign in.
    * If the user has forgotten their password, they can recover their password by clicking on the 'Forgot password' link and then they will be navigated to a page where they can set a new password for their account.
    * All the authentication processes throughout this website are handled in the backend using allauth django.



![Log out Page](/readme-assets/img/sign-out-page.png)

*   ### Logout Page
    * Any user who clicks on "Log out" from the navigation bar is automatically logged out and their session data cleared. They are taken to a page that informs them that they have been logged out and provides a link to log back in if they wish.


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




## Information Architecture <a id="data-info"></a>

### Database Choice <a id="db"></a>



### Data Storage Types <a id="data-type"></a>
* The types of data stored in the database are:
    * ObjectId
    * String
    * Boolean
    * DateTime

### Collections JSON format <a id="json-format"></a>


## Technologies Used <a id="tech"></a>
### Languages <a id="langs"></a>
- HTML5
- CSS
- JavaScript
- Python3
- Dockerfile

### IDE <a id="ide"></a>
- VScode

### Frameworks, Libraries, CDN's, resources: <a id="libs"></a>


1. [Materialize]()
- This was used for the main layout, forms, alerts and other elements.

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

17. [draw.io](https://app.diagrams.net/)
- This was used to create the flowchart for register and login functions.

18. [Mongodb](https://cloud.mongodb.com/)
- Mongodb Atlas was used as a cloud database in this project.

19. [PyMongo](https://pymongo.readthedocs.io/en/stable/)
- This was used to make communication between Python and MongoDB possible.

20. [Flask](https://pymongo.readthedocs.io/en/stable/)
- This was used to construct and render pages.

21. [Jinja](https://jinja.palletsprojects.com/en/3.0.x/)
- This was used to simplify displaying data from the backend of this project smoothly and effectively in html.

22. [Wtforms](https://wtforms.readthedocs.io/en/2.3.x/)
- This was used to construct forms in this project.

23. [Werkzeug](https://werkzeug.palletsprojects.com/en/2.0.x/)
- This was used to generate and check hashing passwords in the sign In/Up functions.

24. [Heroku](https://dashboard.heroku.com/login)
- This was used as the deployment platform.

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

`$ git clone https://github.com/Yasi92/read-and-recommend.git`

### How to run this project locally

To run this project on your own IDE follow the instructions below:
Ensure you have the following tools and packages installed on your machine:

 - An IDE such as [Visual Studio Code](https://code.visualstudio.com/)
 - PIP
 - Python3
 - Git
 - An account at MongoDB Atlas or MongoDB.


#### Instructions
1. Clone the repository with the following command.
`$ git clone https://github.com/Yasi92/Happy-Pet.git`
2. cd to the correct repository location.
3. If needed, Upgrade pip locally with
`pip install --upgrade pip`
4. Install all required modules with the command
`pip -r requirements.txt`
5. In your local IDE create a file called .env.py
6. Inside the .env.py file, create a SECRET_KEY variable and a MONGO_URI to link to your own database.
**Note** that the data in the .env.py are confidential and as a result it won't be provided here.
7. You can now run the application with the command
`python app.py`

### Heroku Deployement <a id="heroku"></a>
1. Create a requirements.txt file using the terminal command `pip freeze > requirements.txt.`
2. Create a Procfile with the terminal command `echo web: python app.py > Procfile.`
3. git add and git commit the new requirements and Procfile and then git push the project to GitHub.
4. Create a new app on the Heroku website by clicking the "New" button in your dashboard. Give it a name and set the region to Europe.
5. From the heroku dashboard of your newly created application, click on "Deploy" > "Deployment method" and select GitHub.
6. Confirm the linking of the heroku app to the correct GitHub repository.
7. In the heroku dashboard for the application, click on "Settings" > "Reveal Config Vars".
8. Set the following config vars:

| Key | Value |
| ----------- | ----------- |
| IP | 0.0.0.0 |
|  |  |
| PORT | 8000 |
| SECRET_KEY | 	<your_secret_key> |

9. In the heroku dashboard, click "Deploy".
10. In the "Manual Deployment" section of this page, made sure the master branch is selected and then click "Deploy Branch".
11. The site is now successfully deployed.

## Credits <a id="credits"></a>
### Content <a id="content"></a>

### Media <a id="media"></a>
The heading image in the website is taken from:
- [Pinterest](https://nl.pinterest.com/)

### Code <a id="code"></a>
- The template and functions for 404 and 500 pages were provided by my mentor **Richard Wells**.
- Styling active element menu in flask has been learned from [here](https://stackoverflow.com/questions/22173041/styling-active-element-menu-in-flask)
- The dynamic copyright year is learned form [here](https://stackoverflow.com/questions/43714006/how-can-one-create-a-dynamic-copyright-date-without-document-write-in-javascri)
- The back to top button is learned from this thread on stackoverflow [here](https://stackoverflow.com/questions/14249998/jquery-back-to-top)

## Acknowledgements <a id="ackn"></a>

- Special thanks to my mentor **Richard Wells** for his constant valuable feedback and ideas throughout the project.
- Tutors at Code Institute for their continued support.
- Code Institute's Slack community was a great help every step of the way during the project.
- Stack Overflow.
- My mentor Richard Wells.
- I have learned more in detail about how to complete my README from **Anna Gilhespy**'s project, provided in the Code Institute's Slack community as a README template.


## Disclaimer <a id="disc"></a>
The content of this website is educational purposes only.
