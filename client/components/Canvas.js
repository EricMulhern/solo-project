// spaghetti from https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
import React, { useRef, useEffect } from 'react'
import useCanvas from './useCanvas';
import { HexNode } from '../HexNode.js';
import { HexGrid } from '../HexGrid.js';
import { drawHexagon } from "../renderingCallbacks";
// import 'regenerator-runtime/runtime';
// require("@babel/core").transformSync("code", {
//   plugins: ["@babel/plugin-transform-runtime"],
// });

const Canvas = props => {
  console.log('in Canvas, props arg is:', props);
  const canvasRef = useCanvas(props.props); //also kludgey. necessary because spreading from classical react component to hook doesn't work
  // return <canvas ref={canvasRef}/>
  return <div /> // this is a kludge fix. currently getting the canvas from index.html thru context.js, so Canvas isn't really doing anything. 
}

export default Canvas;