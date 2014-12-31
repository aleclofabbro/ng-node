var path = require('path');
var grunt = require('grunt');
grunt.task.init = function() {};

var cwd = process.cwd();
process.chdir(path.join(module.filename, '../..'));
grunt.loadNpmTasks('grunt-angular-builder');
process.chdir(cwd);

module.exports = function(mainModule, src, options, cb) {
  var gruntConf = {
    'angular-builder': {
      options: {
        mainModule: mainModule
      },
      app: {
        src: src,
        dest: options.dest || 'build/xxxxx.js'
      }
    }
  };
  grunt.initConfig(gruntConf);
  grunt.registerTask('release', ['angular-builder']);
  grunt.registerTask('debug', ['angular-builder::debug']);
  grunt.tasks(['debug'], {}, function() {
    console.log('** Angular Builder done.', gruntConf, '\n\n');
    cb(null, gruntConf);
  });
  // grunt.tasks(['release'], {}, function() {
  //   grunt.log.ok('Done running release.', gruntConf);
  // });
};
