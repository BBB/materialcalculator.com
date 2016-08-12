import React, { PropTypes } from 'react';
import 'flexboxgrid/css/flexboxgrid.css';

const Row = (props) => {
  return (
    <div className={'row' + ` ${props.className}`}>
      {props.children}
    </div>
  );
};
Row.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Row;
