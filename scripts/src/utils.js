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
});