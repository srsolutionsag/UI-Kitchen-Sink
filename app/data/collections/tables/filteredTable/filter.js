$(function () {
    $('.il-table-filter-item').on('hidden.bs.collapse', function (e) {
        if($('.il-table-filter-items').children(':visible').length == 0) {
            $('.il-table-filter-section').collapse("hide");
        }
    });
    $('.il-table-filter-item').on('shown.bs.collapse', function (e) {
        if(!$(".il-table-filter-items").is(":visible")){
            $('.il-table-filter-section').collapse("show");
        }
    });
});