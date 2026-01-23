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
		backgroundColor: btnBackground || undefined,
		borderWidth: borderWidth ? `${borderWidth}${borderWidthUnit || 'px'}` : undefined,
		borderStyle: borderStyle || undefined,
		borderColor: borderColor || undefined,
		borderRadius: borderRadius ? `${borderRadius}${borderRadiusUnit || 'px'}` : undefined,
		boxShadow: getBoxShadowValue(attributes),
	};
};
