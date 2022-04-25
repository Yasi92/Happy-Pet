# Happy Pet - Testing in detils

[The Website In Action](https://happy-pet.herokuapp.com/)
[Main README.md file](README.md)


## Automated Testing
### Validation Services
The following validation services and linter were used to check the validity of the website code.

- [HTML Validation](https://validator.w3.org/)
was used to validate all the HTML files.
  * **Important Note** on the pages with the jinja template, the W3c validator throws many errors in regards to the syntax and variable names inserted by the jinja template.
  To get around this issue all the html files were validates by manually direct input of each file. The files were extracted from the 'view page source' on the browser.
- All the files has been validated and all essential errors were fixed.


![CSS validation report](/readme-assets/img/css_validation.png)
- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) was used to validate the code in my style.css file.
- The website has been tested with the Lighthouse for each page separately and on both desktop and mobile devices and, required actions have been taken to improve the functionality of the website as much as possible.
- Lighthouse was also used to check the overall performance of the website and as a way to improve the website performance.
**Note** Due to time constraints, not all the required actions were taken to improve the performance and speed of the site.
For instance, since images across this project have all been downloaded from different platforms with different sizes, the required action to resize all the images in a proper ratio is time-consuming, and as mentioned before due to time constraints for this project it has been disregarded.


[JSHint](https://jshint.com/)  was used to validate javascript.
- All the errors and warnings from JSHint such as missing semicolons and unused variables have been fixed properly.

| Bugs | Solutions |
| ---------- | --------- |
| While pushing to the Github at the first stage of the project, the DATABASE credentials such as my database password and my Django secret key has been unintentionally pushed to my remote repository. | To fix this issue, I cleaned my settings.py and all its content from the previous commit histories using the 'BFG' repo-cleaner  |
| Since the min-height of my main section across all templates is set by javascript calculating it based on the header and footer size, Once the navbar is collapsed on mobile and iPad devices the footer would jump up to the middle of the page. | As a quick fix for this issue, the footer is set fixed at the bottom of the screen on medium and down devices. This is not the perfect solution for this issue however as this issue was known at a late stage of the project it has been preferred to be temporarily fixed this way. |


[Python extension for Visual Studio Code ](https://code.visualstudio.com/docs/languages/python)   was used to validate Python.
[Flake8](https://flake8.pycqa.org/en/latest/)   was used to fix linting issue and to checke my code base against coding style PEP8.
* To check this you can run the following command in your terminal:
    ` python3 -m flake8 `




### Python Testing
#### How to run Python tests
To run the existing Python tests:
    1. After running the project locally in your IDE run the following command:
    ` python3 manage.py test `
    2. If you wish to run the tests within a specific app only you can specify with:
    ` python3 manage.py test <app name here> `
    3. The test results will be shown within the terminal.

### Covarage
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


| Known Issues | Causes |
| ----------- | ----------- |



## Client stories testing:

The potential common paths through the website:

Each of these possible paths has been tested repeatedly.


### Testing client stories from UX section of [README.md](README.md)

1. As a first-time visitor, I would like to





## Manual (logical) testing of all elements and functionality on every page.

###  Navigation Bar


### Home page




### Profile Page
-




###  Sticky back-to-top button
- Verify that the button shows up in the right position on every page.
- Click on the button to confirm that the button works.
- Open the page in the "Developer Tool", choose a mobile device and ensure that the size and spacing of the button change properly.
- Click on the button and make sure that the animation effect works properly and the page scrolls to the top smoothly.


### Footer

### Custom 404 Page
- Try to change the pathname in the URL manually to a random name and make sure that the custom 404 page appears on the screen informing you that the page is not found.
- Click on the "Let's Go Home" button and make sure it returns you to the home page.
- **Note** that this is something that you can examine only on production and not on your development environment when the debuuger is set to True.

## Further Testing
I have tested the live website on the following browsers and devices with [BrowserStack](https://live.browserstack.com/)

- Google Chrome
- Safari
- Firefox
- IE
- Edge
- Opera

### Devices
  - iPhone X/12/12 pro (Chrome Developer Tools, On physical devices)
  - Galaxy S21 (Chrome Developer Tools, On physical device)
  - iPad (Chrome Developer Tools, On physical devices)
  - iPad Pro (Chrome Developer Tools, BrowserStack)
  - iPad mini (Chrome Developer Tools, BrowserStack)
  - Galaxy Note 3 (Chrome Developer Tools, BrowserStack)
  - Galaxy S III (Chrome Developer Tools, BrowserStack)
  - Macbook

| Browser | Issues |
| ----------- | ----------- |
| Google Chrome | - |
| Safari | No issues found |
| Firefox | No issues found |
| IE |  |
| Edge |  |
| Opera |  |


- All the links and buttons on the website were checked repeatedly.
- The website has been manually tested and evaluated by my mentor "Richard Wells" and I was provided with valuable feedback and ideas.
- Friends and acquaintances were asked to review the website, its content, and the user experience overall.
