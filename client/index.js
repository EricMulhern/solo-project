import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import regeneratorRuntime from "regenerator-runtime";

import { HexNode } from './HexNode.js';
import { drawHexagon } from "./renderingCallbacks";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext('2d');

const hex = HexNode.populateBoard(17);
HexNode.connectBoard(hex);
console.log(hex);
// hex[0][0].multiRecurse(hex[0][0], drawHexagon, 50);
hex[0][0].multiRecurse(hex[-7][21], drawHexagon, 50);
// hex[0][0].sprinkle(hex, drawHexagon, 4, Infinity);
// hex[0][0].singleRecurse(hex[0][0], drawHexagon, 20);
// hex[0][0].trickle(hex[0][0], drawHexagon, 4);
// hex[0][0].linear(hex);

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('root')
);
