import './InputBox.css';
import React from 'react';

let InputBox = React.createClass({
  displayName: 'InputBox',
  propTypes: {
    inputText: React.PropTypes.string,
    onEnter: React.PropTypes.func
  },

  handleOnKeyUp(event) {
    if (event.keyCode === 13) {
      this.callOnEnter();
    }
  },

  callOnEnter() {
    let input = React.findDOMNode(this.refs.input);
    let val = input.value.trim();

    if (val) {
      this.props.onEnter(val);
      input.value = '';
    }
  },

  render() {
    return (
      <div className="todo-inputbox">
        <input
          autoFocus={true}
          onBlur={this.callOnEnter}
          onKeyUp={this.handleOnKeyUp}
          placeholder="Enter new task here"
          ref="input"
          type="text"/>
      </div>
    );
  }
});

export default InputBox;
