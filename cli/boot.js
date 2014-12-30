var path = require('path');
module.exports = function(options, args) {
  var app_req = options.app;
  options.app = function() {
    return require(path.join(process.cwd(), app_req));
  };
  require('../lib/boot')(options, args);
};
