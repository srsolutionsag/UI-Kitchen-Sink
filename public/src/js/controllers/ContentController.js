angular.module('uiKitchenSink').controller('ContentController', function($scope, Entries) {
    Entries.success(function(data){
        $scope.categories = data.CompenentsList;
        $scope.categorySelected = {"Index":"Form","Title":"Alerts"};
        $scope.entrySelected = $scope.categories["Form"].Items["Alerts"];
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.categories = ["Error Loading Categories"];
    });

    $scope.onEntrySelected = function (index,category) {
        $scope.categorySelected = {"Index":category,"Title":$scope.categories[category].Title};
        $scope.entrySelected = $scope.categories[category].Items[index];
    };
});