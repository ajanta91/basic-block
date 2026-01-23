/**
 * Utility functions for the Button block.
 */

/**
 * Generates style object from button attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Style object for the block.
 */
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
	};
};
