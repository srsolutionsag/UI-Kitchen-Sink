module.directive('tabsCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            index:'@',
            onTabSelected:"&"
        },
        templateUrl: 'app/views/tabs/tabsCategories.html',
        replace: true
    };
});