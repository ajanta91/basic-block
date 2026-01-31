(function ($) {
  "use strict";

  var bbGallery = {
    init: function () {
      bbGallery.initMasonry();
      bbGallery.initLightbox();
    },

    initMasonry: function () {
      // Only initialize for masonry layout galleries
      var $galleries = $(".bb-image-gallery-wrapper.bb-layout-masonry");

      if (!$galleries.length) {
        return;
      }

      $galleries.each(function () {
        var $wrapper = $(this);
        var $grid = $wrapper.find(".bb-gallery-grid");

        if (!$grid.length) {
          return;
        }

        // Wait for images to load before initializing Isotope
        $grid.imagesLoaded(function () {
          $grid.isotope({
            itemSelector: ".bb-grid-item",
            columnWidth: ".grid-sizer",
            gutter: ".gutter-sizer",
            percentPosition: true,
            layoutMode: "masonry",
            masonry: {
              columnWidth: ".grid-sizer",
              gutter: ".gutter-sizer",
            },
          });
        });

        // Re-layout on window resize (debounced)
        var resizeTimer;
        $(window).on("resize", function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            $grid.isotope("layout");
          }, 150);
        });
      });
    },

    initLightbox: function () {
      var $galleries = $(".bb-image-gallery-wrapper[data-lightbox='1']");

      if (!$galleries.length) {
        return;
      }

      $galleries.each(function () {
        var $wrapper = $(this);
        var $links = $wrapper.find(".bb-gallery-link");

        if (!$links.length) {
          return;
        }

        $links.magnificPopup({
          type: "image",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            tCounter: "%curr% of %total%",
          },
          mainClass: "bb-mfp-gallery mfp-fade",
          removalDelay: 300,
          callbacks: {
            open: function () {
              $("body").addClass("bb-lightbox-open");
            },
            close: function () {
              $("body").removeClass("bb-lightbox-open");
            },
          },
          image: {
            titleSrc: function (item) {
              var $item = item.el.closest(".bb-grid-item");
              var title = $item.find(".bb-gallery-title").text() || "";
              var caption = $item.find(".bb-gallery-caption").text() || "";

              var html = "";
              if (title) {
                html += '<span class="mfp-title-text">' + title + "</span>";
              }
              if (caption) {
                html += '<span class="mfp-caption-text">' + caption + "</span>";
              }
              return html;
            },
          },
        });
      });
    },
  };

  // Initialize on document ready
  $(document).ready(function () {
    bbGallery.init();
  });
})(jQuery);