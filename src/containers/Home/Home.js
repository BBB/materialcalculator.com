import React, { Component } from 'react';
import Helmet from 'react-helmet';

import CutRenderer from 'components/CutRenderer';
import CutOptionsForm from 'components/CutOptionsForm';
import Footer from 'components/Footer';

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
            amount: 100,
            unit: 'Millimeter'
          },
          h: {
            amount: 100,
            unit: 'Millimeter'
          },
          count: 10,
        },
      ],
      materialSize: {
        w: {
          amount: 800,
          unit: 'Millimeter'
        },
        h: {
          amount: 400,
          unit: 'Millimeter'
        },
      },
      margin: {
        amount: 5,
        unit: 'Millimeter'
      },
      areas: [],
    };
    binPackerWorker.postMessage(this.state);

    binPackerWorker.addEventListener('message', e => {
      this.setState({
        areas: e.data
      });
    });
  }


  render() {
    const { areas } = this.state;
    const styles = require('./Home.scss');
    return (
      <div className={styles.MainBody + ''}>
        <Helmet title="Home"/>
        <div className={styles.Sidebar}>
          <p>Calculate the number of pieces of material you will need.</p>
          <CutOptionsForm
            onChange={(data) => {
              this.setState(data);
              binPackerWorker.postMessage({
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
      </div>
    );
  }
}

export default App;
