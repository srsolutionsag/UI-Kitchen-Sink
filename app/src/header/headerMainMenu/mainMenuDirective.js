module.directive('mainMenu', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/src/header/headerMainMenu/mainMenu.tpl.html',
        replace: true
    };
});