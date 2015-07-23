import './Footer.css';
import React from 'react';

import TodoActions from '../../actions/TodoActions.js';

let Footer = React.createClass({
  displayName: 'Footer',
  propTypes: {
    filterType: React.PropTypes.string,
    handleFilterChange: React.PropTypes.func,
    todoItems: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      numOfLeftItems: -1
    };
  },

  handleFilterChange(event) {
    TodoActions.updateFilter(event.target.textContent.toLowerCase());
  },

  removeCompleted() {
    TodoActions.removeAllCompleted();
  },

  render() {
    let numOfLeftItems = this.props.numOfActive;

    return (
      <div className="todo-footer">
        <span className="todo-footer-count">{numOfLeftItems} items left</span>
        <span className="todo-footer-filters" onClick={this.handleFilterChange}>
          Filter:
          <span
            className={'todo-footer-filter ' + (this.props.filterType === 'all' ? 'selected' : '')}>
            All
          </span>
          <span
            className={'todo-footer-filter ' + (this.props.filterType === 'active' ? 'selected' : '')}>
            Active
          </span>
          <span
            className={'todo-footer-filter ' + (this.props.filterType === 'completed' ? 'selected' : '')}>
            Completed
          </span>
        </span>
        <span
          className="remove-completed"
          onClick={this.removeCompleted}>
          Remove completed
        </span>
      </div>
    );
  }
});

export default Footer;
