angular.module('uiKitchenSink').controller('ContentController', function($scope,  $routeParams, Entries, $timeout) {
    $scope.onAreaSelected = function (event,id) {
        console.log(event,id);
        $scope.onViewChange("left");

        $timeout(function() {
            if(!$( ".il-column-sortable" ).sortable( "instance" )){

                $(function() {
                    $( ".il-column-sortable" ).sortable({
                        connectWith: ".il-column-sortable",
                        handle: ".il-panel-sortable",
                        cancel: ".il-panel-sortable-toggle",
                        placeholder: "il-panel-sortable-placeholder",
                        appendTo: ".container-fluid",
                        helper: "clone"
                    });
                });
            }
            console.log( $( ".il-column-sortable" ).sortable( "instance" ));
            $( ".il-column-sortable" ).sortable( "enable" );

        },10);
    };

    $scope.openCurrentSidebar = function(position){
        console.log(position);
        console.log();
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

});



