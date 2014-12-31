var path = require('path');
var fs = require('fs');
var glob = require('glob');
var builder = require('../builder');
var jsdom = require('jsdom');

function get_ng_system_configs(root, cb) {
  glob('**/ng-sys.json', {
    cwd: root
  }, function(err, files) {
    if (err)
      cb(err);
    var confs = files.map(function(filepath) {
      var conf_path = path.join(root, filepath);
      var conf = require(conf_path);
      conf.dir = path.join(conf_path, '..');
      return conf;
    });
    cb(null, confs);
  });
}
module.exports = function(mainModule, root, options) {
  options = options || {};
  root = root || process.cwd();
  get_ng_system_configs(root, function(err, confs) {
    if (err)
      throw err;
    var moduleglobs = confs.map(function(conf) {
      return path.join(conf.dir, conf.modules);
    });
    console.log('** ng-system building:', mainModule, 'from', root)
    builder(mainModule, moduleglobs, options, function(err, res) {
      var modulescripts = res.requiredScripts;

      function appendScript(script_path, onload) {
        var scriptEl = window.document.createElement("script");
        scriptEl.src = script_path;
        window.document.body.appendChild(scriptEl);
        scriptEl.onload = onload;
      }

      var html = options.html && fs.readFileSync(options.html);
      var window = jsdom.jsdom(html).parentWindow;
      window.console = console;

      var _dir = path.join(module.filename, '..');
      var angular_script = path.join(_dir, 'angular.js');

      appendScript(angular_script, function() {
        angular = window.angular;
        try {
          modulescripts.forEach(require);
          angular.bootstrap(window.document.body, [mainModule]);
          console.log('** Done ng-system bootstrap')
        } catch (e) {
          console.log('** bootstrap ERROR:', e.stack);
        }
      });
    });
  });
};
