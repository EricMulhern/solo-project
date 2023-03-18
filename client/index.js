import styles from './scss/application.scss';

import { HexGrid } from './HexGrid.js';
import { ColorWheel } from './ColorWheel.js';

import { select } from 'd3';
import { Reverb, AmplitudeEnvelope, PolySynth } from "tone";
  
const a = Math.PI / 3;
  
const state = {
  BOARD_RADIUS: 25,
  CIRCLE_RADIUS: 7,
  intensityMode: 'smooth_mountain_for_array', // determines pattern for first render
  rippleDuration: 100,
  colorIncrement: 1,
  blur: 0,
  lastTouchedNode: null,
  envelope: null,
  synth: null,
};
// used to space the nodes appropriately
state.yStretch = state.CIRCLE_RADIUS * 5/6 * 0.92;
state.xStretch = state.CIRCLE_RADIUS * 0.92;

// used to generate new colors
const colorWheel = new ColorWheel();

// // effects to enhance the sound of the synth
// const reverb = new Reverb({ decay: 10 }).toDestination();
// const envelope = new AmplitudeEnvelope({
//     attack: 0.25,
//     decay: 0,
//     sustain: 0.25,
//     release: 0.25
// }).connect(reverb);
// // synth capable of playing multiple notes at once
// const synth = new PolySynth({ volume: -30, maxPolyphony: 32 }).connect(envelope);

// re-calculates the correct size and spacing for nodes, and
// re-generates the underlying hex board object
function generateBoard() {
  state.hex?.board.forEach(row => {
    row.forEach(node => node.visited = true)
  });
  state.CIRCLE_RADIUS = Math.min(window.innerWidth, window.innerHeight) / state.BOARD_RADIUS * 0.24;
  state.yStretch = state.CIRCLE_RADIUS * 5/6 * 0.92;
  state.xStretch = state.CIRCLE_RADIUS * 0.92;
  
  state.hex = new HexGrid(state.BOARD_RADIUS, state.intensityMode);
}

