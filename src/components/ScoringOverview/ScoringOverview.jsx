import React, { Component } from 'react';
import './ScoringOverview.css';
import Project from './Project.jsx'


class ScoringOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
        renderedList: [],
        scoredList: [],
        unscoredList: [],
        showUnscored: true
    };


    this.fetchUnscored = this.fetchUnscored.bind(this);
    this.fetchScored = this.fetchScored.bind(this);
    }

    componentDidMount() {
        let fetchedData = [["Chancellor", "42024", "5"], ["Christ", "31413", "4"], ["Oski", "01134", "4"], ["GoBears", "58008", ""]];
        let scoredData = [];
        let unscoredData = [];
        for (let i = 0; i < fetchedData.length; i++) {
            let score = fetchedData[i][2];
            let component = [fetchedData[i]];
            if (score == "") {
                unscoredData = unscoredData.concat(component);
            }
            else {
                scoredData = scoredData.concat(component);
            }
        }
        console.log(unscoredData);
        console.log(scoredData);

        this.setState ({
            unscoredList: unscoredData,
            scoredList: scoredData,
            renderedList: unscoredData
        });
    }


    fetchUnscored() {
        this.setState ({
            renderedList: this.state.unscoredList,
            showUnscored: true
        });
    }

    fetchScored() {
        this.setState ({
            renderedList: this.state.scoredList,
            showUnscored: false
        });
    }


    render() {
        return (
            <div className="scoring-view">
                <div className="score-button-box">
                    <div className="score-button">
                        <button className={this.state.showUnscored ? "scored" : "unscored"} onClick={this.fetchUnscored}>Unscored</button>
                        <button className={this.state.showUnscored ? "unscored" : "scored"} onClick={this.fetchScored}>  Scored  </button>
                    </div>
                </div>
            <ul>
            {this.state.renderedList.map((item, index) => (
                <Project key={index} name={item[0]} identification={item[1]} score={item[2]}/>
            ))}
            </ul>
            </div>
        );
    }
}

export default ScoringOverview;
