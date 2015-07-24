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

  static displayName = 'ES6Sample';
  static propTypes = {
    filterText: React.PropTypes.string
  };
  static defaultProps = {
    filterText: 'value'
  };

 static someStaticMethod() {}
  
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

export default ES6Sample;
