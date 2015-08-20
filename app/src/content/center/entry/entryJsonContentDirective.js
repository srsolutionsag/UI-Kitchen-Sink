module.directive('entryJsonContent', function ($http,state) {
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

            scope.stateType = state.getStateAlert(scope.entry.state);


            scope.htmlPath = scope.tabPath+'/'+scope.entry.id+'.html';
            $http.get(scope.htmlPath)
                .success(function(data) {
                    if(data.indexOf("<span ng-non-bindable>")>-1){
                        data = data.replace("<span ng-non-bindable>", "");
                        data =data.slice(0,data.length-7);
                    }
                    scope.htmlCode = data;
                })
                .error(function() {
                    console.log('could not find '+scope.htmlPath);
                });

            scope.lessPath = scope.tabPath+'/'+scope.entry.id+'.less';
            $http.get(scope.lessPath)
                .success(function(data) {
                    scope.lessCode = data;
                })
                .error(function() {
                    console.log('could not find '+scope.lessPath);
                });

            scope.jsPath = scope.tabPath+'/'+scope.entry.id+'.js';
            $http.get(scope.jsPath)
                .success(function(data) {
                    scope.jsCode = data;
                })
                .error(function() {
                    console.log('could not find '+scope.jsPath);
                });
            scope.jsVariables = scope.tabPath+'/'+scope.entry.id+'.variables.less';
            $http.get(scope.jsVariables)
                .success(function(data) {
                    scope.lessVariables = data;
                })
                .error(function() {
                    console.log('could not find '+scope.jsVariables);
                });

            scope.onHtmlLoaded = function(){
                $.getScript(scope.jsPath, function(){});
            };
        }
    };
});
