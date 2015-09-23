module.directive('tabsCategories', function (Entries) {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            tabId:'@',
            subTabId:'@',
            categoryId: "@",
            subCategoryId: "@",
            index: "@",
            onTabSelected:"&",
            tabActive: '@',
            state: '@'
        },
        templateUrl: 'app/src/content/center/tab/tabsCategories.tpl.html',
        replace: true,
        link: function(scope, element){
            scope.visible = true;
            if(scope.state){
                scope.visible = Entries.isEntryStateVisible(scope.state);
            }
            scope.$watch("tabActive",function(newValue,oldValue) {
                if(scope.tabActive == "true"){
                    scope.active = "active";
                }else{
                    scope.active = "";
                }
            });
        }
    };
});