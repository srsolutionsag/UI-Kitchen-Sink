module.directive('tabsContent', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/views/tabs/tabsContent.html',
        replace: true
    };
});
