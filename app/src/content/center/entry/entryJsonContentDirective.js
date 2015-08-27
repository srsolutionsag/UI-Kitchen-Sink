module.directive('entryJsonContent', function ($http,state,$timeout) {
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


            if(scope.entry.lessVariables && scope.entry.lessVariables.length === 0){
                scope.entry.lessVariables = undefined;
            }
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


            scope.onHtmlLoaded = function(){
                $.getScript(scope.jsPath, function(){});
            };
            scope.addCSSToIframe = function(counts){
                $timeout(function(){
                    if(scope.entry.isIframe){
                        $('#'+scope.index+'-iframe-example').load(function(){
                            console.log("loading iframe");
                        });
                        if($('#'+scope.index+'-iframe-example').contents().find("body").html() !== undefined && $('#'+scope.index+'-iframe-example').contents().find("body").html() !== ""){
                            $('#'+scope.index+'-iframe-example').contents().find("head").append('<link href="/app/static/css/app.css" rel="stylesheet" type="text/css" />');
                            //$('#'+scope.index+'-iframe-example').contents().find("body").append('<script src="/libs/jquery/dist/jquery.js"></script>');
                            //$('#'+scope.index+'-iframe-example').contents().find("body").append('<script src="/libs/bootstrap/dist/js/bootstrap.js"></script>');
                            //$('#'+scope.index+'-iframe-example').contents().find("body").append('<script>$("#testing").html("test")</script>');
                            return;
                        }
                        if(counts > 0){
                            scope.addCSSToIframe(counts-1);
                        }
                    }
                },25);
            };

            scope.addCSSToIframe(100);

        }
    };
});
