jest.dontMock('../TodoActionCreatorFactory');
jest.dontMock('../../constants/TodoConstants');


// no es6 modules!?
//import TodoActionCreatorFactory from '../TodoActionCreatorFactory';
//import AppDispatcher from '../../dispatcher/AppDispatcher';

describe('TodoActionCreator', function () {
  var TodoConstants = require('../../constants/TodoConstants');
  var TodoActionCreatorFactory;
  var AppDispatcher;
  var actionCreator;
  
  
  beforeEach(function () {
    TodoActionCreatorFactory = require('../TodoActionCreatorFactory');
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    actionCreator = TodoActionCreatorFactory.create(AppDispatcher);
  });
  
  /////////////////////////////////////////////////////////////////////

  it('set AppDispatcher during construction', function () { 
    expect(actionCreator._AppDispatcher).toBe(AppDispatcher);
    
  });
  
  it('has create method, which creates "TODO_CREATE" action (once) with new todo item text attached', function () {
    actionCreator.create('new todo');
    
    expect(AppDispatcher.dispatch.mock.calls.length).toBe(1);

    expect(AppDispatcher.dispatch).toBeCalledWith({
      actionType: TodoConstants.TODO_CREATE,
      text: 'new todo'
    });

  });

  it('has "create" method, which returns undefined, without calling Dispatcher, if it is called with empty arguments', function () {
    actionCreator.create();
    
    expect(AppDispatcher.dispatch).not.toBeCalled();

  });

  // same for other actions
  
});
