(function($){
  function initGallery($root){
    if(!$root.length) return;
    if(typeof $.fn.magnificPopup !== 'function') return;
    $root.find('.bb-image-gallery').each(function(){
      const $gallery = $(this);
      if($gallery.data('mfp-initialized')) return;
      $gallery.data('mfp-initialized', true);
      $gallery.magnificPopup({
        delegate: 'a.bb-gallery-link',
        type: 'image',
        gallery: { enabled: true },
        mainClass: 'mfp-fade'
      });
    });
  }
  $(document).ready(function(){
    $('.bb-image-gallery-wrapper[data-lightbox="1"]').each(function(){ initGallery($(this)); });
  });
})(jQuery);
