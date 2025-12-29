/**
 * RangeContainer
 * A flexible range + number input with label, value display, unit, and reset.
 * Inspired by Divi-style controls but implemented from scratch for this plugin.
 */

import { __ } from '@wordpress/i18n';
import { BaseControl, Button, RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { useCallback, useState } from 'react';
import './RangeContainer.css';

const clamp = (val, min, max) => {
    if (val === undefined || val === null || Number.isNaN(Number(val))) return min;
    return Math.min(max, Math.max(min, Number(val)));
};

const RangeContainer = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    unit = 'px',
    onUnitChange,
    defaultValue,
    showReset = true,
    disabled = false,
    allowEmpty = false,
}) => {
    const handleRangeChange = useCallback((v) => {
        if (allowEmpty && (v === '' || v === null)) {
            onChange('');
            return;
        }
        onChange(clamp(v, min, max));
    }, [onChange, min, max, allowEmpty]);

    const handleNumberChange = useCallback((v) => {
        if (allowEmpty && v === '') {
            onChange('');
            return;
        }
        const num = Number(v);
        if (Number.isNaN(num)) return;
        onChange(clamp(num, min, max));
    }, [onChange, min, max, allowEmpty]);

    const reset = useCallback(() => {
        if (defaultValue !== undefined) {
            onChange(defaultValue);
        } else {
            onChange(min);
        }
    }, [defaultValue, onChange, min]);

    const [internalUnit, setInternalUnit] = useState(unit || 'px');
    const isControlledUnit = typeof onUnitChange === 'function';
    const currentUnit = isControlledUnit ? unit : internalUnit;

    const displayValue = value === '' || value === null || value === undefined
        ? ''
        : `${value}${currentUnit ? currentUnit : ''}`;

    return (
        <BaseControl
            className="bb-range-container"
            label={label}
            help={undefined}
        >
            <div className="bb-range-header">
                <div className="bb-range-label">{label}</div>
                
                {showReset && (
                    <Button
                        className="bb-range-reset"
                        variant="tertiary"
                        onClick={reset}
                        disabled={disabled}
                        aria-label={__('Reset to default', 'basic-block')}
                    >
                        {__('Reset', 'basic-block')}
                    </Button>
                )}
            </div>

            <div className="bb-range-controls">
                <RangeControl
                    value={typeof value === 'number' ? value : (allowEmpty ? 0 : min)}
                    onChange={handleRangeChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                />
                {/* <TextControl
                    type="hidden"
                    className="bb-range-number"
                    value={value === '' || value === null || value === undefined ? '' : String(value)}
                    onChange={handleNumberChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    aria-label={__('Numeric value', 'basic-block')}
                /> */}
                <SelectControl
                    className="bb-range-unit-select"
                    value={currentUnit || ''}
                    onChange={(newUnit) => {
                        if (isControlledUnit) {
                            onUnitChange(newUnit);
                        } else {
                            setInternalUnit(newUnit);
                        }
                    }}
                    disabled={disabled}
                    options={[
                        { label: __('px', 'basic-block'), value: 'px' },
                        { label: __('em', 'basic-block'), value: 'em' },
                        { label: __('rem', 'basic-block'), value: 'rem' },
                        { label: __('%', 'basic-block'), value: '%' },
                        { label: __('vw', 'basic-block'), value: 'vw' },
                    ]}
                />
            </div>
        </BaseControl>
    );
};

export { RangeContainer };
