(function ($) {
	'use strict';

	// Gallery Class
	class BBImageGallery {
		constructor(element) {
			this.$wrapper = $(element);
			this.$grid = this.$wrapper.find('.bb-image-gallery-grid');
			this.layout = this.$wrapper.hasClass('bb-layout-masonry') ? 'masonry' : 'grid';
			this.enableLightbox = this.$wrapper.data('lightbox') === '1';

			this.init();
		}

		init() {
			const self = this;

			// Wait for images to load before initializing
			if (typeof imagesLoaded === 'function') {
				imagesLoaded(this.$grid[0], function () {
					self.onImagesLoaded();
				});
			} else {
				// Fallback - wait for window load
				$(window).on('load', function () {
					self.onImagesLoaded();
				});
				// Also try immediately for cached images
				this.onImagesLoaded();
			}
		}

		onImagesLoaded() {
			this.$wrapper.addClass('bb-images-loaded');
			this.initLightbox();
		}

		initLightbox() {
			if (!this.enableLightbox) {
				return;
			}

			// Check if Magnific Popup is available
			if (typeof $.fn.magnificPopup !== 'function') {
				console.warn('Magnific Popup not loaded');
				return;
			}

			const $gallery = this.$grid;

			if ($gallery.data('mfp-initialized')) {
				return;
			}

			$gallery.data('mfp-initialized', true);

			$gallery.magnificPopup({
				delegate: 'a.bb-gallery-link',
				type: 'image',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [1, 2],
					arrowMarkup:
						'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
					tPrev: 'Previous',
					tNext: 'Next',
					tCounter: '<span class="mfp-counter">%curr% / %total%</span>',
				},
				mainClass: 'mfp-fade mfp-gallery bb-mfp-gallery',
				removalDelay: 300,
				image: {
					verticalFit: true,
					titleSrc: function (item) {
						const $item = item.el.closest('.bb-image-gallery-item');
						const title = $item.find('.bb-gallery-title').text();
						const caption =
							$item.find('.bb-gallery-caption').text() ||
							$item.find('.bb-caption-below').text();

						let result = '';
						if (title) {
							result += '<strong class="mfp-title-text">' + title + '</strong>';
						}
						if (caption) {
							result +=
								(title ? '<br>' : '') +
								'<span class="mfp-caption-text">' +
								caption +
								'</span>';
						}
						return result;
					},
				},
				callbacks: {
					open: function () {
						$('body').addClass('bb-lightbox-open');
					},
					close: function () {
						$('body').removeClass('bb-lightbox-open');
					},
				},
				zoom: {
					enabled: true,
					duration: 300,
					easing: 'ease-in-out',
				},
			});
		}
	}

	// Initialize galleries on document ready
	$(document).ready(function () {
		$('.bb-image-gallery-wrapper').each(function () {
			new BBImageGallery(this);
		});
	});
})(jQuery);
