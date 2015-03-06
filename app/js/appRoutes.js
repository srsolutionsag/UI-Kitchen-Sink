angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/home', {
			templateUrl: 'app/views/home.html',
            controller: 'HeaderController',
            resolve: {
                initializeData: function($q, $timeout, Entries) {
                    return Entries.promisedData();
                }
            }
		})
        .when('/content', {
            templateUrl: 'app/views/content.html',
            controller: 'ContentController',
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