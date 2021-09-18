import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <label> {/* TODO: MAKE INTO FLEX BOX?*/}
        <button onClick={() => {
          console.log(this.input.current.value);
          this.props.inputChange(this.props.buttonProp, this.input.current.value);
        }}>{this.props.buttonName}</button>
        <input type={this.props.type} min={this.props.min} max={this.props.max} ref={this.input}></input>
      </label>
    )
  }
}



export default Button;
