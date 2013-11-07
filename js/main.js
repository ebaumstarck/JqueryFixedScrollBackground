$(document).ready(function(){
  $('body').fixedScroll({
    // or provide a list of background images or colors
    'backgrounds': [
        '/images/CherryBlossom.jpg',
        // 'images/LasVegas.jpg',
        '/images/SanFrancisco.jpg',
        '/images/SanJuanIsland.jpg',
        'skyblue'
    ],
    // also specify the number of sections manually with 'numSections'
    // 'numSections': 5,
    // use 'sectionContent' to override what shows up in each section by default
    'sectionContent': '' +
        '<div class="contentwrap">' +
          '<div class="content">' +
            '<header>' +
              '<h2>Cupcake ipsum dolor sit amet</h2>' +
            '</header>' +
            '<p>Cupcake ipsum dolor sit amet chocolate cake sugar plum jujubes.' +
            'Biscuit drag&#233;e carrot cake biscuit chocolate ice cream. ' +
            'Drag&#233;e icing icing sugar plum souffl&#233;.</p>' +
          '</div>' +
        '</div>'
  });
  // move the display content into the first section
  $('#section0 .content').empty()
  $('#mainContent').appendTo('#section0 .content');
});
