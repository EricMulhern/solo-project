import { HexNode } from "./HexNode";

export class HexGrid {
  constructor(r, intensityMode, headY = 0, headX = 0) {
    this.BOARD_RADIUS = r;
    this.HEX_RADIUS = 7; // TODO: make dynamic, inversely relative to BOARD_RADIUS (as default param). HEX_RADIUS currently not used anywhere 
    this.board = HexGrid.connectBoard(HexGrid.populateBoardArray(r, intensityMode));
    this.head = this.board[headY][headX];
    this.lowestAdjacent = [];
    // this.tally = 0;
  }

  static populateBoard(r, intensityMode) {
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
        rowNeg[x] = new HexNode(x, y, r, intensityMode); 
        rowPos[x] = new HexNode(x, -y, r, intensityMode);
      }
      hexObj[y] = rowNeg;
      if (r - i !== 0) {
        hexObj[-y] = rowPos;
      }
    }
    return hexObj;
  }

  static populateBoardArray(r, intensityMode) {
    const grid = new Array(r);
    let offset = 0;
    for (let i = 1; i <= r; i++) { 
      const y = i - r;
      offset--;
      const rowLength = 2*i + 2*r - 3;
      const rowNeg = new Array(rowLength);
      const rowPos = new Array(rowLength);
      for (let j = 0; j <= rowLength; j += 2) {
        const x = j + offset;
        rowNeg[x + r] = new HexNode(x + r, r + y - 1, r, intensityMode);
        rowPos[x + r] = new HexNode(x + r, r - y - 1, r, intensityMode);
      }
      grid[r + y - 1] = rowNeg;
      if (r - i !== 0) {
        grid[r - y - 1] = rowPos;
      }
    }
    return grid;
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

  resetVisited(booleanVal = false) {
    const board = this.board;
    // console.log('board in resetVisited is: ');
    // console.log(board);
    for (const rowI in board) {
      const row = board[rowI];
      for (const nodeI in row) {
        let node;
        if (nodeI !== 'length') {
          node = row[nodeI];
          // console.log('node is: ', node);
          // console.log('node.visited is: ', node.visited);
          node.visited = booleanVal;
        }
      }
    }
  }
}
            


  








