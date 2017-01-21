/* ****************************************
Index
**************************************** */

/***** Before & After: START  *****/

function drags(dragElement, resizeElement, container) {
    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function (e) {
        dragElement.addClass('ba-draggable');
        resizeElement.addClass('ba-resizable');

        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();

        // Set limits
        minLeft = $('.ba-limit').offset().left - 10;
        maxLeft = $('.ba-limit').offset().left + $('.ba-limit').outerWidth() + 10;

        // Calculate the dragging distance on mousemove.
        dragElement.parents().on("mousemove touchmove", function (e) {

            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
            leftValue = moveX + posX - dragWidth;

            // Prevent going off limits
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            // Translate the handle's left value to masked divs width.
            widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

            // Set the new values for the slider and the handle.
            // Bind mouseup events to stop dragging.
            $('.ba-draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
                $(this).removeClass('ba-draggable');
                resizeElement.removeClass('.ba-resizable');
            });
            $('.ba-resizable').css('width', widthValue);

            // Toggle switch on minLeft & maxLeft
            if ($('.ba-draggable').offset().left <= $('.ba-limit').offset().left - 10) {
                $('.switch-base').removeClass('switch-on');
            } else if ($('.ba-draggable').offset().left >= $('.ba-limit').offset().left + $('.ba-limit').outerWidth()) {
                $('.switch-base').addClass('switch-on');
            }
        }).on('mouseup touchend touchcancel', function () {
            dragElement.removeClass('ba-draggable');
            resizeElement.removeClass('ba-resizable');
        });
        e.preventDefault();
    }).on('mouseup touchend touchcancel', function (e) {
        dragElement.removeClass('ba-draggable');
        resizeElement.removeClass('ba-resizable');
    });
}

/* Switch */
$('.switch-base').on('mousedown tap', function (e) {
    var baOffset = $('.ba-limit').offset().left;
    var handleLeft = $('.handle').offset().left - $('.handle').position().left;
    var minLeft = baOffset - 15 - handleLeft;
    var maxLeft = baOffset + $('.ba-limit').width() + 15 - handleLeft;

    $('.switch-base').toggleClass('switch-on');

    if ($('.switch-base').hasClass('switch-on')) {
        $('.handle').animate({
            left: maxLeft
        });
        $('.resize').animate({
            width: maxLeft + 'px'
        });
    } else {
        $('.handle').animate({
            left: minLeft
        });
        $('.resize').animate({
            width: minLeft + 'px'
        });
    }
});

// Define plugin
$.fn.beforeAfter = function () {
    var cur = this;

    // Adjust the slider
    var width = cur.width() + 'px';
    cur.find('.resize img').css('width', width);

    // Bind dragging events
    drags(cur.find('.handle'), cur.find('.resize'), cur);

    // Update sliders on resize.
    $(window).resize(function () {
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
    });
}

/***** Before & After: END  *****/


/***** Expertise: START *****/

// Make as global function
function tabbedContent(navElement, contentElement, customFunc) {
    // Define on dataChange functions
    function dataChange() {
        // Change expertise content
        $(contentElement).removeAttr('data-active').hide();
        $(contentElement + ':nth-child(' + $(navElement + '[data-active]').attr('data-id') + ')').fadeIn(300).attr('data-active', '');
        if (customFunc) {
            customFunc();
        }
    }

    /* Button */
    $(navElement).on('mousedown tap', function (e) {
        autoplayStop();
        $(navElement).removeAttr('data-active');
        $(this).attr('data-active', '');
        dataChange();
    });

    /* Autoplay */
    // Set up interval
    var autoplay;

    function autoplayStop() {
        clearInterval(autoplay);
    }

    function autoplayStart() {
        autoplay = setInterval(function () {
            autoplayFunc()
        }, 6000);
    }

    // Set up autoplay function
    function autoplayFunc() {
        var nextID = $(navElement + '[data-active]').index() + 2;
        $(navElement).removeAttr('data-active');
        // If exceeds length, loop back to 1
        if (nextID > $(navElement).length) {
            $(navElement + '[data-id="1"]').attr('data-active', '');
        } else {
            $(navElement + '[data-id="' + nextID + '"]').attr('data-active', '');
        }
        dataChange();
    }
    autoplayStart();
}

/***** Expertise: END *****/


/***** Testimonial: START  *****/

function testimonial() {
    $(".testimonial-container").slick({
        slide: '.testimonial',
        dots: false,
        appendDots: '.dots-container.testimonial-dots',
        arrows: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<svg id="prev-arrow"><use xlink:href="#icon-angle-left" /></svg>',
        nextArrow: '<svg id="next-arrow"><use xlink:href="#icon-angle-right" /></svg>',
        responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            }
        }]
    });
}

/***** Testimonial: END  *****/


/***** Equalize Height Function: START  *****/

function equalizeHeight(elementName) {
    function resizeHeight() {
        var heights = $(elementName).map(function () {
                return $(this).height();
            }).get(),
            maxHeight = Math.max.apply(null, heights);
        $(elementName).height(maxHeight);
    }
}

/***** Equalize Height Function: END  *****/


/***** Initialize on Load: START *****/

$(function () {
    if ($('body').is('.index-page')) {
        // Before & After
        $('.ba-slider').beforeAfter();
        // Tabbed content & autoplay
        tabbedContent('.expertise-nav', '.content');
        // Testimonial slider
        testimonial();
    }
});

/***** Initialize on Load: END *****/