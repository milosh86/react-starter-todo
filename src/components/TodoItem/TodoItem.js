import './TodoItem.css';
import React from 'react';
import InputBox from '../InputBox/InputBox.js';

import TodoActions from '../../actions/TodoActions.js';

let TodoItem = React.createClass({
  displayName: 'Todo Item',
  propTypes: {
    checked: React.PropTypes.bool,
    id: React.PropTypes.string,
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      text: 'Default todo item'
    };
  },

  getInitialState() {
    return {
      isEditing: false
    };
  },

  onCheckboxChange() {
    let id = this.props.id;

    if (id === 'toggleAll') {
      TodoActions.toggleCompleteAll();
    }

    TodoActions.toggleComplete(id);
  },

  handleTodoItemChange(newName) {
    this.setState({
      isEditing: false
    });
    TodoActions.updateItem(this.props.id, newName);
  },

  startEdit() {
    this.setState({
      isEditing: true
    });
  },

  render() {
    var item = this.state.isEditing ?
      <InputBox onEnter={this.handleTodoItemChange}/> :
      (
        <div>
          <span className='todo-item-checkbox'>
            <input
              checked={this.props.checked}
              onChange={this.onCheckboxChange}
              type='checkbox'/>
          </span>
          <span className='todo-item-text' onDoubleClick={this.startEdit}>
            {this.props.text}
          </span>
        </div>
      );

    return (
      <div className={'todo-item' + (this.props.id === 'toggleAll' ? ' toggle-item' : '')}>
        {item}
      </div>
    );
  }
});

export default TodoItem;
