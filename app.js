var fs = require('fs');
angular.module('test', [])
  .controller('MainCtrl', function($scope, $interval) {
    $scope.files = fs.readdirSync('.');
    console.log($scope.files);
    var a = 0;

    $interval(function() {
      $scope.files.push(a++);
    }, 1, 20000)
    $interval(function() {
      console.log(a);
    }, 1000)
  })
  .directive('log', function() {
    return {
      scope: {
        log: '='
      },
      link: function(sc) {
        // console.log('file:', sc.log);
        setTimeout(function() {}, 1000)
      }
    }
  });
