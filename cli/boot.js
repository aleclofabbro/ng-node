var path = require('path');
var cli = require('cli');
cli.parse({
  root: [false, 'the app root', 'path'],
  html: [false, 'the HTML', 'path']
});
cli.main(function(args, options) {
  console.log(args, options);
  var boot = require('../lib/boot');
  var mainModule = args[0];
  var root = path.resolve(process.cwd(), options.root || '.');
  console.log(mainModule, root);
  boot(mainModule, root, options);
});
