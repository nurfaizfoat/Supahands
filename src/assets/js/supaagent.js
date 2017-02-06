/* ****************************************
SupaAgent
**************************************** */

/***** Scroll Trigger: START *****/

function scrollTrigger(sectionClass, addHeight, customFunc) {
    var triggered = false;
    $(window).scroll(function () {
        var hT = $(sectionClass).offset().top + addHeight,
            wS = $(this).scrollTop();
        if (wS > hT && !triggered) {
            customFunc();
            triggered = true;
        }
    });
}

/***** Scroll Trigger: END *****/


/***** Demography Slider: START *****/

function demographySlider() {
    $(".scene-background").slick({
        slide: '.scene-bg',
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<svg id="prev-arrow"><use xlink:href="#icon-angle-left" /></svg>',
        nextArrow: '<svg id="next-arrow"><use xlink:href="#icon-angle-right" /></svg>',
        asNavFor: '.scene-foreground',
        responsive: [{
            breakpoint: 640,
            settings: {
                arrows: false,
                dots: true,
                appendDots: '.dots-container.demography-dots',
            }
        }]
    });

    $(".scene-foreground").slick({
        slide: '.scene-fg',
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<svg id="prev-arrow"><use xlink:href="#icon-angle-left" /></svg>',
        nextArrow: '<svg id="next-arrow"><use xlink:href="#icon-angle-right" /></svg>',
        asNavFor: '.scene-background'
    });
}

/***** Demography Slider: END *****/


/***** ScrollNav: START *****/

function scrollNav() {
    var sections = [
        ['.header-section', 0],
        ['.benefits-section', 5],
        ['.role-section', 100],
        ['.tasks-section', 5],
        ['.demography-section', 0],
        ['.cta-section', 50]
    ];

    $('.scrollnav-button').on('mousedown tap', function (e) {
        var currIndex = $(this).index();
        $('.scrollnav-button').removeAttr('data-active');
        $(this).attr('data-active', '');
        $('html, body').animate({
            scrollTop: $(sections[currIndex][0]).offset().top + sections[currIndex][1]
        }, 500);
    });
}

/***** ScrollNav: END *****/


/***** Initialize on Load: START *****/

$(function () {
    if ($('body').is('.supaagent-page')) {

        // Reset scroll position when page is reloaded
        $(window).on('beforeunload', function () {
            $(window).scrollTop(0);
        });

        // Header-to-Benefit Trigger
        // If screen is large up
        if ($('.show-for-large').is(':visible')) {
            scrollTrigger('.benefits-section', null, function () {
                $('#sa-female1-frame').css('position', 'absolute').prependTo('.benefits-section');
                $('#sa-female1-before').fadeOut(500);
                $('#sa-female1-after').fadeIn(500);
                $('#sa-male').fadeIn(500);
            });
        }
        // If screen is medium down
        else {
            scrollTrigger('.benefits-section', 320, function () {
                $('#sa-female1-frame').css('position', 'absolute').css('bottom', '75px').prependTo('.benefits-section');
                $('#sa-female1-before').fadeOut(500);
                $('#sa-female1-after').fadeIn(500);
                $('#sa-male').fadeIn(500);
            });
        }

        // Role-to-Tasks Trigger
        // If screen is large up
        if ($('.show-for-large').is(':visible')) {
            scrollTrigger('.tasks-section', null, function () {
                $('#sa-male-frame').fadeOut(500);
                $('#new-accesscard').css('display', 'flex').hide().fadeIn(500, function () {
                    $(this).animate({
                        top: '0'
                    }, 500);
                    $('#new-accesscard .button.secondary').fadeIn(500);
                });
            });
        }
        // If screen is medium down
        else {
            scrollTrigger('.tasks-section', -150, function () {
                $('#sa-male-frame').fadeOut(500);
                $('#new-accesscard').css('display', 'flex').hide().fadeIn(500, function () {
                    $(this).animate({
                        top: '0'
                    }, 500);
                    $('#new-accesscard .button.secondary').fadeIn(500);
                });
            });
        }

        // Demography Trigger
        // If screen is large up
        if ($('.show-for-large').is(':visible')) {
            scrollTrigger('.demography-section', 60, function () {
                $('#sa-female2-frame').css('position', 'fixed').appendTo('.avatar-container');
            });
        }
        // If screen is medium down
        else {
            scrollTrigger('.demography-section', -150, function () {
                $('#sa-female2-frame').css('position', 'fixed').appendTo('.avatar-container');
            });
        }

        // CTA Avatar
        // If screen is large up
        if ($('.show-for-large').is(':visible')) {
            scrollTrigger('.cta-section', 40, function () {
                $('#sa-female2-frame').css('position', 'absolute').css('margin-top', '40px').prependTo('.cta-section');
                $('#sa-female2-before').fadeOut(500);
                $('#sa-female2-after').fadeIn(500);
            });
        }
        // If screen is medium down
        else {
            scrollTrigger('.cta-section', -190, function () {
                $('#sa-female2-frame').css('position', 'absolute').css('margin-top', '40px').prependTo('.cta-section');
                $('#sa-female2-before').fadeOut(500);
                $('#sa-female2-after').fadeIn(500);
            });
        }

        // Demography Slider
        demographySlider();

        // ScrollNav
        scrollNav();
    }
});

/***** Initialize on Load: END *****/