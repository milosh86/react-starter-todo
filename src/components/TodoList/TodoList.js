import './TodoList.css';
import React from 'react';
import TodoItem from '../TodoItem/TodoItem.js';

let TodoList = React.createClass({
  // prop validation
  displayName: 'Todo List',
  propTypes: {
    todoItems: React.PropTypes.array,
    toggleAllChecked: React.PropTypes.bool
  },

  render() {
    var items = this.props.todoItems
      .map(item =>
        <TodoItem
          checked={Boolean(item.completed)}
          id={item.id}
          key={item.id}
          text={item.text}
          />
      );

    return (
      <div className='todo-list'>
        <TodoItem
          checked={this.props.toggleAllChecked}
          id='toggleAll'
          key='toggleAll'
          text='Toggle all'/>
        {items}
      </div>
    );
  }
});

export default TodoList;
