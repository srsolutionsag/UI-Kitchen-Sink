$(function () {
    il.dateTimePickerSettings = {
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'bottom'
        },
        showTodayButton: true,
        toolbarPlacement: 'top',
        format : 'DD/MM/YYYY HH:mm',
        showClose: false,
        allowInputToggle: true
    };

    $('#bs-date-time-picker-from').datetimepicker(
        il.dateTimePickerSettings
    );
    $('#bs-date-time-picker-to').datetimepicker(
        il.dateTimePickerSettings
    );

    $('#bs-date-time-picker-from').on("dp.change", function (e) {
        $('#bs-date-time-picker-to').data("DateTimePicker").minDate(e.date);
    });
});
