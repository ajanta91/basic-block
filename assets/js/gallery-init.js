(function($){
	$(function(){
		if($('.wp-block-basic-block-image-gallery .mfp-gallery').length){
			$('.wp-block-basic-block-image-gallery .mfp-gallery').each(function(){
				$(this).magnificPopup({
					delegate: 'a',
					type: 'image',
					gallery: { enabled: true },
					mainClass: 'mfp-fade'
				});
			});
		}
	});
})(jQuery);
