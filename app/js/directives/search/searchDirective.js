module.directive('search', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            categories:'@',
            itemgroups: '@',
            items: '@'
        },
        templateUrl: 'app/views/search/search.html',
        replace: true,
        link: function (scope, element) {
            scope.categories = ["test1","test2"];
            function format(data,container) {
                console.log(data);
                console.log(container);
                if(data){
                    return data.text + ": <b>test</b>";
                } else{
                    return "";
                }

            }

            $(".select2-append").select2({
                placeholder: "Search Kitchen-Sink",
                allowClear: true,
                formatSelection: format,
                formatResult: format
            });
        }
    };
});
