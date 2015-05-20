module.directive('sidebars', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            position: '@',
            toggleSidebarFn: '&',
            isSidebarOpenFn: '&'
        },
        templateUrl: 'app/src/content/sidebars/sidebars.tpl.html',
        replace: true,
        link: function(scope, element){
            scope.glyphiconStatus = scope.position;

            scope.toggleGlyphiconStatus = function(){
                if(scope.glyphiconStatus=='left'){
                    scope.glyphiconStatus = 'right';
                }else{
                    scope.glyphiconStatus = 'left';
                }
            };

            if(!scope.isSidebarOpenFn()){
                scope.toggleGlyphiconStatus();
            }

            scope.onBlockClicked = function($event){
                if(!scope.isSidebarOpenFn()){
                    scope.onToggleSidebar();
                }
            };

            scope.onToggleSidebar = function(){
                scope.toggleGlyphiconStatus();
                scope.toggleSidebarFn();
            };
            //timeout is needed here since ng-if prevents content to be rendered directly
            $timeout(function() {

                if(!$( ".il-column-sortable" ).sortable( "instance" )){

                    $(function() {
                        $( ".il-column-sortable" ).sortable({
                            connectWith: ".il-column-sortable",
                            cancel: ".il-panel-sortable-toggle",
                            placeholder: "il-panel-sortable-placeholder",
                            appendTo: ".container-fluid",
                            forcePlaceholderSize: true,
                            cursor: "move",
                            helper: function(event,element){
                                return element;
                            }
                        });
                    });
                }
                $( ".il-column-sortable" ).sortable( "enable" );

            },10);

        }
    };
});