/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';


/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import {
	PanelBody,
	TextControl,
	ToggleControl,
	ColorPalette,
	RangeControl
} from '@wordpress/components';
import SpacingControl from '../../components/SpacingControl';





/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		buttonLabel,
		buttonUrl,
		openInNewTab,
		buttonClass,
		buttonId,
		backgroundColor,
		textColor,
		fontSize,
		margin,
		padding } = attributes;
	console.log('Edit function called with attributes:', attributes);

	const blockProps = useBlockProps({
		style: {
			padding: padding
				? `${padding.top || 0}px ${padding.right || 0}px ${padding.bottom || 0}px ${padding.left || 0}px`
				: undefined,
			margin: margin
				? `${margin.top || 0}px ${margin.right || 0}px ${margin.bottom || 0}px ${margin.left || 0}px`
				: undefined,
			backgroundColor: backgroundColor || undefined,
			color: textColor || undefined,
			fontSize: fontSize ? `${fontSize}px` : undefined,
		},
		className: attributes.customClass,
	});

console.log('Block Props', blockProps);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'basic-block')}>

					<TextControl
						label={__('Button Label', 'basic-block')}
						value={attributes.buttonLabel}
						onChange={(value) =>
							setAttributes({ buttonLabel: value })
						}
					/>
					<TextControl
						label={__('Button URL', 'basic-block')}
						value={attributes.buttonUrl}
						onChange={(value) =>
							setAttributes({ buttonUrl: value })
						}
					/>
					<ToggleControl
						label={__('Open in new tab', 'basic-block')}
						checked={attributes.openInNewTab}
						onChange={(value) =>
							setAttributes({ openInNewTab: value })
						}
					/>
					<TextControl
						label={__('Button Class', 'basic-block')}
						value={attributes.buttonClass}
						onChange={(value) =>
							setAttributes({ buttonClass: value })
						}
					/>
					<TextControl
						label={__('Button ID', 'basic-block')}
						value={attributes.buttonId}
						onChange={(value) =>
							setAttributes({ buttonId: value })
						}
					/>

				</PanelBody>



				<PanelBody title={__('Advanced Settings', 'basic-block')}>
					<TextControl
						label={__('Custom CSS Class', 'basic-block')}
						value={attributes.customClass}
						onChange={(value) =>
							setAttributes({ customClass: value })
						}
					/>
				</PanelBody>




			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Colors', 'basic-block')}>
					<ColorPalette
						label={__('Text Color', 'basic-block')}
						value={textColor}
						onChange={(newColor) => setAttributes({ textColor: newColor })}
					/>
					<ColorPalette
						label={__('Background Color', 'basic-block')}
						value={backgroundColor}
						onChange={(newColor) => setAttributes({ backgroundColor: newColor })}
					/>
				</PanelBody>

				<PanelBody title={__('Typography', 'basic-block')}>
					<RangeControl
						label={__('Font Size (px)', 'basic-block')}
						value={fontSize}
						onChange={(newSize) => setAttributes({ fontSize: newSize })}
						min={10}
						max={100}
					/>
				</PanelBody>

				<PanelBody title={__('Spacing', 'basic-block')}>
					<SpacingControl
						label={__('Padding', 'basic-block')}
						values={padding || { top: '', right: '', bottom: '', left: '', unit: '' }}
						onChange={(newPadding) => setAttributes({ padding: newPadding })}
					/>

					<SpacingControl
						label={__('Margin', 'basic-block')}
						values={margin || { top: '', right: '', bottom: '', left: '', unit: '' }}
						onChange={(newMargin) => setAttributes({ margin: newMargin })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<a
					href={attributes.buttonUrl}
					target={attributes.openInNewTab ? '_blank' : '_self'}
					className={attributes.buttonClass}
					id={attributes.buttonId}
				>
					{attributes.buttonLabel}
				</a>
			</div>
		</>
	);
}
