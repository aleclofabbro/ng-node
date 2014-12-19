module.exports = function(html, options) {
  var jsdom = require('jsdom'),
    path = require('path'),
    _dir = path.join(module.filename, '..'),
    jsdom_env = {
      html: '<body ng-app="ng-system">' + html + '</body>',
      scripts: [path.join(_dir, 'angular.js')],
      created: function(error, window) {
        if (error) {
          console.error('\njsdom create ERROR:', error);
          process.exit();
        }
        console.log('\njsdom created...');
        window.console = console;
      },
      loaded: function(error, window) {
        if (error) {
          console.error('\njsdom loaded ERROR:', error);
          process.exit();
        }
        console.info('\njsdom loaded');
        var angular = window.angular,
          main_module = angular.module.bind(angular, 'ng-sys-main');
        options.setup(angular, main_module);
        console.info('\njsdom app loaded');
        require('./ng-system')(angular);
      },
      done: function(error, window) {
        if (error) {
          console.error('\njsdom done ERROR:', error);
          process.exit();
        }
        console.info('\njsdom sysgtem started');
        console.log(window.document.body.outerHTML, '\n\n');
      }
    };
  jsdom.env(jsdom_env);
};
