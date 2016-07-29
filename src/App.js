import React, { Component } from 'react';
import './App.css';

import CutRenderer from './CutRenderer';
import CutOptionsForm from './CutOptionsForm';

var myWorker = new Worker('worker.js');

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
    myWorker.onmessage = (e) => {
      this.setState({ areas: e.data });
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      myWorker.postMessage(nextState);
    }
  }


  render() {
    const { areas } = this.state;
    return (
      <div className="App">
        <div className="Content">
          <h1>Material Calculator</h1>
          <p>Calculate the number of pieces of material you will need.</p>
          <CutOptionsForm
            onChange={this.setState.bind(this)}
            formData={this.state}
          />
        </div>
        <CutRenderer areas={areas} />
      </div>
    );
  }
}

export default App;
