import './Todo.css';
import React from 'react';
import InputBox from '../InputBox/InputBox.js';
import TodoList from '../TodoList/TodoList.js';
import Footer from '../Footer/Footer.js';

import TodoStore from '../../stores/TodoStore.js';
import TodoActions from '../../actions/TodoActions.js';

let getTodoState = () => {
  return {
    todos: TodoStore.getAll(),
    areAllCompleted: TodoStore.areAllCompleted(),
    filterType: TodoStore.getFilterType(),
    numOfActive: TodoStore.getNumberOfActive()
  };
};

let Todo = React.createClass({
  // prop validation
  displayName: 'Todo App',

  getInitialState() {
    return getTodoState();
  },

  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState(getTodoState());
  },

  onNewTodo(text) {
    TodoActions.create(text);
  },

  render() {
    return (
      <div className="todo-app">
        <InputBox
          onEnter={this.onNewTodo}/>
        <TodoList
          todoItems={this.state.todos}
          toggleAllChecked={this.state.areAllCompleted}/>
        <Footer
          filterType={this.state.filterType}
          handleFilterChange={this.handleFilterChange}
          numOfActive={this.state.numOfActive} />
      </div>
    );
  }
});

export default Todo;
