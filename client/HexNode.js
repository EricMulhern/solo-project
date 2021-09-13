const RADIUS = 7;
// const this.BOARD_RADIUS = 17;

export class HexNode {
  constructor(x, y, r) {
    this.BOARD_RADIUS = r;
    this.x = x;
    this.y = y;
    this.nw = null;
    this.ne = null;
    this.w = null;
    this.e = null;
    this.sw = null;
    this.se = null;
    this.visited = false;
    this.intensity = Math.random();
    // this.intensity = 1 - Math.random()*(Math.abs(this.x/this.BOARD_RADIUS*2)/2 + Math.abs(this.y/this.BOARD_RADIUS*2)/2)/2;
    // this.intensity = 1 - (Math.random()*(this.x + this.BOARD_RADIUS*2)/(this.BOARD_RADIUS*4)/2 + Math.random()*(this.y + this.BOARD_RADIUS)/(this.BOARD_RADIUS*2)/2);
  }

  static lowestAdjacent = []; // does not support multiple boards when structured like this. recommend creating separate HexGrid datatype, containing connectBoard, populateBoard, this.BOARD_RADIUS, and lowestAdjacent.

  static populateBoard(r) {
    const hexObj = {};
    let offset = 0;
    for (let i = 1; i <= r; i++) { 
      let y = i - r;
      offset--;
      const rowNeg = {};
      const rowPos = {};
      const rowLength = 2*i + 2*r - 3;
      rowNeg.length = rowLength;
      rowPos.length = rowLength;
      for (let j = 0; j <= rowLength; j += 2) {
        let x = j - r + offset + 2;
        rowNeg[x] = new HexNode(x, y, r); // replace empty str with new HexNode obj
        rowPos[x] = new HexNode(x, -y, r); // 
      }
      hexObj[y] = rowNeg;
      if (r - i !== 0) {
        hexObj[-y] = rowPos;
      }
    }
    return hexObj;
  }

  // given a board of hexNodes, connect them to form a graph.
  static connectBoard(board) {
    // iterate thru rows of board. for each node,
    for (const rowI in board) {
      const row = board[rowI];
      for (const nodeI in row) {
        const node = row[nodeI];
        // if node at direction NW is in bounds, assign node at y+1, x-1 to property
        if (board[node.y+1] !== undefined && board[node.y+1][node.x-1] !== undefined) node.nw = board[node.y+1][node.x-1];
        // if node at direction NE is in bounds, assign node at y+1, x+1 to property
        if (board[node.y+1] !== undefined && board[node.y+1][node.x+1] !== undefined) node.ne = board[node.y+1][node.x+1];
        // if node at direction W  is in bounds, assign node at y,  x-2 to property
        if (board[node.y] !== undefined && row[node.x-2] !== undefined) node.w = board[node.y][node.x-2];
        // if node at direction E  is in bounds, assign node at y,  x+2 to property
        if (board[node.y] !== undefined && row[node.x+2] !== undefined) node.e = board[node.y][node.x+2];
        // if node at direction SW is in bounds, assign node at y-1, x-1 to property
        if (board[node.y-1] !== undefined && board[node.y-1][node.x-1] !== undefined) node.sw = board[node.y-1][node.x-1];
        // if node at direction SE is in bounds, assign node at y-1, x+1 to property
        if (board[node.y-1] !== undefined && board[node.y-1][node.x+1] !== undefined) node.se = board[node.y-1][node.x+1];
      }
    }
    return board;
  }

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async multiRecurse(node, callback, ms, count = 0) {
    const curRad = Math.floor(Math.random()*RADIUS) * 3;
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    callback(x, y, curRad, count, node);
    if (node.x === 6 && node.y === 6) console.log(count);
    // if node is present at directional prop, invoke recurse passing in that node
    if (node['nw'] && !node['nw'].visited) {
      node['nw'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['nw'], callback, ms, count+1);
    } // else 
    if (node['ne'] && !node['ne'].visited) {
      node['ne'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['ne'], callback, ms, count+1);
    } // else 
    if (node['w'] && !node['w'].visited) {
      node['w'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['w'], callback, ms, count+1);
    } // else  
    if (node['e'] && !node['e'].visited) {
      node['e'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['e'], callback, ms, count+1);
    } // else  
    if (node['sw'] && !node['sw'].visited) {
      node['sw'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['sw'], callback, ms, count+1);
    } // else  
    if (node['se'] && !node['se'].visited) {
      node['se'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['se'], callback, ms, count+1);
    }
  }

