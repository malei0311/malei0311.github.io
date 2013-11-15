define([
  'jquery'
], function($) {
  return {
    log: function() {
      if('console' in window && 'log' in console) {
        if(console.log.apply) {
          console.log.apply(console,[].slice.call(arguments));
        } else {
          console.log([].slice.call(arguments).join(' '));
        }
      }
    }
  };
});