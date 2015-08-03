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

    this._todos.set(id, {
      id,
      text,
      completed: false
    });
    this.emitChange();

    return this;
  }

  update(id, updates) {
    if (this._todos.has(id)) {
      let todo = this._todos.get(id);

      Object.assign(todo, updates);
      this.emitChange();
    }

    return this;
  }

  updateAll(updates) {
    this._todos.forEach(todo => Object.assign(todo, updates));
    this.emitChange();

    return this;
  }

  remove(id) {
    this._todos.delete(id);
    this.emitChange();

    return this;
  }

  removeCompleted() {
    this._todos.forEach((todo, id) => {
      if (todo.completed) {
        this.remove(id);
      }
    });
    this.emitChange();

    return this;
  }

  toggleCompleted(id) {
    let todo = this._todos.get(id);

    todo && (todo.completed = !todo.completed);
    this.emitChange();

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
    return Array.from(this._todos, item => item[1])
  }

  getAllFiltered() {
    return this.getAll().filter(_filters[this._filterType]);
  }

  getNumberOfActive() {
    return this.getAll().reduce((acc, todo) => todo.completed ? acc : acc + 1, 0);
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