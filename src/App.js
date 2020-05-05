import React, { Component } from 'react';
import Board from './components/Board';

import "./styles/main.scss"

export class App extends Component {

  render() {
    return (
      <div>
          <Board />
      </div>
    );
  }
}

export default App;
