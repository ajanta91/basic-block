import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';

const FlipClock = ({ days, hours, minutes, seconds, showDays, showHours, showMinutes, showSeconds, labels }) => {
	const containerRef = useRef(null);
	const tickInstance = useRef(null);

	// Prepare values and preset string
	const values = [];
	const presets = [];

	if (showDays) {
		values.push(days);
		presets.push('d');
	}
	if (showHours) {
		values.push(hours);
		presets.push('h');
	}
	if (showMinutes) {
		values.push(minutes);
		presets.push('m');
	}
	if (showSeconds) {
		values.push(seconds);
		presets.push('s');
	}

	const presetString = `preset(${presets.join(', ')}) -> delay`;
	// Need to stringify values for dependency check, or just use individual values in useEffect
	const valuesStr = JSON.stringify(values);

	useEffect(() => {
		if (!containerRef.current || !window.Tick) {
			return;
		}

		// Create the element manually
		const element = document.createElement('div');
		element.className = 'bb-tick'; // Safe class

		// Build the inner HTML based on enabled units
		let innerHTML = `<div data-repeat="true" data-layout="horizontal center fit" data-transform="${presetString}">`;

		if (showDays) {
			innerHTML += `
				<div class="tick-group">
					<div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
						<span data-view="flip"></span>
					</div>
					<span data-key="label" data-view="text" class="tick-label">${labels.days}</span>
				</div>`;
		}
		if (showHours) {
			innerHTML += `
				<div class="tick-group">
					<div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
						<span data-view="flip"></span>
					</div>
					<span data-key="label" data-view="text" class="tick-label">${labels.hours}</span>
				</div>`;
		}
		if (showMinutes) {
			innerHTML += `
				<div class="tick-group">
					<div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
						<span data-view="flip"></span>
					</div>
					<span data-key="label" data-view="text" class="tick-label">${labels.minutes}</span>
				</div>`;
		}
		if (showSeconds) {
			innerHTML += `
				<div class="tick-group">
					<div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
						<span data-view="flip"></span>
					</div>
					<span data-key="label" data-view="text" class="tick-label">${labels.seconds}</span>
				</div>`;
		}

		innerHTML += `</div>`;
		element.innerHTML = innerHTML;

		// Clear container and append
		containerRef.current.innerHTML = '';
		containerRef.current.appendChild(element);

		// Initialize
		try {
			tickInstance.current = window.Tick.DOM.create(element);
		} catch (e) {
			console.error('Tick initialization failed', e);
		}

		return () => {
			if (tickInstance.current) {
				window.Tick.DOM.destroy(tickInstance.current);
			}
		};
	}, [showDays, showHours, showMinutes, showSeconds, presetString, labels.days, labels.hours, labels.minutes, labels.seconds]);

	// Update values
	useEffect(() => {
		if (tickInstance.current) {
			tickInstance.current.value = JSON.parse(valuesStr);
		}
	}, [valuesStr]);

	return <div ref={containerRef} className="bb-countdown-flip-clock-wrapper" />;
};

import { ColorControl } from '../../components/ColorControl/ColorControl';
import SpacingControl from '../../components/SpacingControl/SpacingControl';
import { RangeContainer } from '../../components/RangeContainer/RangeContainer';
import { TypographyGroupControls } from '../../components/Typography/TypographyControl';

