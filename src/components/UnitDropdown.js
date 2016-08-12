import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

import { UNIT_ALIASES } from 'lib/measurements';

@onClickOutside
export default class UnitDropdown extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showUnits: false,
    };
  }

  handleClickOutside() {
    this.setState({ showUnits: false });
  }

  render() {
    const { onChange, value } = this.props;
    const { showUnits } = this.state;
    const styles = require('./UnitDropdown.scss');
    return (
      <span className={styles.UnitDropdown}>
        <button
          onClick={(e) => {
            e.preventDefault();
            this.setState({ showUnits: !showUnits });
          }}
        >
          {UNIT_ALIASES[value]}
        </button>
        {showUnits && (
          <div>
            <ul>
              {Object.keys(UNIT_ALIASES).map((name) => {
                const alias = UNIT_ALIASES[name];
                return (
                  <li key={name}>
                    <button
                      disabled={value === name}
                      onClick={(e) => {
                        e.preventDefault();
                        onChange(name);
                      }}
                    >
                      {name} ({alias})
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </span>
    );
  }
}
