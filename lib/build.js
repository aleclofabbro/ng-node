module.exports = function() {
  var jsdom = require('jsdom'),
    path = require('path'),
    _dir = path.join(module.filename, '..'),
    jsdom_env = {
      html: '<body></body>',
      scripts: [path.join(_dir, 'angular.js')],
      created: function(error, window) {
        if (error) {
          console.error('\njsdom create ERROR:', error);
          process.exit();
        }
        console.log('\n..............jsdom created');
        window.console = console;
      },
      loaded: function(error, window) {
        if (error) {
          console.error('\njsdom loaded ERROR:', error);
          process.exit();
        }
        var module_fn = window.angular.module,
          modules = {};
        window.angular.module = function(mod_name, deps) {
          modules[mod_name] = modules[mod_name] || {
            comps: [],
            deps: []
          };
          if (deps) {
            deps.forEach(function(dep_name) {
              modules[mod_name].deps.push(mod_name);
            });
            modules[mod_name].main = window['ng-system-crawler'].current_file;
          } else {
            modules[mod_name].comps.push(window['ng-system-crawler'].current_file);
          }
          var module = module_fn.apply(window.angular, arguments);
          return module;
        }
        console.info('\n..............jsdom loaded\n');
      },
      done: function(error, window) {
        console.info('deps:[\n' + Object.keys(deps).join('\n') + '\n]');
        if (error) {
          console.error('\njsdom done ERROR:', error);
          process.exit();
        }
        console.info('\n..............jsdom done');
        console.log(window.document.body.outerHTML, '\n\n');
      }
    };
  jsdom.env(jsdom_env);
};
