module.directive('dropdownEntry', function () {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            index:'@',
            onDropdownEntrySelected:"&"
        },
        templateUrl: 'app/views/dropdown/dropdownEntry.html',
        replace: true
    };
});