export default function Edit({ attributes, setAttributes }) {
	const {
		countdownStyle,
		targetDate,
		targetTime,
		layout,
		alignment,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		labelDays,
		labelHours,
		labelMinutes,
		labelSeconds,
		showLabels,
		showSeparator,
		separator,
		expiryAction,
		expiryMessage,
		expiryRedirectUrl,
		numberColor,
		labelColor,
		separatorColor,
		backgroundColor,
		itemBackgroundColor,
		numberFontFamily,
		numberFontSize,
		numberFontSizeUnit,
		numberFontWeight,
		numberTextTransform,
		numberFontStyle,
		numberTextDecoration,
		labelFontFamily,
		labelFontSize,
		labelFontSizeUnit,
		labelFontWeight,
		labelTextTransform,
		labelFontStyle,
		labelTextDecoration,
		separatorFontFamily,
		separatorFontSize,
		separatorFontSizeUnit,
		separatorFontWeight,
		separatorTextTransform,
		separatorFontStyle,
		separatorTextDecoration,
		itemGap,
		itemGapUnit,
		itemPadding,
		itemBorderWidth,
		itemBorderStyle,
		itemBorderColor,
		itemBorderRadius,
		itemBoxShadowHorizontal,
		itemBoxShadowVertical,
		itemBoxShadowBlur,
		itemBoxShadowSpread,
		itemBoxShadowColor,
		margin,
		padding,
	} = attributes;

	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// Calculate countdown for editor preview
	useEffect(() => {
		if (!targetDate) {
			setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			return;
		}

		const calculateCountdown = () => {
			const target = new Date(`${targetDate}T${targetTime || '00:00'}`);
			const now = new Date();
			const diff = target - now;

			if (diff <= 0) {
				setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			setCountdown({ days, hours, minutes, seconds });
		};

		calculateCountdown();
		const interval = setInterval(calculateCountdown, 1000);

		return () => clearInterval(interval);
	}, [targetDate, targetTime]);

	const blockStyles = {
		'--bb-countdown-alignment': alignment,
		'--bb-countdown-gap': `${itemGap}${itemGapUnit}`,
		'--bb-countdown-bg': backgroundColor || undefined,
		'--bb-countdown-item-bg': itemBackgroundColor || undefined,
		'--bb-countdown-number-color': numberColor || undefined,
		'--bb-countdown-label-color': labelColor || undefined,
		'--bb-countdown-separator-color': separatorColor || undefined,
		'--bb-countdown-number-font': numberFontFamily || undefined,
		'--bb-countdown-number-size': `${numberFontSize}${numberFontSizeUnit}`,
		'--bb-countdown-number-weight': numberFontWeight,
		'--bb-countdown-number-transform': numberTextTransform || undefined,
		'--bb-countdown-number-style': numberFontStyle || undefined,
		'--bb-countdown-number-decoration': numberTextDecoration || undefined,
		'--bb-countdown-label-font': labelFontFamily || undefined,
		'--bb-countdown-label-size': `${labelFontSize}${labelFontSizeUnit}`,
		'--bb-countdown-label-weight': labelFontWeight,
		'--bb-countdown-label-transform': labelTextTransform,
		'--bb-countdown-label-style': labelFontStyle || undefined,
		'--bb-countdown-label-decoration': labelTextDecoration || undefined,
		'--bb-countdown-separator-font': separatorFontFamily || undefined,
		'--bb-countdown-separator-size': `${separatorFontSize}${separatorFontSizeUnit}`,
		'--bb-countdown-separator-weight': separatorFontWeight || undefined,
		'--bb-countdown-separator-transform': separatorTextTransform || undefined,
		'--bb-countdown-separator-style': separatorFontStyle || undefined,
		'--bb-countdown-separator-decoration': separatorTextDecoration || undefined,
		'--bb-countdown-item-padding': itemPadding
			? `${itemPadding.top}${itemPadding.unit} ${itemPadding.right}${itemPadding.unit} ${itemPadding.bottom}${itemPadding.unit} ${itemPadding.left}${itemPadding.unit}`
			: undefined,
		'--bb-countdown-item-border': itemBorderWidth
			? `${itemBorderWidth}px ${itemBorderStyle} ${itemBorderColor || '#ccc'}`
			: undefined,
		'--bb-countdown-item-radius': `${itemBorderRadius}px`,
		'--bb-countdown-item-shadow': `${itemBoxShadowHorizontal}px ${itemBoxShadowVertical}px ${itemBoxShadowBlur}px ${itemBoxShadowSpread}px ${itemBoxShadowColor}`,
		marginTop: margin?.top ? `${margin.top}${margin.unit}` : undefined,
		marginRight: margin?.right ? `${margin.right}${margin.unit}` : undefined,
		marginBottom: margin?.bottom ? `${margin.bottom}${margin.unit}` : undefined,
		marginLeft: margin?.left ? `${margin.left}${margin.unit}` : undefined,
		paddingTop: padding?.top ? `${padding.top}${padding.unit}` : undefined,
		paddingRight: padding?.right ? `${padding.right}${padding.unit}` : undefined,
		paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : undefined,
		paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : undefined,
	};

	const blockProps = useBlockProps({
		className: `bb-countdown-wrapper bb-countdown-${layout} bb-countdown-${countdownStyle}`,
		style: blockStyles,
	});

	const renderCountdownItem = (value, label, key) => (
		<div className="bb-countdown-item" key={key}>
			<span className="bb-countdown-number">{String(value).padStart(2, '0')}</span>
			{showLabels && <span className="bb-countdown-label">{label}</span>}
		</div>
	);

	// const renderFlipDigit = ( digit ) => (
	// 	<span className="bb-flip-digit">
	// 		<span className="bb-flip-digit-top">
	// 			<span className="bb-flip-digit-top-inner">{ digit }</span>
	// 		</span>
	// 		<span className="bb-flip-digit-bottom">
	// 			<span className="bb-flip-digit-bottom-inner">{ digit }</span>
	// 		</span>
	// 	</span>
	// );

	// const renderFlipItem = ( value, label, key ) => {
	// 	const paddedValue = String( value ).padStart( 2, '0' );
	// 	return (
	// 		<div className="bb-countdown-flip-group" key={ key }>
	// 			<div className="bb-countdown-flip-item">
	// 				{ renderFlipDigit( paddedValue[ 0 ] ) }
	// 				{ renderFlipDigit( paddedValue[ 1 ] ) }
	// 			</div>
	// 			{ showLabels && <span className="bb-countdown-flip-label">{ label }</span> }
	// 		</div>
	// 	);
	// };



	const renderSeparator = (key) =>
		showSeparator && (
			<span className="bb-countdown-separator" key={`sep-${key}`}>
				{separator}
			</span>
		);

	const countdownItems = [];
	const isFlipStyle = countdownStyle === 'style-2';

	if (!isFlipStyle) {
		if (showDays) {
			countdownItems.push(renderCountdownItem(countdown.days, labelDays, 'days'));
		}
		if (showHours) {
			if (countdownItems.length > 0) {
				countdownItems.push(renderSeparator('hours'));
			}
			countdownItems.push(renderCountdownItem(countdown.hours, labelHours, 'hours'));
		}
		if (showMinutes) {
			if (countdownItems.length > 0) {
				countdownItems.push(renderSeparator('minutes'));
			}
			countdownItems.push(renderCountdownItem(countdown.minutes, labelMinutes, 'minutes'));
		}
		if (showSeconds) {
			if (countdownItems.length > 0) {
				countdownItems.push(renderSeparator('seconds'));
			}
			countdownItems.push(renderCountdownItem(countdown.seconds, labelSeconds, 'seconds'));
		}
	}

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={(value) => setAttributes({ alignment: value })}
				/>
			</BlockControls>

			{/* Settings Panel */}
			<InspectorControls>
				<PanelBody title={__('Countdown Settings', 'basic-block')} className="basic_block_panel" initialOpen={true}>
					<SelectControl
						label={__('Countdown Style', 'basic-block')}
						value={countdownStyle}
						options={[
							{ label: __('Style 1 - Default', 'basic-block'), value: 'style-1' },
							{ label: __('Style 2 - Flip Clock', 'basic-block'), value: 'style-2' },
						]}
						onChange={(value) => setAttributes({ countdownStyle: value })}
					/>

					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'block',
								marginBottom: '8px',
								fontWeight: '500',
							}}
						>
							{__('Target Date', 'basic-block')}
						</label>
						<input
							type="date"
							value={targetDate}
							onChange={(e) => setAttributes({ targetDate: e.target.value })}
							style={{
								width: '100%',
								padding: '8px',
								border: '1px solid #ccc',
								borderRadius: '4px',
							}}
						/>
					</div>

					<TextControl
						label={__('Target Time (HH:MM)', 'basic-block')}
						value={targetTime}
						onChange={(value) => setAttributes({ targetTime: value })}
						type="time"
					/>

					<SelectControl
						label={__('Layout', 'basic-block')}
						value={layout}
						options={[
							{ label: __('Horizontal', 'basic-block'), value: 'horizontal' },
							{ label: __('Vertical', 'basic-block'), value: 'vertical' },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Display Units', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<ToggleControl
						label={__('Show Days', 'basic-block')}
						checked={showDays}
						onChange={(value) => setAttributes({ showDays: value })}
					/>
					<ToggleControl
						label={__('Show Hours', 'basic-block')}
						checked={showHours}
						onChange={(value) => setAttributes({ showHours: value })}
					/>
					<ToggleControl
						label={__('Show Minutes', 'basic-block')}
						checked={showMinutes}
						onChange={(value) => setAttributes({ showMinutes: value })}
					/>
					<ToggleControl
						label={__('Show Seconds', 'basic-block')}
						checked={showSeconds}
						onChange={(value) => setAttributes({ showSeconds: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Labels', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<ToggleControl
						label={__('Show Labels', 'basic-block')}
						checked={showLabels}
						onChange={(value) => setAttributes({ showLabels: value })}
					/>
					{showLabels && (
						<>
							<TextControl
								label={__('Days Label', 'basic-block')}
								value={labelDays}
								onChange={(value) => setAttributes({ labelDays: value })}
							/>
							<TextControl
								label={__('Hours Label', 'basic-block')}
								value={labelHours}
								onChange={(value) => setAttributes({ labelHours: value })}
							/>
							<TextControl
								label={__('Minutes Label', 'basic-block')}
								value={labelMinutes}
								onChange={(value) => setAttributes({ labelMinutes: value })}
							/>
							<TextControl
								label={__('Seconds Label', 'basic-block')}
								value={labelSeconds}
								onChange={(value) => setAttributes({ labelSeconds: value })}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Separator', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<ToggleControl
						label={__('Show Separator', 'basic-block')}
						checked={showSeparator}
						onChange={(value) => setAttributes({ showSeparator: value })}
					/>
					{showSeparator && (
						<TextControl
							label={__('Separator Character', 'basic-block')}
							value={separator}
							onChange={(value) => setAttributes({ separator: value })}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Expiry Action', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<SelectControl
						label={__('When Countdown Expires', 'basic-block')}
						value={expiryAction}
						options={[
							{ label: __('Show Message', 'basic-block'), value: 'message' },
							{ label: __('Hide Countdown', 'basic-block'), value: 'hide' },
							{ label: __('Redirect to URL', 'basic-block'), value: 'redirect' },
						]}
						onChange={(value) => setAttributes({ expiryAction: value })}
					/>
					{expiryAction === 'message' && (
						<TextControl
							label={__('Expiry Message', 'basic-block')}
							value={expiryMessage}
							onChange={(value) => setAttributes({ expiryMessage: value })}
						/>
					)}
					{expiryAction === 'redirect' && (
						<TextControl
							label={__('Redirect URL', 'basic-block')}
							value={expiryRedirectUrl}
							onChange={(value) => setAttributes({ expiryRedirectUrl: value })}
							type="url"
						/>
					)}
				</PanelBody>
			</InspectorControls>

			{/* Styles Panel */}
			<InspectorControls group="styles">
				<PanelBody title={__('Colors', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<ColorControl
						label={__('Number Color', 'basic-block')}
						value={numberColor}
						onChange={(value) => setAttributes({ numberColor: value })}
					/>
					<ColorControl
						label={__('Label Color', 'basic-block')}
						value={labelColor}
						onChange={(value) => setAttributes({ labelColor: value })}
					/>
					<ColorControl
						label={__('Separator Color', 'basic-block')}
						value={separatorColor}
						onChange={(value) => setAttributes({ separatorColor: value })}
					/>
					<ColorControl
						label={__('Background Color', 'basic-block')}
						value={backgroundColor}
						onChange={(value) => setAttributes({ backgroundColor: value })}
					/>
					<ColorControl
						label={__('Item Background Color', 'basic-block')}
						value={itemBackgroundColor}
						onChange={(value) => setAttributes({ itemBackgroundColor: value })}
					/>
				</PanelBody>

				<TypographyGroupControls
					attributes={attributes}
					setAttributes={setAttributes}
					prefix="number"
					title={__('Number Typography', 'basic-block')}
				/>

				<TypographyGroupControls
					attributes={attributes}
					setAttributes={setAttributes}
					prefix="label"
					title={__('Label Typography', 'basic-block')}
				/>

				<TypographyGroupControls
					attributes={attributes}
					setAttributes={setAttributes}
					prefix="separator"
					title={__('Separator Typography', 'basic-block')}
				/>

				<PanelBody title={__('Item Styling', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<RangeContainer
						label={__('Item Gap', 'basic-block')}
						value={itemGap}
						onChange={(value) => setAttributes({ itemGap: value })}
						min={0}
						max={100}
						unit={itemGapUnit}
						onUnitChange={(unit) => setAttributes({ itemGapUnit: unit })}
						defaultValue={20}
					/>
					<SpacingControl
						label={__('Item Padding', 'basic-block')}
						values={itemPadding}
						onChange={(value) => setAttributes({ itemPadding: value })}
					/>
					<RangeContainer
						label={__('Border Width', 'basic-block')}
						value={itemBorderWidth}
						onChange={(value) => setAttributes({ itemBorderWidth: value })}
						min={0}
						max={20}
						defaultValue={0}
					/>
					{itemBorderWidth > 0 && (
						<>
							<SelectControl
								label={__('Border Style', 'basic-block')}
								value={itemBorderStyle}
								options={[
									{ label: 'Solid', value: 'solid' },
									{ label: 'Dashed', value: 'dashed' },
									{ label: 'Dotted', value: 'dotted' },
									{ label: 'Double', value: 'double' },
								]}
								onChange={(value) => setAttributes({ itemBorderStyle: value })}
							/>
							<ColorControl
								label={__('Border Color', 'basic-block')}
								value={itemBorderColor}
								onChange={(value) => setAttributes({ itemBorderColor: value })}
							/>
						</>
					)}
					<RangeContainer
						label={__('Border Radius', 'basic-block')}
						value={itemBorderRadius}
						onChange={(value) => setAttributes({ itemBorderRadius: value })}
						min={0}
						max={100}
						defaultValue={8}
					/>
				</PanelBody>

				<PanelBody title={__('Item Box Shadow', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<RangeContainer
						label={__('Horizontal Offset', 'basic-block')}
						value={itemBoxShadowHorizontal}
						onChange={(value) => setAttributes({ itemBoxShadowHorizontal: value })}
						min={-50}
						max={50}
						defaultValue={0}
					/>
					<RangeContainer
						label={__('Vertical Offset', 'basic-block')}
						value={itemBoxShadowVertical}
						onChange={(value) => setAttributes({ itemBoxShadowVertical: value })}
						min={-50}
						max={50}
						defaultValue={4}
					/>
					<RangeContainer
						label={__('Blur Radius', 'basic-block')}
						value={itemBoxShadowBlur}
						onChange={(value) => setAttributes({ itemBoxShadowBlur: value })}
						min={0}
						max={100}
						defaultValue={10}
					/>
					<RangeContainer
						label={__('Spread Radius', 'basic-block')}
						value={itemBoxShadowSpread}
						onChange={(value) => setAttributes({ itemBoxShadowSpread: value })}
						min={-50}
						max={50}
						defaultValue={0}
					/>
					<ColorControl
						label={__('Shadow Color', 'basic-block')}
						value={itemBoxShadowColor}
						onChange={(value) => setAttributes({ itemBoxShadowColor: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Spacing', 'basic-block')} className="basic_block_panel" initialOpen={false}>
					<SpacingControl
						label={__('Margin', 'basic-block')}
						values={margin}
						onChange={(value) => setAttributes({ margin: value })}
					/>
					<SpacingControl
						label={__('Padding', 'basic-block')}
						values={padding}
						onChange={(value) => setAttributes({ padding: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{!targetDate ? (
					<div className="bb-countdown-placeholder">
						{__('Please set a target date in the block settings.', 'basic-block')}
					</div>
				) : (
					<div className="bb-countdown-inner">
						{isFlipStyle ? (
							<FlipClock
								days={countdown.days}
								hours={countdown.hours}
								minutes={countdown.minutes}
								seconds={countdown.seconds}
								showDays={showDays}
								showHours={showHours}
								showMinutes={showMinutes}
								showSeconds={showSeconds}
								labels={{
									days: labelDays,
									hours: labelHours,
									minutes: labelMinutes,
									seconds: labelSeconds,
								}}
							/>
						) : (
							countdownItems
						)}
					</div>
				)}
			</div>
		</>
	);
}
