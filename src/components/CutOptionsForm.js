import React from 'react';

import FormInput from 'components/forms/FormInput';

const CutOptionsForm = ({ onChange, formData }) => {
  const formInputStyles = require('components/forms/FormInput.scss');
  const styles = require('./CutOptionsForm.scss');
  return (
    <form className={styles.CutOptionsForm}>
      <h3>Material Size</h3>
      <div>
        <FormInput
          label="Width"
          inputProps={{
            type: 'number',
            value: formData.materialSize.w.amount,
            onChange: (e) => {
              const newMaterialSize = {
                ...formData.materialSize,
                w: {
                  ...formData.materialSize.w,
                  amount: Number(e.target.value),
                }
              };
              onChange({ materialSize: newMaterialSize, });
            }
          }}
        />
        <FormInput
          label="Height"
          inputProps={{
            type: 'number',
            value: formData.materialSize.h.amount,
            onChange: (e) => {
              const newMaterialSize = {
                ...formData.materialSize,
                h: {
                  ...formData.materialSize.h,
                  amount: Number(e.target.value),
                }
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
          value: formData.margin.amount,
          onChange: (e) => onChange({
            margin: {
              ...formData.margin,
              amount: Number(e.target.value),
            }
          })
        }}
      />
      <h3>Cut List</h3>
      {
        formData.cuts.map((cut, ix) => {
          const updateValue = (prop, value) => {
            cut[prop] = {
              ...cut[prop],
              amount: Number(value),
            };
            onChange(formData);
          };
          return (
            <div key={ix} className={styles.cut}>
              <div className={formInputStyles.FormInput}>
                <label>W</label>
                <input
                  {...{
                    type: 'number',
                    value: cut.w.amount,
                    onChange: (e) => updateValue('w', e.target.value),
                  }}
                />
                <label>H</label>
                <input
                  {...{
                    type: 'number',
                    value: cut.h.amount,
                    onChange: (e) => updateValue('h', e.target.value),
                  }}
                />
                <label>x</label>
                <input
                  {...{
                    type: 'number',
                    value: cut.count,
                    onChange: (e) => {
                      cut.count = Number(e.target.value);
                      onChange(formData);
                    },
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
            w: {
              amount: 10,
              unit: 'Millimeters',
            },
            h: {
              amount: 10,
              unit: 'Millimeters',
            },
            count: 1,
          });
          onChange(formData);
        }}
      >
        Add
      </button>
    </form>
  );
};
export default CutOptionsForm;
