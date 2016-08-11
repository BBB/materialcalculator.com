import React from 'react';

import FormInput from 'components/forms/FormInput';
import LengthInput from 'components/LengthInput';

const CutOptionsForm = ({ onChange, formData }) => {
  const formInputStyles = require('components/forms/FormInput.scss');
  const styles = require('./CutOptionsForm.scss');
  return (
    <form className={styles.CutOptionsForm}>
      <h3>Material Size</h3>
      <div>
        <FormInput label="Width">
          <LengthInput
            value={formData.materialSize.w}
            onChange={(w) => onChange({
              materialSize: {
                ...formData.materialSize,
                w,
              },
            })}
          />
        </FormInput>
        <FormInput label="Height">
          <LengthInput
            value={formData.materialSize.h}
            onChange={(h) => onChange({
              materialSize: {
                ...formData.materialSize,
                h,
              },
            })}
          />
        </FormInput>
      </div>
      <h3>Cut Margin</h3>
      <FormInput label="Size">
        <LengthInput
          value={formData.margin}
          onChange={(margin) => onChange({
            margin,
          })}
        />
      </FormInput>
      <h3>Cut List</h3>
      {
        formData.cuts.map((cut, ix) => {
          const updateValue = (prop, value) => {
            cut[prop] = value;
            onChange(formData);
          };
          return (
            <div key={ix} className={styles.cut}>
              <div className={formInputStyles.FormInput}>
                <label>W</label>
                <LengthInput
                  onChange={(value) => updateValue('w', value)}
                  value={cut.w}
                />
                <label>H</label>
                <LengthInput
                  onChange={(value) => updateValue('h', value)}
                  value={cut.h}
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
              unit: 'Millimeter',
            },
            h: {
              amount: 10,
              unit: 'Millimeter',
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
