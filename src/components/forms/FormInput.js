import React from 'react';

const FormInput = ({ label, inputProps }) => (
  <div>
    {label && <label>{label + ': '}</label>}
    <input
      {...inputProps}
    />
  </div>
);

export default FormInput;
