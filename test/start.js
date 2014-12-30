var ng_sys = require('../../ng-system');
ng_sys({
  html: 'index.html',
  app: function() {
    require('./test');
  }
});
