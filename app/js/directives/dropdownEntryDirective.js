module.directive('dropdownEntry', function () {
    return {
        restrict: 'AEC',
        scope: {
            entry : '=',
            categoryIndex:'=',
            index:'=',
            onEntrySelected:"&"
        },
        templateUrl: 'app/views/dropdownEntry.html',
        replace: true
    };
});
