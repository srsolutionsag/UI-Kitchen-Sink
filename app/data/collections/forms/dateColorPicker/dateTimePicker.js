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

    $('#bs-date-time-picker').datetimepicker(
        il.dateTimePickerSettings
    );
});