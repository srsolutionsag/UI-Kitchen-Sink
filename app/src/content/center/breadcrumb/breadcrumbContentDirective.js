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
        templateUrl: 'app/src/content/center/breadcrumb/breadcrumbContent.tpl.html',
        replace: true
    };
});
