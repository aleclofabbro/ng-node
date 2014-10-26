var jsdom = require('jsdom');
jsdom.env({
  file: "./index.html",
  scripts: [
    'angular.js',
    'app.js'
  ],
  created: function(errors, window) {
    console.log('created errors:', errors);
    window.require = require;
    window.console = console;
  }
  // loaded: function(errors, window) {
  //   },
  // done: function(errors, window) {
  //   }
})
