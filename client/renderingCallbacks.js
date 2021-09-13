const a = 2 * Math.PI / 6;

import { c } from './index.js'

export function drawHexagon(x, y, r, count, curNode) {
  // console.log(count)
  c.beginPath();
  for (var i = 0; i < 6; i++) {
    c.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i)); // to rotate nodes: swap sin & cos. 
    // to rotate grid, swap x and y (if so, to center, swap x and y of starting node relative to window dimensions)
  }
  c.closePath();
  const rand0 = Math.random();
  const rand1 = Math.random() * 55; 
  const rand2 = Math.random() * 125;
  const rand2i = Math.random() * 125;
  const rand3 = Math.random() * 255;
  const rand3i = 255 - rand3;
  
  // c.fillStyle = `rgba(${55}, ${105}, ${255}, ${curNode.intensity})`; // blues
  c.fillStyle = `rgba(${rand1}, ${rand1+50}, ${rand1 + 200}, ${curNode.intensity})`; // blues
  // c.fillStyle = `rgba(${rand2 + 130}, ${20}, ${rand1 + 200}, ${curNode.intensity})`; // pinks
  // c.fillStyle = `rgba(${rand3i}, ${rand3}, ${rand1}, ${.5})`;
  // c.fillStyle = `rgba(${rand1 + 120 - count*7}, ${rand1}, ${rand1 + 80 + count*7}, ${rand0})`;
  // c.fillStyle = `rgba(${randR * count / 10 % 105}, ${randG + 200}, ${255 - count * 60 % 255}, ${randA})`; //turquoise
  // c.fillStyle = `rgba(${200 + rand1}, ${rand2}, ${rand2}, ${rand0}})`; //pinks
  c.fill();
  // c.stroke();
}




// // draw & color a rectangle
// c.fillStyle = 'rgba(255, 1, 1, .4)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(255, 1, 1, .7)';
// c.fillRect(140, 140, 100, 100);
// c.fillStyle = 'rgba(255, 120, 1, .85)';
// c.fillRect(180, 180, 100, 100);

// drawing a line
// c.beginPath();
// c.moveTo(650, 300);
// c.lineTo(900, 120);
// c.lineTo(921, 444);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// // drawing an arc
// c.beginPath(); // to separate from previous path
// 	// x, y, r, startangle (in rad), endangle, drawcounterclockwise
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (let i = 0; i < 100; i++) {
// 	c.beginPath(); // to separate from previous path
// 	c.arc(7*i, .12*i*i - 3*i, 30, 0, Math.PI*2, false);
// 	c.strokeStyle = `rgba(${i*2.55}, ${i - i*2.55}, 0, .9)`;
// 	c.stroke();

// }


