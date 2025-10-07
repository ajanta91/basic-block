import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { images, columns, gutter, enableLightbox, borderRadius, hoverEffect } = attributes;
  const blockProps = useBlockProps.save({
    className: 'bb-image-gallery-wrapper',
    style: {
      '--bb-columns': columns,
      '--bb-gutter': gutter + 'px',
      '--bb-radius': borderRadius + 'px'
    },
    'data-lightbox': enableLightbox ? '1' : '0',
    'data-hover': hoverEffect
  });

  if (!images?.length) {
    return <div {...blockProps} />;
  }

  return (
    <div {...blockProps}>
      <div className="bb-image-gallery">
        {images.map((img, i) => {
          const content = (
            <img src={img.url} alt={img.alt || ''} />
          );
          return (
            <figure key={img.id || i} className="bb-image-gallery-item">
              {enableLightbox ? (
                <a href={img.full || img.url} className="bb-gallery-link" data-mfp="image">{content}</a>
              ) : content}
              {img.caption && <figcaption className="bb-caption">{img.caption}</figcaption>}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
