module.exports = function(sysmod, angular) {
  var ResourceController = function() {
      console.log('++', this);
    },
    not_implemented = function(name) {
      var msg = 'Resource: ' + name + ' not Implemented'
      console.log(msg);
      throw new Error(msg);
    };
  ResourceController.prototype = {
    get: not_implemented,
    lock_write: not_implemented,
    save: not_implemented
  };
  sysmod.directive('resource', function() {
    return {
      restrict: 'E',
      controller: ResourceController
    };
  })
};
