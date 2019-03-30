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
        const res = await fetch('/api/projects');
        const res_json = await res.json();
        console.log("FETCH JSON: " + JSON.stringify(res_json));
        console.log(this.state.APIdata);
        this.setState({
            APIdata: res_json
        });


        console.log(JSON.stringify(this.state.APIdata));
        this.sortData(res_json);
    
    }

    sortData(data) {
        
        // let fetchedData = [["Chancellor", "42024", "5"], ["Christ", "31413", "4"], ["Oski", "01134", "4"], ["GoBears", "58008", ""]];
        let scoredData = [];
        let unscoredData = [];
        console.log("APIdata INSIDE SORTDATA: " + JSON.stringify(data));
        for (let i = 0; i < data.length; i++) {
            let score = data[i].score;
            let component = [data[i]];
            console.log("THE COMPONENT: " + component);
            if (score == -1) {
                data[i].score = 0;
                unscoredData = unscoredData.concat(component);
            }
            else {
                scoredData = scoredData.concat(component);
            }
        }

        console.log("UNSCORED: " + JSON.stringify(unscoredData));
        console.log("SCORED: " + JSON.stringify(scoredData));


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
                {console.log(this.state.renderedList)}
            {this.state.renderedList.map((item, index) => (
                <Link style={{ textDecoration: 'none', color: '#3B9Bc2' }}to="/project-info">
                    <Project key={index} name={item["team"]} identification={item["id"]} score={item["score"]}/>
                </Link>
            ))}
            </ul>
            </div>
        );
    }
}

export default ScoringOverview;
