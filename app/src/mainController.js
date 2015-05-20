angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
    $scope.contentClasses = {};

    var sidebarOpenXS       = 6;
    var sidebarClosedXS     = 0;

    var sidebarOpenSM       = 3;
    var sidebarClosedSM     = 1;

    var sidebarOpenMD       = 3;
    var sidebarClosedMD     = 1;

    var sidebarOpenLG       = 3;
    var sidebarClosedLG     = 2;


    $scope.contentClasses.full = {
        id:     "full",
        left:   "col-xs-" + sidebarClosedXS + " " +
                "col-sm-" + sidebarClosedSM + " " +
                "col-md-" + sidebarClosedMD + " " +
                "col-lg-" + sidebarClosedLG + " " +
                "il-sidebar il-sidebar-left il-sidebar-minified",
        center: //"col-xs-" + (12-2*sidebarClosedXS) + " col-xs-offset-"+sidebarClosedXS + " " +
                "col-sm-" + (12-2*sidebarClosedSM) + " col-sm-offset-"+sidebarClosedSM + " " +
                "col-md-" + (12-2*sidebarClosedMD) + " col-md-offset-"+sidebarClosedMD + " " +
                "col-lg-" + (12-2*sidebarClosedLG) + " col-lg-offset-"+sidebarClosedLG + " " +
                "il-center-content",
        right:  "col-xs-" + sidebarClosedXS + " " +
                "col-sm-" + sidebarClosedSM + " " +
                "col-md-" + sidebarClosedMD + " " +
                "col-lg-" + sidebarClosedLG + " " +
                "il-sidebar il-sidebar-right il-sidebar-minified"
    };
    $scope.contentClasses.three = {
        id:     "three",
        left:   "col-xs-" + sidebarOpenXS + " " +
                "col-sm-" + sidebarOpenSM + " " +
                "col-md-" + sidebarOpenMD + " " +
                "col-lg-" + sidebarOpenLG + " " +
                "il-sidebar il-sidebar-left il-sidebar-open",
        center:
                "col-xs-" + (12-2*sidebarOpenXS) + " col-xs-offset-"+sidebarOpenXS + " " +
                "col-sm-" + (12-2*sidebarOpenSM) + " col-sm-offset-"+sidebarOpenSM + " " +
                "col-md-" + (12-2*sidebarOpenMD) + " col-md-offset-"+sidebarOpenMD + " " +
                "col-lg-" + (12-2*sidebarOpenLG) + " col-lg-offset-"+sidebarOpenLG + " " +
                "il-center-content",
        right:  "col-xs-" + sidebarOpenXS + " " +
            "col-sm-" + sidebarOpenSM + " " +
            "col-md-" + sidebarOpenMD + " " +
            "col-lg-" + sidebarOpenLG + " " +
            "il-sidebar il-sidebar-right il-sidebar-open"
    };
    $scope.contentClasses.left = {
        id:     "left",
        left:   "col-xs-" + sidebarOpenXS + " " +
                "col-sm-" + sidebarOpenSM + " " +
                "col-md-" + sidebarOpenMD + " " +
                "col-lg-" + sidebarOpenLG + " " +
                "il-sidebar il-sidebar-left il-sidebar-open",
        center:
                "col-xs-" + (12-sidebarOpenXS-sidebarClosedXS) + " col-xs-offset-"+sidebarOpenXS + " " +
                "col-sm-" + (12-sidebarOpenSM-sidebarClosedSM) + " col-sm-offset-"+sidebarOpenSM + " " +
                "col-md-" + (12-sidebarOpenMD-sidebarClosedMD) + " col-md-offset-"+sidebarOpenMD + " " +
                "col-lg-" + (12-sidebarOpenLG-sidebarClosedLG) + " col-lg-offset-"+sidebarOpenLG + " " +
                "il-center-content",
        right:  "col-xs-" + sidebarClosedXS + " " +
                "col-sm-" + sidebarClosedSM + " " +
                "col-md-" + sidebarClosedMD + " " +
                "col-lg-" + sidebarClosedLG + " " +
                "il-sidebar il-sidebar-right il-sidebar-minified"
    };
    $scope.contentClasses.right = {
        id:     "right",
        left:
                "col-xs-" + sidebarClosedXS + " " +
                "col-sm-" + sidebarClosedSM + " " +
                "col-md-" + sidebarClosedMD + " " +
                "col-lg-" + sidebarClosedLG + " " +
                "il-sidebar il-sidebar-left il-sidebar-minified",
        center:
            "col-xs-" + (12-sidebarOpenXS-sidebarClosedXS) + " col-xs-offset-"+sidebarClosedXS + " " +
                "col-sm-" + (12-sidebarOpenSM-sidebarClosedSM) + " col-sm-offset-"+sidebarClosedSM + " " +
                "col-md-" + (12-sidebarOpenMD-sidebarClosedMD) + " col-md-offset-"+sidebarClosedMD + " " +
                "col-lg-" + (12-sidebarOpenLG-sidebarClosedLG) + " col-lg-offset-"+sidebarClosedLG + " " +
                "il-center-content",
        right:
            "col-xs-" + sidebarOpenXS + " " +
            "col-sm-" + sidebarOpenSM + " " +
            "col-md-" + sidebarOpenMD + " " +
            "col-lg-" + sidebarOpenLG + " " +
            "il-sidebar il-sidebar-right il-sidebar-open",

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

    Entries.promisedData().then(function(){
        $scope.doRouting();
    });

    $scope.doRouting = function(){
        if(!$routeParams.categoryIndex){
            $routeParams.categoryIndex = 0;
        }
        if(!$routeParams.subCategoryIndex){
            $routeParams.subCategoryIndex = 0;
        }
        if(!$routeParams.itemGroupIndex){
            $routeParams.itemGroupIndex = 0;
        }
        Entries.changeSelection($routeParams.categoryIndex,$routeParams.subCategoryIndex,$routeParams.itemGroupIndex);
    };
});



