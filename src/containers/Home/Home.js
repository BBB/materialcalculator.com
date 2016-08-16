import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SplitPane from 'react-split-pane';

import CutRenderer from 'components/CutRenderer';
import CutOptionsForm from 'components/CutOptionsForm';
import Footer from 'components/Footer';

import { sidebarWidth } from 'lib/localStorage';

let BinPackerWorker;
let binPackerWorker = {
  postMessage() {},
  addEventListener() {},
};
if (__CLIENT__) {
  BinPackerWorker = require('worker?inline=true!../../lib/worker.js');
  binPackerWorker = new BinPackerWorker();
}
binPackerWorker.addEventListener('error', err => console.error(err));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cuts: [
        {
          w: {
            amount: 0.5,
            unit: 'Meter'
          },
          h: {
            amount: 500,
            unit: 'Millimeter'
          },
          count: 10,
        },
      ],
      materialSize: {
        w: {
          amount: 8,
          unit: 'Foot'
        },
        h: {
          amount: 4,
          unit: 'Foot'
        },
      },
      margin: {
        amount: 2,
        unit: 'Inch'
      },
      areas: [],
    };
    this.postData(this.state);

    binPackerWorker.addEventListener('message', e => {
      this.setState({
        areas: e.data
      });
    });
  }

  postData(data) {
    binPackerWorker.postMessage(data);
  }

  render() {
    const { areas } = this.state;
    const styles = require('./Home.scss');
    return (
      <div className={styles.MainBody + ''}>
        <Helmet title="Home"/>
        <SplitPane
          split="vertical"
          resizerStyle={styles.Resizer}
          defaultSize={'40%'}
          defaultSize={ sidebarWidth() }
          onChange={ size => sidebarWidth(size) }
        >
          <div className={styles.Sidebar}>
            <p>Calculate the number of pieces of material you will need.</p>
            <CutOptionsForm
              onChange={(data) => {
                this.setState(data);
                this.postData({
                  ...this.state,
                  ...data
                });
              }}
              formData={this.state}
            />
          </div>
          <div className={styles.Content + ''}>
            <CutRenderer areas={areas} />
            <Footer />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
