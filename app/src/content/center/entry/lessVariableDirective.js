module.directive('lessVariable', function (state, Entries) {
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
            scope.getStateAlert = function(s){
                return state.getStateAlert(s);
            };
            if(scope.showRelations){
                scope.relations = Entries.returnLessVariableUsages(scope.variable.title);

            }
        }
    };
});
