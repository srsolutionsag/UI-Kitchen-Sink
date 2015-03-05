angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: '/public/src/views/content.html',
			controller: 'ContentController'

		})
	$locationProvider.html5Mode(true);

}]);