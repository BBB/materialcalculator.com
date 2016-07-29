import React, { Component } from 'react';
import './App.css';

import binPacker from './lib/binPacker';

import CutRenderer from './CutRenderer';
import CutOptionsForm from './CutOptionsForm';

function* times(n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

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
    }
  }

  isValid() {
    const { cuts, materialSize } = this.state;
    if (!materialSize.hasOwnProperty('w') || materialSize.w < 1) {
      return false;
    }
    if (!materialSize.hasOwnProperty('h') || materialSize.h < 1) {
      return false;
    }
    for (var i = 0; i < cuts.length; i++) {
      const cut = cuts[i];
      if (!cut.hasOwnProperty('w') || cut.w < 1) {
        return false;
      }
      if (!cut.hasOwnProperty('h') || cut.h < 1) {
        return false;
      }
      if (Math.min(cut.w, cut.h) > Math.min(materialSize.w, materialSize.h)) {
        return false;
      }
      if (Math.max(cut.w, cut.h) > Math.max(materialSize.w, materialSize.h)) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { cuts, materialSize, margin } = this.state;

    let areas = [];
    if (this.isValid()) {
      const finalCuts = cuts.reduce((ret, cut) => {
        // eslint-disable-next-line
        for (let _ of times(cut.count)) {
          ret.push(cut);
        }
        return ret;
      }, [])
      areas = binPacker(finalCuts, materialSize, margin - 1);
    }

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
