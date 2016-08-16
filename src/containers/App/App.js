import React, { Component, PropTypes, } from 'react';
import Helmet from 'react-helmet';
import ga from 'react-ga';
import { asyncConnect } from 'redux-async-connect';

import { sidebarWidth } from 'lib/localStorage';
import config from '../../config';

// this is required!
@asyncConnect([{
  promise: () => Promise.resolve()
}])
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      ga.initialize('UA-81631621-1', { debug: false, });
      ga.pageview(this.props.location.pathname);
    }
  }

  componentWillUpdate(nextProps) {
    if (process.env.NODE_ENV === 'production') {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        ga.pageview(nextProps.location.pathname);
      }
    }
  }

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.App}>
        <Helmet {...config.app.head}/>
        <div className={styles.Header}>
          <h1
            style={{
              width: sidebarWidth(),
            }}
          >
            Material Calculator
          </h1>
        </div>
        { this.props.children }
      </div>
    );
  }
}
