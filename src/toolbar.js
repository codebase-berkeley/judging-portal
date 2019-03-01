import React, { Component } from 'react';
import './JudgeName.css';

class Toolbar extends Component {
  render() {
    return <div className="header">{this.props.name}</div>;
  }
}

export default Toolbar;
