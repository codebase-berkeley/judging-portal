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
        return (
          <div className="api-info">
              <div className="api-name">{this.props.api}</div>
              <button type="button" className="dropdown-button">
                  <div className="dropdown-button-shape"></div>
              </button>
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
                  </div>
                  <div className = "unscored-section">
                      <div className="project-list">
                          <div className="project-list-name-unscored">NAME</div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default APICategory;
