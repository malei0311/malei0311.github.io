/*! webcraft - v0.0.1 - 2013-10-24
* Copyright (c) 2013 ; Licensed  */


// Source: scripts/src/utils.js
var Utils = {
  log: function(msg) {
    window.console && window.console.log(msg);
  },
  sayHello: function() {
    this.log('hello world!');
  }
};

Utils.sayHello();;

// Source: scripts/src/webcraft.js
var test = 'xx';
Utils.log(test);