require([
  'jquery',
  'utils',
  'modernizr'
], function($, Utils, Modernizr) {
  $(document).ready(function(){
    Utils.log('helo modernizr', Modernizr);

    $('#header-action-burger').bind('click', function(e) {

      $('body').toggleClass('nav-base-open');

      e.preventDefault();
      e.stopPropagation();
    });

    $('#author-avatar').attr('src', Utils.getGravatar('leiman0311@gmail.com',{
      s: 100
    }));
    
  });
});