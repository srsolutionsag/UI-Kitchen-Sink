module.directive('sidebars', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            position: '@'
        },
        templateUrl: 'app/src/content/sidebars/sidebars.tpl.html',
        replace: true,
        link: function(scope, element){
            //timeout is needed here since ng-if prevents content to be rendered directly
            $timeout(function() {
                $(function() {
                    $( ".il-column-sortable" ).sortable({
                        connectWith: ".il-column-sortable",
                        handle: ".il-panel-sortable",
                        cancel: ".il-panel-sortable-toggle",
                        placeholder: "il-panel-sortable-placeholder ui-corner-all",
                        appendTo: ".container-fluid",
                        helper: "clone"
                    });

                    $( ".il-panel-sortable" )
                        .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                        .find( ".il-panel-sortable" )
                        .addClass( "ui-widget-header ui-corner-all" )
                        .prepend( "<span class='ui-icon ui-icon-minusthick il-panel-sortable-toggle'></span>");

                    $( ".il-panel-sortable-toggle" ).click(function() {
                        var icon = $( this );
                        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
                        icon.closest( ".il-panel-sortable" ).find( ".il-panel-sortable-content" ).toggle();
                    });
                });
            },10);

        }
    };
});