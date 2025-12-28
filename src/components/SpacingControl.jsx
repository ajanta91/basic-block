// components/DimensionControl.js
import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl, TextControl } from '@wordpress/components';

const SpacingControl = ({ label, values, onChange }) => {
  const handleChange = (side, value) => {
    onChange({
      ...values,
      [side]: value || '',
    });
  };

  return (
    <BaseControl label={label} className="bb-spacing-control">
      <div className="bb-spacing-control__inputs">
        <TextControl
          label={__('Top', 'basic-block')}
          value={values.top}
          onChange={(value) => handleChange('top', value)}
          type="number"
        />
        <TextControl
          label={__('Right', 'basic-block')}
          value={values.right}
          onChange={(value) => handleChange('right', value)}
          type="number"
        />
        <TextControl
          label={__('Bottom', 'basic-block')}
          value={values.bottom}
          onChange={(value) => handleChange('bottom', value)}
          type="number"
        />
        <TextControl
          label={__('Left', 'basic-block')}
          value={values.left}
          onChange={(value) => handleChange('left', value)}
          type="number"
        />
        <SelectControl
          label={__('Unit', 'basic-block')}
          value={values.unit}
          options={[
            { label: __('px', 'basic-block'), value: 'px' },
            { label: __('%', 'basic-block'), value: '%' },
            { label: __('em', 'basic-block'), value: 'em' },
            { label: __('rem', 'basic-block'), value: 'rem' },
            { label: __('vw', 'basic-block'), value: 'vw' },
            { label: __('vh', 'basic-block'), value: 'vh' }
          ]}
          onChange={(value) => onChange({ ...values, unit: value })}
        />
      </div>
    </BaseControl>
  );
};

export default SpacingControl;