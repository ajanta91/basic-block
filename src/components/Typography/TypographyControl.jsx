/**
 * Typography control component.
 * includes font family, size, weight, style, and decoration options.
 * 
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { RangeContainer } from '../RangeContainer/RangeContainer';

const TypographyGroupControls = ({ slug, attributes, setAttributes }) => {
    const { fontFamily_, fontSize_, fontSizeUnit, fontWeight, transform, fontStyle, textDecoration, } = attributes;


    return (
        <PanelBody
            title={__('Typography', 'basic-block')}
            className='bb_typography basic_block_panel'
        >
            <SelectControl
                label={__('Font Family', 'basic-block')}
                value={fontFamily_}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Arial', 'basic-block'), value: 'Arial, sans-serif' },
                    { label: __('Georgia', 'basic-block'), value: 'Georgia, serif' },
                    { label: __('Helvetica', 'basic-block'), value: 'Helvetica, sans-serif' },
                    { label: __('Times New Roman', 'basic-block'), value: '"Times New Roman", serif' },
                ]}
                onChange={(value) => setAttributes({ fontFamily_: value })}
            />
            <RangeContainer
                label={__('Font Size', 'basic-block')}
                value={fontSize_}
                onChange={(value) => setAttributes({ fontSize_: value })}
                min={1}
                max={200}
                step={1}
                unit={fontSizeUnit || 'px'}
                onUnitChange={(u) => setAttributes({ fontSizeUnit: u })}
                defaultValue={16}
            />
            <SelectControl
                label={__('Font Weight', 'basic-block')}
                value={fontWeight}
                options={[
                    { label: __('100 (Thin)', 'basic-block'), value: '100' },
                    { label: __('200 (Extra Light)', 'basic-block'), value: '200' },
                    { label: __('300 (Light)', 'basic-block'), value: '300' },
                    { label: __('400 (Normal)', 'basic-block'), value: '400' },
                    { label: __('500 (Medium)', 'basic-block'), value: '500' },
                    { label: __('600 (Semi Bold)', 'basic-block'), value: '600' },
                    { label: __('700 (Bold)', 'basic-block'), value: '700' },
                    { label: __('800 (Extra Bold)', 'basic-block'), value: '800' },
                    { label: __('900 (Black)', 'basic-block'), value: '900' },
                    { label: __('Default', 'basic-block'), value: '' },
                ]}
                onChange={(value) => setAttributes({ fontWeight: value })}
            />

            <SelectControl
                label={__('Transform', 'basic-block')}
                value={transform}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Uppercase', 'basic-block'), value: 'uppercase' },
                    { label: __('Lowercase', 'basic-block'), value: 'lowercase' },
                    { label: __('Capitalize', 'basic-block'), value: 'capitalize' },
                    { label: __('Normal', 'basic-block'), value: 'none' },
                ]}
                onChange={(value) => setAttributes({ transform: value })}
            />

            <SelectControl
                label={__('Font Style', 'basic-block')}
                value={fontStyle}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Normal', 'basic-block'), value: 'normal' },
                    { label: __('Italic', 'basic-block'), value: 'italic' },
                    { label: __('Oblique', 'basic-block'), value: 'oblique' },
                ]}
                onChange={(value) => setAttributes({ fontStyle: value })}
            />
            <SelectControl
                label={__('Text Decoration', 'basic-block')}
                value={textDecoration}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Underline', 'basic-block'), value: 'underline' },
                    { label: __('Overline', 'basic-block'), value: 'overline' },
                    { label: __('Line Through', 'basic-block'), value: 'line-through' },
                    { label: __('None', 'basic-block'), value: 'none' },
                ]}
                onChange={(value) => setAttributes({ textDecoration: value })}
            />
        </PanelBody>
    );
};
export { TypographyGroupControls };

// TypographyControl style applyment in edit.js
const TypographyStyleProps = ({ attributes }) => {
    return {
        fontFamily: attributes.fontFamily_ || undefined,
        fontSize: attributes.fontSize_ ? `${attributes.fontSize_}px` : undefined,
        fontWeight: attributes.fontWeight || undefined,
        textTransform: attributes.transform || undefined,
        fontStyle: attributes.fontStyle || undefined,
        textDecoration: attributes.textDecoration || undefined,
    };
};

export { TypographyStyleProps };


