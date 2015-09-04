module.directive('tabsContent', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/src/content/center/tab/tabsContent.tpl.html',
        scope: {
            type: '@'
        },
        replace: true
    };
});
