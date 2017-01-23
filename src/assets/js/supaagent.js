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

        var fired = false;
        $(window).scroll(function () {
            var hT = $('#sa-benefits').offset().top,
                wS = $(this).scrollTop();
            if (wS > hT && !fired) {
                $('#sa-female1-frame').css('position', 'absolute').prependTo('#sa-benefits');
                $('#sa-female1-before').fadeOut(500);
                $('#sa-female1-after').fadeIn(500);
                $('#sa-male').fadeIn(500);
            }
        });

        $('.scene-foreground').slick({
            slide: '.illustration',
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
});

/***** Initialize on Load: END *****/