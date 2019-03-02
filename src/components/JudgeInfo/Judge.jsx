import React, { Component } from 'react';
import './Judge.css';

class Judge extends Component {
  render() {
    return (
      <div className={this.props.color % 2 == 0 ? 'dark-color' : 'light-color'}>
        <div className="judge-name">{this.props.name}</div>
        <div className="judge-api">{this.props.api}</div>
      </div>
    );
  }
}

export default Judge;
