module.directive('breadcrumbContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            categorySelected:'@',
            entrySelected:'@',
            tabSelected:'@',
            categoryIndex: "@",
            subCategoryIndex: "@",
            tabIndex: "@"
        },
        templateUrl: 'app/views/breadcrumb/breadcrumbContent.html',
        replace: true
    };
});
