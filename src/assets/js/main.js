/* ****************************************
Custom script starts here
**************************************** */

/* Function to standardize all elements height to the highest */
function uniformHeight(elementSelector) {
    var elementHeights = $(elementSelector).map(function () {
        return $(this).height();
    }).get();
    var maxHeight = Math.max.apply(null, elementHeights);

    $(elementSelector).height(maxHeight);
}

/* ****************************************
Expertise Section
**************************************** */
// Define on data change trigger
$('.expertise-nav').on('dataChange', function() {
    // Change expertise content
    $('.content').removeAttr('data-active').hide();
    $('.content:nth-child(' + $('.expertise-nav[data-active]').attr('data-id') + ')').fadeIn(200).attr('data-active', '');
});

/* Button */
$('.expertise-nav').on('mousedown tap', function (e) {
    autoplayStop();
    $('.expertise-nav').removeAttr('data-active');
    $(this).attr('data-active', '');
    $(this).trigger('dataChange');
});

/* Autoplay */
// Set up interval
var autoplay;
function autoplayStop() {
    clearInterval(autoplay);
}
function autoplayStart() {
    clearInterval(autoplay);
    autoplay = setInterval(function (){
        autoplayFunc()
    }, 6000);
}

// Set up autoplay function
function autoplayFunc() {
    var nextID = $('.expertise-nav[data-active]').index() + 2;
    $('.expertise-nav').removeAttr('data-active');
    // If exceeds length, loop back to 1
    if (nextID > $('.expertise-nav').length) {
        $('.expertise-nav[data-id="1"]').attr('data-active', '');
        $('.expertise-nav').trigger('dataChange');
    } else {
        $('.expertise-nav[data-id="' + nextID + '"]').attr('data-active', '');
        $('.expertise-nav').trigger('dataChange');
    }
}
autoplayStart();

/* ****************************************
Testimonial Section
**************************************** */

var currCard = 0;
// Scroll container to initial card width
function slideCard() {
    $('.testimonial-container').animate({
        scrollLeft: currCard * $('.testimonial').outerWidth()
    }, 500);
}

/* Control Buttons */
$('#next').on('mousedown tap', function (e) {
    currCard++;
    if (currCard == $('.testimonial-container .card').length - 1) {
        currCard = 0;
    }
    slideCard();
});

$('#prev').on('mousedown tap', function (e) {
    currCard--;
    if (currCard < 0) {
        currCard = $('.testimonial-container .card').length - 2;
    }
    slideCard();
});