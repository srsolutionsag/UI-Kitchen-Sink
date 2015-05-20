module.directive('explorer', function () {
    return {
        restrict: 'AEC',
        scope: {
        },
        templateUrl: 'app/src/content/sidebars/blocks/explorer/explorer.tpl.html',
        replace: true,
        link: function(scope, element){
            $(document).ready(function () {
                $('.il-explorer').jstree({
                    "core" : {
                        "animation" : 0,
                        "themes" : { "stripes" : false }
                    },
                    "plugins" : [
                         "wholerow"
                    ]
                });
                $('.il-explorer').on("changed.jstree", function (e, data) {
                    console.log(data.selected);
                });
            });
        }
    };
});