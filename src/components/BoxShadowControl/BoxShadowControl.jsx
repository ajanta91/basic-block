/**
 * Box Shadow control component.
 * Includes horizontal offset, vertical offset, blur, spread, color, and inset options.
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { RangeContainer } from '../RangeContainer/RangeContainer';
import { ColorControl } from '../ColorControl/ColorControl';

const BoxShadowGroupControls = ({ attributes, setAttributes }) => {
	const {
		boxShadowHorizontal,
		boxShadowVertical,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
		boxShadowInset,
	} = attributes;

	return (
		<PanelBody
			title={__('Box Shadow', 'basic-block')}
			className="bb_box_shadow basic_block_panel"
			initialOpen={false}
		>
			<RangeContainer
				label={__('Horizontal Offset', 'basic-block')}
				value={boxShadowHorizontal}
				onChange={(value) => setAttributes({ boxShadowHorizontal: value })}
				min={-100}
				max={100}
				step={1}
				unit="px"
				defaultValue={0}
				showReset={true}
			/>

			<RangeContainer
				label={__('Vertical Offset', 'basic-block')}
				value={boxShadowVertical}
				onChange={(value) => setAttributes({ boxShadowVertical: value })}
				min={-100}
				max={100}
				step={1}
				unit="px"
				defaultValue={0}
				showReset={true}
			/>

			<RangeContainer
				label={__('Blur Radius', 'basic-block')}
				value={boxShadowBlur}
				onChange={(value) => setAttributes({ boxShadowBlur: value })}
				min={0}
				max={100}
				step={1}
				unit="px"
				defaultValue={0}
				showReset={true}
			/>

			<RangeContainer
				label={__('Spread Radius', 'basic-block')}
				value={boxShadowSpread}
				onChange={(value) => setAttributes({ boxShadowSpread: value })}
				min={-100}
				max={100}
				step={1}
				unit="px"
				defaultValue={0}
				showReset={true}
			/>

			<ColorControl
				label={__('Shadow Color', 'basic-block')}
				value={boxShadowColor}
				onChange={(color) => setAttributes({ boxShadowColor: color })}
			/>

			<ToggleControl
				label={__('Inset Shadow', 'basic-block')}
				checked={boxShadowInset}
				onChange={(value) => setAttributes({ boxShadowInset: value })}
			/>
		</PanelBody>
	);
};

export { BoxShadowGroupControls };

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

export { getBoxShadowValue };
