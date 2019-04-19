import React, { Component } from 'react';
import "./ProjectInfo.css";


class ProjectInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            judgeId: '',
            projectId: '',
            score:''
        }
        this.routeToPrev = this.routeToPrev.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.handleScore = this.handleScore.bind(this);
    }

    componentDidMount() {
        this.setState({
            judgeId: this.props.location.state.judgeId,
            projectId: this.props.location.state.projectId
        })
    }

    async updateScore() {
        const judgeId = this.state.judgeId;
        const projectId = this.state.projectId;
        const res = await fetch('/api/scoreupdate/judge/' + judgeId + '/project/' + projectId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: parseInt(this.state.score, 10)
            })
        });
        const resJson = res.json();
        return resJson;
    };

    handleScore(event) {
        this.setState({
            score: event.target.value
        });
    }

    async routeToPrev() {
        await this.updateScore();
        this.props.history.push({
            pathname: '/overview',
            state: {
                judgeId: this.state.judgeId,
                score: this.state.score
            }
        })
    }

    render() {
        return (
          <div className="entirePage">
            <button type="submit" className="back-button" onClick={this.routeToPrev}>
                <div className="arrow"></div>
                <div className="arrow white-arrow"></div>
                <h2 className="back-button-text">BACK</h2>
            </button>

            <div className="score-box">
              <div className="proj-info">
                <p className="proj-title">{this.props.title}</p>
                <h className="proj-id">ID: {this.props.location.state.projectId}</h>
                <br /><br />
                <h>Team: {this.props.location.state.team}</h> <br />
                <h>Table: {this.props.location.state.table}</h> <br />
                <h>API:</h> <br />
                <h className="api-list">{this.props.location.state.api}</h>

              </div>
            </div>

            <div className="score-timer">
              <p className="score-text">TIME LEFT</p>
              <h1 className="scoring-time">2:00</h1>
            </div>

            <div>
                {this.props.location.state.score === null ?
                    <input
                        keyboardType="phone-pad"
                        className="score-input"
                        placeholder={this.props.location.state.score}
                        onChange={this.handleScore}
                    >
                    </input> :
                    <input
                        keyboardType="phone-pad"
                        className="score-input"
                        placeholder="Add Score"
                        onChange={this.handleScore}
                    >
                    </input>
                }
            </div>
          </div>
        );
    }

}

export default ProjectInfo;
