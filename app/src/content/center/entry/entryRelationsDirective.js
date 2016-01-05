module.directive('entryRelations', function ($http,Entries) {
    return {
        restrict: 'AEC',
        scope: {
            entry:'='
        },
        templateUrl: 'app/src/content/center/entry/entryRelations.tpl.html',
        replace: true,
        link: function (scope, element) {
        }

    };
});
