module.directive('entryContent', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            entry:'=',
            index: '@',
            tabPath: '@'
        },
        templateUrl: 'app/views/entry/entryContent.html',
        replace: true,
        link: function (scope, element) {
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
