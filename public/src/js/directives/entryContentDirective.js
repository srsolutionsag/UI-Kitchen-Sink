module.directive('entryContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            entry:'=',
            index: '='
        },
        templateUrl: '/public/src/views/entryContent.html',
        replace: true
    };
});
