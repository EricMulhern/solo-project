// import React, { useRef, useEffect } from 'react'

import { useRef, useEffect } from 'react';
import { c, canvas } from '../context.js';
import { HexNode } from '../HexNode.js';
import { HexGrid } from '../HexGrid.js';
import { drawHexagon } from "../renderingCallbacks";

//OPTIONS: this is where I pass in info from the button about which animation to run?
const useCanvas = (props) => {
  console.log('in useCanvas, props arg is:', props);

  // const canvasRef = useRef(null);
  // const canvas = document.querySelector('canvas');
  
  // const canvasRef = useRef(null)
  
  useEffect(() => {
    // const canvas = canvasRef.current;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // console.log('HELLLLLLLLLOOOOOO, FROM useCanvas. canvas.width is: ', canvas.width);

    // const { draw, ...rest } = props
    // const canvasRef = useRef(null);

    // const canvas = canvasRef.current;
    // const c = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // let animationFrameId;

    // invoke animation functions here
    const hex = new HexGrid(props.BOARD_RADIUS, props.intensityMode); // CHANGE 17 TO BOARD_RADIUS FROM PROPS
    console.log(hex);
    c.clearRect(0, 0, canvas.width, canvas.height);

    switch (props.mode) {
      case 'multiRecurse':
        hex.head.multiRecurse(hex.head, props.callback, props.ms, props.color, props.randRad); // make starting node prop an optional pass-in from props e.g. hex.board[-7][21] could be passed in instead of hex.head
        break;
      case 'singleRecurse':
        hex.head.singleRecurse(hex.head, props.callback, props.ms, props.color, props.randRad); // make starting node prop an optional pass-in from props e.g. hex.board[-7][21] could be passed in instead of hex.head
        break;
      case 'trickle':
        hex.head.multiRecurse(hex.head, props.callback, 4, 'greys', false); // trickle on stone, then rain
        setTimeout(() => {
          hex.resetVisited(false);
          hex.head.trickle(hex.head, props.callback, props.ms, hex, props.color, props.randRad); // this is messy
      // setTimeout(() => {
      //   hex.head.sprinkle(hex, drawHexagon, 20, 'blues', true, Infinity);
      // }, 4000);
          console.log((3*Math.sqrt(3)/2)*hex.BOARD_RADIUS*hex.BOARD_RADIUS+1);
        }, Math.floor((3*Math.sqrt(3)/2)*hex.BOARD_RADIUS*hex.BOARD_RADIUS+1));
    // console.log('hex.tally: ', hex.tally);
      // props.ms*(3*Math.sqrt(3)/2)*props.BOARD_RADIUS*props.BOARD_RADIUS+1


        hex.head.trickle(hex.head, props.callback, props.ms, hex, props.color, props.randRad); // make starting node prop an optional pass-in from props e.g. hex.board[-7][21] could be passed in instead of hex.head
        break;
      case 'sprinkle': 
        hex.head.sprinkle(hex, props.callback, props.ms, props.color, props.randRad, Infinity); // TODO: make prop in state to allow custom reps option
        break;
    }
    //     



    // setInterval(() => { // cool pump thing
    //   setTimeout(() => {
      //     hex.resetVisited();
      //     hex.head.singleRecurse(hex.head, drawHexagon, 50, 'pinks', true);
      //   }, 2000);
      // }, 2000);

    //   hex.head.multiRecurse(hex.head, drawHexagon, 50, 'greys', false); // trickle on stone, then rain
    //   setTimeout(() => {
    //     hex.resetVisited();
    //     hex.head.trickle(hex.head, drawHexagon, 10, hex, 'flat_blues', false); // this is messy
    //   setTimeout(() => {
    //     hex.head.sprinkle(hex, drawHexagon, 20, 'blues', true, Infinity);
    //   }, 4000);
    // }, 3500);

    // hex.head.sprinkle(hex, drawHexagon, 20, 'turquoise', true, Infinity);
    // hex.head.linear(hex);

    return () => {
      // window.cancelAnimationFrame(animationFrameId)
      hex.resetVisited(true);
      console.log('canvas cleared');
      c.clearRect(0, 0, canvas.width, canvas.height);
    }
  }); // DO I NEED TO POPULATE DEPENDANCIES ARR TO HAVE THIS INVOKE EVERY TIME I CLICK?
  //[HexNode.prototype.multiRecurse, HexNode.prototype.singleRecurse, HexNode.prototype.sprinkle, HexNode.prototype.trickle, HexNode.prototype.linear]
    
  return /*canvasRef*/;
}

export default useCanvas;