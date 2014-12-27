var cli = require('cli');
cli.parse({
  // log:   ['l', 'Enable logging'],
  //   port:  ['p', 'Listen on this port', 'number', 8080],
  //   serve: [false, 'Serve static files from PATH', 'path', './public']
  app: [false, 'the app.js', 'path'],
  html: [false, 'the HTML', 'path']
});
cli.main(function(args, options) {
  require('./' + args.shift())(options, args)
});
