angular.module('uiKitchenSink').factory('state', function () {
    this.getStateAlert = function (state) {
        switch(state){
            case "Proposal":
            case "Concept":
                return "warning";
            case "Accepted":
                return "info";
            case "Implemented for 5.0":
            case "Implemented for 5.1":
            case "Implemented for 5.2":
                return "success";
            default:
                return "danger";
        }
    };

    return this;
});