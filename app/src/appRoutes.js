angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider) {

	$routeProvider
        .when('/content/:categoryId?/:subCategoryId?/:itemGroupId?/:itemId?', {
            templateUrl: 'app/src/content/content.tpl.html',
            controller: 'ContentController',
            resolve: {
                initializeData: function($q, $timeout, Entries) {
                    return Entries.promisedData();
                }
            }

        })
        .otherwise({
            redirectTo: '/content/'
        });
}]);