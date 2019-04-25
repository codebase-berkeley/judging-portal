import React, { Component } from 'react';
import '../OrganizerPortal.css';
import CategoryItem from './CategoryItem';

class APICategory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
      const alldata = this.props.alldata;
      const unscoreddata = alldata.unscored;
      const scoreddata = alldata.scored;

      const unscored = [];
      const scored = [];

      if (unscoreddata.length > 0) {
        let currentProj;
        for (let i = 0; i < unscoreddata.length; i+=1) {
          currentProj = unscoreddata[i]
          unscored.push(<CategoryItem name={currentProj[0]} score={null}/>);
        }
      }

      if (scoreddata.length > 0) {
        let currentProj;
        for (let i = 0; i < scoreddata.length; i+=1) {
          currentProj = scoreddata[i]
          scored.push(<CategoryItem name={currentProj[0]} score={currentProj[2]} />);
        }
      }

        return (
          <div className="api-info">
              <div className="api-header">
              <div className="api-name">{this.props.api}</div>
              <button type="button" className="dropdown-button">
                  <div className="dropdown-button-shape"></div>
              </button>
              </div>

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
                      {scored}
                  </div>
                  <div className = "unscored-section">
                      <div className="project-list">
                          <div className="project-list-name-unscored">NAME</div>
                      </div>
                      {unscored}
                  </div>
              </div>
          </div>
        );
    }
}

export default APICategory;
