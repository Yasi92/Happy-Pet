# Maryam Abdolbeigi

## Happy Pet
![Responsive Design]()       
[The Website In Action]()

This is a webshop for pets.
The purpose of this website is educational only.        

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

- The website sells products and make profits of it.
- The delivery of orders will be free for orders above 30€. 

###  The customer objectives of this website are:

- Users can make orders with free delivery of orders above 30 €.
- Users can have a personal account on the website to keep track of their orders.


### The Ideal customer for this website:
- Has a pet.
- Speaks English.

### User Stories: <a id="user-stories"></a>

1. As a first-time visitor, I would like to find a worth reading book.
2. As a first-time visitor, I would like to find out more about my favorite book and read other readers' reviews.
3. As a first-time visitor, I would like to become a member of the community to be able to add my favorite book to the website.
4. As a returning visitor, I would like to edit my profile and info.
5. As a returning visitor, I would like to write a review about a book I have recently read/purchased from the online store.
6. As a returning visitor, I would like to check out all the best seller books on the website and find out more about them.
7. As a returning visitor, I would like to delete a review I left on a book.
8. As a returning visitor, I would like to edit a book I added to the website.
9. As a returning visitor, I would like to Remove a book I added to the website.
10. As a visitor, I would like to filter the books by the category I am looking for.

### Wireframe Mockups: <a id="wireframes"></a>      
                   
                          
Home page:                  
[Home page wireframes PDF](static/readme-assets/wireframes/home.pdf)        

Profile Page:             
[Profile Page wireframes PDF](static/readme-assets/wireframes/profile.pdf)     

Edit Profile Page:            
[Edit Profile wireframes PDF](static/readme-assets/wireframes/edit-profile.pdf) 

sign-In Page:            
[Login Page wireframes PDF](static/readme-assets/wireframes/login.pdf)           

Sign-Up Page:            
[Sign Up Page wireframes PDF](static/readme-assets/wireframes/sign-up.pdf) 

Book Detail Page:            
[Book Detail Page wireframes PDF](static/readme-assets/wireframes/books.pdf) 

Add a Book / Edit Book Page:            
[Add a Book Page wireframes PDF](static/readme-assets/wireframes/add-a-book.pdf) 

