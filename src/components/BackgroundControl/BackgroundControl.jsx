/**
 * Background control component.
 * Includes solid color, gradient, image, video, pattern, and mask options.
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	PanelBody,
	Button,
	ButtonGroup,
	SelectControl,
	ToggleControl,
	TextControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { RangeContainer } from '../RangeContainer/RangeContainer';
import { ColorControl } from '../ColorControl/ColorControl';
import './BackgroundControl.css';

/**
 * Background type icons
 */
const BackgroundTypeIcons = {
	color: (
		<svg viewBox="0 0 24 24" width="20" height="20">
			<rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
		</svg>
	),
	gradient: (
		<svg viewBox="0 0 24 24" width="20" height="20">
			<defs>
				<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="currentColor" stopOpacity="1" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
				</linearGradient>
			</defs>
			<rect x="4" y="4" width="16" height="16" rx="2" fill="url(#grad)" />
		</svg>
	),
	image: (
		<svg viewBox="0 0 24 24" width="20" height="20">
			<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
			<circle cx="9" cy="9" r="2" fill="currentColor" />
			<path d="M4 16l4-4 3 3 5-5 4 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" />
		</svg>
	),
	video: (
		<svg viewBox="0 0 24 24" width="20" height="20">
			<rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
			<path d="M10 9l5 3-5 3V9z" fill="currentColor" />
		</svg>
	),
	pattern: (
		<svg viewBox="0 0 24 24" width="20" height="20">
			<rect x="4" y="4" width="6" height="6" fill="currentColor" />
			<rect x="14" y="4" width="6" height="6" fill="currentColor" opacity="0.5" />
			<rect x="4" y="14" width="6" height="6" fill="currentColor" opacity="0.5" />
			<rect x="14" y="14" width="6" height="6" fill="currentColor" />
		</svg>
	),
	mask: (
		<svg viewBox="0 0 24 24" width="20" height="20">
			<circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
			<path d="M12 4a8 8 0 010 16" fill="currentColor" />
		</svg>
	),
};

/**
 * Gradient Color Stop Component
 */
const GradientColorStop = ({ color, position, onChange, onRemove, canRemove }) => {
	return (
		<div className="bb-gradient-stop">
			<ColorControl
				label=""
				value={color}
				onChange={(newColor) => onChange({ color: newColor, position })}
			/>
			<RangeContainer
				label={__('Position', 'basic-block')}
				value={position}
				onChange={(newPosition) => onChange({ color, position: newPosition })}
				min={0}
				max={100}
				step={1}
				unit="%"
				defaultValue={0}
				showReset={false}
			/>
			{canRemove && (
				<Button
					variant="tertiary"
					size="small"
					onClick={onRemove}
					className="bb-gradient-stop__remove"
				>
					{__('Remove', 'basic-block')}
				</Button>
			)}
		</div>
	);
};

/**
 * Main Background Group Controls Component
 */
