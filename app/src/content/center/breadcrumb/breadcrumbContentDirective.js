module.directive('breadcrumbContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            categorySelected:'@',
            entrySelected:'@',
            tabSelected:'@',
            categoryId: "@",
            subCategoryId: "@",
            tabId: "@"
        },
        templateUrl: 'app/src/content/center/breadcrumb/breadcrumbContent.tpl.html',
        replace: true
    };
});
