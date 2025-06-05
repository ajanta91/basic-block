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
import { InspectorControls, useBlockProps, PanelColorSettings } from '@wordpress/block-editor';


/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import { PanelBody, TextControl, ToggleControl, TabPanel } from '@wordpress/components';

import {
	tabBgConst
} from "./constants/backgroundsConstants";

/**
 * Imports the useEffect React Hook. This is used to set an attribute when the
 * block is loaded in the Editor.
 *
 * @see https://react.dev/reference/react/useEffect
 */
import { useEffect } from 'react';

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
	const { buttonLabel, buttonUrl, openInNewTab, buttonClass, buttonId, backgroundColor } = 
console.log('Edit function called with attributes:', attributes);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'basic-block' ) }>
					
					<TextControl
						label={__('Button Label', 'basic-block')}
						value={ attributes.buttonLabel }
						onChange={ ( value ) =>
							setAttributes( { buttonLabel: value } )
						}
					/>
					<TextControl
						label={ __('Button URL','basic-block') }
						value={ attributes.buttonUrl }
						onChange={ ( value ) =>
							setAttributes( { buttonUrl: value } )
						}
					/>
					<ToggleControl
						label={ __('Open in new tab','basic-block') }
						checked={ attributes.openInNewTab }
						onChange={ ( value ) =>
							setAttributes( { openInNewTab: value } )
						}
					/>
					<TextControl
						label={ __('Button Class','basic-block') }
						value={ attributes.buttonClass }
						onChange={ ( value ) =>
							setAttributes( { buttonClass: value } )
						}
					/>
					<TextControl
						label={ __('Button ID','basic-block') }
						value={ attributes.buttonId }
						onChange={ ( value ) =>
							setAttributes( { buttonId: value } )
						}
					/>
											
				</PanelBody>

				<PanelColorSettings
					title={__('Color Settings', 'basic-block')}
					initialOpen={false}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: (colorValue) => setAttributes({ backgroundColor: colorValue }),
							label: __('Background Color', 'basic-block'),
						},
					]}
				/>

				<PanelBody title={__('Advanced Settings', 'basic-block')}>
					<TextControl
						label={ __('Custom CSS Class','basic-block') }
						value={ attributes.customClass }
						onChange={ ( value ) =>
							setAttributes( { customClass: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			
			<p {...useBlockProps()}>
				<a
					href={ attributes.buttonUrl }
					target={ attributes.openInNewTab ? '_blank' : '_self' }
					className={ attributes.buttonClass }
					id={ attributes.buttonId }
				>
					{attributes.buttonLabel}
				</a>
			</p>
		</>
	);
}
