module.directive('dropdownEntry', function () {
    return {
        restrict: 'AEC',
        scope: {
            entry : '=',
            categoryIndex:'=',
            index:'=',
            onEntrySelected:"&"
        },
        templateUrl: '/public/src/views/dropdownEntry.html',
        replace: true,
    };
});
