module.exports = function(executor) {
  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var prompt = function() {
    rl.question("ng-kernel > ", function(cmd) {
      executor(cmd, function(res) {
        console.log('#', res);
        prompt();
      });
    });
  };
  prompt();
};