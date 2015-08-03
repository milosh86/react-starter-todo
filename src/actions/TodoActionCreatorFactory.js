import TodoConstants from '../constants/TodoConstants.js';

class TodoActionCreator {
  constructor(AppDispatcher) {
    this._AppDispatcher = AppDispatcher;
  }
  
  create(text) {
    if (!text) {
      return;
    }

    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text
    });
  }

  updateItem(id, text) {
    if (!id || !text) {
      return;
    }

    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_ITEM,
      text,
      id
    });
  }

  updateFilter(filterType) {
    if (!filterType) {
      return;
    }

    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_SET_FILTER,
      filterType
    });
  }

  toggleComplete(id) {
    if (!id) {
      return;
    }

    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETED,
      id
    });
  }

  toggleCompleteAll() {
    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETED_ALL
    });
  }

  remove(id) {
    if (!id) {
      return;
    }

    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE,
      id
    });
  }

  removeAllCompleted() {
    this._AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE_ALL_COMPLETED
    });
  }
  
}

export default {
  create(AppDispatcher) {
    return new TodoActionCreator(AppDispatcher);
  }
};