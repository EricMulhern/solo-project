import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import regeneratorRuntime from "regenerator-runtime";

import { HexNode } from './HexNode.js';
import { HexGrid } from './HexGrid.js';
import { drawHexagon } from "./renderingCallbacks";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext('2d'); // TODO: move all canvas into react component

const hex = new HexGrid(17);
console.log(hex);
// hex.head.multiRecurse(hex.head, drawHexagon, 50);
// hex.head.multiRecurse(hex.board[-7][21], drawHexagon, 50);
// hex.head.sprinkle(hex, drawHexagon, 4, Infinity);
// hex.head.singleRecurse(hex.head, drawHexagon, 20);


// hex.head.multiRecurse(hex.head, drawHexagon, 50, 'greys', false);
// setTimeout(() => {
//   hex.resetVisited();
//   hex.head.trickle(hex.head, drawHexagon, 10, hex, 'flat_blues', false); // this is messy
//   setTimeout(() => {
//     hex.head.sprinkle(hex, drawHexagon, 20, 'pinks', true, Infinity);
//                     //grid, callback, ms, color, randRad = false, reps
//   }, 4000);
// }, 3500);

// hex.head.sprinkle(hex, drawHexagon, 20, 'turquoise', true, Infinity);


// hex.head.linear(hex);

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('root')
);
