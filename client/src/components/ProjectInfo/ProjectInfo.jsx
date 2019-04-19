import React, { Component } from 'react';
import teamIcon from "./src/team_icon.png";
import apiIcon from "./src/API_icon.png";
import tableIcon from "./src/table_icon.png";
import backIcon from "./src/back_icon.png"
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
            <div className = "entirePage">
                <button type="submit" onClick={this.routeToPrev}>
                    <img type="image" className="backButton" src={backIcon}/>
                </button>

                <div className = "projInfo">
                    <div className = "projHeader">
                     <h className = "projTitle">{this.props.title}</h>
                     <p className = "projID"><b>ID:</b> {this.props.location.state.projectId}</p>
                    </div>

                    <div className = "projDetails">
                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {teamIcon}></img>
                                <h className="detail-header attribute-align-left">Team</h>
                            </div>
                            <p className="actual-info attribute-align-left">{this.props.location.state.team}</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {apiIcon}></img>
                                <h className="detail-header attribute-align-left">API</h>
                            </div>
                            <p className="actual-info attribute-align-left">{this.props.location.state.api}</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {tableIcon}></img>
                                <h className="detail-header attribute-align-left">Table</h>
                            </div>
                           <p className="actual-info attribute-align-left">{this.props.location.state.table}</p>
                        </div>

                    </div>
                
                </div>

            <div className = "score">
                {this.props.location.state.score === null ? 
                    <input
                        keyboardType = "phone-pad"
                        className = "scoreInput" 
                        placeholder = "Add score"
                        onChange={this.handleScore}
                    >
                    </input> : 
                    <input
                        keyboardType = "phone-pad"
                        className = "scoreInput" 
                        placeholder = {this.props.location.state.score}
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
