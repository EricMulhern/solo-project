import React, { Component } from 'react';
import useCanvas from './useCanvas';
import Canvas from './Canvas';
import ButtonsDisplay from './ButtonsDisplay';
import { drawHexagon } from "../renderingCallbacks";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'multiRecurse',
      BOARD_RADIUS: 17,
      startCoords: '0,0',
      callback: drawHexagon,
      ms: 20,
      color: 'pinks',
      randRad: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(newState) {
    this.setState({
      ...newState
    });
  }

  render() {
    return (
      <div>
        <div id="test">THE APP IS LOADING PROPERLY</div>
        <ButtonsDisplay handleClick={this.handleClick} props={this.state}/>
        <Canvas props={this.state}></Canvas>
      </div>
    );
  }
}

export default App;
