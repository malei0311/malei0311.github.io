/*! webcraft - v0.0.1 - 2014-05-11
* Copyright (c) 2014 ; Licensed  */


// Source: scripts/src/config.js
require.config({
  baseUrl: '/scripts',
  paths: {
    'jquery': [
      '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
      '//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min',
      'lib/jquery/jquery-1.10.2.min'
    ],
    'underscore': [
      '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
      '//cdn.jsdelivr.net/underscorejs/1.5.2/underscore-min',
      'lib/underscore/underscore-min'
    ],
    'cryptojs': [
      '//crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5',
      'lib/cryptojs/md5'
    ]
  },
  shim: {
    'underscore': { 
      exports: '_'
    },
    'cryptojs': {
      exports: 'CryptoJS'
    }
  }
});

define('modernizr', [], function() {
  return window.Modernizr;
});;

// Source: scripts/src/utils.js
define('utils', [
  'jquery',
  'underscore',
  'cryptojs'
], function($, _, CryptoJS) {
  return {
    log: function() {
      if('console' in window && 'log' in console) {
        if(console.log.apply) {
          console.log.apply(console,[].slice.call(arguments));
        } else {
          console.log([].slice.call(arguments).join(' '));
        }
      }
    },
    getGravatar: function(email, options) {
      // options: s -> size  d-> default avatar url
      var opts = options || {};
      var email_hash = CryptoJS.MD5(email);
      var protocol = opts.secure ? 'https' : 'http';
      delete opts.secure;
      var url = protocol + '://www.gravatar.com/avatar/' + email_hash;
      var params = _.map(opts, function(val, key) {
        return key + "=" + val;
      }).join('&');
      if (params !== '') {
        url += '?' + params;
      }
      return url;
    }
  };
});;

// Source: scripts/src/index.js
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