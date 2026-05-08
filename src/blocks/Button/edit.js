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
import { useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';


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
	ToolbarGroup,
	ToolbarButton,
	Popover,
} from '@wordpress/components';
import { link } from '@wordpress/icons';
import SpacingControl from '../../components/SpacingControl/SpacingControl';

import { TypographyGroupControls } from '../../components/Typography/TypographyControl';
import { BorderGroupControls } from '../../components/BorderControl/BorderControl';
import { BoxShadowGroupControls } from '../../components/BoxShadowControl/BoxShadowControl';
import { ColorControl } from '../../components/ColorControl/ColorControl';
import { BackgroundGroupControls } from '../../components/BackgroundControl/BackgroundControl';
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
	const { textColor, margin, padding, textAlign } = attributes;
	const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

	const blockProps = useBlockProps({
		style: getButtonStyles(attributes),
		className: attributes.customClass,
	});

	const linkValue = {
		url: attributes.buttonUrl,
		opensInNewTab: attributes.openInNewTab,
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={link}
						label={__('Link', 'basic-block')}
						onClick={() => setIsLinkPopoverOpen(!isLinkPopoverOpen)}
						isPressed={isLinkPopoverOpen}
					/>
					{isLinkPopoverOpen && (
						<Popover
							position="bottom center"
							onClose={() => setIsLinkPopoverOpen(false)}
							focusOnMount="firstElement"
						>
							<LinkControl
								value={linkValue}
								onChange={(newLink) => {
									setAttributes({
										buttonUrl: newLink.url,
										openInNewTab: newLink.opensInNewTab,
									});
								}}
								onRemove={() => {
									setAttributes({
										buttonUrl: '',
										openInNewTab: false,
									});
									setIsLinkPopoverOpen(false);
								}}
							/>
						</Popover>
					)}
				</ToolbarGroup>
				<AlignmentToolbar
					value={textAlign}
					onChange={(value) => setAttributes({ textAlign: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Settings', 'basic-block')} className='basic_block_panel'>

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

				<PanelBody title={__('Advanced Settings', 'basic-block')} className='basic_block_panel'>
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
					<ColorControl
						label={__('Text Color', 'basic-block')}
						value={textColor}
						onChange={(color) => setAttributes({ textColor: color })}
					/>
				</PanelBody>

				<BackgroundGroupControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>

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

				<BorderGroupControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>

				<BoxShadowGroupControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>

			<p {...blockProps} style={{ ...blockProps.style, textAlign }}>
				<a
					href={attributes.buttonUrl}
					target={attributes.openInNewTab ? '_blank' : undefined}
					rel={attributes.openInNewTab ? 'noopener noreferrer' : undefined}
					className={attributes.buttonClass}
					id={attributes.buttonId}
				>
					{attributes.buttonLabel}
				</a>
			</p>
		</>
	);
}
