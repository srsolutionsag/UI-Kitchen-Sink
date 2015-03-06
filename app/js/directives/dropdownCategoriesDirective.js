module.directive('dropdownCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            category : '='
        },
        transclude: true,
        templateUrl: 'app/views/dropdownCategories.html',
        replace: true
    };
});