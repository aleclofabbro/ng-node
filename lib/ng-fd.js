module.exports = function(sysmod, angular) {
  var fs = require('fs'),
    path = require('path'),
    file_ = {
      text: function() {
        return this.buffer.toString();
      },
      json: function() {
        return JSON.parse(this.text());
      }
    };
  sysmod.directive('fd', function() {
    return {
      restrict: 'E',
      scope: {
        path: '@',
        assign: '&'
      },
      link: function(scope, elem, attr) {
        scope.$watch('path', function(path, old_path) {
          fs.readFile(path, function(err, buffer) {
            var _file = Object.create(file_);
            _file.buffer = buffer;
            scope.assign({
              $file: _file
            });
          });
        });
      }
    };
  })
};
