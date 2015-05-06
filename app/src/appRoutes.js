angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/home', {
			templateUrl: 'app/src/content/home.html',
            controller: 'HeaderController',
            resolve: {
                initializeData: function($q, $timeout, Entries) {
                    return Entries.promisedData();
                }
            }
		})
        .when('/content/:categoryIndex?/:subCategoryIndex?/:itemGroupIndex?', {
            templateUrl: 'app/src/content/center/centerContent.tpl.html',
            controller: 'CenterContentController',
            resolve: {
                initializeData: function($q, $timeout, Entries) {
                    return Entries.promisedData();
                }
            }

        })
        .otherwise({
            redirectTo: '/home'
        });
}]);