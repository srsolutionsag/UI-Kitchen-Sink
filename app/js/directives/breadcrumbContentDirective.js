module.directive('breadcrumbContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            categorySelected:'@',
            entrySelected:'@'
        },
        templateUrl: 'app/views/breadcrumbContent.html',
        replace: true
    };
});