// defines the d3 code to draw the board
function renderBoard() {
  // if previous board is rendered, remove it
  select('#board').remove();

  // generate new board
  const svg = select('#root')
    .append('svg')
    .attr('id', 'board')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  // create groups which will each contain a row of nodes
  const rows = svg.selectAll('g')
    .data(state.hex.board)
    .enter()
    .append('g')
    .attr('transform', (_d, i) => `translate(${window.innerWidth / 2 - state.xStretch * state.BOARD_RADIUS * 2 + 2 / state.BOARD_RADIUS * state.xStretch},${window.innerHeight / 2 - state.yStretch * state.BOARD_RADIUS * 2 + 2 / state.BOARD_RADIUS * state.yStretch + a * state.yStretch * i})`)
    .attr('id', (_d, i) => `r${i}`);
  
  // create nodes for each row, and position based on its position in the HexGrid
  const circles = rows
    .selectAll('circle')
    .data((d) => d.filter(el => el))
    .enter()
    .append('circle')
    .classed('circle', true)
    .attr("cx", (d) => d.x * state.xStretch)
    .attr("cy", (d, i) => d.y * state.yStretch + i * state.CIRCLE_RADIUS / 6)
    .attr("r", (d) => state.CIRCLE_RADIUS + state.CIRCLE_RADIUS / 15)
    .attr('id', (d) => `r${d.y}c${d.x}`)
    .style('fill', (d, i) => `rgb(${(51 * d.intensity)}, ${153 * d.intensity}, ${255})`);

  function startRipple(element, d) {
    // change the radius and color when mousing over a node
    const circle = select(element);
    circle
      .transition()
      .duration(30)
      .attr('r', () => (state.CIRCLE_RADIUS + 2) * 1.3)
      .style('fill', () => `rgb(${255}, ${0}, ${255})`);

    // mark all nodes as not visited, making it possible to trigger a new ripple and
    // causing any existing ripples to propagate out in all directions from their current position
    state.hex.board.forEach(row => {
      row.forEach(node => node.visited = false);
    });

    // move the color of the next node one step around the color wheel
    colorWheel.incrementColor(state.colorIncrement);

    // grab the node from the HexGrid corresponding to the most recently touched node. 
    // this is necessary for touch events because d is always bound to the node the touch initiated at.
    const [x, y] = element.id.split('c').map(str => {
      if (str[0] === 'r') return str.slice(1);
      else return str;
    })
    const currentlyTouchedNode = state.hex.board[x][y];
    
    // from the current node, recursively traverse all neighboring nodes and invoke a callback for each
    d.d3MultiRecurse(currentlyTouchedNode, (node, ms, _count) => {
      // move the color of the next node one step around the color wheel
      colorWheel.incrementColor(state.colorIncrement);
      const nextCircle = select(`#r${node.y}c${node.x}`)
      nextCircle
        .transition()
        .duration(ms * 3) // shift color slower than the ripple propagates for smoother effect
        .style('fill', () => `rgb(${colorWheel.r}, ${colorWheel.g}, ${colorWheel.b})`)
    }, state.rippleDuration);
    
    // play synth note within envelope, with slight latency to improve performance
    state.envelope.triggerAttackRelease("0.5", '+0.03');
    state.synth.triggerAttackRelease(200 + Math.abs((1 + currentlyTouchedNode.x - state.BOARD_RADIUS)*(1 + currentlyTouchedNode.y - state.BOARD_RADIUS))*2, 1.0, '+0.03');
  }

  function stopRipple(element) {
    // shrink exited circle and make it go dark
    const circle = select(element);
    circle
      .transition()
      .duration(200)
      .attr('r', () => state.xStretch + 2)
      .style('fill', () => `rgb(${131}, ${0}, ${161})`);
  }

  circles
    .on('mouseover', (e, d) => { // mouse over in browser
      startRipple(e.target, d);
    })
    .on('touchstart', (e, d) => { // tap on touchscreen
      e.preventDefault();
      startRipple(e.target, d);
    })
    .on('touchmove', (e, d) => { // tap on touchscreen
      e.preventDefault();

      // Get the x and y coordinates of the touch
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      // Get the element that is currently underneath the touch point
      const targetElement = document.elementFromPoint(x, y);

      // make sure not to re-trigger ripple while touch point is moving across the current node
      if (targetElement !== state.lastTouchedNode && targetElement.className.baseVal === 'circle') {
        if (state.lastTouchedNode) stopRipple(state.lastTouchedNode);
        state.lastTouchedNode = targetElement;
        startRipple(targetElement, d);
      }
    })
    .on('mouseout', (e) => { // mouse out in browser
      stopRipple(e.target);
    })
    .on('click', (e) => {
      // make the clicked circle big and white, then go dark
      const circle = select(e.target)
      circle
        .attr('r', () => state.xStretch * 2.5)
        .transition()
        .duration(130)
        .style('fill', () => `rgb(${255}, ${253}, ${254})`)
        .transition()
        .duration(600)
        .delay(200)
        .style('fill', () => `rgb(${40}, ${76}, ${153})`)
      
      // play note @ 600Hz loudly. for the next 2sec, all sounds will play loud
      state.synth.volume.value = -10;
      state.synth.triggerAttackRelease(600, 1.0, '+0.03');
      // after 2sec, make quiet again and animate circle
      setTimeout((() => {
        state.synth.volume.value = -30;
        state.synth.triggerAttackRelease(900, 1.0, '+0.03');
        circle
          .attr('r', () => state.xStretch * 2.5)
          .style('fill', () => `rgb(255, 253, 254)`)
          .transition()
          .duration(600)
          .attr('r', () => state.xStretch)        
          .style('fill', (d) => `rgb(${(51 * d.intensity)}, ${153 * d.intensity}, ${255})`)
      }).bind(this), 2000);
    });

    // initialize the filter for blur
    const defs = svg.append("defs");
    defs
      .append("filter")
      .attr("id", "motionFilter") // give it a unique ID
      // increase the width of the filter region to remove blur "boundary"
      .attr("width", "300%")
      .attr("height", "300%")
      // put center of the "width" back in the middle of the element
      .attr("x", "-100%")
      .attr("y", "-100%")
      .append("feGaussianBlur") // append a filter technique
      .attr("class", "blurValues") // needed to select later on
      .attr("in", "SourceGraphic") // apply blur on the applied element
      // do a blur of x standard deviations direction
      .attr("stdDeviation", state.blur);
    
    //Apply the filter to the board
    svg.style("filter", "url(#motionFilter)");
}
  
// trigger code to calculate node size and spacing
generateBoard();

document.addEventListener('DOMContentLoaded', () => {
  // add event listener to make modal & overlay disappear when clicked
  const overlay = document.getElementById('overlay');
  overlay.addEventListener('click', () => {
    overlay.style.display = "none";

    // effects to enhance the sound of the synth
    state.reverb = new Reverb({ decay: 10 }).toDestination();
    state.envelope = new AmplitudeEnvelope({
        attack: 0.25,
        decay: 0,
        sustain: 0.25,
        release: 0.25
    }).connect(state.reverb);
    // synth capable of playing multiple notes at once
    state.synth = new PolySynth({ volume: -30, maxPolyphony: 32 }).connect(state.envelope);

  });

  // add event listeners to update visuals based on input controls
  document.querySelector('#board-radius').addEventListener('change', (e) => {
    state.BOARD_RADIUS = +e.target.value;
    generateBoard();
    renderBoard();
  });
  document.querySelector('#ripple-size').addEventListener('change', (e) => {
    state.colorIncrement = 5 - e.target.value;
  });
  document.querySelector('#ripple-speed').addEventListener('change', (e) => {
    state.rippleDuration = 1000 - e.target.value;
  });
  document.querySelector('#blur').addEventListener('change', (e) => {
    state.blur = +e.target.value;
    select('.blurValues')
      .attr("stdDeviation", state.blur);
  });

  // triggers the d3 code to draw the board
  renderBoard();
});
