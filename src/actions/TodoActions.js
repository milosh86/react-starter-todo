import AppDispatcher from '../dispatcher/AppDispatcher.js';
import TodoActionCreatorFactory from './TodoActionCreatorFactory.js';

export default TodoActionCreatorFactory.create(AppDispatcher);