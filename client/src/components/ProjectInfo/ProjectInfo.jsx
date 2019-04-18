import React, { Component } from 'react';
import team_icon from "./src/team_icon.png";
import api_icon from "./src/API_icon.png";
import table_icon from "./src/table_icon.png";
import back_icon from "./src/back_icon.png"
import { NavLink } from 'react-router-dom';
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
        let judgeId = this.state.judgeId;
        let projectId = this.state.projectId;
        let res = await fetch('/api/scoreupdate/judge/' + judgeId + '/project/' + projectId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: parseInt(this.state.score, 10)
            })
        });
        let res_json = res.json();
        return res_json;
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
                <button onClick={this.routeToPrev}>
                    <img type="image" className="backButton" src={back_icon}/>
                </button>

                <div className = "projInfo">
                    <div className = "projHeader">
                     <h className = "projTitle">{this.props.title}</h>
                     <p className = "projID"><b>ID:</b> {this.props.location.state.projectId}</p>
                    </div>

                    <div className = "projDetails">
                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {team_icon}></img>
                                <h className="detail-header attribute-align-left">Team</h>
                            </div>
                            <p className="actual-info attribute-align-left">{this.props.location.state.team}</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {api_icon}></img>
                                <h className="detail-header attribute-align-left">API</h>
                            </div>
                            <p className="actual-info attribute-align-left">{this.props.location.state.api}</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {table_icon}></img>
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
