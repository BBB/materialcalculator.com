import React from 'react';

import FormInput from './components/forms/FormInput';

const CutOptionsForm = ({ onChange, formData }) => (
  <form>
    <h3>Material Size</h3>
    <div>
      <FormInput
        label="Width"
        inputProps={{
          type: 'number',
          value: formData.materialSize.w,
          onChange: (e) => {
            const newMaterialSize = {
              ...formData.materialSize,
              w: Number(e.target.value),
            };
            onChange({ materialSize: newMaterialSize, });
          }
        }}
      />
      <FormInput
        label="Height"
        inputProps={{
          type: 'number',
          value: formData.materialSize.h,
          onChange: (e) => {
            const newMaterialSize = {
              ...formData.materialSize,
              h: Number(e.target.value),
            };
            onChange({ materialSize: newMaterialSize, });
          }
        }}
      />
    </div>
    <h3>Cut Margin</h3>
    <FormInput
      label="Size"
      inputProps={{
        type: 'number',
        value: formData.margin,
        onChange: (e) => onChange({ margin: Number(e.target.value), })
      }}
    />
    <h3>Cut List</h3>
    {
      formData.cuts.map((cut, ix) => {
        const updateValue = (prop, value) => {
          cut[prop] = Number(value);
          onChange(formData);
        }
        return (
          <div key={ix} className="cut">
            <div className="FormInput">
              <label>W</label>
              <input
                {...{
                  type: 'number',
                  value: cut.w,
                  onChange: (e) => updateValue('w', e.target.value),
                }}
              />
              <label>H</label>
              <input
                {...{
                  type: 'number',
                  value: cut.h,
                  onChange: (e) => updateValue('h', e.target.value),
                }}
              />
              <label>x</label>
              <input
                {...{
                  type: 'number',
                  value: cut.count,
                  onChange: (e) => updateValue('count', e.target.value),
                }}
              />
            </div>
            {formData.cuts.length > 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  formData.cuts.splice(ix, 1);
                  onChange(formData);
                }}
              >Remove</button>
            )}
          </div>
        );
      })
    }
    <button
      onClick={(e) => {
        e.preventDefault();
        formData.cuts.push({
          w: 10,
          h: 10,
          count: 1,
        });
        onChange(formData);
      }}
    >
      Add
    </button>
  </form>
);

export default CutOptionsForm;
