module.directive('search', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            categories:'@',
            itemgroups: '@',
            items: '@'
        },
        templateUrl: 'app/views/search/search.html',
        replace: true,
        link: function (scope, element) {
            scope.categories = ["test1","test2"];
            $(".js-example-basic-single").select2();
        }
    };
});
