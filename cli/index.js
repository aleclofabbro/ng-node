var path = require('path');
var cli = require('cli');
cli.parse({
  app: [false, 'the app.js', 'path'],
  html: [false, 'the HTML', 'path']
});
cli.main(function(args, options) {
  require('./' + args.shift())(options, args)
});
