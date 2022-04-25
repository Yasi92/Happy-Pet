# Happy Pet - Testing in detils

[The Website In Action](https://happy-pet.herokuapp.com/)
[Main README.md file](README.md)

## Html, CSS, Javascript Validation

- [HTML Validation](https://validator.w3.org/)
was used to validate all the HTML files.
  * **Important Note** on the pages with the jinja template, the W3c validator throws many errors in regards to the syntax and variable names inserted by the jinja template.
  To get around this issue all the html files were validates by manually direct input of each file. The files were extracted from the 'view page source' on the browser.
- All the files has been validated and all essential errors were fixed.

- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) was used to validate the code in my style.css file.
- The website has been tested with the Lighthouse for each page separately and on both desktop and mobile devices and, required actions have been taken to improve the functionality of the website as much as possible.
- Lighthouse was also used to check the overall performance of the website and as a way to improve the website performance.
**Note** Due to time constraints, not all the required actions were taken to improve the performance and speed of the site.
For instance, since images across this project have all been downloaded from different platforms with different sizes, the required action to resize all the images in a proper ratio is time-consuming, and as mentioned before due to time constraints for this project it has been disregarded.


| Bugs | Solutions |
| While pushing to the Github at the first stage of the project, the DATABASE credentials such as my database password and my Django secret key has been unintentionally pushed to my remote repository. | To fix this issue, I cleaned my settings.py and all its content from the previous commit histories using the 'BFG' repo-cleaner  |
| Since the min-height of my main section across all templates is set by javascript calculating it based on the header and footer size, Once the navbar is collapsed on mobile and iPad devices the footer would jump up to the middle of the page. | As a quick fix for this issue, the footer is set fixed at the bottom of the screen on medium and down devices. This is not the perfect solution for this issue however as this issue was known at a late stage of the project it has been preferred to be temporarily fixed this way. |



| Known Issues | Causes |
| ----------- | ----------- |



## Client stories testing:

The potential common paths through the website:

- Home > Sign-Up
- Home > Sign-In
- Home > Book
- Home > Profile
- Book > Shopping Link
- Profile > Edit Profile
- Profile > Edit Book
- Profile > Add a Book


Each of these possible paths has been tested repeatedly.
### Testing client stories from UX section of [README.md](README.md)

1. As a first-time visitor, I would like to





## Manual (logical) testing of all elements and functionality on every page.

###  Navigation Bar
- Click on every single link on the navigation bar to assure they are all properly wired up.
- Check the page URL and make sure it shows the right pathname. (http://read-and-recommend.herokuapp.com/get_books)
- Check the accessibility to the links that are supposed to be visible on the two different states of logged In/Out.
- Hover over every single link to make sure they have the proper style.
- Click on the links and make sure the active style is applied to them until another link is clicked.
- Change the screen size from desktop to tablet to verify that the navigation bar is responsive and switches from the inline menu to the burger icon dropdown menu at the appropriate place.
- Click on the burger icon to make sure the menu opens from the right side of the screen.
- Check the search box size and function on the home page.
- Type a book title that is known it exists and make sure it will be displayed.
- Type an author name and make sure it displays all the books from that author.
- Type a title or an author name that exists in the database and make sure the "No Results found" text displays on the screen.
- Click on the reset button and make sure it resets the searches and displays all books.

### Home page
- Click on every collection bar link and make sure they display the books from the right category.
- Check the page URL and make sure it shows the right path name as expected. (http://read-and-recommend.herokuapp.com/get_books/get_categories/history)
- Make sure the active style is applied to the links on click.
- Resize the window size and make sure that the links have proper position and padding on the iPad and mobile screen.
- Scroll down the page and check the layout of the book cards on the home page.
- Click on the book cards and make sure they navigate to the corresponding book detail page.
- Hover over the book cards and make sure they have the applied style.
- Resize the window in the iPad and mobile screen size to make sure all sections are responsive and the layout changes on different screen sizes.


### Book Detail page
-

### Edit Book Page
-

### Profile Page
-




### Edit Profile Page
-


### Add a Book Page
-
### Sign In page
-

### Sign Up page
-


###  Sticky back-to-top button
- Verify that the button shows up in the right position on every page.
- Click on the button to confirm that the button works.
- Open the page in the "Developer Tool", choose a mobile device and ensure that the size and spacing of the button change properly.
- Click on the button and make sure that the animation effect works properly and the page scrolls to the top smoothly.


### Footer
- Confirm that footer code is identical on all HTML pages.
- Try to log in and check the footer on every single page to make sure that the links embedded in the footer updates accordingly.
- Try to log out and check the quick access links in the footer alters according to the navigation bar links on different pages.
- Resize the window in the iPad and mobile screen size to make sure all sections are responsive and the layout changes on different screen sizes.
- From the home page, check if all the book collection links are accessible from the footer as well, and check every link separately.

### Custom 404 Page
- Try to change the pathname in the URL manually to a random name and make sure that the custom 404 page appears on the screen informing you that the page is not found.
- Click on the "Let's Go Home" button and make sure it returns you to the home page.
- **Note** that this is something that you can examine only if the Debugger is False in your flask app.

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
| Google Chrome | The window.history(-1) does not always return to the same scroll position. |
| Safari | No issues found |
| Firefox | No issues found |
| IE | The javascript does not run on IE 10 and earlier versions and as a result, the application does not run properly. |
| Edge | The window.history(-1) does not always return to the same scroll position. |
| Opera | The window.history(-1) does not always return to the same scroll position. |


- All the links and buttons on the website were checked repeatedly.
- The website has been manually tested and evaluated by my mentor "Richard Wells" and I was provided with valuable feedback and ideas.
- Friends and acquaintances were asked to review the website, its content, and the user experience overall.
