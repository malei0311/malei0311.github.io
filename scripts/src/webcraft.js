require([
  'jquery',
  'utils-min',
  'modernizr'
], function($, Utils, Modernizr) {
  $(document).ready(function(){
    Utils.log('helo modernizr', Modernizr);

    $('#header-action-burger').bind('click', function(e) {

      $('body').toggleClass('nav-base-open');

      e.preventDefault();
      e.stopPropagation();
    });
  });
});