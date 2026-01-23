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
} from '@wordpress/components';
import SpacingControl from '../../components/SpacingControl';

import { TypographyGroupControls } from '../../components/Typography/TypographyControl';
import { getButtonStyles } from './utils';

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
	const { textColor, btnBackground, margin, padding } = attributes;

	const blockProps = useBlockProps({
		style: getButtonStyles(attributes),
		className: attributes.customClass,
	});

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
				
				<TypographyGroupControls
					slug="button"
					attributes={attributes}
					setAttributes={setAttributes}
				/>

				<PanelBody title={__('Color', 'basic-block')} className='basic_block_panel'>
					
					<ColorPalette						
						value={textColor}
						onChange={(color) => setAttributes({ textColor: color })}
					/>
					<ColorPalette
						label={__('Background Color', 'basic-block')}
						value={btnBackground}
						onChange={(color) => setAttributes({ btnBackground: color })}
					/>
					
					
				</PanelBody>

				<PanelBody title={__('Spacing', 'basic-block')} className='basic_block_panel'>
					<SpacingControl
						label={__('Margin', 'basic-block')}
						values={margin || { top: '', right: '', bottom: '', left: '', unit: 'px' }}
						onChange={(newMargin) => setAttributes({ margin: newMargin })}
					/>
					<SpacingControl
						label={__('Padding', 'basic-block')}
						values={padding || { top: '', right: '', bottom: '', left: '', unit: 'px' }}
						onChange={(newPadding) => setAttributes({ padding: newPadding })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<a
					href={attributes.buttonUrl}
					target={attributes.openInNewTab ? '_blank' : undefined}
					rel={attributes.openInNewTab ? 'noopener noreferrer' : undefined}
					className={attributes.buttonClass}
					id={attributes.buttonId}
				>
					{attributes.buttonLabel}
				</a>
			</div>
		</>
	);
}
