/**
 * Utility functions for the Button block.
 */

/**
 * Generates style object from button attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Style object for the block.
 */
/**
 * Generates box-shadow CSS value from attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {string|undefined} Box shadow CSS value.
 */
const getBoxShadowValue = (attributes) => {
	const {
		boxShadowHorizontal,
		boxShadowVertical,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
		boxShadowInset,
	} = attributes;

	// If no shadow color is set, don't apply shadow
	if (!boxShadowColor) {
		return undefined;
	}

	const h = boxShadowHorizontal || 0;
	const v = boxShadowVertical || 0;
	const blur = boxShadowBlur || 0;
	const spread = boxShadowSpread || 0;
	const inset = boxShadowInset ? 'inset ' : '';

	return `${inset}${h}px ${v}px ${blur}px ${spread}px ${boxShadowColor}`;
};

/**
 * Generates background CSS styles from attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Background style properties.
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
		bgPatternImage,
		bgPatternSize,
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

	if (type === 'pattern' && bgPatternImage) {
		styles.backgroundImage = `url(${bgPatternImage})`;
		styles.backgroundSize = bgPatternSize || 'auto';
		styles.backgroundRepeat = 'repeat';
	}

	return styles;
};

export const getButtonStyles = (attributes) => {
	const {
		fontSize,
		fontSizeUnit,
		fontFamily,
		fontWeight,
		transform,
		fontStyle,
		textDecoration,
		padding,
		margin,
		textColor,
		btnBackground,
		borderWidth,
		borderWidthUnit,
		borderStyle,
		borderColor,
		borderRadius,
		borderRadiusUnit,
	} = attributes;

	// Get background styles
	const bgStyles = getBackgroundStyles(attributes);

	return {
		fontSize: fontSize ? `${fontSize}${fontSizeUnit || 'px'}` : undefined,
		fontFamily: fontFamily || undefined,
		fontWeight: fontWeight || undefined,
		textTransform: transform || undefined,
		fontStyle: fontStyle || undefined,
		textDecoration: textDecoration || undefined,
		padding: padding
			? `${padding.top || 0}${padding.unit || 'px'} ${padding.right || 0}${padding.unit || 'px'} ${padding.bottom || 0}${padding.unit || 'px'} ${padding.left || 0}${padding.unit || 'px'}`
			: undefined,
		margin: margin
			? `${margin.top || 0}${margin.unit || 'px'} ${margin.right || 0}${margin.unit || 'px'} ${margin.bottom || 0}${margin.unit || 'px'} ${margin.left || 0}${margin.unit || 'px'}`
			: undefined,
		color: textColor || undefined,
		// Use bgStyles.backgroundColor if bgType is set, otherwise fall back to btnBackground
		backgroundColor: bgStyles.backgroundColor || btnBackground || undefined,
		borderWidth: borderWidth ? `${borderWidth}${borderWidthUnit || 'px'}` : undefined,
		borderStyle: borderStyle || undefined,
		borderColor: borderColor || undefined,
		borderRadius: borderRadius ? `${borderRadius}${borderRadiusUnit || 'px'}` : undefined,
		boxShadow: getBoxShadowValue(attributes),
		// Spread background styles (for gradient, image, pattern)
		...bgStyles,
	};
};
