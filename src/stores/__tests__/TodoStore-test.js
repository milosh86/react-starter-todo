jest.dontMock('../TodoStore');
jest.dontMock('../../constants/TodoConstants');
jest.dontMock('../TodoStoreFactory');
jest.dontMock('eventemitter3');
jest.dontMock('fp-es6');

beforeEach(function (){
  this.addMatchers({
    toBeFunction: function (){
      return Object.prototype.toString.call(this.actual)==='[object Function]';
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

	beforeEach(function() {
		// recreate the store before every test so that we clear the state of the store entirely

		// when requiring module in 'beforeEach' or in 'it', Jest returns fresh instance for each test.
		// do require dependant modules always at the same place, i.e if module 'b' loads module 'a',
		// then if we load them both in beforeEach or describe, we can see the state of module 'a' after 'b' interacted with it
		// if 'b' is loaded in 'describe' and 'a' in 'it', 'a' will be clean without changes from 'b';
		// see require folder for example
		AppDispatcher = require('../../dispatcher/AppDispatcher');
		AppDispatcher.register.mockImplementation(function () {
			return 'dispatcher_token';
		});
		
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


});