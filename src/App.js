import React, { Component } from 'react';
import './App.css';

import CutRenderer from './CutRenderer';
import CutOptionsForm from './CutOptionsForm';
import Footer from './Footer';

import BinPackerWorker from 'worker!./worker.js';

var binPackerWorker = new BinPackerWorker();

binPackerWorker.addEventListener('error', err => console.error(err));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cuts: [
        {
          w: 100,
          h: 100,
          count: 10,
        },
      ],
      materialSize: {
        w: 800,
        h: 400,
      },
      margin: 5,
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
    return (
      <div className="App">
        <div className="Header">
          <h1>Material Calculator</h1>
        </div>
        <div className="Main">
          <div className="Sidebar">
            <p>Calculate the number of pieces of material you will need.</p>
            <CutOptionsForm
              onChange={(data) => {
                binPackerWorker.postMessage(data);
                this.setState(data);
              }}
              formData={this.state}
            />
          </div>
          <div className="Content">
            <CutRenderer areas={areas} />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
