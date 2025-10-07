/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const {
		backgroundColor,
		fontSize,
		textColor,
		margin,
		padding } = attributes;
	
	const blockProps = useBlockProps.save({
		style: {
			padding: padding
				? `${padding.top || 0}${padding.unit || 'px'} ${padding.right || 0}${padding.unit || 'px'} ${padding.bottom || 0}${padding.unit || 'px'} ${padding.left || 0}${padding.unit || 'px'}`
				: undefined,
			margin: margin
				? `${margin.top || 0}${margin.unit || 'px'} ${margin.right || 0}${margin.unit || 'px'} ${margin.bottom || 0}${margin.unit || 'px'} ${margin.left || 0}${margin.unit || 'px'}`
				: undefined,
			backgroundColor: backgroundColor || undefined,
			color: textColor || undefined,
			fontSize: fontSize ? `${fontSize}px` : undefined,
		}
	});

	return (
		<p {...blockProps}>
			<a href={attributes.buttonUrl} id={attributes.buttonId} className={`wp_nonce_button ${attributes.buttonClass}`} >{ attributes.buttonLabel}</a>
		</p>
	);
}
