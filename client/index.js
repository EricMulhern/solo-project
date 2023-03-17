import styles from './scss/application.scss';

import { HexGrid } from './HexGrid.js';
import { ColorWheel } from './ColorWheel.js';
import { init } from './init.js'

// import * as d3 from 'd3';
import {select} from 'd3';
import { Reverb, AmplitudeEnvelope, Synth } from "tone";
  
const a = Math.PI / 3;
  
const state = {
  mode: 'multiRecurse',
  BOARD_RADIUS: 25,
  CIRCLE_RADIUS: 7,
  startCoords: '0,0',
  callback: () => {},
  ms: 20,
  color: 'pinks',
  randRad: true,
  intensityMode: 'smooth_mountain_for_array',
  increment: 1
};

const yStretch = state.CIRCLE_RADIUS * 5/6 * 0.92;
const xStretch = state.CIRCLE_RADIUS * 0.92;

const reverb = new Reverb({decay: 10}).toDestination();
const envelope = new AmplitudeEnvelope({
    attack: 0.25,
    decay: 0,
    sustain: 0.25,
    release: 0.25
}).connect(reverb);

const hex = new HexGrid(state.BOARD_RADIUS, state.intensityMode);
hex.board.forEach(row => {
  row.forEach(node => node.synth = new Synth({volume: -30}).connect(envelope));
});

const colorWheel = new ColorWheel();

document.addEventListener('DOMContentLoaded', () => {
  init();
  
  const svg = select('#root')
    .append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);
  
  const rows = svg.selectAll('g')
    .data(hex.board)
    .enter()
    .append('g')
    .attr('transform', (_d, i) => `translate(${window.innerWidth/2 - xStretch*state.BOARD_RADIUS*2},${window.innerHeight/2 - yStretch*state.BOARD_RADIUS*2 + a*yStretch*i})`)
    .attr('id', (_d, i) => `r${i}`)
  
  const circles = rows
    .selectAll('circle')
    .data((d) => d.filter(el => el))
    .enter()
    .append('circle')
    .attr("cx", (d) => d.x*xStretch)
    .attr("cy", (d, i) => d.y * yStretch + i*state.CIRCLE_RADIUS/6)
    .attr("r", (d) => state.CIRCLE_RADIUS + state.CIRCLE_RADIUS/15)
    .attr('id', (d) => `r${d.y}c${d.x}`)
  
  circles
    .style('fill', (d, i) => `rgb(${(51 * d.intensity)}, ${153 * d.intensity}, ${255})`)
    // .style('stroke', () => 'rgb(60,40,100)')
    .on('mouseover', (e, d) => {
      const circle = select(e.target);
      circle
        .transition()
        .duration(30)
        .attr('r', () => (state.CIRCLE_RADIUS + 2) * 1.3)
        .style('fill', () => `rgb(${255}, ${0}, ${255})`)
  
      hex.board.forEach(row => {
        row.forEach(node => node.visited = false)
      });
  
      colorWheel.incrementColor(state.increment);
      
      d.d3MultiRecurse(d, (node, ms, count) => {
        colorWheel.incrementColor(state.increment);
        const nextCircle = select(`#r${node.y}c${node.x}`)
        nextCircle
          .transition()
          .duration(ms*3)
          .style('fill', (d, i) => `rgb(${colorWheel.r}, ${colorWheel.g}, ${colorWheel.b})`)
      }, 100);
  
      envelope.triggerAttackRelease("0.5");
      d.synth.triggerAttackRelease(200 + Math.abs((1 + d.x - state.BOARD_RADIUS)*(1 + d.y - state.BOARD_RADIUS))*2, 1.0);
    })
    .on('mouseout', (e) => {
      const circle = select(e.target)
      circle
        .transition()
        .duration(200)
        .attr('r', (d, i) => xStretch + 2)
        .style('fill', (d, i) => `rgb(${131}, ${0}, ${161})`)
    })
    .on('click', (e, d) => {
      const circle = select(e.target)
      circle
        .transition()
        .duration(130)
        .style('fill', (d, i) => `rgb(${255}, ${253}, ${254})`)
      circle
        .transition()
        .duration(600)
        .delay(200)
        .style('fill', (d, i) => `rgb(${40}, ${76}, ${153})`)
  
      d.synth.volume.value = -5;
      d.synth.triggerAttackRelease(600, 1.0);
      setTimeout((() => {
        d.synth.volume.value = -30;
        d.synth.triggerAttackRelease(900, 1.0);
        circle
          .attr('r', () => xStretch * 2.5)
          .style('fill', () => `rgb(255, 253, 254)`)
          .transition()
          .duration(600)
          .attr('r', () => xStretch)        
          .style('fill', (d) => `rgb(${(51 * d.intensity)}, ${153 * d.intensity}, ${255})`)
      }).bind(this), 30000)
    })

  const defs = svg.append("defs");
  //Initialize the filter
  defs
    .append("filter")
    .attr("id", "motionFilter") //Give it a unique ID
      //Increase the width of the filter region to remove blur "boundary"
    .attr("width", "300%")
    .attr("height", "300%")
    //Put center of the "width" back in the middle of the element
    .attr("x", "-100%")
    .attr("y", "-100%")
    .append("feGaussianBlur") //Append a filter technique
    .attr("class", "blurValues") //Needed to select later on
    .attr("in", "SourceGraphic") //Apply blur on the applied element
    //Do a blur of 8 standard deviations in the horizontal
    //direction and 0 in vertical
    .attr("stdDeviation", "9");

  //Apply the filter to an element
  svg
    .style("filter", "url(#motionFilter)");
  
  // svg.on('mousemove', (e) => {
  //   console.log(e)
  //   circles.transition()
  //     .duration(30)
  //     .attr("cy", (d, i) => d.y * yStretch * i * (e.pageY/1000))
  //     .attr("cx", (d, i) => d.x * xStretch * i * (e.pageX/1000))
  //     .style('fill', (d, i) => `rgb(${i*13}, ${73}, ${97})`)
  
  //   rows.transition()
  //     .duration(30)
  //     .attr('transform', (_d, i) => `translate(${400},${350 + a*yStretch*i*e.pageY/1000})`)
  // });
  
  
  
  // let tally = 1;
  
  // function fold() {
  //   circles
  //     .transition()
  //     .duration(3000)
  //     .delay(3000)
  //     .attr("cy", (d, i) => 100 + d.y * yStretch + i*65)
  //     .attr("cx", (d, i) => 100 + d.x*xStretch + i*tally++)
  //     .style('fill', (d, i) => `rgb(${i*13}, ${73}, ${97})`)
  //     // .style('fill', (d, i) => `rgb(${8}, ${73}, ${97})`)
  
  // }
  
  // function unfold() {
  //   circles
  //     .transition()
  //     .duration(3000)
  //     .attr("cy", (d, i) => 100 + d.y * yStretch + i*5)
  //     .style('fill', (d, i) => `rgb(${21}, ${158}, ${208})`)
  // }
  
  // fold();
  // setInterval(() => {unfold()}, 6000)
  // setInterval(() => {fold()}, 6000)
});
