module.exports = function(sysmod, angular) {
  sysmod.directive('fileResource', function() {
    return {
      restrict: 'A',
      template: '<fd path="{{base}}/{{path}}" assign="assign($file)" ng-transclude></fd>',
      require: 'resource',
      transclude: true,
      scope: {
        path: '@id',
        base: '@fileResource'
      },
      link: function(sc, el, at, res) {
        sc.assign = function($file) {
          sc.file_text = $file.text();
          console.log('///////', sc.file_text)
        };
        res.get = function() {
          return sc.file_text;
        };
      }
    };
  })
};
