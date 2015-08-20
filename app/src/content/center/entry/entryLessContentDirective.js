module.directive('entryLessContent', function (state) {
    return {
        restrict: 'AEC',
        scope: {
            item:'='
        },
        templateUrl: 'app/src/content/center/entry/entryLessContent.tpl.html',
        replace: false,
        link: function (scope, element) {
            console.log(scope.item);
            scope.getStateAlert = function(s){
                return state.getStateAlert(s);
            };
        }
    };
});
