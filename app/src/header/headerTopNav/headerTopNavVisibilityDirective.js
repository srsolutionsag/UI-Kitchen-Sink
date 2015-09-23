module.directive('headerTopNavVisibity', function (Entries, $location, $rootScope) {
    return {
        restrict: 'AEC',
        scope: {},
        templateUrl: 'app/src/header/headerTopNav/headerTopNavVisibility.tpl.html',
        replace: true,
        link: function(scope, element){
            scope.activeItem = 'all';
            scope.changeVisibility = function(visibility){
                Entries.changeVisibility(visibility);
                scope.activeItem = visibility;
                $location.path("/content/information/informationOverview");
                $rootScope.$broadcast('visibilityChange');

            };
        }
    };
});