/**
 * Utility functions for the Heading block.
 */

/**
 * Generates style object from heading attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Style object for the block.
 */
export const getHeadingStyles = (attributes) => {
	const {
		fontSize,
		fontSizeUnit,
		fontFamily,
		fontWeight,
		textTransform,
		fontStyle,
		textDecoration,
		lineHeight,
		letterSpacing,
		padding,
		margin,
		textColor,
		backgroundColor,
	} = attributes;

	return {
		fontSize: fontSize ? `${fontSize}${fontSizeUnit || 'px'}` : undefined,
		fontFamily: fontFamily || undefined,
		fontWeight: fontWeight || undefined,
		textTransform: textTransform || undefined,
		fontStyle: fontStyle || undefined,
		textDecoration: textDecoration || undefined,
		lineHeight: lineHeight || undefined,
		letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
		padding: padding
			? `${padding.top || 0}${padding.unit || 'px'} ${padding.right || 0}${padding.unit || 'px'} ${padding.bottom || 0}${padding.unit || 'px'} ${padding.left || 0}${padding.unit || 'px'}`
			: undefined,
		margin: margin
			? `${margin.top || 0}${margin.unit || 'px'} ${margin.right || 0}${margin.unit || 'px'} ${margin.bottom || 0}${margin.unit || 'px'} ${margin.left || 0}${margin.unit || 'px'}`
			: undefined,
		color: textColor || undefined,
		backgroundColor: backgroundColor || undefined,
	};
};
