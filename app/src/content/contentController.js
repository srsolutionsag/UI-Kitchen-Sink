angular.module('uiKitchenSink').controller('ContentController', function($scope,  $routeParams, Entries, $timeout) {
    $scope.contentClasses = {};

    $scope.contentClasses.full = {
        id:     "full",
        left:   "il-sidebar il-sidebar-left il-sidebar-minified",
        center: "il-content-center il-content-center-full",
        right:  "il-sidebar il-sidebar-right il-sidebar-minified"
    };
    $scope.contentClasses.three = {
        id:     "three",
        left:   "il-sidebar il-sidebar-left il-sidebar-open",
        center: "il-content-center il-content-center-three",
        right:  "il-sidebar il-sidebar-right il-sidebar-open"
    };
    $scope.contentClasses.left = {
        id:     "left",
        left:   "il-sidebar il-sidebar-left il-sidebar-open",
        center: "il-content-center il-content-center-left",
        right:  "il-sidebar il-sidebar-right il-sidebar-minified"
    };
    $scope.contentClasses.right = {
        id:     "right",
        left:    "il-sidebar il-sidebar-left il-sidebar-minified",
        center:  "il-content-center il-content-center-right",
        right:   "il-sidebar il-sidebar-right il-sidebar-open"
    };

    $scope.contentClasses.current = $scope.contentClasses.full;

    $scope.onViewChange = function(type){
        switch(type){
            case "full":
                $scope.contentClasses.current = $scope.contentClasses.full;
                break;
            case "left":
                $scope.contentClasses.current = $scope.contentClasses.left;
                break;
            case "right":
                $scope.contentClasses.current = $scope.contentClasses.right;
                break;
            case "three":
                $scope.contentClasses.current = $scope.contentClasses.three;
                break;

        }

    };

    $scope.openCurrentSidebar = function(position){
        if(position=='left'){
            return $scope.openLeftSidebar();
        }else{
            return $scope.openRightSidebar();
        }
    };

    $scope.isCurrentSidebarOpen = function(position){
        if(position=='left'){
            return $scope.isLeftSidebarOpen();
        }else{
            return $scope.isRightSidebarOpen();
        }
    };

    $scope.isLeftSidebarOpen = function(){
        return $scope.contentClasses.current.id=="left"||$scope.contentClasses.current.id=="three";
    };

    $scope.isRightSidebarOpen = function(){
        return $scope.contentClasses.current.id=="right"||$scope.contentClasses.current.id=="three";
    };

    $scope.toggleSidebar = function(position){
        if(position=='left'){
            $scope.toggleLeftSidebar();
        }else{
            $scope.toggleRightSidebar();
        }
    };
    $scope.toggleLeftSidebar = function(){
        if($scope.isLeftSidebarOpen()){
            $scope.closeLeftSidebar();
        }else{
            $scope.openLeftSidebar();
        }
    };

    $scope.toggleRightSidebar = function(){
        if($scope.isRightSidebarOpen()){
            $scope.closeRightSidebar();
        }else{
            $scope.openRightSidebar();
        }
    };

    $scope.closeLeftSidebar = function(){
        if($scope.isRightSidebarOpen()){
            $scope.onViewChange("right");
        }else{
            $scope.onViewChange("full");
        }
    };
    $scope.openLeftSidebar = function(){
        if($scope.isRightSidebarOpen()){
            $scope.onViewChange("three");
        }else{
            $scope.onViewChange("left");
        }
    };
    $scope.closeRightSidebar = function(){
        if($scope.isLeftSidebarOpen()){
            $scope.onViewChange("left");
        }else{
            $scope.onViewChange("full");
        }
    };
    $scope.openRightSidebar = function(){
        if($scope.isLeftSidebarOpen()){
            $scope.onViewChange("three");
        }else{
            $scope.onViewChange("right");
        }
    };
    Entries.promisedData().then(function(){
        $scope.doRouting();
    });
});



