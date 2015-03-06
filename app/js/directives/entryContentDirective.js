module.directive('entryContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            entry:'=',
            index: '='
        },
        templateUrl: 'app/views/entryContent.html',
        replace: true
    };
});
