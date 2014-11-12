(function() {
  var kernel = window.kernel;
  delete window.kernel;
  angular.module('ng-system', [])
    .run(['$parse', function($parse) {
      kernel.$parse = $parse;
    }]);
})()