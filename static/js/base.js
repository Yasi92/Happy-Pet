// back to top button
// learned from (https://stackoverflow.com/questions/14249998/jquery-back-to-top)
if ($(window).scrollTop() < 800) {
    $('.btt-button').hide();
}

$(window).on("scroll", function () {
    if ($(this).scrollTop() > 800) {
        $('.btt-button').fadeIn();
    } else {
        $('.btt-button').fadeOut();
    }
});

$('.btt-link').click(function (e) {
    $("html, body").animate({
        scrollTop: 0
    }, 1000);
})


/* The method has been learned from this tutorial (https://www.youtube.com/watch?v=US_3XvufMLU) and
manipulated by me to make it responsive to all screen sizes.*/

/* Get the height of header and footer on different screen size to push
  the footer to the bottom of the page regardless of the size of content.*/
setInterval(function () {
    var header = document.querySelector("header").offsetHeight;
    var footer = document.querySelector("footer").offsetHeight;
    document.getElementById("main").style.minHeight = "calc( 100vh - " + header + "px" + " - " + footer + "px )";

    document.getElementById("myBtn").style.bottom = footer + "px";

}, 100);


// initialize bootsraap toast
// Initializing bootstraap 5 is taken from CI slack community.
let toastElList = [].slice.call(document.querySelectorAll('.toast'))
let toastList = toastElList.map(function (toastEl) {
    let option = {
        animation: true,
        autohide: false,
        delay: 5000,
    }
    let bsToast = new bootstrap.Toast(toastEl, option)
    bsToast.show();
})


// Gets the year we are in, to display in the footer
var date = new Date().getFullYear();
document.getElementById("year").innerHTML = date;
