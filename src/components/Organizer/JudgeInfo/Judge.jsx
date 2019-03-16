import React, { Component } from 'react';
import '../OrganizerPortal.css';

class Judge extends Component {
  render() {
    return (
      <div
        className="judge"
      >
        <div className="judge-name">{this.props.name}</div>
        <div className="judge-api">{this.props.api}</div>
      </div>
    );
  }
}

export default Judge;
