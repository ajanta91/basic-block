(function($) {
    /** Object base function */
    var WpNonceBlocks = {
        init: function() {
            this.countdown();
        },
        countdown: function() {
            $('.bb-tick').each(function(e) {
                console.log('checking', e);
                
                function handleTickInit(tick) {
                    var nextYear = new Date().getFullYear() + 1;
                    Tick.count.down(nextYear + '-01-01').onupdate = function (value) {
                        tick.value = value;
                    };
                }
            });
        }
    };

    $(document).ready(function() {
        WpNonceBlocks.init();
    });



})(jQuery);