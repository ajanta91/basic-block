import { __ } from '@wordpress/i18n';
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  Button,
  __experimentalUnitControl as UnitControl,
  Notice
} from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function Edit({ attributes, setAttributes }) {
  const { images, columns, gutter, enableLightbox, imageSize, borderRadius, hoverEffect } = attributes;

  const blockProps = useBlockProps({
    className: 'bb-image-gallery-editor',
    style: {
      '--bb-columns': columns,
      '--bb-gutter': gutter + 'px',
      '--bb-radius': borderRadius + 'px'
    }
  });

  const onSelectImages = (media) => {
    if (!media || !media.length) return;
    const mapped = media.map((m) => ({
      id: m.id,
      url: m.sizes?.[imageSize]?.url || m.url,
      full: m.url,
      alt: m.alt || '',
      caption: m.caption || ''
    }));
    setAttributes({ images: mapped });
  };

  const updateImage = (index, key, value) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [key]: value };
    setAttributes({ images: newImages });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setAttributes({ images: newImages });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Layout', 'basic-block')} initialOpen={true}>
          <RangeControl
            label={__('Columns', 'basic-block')}
            value={columns}
            onChange={(value) => setAttributes({ columns: value })}
            min={1}
            max={8}
          />
          <RangeControl
            label={__('Gutter (px)', 'basic-block')}
            value={gutter}
            onChange={(value) => setAttributes({ gutter: value })}
            min={0}
            max={60}
          />
          <RangeControl
            label={__('Border Radius (px)', 'basic-block')}
            value={borderRadius}
            onChange={(value) => setAttributes({ borderRadius: value })}
            min={0}
            max={50}
          />
          <SelectControl
            label={__('Hover Effect', 'basic-block')}
            value={hoverEffect}
            options={[
              { label: __('Zoom', 'basic-block'), value: 'zoom' },
              { label: __('None', 'basic-block'), value: 'none' }
            ]}
            onChange={(value) => setAttributes({ hoverEffect: value })}
          />
        </PanelBody>
        <PanelBody title={__('Images', 'basic-block')} initialOpen={false}>
          <SelectControl
            label={__('Image Size (preview)', 'basic-block')}
            value={imageSize}
            options={[
              { label: 'Thumbnail', value: 'thumbnail' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' },
              { label: 'Full', value: 'full' },
            ]}
            onChange={(value) => setAttributes({ imageSize: value })}
          />
          <ToggleControl
            label={__('Enable Lightbox', 'basic-block')}
            checked={enableLightbox}
            onChange={(value) => setAttributes({ enableLightbox: value })}
          />
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImages}
              allowedTypes={ALLOWED_MEDIA_TYPES}
              gallery
              multiple
              value={images.map(img => img.id)}
              render={({ open }) => (
                <Button variant="primary" onClick={open}>
                  {images?.length ? __('Replace Images', 'basic-block') : __('Select Images', 'basic-block')}
                </Button>
              )}
            />
          </MediaUploadCheck>
          {!images.length && <Notice status="info" isDismissible={false}>{__('No images selected yet.', 'basic-block')}</Notice>}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} data-hover={hoverEffect}>        
        <div className="bb-image-gallery-grid">
          {images?.length ? (
            images.map((img, i) => (
              <figure key={img.id || i} className="bb-image-gallery-item">
                <div className="bb-image-wrapper">
                  <img src={img.url} alt={img.alt} />
                </div>
                <div className="bb-image-actions">
                  <Button size="small" variant="secondary" onClick={() => removeImage(i)}>{__('Remove', 'basic-block')}</Button>
                </div>
              </figure>
            ))
          ) : (
            <div className="bb-image-gallery-placeholder">{__('Select images to build your gallery.', 'basic-block')}</div>
          )}
        </div>
      </div>
    </>
  );
}