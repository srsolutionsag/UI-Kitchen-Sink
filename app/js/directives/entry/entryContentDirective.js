module.directive('entryContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            entry:'=',
            index: '@',
            tabPath: '@'
        },
        templateUrl: 'app/views/entry/entryContent.html',
        replace: true,
        link: function (scope, element) {
            scope.path = scope.tabPath+'/'+scope.entry.id+'.html';
        }
    };
});