### Flowchart: <a id="flowchart"></a>
[Registeration and sign-in flowchart](static/readme-assets/readme-img/Login-sign-up.drawio.png) 
- The register and log In flowchart has been created with [drawio](https://app.diagrams.net/)

## Features <a id="features"></a>

### Existing Features


* ### Design in Depth <a id="des-in-depth"></a>
     * The main colors used for the design are taken from the header image and an effort has been put to keep the colors as relevant as possible.
     ![color theme](static/readme-assets/readme-img/color-theme.png)



     * The font families used in this project are:
          * 'Quicksand' for the body text and other elements.
          * 'Nunito' for the headlines and navigation links.
          *  Sans-serif for the fallback font.


![navigation bar](static/readme-assets/readme-img/navbar.png)
![navigation bar](static/readme-assets/readme-img/expanded-navbar.png)

*   ### Navigation Bar <a id="nav"></a>     
    * Featured on all pages to allow for easy navigation.
    * This section will allow users to easily navigate from page to page across all devices without having to revert back to the previous page via the back button.
    * The navigation bar displays different links such as "Profile", "Add a Book" and "Sign Out" if the user is logged in and, "Sign In" and "Sign Up" if the user has not logged in.
    * The navigation bar collapses from medium screen sizes to a hamburger icon, which unfolds to a navigation drawer when clicked.
    * The search box is embedded in the navigation bar on the home page, where all books are displayed for a quick search by title or author. 


![landing page](static/readme-assets/readme-img/home-pg-out.png)
*  ### Home page provides: <a id="home"></a>
    * A search box in which users can search for their favorite books by title or author.
    * Category collection bar which filters books by their category.
    * Small book cards with image, title, and author name, which on click navigates users to a page with full information of each book.            


![Book Detail](static/readme-assets/readme-img/added-book.png)
*  ### Book Detail Page Provides: <a id="book"></a>
    * A full image of the book cover.
    * Full information of the book such as title, author, publisher, price, pages and, name of the user who added the book.
    * A "Go get it" button that navigates users to the online store in a new tab.
    * A back button that redirects to the previous page.
    * A best seller badge is embedded in the title box if the book falls in the bestseller collection.
    * If the book is added by the user, the "Delete" and "Edit" buttons will be shown underneath the book details to enable the user to delete or edit the added book.
    ![Delete Confirmation Modal](static/readme-assets/readme-img/book-del-conf.png)
    * The "Delete" button opens to a modal for delete confirmation and removes the book from the database if confirmed by the user and returns to the same page with book details if ignored.
    ![Edit Book Form](static/readme-assets/readme-img/edit-book.png)
    * The "Edit" button redirects to the edit book page with a form where all the inputs are pre-filled with the book details and the user is able to make any change to the book and submit it.
    ![Book Description](static/readme-assets/readme-img/book-desc.png)
    * Short description of the book which expands on "Read More" click.
    ![Review Form](static/readme-assets/readme-img/review-form.png)
    * With the review form users can compose a review which will be inserted in the database and displayed in the review section in detail.
    ![Review Section](static/readme-assets/readme-img/review-section.png)
    * Display reviews
    * In this section all corresponding reviews of the book are displayed in a list which is visible in slices of 4 and can be expanded to more reviews by clicking on the "Load More" button.
    * The creation date of the review is shown underneath the review text in a format of time ago. 
    * In case the review is added by the username stored in the session, the delete button will be displayed next to the review which enables users to remove it.



![Profile Page](static/readme-assets/readme-img/landing-profile.png)
*  ### Profile Page provides: <a id="profile"></a>  
    * Users account details such as username, location, and email address.
    * An "Edit Profile" button that navigates to the edit profile page where users can change their profile.
    ![Edit Profile Page](static/readme-assets/readme-img/edit-profile-pg.png)
    * The "Edit Profile" button navigates to a page with a form where the inputs are pre-filled with the users' detail and the user is able to change their profile.
    * If the user enters a username that already exists in the database a message will pop up on the page alerting the user that the username already exists and returns to the page.
    * If the form after validation is successfully updated the user will be navigated to the profile page with the updated data and a message that confirms that the profile is updated.
    * If there is no change in the form, the user will be redirected to the profile page with the existing data.
    * The "Cancel" button works in the same way as if there is no change in the form and it redirects to the profile page with the existing data.
    * An "Add a Book" button that redirects to the add a book page.
    ![Added Books](static/readme-assets/readme-img/added-books.png)
    * In this section, all the books that are added by the user are displayed in a list featured with "Edit" and "Delete" buttons which enables the user to modify the book.
    * The list items are wrapped in a link that navigates to the book detail page.
    ![Added Reviews](static/readme-assets/readme-img/added-reviews.png)
    * In this section, all the reviews composed by the user are displayed in a list featured with a "Delete" button which enables users to remove the review.
    ![Added Reviews](static/readme-assets/readme-img/delete-rev-conf.png)
    * The "Delete" button opens to a modal to confirm the review deletion.


![Add a Book Page](static/readme-assets/readme-img/add-book-pg.png)
*  ### Add a Book Page provides: <a id="add-book"></a>  
    * A form with which users can add a book to the website.
    * There is a label for each input that guides users to the type of the expected information for each field and, the form will not be submitted unless all the fields are validated.
    * In the event that the book title already exists in the database, a message will be shown to the user informing them about the issue.
    * A check box is featured in the form to mark the best seller books.



![Sign Up Page](static/readme-assets/readme-img/sign-up-pg.png)
*  ### Sign-Up Page provides: <a id="sign-up"></a>  
    * A registration form with which users can register and make an account.
    * The form checks if the username already exists in the database and shows a message to the user in that case.
    * The form will not be submitted unless are the fields are validated and correctly filled.
    * After the submission, the user will be navigated to the profile page with their account detail.
    * There is a shortcut link to the login page if the user already has an account.


![Sign In Page](static/readme-assets/readme-img/sign-in-pg.png)
*  ### Sign-In Page provides: <a id="sign-in"></a>  
    * A login form with which users can sign in to their account.
    * In case the username and/if the password is incorrect, a message will be shown to the user informing them about the issue.
    * In this form the account data in the database are checked with the user's input and log into the account if they match. 
    * There is a shortcut link to the sign-up page for users who have not registered yet.


![Custom 404 Page](static/readme-assets/readme-img/404-page.png)
*  ### Custom 404 Page: <a id="404"></a>
    * The custom 404 page prevents users from confusion and redirects them to the home page if the URL is unavailable or does not exist.


![Custom 500 Page](static/readme-assets/readme-img/500-page.png)
*  ### Custom 500 Page: <a id="500"></a>
    * The custom 500 page prevents users from confusion and redirects them to the home page when an error occurs.


![Back To Top Button](static/readme-assets/readme-img/back-to-top-btn.png)
*  ### Back To Top Button: <a id="back-btn"></a> 
    * A back-to-top button is featured on all pages to enable users to jump to the top of the page quickly without the need to scroll all the way up to the page.


![Footer](static/readme-assets/readme-img/footer-base.png)
*  ### Footer: <a id="footer"></a>
    * The footer is identical on all pages and it provides a brief description of the website as well as some quick-access links that differ on every stage of the website.
    ![Expanded Footer](static/readme-assets/readme-img/expanded-footer.png)
    * The footer contains links to all book categories on the home page and excludes them on all other pages.
    ![Logged In Footer](static/readme-assets/readme-img/logged-in-footer.png)
    * The quick access links in the footer alters according to the navigation bar links on different pages.

### Yet to be implemented <a id="yet-to-be-implemented"></a>
   1. Enable users to upload images to the website instead of an image URL.
   2. On Create Account Page, add the ability to see the password that was typed in, to avoid accidental typos.
   3. Enable users to update their passwords.
   4. Enable users to recover their password if it is forgotten.
   


## Information Architecture <a id="data-info"></a>                 

### Database Choice <a id="db"></a>
* My personal preference for the database for this project would be SQL as it would suit this project better however, as one of the requirements for this milestone project was using a relational database as Mongodb, this was chosen as my database.


### Data Storage Types <a id="data-type"></a>
* The types of data stored in the database are:
    * ObjectId
    * String
    * Boolean
    * DateTime 

### Collections JSON format <a id="json-format"></a>
- [Review collection](static/readme-assets/review-example.json)                       
- [User collection](static/readme-assets/user-example.json)                       
- [Book collection](static/readme-assets/book-example.json)                     
- [Category collection](static/readme-assets/category-example.json)               
* The "username" is added to all collections except the category, to match the user who added books and reviews.
* I am aware of the fact that here I could have also gotten this done without creating an additional collection for "category", however, I have decided to do it in this way in order to be able to add extra categories to the collection bar in the future without the need of adding the relevant books first.

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
`$ git clone https://github.com/Yasi92/read-and-recommend.git`
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
| MONGO_URI	 | mongodb+srv://<username>:<password>@<cluster_name>-qtxun.mongodb.net/<database_name>?retryWrites=true&w=majority |
| PORT | 8000 |
| SECRET_KEY | 	<your_secret_key> |

9. In the heroku dashboard, click "Deploy".
10. In the "Manual Deployment" section of this page, made sure the master branch is selected and then click "Deploy Branch".
11. The site is now successfully deployed.

## Credits <a id="credits"></a>
### Content <a id="content"></a>

All the books in this website are taken from [Amazon Book Store](https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks-intl-ship&field-keywords=&ref=nb_sb_noss_1&crid=JQUXS5J7BQOJ&sprefix=biography%2Cstripbooks-intl-ship%2C332)

### Media <a id="media"></a>
The heading image in the website is taken from: 
- [Pinterest](https://nl.pinterest.com/)

### Code <a id="code"></a>
- The template and functions for 404 and 500 pages were provided by my mentor **Richard Wells**.
- Styling active element menu in flask has been learned from [here](https://stackoverflow.com/questions/22173041/styling-active-element-menu-in-flask)
- The dynamic copyright year is learned form [here](https://stackoverflow.com/questions/43714006/how-can-one-create-a-dynamic-copyright-date-without-document-write-in-javascri)
- The "Read More" method on the book description section has been borrowed from [here](https://www.freakyjolly.com/custom-jquery-function-read-more-and-read-less/)
- The back to previouse page button is learned from [here](https://css-tricks.com/snippets/javascript/go-back-button/)
- The load More button and slicing items on the profile page and books.html is learned from [here](https://www.youtube.com/watch?v=XFXDZrjimrY)
- The back to top button is learned from this thread on stackoverflow [here](https://stackoverflow.com/questions/14249998/jquery-back-to-top)
- The hover effect on the links is borrowed from [here](http://ianlunn.github.io/Hover/)
- The fadeIn effect on the book cards is learned from [here](https://stackoverflow.com/questions/54384218/fade-in-effect-for-div-without-id) 
## Acknowledgements <a id="ackn"></a>

- Special thanks to my mentor **Richard Wells** for his constant valuable feedback and ideas throughout the project. 
- Tutors at Code Institute for their continued support.
- Code Institute's Slack community was a great help every step of the way during the project.
- Stack Overflow.
- My mentor Richard Wells.
- I have learned more in detail about how to complete my README from **Anna Gilhespy**'s project, provided in the Code Institute's Slack community as a README template.


## Disclaimer <a id="disc"></a>
The content of this website is educational purposes only.

