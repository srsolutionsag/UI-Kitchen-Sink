module.directive('sidebar', function () {
    return {
        restrict: 'AEC',
        scope: {

        },
        templateUrl: 'app/views/sidebar/sidebar.html',
        replace: true,
        link: function(scope, element){
            $(document).ready(function () {
                console.log("test");
                var trigger = $('.hamburger'),
                    overlay = $('.overlay'),
                    isClosed = false;

                trigger.click(function () {
                    hamburger_cross();
                });

                function hamburger_cross() {
                    console.log("hamburger_cross");
                    if (isClosed === true) {
                        overlay.hide();
                        trigger.removeClass('is-open');
                        trigger.addClass('is-closed');
                        isClosed = false;
                    } else {
                        overlay.show();
                        trigger.removeClass('is-closed');
                        trigger.addClass('is-open');
                        isClosed = true;
                    }
                }

                $('[data-toggle="offcanvas"]').click(function () {
                    console.log("offcanvas");
                    $('#wrapper').toggleClass('toggled');
                });
            });
        }
    };
});