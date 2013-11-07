/**
 * Copyright 2013, Emma L. Baumstarck
 * Adapted from http://www.codrops.com
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function($) {
  $.fn.fixedScroll = function(userConfig) {
    // default configuration
    var config = {
      currentLink: 0,
      // the body element
      $body: $('html, body'),
      // the body animation speed
      animspeed: 650,
      // the body animation easing (jquery easing)
      animeasing: 'easeInOutExpo',
      // the number of sections to progammatically ensure exist
      numSections: null,
      // optional backgrounds to apply to the sections
      backgrounds: null,
      // whether to use navigation buttons
      showNavigation: true,
      // default body for each section
      sectionContent: 'Content here',
      // a list of custom names to use for the navigation links
      linkNames: null
    };
    // merge user config into defaut config
    $.extend(config,userConfig);

    // create all sections
    var numSections = Math.max(config.numSections || 0, config.backgrounds.length);
    if (!numSections) {
      return;
    }
    // create navigation for each section
    var navStr = '';
    if (config.showNavigation) {
      navStr = ['<nav>'];
      for (var i = 0; i < numSections; i++) {
        var linkName = config.linkNames && i < config.linkNames.length ?
            config.linkNames[i] : String.fromCharCode('a'.charCodeAt(0) + i);
        navStr.push('<a href="#section' + i + '" ' + (i == 0 ? 'class="current" ': '') +
                    '>' + linkName + '</a>');
      }
      navStr.push('</nav>');
      navStr = navStr.join('');
    }
    // create sections
    var sectionStr = [];
    for (var j = 0; j < numSections; j++) {
      sectionStr.push('' +
          '<section id="section' + j.toString() +'">' +
            '<div class="sectionwrap">' +
              config.sectionContent +
            '</div>' +
          '</section>');
    }
    sectionStr = sectionStr.join('');
    // place section and navigation on the page
    $('#scroller').html(navStr + sectionStr);

    // the scroller's sections
    var $sections = $('#scroller > section');
    // the navigation links
    var $navlinks = $('#scroller > nav:first > a');
    
    // set the background for each section
    if (config.backgrounds.length) {
       $sections.each(function(k, sec) {
        if (k < config.backgrounds.length) {
          var background = config.backgrounds[k];
          if (background.match(/\.\w{3,4}$/)) {
            // it's a url for an image
            $(sec).css("background-image", "url(" + background + ")");
          } else {
            $(sec).css("background", background);
          }
        }
      });
    }
    // update the current navigation link
    function changeNav($section) {
      $navlinks.eq(config.currentLink).removeClass('current');
      config.currentLink = $section.index('section');
      $navlinks.eq(config.currentLink).addClass('current');
    }
    // function to scroll/animate the body
    function scrollAnim(top) {
      config.$body.stop().animate(
          {'scrollTop': top}, config.animspeed, config.animeasing);
    }
    // click on a navigation link: the body is scrolled to the respective section
    $navlinks.on('click', function() {
      scrollAnim($sections.eq($(this).index()).offset().top);
      return false;
    });

    // 2 waypoints defined:
    // First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
    // Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
    $sections.waypoint(function(direction) {
      if (direction === 'down') {
        changeNav($(this));
      }
    }, { offset: '30%' }).waypoint(function(direction) {
      if (direction === 'up') {
        changeNav($(this));
      }
    }, { offset: '-30%' });

    // on window resize: the body is scrolled to the position of the current section
    $(window).on('debouncedresize', function() {
      scrollAnim($sections.eq(config.currentLink).offset().top);
    });
  };
})(jQuery);
