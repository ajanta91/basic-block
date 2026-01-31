import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	Button,
	Notice,
} from '@wordpress/components';
import { ColorControl } from '../../components/ColorControl/ColorControl';

const ALLOWED_MEDIA_TYPES = ['image'];

const HOVER_EFFECTS = [
	{ label: __('None', 'basic-block'), value: 'none' },
	{ label: __('Zoom In', 'basic-block'), value: 'zoom' },
	{ label: __('Zoom Out', 'basic-block'), value: 'zoom-out' },
	{ label: __('Slide Up', 'basic-block'), value: 'slide-up' },
	{ label: __('Slide Down', 'basic-block'), value: 'slide-down' },
	{ label: __('Slide Left', 'basic-block'), value: 'slide-left' },
	{ label: __('Slide Right', 'basic-block'), value: 'slide-right' },
	{ label: __('Rotate', 'basic-block'), value: 'rotate' },
	{ label: __('Grayscale', 'basic-block'), value: 'grayscale' },
	{ label: __('Blur', 'basic-block'), value: 'blur' },
	{ label: __('Brightness', 'basic-block'), value: 'brightness' },
	{ label: __('Sepia', 'basic-block'), value: 'sepia' },
];

export default function Edit({ attributes, setAttributes }) {
	const {
		images,
		layout,
		columns,
		columnsTablet,
		columnsMobile,
		gutter,
		enableLightbox,
		imageSize,
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

	const blockProps = useBlockProps({
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
	});

	const onSelectImages = (media) => {
		if (!media || !media.length) return;
		const mapped = media.map((m) => ({
			id: m.id,
			url: m.sizes?.[imageSize]?.url || m.url,
			full: m.url,
			alt: m.alt || '',
			caption: m.caption || '',
			title: m.title || '',
		}));
		setAttributes({ images: mapped });
	};

	const removeImage = (index) => {
		const newImages = images.filter((_, i) => i !== index);
		setAttributes({ images: newImages });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Gallery Images', 'basic-block')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImages}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							gallery
							multiple
							value={images.map((img) => img.id)}
							render={({ open }) => (
								<Button variant="primary" onClick={open} style={{ marginBottom: '12px' }}>
									{images?.length
										? __('Edit Gallery', 'basic-block')
										: __('Add Images', 'basic-block')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{!images.length && (
						<Notice status="info" isDismissible={false}>
							{__('No images selected yet. Click "Add Images" to get started.', 'basic-block')}
						</Notice>
					)}
					<SelectControl
						label={__('Image Size', 'basic-block')}
						value={imageSize}
						options={[
							{ label: 'Thumbnail', value: 'thumbnail' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
							{ label: 'Full', value: 'full' },
						]}
						onChange={(value) => setAttributes({ imageSize: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Layout', 'basic-block')} initialOpen={false}>
					<SelectControl
						label={__('Layout Type', 'basic-block')}
						value={layout}
						options={[
							{ label: __('Grid', 'basic-block'), value: 'grid' },
							{ label: __('Masonry', 'basic-block'), value: 'masonry' },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
					<RangeControl
						label={__('Columns (Desktop)', 'basic-block')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={8}
					/>
					<RangeControl
						label={__('Columns (Tablet)', 'basic-block')}
						value={columnsTablet}
						onChange={(value) => setAttributes({ columnsTablet: value })}
						min={1}
						max={6}
					/>
					<RangeControl
						label={__('Columns (Mobile)', 'basic-block')}
						value={columnsMobile}
						onChange={(value) => setAttributes({ columnsMobile: value })}
						min={1}
						max={4}
					/>
					<RangeControl
						label={__('Gap (px)', 'basic-block')}
						value={gutter}
						onChange={(value) => setAttributes({ gutter: value })}
						min={0}
						max={60}
					/>
					{layout === 'grid' && (
						<SelectControl
							label={__('Image Aspect Ratio', 'basic-block')}
							value={imageAspectRatio}
							options={[
								{ label: __('Auto', 'basic-block'), value: 'auto' },
								{ label: __('Square (1:1)', 'basic-block'), value: '1/1' },
								{ label: __('Landscape (4:3)', 'basic-block'), value: '4/3' },
								{ label: __('Landscape (16:9)', 'basic-block'), value: '16/9' },
								{ label: __('Portrait (3:4)', 'basic-block'), value: '3/4' },
								{ label: __('Portrait (9:16)', 'basic-block'), value: '9/16' },
							]}
							onChange={(value) => setAttributes({ imageAspectRatio: value })}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Lightbox', 'basic-block')} initialOpen={false}>
					<ToggleControl
						label={__('Enable Lightbox', 'basic-block')}
						checked={enableLightbox}
						onChange={(value) => setAttributes({ enableLightbox: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Hover Effect', 'basic-block')} initialOpen={false}>
					<SelectControl
						label={__('Hover Effect', 'basic-block')}
						value={hoverEffect}
						options={HOVER_EFFECTS}
						onChange={(value) => setAttributes({ hoverEffect: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Overlay', 'basic-block')} initialOpen={false}>
					<ToggleControl
						label={__('Show Overlay on Hover', 'basic-block')}
						checked={showOverlay}
						onChange={(value) => setAttributes({ showOverlay: value })}
					/>
					{showOverlay && (
						<>
							<ColorControl
								label={__('Overlay Color', 'basic-block')}
								value={overlayColor}
								onChange={(color) => setAttributes({ overlayColor: color })}
							/>
							<ToggleControl
								label={__('Show Icon', 'basic-block')}
								checked={showIcon}
								onChange={(value) => setAttributes({ showIcon: value })}
							/>
							{showIcon && (
								<>
									<ColorControl
										label={__('Icon Color', 'basic-block')}
										value={iconColor}
										onChange={(color) => setAttributes({ iconColor: color })}
									/>
									<RangeControl
										label={__('Icon Size (px)', 'basic-block')}
										value={iconSize}
										onChange={(value) => setAttributes({ iconSize: value })}
										min={16}
										max={64}
									/>
								</>
							)}
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Title & Caption', 'basic-block')} initialOpen={false}>
					<ToggleControl
						label={__('Show Title', 'basic-block')}
						checked={showTitle}
						onChange={(value) => setAttributes({ showTitle: value })}
					/>
					{showTitle && (
						<>
							<ColorControl
								label={__('Title Color', 'basic-block')}
								value={titleColor}
								onChange={(color) => setAttributes({ titleColor: color })}
							/>
							<RangeControl
								label={__('Title Font Size (px)', 'basic-block')}
								value={titleFontSize}
								onChange={(value) => setAttributes({ titleFontSize: value })}
								min={10}
								max={32}
							/>
						</>
					)}
					<ToggleControl
						label={__('Show Caption', 'basic-block')}
						checked={showCaption}
						onChange={(value) => setAttributes({ showCaption: value })}
					/>
					{showCaption && (
						<>
							<SelectControl
								label={__('Caption Position', 'basic-block')}
								value={captionPosition}
								options={[
									{ label: __('On Overlay', 'basic-block'), value: 'overlay' },
									{ label: __('Below Image', 'basic-block'), value: 'below' },
								]}
								onChange={(value) => setAttributes({ captionPosition: value })}
							/>
							<ColorControl
								label={__('Caption Color', 'basic-block')}
								value={captionColor}
								onChange={(color) => setAttributes({ captionColor: color })}
							/>
							<RangeControl
								label={__('Caption Font Size (px)', 'basic-block')}
								value={captionFontSize}
								onChange={(value) => setAttributes({ captionFontSize: value })}
								min={10}
								max={24}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Image Style', 'basic-block')} initialOpen={false}>
					<RangeControl
						label={__('Border Radius (px)', 'basic-block')}
						value={borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
						min={0}
						max={50}
					/>
					<SelectControl
						label={__('Border Style', 'basic-block')}
						value={imageBorderStyle}
						options={[
							{ label: __('None', 'basic-block'), value: 'none' },
							{ label: __('Solid', 'basic-block'), value: 'solid' },
							{ label: __('Dashed', 'basic-block'), value: 'dashed' },
							{ label: __('Dotted', 'basic-block'), value: 'dotted' },
						]}
						onChange={(value) => setAttributes({ imageBorderStyle: value })}
					/>
					{imageBorderStyle !== 'none' && (
						<>
							<RangeControl
								label={__('Border Width (px)', 'basic-block')}
								value={imageBorderWidth}
								onChange={(value) => setAttributes({ imageBorderWidth: value })}
								min={0}
								max={10}
							/>
							<ColorControl
								label={__('Border Color', 'basic-block')}
								value={imageBorderColor}
								onChange={(color) => setAttributes({ imageBorderColor: color })}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Box Shadow', 'basic-block')} initialOpen={false}>
					<RangeControl
						label={__('Horizontal Offset', 'basic-block')}
						value={boxShadowHorizontal}
						onChange={(value) => setAttributes({ boxShadowHorizontal: value })}
						min={-50}
						max={50}
					/>
					<RangeControl
						label={__('Vertical Offset', 'basic-block')}
						value={boxShadowVertical}
						onChange={(value) => setAttributes({ boxShadowVertical: value })}
						min={-50}
						max={50}
					/>
					<RangeControl
						label={__('Blur', 'basic-block')}
						value={boxShadowBlur}
						onChange={(value) => setAttributes({ boxShadowBlur: value })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__('Spread', 'basic-block')}
						value={boxShadowSpread}
						onChange={(value) => setAttributes({ boxShadowSpread: value })}
						min={-50}
						max={50}
					/>
					<ColorControl
						label={__('Shadow Color', 'basic-block')}
						value={boxShadowColor}
						onChange={(color) => setAttributes({ boxShadowColor: color })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} data-hover={hoverEffect} data-overlay={showOverlay ? '1' : '0'}>
				<div className="bb-gallery-grid">
					{images?.length ? (
						<>
							{/* Sizing elements for CSS grid calculation */}
							<div className="grid-sizer"></div>
							<div className="gutter-sizer"></div>
							{images.map((img, i) => (
								<div key={img.id || i} className="bb-grid-item">
									<div className="bb-image-wrapper">
										<img src={img.url} alt={img.alt} />
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
									<div className="bb-image-actions">
										<Button
											size="small"
											variant="secondary"
											isDestructive
											onClick={() => removeImage(i)}
										>
											{__('Remove', 'basic-block')}
										</Button>
									</div>
								</div>
							))}
						</>
					) : (
						<div className="bb-gallery-placeholder">
							{__('Click "Add Images" in the sidebar to build your gallery.', 'basic-block')}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
