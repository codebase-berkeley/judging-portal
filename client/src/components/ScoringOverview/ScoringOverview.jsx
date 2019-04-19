import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Project from './Project'
import './ScoringOverview.css';

class ScoringOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
        renderedList: [],
        scoredList: [],
        unscoredList: [],
        showUnscored: true,
        judgeId: ''
    };

    this.fetchUnscored = this.fetchUnscored.bind(this);
    this.fetchScored = this.fetchScored.bind(this);
    this.sortData = this.sortData.bind(this);
    }

    async componentDidMount() {
        const id = this.props.location.state.judgeId;
        const path = `/api/projects/${id}/`;
        const res = await fetch(path);
        const resJson = await res.json();
        this.setState({
            judgeId: this.props.location.state.judgeId
        });
        this.sortData(resJson);
    }

    sortData(data) {
        let scoredData = [];
        let unscoredData = [];
        for (let i = 0; i < data.length; i += 1) {
            const { score } = data[i];
            const component = [data[i]];
            if (score === null) {
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
                        <button className={this.state.showUnscored ? "scored" : "unscored"} type="submit" onClick={this.fetchUnscored}>Unscored</button>
                        <button className={this.state.showUnscored ? "unscored" : "scored"} type="submit" onClick={this.fetchScored}>  Scored  </button>
                    </div>
                </div>
            <ul>
            {this.state.renderedList.map((item, index) => (
                <Link style={{ textDecoration: 'none', color: '#3B9Bc2' }} to={{
                    pathname: "/project-info",
                    state: {
                        judgeId: this.state.judgeId,
                        team: item.name,
                        projectId: item.projectid,
                        api: item.categories,
                        score: item.score
                    }
                }}>
                    <Project key={index} name={item.name} identification={item.projectId} score={item.score}/>
                </Link>
            ))}
            </ul>
            </div>
        );
    }
}

export default ScoringOverview;
