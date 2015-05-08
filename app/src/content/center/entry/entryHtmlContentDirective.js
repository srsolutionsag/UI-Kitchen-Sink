module.directive('entryHtmlContent', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            itemGroup:'=',
            index: '@',
            tabPath: '@'
        },
        templateUrl: 'app/src/content/center/entry/entryHtmlContent.tpl.html',
        replace: true,
        link: function (scope, element) {
            scope.path = scope.tabPath+'/'+scope.itemGroup.id+'.html';
        }
    };
});
