module.directive('dropdownEntry', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            index:'@',
            categoryIndex:'@',
            isActive:'@',
            onDropdownEntrySelected:"&"
        },
        templateUrl: 'app/views/dropdown/dropdownEntry.html',
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
