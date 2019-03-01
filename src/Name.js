import React, { Component } from 'react';

class Name extends Component {
  render() {
    return <li> {this.props.text} </li>;
  }
}

export default Name;
