module.directive('block', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            id:'@',
            icon: '@',
            title: '@',
            isSidebarOpenFn: '&'
        },
        templateUrl: 'app/src/content/sidebars/blocks/block.tpl.html',
        replace: true,
        transclude: true,
        link: function(scope, element){
            scope.collapseId = "collapse-sidebar-block-"+scope.id;
            scope.collapseContentId = "collapse-sidebar-block-content"+scope.id;

            $timeout(function(){$("#"+scope.collapseId).on('hide.bs.collapse',function(){
                console.log(scope.isContentShowable());
                if(!scope.isContentShowable()){
                    e.preventDefault();
                }
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