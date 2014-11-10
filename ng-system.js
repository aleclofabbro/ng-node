var jsdom = require('jsdom'),
  path = require('path'),
  _cwd = process._cwd(),
  _dir = path.join(module.filename, '..') + '/',
  fs_abs_path_from = function(_path) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(_path);
      var _abs_path = path.join.apply(path, args);
      return _abs_path;
    };
  },
  build = require('./helpers/build'),
  SYS = build(fs_abs_path_from(_dir));

build(fs_abs_path_from(_cwd), SYS);

SYS.main.scripts.unshift(fs_abs_path_from(_dir)('angular.js'));
console.log('SCRIPTS:', SYS.main.scripts);

var jsdom_env = {
  file: SYS.main.html,
  scripts: SYS.main.scripts,
  created: function(error, window) {
      if (error) {
        console.error('ng-system#created ERROR:', error);
        process.exit();
      }
      console.log('ng-system#created: ok');
      window.ngSystem = {
        system: system,
        distro: distro
      };
    }
    // loaded: function(errors, window) {
    //   },
    // done: function(errors, window) {
    //   }
};

jsdom.env(jsdom_env);