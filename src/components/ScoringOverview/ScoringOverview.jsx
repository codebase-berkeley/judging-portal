import React, { Component } from 'react';
import './ScoringOverview.css';
import Project from './Project.jsx'


class ScoringOverview extends Component {
  constructor(props) {
    super(props);
  }



    render() {
        return (
            <div className="scoring-view">
                <div className="score-button-box">
                    <div className="score-button">
                        <button className="unscored">Unscored</button>
                        <button className="scored">  Scored  </button>
                    </div>
                </div>

                <Project name="Chancellor" identification="42024" score="5"/>
                <Project name="Christ" identification="31413" score="5"/>
                <Project name="Oski" identification="01134" score="4"/>
                <Project name="GoBears" identification="58008" score="5"/>
            </div>
        );
    }
}

export default ScoringOverview;
