import React, { Component } from 'react';
import './ScoringOverview.css';
import Project from './Project.jsx'
import { Link } from 'react-router-dom';

class ScoringOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
        APIdata: [],
        renderedList: [],
        scoredList: [],
        unscoredList: [],
        showUnscored: true
    };

    this.fetchUnscored = this.fetchUnscored.bind(this);
    this.fetchScored = this.fetchScored.bind(this);
    }

    componentDidMount() {
        this.fetchAPIdata().then(result => this.setState({
            APIdata: result
        }))
        
        // let fetchedData = [["Chancellor", "42024", "5"], ["Christ", "31413", "4"], ["Oski", "01134", "4"], ["GoBears", "58008", ""]];
        let scoredData = [];
        let unscoredData = [];
        for (let i = 0; i < this.APIdata.length; i++) {
            let score = this.APIdata[i].score;
            let component = [this.APIdata[i]];
            if (score == -1) {
                unscoredData = unscoredData.concat(component);
            }
            else {
                scoredData = scoredData.concat(component);
            }
        }

        this.setState ({
            unscoredList: unscoredData,
            scoredList: scoredData,
            renderedList: unscoredData
        });
    }

    async fetchAPIdata() {
        let res = await fetch('/api/projects');
        let res_json = res.json();
        console.log(res_json);
        return res_json
    }

    fetchUnscored() {
        this.setState ({
            renderedList: this.state.unscoredList,
            showUnscored: true
        });
    }

    async fetchScored() {
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
                <Link style={{ textDecoration: 'none', color: '#3B9Bc2' }}to="/project-info">
                    <Project key={index} name={item[0]} identification={item[1]} score={item[2]}/>
                </Link>
            ))}
            </ul>
            </div>
        );
    }
}

export default ScoringOverview;
