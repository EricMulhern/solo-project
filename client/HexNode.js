// import { HexGrid } from "./HexGrid";

const RADIUS = 13; // TODO: MOVE TO CONSTRUCTOR, CHANGE ALL REFS TO this.RADIUS, CONFIGURE STATE TO ALLOW PASSING IN OF CUSTOM VALUE


export class HexNode {
  constructor(x, y, boardRadius, intensityMode) { 
    this.x = x;
    this.y = y;
    this.nw = null;
    this.ne = null;
    this.w = null;
    this.e = null;
    this.sw = null;
    this.se = null;
    this.visited = false;

    switch (intensityMode) {
      // case 'random': 
      //   this.intensity = Math.random();
      //   break;
      case 'mountain':
        this.intensity = 1 - Math.random()*(Math.abs(this.x/boardRadius*2)/2 + Math.abs(this.y/boardRadius*2)/2)/2;
        // this.intensity = 1 - (Math.random()*(this.x + boardRadius*2)/(boardRadius*4)/2 + Math.random()*(this.y + boardRadius)/(boardRadius*2)/2);
        break;
      default: // default is just random
        this.intensity = Math.random();
      }
  }

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async multiRecurse(node, callback, ms, color, randRad = false, count = 0) {
    // console.log('randRad is: ', randRad);
    const curRad = randRad ? Math.floor(Math.random()*RADIUS) * 3 : RADIUS;
    // console.log('curRad is: ', curRad);
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x; // change RADIUS to curRad when randRad=true to make spacing larger & more erratic
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    callback(x, y, curRad, count, node, color);
    // if node is present at directional prop, invoke recurse passing in that node
    if (node['nw'] && !node['nw'].visited) {
      node['nw'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['nw'], callback, ms, color, randRad, count+1);
    } // else 
    if (node['ne'] && !node['ne'].visited) {
      node['ne'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['ne'], callback, ms, color, randRad, count+1);
    } // else 
    if (node['w'] && !node['w'].visited) {
      node['w'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['w'], callback, ms, color, randRad, count+1);
    } // else  
    if (node['e'] && !node['e'].visited) {
      node['e'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['e'], callback, ms, color, randRad, count+1);
    } // else  
    if (node['sw'] && !node['sw'].visited) {
      node['sw'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['sw'], callback, ms, color, randRad, count+1);
    } // else  
    if (node['se'] && !node['se'].visited) {
      node['se'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['se'], callback, ms, color, randRad, count+1);
    }
  }

  async singleRecurse(node, callback, ms, color, randRad = false, count = 0) {
    const curRad = randRad ? Math.random() * 14 + 2 : RADIUS;
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;// change RADIUS to curRad when randRad=true to make spacing larger & more erratic
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    // node.visited = true;
    callback(x, y, curRad, count, node, color);
    // if node is present at directional prop, invoke recurse passing in that node
    if (node['nw'] && !node['nw'].visited) {
      node['nw'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['nw'], callback, ms, color, randRad, count+1);
    } else 
    if (node['ne'] && !node['ne'].visited) {
      node['ne'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['ne'], callback, ms, color, randRad, count+1);
    } else 
    if (node['w'] && !node['w'].visited) {
      node['w'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['w'], callback, ms, color, randRad, count+1);
    } else  
    if (node['e'] && !node['e'].visited) {
      node['e'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['e'], callback, ms, color, randRad, count+1);
    } else  
    if (node['sw'] && !node['sw'].visited) {
      node['sw'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['sw'], callback, ms, color, randRad, count+1);
    } else  
    if (node['se'] && !node['se'].visited) {
      node['se'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['se'], callback, ms, color, randRad, count+1);
    }
  }

