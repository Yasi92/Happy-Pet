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

1. As a first-time visitor, I would like to ...


### Wireframe Mockups: <a id="wireframes"></a>      
                   
                          
Home page:                  
[Home page wireframes PDF](static/readme-assets/wireframes/home.pdf)        

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

