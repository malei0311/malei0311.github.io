var Utils = {
  log: function(msg) {
    window.console && window.console.log(msg);
  },
  sayHello: function() {
    this.log('hello world!');
  }
};

Utils.sayHello();