  async sprinkle(grid, callback, ms, color, randRad = false, reps = Infinity) { // draw *reps* number of nodes at random positions
    for (let i = 0; i < reps; i++) {
      await this.timeout(ms);
      const curRad = randRad ? Math.floor(Math.random()*12) * 3 : RADIUS;
      // const curRad = Math.floor(Math.random()*RADIUS);
      let y = Math.floor(Math.random() * (grid.BOARD_RADIUS * 2 - 1) -  grid.BOARD_RADIUS + 1); //y coordinate at which to select node
      let x = Math.floor(Math.random() * grid.board[y].length - (grid.board[y].length-1)/2); //x coordinate at which to select node
      if (Math.abs(y % 2) !== Math.abs(x % 2)) { // make sure that if one is even, the other is too & vv
        x > 0 ? x-- : x++;
      }
      const curNode = grid.board[y][x];
      curNode.visited = true;
      callback(curNode.x * Math.sqrt(3/4)*curRad + window.innerWidth/2, 
               curNode.y * (curRad+curRad/2) + window.innerHeight/2, 
               curRad, i, curNode, color);
    }
  }

  // animate the board in the following pattern: eachsuccessive node is rendered one at a time, in a square adjacent to the previous. the node rendered will be the one with the lowest intensity value. if no adjacent hex exists, render the next-lowest intensity hex adjacent to any hex on the peremiter of the rendered area.  
  // * alternative: each successive node is rendered one at a time, the next node being the one whose intensity is lowest (and is adjacent to any rendered node)
  // extension: modulate ms to reflect the difference between intensity of current and subsqunt node (greater difference = lower ms delay)
  async trickle(node, callback, ms, grid, color, randRad = false, count = 0) { //alternative //TODO: CLEAN UP THIS DISGRACEFUL PROPERTY SIGNATURE
    const curRad = randRad ? Math.floor(Math.random()*RADIUS*3) : RADIUS;
    // wait
    await node.timeout(ms);
    // determine position of current node
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x; // change RADIUS to curRad when randRad=true to make spacing larger & more erratic
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    
    node.visited = true;
    // invoke callback on popped el    
    callback(x, y, curRad, count, node, color);

    // iterate thru all adjacent unvisited nodes
      // push each node to lowestAdjacent array
    if (node['nw'] && !node['nw'].visited) {
      grid.lowestAdjacent.push(node['nw']);
    }  
    if (node['ne'] && !node['ne'].visited) {
      grid.lowestAdjacent.push(node['ne']);
    }  
    if (node['w'] && !node['w'].visited) {
      grid.lowestAdjacent.push(node['w']);
    }   
    if (node['e'] && !node['e'].visited) {
      grid.lowestAdjacent.push(node['e']);
    }   
    if (node['sw'] && !node['sw'].visited) {
      grid.lowestAdjacent.push(node['sw']);
    }   
    if (node['se'] && !node['se'].visited) {
      grid.lowestAdjacent.push(node['se']);
    }
    // sort lowestAdjacent from highest to lowest
    grid.lowestAdjacent.sort((a, b) => a.intensity - b.intensity);
    // pop last element off array & run callback on it
    let nextNode = grid.lowestAdjacent.pop();
    while (nextNode && nextNode.visited) {
      nextNode = grid.lowestAdjacent.pop();
    }
    
    // invoke trickle on popped el
    if (nextNode) {
      this.trickle(nextNode, callback, ms, grid, color, randRad, count+1);
    }
  } 

  async linear(hex, callback, color, randRad = false) { // is this working properly?
    const curRad = randRad ? Math.floor(Math.random()*RADIUS) * 3 : RADIUS;
    let count = 0;
    while (count < Infinity) { // change condition to make finite?
      for (let row in hex) {
        for (let node in hex[row]) {
          const curRad = Math.random() * 20 + 2;
          const curNode = hex[row][node];
          if (curNode !== length) {
            await curNode.timeout(4);
            callback(window.innerWidth/2 + Math.sqrt(3/4)*curRad*curNode.x, window.innerHeight/2 + curNode.y*(curRad+curRad/2), curRad, color, count);
            count++;
          }
        }
      }
    }
  }

}
            


  








