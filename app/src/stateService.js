angular.module('uiKitchenSink').factory('state', function () {
    this.getStateAlert = function (state) {
        switch(state){
            case "Empty":
            case "Deprecated":
                return "danger";
            case "Proposal":
            case "Concept":
                return "warning";
            case "Version 5.2":
                return "info";
            case "Implemented":
                return "success";
            default:
                return "danger";
        }
    };

    return this;
});