import React, { Children } from 'react';
import Col from 'components/grid/Col';
import Row from 'components/grid/Row';

const FormInput = ({ label, inputProps, children }) => {
  const styles = require('./FormInput.scss');
  const autoWidth = { xs: 'auto' };
  return (
    <Row className={styles.FormInput}>
      {label && <Col widths={autoWidth}><label htmlFor={inputProps && inputProps.name}>{label + ': '}</label></Col>}
      {children && <Col widths={autoWidth}>{Children.only(children)}</Col>}
      {!children && <Col widths={autoWidth}><input {...inputProps} /></Col>}
    </Row>
  );
};

export default FormInput;
