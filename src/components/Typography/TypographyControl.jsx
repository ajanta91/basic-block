/**
 * Typography control component.
 * includes font family, size, weight, style, and decoration options.
 *
 * @param {string} prefix - Optional prefix for attribute names (e.g., 'number' for 'numberFontFamily')
 * @param {string} title - Optional custom title for the panel (default: 'Typography')
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { RangeContainer } from '../RangeContainer/RangeContainer';

const TypographyGroupControls = ({ slug, attributes, setAttributes, prefix = '', title = '' }) => {
    // Helper to get attribute name with optional prefix
    const getAttrName = (name) => {
        if (!prefix) return name;
        return prefix + name.charAt(0).toUpperCase() + name.slice(1);
    };

    // Helper to get attribute value
    const getAttr = (name) => attributes[getAttrName(name)];

    // Helper to set attribute value
    const setAttr = (name, value) => setAttributes({ [getAttrName(name)]: value });

    const panelTitle = title || __('Typography', 'basic-block');

    return (
        <PanelBody
            title={panelTitle}
            className='bb_typography basic_block_panel'
            initialOpen={false}
        >
            <SelectControl
                label={__('Font Family', 'basic-block')}
                value={getAttr('fontFamily') || ''}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Arial', 'basic-block'), value: 'Arial, sans-serif' },
                    { label: __('Georgia', 'basic-block'), value: 'Georgia, serif' },
                    { label: __('Helvetica', 'basic-block'), value: 'Helvetica, sans-serif' },
                    { label: __('Times New Roman', 'basic-block'), value: '"Times New Roman", serif' },
                    { label: __('Verdana', 'basic-block'), value: 'Verdana, sans-serif' },
                    { label: __('Courier New', 'basic-block'), value: '"Courier New", monospace' },
                ]}
                onChange={(value) => setAttr('fontFamily', value)}
            />
            <RangeContainer
                label={__('Font Size', 'basic-block')}
                value={getAttr('fontSize')}
                onChange={(value) => setAttr('fontSize', value)}
                min={1}
                max={200}
                step={1}
                unit={getAttr('fontSizeUnit') || 'px'}
                onUnitChange={(u) => setAttr('fontSizeUnit', u)}
                defaultValue={16}
            />
            <SelectControl
                label={__('Font Weight', 'basic-block')}
                value={getAttr('fontWeight') || ''}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('100 (Thin)', 'basic-block'), value: '100' },
                    { label: __('200 (Extra Light)', 'basic-block'), value: '200' },
                    { label: __('300 (Light)', 'basic-block'), value: '300' },
                    { label: __('400 (Normal)', 'basic-block'), value: '400' },
                    { label: __('500 (Medium)', 'basic-block'), value: '500' },
                    { label: __('600 (Semi Bold)', 'basic-block'), value: '600' },
                    { label: __('700 (Bold)', 'basic-block'), value: '700' },
                    { label: __('800 (Extra Bold)', 'basic-block'), value: '800' },
                    { label: __('900 (Black)', 'basic-block'), value: '900' },
                ]}
                onChange={(value) => setAttr('fontWeight', value)}
            />

            <SelectControl
                label={__('Transform', 'basic-block')}
                value={getAttr('textTransform') || getAttr('transform') || ''}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Uppercase', 'basic-block'), value: 'uppercase' },
                    { label: __('Lowercase', 'basic-block'), value: 'lowercase' },
                    { label: __('Capitalize', 'basic-block'), value: 'capitalize' },
                    { label: __('Normal', 'basic-block'), value: 'none' },
                ]}
                onChange={(value) => {
                    // Support both textTransform and transform attribute names
                    if (attributes.hasOwnProperty(getAttrName('textTransform'))) {
                        setAttr('textTransform', value);
                    } else {
                        setAttr('transform', value);
                    }
                }}
            />

            <SelectControl
                label={__('Font Style', 'basic-block')}
                value={getAttr('fontStyle') || ''}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Normal', 'basic-block'), value: 'normal' },
                    { label: __('Italic', 'basic-block'), value: 'italic' },
                    { label: __('Oblique', 'basic-block'), value: 'oblique' },
                ]}
                onChange={(value) => setAttr('fontStyle', value)}
            />
            <SelectControl
                label={__('Text Decoration', 'basic-block')}
                value={getAttr('textDecoration') || ''}
                options={[
                    { label: __('Default', 'basic-block'), value: '' },
                    { label: __('Underline', 'basic-block'), value: 'underline' },
                    { label: __('Overline', 'basic-block'), value: 'overline' },
                    { label: __('Line Through', 'basic-block'), value: 'line-through' },
                    { label: __('None', 'basic-block'), value: 'none' },
                ]}
                onChange={(value) => setAttr('textDecoration', value)}
            />
        </PanelBody>
    );
};
export { TypographyGroupControls };

// TypographyControl style applyment in edit.js
const TypographyStyleProps = ({ attributes }) => {
    return {
        fontFamily: attributes.fontFamily || undefined,
        fontSize: attributes.fontSize ? `${attributes.fontSize}px` : undefined,
        fontWeight: attributes.fontWeight || undefined,
        textTransform: attributes.transform || undefined,
        fontStyle: attributes.fontStyle || undefined,
        textDecoration: attributes.textDecoration || undefined,
    };
};

export { TypographyStyleProps };


