function hideshow(which) {
    if (!document.getElementById)
        return
    if (which.style.display == "block")
        which.style.display = "none"
    else
        which.style.display = "block"
}

/**  slider init start */
$(document).ready(function() {

    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });

    $("#mob_v_menu a").click(function(e) {
        e.preventDefault();
        if ($(this).next('ul').length) {
            $(this).next().toggle('slow');
            $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
        }
    });



    var swiper = new Swiper('.swiper-mainbaner', {
        slidesPerView: 1,
        // spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        // loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-paginations',
            clickable: true,
        },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
    });


    var swiper = new Swiper('.slider-application', {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                // spaceBetween: 20,
            },
            // 768: {
            //   slidesPerView: 3,
            //   // spaceBetween: 40,
            // },

        }
    });

    var swiper = new Swiper('.slider-joinee', {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var swiper = new Swiper('.image-gallary', {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var swiper = new Swiper('.swiper-tips', {
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

/**  slider init start */




/**  Search box */

$(document).ready(function() {

    $('#aniimated-thumbnials').lightGallery({
        selector: '.item',
        thumbnail:false,
        animateThumb: true,
        showThumbByDefault: true,
        download: false,
        actualSize: false
    }); 


    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function() {
        if (isOpen == false) {
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('searchbox-open');
            inputBox.focusout();
            isOpen = false;
        }
    });
    submitIcon.mouseup(function() {
        return false;
    });
    searchBox.mouseup(function() {
        return false;
    });
    $(document).mouseup(function() {
        if (isOpen == true) {
            $('.searchbox-icon').css('display', 'block');
            submitIcon.click();
        }
    });

});

/**  Search box */




/**  swiper with counter starts */


/**  swiper with counter ends */





/**  Gadge init start */

$(document).ready(function() {

    if ($(".gauge").length) {
        loadGauge(1, 80, '#71d701');
        loadGauge(2, 20, '#b84046');
        loadGauge(3, 50, '#fce633');
        loadGauge(4, 80, '#71d701');

        function loadGauge(thisGauge, subtypeval, strkcolor) {
            var opts = {
                lines: 5, // The number of lines to draw
                angle: 0, // The span of the gauge arc
                lineWidth: 0.46, // The line thickness
                pointer: {
                    length: 0.68, // The radius of the inner circle
                    strokeWidth: 0.035, // The thickness
                    color: '#a6a6a6' // Fill color
                },
                limitMax: false, // If true, the pointer will not go past the end of the gauge
                colorStart: strkcolor, // Colors
                colorStop: strkcolor, // just experiment with them
                strokeColor: strkcolor,
                // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true // High resolution support
            };
            var target = document.getElementById('canvas-preview' + thisGauge); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create gauge!
            gauge.maxValue = document.getElementById('maxVal').textContent; // set max gauge value
            gauge.animationSpeed = 28; // set animation speed (32 is default value)
            gauge.set(subtypeval);
            if (subtypeval > 50) {
                $(".spansubtype" + thisGauge).text("High");
            } else if (subtypeval < 50) {
                $(".spansubtype" + thisGauge).text("Low");
            } else {
                $(".spansubtype" + thisGauge).text("Medium");
            }
        }
    }
});

/**  Gadge init ends */





/***  BOTTOM SCROLL TOP BUTTON ******/
$(document).ready(function() {


    var scrollTop = $(".scrollTop");

    $(window).scroll(function() {
        // declare variable
        var topPos = $(this).scrollTop();

        // if user scrolls down - show scroll to top button
        if (topPos > 100) {
            $(scrollTop).css("opacity", "1");

        } else {
            $(scrollTop).css("opacity", "0");
        }

    });

    //Click event to scroll to top
    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    });


});