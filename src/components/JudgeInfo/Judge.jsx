import React, { Component } from 'react';

class Judge extends Component {
  render() {
    return (
      <div className={this.props.color ? 'dark-color' : 'light-color'}>
        <div className="judge-name">{this.props.name}</div>
        <div className="judge-api">{this.props.api}</div>
      </div>
    );
  }
}

export default Judge;
