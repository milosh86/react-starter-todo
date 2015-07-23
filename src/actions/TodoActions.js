import AppDispatcher from '../dispatcher/AppDispatcher.js';
import TodoConstants from '../constants/TodoConstants.js';

let TodoActions = {
  create(text) {
    if (!text) {
      return;
    }

    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text
    });
  },

  updateItem(id, text) {
    if (!id || !text) {
      return;
    }

    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_ITEM,
      text,
      id
    });
  },

  updateFilter(filterType) {
    if (!filterType) {
      return;
    }

    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_SET_FILTER,
      filterType
    });
  },

  toggleComplete(id) {
    if (!id) {
      return;
    }

    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETED,
      id
    });
  },

  toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETED_ALL
    });
  },

  remove(id) {
    if (!id) {
      return;
    }

    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE,
      id
    });
  },

  removeAllCompleted() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE_ALL_COMPLETED
    });
  }
};

export default TodoActions;