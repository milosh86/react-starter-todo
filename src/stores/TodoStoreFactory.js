import EventEmitter from 'eventemitter3';
import TodoConstants from '../constants/TodoConstants.js';
import Decorators from '../util/decorators.js';
import fp from 'fp-es6';

let _filters = {
  [TodoConstants.FILTER_TYPE_ALL]: item => item,
  [TodoConstants.FILTER_TYPE_ACTIVE]: item => !item.completed,
  [TodoConstants.FILTER_TYPE_COMPLETED]: item => item.completed
};

let emitsChangeAfter = Decorators.afterDecorator(function () {
  this.emitChange();
});

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this._todos = new Map();
    this._PREFIX = TodoConstants.TODO_ID_PREFIX;
    this._lastID = 0;
    this._filterType = TodoConstants.FILTER_TYPE_ALL;
  }

  // optionally set decorator @emitsChangeAfter
  create(text) {
    let id = this._PREFIX + this._lastID++;

    this._todos = new Map(this._todos).set(id, {
      id,
      text,
      completed: false
    });

    this.emitChange();

    return this;
  }

  update(id, updates) {
    if (this._todos.has(id)) {
      this._todos = fp(this._todos).map(todo => {
        if (todo.id === id) {
          updates = updates || {completed: !todo.completed};
          return Object.assign(todo, updates);
        } else {
          return todo;
        }      
      }).value();

      this.emitChange();
    }

    return this;
  }

  updateAll(updates) {
    this._todos = fp(this._todos).map(todo => Object.assign(todo, updates)).value();
    this.emitChange();

    return this;
  }

  remove(id) {
    this._todos = fp(this._todos).filter(todo => todo.id !== id).value();
    this.emitChange();

    return this;
  }

  removeCompleted() {
    this._todos = fp(this._todos).filter(todo => !todo.completed).value();
    this.emitChange();

    return this;
  }

  toggleCompleted(id) {  
    this.update(id);

    return this;
  }

  toggleCompletedAll() {
    this.updateAll({completed: !this.areAllCompleted()});
    this.emitChange();

    return this;
  }

  setFilter(filterType) {
    this._filterType = filterType;
    this.emitChange();

    return this;
  }

  areAllCompleted() {
    return fp(this._todos).every(todo => todo.completed);
  }

  getAll() {
    //return Array.from(this._todos, item => item[1])
    return this._todos;
  }

  getAllFiltered(todos) {
    return fp(todos).filter(_filters[this._filterType]).value();
  }

  getNumberOfActive() {
    return fp(this._todos).reduce((acc, todo) => todo.completed ? acc : acc + 1, 0);
  }

  getFilterType() {
    return this._filterType;
  }

  emitChange() {
    this.emit(TodoConstants.CHANGE_EVENT);

    return this;
  }

  addChangeListener(callback) {
    this.on(TodoConstants.CHANGE_EVENT, callback);

    return this;
  }

  removeChangeListener(callback) {
    this.removeListener(TodoConstants.CHANGE_EVENT, callback);

    return this;
  }
}

export default {
  create() {
    return new TodoStore();
  }
};