import React, { PropTypes, Component } from 'react';

import Visualisation from 'components/Visualisation';

export default class CutRenderer extends Component {

  static propTypes = {
    areas: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      maxSize: {
        w: 0,
        h: 0,
      }
    };
    this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    global.window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    global.window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const w = global.window;
    const d = global.document;
    const documentElement = d && d.documentElement;
    const body = d && d.getElementsByTagName('body')[0];
    const height = (w && w.innerHeight) || (documentElement && documentElement.clientHeight) || (body && body.clientHeight) || 0;
    this.setState({
      maxSize: {
        ...this.state.maxSize,
        h: height > 0 ? (height - 100) : 0, // approx for header & footer
      },
    });
  }

  render() {
    const { areas, } = this.props;
    const { maxSize, } = this.state;
    const styles = require('./CutRenderer.scss');
    return (
      <div
        className={styles.CutRenderer}
        ref={(node) => {
          if (!node) {
            return;
          }
          if (node.clientWidth === maxSize.w) {
            return;
          }
          this.setState({
            maxSize: {
              ...maxSize,
              w: node.clientWidth,
            }
          });
        }}
      >
        <div className="inner">
          <Visualisation
            areas={areas}
            maxSize={maxSize}
          />
        </div>
      </div>
    );
  }
}
