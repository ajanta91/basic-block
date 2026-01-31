import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
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

	if ( ! targetDate ) {
		return null;
	}

	const blockStyles = {
		'--bb-countdown-alignment': alignment,
		'--bb-countdown-gap': `${ itemGap }${ itemGapUnit }`,
		'--bb-countdown-bg': backgroundColor || undefined,
		'--bb-countdown-item-bg': itemBackgroundColor || undefined,
		'--bb-countdown-number-color': numberColor || undefined,
		'--bb-countdown-label-color': labelColor || undefined,
		'--bb-countdown-separator-color': separatorColor || undefined,
		'--bb-countdown-number-font': numberFontFamily || undefined,
		'--bb-countdown-number-size': `${ numberFontSize }${ numberFontSizeUnit }`,
		'--bb-countdown-number-weight': numberFontWeight,
		'--bb-countdown-number-transform': numberTextTransform || undefined,
		'--bb-countdown-number-style': numberFontStyle || undefined,
		'--bb-countdown-number-decoration': numberTextDecoration || undefined,
		'--bb-countdown-label-font': labelFontFamily || undefined,
		'--bb-countdown-label-size': `${ labelFontSize }${ labelFontSizeUnit }`,
		'--bb-countdown-label-weight': labelFontWeight,
		'--bb-countdown-label-transform': labelTextTransform,
		'--bb-countdown-label-style': labelFontStyle || undefined,
		'--bb-countdown-label-decoration': labelTextDecoration || undefined,
		'--bb-countdown-separator-font': separatorFontFamily || undefined,
		'--bb-countdown-separator-size': `${ separatorFontSize }${ separatorFontSizeUnit }`,
		'--bb-countdown-separator-weight': separatorFontWeight || undefined,
		'--bb-countdown-separator-transform': separatorTextTransform || undefined,
		'--bb-countdown-separator-style': separatorFontStyle || undefined,
		'--bb-countdown-separator-decoration': separatorTextDecoration || undefined,
		'--bb-countdown-item-padding': itemPadding
			? `${ itemPadding.top }${ itemPadding.unit } ${ itemPadding.right }${ itemPadding.unit } ${ itemPadding.bottom }${ itemPadding.unit } ${ itemPadding.left }${ itemPadding.unit }`
			: undefined,
		'--bb-countdown-item-border': itemBorderWidth
			? `${ itemBorderWidth }px ${ itemBorderStyle } ${ itemBorderColor || '#ccc' }`
			: undefined,
		'--bb-countdown-item-radius': `${ itemBorderRadius }px`,
		'--bb-countdown-item-shadow': `${ itemBoxShadowHorizontal }px ${ itemBoxShadowVertical }px ${ itemBoxShadowBlur }px ${ itemBoxShadowSpread }px ${ itemBoxShadowColor }`,
		marginTop: margin?.top ? `${ margin.top }${ margin.unit }` : undefined,
		marginRight: margin?.right ? `${ margin.right }${ margin.unit }` : undefined,
		marginBottom: margin?.bottom ? `${ margin.bottom }${ margin.unit }` : undefined,
		marginLeft: margin?.left ? `${ margin.left }${ margin.unit }` : undefined,
		paddingTop: padding?.top ? `${ padding.top }${ padding.unit }` : undefined,
		paddingRight: padding?.right ? `${ padding.right }${ padding.unit }` : undefined,
		paddingBottom: padding?.bottom ? `${ padding.bottom }${ padding.unit }` : undefined,
		paddingLeft: padding?.left ? `${ padding.left }${ padding.unit }` : undefined,
	};

	const blockProps = useBlockProps.save( {
		className: `bb-countdown-wrapper bb-countdown-${ layout }`,
		style: blockStyles,
		'data-target-date': targetDate,
		'data-target-time': targetTime,
		'data-expiry-action': expiryAction,
		'data-expiry-message': expiryMessage,
		'data-expiry-redirect': expiryRedirectUrl,
	} );

	const renderCountdownItem = ( dataAttr, label, key ) => (
		<div className="bb-countdown-item" key={ key }>
			<span className="bb-countdown-number" data-unit={ dataAttr }>
				00
			</span>
			{ showLabels && <span className="bb-countdown-label">{ label }</span> }
		</div>
	);

	const renderSeparator = ( key ) =>
		showSeparator && (
			<span className="bb-countdown-separator" key={ `sep-${ key }` }>
				{ separator }
			</span>
		);

	const countdownItems = [];

	if ( showDays ) {
		countdownItems.push( renderCountdownItem( 'days', labelDays, 'days' ) );
	}
	if ( showHours ) {
		if ( countdownItems.length > 0 ) {
			countdownItems.push( renderSeparator( 'hours' ) );
		}
		countdownItems.push( renderCountdownItem( 'hours', labelHours, 'hours' ) );
	}
	if ( showMinutes ) {
		if ( countdownItems.length > 0 ) {
			countdownItems.push( renderSeparator( 'minutes' ) );
		}
		countdownItems.push( renderCountdownItem( 'minutes', labelMinutes, 'minutes' ) );
	}
	if ( showSeconds ) {
		if ( countdownItems.length > 0 ) {
			countdownItems.push( renderSeparator( 'seconds' ) );
		}
		countdownItems.push( renderCountdownItem( 'seconds', labelSeconds, 'seconds' ) );
	}

	return (
		<div { ...blockProps }>
			<div className="bb-countdown-inner">{ countdownItems }</div>
			{ expiryAction === 'message' && (
				<div className="bb-countdown-expired" style={ { display: 'none' } }>
					{ expiryMessage }
				</div>
			) }
		</div>
	);
}
