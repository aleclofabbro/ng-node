module.exports = function(angular) {
  angular.module('test-dep', [])
    .run(function() {
      console.log('I\'m test-dep');
    });
};
