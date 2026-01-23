/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockControls,
	RichText,
	useBlockProps,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ColorPalette,
	ToolbarGroup,
	ToolbarDropdownMenu,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import SpacingControl from '../../components/SpacingControl';
import { TypographyGroupControls } from '../../components/Typography/TypographyControl';
import { getHeadingStyles } from './utils';

/**
 * Heading level options for the toolbar dropdown.
 */
const HEADING_LEVELS = [1, 2, 3, 4, 5, 6];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		content,
		level,
		textAlign,
		textColor,
		backgroundColor,
		margin,
		padding,
	} = attributes;

	const TagName = `h${level}`;

	const blockProps = useBlockProps({
		style: getHeadingStyles(attributes),
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={<span style={{ fontWeight: 'bold' }}>H{level}</span>}
						label={__('Change heading level', 'basic-block')}
						controls={HEADING_LEVELS.map((headingLevel) => ({
							title: `H${headingLevel}`,
							isActive: level === headingLevel,
							onClick: () => setAttributes({ level: headingLevel }),
						}))}
					/>
				</ToolbarGroup>
				<AlignmentToolbar
					value={textAlign}
					onChange={(value) => setAttributes({ textAlign: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Settings', 'basic-block')}>
					<SelectControl
						label={__('Heading Level', 'basic-block')}
						value={level}
						options={HEADING_LEVELS.map((l) => ({
							label: `H${l}`,
							value: l,
						}))}
						onChange={(value) => setAttributes({ level: parseInt(value, 10) })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<TypographyGroupControls
					slug="heading"
					attributes={attributes}
					setAttributes={setAttributes}
				/>

				<PanelBody title={__('Color', 'basic-block')} className="basic_block_panel">
					<p>{__('Text Color', 'basic-block')}</p>
					<ColorPalette
						value={textColor}
						onChange={(color) => setAttributes({ textColor: color })}
					/>
					<p>{__('Background Color', 'basic-block')}</p>
					<ColorPalette
						value={backgroundColor}
						onChange={(color) => setAttributes({ backgroundColor: color })}
					/>
				</PanelBody>

				<PanelBody title={__('Spacing', 'basic-block')} className="basic_block_panel">
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

			<RichText
				{...blockProps}
				tagName={TagName}
				value={content}
				onChange={(value) => setAttributes({ content: value })}
				placeholder={__('Write heading...', 'basic-block')}
				style={{
					...blockProps.style,
					textAlign: textAlign,
				}}
			/>
		</>
	);
}
