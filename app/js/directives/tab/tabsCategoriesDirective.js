module.directive('tabsCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            index:'@',
            categoryIndex: "@",
            subCategoryIndex: "@",
            onTabSelected:"&",
            tabActive: '@'
        },
        templateUrl: 'app/views/tabs/tabsCategories.html',
        replace: true,
        link: function(scope, element){
            if(scope.tabActive == "true"){
                scope.active = "active";
            }else{
                scope.active = "";
            }
        }
    };
});