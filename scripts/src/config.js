require.config({
  baseUrl: 'scripts',
  paths: {
    'jquery': 'lib/jquery/jquery-1.10.2.min',
    'utils': 'src/utils',
    'utils-min': 'dist/utils.min'
  },
  shim: {

  }
});

define('modernizr', [], function() {
  return window.Modernizr;
});