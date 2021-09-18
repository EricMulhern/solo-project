import React, { Component } from 'react';
import Button from './Button';
// import SliderButton from './Button';
import { drawHexagon } from "../renderingCallbacks";


class ButtonsDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{position: 'relative', top: '50px', left: '10px', zIndex: 9999}}>
        <div id="controls" className="arrange-vertically">
          <h3 className="buttonHeader">Controls:</h3>
          <Button type="range" buttonName={'Set Board Radius'} buttonProp={'BOARD_RADIUS'} min="1" max="31" inputChange={this.props.inputChange}/>
          <Button type="text" buttonName={'Set Color'} buttonProp={'color'} inputChange={this.props.inputChange}/>
          <Button type="range" buttonName={'Set Speed'} buttonProp={'ms'} min="1" max="2000" inputChange={this.props.inputChange}/>
          {/* <Button type="checkbox" buttonName={'Randomize Size'} buttonProp={'randRad'} inputChange={this.props.inputChange}/> */}
          <div className="checkbox">
            <input type="checkbox" id="randRadCheck"></input>
            <label htmlFor="randRadCheck">Randomize Size</label>
          </div>
        
        </div>

        {/* <input type="text" id="testInput" /> */}
        {/* <input value={"this is the value"} onChange={(e) => {console.log('onCHanage has fired')}}></input> */}

        <button onClick={() => this.props.handleClick( 
          {
            mode: 'sprinkle',
            // BOARD_RADIUS: 17, 
            startCoords: '0,0',
            callback: drawHexagon,
            ms: 10,
            color: 'turquoise',
            randRad: true
          }
        )}>sprinkle mode</button>
        
        <button onClick={
          /*get options values from html input field, populate object accordingly */ 
          // instead of object literal: if (inputValFromQuerySelector) {B.R. = inp...} etc.
          () => this.props.handleClick( 
          {
            mode: 'trickle',
            // BOARD_RADIUS: 17, 
            startCoords: '0,0',
            callback: drawHexagon,
            ms: 20,
            color: 'blues',
            randRad: false
          }
        )}>trickle mode</button>

        <button onClick={
          () => this.props.handleClick(
          /*get options values from html input field, populate object accordingly */ 
          {
            mode: 'multiRecurse',
            // BOARD_RADIUS: 17,
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

export default ButtonsDisplay;
