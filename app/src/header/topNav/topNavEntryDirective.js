module.directive('topNavEntry', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            index:'@',
            categoryIndex:'@',
            isActive:'@',
            onDropdownEntrySelected:"&"
        },
        templateUrl: 'app/src/header/topNav/topNavEntry.tpl.html',
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
