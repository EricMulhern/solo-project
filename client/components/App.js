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
      randRad: true,
      intensityMode: 'smooth_mountain'
    };
    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
    // document.onmousemove = this.handleMouseMove; // is this really the best place for this?
    document.addEventListener("click", this.getMousePos);
  }

  inputChange(buttonName, value) {
    const newButtonInfo = {};
    // if (value === 'on') newButtonInfo[buttonName] = true;
    // else if (value === 'off') newButtonInfo[buttonName] = false;
    newButtonInfo[buttonName] = value;
    
    this.setState({
      ...this.state,
      ...newButtonInfo
    });
  }
  
  handleClick(newState) {
    this.setState({
      ...this.state,
      ...newState
    });
  }

  getMousePos(event)  { //spaghetti https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
    // var eventDoc, doc, body;
    event = event || window.event; // IE-ism
    const newMouseInfo = {
      mouseX: event.screenX,
      mouseY: event.screenY,
    };

    console.log(event);
    this.setState({
      ...this.state,
      ...newMouseInfo
    })
  }

  render() {
    return (
      <div>
        {/* <div id="test">THE APP IS LOADING PROPERLY</div> */}
        <ButtonsDisplay handleClick={this.handleClick} inputChange={this.inputChange} getMousePos={this.getMousePos} props={this.state}/>
        <Canvas props={this.state}></Canvas>
      </div>
    );
  }
}

export default App;
