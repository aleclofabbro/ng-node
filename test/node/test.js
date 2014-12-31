angular.module('test', ['test-dep'])
  .run(function($timeout, $rootScope) {
    console.log('I\'m NODE test !!!!');
    $timeout(function() {
      console.log('$time(d)out!', '----------');
    }, 1000)
    $rootScope.$watch(function() {
      return 1
    }, function(v, o) {
      console.log('$rootScope.$watch!', v, o);
    })
  });
