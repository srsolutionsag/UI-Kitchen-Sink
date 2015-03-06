module.directive('dropdownContent', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/views/dropdown/dropdownContent.html',
        replace: true
    };
});