module.directive('dropdownCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            category : '='
        },
        transclude: true,
        templateUrl: '/public/src/views/dropdownCategories.html',
        replace: true
    };
});