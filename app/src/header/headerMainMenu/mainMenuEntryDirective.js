module.directive('mainMenuEntry', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            index:'@',
            subCategoryId: '@',
            categoryId:'@',
            isActive:'@',
            onDropdownEntrySelected:"&"
        },
        templateUrl: 'app/src/header/headerMainMenu/mainMenuEntry.tpl.html',
        replace: true,
        link: function(scope, element){
            scope.$watch("isActive",function(newValue,oldValue) {
                if(scope.isActive == "true"){
                    scope.active = "active";
                }else{
                    scope.active = "";
                }
            });
        }
    };
});
