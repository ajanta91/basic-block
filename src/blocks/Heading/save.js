/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getHeadingStyles } from './utils';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { content, level, textAlign } = attributes;

	const TagName = `h${level}`;

	const blockProps = useBlockProps.save({
		style: {
			...getHeadingStyles(attributes),
			textAlign: textAlign,
		},
	});

	return (
		<TagName {...blockProps}>
			<RichText.Content value={content} />
		</TagName>
	);
}
