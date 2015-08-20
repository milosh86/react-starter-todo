import './Todo.css';
import React from 'react';
import InputBox from '../InputBox/InputBox.js';
import TodoList from '../TodoList/TodoList.js';
import Footer from '../Footer/Footer.js';

import TodoStore from '../../stores/TodoStore.js';
import TodoActions from '../../actions/TodoActions.js';

let getTodoState = () => ({
  todos: TodoStore.getAll(),
  areAllCompleted: TodoStore.areAllCompleted(),// maybe shouldn't be in store, it's derived from todos
  filterType: TodoStore.getFilterType(),
  numOfActive: TodoStore.getNumberOfActive() // maybe shouldn't be in store, it's derived from todos
});

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

  shouldComponentUpdate(nextProps, nextState) {
    // todos(Map) and filterType(string) are immutable, so we can easily detect change
    return (nextState.todos !== this.state.todos) || 
           (nextState.filterType !== this.state.filterType);
  },

  onChange() {
    this.setState(getTodoState());
  },

  onNewTodo(text) {
    TodoActions.create(text);
  },

  render() {
    let filteredTodos = Array.from(TodoStore.getAllFiltered(this.state.todos), item => item[1]);


    return (
      <div className="todo-app">
        <InputBox
          onEnter={this.onNewTodo}/>
        <TodoList
          todoItems={filteredTodos}
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
