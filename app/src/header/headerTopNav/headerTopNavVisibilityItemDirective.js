module.directive('headerTopNavVisibityItem', function (Entries) {
    return {
        restrict: 'AEC',
        scope: {
            visibility: '@',
            text: '@',
            isActive:'@'
        },
        transclude: true,
        templateUrl: 'app/src/header/headerTopNav/headerTopNavVisibilityItem.tpl.html',
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