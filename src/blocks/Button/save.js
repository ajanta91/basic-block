/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { getButtonStyles } from './utils';

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
	const blockProps = useBlockProps.save({
		style: {
			...getButtonStyles(attributes),
			textAlign: attributes.textAlign,
		},
	});

	return (
		<p {...blockProps}>
			<a
				href={attributes.buttonUrl}
				id={attributes.buttonId}
				className={`wp_nonce_button ${attributes.buttonClass}`}
				target={attributes.openInNewTab ? '_blank' : undefined}
				rel={attributes.openInNewTab ? 'noopener noreferrer' : undefined}
			>
				{attributes.buttonLabel}
			</a>
		</p>
	);
}
