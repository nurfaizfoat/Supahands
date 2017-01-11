/* ****************************************
Business
**************************************** */

/***** Case Studies: START *****/

// // Define on data change trigger
// $('.task-types').on('dataChange', function () {
//     // Change expertise content
//     $('.content').removeAttr('data-active').hide();
//     $('.content:nth-child(' + $('.expertise-nav[data-active]').attr('data-id') + ')').fadeIn(200).attr('data-active', '');
// });

// /* Button */
// $('.task-types h5').on('mousedown tap', function (e) {
//     // autoplayStop();
//     $('.task-types h5').removeAttr('data-active');
//     $(this).attr('data-active', '');
//     // $(this).trigger('dataChange');
// });

/***** Initialize on Load: START *****/

$(function () {
    if ($('body').is('.business-page')) {
        tabbedContent('.nav', '.case');
    }
});

/***** Initialize on Load: END *****/