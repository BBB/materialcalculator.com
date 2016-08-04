import React from 'react';

const FormInput = ({ label, inputProps }) => {
  const styles = require('./FormInput.scss');
  return (
    <div className={styles.FormInput}>
      {label && <label htmlFor={inputProps.name}>{label + ': '}</label>}
      <input
        {...inputProps}
      />
    </div>
  );
};

export default FormInput;
