module.directive('explorer', function () {
    return {
        restrict: 'AEC',
        scope: {

        },
        templateUrl: 'app/views/explorer/explorer.html',
        replace: true,
        link: function(scope, element){
            $(document).ready(function () {
                $('#html1').jstree();
                $('#html1').on("changed.jstree", function (e, data) {
                    console.log(data.selected);
                });
            });
        }
    };
});