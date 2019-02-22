import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Toolbar extends Component {
  render() {
    return <div className="header">{this.props.name}</div>;
  }
}

export default Toolbar;
