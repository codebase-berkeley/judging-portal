import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Project from './Project.jsx'
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
    }

    async componentDidMount() {
        const resUnscored = await fetch('/api/unscored/judge/' + this.props.location.state.judgeId);
        const resJson1 = await resUnscored.json();
        const resScored = await fetch('/api/scored/judge/' + this.props.location.state.judgeId);
        const resJson2 = await resScored.json();
        this.setState({
            judgeId: this.props.location.state.judgeId,
            unscoredList: resJson1,
            scoredList: resJson2,
            renderedList: resJson1
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
                <Link style={{ textDecoration: 'none', color: '#0A7191' }} to={{
                    pathname: "/project-info",
                    state: {
                        judgeId: this.state.judgeId,
                        name: item.name,
                        projectId: item.projectid,
                        url: item.github,
                        api: item.categories,
                        tablename: item.tablename,
                        wave: item.wave,
                        score: item.score,
                    }
                }}>
                    <Project key={index} name={item.name} identification={item.projectid}/>
                </Link>
            ))}
            </ul>
            </div>
        );
    }
}

export default ScoringOverview;
