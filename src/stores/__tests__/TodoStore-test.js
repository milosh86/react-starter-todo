jest.dontMock('../TodoStore');
jest.dontMock('../TodoStoreFactory');
jest.dontMock('../../constants/TodoConstants');
jest.dontMock('eventemitter3');
jest.dontMock('fp-es6');

beforeEach(function () {
  this.addMatchers({
    toBeFunction: function () {
      return Object.prototype.toString.call(this.actual) === '[object Function]';
    }
  });
});

beforeEach(function () {
  this.addMatchers({
    toBeArray: function () {
      return Object.prototype.toString.call(this.actual) === '[object Array]';
    }
  });
});

describe('TodoStore', function() {
	var TodoConstants = require('../../constants/TodoConstants');
  var AppDispatcher;
  var TodoStore;
  var callback;

  var actionTodoCreate = {
  	actionType: TodoConstants.TODO_CREATE,
  	text: 'new todo'
  };

	beforeEach(function () {
		// recreate the store before every test so that we clear the state of the store entirely

		// when requiring module in 'beforeEach' or in 'it', Jest returns fresh instance for each test.
		// do require dependant modules always at the same place, i.e if module 'b' loads module 'a',
		// then if we load them both in beforeEach or describe, we can see the state of module 'a' after 'b' interacted with it
		// if 'b' is loaded in 'describe' and 'a' in 'it', 'a' will be clean without changes from 'b';
		// see require folder for example
		AppDispatcher = require('../../dispatcher/AppDispatcher');
		AppDispatcher.register.mockReturnValue('dispatcher_token');
		// same as:
		// AppDispatcher.register.mockImplementation(function () {
		// 	return 'dispatcher_token';
		// });
		 
		TodoStore = require('../TodoStore');
	  callback = AppDispatcher.register.mock.calls[0][0];
	  
	});

	it('registers a callback with the dispatcher', function () { 
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(AppDispatcher.register.mock.calls[0][0]).toBeFunction();
  });

  it('saves a dispatchToken returned by AppDispatcher after callback registration (used for waitFor method)', function () { 
    expect(TodoStore.dispatchToken).toBe('dispatcher_token'); 
  });

  it('should provide "getAll" method for getting all todo items from the store', function () {
  	expect(TodoStore.getAll).toBeFunction();
  	expect(TodoStore.getAll()).toBeArray();
  });

  it('initially has 3 dummy todo items', function () {
  	var todos = TodoStore.getAll();
  	expect(todos.length).toBe(3);
  	expect(todos[0]).toEqual({
  		id: 'TODO_0',
  		text: 'Todo 1 from store',
  		completed: false
  	});
  });

  it('should be able to create and store new todo items', function () {
  	callback(actionTodoCreate);

  	var todos = TodoStore.getAll();

  	expect(todos.length).toBe(4);
  	expect(todos[3]).toEqual({
  		id: 'TODO_3',
  		text: 'new todo',
  		completed: false
  	});
  });

  it('should trigger change event when new item is created', function () {
  	var subscriberMock = jest.genMockFn();

  	TodoStore.addChangeListener(subscriberMock);
  	callback(actionTodoCreate);

  	expect(subscriberMock.mock.calls.length).toBe(1);
  });

});