/* ****************************************
Business
**************************************** */

/***** Case Studies: START *****/

// Define additional functions for tabbedContent
function caseStudies() {
    // Change case title
    $('.title-container .title h5').text($('.task-types .nav[data-active]').text());
    if ($(window).outerWidth() < 1024) {
        $('.task-types .caret').css({
            'top': 'auto',
            'bottom': '-5px',
            'right': 'auto'
        });
        var leftVal = ($('.task-types .nav[data-active]').attr('data-id') * 25) - 12.5;
        $('.task-types .caret').css('left', leftVal + '%');
    } else {
        $('.task-types .caret').css({
            'bottom': 'auto',
            'left': 'auto',
            'right': '0'
        });
        $('.task-types .caret').css('top', $('.task-types .nav[data-active]').position().top);
    };
    $('.graphic-container .graphic').removeAttr('data-active').hide();
    $('.graphic-container .graphic' + ':nth-child(' + $('.nav[data-active]').attr('data-id') + ')')
        .fadeIn(300)
        .attr('data-active', '');
}

/***** Case Studies: END *****/


/***** Project Flow: START *****/

function projectFlow() {
    // Graphic slider
    $(".pf-graphic-container").slick({
        slide: '.pf-graphic',
        dots: false,
        appendDots: '.dots-container.pf-dots',
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.pf-desc-container',
        prevArrow: '<svg id="prev-arrow"><use xlink:href="#icon-angle-left" /></svg>',
        nextArrow: '<svg id="next-arrow"><use xlink:href="#icon-angle-right" /></svg>',
        responsive: [{
            breakpoint: 640,
            settings: {
                arrows: false,
                dots: true
            }
        }]
    });

    // Description change
    $(".pf-desc-container").slick({
        slide: '.description',
        dots: false,
        arrows: false,
        infinite: true,
        draggable: false,
        swipe: false,
        fade: true,
        speed: 300,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.pf-graphic-container'
    });

    // Timeline
    var flowWidth = [3.574, 15.933, 40.082, 51.838, 63.895, 75.802, 100];
    var fill = $('.pf-timeline .fill img');

    $(".pf-graphic-container").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        fill.css('-webkit-clip-path', 'polygon(0% 0%, ' + flowWidth[nextSlide] + '% 0%, ' + flowWidth[nextSlide] + '% 100%, 0% 100%)');
    });
    // // Event handler for mobile
    $('.pf-graphic-container').on('afterChange', function (event, slick, currentSlide) {
        fill.css('-webkit-clip-path', 'polygon(0% 0%, ' + flowWidth[currentSlide] + '% 0%, ' + flowWidth[currentSlide] + '% 100%, 0% 100%)');
    });
}

/***** Project Flow: END *****/

/***** Initialize on Load: START *****/

$(function () {
    if ($('body').is('.business-page')) {
        // Case studies tabbed content & autoplay
        tabbedContent('.nav', '.case', caseStudies);
        // Project flow slick slider
        projectFlow();
        // Testimonial
        testimonial();
    }
});

/***** Initialize on Load: END *****/