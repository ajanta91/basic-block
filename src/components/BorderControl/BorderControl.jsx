/**
 * Border control component.
 * Includes border width, style, color, and radius options.
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { RangeContainer } from '../RangeContainer/RangeContainer';
import { ColorControl } from '../ColorControl/ColorControl';

const BorderGroupControls = ({ attributes, setAttributes }) => {
	const {
		borderWidth,
		borderWidthUnit,
		borderStyle,
		borderColor,
		borderRadius,
		borderRadiusUnit,
	} = attributes;

	return (
		<PanelBody
			title={__('Border', 'basic-block')}
			className="bb_border basic_block_panel"
		>
			<RangeContainer
				label={__('Border Width', 'basic-block')}
				value={borderWidth}
				onChange={(value) => setAttributes({ borderWidth: value })}
				min={0}
				max={20}
				step={1}
				unit={borderWidthUnit || 'px'}
				onUnitChange={(u) => setAttributes({ borderWidthUnit: u })}
				defaultValue={0}
			/>

			<SelectControl
				label={__('Border Style', 'basic-block')}
				value={borderStyle}
				options={[
					{ label: __('None', 'basic-block'), value: 'none' },
					{ label: __('Solid', 'basic-block'), value: 'solid' },
					{ label: __('Dashed', 'basic-block'), value: 'dashed' },
					{ label: __('Dotted', 'basic-block'), value: 'dotted' },
					{ label: __('Double', 'basic-block'), value: 'double' },
					{ label: __('Groove', 'basic-block'), value: 'groove' },
					{ label: __('Ridge', 'basic-block'), value: 'ridge' },
					{ label: __('Inset', 'basic-block'), value: 'inset' },
					{ label: __('Outset', 'basic-block'), value: 'outset' },
				]}
				onChange={(value) => setAttributes({ borderStyle: value })}
			/>

			<ColorControl
				label={__('Border Color', 'basic-block')}
				value={borderColor}
				onChange={(color) => setAttributes({ borderColor: color })}
			/>

			<RangeContainer
				label={__('Border Radius', 'basic-block')}
				value={borderRadius}
				onChange={(value) => setAttributes({ borderRadius: value })}
				min={0}
				max={100}
				step={1}
				unit={borderRadiusUnit || 'px'}
				onUnitChange={(u) => setAttributes({ borderRadiusUnit: u })}
				defaultValue={0}
			/>
		</PanelBody>
	);
};

export { BorderGroupControls };

/**
 * Border style props for applying in edit.js and save.js
 */
const BorderStyleProps = ({ attributes }) => {
	const {
		borderWidth,
		borderWidthUnit,
		borderStyle,
		borderColor,
		borderRadius,
		borderRadiusUnit,
	} = attributes;

	return {
		borderWidth: borderWidth ? `${borderWidth}${borderWidthUnit || 'px'}` : undefined,
		borderStyle: borderStyle || undefined,
		borderColor: borderColor || undefined,
		borderRadius: borderRadius ? `${borderRadius}${borderRadiusUnit || 'px'}` : undefined,
	};
};

export { BorderStyleProps };
