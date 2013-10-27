/**
 * cbpFixedScrollLayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function($){
  // cache and initialize some values
  $.fn.fixedScrollLayout = function(userConfig) {
    //default configuration
    var config = {
      // the cbp-fbscroller's sections
      $sections : $( '#cbp-fbscroller > section' ),
      // the navigation links
      $navlinks : $( '#cbp-fbscroller > nav:first > a' ),
      // index of current link / section
      currentLink : 0,
      // the body element
      $body : $( 'html, body' ),
      // the body animation speed
      animspeed : 650,
      // the body animation easing (jquery easing)
      animeasing : 'easeInOutExpo',
      // the number of sections to progammatically ensure exist
      numSections: null,
      // optional images to apply to the sections
      backgroundImages: null
      /*
      backgrounds: [
          "lightblue",
          "url(..)",
      sections: [{
        "background": ...
        "content": {
          "title": ...
          "body": ...
          "html": ...
        }
        "style": "floating-thing ..."
      },   
      ]
      */
    };    
    
    //TODO: create automatically create the section with images
    
    //merge user config into defaut config
    $.extend(config,userConfig);
    //create backgound image for each section based on user input
    if (config.backgroundImages.length) {
      config.$sections.each(function(i, sec){
        if (i < config.backgroundImages.length) {
          $(sec).css("background-image", "url(" + config.backgroundImages[i] + ")");
        }
      });
    }
    // update the current navigation link
    function changeNav( $section ) {
      config.$navlinks.eq( config.currentLink ).removeClass( 'cbp-fbcurrent' );
      config.currentLink = $section.index( 'section' );
      config.$navlinks.eq( config.currentLink ).addClass( 'cbp-fbcurrent' );
    }
    // function to scroll / animate the body
    function scrollAnim( top ) {
      config.$body.stop().animate( { scrollTop : top }, config.animspeed, config.animeasing );
    }
    // click on a navigation link: the body is scrolled to the position of the respective section
    config.$navlinks.on( 'click', function() {
      scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
      return false;
    } );

    // 2 waypoints defined:
    // First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
    // Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
    config.$sections.waypoint( function( direction ) {
      if( direction === 'down' ) { changeNav( $( this ) ); }
    }, { offset: '30%' } ).waypoint( function( direction ) {
      if( direction === 'up' ) { changeNav( $( this ) ); }
    }, { offset: '-30%' } );

    // on window resize: the body is scrolled to the position of the current section
    $( window ).on( 'debouncedresize', function() {
      scrollAnim( config.$sections.eq( config.currentLink ).offset().top );
    } );
  };
})(jQuery);