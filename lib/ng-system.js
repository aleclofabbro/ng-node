module.exports = function(angular) {
  var fs = require('fs'),
    ng_sys = angular.module('ng-system', ['ng-sys-main']);
  require('./ng-file-resource')(ng_sys, angular);
  require('./ng-resource')(ng_sys, angular);
  require('./ng-fd')(ng_sys, angular);
};
