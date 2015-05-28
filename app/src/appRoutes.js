angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
        .when('/content/:categoryIndex?/:subCategoryIndex?/:itemGroupIndex?', {
            templateUrl: 'app/src/content/content.tpl.html',
            controller: 'ContentController',
            resolve: {
                initializeData: function($q, $timeout, Entries) {
                    return Entries.promisedData();
                }
            }

        })
        .otherwise({
            redirectTo: '/content/0/0/0'
        });
}]);