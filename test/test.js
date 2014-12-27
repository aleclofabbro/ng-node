module.exports = function(angular, bootstrap) {
  angular.module('test', ['ng-system', 'test-dep'])
    .run(function() {
      console.log('I\'m test !!!!');
    });
  require('./test_dep')(angular);
  // bootstrap(['test']);
};
