import React, { Component } from 'react';
import { drawHexagon } from "../renderingCallbacks";


class ButtonsDisplay extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);

  }

  render() {
    return (
      <div>
        <input type="text" id="testInput" />
        <input value={"this is the value"} onChange={(e) => {console.log('onCHanage has fired')}}></input>

        <button id="reset" onClick={() => this.setState(/*do stuff  */)}>sprinkle mode</button>
        <button id="reset" onClick={
          /*get options values from html input field, populate object accordingly */ 
          // instead of object literal: if (inputValFromQuerySelector) {B.R. = inp...} etc.
          () => this.setState( 
          {
            mode: 'trickle',
            BOARD_RADIUS: 17, 
            startCoords: '0,0',
            callback: drawHexagon,
            ms: 20,
            color: 'blues',
            randRad: false
          }
        )}>trickle mode</button>
        <button id="reset" onClick={
          () => this.setState(
          /*get options values from html input field, populate object accordingly */ 
          {
            mode: 'multiRecurse',
            BOARD_RADIUS: 17,
            startCoords: '0,0',
            callback: drawHexagon,
            ms: 20,
            color: 'pinks',
            randRad: true
          }
        )}>ripple mode</button> {/*RIPPLE MODE IS THE SAME AS MULTIRECURSE */}
      </div>
    )
  }
}