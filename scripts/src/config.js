require.config({
  baseUrl: '/scripts',
  paths: {
    'jquery': 'lib/jquery/jquery-1.10.2.min',
    'underscore': 'lib/underscore/underscore-min',
    'cryptojs': 'lib/cryptojs/md5',
    'utils': 'src/utils',
    'utils-min': 'dist/utils.min'
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
});