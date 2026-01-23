/**
 * Color control component with RGBA support.
 * Provides a color picker with alpha/opacity slider.
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	BaseControl,
	Button,
	ColorPicker,
	Popover,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import './ColorControl.css';

const ColorControl = ({ label, value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClear = () => {
		onChange(undefined);
	};

	return (
		<BaseControl className="bb-color-control">
			<HStack className="bb-color-control__header">
				<span className="bb-color-control__label">{label}</span>
				{value && (
					<Button
						variant="tertiary"
						size="small"
						onClick={handleClear}
					>
						{__('Clear', 'basic-block')}
					</Button>
				)}
			</HStack>
			<div className="bb-color-control__picker-wrapper">
				<button
					type="button"
					className="bb-color-control__indicator"
					onClick={() => setIsOpen(!isOpen)}
					style={{
						backgroundColor: value || 'transparent',
					}}
					aria-label={__('Select color', 'basic-block')}
				>
					{!value && (
						<span className="bb-color-control__no-color">
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">
								<line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2"/>
							</svg>
						</span>
					)}
				</button>
				{value && (
					<span className="bb-color-control__value">{value}</span>
				)}
				{isOpen && (
					<Popover
						placement="left-start"
						offset={16}
						onClose={() => setIsOpen(false)}
					>
						<div className="bb-color-control__popover">
							<ColorPicker
								color={value}
								onChange={onChange}
								enableAlpha={true}
							/>
						</div>
					</Popover>
				)}
			</div>
		</BaseControl>
	);
};

export { ColorControl };
