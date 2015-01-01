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

function appendScript(window, script_path, onload) {
  var scriptEl = window.document.createElement("script");
  scriptEl.src = script_path;
  window.document.body.appendChild(scriptEl);
  scriptEl.onload = onload;
}

module.exports = function(mainModule, root, options) {
  options = options || {};
  root = root || process.cwd();
  // todo (se serve): aggiungere proprietà di conf (e/o nelle opzioni) un glob o un percorso per la ricerca dei sub-conf (ora è da root in giù a manetta)
  get_ng_system_configs(root, function(err, confs) {
    if (err)
      throw err;
    // todo : aggiungere globs nel conf e/o nelle opzioni
    var moduleglobs = confs.map(function(conf) {
      return path.join(conf.dir, conf.modules);
    });
    console.log('** ng-system building:', mainModule, 'from', root)
    builder(mainModule, moduleglobs, options, function(err, build_response) {
      var html = options.html && fs.readFileSync(options.html);
      var this_dir = path.join(module.filename, '..');
      var angular_script = path.join(this_dir, 'angular.js');
      var window = jsdom.jsdom(html).parentWindow;
      window.console = console;
      appendScript(window, angular_script, function() {
        // global angular
        angular = window.angular;
        try {
          build_response.requiredScripts.forEach(require);
          angular.bootstrap(window.document.body, [mainModule]);
          console.log('** Done ng-system bootstrap')
        } catch (e) {
          console.log('** bootstrap ERROR:', e.stack);
        }
      });
    });
  });
};
