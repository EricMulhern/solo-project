import React, { Component } from 'react';

let gameStore = [];

function getInitialState() {
  return {
  };
}


class App extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    this.state = getInitialState();
  }
  
  handleClick(row, square) {

    this.setState({

    });
  }

  render() {

    return (
      <div>
        <div id="test">THE APP IS LOADING PROPERLY</div>
        <button id="reset" onClick={() => this.setState(/*do stuff  */)}>sprinkle mode</button>
        <button id="reset" onClick={() => this.setState(/*do stuff  */)}>trickle mode</button>
        <button id="reset" onClick={() => this.setState(/*do stuff  */)}>ripple mode</button>
      </div>
    );
  }
}

export default App;
