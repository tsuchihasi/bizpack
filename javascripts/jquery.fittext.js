/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

$(function(){
  $(".catchcopy").fitText(2,{
        minFontSize: '25px',
        maxFontSize: '40px'
  });
  $(".middle_text").fitText(4,{
        minFontSize: '14px',
        maxFontSize: '30px'
  });
  $(".service_title").fitText(4,{
        minFontSize: '13px',
        maxFontSize: '30px'
  });
  $(".service_header").fitText(2.5,{
        minFontSize: '17px',
        maxFontSize: '27px'
  });
  $(".service_detail").fitText(3.2,{
        minFontSize: '14px',
        maxFontSize: '15.4px'
  });
  $(".service_homepage_text").fitText(3,{
        minFontSize: '14px',
        maxFontSize: '26px'
  });
});
