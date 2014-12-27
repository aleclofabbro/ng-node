var path = require('path');
var fs = require('fs');
var util = require('util');
module.exports = function(options, args) {
  function appendScript(path, onload) {
    var scriptEl = window.document.createElement("script");
    scriptEl.src = path;
    window.document.body.appendChild(scriptEl);
    scriptEl.onload = onload;
  }

  var jsdom = require('jsdom');
  var html = options.html && fs.readFileSync(options.html);
  var window = jsdom.jsdom(html).parentWindow;
  window.console = console;

  var _dir = path.join(module.filename, '..');
  var angular_script = path.join(_dir, 'angular.js');

  appendScript(angular_script, function() {
    var ng = window.angular;
    try {
      require('./ng-system')(ng);
      if (options.app) {
        var appfn = ('function' === typeof options.app) ? options.app : require(path.join(process.cwd(), options.app));
        appfn(ng, function(deps) {
          deps.unshift('ng-system');
          ng.bootstrap(window.document.body, deps);
        });
      }
    } catch (e) {
      console.log('bootstrap ERROR:', e.stack);
    }
  });

};
