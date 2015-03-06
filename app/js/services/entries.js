angular.module('uiKitchenSink').factory('Entries', function ($http,$q,$rootScope) {
    var self = this;
    //Load the data from JSON from Server
    this.jsonPath =  '/app/data/entries.json';
    this.promisedData = function() {
        var defer = $q.defer();

        $http.get(this.jsonPath)
            .success(function(data) {
                angular.extend(self, data);
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find '+self.jsonPath);
            });

        return defer.promise;
    };

    this.changeSelection = function (categoryIndex,subCategoryIndex,tabIndex) {
        this.categoryIndexSelected = categoryIndex;
        this.subCategoryIndexSelected = subCategoryIndex;
        this.tabIndexSelected = tabIndex;
        $rootScope.$broadcast('changeSelection', categoryIndex,subCategoryIndex,tabIndex);
    };

    return this;
});