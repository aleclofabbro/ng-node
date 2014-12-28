module.exports = function(angular) {
  angular.module('test', ['test-dep'])
    .run(function() {
      console.log('I\'m test !!!!');
    });
  require('./test_dep')(angular);
};
