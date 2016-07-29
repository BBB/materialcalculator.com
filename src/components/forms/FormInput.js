import React from 'react';

import './FormInput.css';

const FormInput = ({ label, inputProps }) => (
  <div className="FormInput">
    {label && <label htmlFor={inputProps.name}>{label + ': '}</label>}
    <input
      {...inputProps}
    />
  </div>
);

export default FormInput;
