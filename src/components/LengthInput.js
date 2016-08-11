import React, { Component, PropTypes } from 'react';

import { convertAmount } from 'lib/measurements';

import UnitDropdown from 'components/UnitDropdown';

export default class LengthInput extends Component {

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { value, onChange } = this.props;
    const { unit, amount } = value;
    const styles = require('./LengthInput.scss');
    return (
      <div className={styles.LengthInput}>
        <input
          type="number"
          value={amount}
          onChange={(e) => onChange({
            ...value,
            amount: Number(e.target.value),
          })}
        />
        <UnitDropdown
          onChange={(val) => onChange(convertAmount(value, val))}
          value={unit}
        />
      </div>
    );
  }
}
