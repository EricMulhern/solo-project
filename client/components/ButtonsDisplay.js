import React, { Component } from 'react';
import Button from './Button';
import { drawHexagon } from "../renderingCallbacks";
import Run from './run.js';
import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

class ButtonsDisplay extends Component {
  constructor(props) {
    super(props);
    this.checkboxInput = React.createRef();

  }

  render() {
    return (
      <div style={{position: 'relative', top: '230px', left: '10px', zIndex: 9999}}>
        <div id="controls" className="arrange-vertically">
          {/* <h3 className="buttonHeader">Controls:</h3> */}
          <Button type="range" buttonName={'Set Board Radius'} buttonProp={'BOARD_RADIUS'} min="1" max="99" inputChange={this.props.inputChange}/>
          <Button type="range" buttonName={'Set Speed'} buttonProp={'ms'} min="1" max="800" inputChange={this.props.inputChange}/>
          <Button type="text" buttonName={'Set Color'} buttonProp={'color'} inputChange={this.props.inputChange}/>
          <h4 style={{color: 'rgb(186,186,186)'}}>color options: reds, pinks, blues, flat_blues,</h4>
          <h4 style={{color: 'rgb(186,186,186)'}}>greys, turquoise, lavender, beehive, christmas</h4>
          <Button type="text" buttonName={'Set Terrain'} buttonProp={'intensityMode'} inputChange={this.props.inputChange}/>
          <h4 style={{color: 'rgb(186,186,186)'}}>terrain options: mountain, smooth_mountain, crater,</h4>
          <h4 style={{color: 'rgb(186,186,186)'}}>smooth_crater, pyramid, anti_pyramid, random</h4>
          <div className="checkbox">
            <input type="checkbox" id="randRadCheck" ref={this.checkboxInput} onChange={() => {
              // const boolVal = this.checkboxInput.current.value === 'on';
              console.log('checkbox val: ', this.checkboxInput.current.checked);
              this.props.inputChange('randRad', this.checkboxInput.current.checked)
            }}></input>
            <label htmlFor="randRadCheck">Randomize Size</label>
          </div>
        </div>

        {/* <input type="text" id="testInput" /> */}
        {/* <input value={"this is the value"} onChange={(e) => {console.log('onCHanage has fired')}}></input> */}
        <div id="modes" className="arrange-horizontally">
          {/* <label className="buttonHeader">Modes:</label> */}

          <button onClick={() => this.props.handleClick( 
            {
              mode: 'sprinkle',
              // BOARD_RADIUS: 17, 
              // startCoords: '0,0',
              callback: drawHexagon,
              // ms: 10,
              color: 'beehive',
              // randRad: true
            }
          )}>Sprinkle Mode</button>
          
          <button onClick={
            /*get options values from html input field, populate object accordingly */ 
            // instead of object literal: if (inputValFromQuerySelector) {B.R. = inp...} etc.
            () => this.props.handleClick( 
            {
              mode: 'trickle',
              // BOARD_RADIUS: 17, 
              // startCoords: '0,0',
              callback: drawHexagon,
              // ms: 20,
              color: 'flat_blues',
              randRad: false
            }
          )}>Trickle Mode</button>

          <button onClick={
            () => this.props.handleClick(
            /*get options values from html input field, populate object accordingly */ 
            {
              mode: 'multiRecurse',
              // BOARD_RADIUS: 17,
              // startCoords: '0,0',
              callback: drawHexagon,
              // ms: 20,
              color: 'pinks',
              // randRad: true
            }
          )}>Ripple Mode</button> {/*RIPPLE MODE IS THE SAME AS MULTIRECURSE */}

          {/* <button onClick={() => this.props.handleClick( 
            {
              mode: 'paintbrush',
              // BOARD_RADIUS: 17, 
              // startCoords: '0,0',
              callback: drawHexagon,
              // ms: 10,
              color: 'reds',
              // randRad: true
            }
          )}>Paintbrush Mode</button> */}
          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}


          {/*TODO: add button for linear*/}


        </div>

        <Run {...this.props}/>
      </div>
    )
  }
}

export default ButtonsDisplay;
