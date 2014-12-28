var path = require('path');
var fs = require('fs');
var util = require('util');
module.exports = function(options, args) {
  function appendScript(script_path, onload) {
    var scriptEl = window.document.createElement("script");
    scriptEl.src = script_path;
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
      var app_factory = options.app;
      app_factory(ng);
    } catch (e) {
      console.log('bootstrap ERROR:', e.stack);
    }
  });
};
