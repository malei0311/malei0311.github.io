require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: 'lib/jquery/jquery-1.10.2.min'
  },
  shim: {

  }
});

define('modernizr', [], function() {
  return window.Modernizr;
});