var _require = function(id) {
    return require(path.join(cwd, id));
  },
  appPath = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(cwd);
    var _path = path.join.apply(path, args);
    // console.log('appPath:', args, cwd, _path);
    return _path;
  },
  dirPath = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(_dir);
    var _path = path.join.apply(path, args);
    // console.log('dirPath:', args, _dir, _path);
    return _path;
  },
  cwd = process.cwd(),
  path = require('path'),
  jsdom = require('jsdom'),
  conf = _require('ng-conf'),
  ker_mods_def = conf['ng-ker-mods'],
  ker_mods_names = Object.keys(ker_mods_def),
  usr_mods_names = conf['ng-usr-mods'],
  _dir = path.join(module.filename, '..') + '/';

scripts = [
    dirPath('lib/angular.js'),
    dirPath('system/ng-system.js')
  ]
  .concat(ker_mods_names.map(function(ker_mod_name) {
    return appPath('kernel', ker_mod_name) + '.js';
  }))
  .concat(usr_mods_names.map(function(usr_mod_name) {
    return appPath('modules', usr_mod_name) + '.js';
  }));

console.log('SCRIPTS:', scripts);
console.log('ker_mods_names:', ker_mods_names);
console.log('usr_mods_names:', usr_mods_names);

var env = {
  file: appPath('index.html'),
  scripts: scripts,
  created: function(error, window) {
      if (error) {
        console.error('ng-system#created ERROR:', error);
        process.exit();
      }
      console.log('ng-system#created: ok');
      window.ngSystem = {
        ker_mods_def: ker_mods_def,
        ker_mods_names: ker_mods_names,
        usr_mods_names: usr_mods_names,
        appPath: appPath,
        dirPath: dirPath,
        require: require
      };
      window.console = console;
    }
    // loaded: function(errors, window) {
    //   },
    // done: function(errors, window) {
    //   }
};

jsdom.env(env);