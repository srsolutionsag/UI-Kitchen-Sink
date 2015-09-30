module.directive('lessVariable', function (Entries) {
    return {
        restrict: 'AEC',
        scope: {
            variable:'=',
            showRelations: '@'
        },
        templateUrl: 'app/src/content/center/entry/lessVariable.tpl.html',
        replace: false,
        link: function (scope, element) {
            scope.relations = false;
            scope.show = true;
            if(scope.showRelations){
                scope.relations = Entries.returnLessVariableUsages(scope.variable.title);

            }else{
                scope.variable = Entries.getComponentById(scope.variable);
                if(! scope.variable){
                    scope.show = false;
                }
                console.log(scope.relations);

            }

            scope.getStateAlert = function(s){
                return Entries.getStateAlert(s);
            };
        }


    };
});
