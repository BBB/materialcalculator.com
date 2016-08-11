import React, { Children } from 'react';

const FormInput = ({ label, inputProps, children }) => {
  const styles = require('./FormInput.scss');
  return (
    <div className={styles.FormInput}>
      {label && <label htmlFor={inputProps && inputProps.name}>{label + ': '}</label>}
      {children && Children.only(children)}
      {!children && <input {...inputProps} />}
    </div>
  );
};

export default FormInput;
