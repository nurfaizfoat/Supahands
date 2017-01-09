(function ($) {
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

  // Switch
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

}(jQuery));

$('.ba-slider').beforeAfter();

// Switch