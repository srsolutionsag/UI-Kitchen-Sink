module.directive('Breadcrumb', function () {
    return {
        restrict: 'AEC',
        scope: {
            categorySelected:'@',
            entrySelected:'@'
        },
        templateUrl: '/public/src/views/Breadcrumb.html',
        replace: true
    };
});
