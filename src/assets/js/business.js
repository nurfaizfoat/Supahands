/* ****************************************
Business
**************************************** */

/***** Case Studies: START *****/

// Define additional functions for tabbedContent
function caseStudies() {
    // Change case title
    $('.title-container .title h5').text($('.task-types .nav[data-active]').text());
    $('.task-types .caret').animate({
        top: $('.task-types .nav[data-active]').position().top
    }, 300);
    $('.graphic-container .graphic').removeAttr('data-active').hide();
    $('.graphic-container .graphic' + ':nth-child(' + $('.nav[data-active]').attr('data-id') + ')')
        .fadeIn(300)
        .attr('data-active', '');
}

/***** Case Studies: END *****/


/***** Project Flow: START *****/

function projectFlow() {
    // Set handler function
    function handleChange() {
        var $slides = $('.orbit-slide');
        var $activeSlide = $slides.filter('.is-active');
        var $activeIndex = $slides.index($activeSlide);
        var $desc = $('.text-container .description');
        var width = ['3.8%', '16%', '40.3%', '52%', '64.1%', '76%', '100%'];

        $('.flowline-container .fill').css('width', width[$activeIndex]);
        $desc.filter('[data-active]').fadeOut(300);
        $desc.promise().done(function () {
            $desc.removeAttr('data-active').hide();
            $desc.eq($activeIndex).fadeIn(300).attr('data-active', '');
        })
    }

    $('[data-orbit]').on('slidechange.zf.orbit', handleChange);
}

/***** Project Flow: END *****/

/***** Initialize on Load: START *****/

$(function () {
    if ($('body').is('.business-page')) {
        // Case studies tabbed content & autoplay
        tabbedContent('.nav', '.case', caseStudies);
        projectFlow();
    }
});

/***** Initialize on Load: END *****/