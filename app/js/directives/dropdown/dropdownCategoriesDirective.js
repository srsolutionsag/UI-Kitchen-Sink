module.directive('dropdownCategories', function () {
    return {
        restrict: 'AEC',
        scope: {
            title : '@'
        },
        transclude: true,
        templateUrl: 'app/views/dropdown/dropdownCategories.html',
        replace: true
    };
});