  async singleRecurse(node, callback, ms, count = 0) {
    const curRad = Math.random() * 14 + 2;
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    // node.visited = true;
    callback(x, y, RADIUS, count, node);
    // if node is present at directional prop, invoke recurse passing in that node
    if (node['nw'] && !node['nw'].visited) {
      node['nw'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['nw'], callback, ms, count+1);
    } else 
    if (node['ne'] && !node['ne'].visited) {
      node['ne'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['ne'], callback, ms, count+1);
    } else 
    if (node['w'] && !node['w'].visited) {
      node['w'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['w'], callback, ms, count+1);
    } else  
    if (node['e'] && !node['e'].visited) {
      node['e'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['e'], callback, ms, count+1);
    } else  
    if (node['sw'] && !node['sw'].visited) {
      node['sw'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['sw'], callback, ms, count+1);
    } else  
    if (node['se'] && !node['se'].visited) {
      node['se'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['se'], callback, ms, count+1);
    }
  }

  async sprinkle(board, callback, ms, reps) { // randomly draw *reps* number of nodes
    for (let i = 0; i < reps; i++) {
      await this.timeout(ms);
      const curRad = Math.floor(Math.random()*12) * 3; // what it was before
      // const curRad = Math.floor(Math.random()*RADIUS);
      let y = Math.floor(Math.random() * (this.BOARD_RADIUS * 2 - 1) -  this.BOARD_RADIUS + 1);
      let x = Math.floor(Math.random() * board[y].length - (board[y].length-1)/2);
      if (Math.abs(y % 2) !== Math.abs(x % 2)) { // make sure that if one is even, the other is too & vv
        x > 0 ? x-- : x++;
      }
      const curNode = board[y][x];
      curNode.visited = true;
      callback(curNode.x * Math.sqrt(3/4)*curRad + window.innerWidth/2, 
               curNode.y * (curRad+curRad/2) + window.innerHeight/2, curRad, reps, curNode);
    }
  }

  // animate the board in the following pattern: eachsuccessive node is rendered one at a time, in a square adjacent to the previous. the node rendered will be the one with the lowest intensity value. if no adjacent hex exists, render the next-lowest intensity hex adjacent to any hex on the peremiter of the rendered area.  
  // * alternative: each successive node is rendered one at a time, the next node being the one whose intensity is lowest (and is adjacent to any rendered node)
  // extension: modulate ms to reflect the difference between intensity of current and subsqunt node (greater difference = lower ms delay)
  async trickle(node, callback, ms, count = 0) { //alternative
    // const curRad = Math.floor(Math.random()*RADIUS*3);
    // wait
    await node.timeout(ms);
    // determine position of current node
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    
    node.visited = true;
    // invoke callback on popped el    
    callback(x, y, RADIUS, count, node);

    // iterate thru all adjacent unvisited nodes
      // push each node to lowestAdjacent array
    if (node['nw'] && !node['nw'].visited) {
      HexNode.lowestAdjacent.push(node['nw']);
    }  
    if (node['ne'] && !node['ne'].visited) {
      HexNode.lowestAdjacent.push(node['ne']);
    }  
    if (node['w'] && !node['w'].visited) {
      HexNode.lowestAdjacent.push(node['w']);
    }   
    if (node['e'] && !node['e'].visited) {
      HexNode.lowestAdjacent.push(node['e']);
    }   
    if (node['sw'] && !node['sw'].visited) {
      HexNode.lowestAdjacent.push(node['sw']);
    }   
    if (node['se'] && !node['se'].visited) {
      HexNode.lowestAdjacent.push(node['se']);
    }
    // sort lowestAdjacent from highest to lowest
    HexNode.lowestAdjacent.sort((a, b) => a.intensity - b.intensity);
    // pop last element off array & run callback on it
    let nextNode = HexNode.lowestAdjacent.pop();
    while (nextNode && nextNode.visited) {
      nextNode = HexNode.lowestAdjacent.pop();
    }
    
    // invoke trickle on popped el
    if (nextNode) {
      // set visited to true
      // nextNode.visited = true; // redundant?
      console.log(nextNode.intensity);
      this.trickle(nextNode, callback, ms, count+1);
    }
  }

  async linear(hex) { // is this working properly?
    let count = 0;
    while (true) {
      for (let row in hex) {
        for (let node in hex[row]) {
          await node.timeout(4);
          const curRad = Math.random() * 20 + 2;
          const curNode = hex[row][node];
          drawHexagon(window.innerWidth/2 + Math.sqrt(3/4)*curRad*curNode.x, window.innerHeight/2 + curNode.y*(curRad+curRad/2), curRad, count);
          count++;
        }
      }
    }
  }

}
            


  








