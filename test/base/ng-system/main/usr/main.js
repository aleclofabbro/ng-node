angular.module('app', ['fs'])
  .run(['fs', function(fs) {
    console.log(fs.cwd());
    console.log(window.ngSystem);
  }]);