var path = require('path');
var grunt = require('grunt');
grunt.task.init = function() {};

var cwd = process.cwd();
process.chdir(path.join(module.filename, '../..'));
grunt.loadNpmTasks('grunt-angular-builder');
process.chdir(cwd);

// todo
// 		options:
//             usa l'array di dipend aggiuntive di angular-builder
//    gestire il dest file.
//    capire debug, e release
// + in là...
//    vedere se si può fare in modo che possa ritornare un builder persistente a partire da src & ?options da usare a richiesta in runtime (per il client)
// moooolto + in là...
//    gestire dipendenze allo stesso modulo con diverse versioni
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
