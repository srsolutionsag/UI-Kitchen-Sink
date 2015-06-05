module.directive('tabsCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            tabIndex:'@',
            subTabIndex:'@',
            categoryIndex: "@",
            subCategoryIndex: "@",
            onTabSelected:"&",
            tabActive: '@'
        },
        templateUrl: 'app/src/content/center/tab/tabsCategories.tpl.html',
        replace: true,
        link: function(scope, element){
            scope.$watch("tabActive",function(newValue,oldValue) {
                if(scope.tabActive == "true"){
                    scope.active = "active";
                }else{
                    scope.active = "";
                }
                console.log(scope.title + " " + scope.active);
            });
        }
    };
});