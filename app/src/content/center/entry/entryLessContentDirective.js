module.directive('entryLessContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            item:'='
        },
        templateUrl: 'app/src/content/center/entry/entryLessContent.tpl.html',
        replace: false,
        link: function (scope, element) {

        }
    };
});
