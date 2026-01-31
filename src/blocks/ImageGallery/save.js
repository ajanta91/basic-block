import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		images,
		layout,
		columns,
		columnsTablet,
		columnsMobile,
		gutter,
		enableLightbox,
		imageAspectRatio,
		borderRadius,
		hoverEffect,
		showOverlay,
		overlayColor,
		showTitle,
		showCaption,
		captionPosition,
		titleColor,
		captionColor,
		titleFontSize,
		captionFontSize,
		iconColor,
		iconSize,
		showIcon,
		imageBorderWidth,
		imageBorderColor,
		imageBorderStyle,
		boxShadowHorizontal,
		boxShadowVertical,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
	} = attributes;

	const getBoxShadow = () => {
		if (!boxShadowColor) return 'none';
		return `${boxShadowHorizontal || 0}px ${boxShadowVertical || 0}px ${boxShadowBlur || 0}px ${boxShadowSpread || 0}px ${boxShadowColor}`;
	};

	const blockProps = useBlockProps.save({
		className: `bb-image-gallery-wrapper bb-layout-${layout}`,
		style: {
			'--bb-columns': columns,
			'--bb-columns-tablet': columnsTablet,
			'--bb-columns-mobile': columnsMobile,
			'--bb-gutter': gutter + 'px',
			'--bb-radius': borderRadius + 'px',
			'--bb-overlay-color': overlayColor,
			'--bb-title-color': titleColor,
			'--bb-caption-color': captionColor,
			'--bb-title-size': titleFontSize + 'px',
			'--bb-caption-size': captionFontSize + 'px',
			'--bb-icon-color': iconColor,
			'--bb-icon-size': iconSize + 'px',
			'--bb-border-width': imageBorderWidth ? imageBorderWidth + 'px' : '0',
			'--bb-border-color': imageBorderColor || 'transparent',
			'--bb-border-style': imageBorderStyle || 'none',
			'--bb-box-shadow': getBoxShadow(),
			'--bb-aspect-ratio': imageAspectRatio,
		},
		'data-lightbox': enableLightbox ? '1' : '0',
		'data-hover': hoverEffect,
		'data-overlay': showOverlay ? '1' : '0',
	});

	if (!images?.length) {
		return <div {...blockProps} />;
	}

	return (
		<div {...blockProps}>
			<div className="bb-gallery-grid">
				{/* Isotope sizing elements */}
				<div className="grid-sizer"></div>
				<div className="gutter-sizer"></div>
				{images.map((img, i) => (
					<div key={img.id || i} className="bb-grid-item">
						<div className="bb-image-wrapper">
							{enableLightbox ? (
								<a href={img.full || img.url} className="bb-gallery-link" data-mfp="image">
									<img src={img.url} alt={img.alt || ''} />
								</a>
							) : (
								<img src={img.url} alt={img.alt || ''} />
							)}
							{showOverlay && (
								<div className="bb-gallery-overlay">
									{showIcon && (
										<span className="bb-gallery-icon">
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
												<circle cx="11" cy="11" r="8" />
												<path d="M21 21l-4.35-4.35" />
												<path d="M11 8v6M8 11h6" />
											</svg>
										</span>
									)}
									<div className="bb-gallery-meta">
										{showTitle && img.title && (
											<h4 className="bb-gallery-title">{img.title}</h4>
										)}
										{showCaption && captionPosition === 'overlay' && img.caption && (
											<p className="bb-gallery-caption">{img.caption}</p>
										)}
									</div>
								</div>
							)}
						</div>
						{showCaption && captionPosition === 'below' && img.caption && (
							<figcaption className="bb-caption-below">{img.caption}</figcaption>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
