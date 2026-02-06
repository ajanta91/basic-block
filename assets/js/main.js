(function($) {
    /** Object base function */
    var WpNonceBlocks = {
        init: function() {
           // this.countdown();
        },
        countdown: function() {
            $('.bb-tick').each(function(index, element) {
                let wrapper = element.closest('.bb-countdown-wrapper');
                let targetDate = wrapper.dataset.targetDate;
                let targetTime = wrapper.dataset.targetTime;
                let expiryAction = wrapper.dataset.expiryAction;
                let expiryMessage = wrapper.dataset.expiryMessage;
                let expiryRedirectUrl = wrapper.dataset.expiryRedirect;
                let countdownStyle = element.dataset.countdownStyle;
                
                Tick.count.down(targetDate + ' ' + targetTime).onupdate = function (value) {
                    Tick.value = value;
                    console.log('value', value);
                };
                
            });
        }
    };

    $(document).ready(function() {
        WpNonceBlocks.init();
    });



})(jQuery);