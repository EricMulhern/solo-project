import { HexNode } from "./HexNode";

export class HexGrid {
  constructor(r) {
    this.BOARD_RADIUS = r;
    this.board = HexGrid.connectBoard(HexGrid.populateBoard(r));
    this.lowestAdjacent = [];
  }

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
}
            


  








