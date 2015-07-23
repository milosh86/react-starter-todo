import AppDispatcher from '../dispatcher/AppDispatcher.js';
import TodoConstants from '../constants/TodoConstants.js';
import TodoStoreFactory from './TodoStoreFactory.js';

var store = TodoStoreFactory.create();

store.create('Todo 1 from store')
  .create('Todo 2 from store')
  .create('Todo 3 from store');

let dispatchToken = AppDispatcher.register(action => {

  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      store.create(action.text);
      break;
    case TodoConstants.TODO_UPDATE_ITEM:
      store.update(action.id, {text: action.text});
      break;
    case TodoConstants.TODO_SET_FILTER:
      store.setFilter(action.filterType);
      break;
    case TodoConstants.TODO_REMOVE:
      store.remove(action.id);
      break;
    case TodoConstants.TODO_REMOVE_ALL_COMPLETED:
      store.removeCompleted();
      break;
    case TodoConstants.TODO_TOGGLE_COMPLETED:
      store.toggleCompleted(action.id);
      break;
    case TodoConstants.TODO_TOGGLE_COMPLETED_ALL:
      store.toggleCompletedAll();
      break;
    default:
      console.log('Unknown action:', action);
  }
});

export default {
  dispatchToken: dispatchToken,
  addChangeListener: store.addChangeListener.bind(store),
  removeChangeListener: store.removeChangeListener.bind(store),
  getAll: store.getAllFiltered.bind(store),
  areAllCompleted: store.areAllCompleted.bind(store),
  getFilterType: store.getFilterType.bind(store),
  getNumberOfActive: store.getNumberOfActive.bind(store)
};