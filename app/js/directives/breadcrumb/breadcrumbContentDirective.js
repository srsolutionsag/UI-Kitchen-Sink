module.directive('breadcrumbContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            categorySelected:'@',
            entrySelected:'@',
            tabSelected:'@'
        },
        templateUrl: 'app/views/breadcrumb/breadcrumbContent.html',
        replace: true
    };
});
