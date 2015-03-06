angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'app/views/content.html',
			controller: 'ContentController',
            resolve: {
                initializeData: function($q, $timeout, Entries) {
                    return Entries.promisedData();
                }
            }

		});
	$locationProvider.html5Mode(true);

}]);