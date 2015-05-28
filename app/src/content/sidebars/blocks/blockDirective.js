module.directive('block', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            id:'@',
            icon: '@',
            title: '@',
            isSidebarOpenFn: '&',
            onBlockClickedFn: '&'
        },
        templateUrl: 'app/src/content/sidebars/blocks/block.tpl.html',
        replace: true,
        transclude: true,
        link: function(scope, element){
            scope.collapseId = "collapse-sidebar-block-"+scope.id;
            scope.collapseContentId = "collapse-sidebar-block-content"+scope.id;
            var isOpening = 0;

            scope.onClick = function(event){
                isOpening = element.parents('.il-sidebar-minified').length;
                scope.onBlockClickedFn();
            };

            scope.onBlockHeadingClicked = function($event){
                if(!scope.isSidebarOpenFn()){
                    scope.onToggleSidebar();
                }
            };

            $timeout(function(){$("#"+scope.collapseId).on('hide.bs.collapse',function(e){
                if(isOpening){
                    e.preventDefault();
                }
                isOpening = 0;
            });});

            scope.isContentShowable = function(){
                if (element.parents('.il-sidebar-left').length) {
                    return scope.isSidebarOpenFn({position:'left'});
                }else{
                    return scope.isSidebarOpenFn({position:'right'});
                }
            };
        }
    };
});