module.directive('entryHtmlContent', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            item:'=',
            tabPath: '@'
        },
        templateUrl: 'app/src/content/center/entry/entryHtmlContent.tpl.html',
        replace: true,
        link: function (scope, element) {
            scope.path = scope.tabPath+'/'+scope.item.id+'.html';
        }
    };
});
