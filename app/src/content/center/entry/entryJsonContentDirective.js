module.directive('entryJsonContent', function ($http,Entries,$timeout) {
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
            console.log(scope.entry.lessVariables);
            if(scope.entry.state === undefined){
                scope.entry.state = "Empty";
            }
            scope.entry.fullRelations  = Entries.getComponentRelations(scope.entry);
            scope.stateType = "success";
            scope.renderHtml = true;

            scope.stateType = Entries.getStateAlert(scope.entry.state);

            if(!scope.entry.translations || !scope.entry.translations.german.title){
                scope.entry.translations = {};
                scope.entry.translations.german = {};
                scope.entry.translations.german.title = scope.entry.title;
            }

            if(scope.entry.lessVariables && scope.entry.lessVariables.length === 0){
                scope.entry.lessVariables = undefined;
            }

            if(scope.entry.type == "abstract" || scope.entry.type == "png"){
                scope.renderHtml = false;
            }

            var basePath = scope.tabPath+'/'+scope.entry.id;
            scope.pngPath = '/'+basePath+".png";
            if(scope.entry.description == "external"){
                scope.descriptionPath = basePath +'.description.html';

                $http.get(scope.descriptionPath)
                    .success(function(data) {
                        scope.entry.description = data;
                    })
                    .error(function() {
                        console.log('could not find '+scope.htmlPath);
                    });
            }
            if(scope.entry.context == "external"){
                scope.contextPath = basePath +'.context.html';

                $http.get(scope.contextPath)
                    .success(function(data) {
                        scope.entry.context = data;
                    })
                    .error(function() {
                        console.log('could not find '+scope.htmlPath);
                    });
            }

            scope.htmlPath = basePath+'.html';
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

            scope.lessPath = basePath+'.less';
            $http.get(scope.lessPath)
                .success(function(data) {
                    scope.lessCode = data;
                })
                .error(function() {
                    console.log('could not find '+scope.lessPath);
                });

            scope.jsPath = basePath+'.js';
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
