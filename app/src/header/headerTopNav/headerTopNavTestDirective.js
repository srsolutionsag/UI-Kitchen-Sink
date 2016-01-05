module.directive('headerTopNavTest', function (Entries) {
    return {
        restrict: 'AEC',
        scope: {},
        templateUrl: 'app/src/header/headerTopNav/headerTopNavTest.tpl.html',
        replace: true,
        link: function(scope, element){
            var runner = runUITests(Entries);

            console.log("INIT");
            $('html').on('click', function(e) {
                console.log("CLICK");
                runner.processClick(e);
            });

            scope.runTestingClick = function(){
                runner.run("click");
            };
        }
    };
});