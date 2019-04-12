import React, { Component } from 'react';
import './ScoringOverview.css';
import Project from './Project.jsx'
import { Link } from 'react-router-dom';

class ScoringOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
        APIdata: {},
        renderedList: [],
        scoredList: [],
        unscoredList: [],
        showUnscored: true
    };

    this.fetchUnscored = this.fetchUnscored.bind(this);
    this.fetchScored = this.fetchScored.bind(this);
    this.sortData = this.sortData.bind(this);
    }

    async componentDidMount() {
        let res = await fetch('/api/projects');
        let res_json = await res.json();
        this.setState({
            APIdata: res_json
        });
        this.sortData(res_json);
    }

    sortData(data) {
        let scoredData = [];
        let unscoredData = [];
        for (let i = 0; i < data.length; i++) {
            let score = data[i].score;
            let component = [data[i]];
            if (score === "") {
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
                <Link style={{ textDecoration: 'none', color: '#3B9Bc2' }} to={{
                    pathname: "/project-info",
                    state: {
                        team: item.team,
                        id: item.id,
                        api: item.api,
                        table: item.table,
                        score: item.score
                    }
                }}>
                    <Project key={index} name={item["team"]} identification={item["id"]} score={item["score"]}/>
                </Link>
            ))}
            </ul>
            </div>
        );
    }
}

export default ScoringOverview;
