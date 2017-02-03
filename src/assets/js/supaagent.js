/* ****************************************
SupaAgent
**************************************** */

/***** Case Studies: START *****/

/***** Case Studies: END *****/


/***** Project Flow: START *****/



/***** Project Flow: END *****/

/***** Initialize on Load: START *****/


$(function () {
    if ($('body').is('.supaagent-page')) {
        // $(window).on('beforeunload', function () {
        //     $(window).scrollTop(0);
        // });

        var triggered = false;
        $(window).scroll(function () {
            var hT = $('.benefits-section').offset().top,
                wS = $(this).scrollTop();
            if (wS > hT && !triggered) {
                $('#sa-female1-frame').css('position', 'absolute').prependTo('.benefits-section');
                $('#sa-female1-before').fadeOut(500);
                $('#sa-female1-after').fadeIn(500);
                $('#sa-male').fadeIn(500);
                triggered = true;
            }
        });

        var triggered2 = false;
        $(window).scroll(function () {
            var hT = $('.tasks-section').offset().top,
                wS = $(this).scrollTop();
            if (wS > hT && !triggered2) {
                $('#sa-male-frame').fadeOut(500);
                $('#new-accesscard').css('display', 'flex').hide().fadeIn(500, function () {
                    $(this).animate({
                        top: '0'
                    }, 500);
                });
                triggered2 = true;
            }
        });

        // var triggered3 = false;
        // $(window).scroll(function () {
        //     var hT = $('.demography-section').offset().top,
        //         wS = $(this).scrollTop();
        //     if (wS > hT && !triggered3) {
        //         $('.demography-section #sa-female2-frame').css('position', 'fixed');
        //         triggered3 = true;
        //     }
        // });

        $(".scene-background").slick({
            slide: '.scene-bg',
            dots: false,
            appendDots: '.dots-container.testimonial-dots',
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<svg id="prev-arrow"><use xlink:href="#icon-angle-left" /></svg>',
            nextArrow: '<svg id="next-arrow"><use xlink:href="#icon-angle-right" /></svg>',
            asNavFor: '.scene-foreground'
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
});

/***** Initialize on Load: END *****/