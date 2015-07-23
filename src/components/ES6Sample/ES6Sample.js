import './ES6Sample.css';
import React, {Component} from 'react';

class ES6Sample extends Component {
  constructor(props) {
    super(props);

    // default state
    this.state = {
      value: 'state'
    };
  }

  handleChange() {
    this.props.onUserInput(React.findDOMNode(this.refs.filterTextInput).value);
  }

  render() {
    return (
      <input className="search-box"
             onChange={this.handleChange.bind(this)} // no autobinding!!!
             ref="filterTextInput"
             type="text"
             value={this.props.filterText}/>
    );

  }
}

ES6Sample.displayName = 'ES6Sample';
ES6Sample.propTypes = {
  filterText: React.PropTypes.string,
  onUserInput: React.PropTypes.func
};
ES6Sample.defaultProps = {};
ES6Sample.staticMethod = function () {};

export default ES6Sample;
