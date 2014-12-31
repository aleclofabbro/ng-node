angular.module('test-dep', ['test-dep-2'])
  .run(function() {
    console.log('I\'m NODE test-dep');
  });
