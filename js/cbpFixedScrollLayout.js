/**
 * cbpFixedScrollLayout.js v1.0.0
 * CopyRight 2013, Emma L. Baumstarck
 * Adapted from
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
      backgroundImages: null,
      //whether turn on the navigation
      isNavigation: true,
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
    
    //merge user config into defaut config
    $.extend(config,userConfig);
    
    //TODO: create automatically create the section with images
    //create backgound image for each section based on user input
    if(config.numSections > 0) {
      // create navigation
      if(config.isNavigation){
        var navStr = '<nav><a href="#fbsection0" class="cbp-fbcurrent">0</a>';
        for(var i = 0; i < config.numSections - 1; i++){
          navStr += '<a href="#fbsection'+ (i+1).toString()+ '">' + (i+1).toString() + '</a>';
        }
        navStr += '</nav>';
      }
      //create section
      var sectionStr = '';
      for(var j = 0; j < config.numSections; j++){
        sectionStr +='<section id="fbsection' + j.toString() +'">'
         +'<div class="sectionwrap">'
            +'<div class="contentwrap">'
            +'<div class="innerbox">'
                +'<header>'
                  +'<h2 class="premier-floral">Cupcake ipsum dolor sit amet</h2>'
                +'</header>'
                +'<p>Cupcake ipsum dolor sit amet chocolate cake sugar plum jujubes. Biscuit drag&#233;e carrot cake biscuit chocolate ice cream. Drag&#233;e icing icing sugar plum souffl&#233;. Caramels carrot cake fruitcake ice cream cookie muffin gingerbread gummi bears tiramisu.</p>'
             +'</div>'
            +'</div>'
          +'</div>'
        +'</section>';
      }  
      //place html for section and navigation on the page
      if(config.isNavigation){
        $('#cbp-fbscroller').html(navStr + sectionStr);
      } else {
        $('#cbp-fbscroller').html(sectionStr);
      }
      // the cbp-fbscroller's sections
      var $sections = $( '#cbp-fbscroller > section' ),
      // the navigation links
        $navlinks = $( '#cbp-fbscroller > nav:first > a' );
      
      //set the background images for each section
      if (config.backgroundImages.length) {
         $sections.each(function(k, sec){
          if (k < config.backgroundImages.length) {
            $(sec).css("background-image", "url(" + config.backgroundImages[k] + ")");
          }
        });
      }
      // update the current navigation link
      function changeNav( $section ) {
        $navlinks.eq( config.currentLink ).removeClass( 'cbp-fbcurrent' );
        config.currentLink = $section.index( 'section' );
        $navlinks.eq( config.currentLink ).addClass( 'cbp-fbcurrent' );
      }
      // function to scroll / animate the body
      function scrollAnim( top ) {
        config.$body.stop().animate( { scrollTop : top }, config.animspeed, config.animeasing );
      }
      // click on a navigation link: the body is scrolled to the position of the respective section
      $navlinks.on( 'click', function() {
        scrollAnim($sections.eq($(this).index() ).offset().top );
        return false;
      } );

      // 2 waypoints defined:
      // First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
      // Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
      $sections.waypoint( function( direction ) {
        if( direction === 'down' ) { changeNav( $(this) ); }
      }, { offset: '30%' } ).waypoint( function( direction ) {
        if( direction === 'up' ) { changeNav( $( this ) ); }
      }, { offset: '-30%' } );

      // on window resize: the body is scrolled to the position of the current section
      $( window ).on( 'debouncedresize', function() {
        scrollAnim($sections.eq( config.currentLink ).offset().top );
      } );
    }
  };
})(jQuery);