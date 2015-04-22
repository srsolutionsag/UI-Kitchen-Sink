module.directive('dropdownCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            title : '@',
            isActive:'@'
        },
        transclude: true,
        templateUrl: 'app/views/dropdown/dropdownCategories.html',
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