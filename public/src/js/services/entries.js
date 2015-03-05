angular.module('uiKitchenSink').factory('Entries', function ($http) {
    return $http.get('/app/data/entries.json');
});