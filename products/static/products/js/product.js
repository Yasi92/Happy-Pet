$(document).ready(function () {

    // Makes the entire list section clickable
    $(".list-group-item").click(function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });

    $(".current-category").click(function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });

    // This sort selector is learned from boutique ado project
    $('#sort-selector').change(function () {
        var selector = $(this);
        var currentUrl = new URL(window.location);

        var selectedVal = selector.val();
        if (selectedVal != "reset") {
            var sort = selectedVal.split("_")[0];
            var direction = selectedVal.split("_")[1];

            currentUrl.searchParams.set("sort", sort);
            currentUrl.searchParams.set("direction", direction);

            window.location.replace(currentUrl);
        } else {
            currentUrl.searchParams.delete("sort");
            currentUrl.searchParams.delete("direction");

            window.location.replace(currentUrl);
        }
    });



    function simlilarCarousel() {
        /* This carousel is borrowed from (https://www.codeply.com/p/jCzaESNi07) */
        var myCarousel = document.querySelector('#myCarousel');
        new bootstrap.Carousel(myCarousel, {
            interval: 2000,
            wrap: true
        });
        var slides = document.querySelectorAll('.sim-carousel .carousel-item');

        slides.forEach((el) => {
            // number of slides per carousel-item
            const minPerSlide = slides.length;
            let next = el.nextElementSibling;
            for (var i = 1; i < minPerSlide; i++) {
                if (!next) {
                    // wrap carousel by using first child
                    next = slides[0]
                }
                let cloneChild = next.cloneNode(true);
                el.appendChild(cloneChild.children[0]);
                next = next.nextElementSibling;
            }
        });
    }

    if ($(window).width() > 767) {
        simlilarCarousel();
    }

});
