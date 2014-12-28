var path = require('path');
var cli = require('cli');
cli.parse({
  app: [false, 'the app.js', 'path'],
  html: [false, 'the HTML', 'path']
});
cli.main(function(args, options) {
  var app_factory = require(path.join(process.cwd(), options.app));
  options.app = app_factory;
  require('./' + args.shift())(options, args)
});
