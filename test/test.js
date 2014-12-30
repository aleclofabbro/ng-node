angular.module('test', ['test-dep'])
  .run(function() {
    console.log('I\'m test !!!!');
  });
require('./node/test_dep');