const BackgroundGroupControls = ({ attributes, setAttributes }) => {
	const {
		// Background type
		bgType,
		// Color
		bgColor,
		// Gradient
		bgGradientType,
		bgGradientAngle,
		bgGradientStops,
		// Image
		bgImage,
		bgImageId,
		bgImageSize,
		bgImagePosition,
		bgImageRepeat,
		bgImageAttachment,
		bgImageBlendMode,
		bgParallax,
		// Video
		bgVideoUrl,
		bgVideoPoster,
		bgVideoLoop,
		bgVideoMuted,
		// Pattern
		bgPatternImage,
		bgPatternOpacity,
		bgPatternSize,
		bgPatternBlendMode,
		// Mask
		bgMaskImage,
		bgMaskSize,
		bgMaskPosition,
		bgMaskRepeat,
		// Overlay
		bgOverlayColor,
		bgOverlayOpacity,
	} = attributes;

	const currentType = bgType || 'color';

	// Default gradient stops
	const gradientStops = bgGradientStops || [
		{ color: '#000000', position: 0 },
		{ color: '#ffffff', position: 100 },
	];

	const updateGradientStop = (index, newStop) => {
		const newStops = [...gradientStops];
		newStops[index] = newStop;
		setAttributes({ bgGradientStops: newStops });
	};

	const addGradientStop = () => {
		const newStops = [...gradientStops, { color: '#888888', position: 50 }];
		setAttributes({ bgGradientStops: newStops });
	};

	const removeGradientStop = (index) => {
		const newStops = gradientStops.filter((_, i) => i !== index);
		setAttributes({ bgGradientStops: newStops });
	};

	return (
		<PanelBody
			title={__('Background', 'basic-block')}
			className="bb_background basic_block_panel"
			initialOpen={false}
		>
			{/* Background Type Selector */}
			<div className="bb-bg-type-selector">
				<span className="bb-bg-type-label">{__('Type', 'basic-block')}</span>
				<ButtonGroup className="bb-bg-type-buttons">
					{['color', 'gradient', 'image', 'video', 'pattern'].map((type) => (
						<Button
							key={type}
							variant={currentType === type ? 'primary' : 'secondary'}
							onClick={() => setAttributes({ bgType: type })}
							title={type.charAt(0).toUpperCase() + type.slice(1)}
							className="bb-bg-type-btn"
						>
							{BackgroundTypeIcons[type]}
						</Button>
					))}
				</ButtonGroup>
			</div>

			{/* Solid Color Controls */}
			{currentType === 'color' && (
				<div className="bb-bg-section">
					<ColorControl
						label={__('Background Color', 'basic-block')}
						value={bgColor}
						onChange={(color) => setAttributes({ bgColor: color })}
					/>
				</div>
			)}

			{/* Gradient Controls */}
			{currentType === 'gradient' && (
				<div className="bb-bg-section">
					<SelectControl
						label={__('Gradient Type', 'basic-block')}
						value={bgGradientType || 'linear'}
						options={[
							{ label: __('Linear', 'basic-block'), value: 'linear' },
							{ label: __('Radial', 'basic-block'), value: 'radial' },
						]}
						onChange={(value) => setAttributes({ bgGradientType: value })}
					/>

					{(bgGradientType || 'linear') === 'linear' && (
						<RangeContainer
							label={__('Angle', 'basic-block')}
							value={bgGradientAngle || 180}
							onChange={(value) => setAttributes({ bgGradientAngle: value })}
							min={0}
							max={360}
							step={1}
							unit="deg"
							defaultValue={180}
						/>
					)}

					<VStack spacing={3} className="bb-gradient-stops">
						<span className="bb-section-label">{__('Color Stops', 'basic-block')}</span>
						{gradientStops.map((stop, index) => (
							<GradientColorStop
								key={index}
								color={stop.color}
								position={stop.position}
								onChange={(newStop) => updateGradientStop(index, newStop)}
								onRemove={() => removeGradientStop(index)}
								canRemove={gradientStops.length > 2}
							/>
						))}
						<Button
							variant="secondary"
							size="small"
							onClick={addGradientStop}
							className="bb-add-stop-btn"
						>
							{__('+ Add Color Stop', 'basic-block')}
						</Button>
					</VStack>
				</div>
			)}

			{/* Image Controls */}
			{currentType === 'image' && (
				<div className="bb-bg-section">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({
									bgImage: media.url,
									bgImageId: media.id,
								})
							}
							allowedTypes={['image']}
							value={bgImageId}
							render={({ open }) => (
								<div className="bb-image-upload">
									{bgImage ? (
										<div className="bb-image-preview">
											<img src={bgImage} alt="" />
											<HStack>
												<Button variant="secondary" size="small" onClick={open}>
													{__('Replace', 'basic-block')}
												</Button>
												<Button
													variant="tertiary"
													size="small"
													onClick={() =>
														setAttributes({
															bgImage: undefined,
															bgImageId: undefined,
														})
													}
												>
													{__('Remove', 'basic-block')}
												</Button>
											</HStack>
										</div>
									) : (
										<Button variant="secondary" onClick={open}>
											{__('Select Image', 'basic-block')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>

					{bgImage && (
						<>
							<SelectControl
								label={__('Size', 'basic-block')}
								value={bgImageSize || 'cover'}
								options={[
									{ label: __('Cover', 'basic-block'), value: 'cover' },
									{ label: __('Contain', 'basic-block'), value: 'contain' },
									{ label: __('Auto', 'basic-block'), value: 'auto' },
									{ label: __('100% 100%', 'basic-block'), value: '100% 100%' },
								]}
								onChange={(value) => setAttributes({ bgImageSize: value })}
							/>

							<SelectControl
								label={__('Position', 'basic-block')}
								value={bgImagePosition || 'center center'}
								options={[
									{ label: __('Top Left', 'basic-block'), value: 'top left' },
									{ label: __('Top Center', 'basic-block'), value: 'top center' },
									{ label: __('Top Right', 'basic-block'), value: 'top right' },
									{ label: __('Center Left', 'basic-block'), value: 'center left' },
									{ label: __('Center Center', 'basic-block'), value: 'center center' },
									{ label: __('Center Right', 'basic-block'), value: 'center right' },
									{ label: __('Bottom Left', 'basic-block'), value: 'bottom left' },
									{ label: __('Bottom Center', 'basic-block'), value: 'bottom center' },
									{ label: __('Bottom Right', 'basic-block'), value: 'bottom right' },
								]}
								onChange={(value) => setAttributes({ bgImagePosition: value })}
							/>

							<SelectControl
								label={__('Repeat', 'basic-block')}
								value={bgImageRepeat || 'no-repeat'}
								options={[
									{ label: __('No Repeat', 'basic-block'), value: 'no-repeat' },
									{ label: __('Repeat', 'basic-block'), value: 'repeat' },
									{ label: __('Repeat X', 'basic-block'), value: 'repeat-x' },
									{ label: __('Repeat Y', 'basic-block'), value: 'repeat-y' },
								]}
								onChange={(value) => setAttributes({ bgImageRepeat: value })}
							/>

							<SelectControl
								label={__('Attachment', 'basic-block')}
								value={bgImageAttachment || 'scroll'}
								options={[
									{ label: __('Scroll', 'basic-block'), value: 'scroll' },
									{ label: __('Fixed', 'basic-block'), value: 'fixed' },
									{ label: __('Local', 'basic-block'), value: 'local' },
								]}
								onChange={(value) => setAttributes({ bgImageAttachment: value })}
							/>

							<SelectControl
								label={__('Blend Mode', 'basic-block')}
								value={bgImageBlendMode || 'normal'}
								options={[
									{ label: __('Normal', 'basic-block'), value: 'normal' },
									{ label: __('Multiply', 'basic-block'), value: 'multiply' },
									{ label: __('Screen', 'basic-block'), value: 'screen' },
									{ label: __('Overlay', 'basic-block'), value: 'overlay' },
									{ label: __('Darken', 'basic-block'), value: 'darken' },
									{ label: __('Lighten', 'basic-block'), value: 'lighten' },
									{ label: __('Color Dodge', 'basic-block'), value: 'color-dodge' },
									{ label: __('Color Burn', 'basic-block'), value: 'color-burn' },
									{ label: __('Hard Light', 'basic-block'), value: 'hard-light' },
									{ label: __('Soft Light', 'basic-block'), value: 'soft-light' },
									{ label: __('Difference', 'basic-block'), value: 'difference' },
									{ label: __('Exclusion', 'basic-block'), value: 'exclusion' },
									{ label: __('Hue', 'basic-block'), value: 'hue' },
									{ label: __('Saturation', 'basic-block'), value: 'saturation' },
									{ label: __('Color', 'basic-block'), value: 'color' },
									{ label: __('Luminosity', 'basic-block'), value: 'luminosity' },
								]}
								onChange={(value) => setAttributes({ bgImageBlendMode: value })}
							/>

							<ToggleControl
								label={__('Parallax Effect', 'basic-block')}
								checked={bgParallax || false}
								onChange={(value) => setAttributes({ bgParallax: value })}
							/>
						</>
					)}
				</div>
			)}

			{/* Video Controls */}
			{currentType === 'video' && (
				<div className="bb-bg-section">
					<TextControl
						label={__('Video URL', 'basic-block')}
						value={bgVideoUrl || ''}
						onChange={(value) => setAttributes({ bgVideoUrl: value })}
						placeholder="https://example.com/video.mp4"
						help={__('Enter MP4, WebM, or Ogg video URL', 'basic-block')}
					/>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ bgVideoPoster: media.url })}
							allowedTypes={['image']}
							render={({ open }) => (
								<div className="bb-video-poster">
									<span className="bb-section-label">{__('Poster Image', 'basic-block')}</span>
									{bgVideoPoster ? (
										<div className="bb-image-preview bb-image-preview--small">
											<img src={bgVideoPoster} alt="" />
											<HStack>
												<Button variant="secondary" size="small" onClick={open}>
													{__('Replace', 'basic-block')}
												</Button>
												<Button
													variant="tertiary"
													size="small"
													onClick={() => setAttributes({ bgVideoPoster: undefined })}
												>
													{__('Remove', 'basic-block')}
												</Button>
											</HStack>
										</div>
									) : (
										<Button variant="secondary" size="small" onClick={open}>
											{__('Select Poster', 'basic-block')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>

					<ToggleControl
						label={__('Loop Video', 'basic-block')}
						checked={bgVideoLoop !== false}
						onChange={(value) => setAttributes({ bgVideoLoop: value })}
					/>

					<ToggleControl
						label={__('Mute Video', 'basic-block')}
						checked={bgVideoMuted !== false}
						onChange={(value) => setAttributes({ bgVideoMuted: value })}
					/>
				</div>
			)}

			{/* Pattern Controls */}
			{currentType === 'pattern' && (
				<div className="bb-bg-section">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ bgPatternImage: media.url })}
							allowedTypes={['image']}
							render={({ open }) => (
								<div className="bb-image-upload">
									{bgPatternImage ? (
										<div className="bb-image-preview bb-image-preview--small">
											<img src={bgPatternImage} alt="" />
											<HStack>
												<Button variant="secondary" size="small" onClick={open}>
													{__('Replace', 'basic-block')}
												</Button>
												<Button
													variant="tertiary"
													size="small"
													onClick={() => setAttributes({ bgPatternImage: undefined })}
												>
													{__('Remove', 'basic-block')}
												</Button>
											</HStack>
										</div>
									) : (
										<Button variant="secondary" onClick={open}>
											{__('Select Pattern', 'basic-block')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>

					{bgPatternImage && (
						<>
							<RangeContainer
								label={__('Opacity', 'basic-block')}
								value={bgPatternOpacity || 100}
								onChange={(value) => setAttributes({ bgPatternOpacity: value })}
								min={0}
								max={100}
								step={1}
								unit="%"
								defaultValue={100}
							/>

							<SelectControl
								label={__('Size', 'basic-block')}
								value={bgPatternSize || 'auto'}
								options={[
									{ label: __('Auto', 'basic-block'), value: 'auto' },
									{ label: __('Cover', 'basic-block'), value: 'cover' },
									{ label: __('Contain', 'basic-block'), value: 'contain' },
									{ label: __('50px', 'basic-block'), value: '50px' },
									{ label: __('100px', 'basic-block'), value: '100px' },
									{ label: __('200px', 'basic-block'), value: '200px' },
								]}
								onChange={(value) => setAttributes({ bgPatternSize: value })}
							/>

							<SelectControl
								label={__('Blend Mode', 'basic-block')}
								value={bgPatternBlendMode || 'normal'}
								options={[
									{ label: __('Normal', 'basic-block'), value: 'normal' },
									{ label: __('Multiply', 'basic-block'), value: 'multiply' },
									{ label: __('Screen', 'basic-block'), value: 'screen' },
									{ label: __('Overlay', 'basic-block'), value: 'overlay' },
									{ label: __('Soft Light', 'basic-block'), value: 'soft-light' },
								]}
								onChange={(value) => setAttributes({ bgPatternBlendMode: value })}
							/>
						</>
					)}
				</div>
			)}

			{/* Overlay Controls (available for image, video, pattern) */}
			{['image', 'video', 'pattern'].includes(currentType) && (
				<div className="bb-bg-section bb-bg-overlay">
					<span className="bb-section-label">{__('Overlay', 'basic-block')}</span>
					<ColorControl
						label={__('Overlay Color', 'basic-block')}
						value={bgOverlayColor}
						onChange={(color) => setAttributes({ bgOverlayColor: color })}
					/>
				</div>
			)}
		</PanelBody>
	);
};

export { BackgroundGroupControls };

/**
 * Generates background CSS value from attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Background style object.
 */
const getBackgroundStyles = (attributes) => {
	const {
		bgType,
		bgColor,
		bgGradientType,
		bgGradientAngle,
		bgGradientStops,
		bgImage,
		bgImageSize,
		bgImagePosition,
		bgImageRepeat,
		bgImageAttachment,
		bgImageBlendMode,
	} = attributes;

	const type = bgType || 'color';
	const styles = {};

	if (type === 'color' && bgColor) {
		styles.backgroundColor = bgColor;
	}

	if (type === 'gradient') {
		const stops = bgGradientStops || [
			{ color: '#000000', position: 0 },
			{ color: '#ffffff', position: 100 },
		];
		const gradientType = bgGradientType || 'linear';
		const angle = bgGradientAngle || 180;

		const colorStops = stops
			.sort((a, b) => a.position - b.position)
			.map((stop) => `${stop.color} ${stop.position}%`)
			.join(', ');

		if (gradientType === 'linear') {
			styles.background = `linear-gradient(${angle}deg, ${colorStops})`;
		} else {
			styles.background = `radial-gradient(circle, ${colorStops})`;
		}
	}

	if (type === 'image' && bgImage) {
		styles.backgroundImage = `url(${bgImage})`;
		styles.backgroundSize = bgImageSize || 'cover';
		styles.backgroundPosition = bgImagePosition || 'center center';
		styles.backgroundRepeat = bgImageRepeat || 'no-repeat';
		styles.backgroundAttachment = bgImageAttachment || 'scroll';
		if (bgImageBlendMode && bgImageBlendMode !== 'normal') {
			styles.backgroundBlendMode = bgImageBlendMode;
		}
	}

	if (type === 'pattern') {
		const { bgPatternImage, bgPatternSize } = attributes;
		if (bgPatternImage) {
			styles.backgroundImage = `url(${bgPatternImage})`;
			styles.backgroundSize = bgPatternSize || 'auto';
			styles.backgroundRepeat = 'repeat';
		}
	}

	return styles;
};

export { getBackgroundStyles };
