module.exports = function(angular) {
  angular.module('ng-system', [])
    .run(function() {
      console.log('I\'m ng-system');
    });
};
