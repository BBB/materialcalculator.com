import React, { PropTypes } from 'react';
import 'flexboxgrid/css/flexboxgrid.css';

const Col = (props) => {
  const { widths } = props;
  const className = Object.keys(widths || {}).reduce((ret, screenSize) => {
    const colCount = widths[screenSize];
    if (colCount === 'auto') {
      return `${ret} col-${screenSize}`;
    }
    return `${ret} col-${screenSize}-${colCount}`;
  }, '').trim();
  return (
    <div className={className}>
      {props.children}
    </div>
  );
};
Col.propTypes = {
  children: PropTypes.node.isRequired,
  widths: PropTypes.object,
};

export default Col;
