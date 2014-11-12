var jsdom = require('jsdom'),
  path = require('path'),
  _cwd = process.cwd(),
  _dir = path.join(module.filename, '..') + '/',
  _html = path.join(_dir, 'index.html'),
  scripts = [
    path.join(_dir, 'angular.js'),
    path.join(_dir, 'ng-system.js')
  ];
var kernel = {
  print: function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('«');
    args.push('»');
    console.log.apply(console, args);
  },
  add: function(str) {
    win.angular.element(win.document.body).append(win.angular.element(str));
  }
};
var win;
var executor = function() {
  var local = Object.create(kernel);
  return function(cmd, cb) {
    var res = kernel.$parse(cmd)(local);
    cb(res);
  };
};
var jsdom_env = {
  file: _html,
  scripts: scripts,
  created: function(error, window) {
    if (error) {
      console.error('ng-system create ERROR:', error);
      process.exit();
    }
    console.log('ng-system started');
    window.kernel = kernel;
  },
  loaded: function(errors, window) {
    win = kernel.win = window;
    require('./process-cli')(executor());
  },
  // done: function(errors, window) {
  //   }
};

jsdom.env(jsdom_env);