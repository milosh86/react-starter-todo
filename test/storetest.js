//use jest instead...
import TodoStore from '../src/stores/TodoStore.js';
import TodoActions from '../src/actions/TodoActions.js';

TodoStore.addChangeListener(() => {
  //var todos = TodoStore.getAll();
  //document.getElementsByTagName('body')[0].appendChild(document.createElement('p').appendChild(document.createTextNode(`${todos[0].text}:${todos[0].completed} -- ${todos[1]&&todos[1].text}:${todos[1]&&todos[1].completed}`)));
  //console.dir(todos);
});

