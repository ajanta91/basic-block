import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
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
		flipUpperBackground,
		flipUpperBorderWidth,
		flipUpperBorderStyle,
		flipUpperBorderColor,
		flipLowerBackground,
		flipLowerBorderWidth,
		flipLowerBorderStyle,
		flipLowerBorderColor,
	} = attributes;

	if (!targetDate) {
		return null;
	}

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
		'--bb-flip-upper-bg': flipUpperBackground || undefined,
		'--bb-flip-upper-border': flipUpperBorderWidth
			? `${flipUpperBorderWidth}px ${flipUpperBorderStyle} ${flipUpperBorderColor || '#ccc'}`
			: undefined,
		'--bb-flip-lower-bg': flipLowerBackground || undefined,
		'--bb-flip-lower-border': flipLowerBorderWidth
			? `${flipLowerBorderWidth}px ${flipLowerBorderStyle} ${flipLowerBorderColor || '#ccc'}`
			: undefined,
		marginTop: margin?.top ? `${margin.top}${margin.unit}` : undefined,
		marginRight: margin?.right ? `${margin.right}${margin.unit}` : undefined,
		marginBottom: margin?.bottom ? `${margin.bottom}${margin.unit}` : undefined,
		marginLeft: margin?.left ? `${margin.left}${margin.unit}` : undefined,
		paddingTop: padding?.top ? `${padding.top}${padding.unit}` : undefined,
		paddingRight: padding?.right ? `${padding.right}${padding.unit}` : undefined,
		paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : undefined,
		paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : undefined,
	};

	const blockProps = useBlockProps.save({
		className: `bb-countdown-wrapper bb-countdown-${layout} bb-countdown-${countdownStyle}`,
		style: blockStyles,
		'data-target-date': targetDate,
		'data-target-time': targetTime,
		'data-expiry-action': expiryAction,
		'data-expiry-message': expiryMessage,
		'data-expiry-redirect': expiryRedirectUrl,
		'data-countdown-style': countdownStyle,
	});

	const isFlipStyle = countdownStyle === 'style-2';

	const renderCountdownItem = (dataAttr, label, key) => (
		<div className="bb-countdown-item" key={key}>
			<span className="bb-countdown-number" data-unit={dataAttr}>
				00
			</span>
			{showLabels && <span className="bb-countdown-label">{label}</span>}
		</div>
	);



	const renderSeparator = (key) =>
		showSeparator && (
			<span className="bb-countdown-separator" key={`sep-${key}`}>
				{separator}
			</span>
		);

	const countdownItems = [];

	if (isFlipStyle) {
		const presets = [];
		if (showDays) presets.push('d');
		if (showHours) presets.push('h');
		if (showMinutes) presets.push('m');
		if (showSeconds) presets.push('s');
		const presetString = `preset(${presets.join(', ')}) -> delay`;

		countdownItems.push(
			<div className="bb-tick" key="flip-clock">
				<div
					data-repeat="true"
					data-layout="horizontal center fit"
					data-transform={presetString}
				>
					{showDays && (
						<div className="tick-group">
							<div
								data-key="value"
								data-repeat="true"
								data-transform="pad(00) -> split -> delay"
							>
								<span data-view="flip"></span>
							</div>
							<span
								data-key="label"
								data-view="text"
								className="tick-label"
							>
								{labelDays}
							</span>
						</div>
					)}
					{showHours && (
						<div className="tick-group">
							<div
								data-key="value"
								data-repeat="true"
								data-transform="pad(00) -> split -> delay"
							>
								<span data-view="flip"></span>
							</div>
							<span
								data-key="label"
								data-view="text"
								className="tick-label"
							>
								{labelHours}
							</span>
						</div>
					)}
					{showMinutes && (
						<div className="tick-group">
							<div
								data-key="value"
								data-repeat="true"
								data-transform="pad(00) -> split -> delay"
							>
								<span data-view="flip"></span>
							</div>
							<span
								data-key="label"
								data-view="text"
								className="tick-label"
							>
								{labelMinutes}
							</span>
						</div>
					)}
					{showSeconds && (
						<div className="tick-group">
							<div
								data-key="value"
								data-repeat="true"
								data-transform="pad(00) -> split -> delay"
							>
								<span data-view="flip"></span>
							</div>
							<span
								data-key="label"
								data-view="text"
								className="tick-label"
							>
								{labelSeconds}
							</span>
						</div>
					)}
				</div>
			</div>
		);
	} else {
		if (showDays) {
			countdownItems.push(renderCountdownItem('00', labelDays, 'days'));
		}
		if (showHours) {
			if (countdownItems.length > 0) {
				countdownItems.push(renderSeparator('hours'));
			}
			countdownItems.push(renderCountdownItem('00', labelHours, 'hours'));
		}
		if (showMinutes) {
			if (countdownItems.length > 0) {
				countdownItems.push(renderSeparator('minutes'));
			}
			countdownItems.push(renderCountdownItem('00', labelMinutes, 'minutes'));
		}
		if (showSeconds) {
			if (countdownItems.length > 0) {
				countdownItems.push(renderSeparator('seconds'));
			}
			countdownItems.push(renderCountdownItem('00', labelSeconds, 'seconds'));
		}
	}

	return (
		<div {...blockProps}>
			<div className="bb-countdown-inner">{countdownItems}</div>
			{expiryAction === 'message' && (
				<div className="bb-countdown-expired" style={{ display: 'none' }}>
					{expiryMessage}
				</div>
			)}
		</div>
	);
}
