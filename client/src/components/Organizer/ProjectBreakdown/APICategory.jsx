import React, { Component } from 'react';
import '../OrganizerPortal.css';
import CategoryItem from './CategoryItem';
import Collapsible from 'react-collapsible';

class APICategory extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.flipButtonUp = this.flipButtonUp.bind(this);
    this.flipButtonDown = this.flipButtonDown.bind(this);
  }

  flipButtonUp() {
    this.props.flipButtonUp(this.props.index)
  }

  flipButtonDown() {
    this.props.flipButtonDown(this.props.index)
  }

  render() {
    const alldata = this.props.alldata;
    const unscoreddata = alldata.unscored;
    const scoreddata = alldata.scored;

    const unscored = [];
    const scored = [];

    if (unscoreddata.length > 0) {
      let currentProj;
      for (let i = 0; i < unscoreddata.length; i += 1) {
        currentProj = unscoreddata[i]
        unscored.push(<CategoryItem name={currentProj[0]} score={null} />);
      }
    }

    if (scoreddata.length > 0) {
      let currentProj;
      for (let i = 0; i < scoreddata.length; i += 1) {
        currentProj = scoreddata[i]
        scored.push(<CategoryItem name={currentProj[0]} score={currentProj[2]} />);
      }
    }

    return (
      <div className="api-info">
        <Collapsible
          onOpen={this.flipButtonUp}
          onClose={this.flipButtonDown}
          trigger={
            <div className="api-header">
              <div className="api-name">{this.props.api}</div>
              {this.props.button}
            </div>}
        >

          <div className="headers">
            <header className="scoring-header">SCORED</header>
            <header className="scoring-header">UNSCORED</header>
          </div>

          <div className="content-breakdown">
            <div className="scored-section">
              <div className="project-list">
                <div className="project-list-name">NAME</div>
                <div className="project-list-score">SCORE</div>
              </div>
              <div className="scoring-list">
                {scored}
              </div>
            </div>
            <div className="unscored-section">
              <div className="project-list">
                <div className="project-list-name-unscored">NAME</div>
              </div>
              <div className="scoring-list">
                {unscored}
              </div>
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }
}

export default APICategory;