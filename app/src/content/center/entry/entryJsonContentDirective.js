module.directive('entryJsonContent', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            entry:'=',
            index: '@',
            tabPath: '@'
        },
        templateUrl: 'app/src/content/center/entry/entryJsonContent.tpl.html',
        replace: false,
        link: function (scope, element) {
            if(scope.entry.state === undefined){
                scope.entry.state = "Empty";
            }
            scope.stateType = "success";

            switch(scope.entry.state){
                case "Empty":
                case "Concept":
                    scope.stateType = "danger";
                    break;
                case "Proposal":
                    scope.stateType = "warning";
                    break;
                case "Implemented":
                    scope.stateType = "info";
                    break;
                default:
                    scope.stateType = "success";
            }

            scope.path = scope.tabPath+'/'+scope.entry.id+'.html';
            $http.get(scope.path)
                .success(function(data) {
                    if(data.indexOf("<span ng-non-bindable>")>-1){
                        data = data.replace("<span ng-non-bindable>", "");
                        data =data.slice(0,data.length-7);
                    }
                    scope.htmlCode = data;
                })
                .error(function() {
                    console.log('could not find '+scope.path);
                });
        }
    };
});
