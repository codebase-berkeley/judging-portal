import React, { Component } from 'react';
import teamIcon from "./src/team_icon.png";
import apiIcon from "./src/API_icon.png";
import tableIcon from "./src/table_icon.png";
import backIcon from "./src/back_icon.png";
import PerCategory from "./PerCategory.jsx";
import "./ProjectInfo.css";

class ProjectInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            judgeId: '',
            projectId: '',
            scores: {}
        }
        this.routeToPrev = this.routeToPrev.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.changeScore = this.changeScore.bind(this);
        this.putScore = this.putScore.bind(this);
    }

    async componentDidMount() {
        const judgeId = this.props.location.state.judgeId;
        const projectId = this.props.location.state.projectId;
        const res = await fetch('/api/categories/judge/' + judgeId + '/project/' + projectId);
        const resJson = await res.json();
        const dict = {}
        for (let i = 0; i < resJson.length; i +=1) {
            dict[resJson[i].category] = resJson[i].score
        };
        this.setState({
            judgeId: judgeId,
            projectId: projectId,
            scores: dict

        })
    }

    async putScore(category) {
        const judgeId = this.state.judgeId;
        const projectId = this.state.projectId;
        const res = await fetch('/api/scoreupdate/judge/' + judgeId + '/project/' + projectId + '/category/' + category, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: parseInt(this.state.scores[category], 10)
            })
        });
        const resJson = res.json();
        return resJson;
    }

    changeScore(category, score) {
        const dict = this.state.scores
        dict[category] = score;
        this.setState({
            scores: dict
        });
    }

    async updateScore() {
        for (const key in this.state.scores) {
            await this.putScore(key);
        }
        this.routeToPrev();
    };

    async routeToPrev() {
        this.props.history.push({
            pathname: '/overview',
            state: {
                judgeId: this.state.judgeId
            }
        })
    }

    render() {
        const cmp = Object.keys(this.state.scores).map((key) => (
               <PerCategory
                category={key}
                score={this.state.scores[key]}
                changeScore={this.changeScore}
              />
        ));
        const cat = (this.props.location.state.api || []).map((item) => (
            <ul>
                <p className="category-list">{item}</p>
            </ul>
        ));
        return (
            <div className = "entire-page">
                <div className="submit">
                    <button type="submit" className="back-button" onClick={this.routeToPrev}>
                        <div className="arrow"></div>
                        <div className="arrow white-arrow"></div>
                        <h2 className="back-button-text">BACK</h2>
                    </button>
                    <div className="proj-header">
                        <p className="proj-id"><b>ID:</b> {this.props.location.state.projectId}</p>
                    </div>
                </div>

                <div className="info-and-scores">
                    <div className = "proj-info">

                        <div className = "proj-details">
                            <div className = "attribute-item">
                                <div className="head-and-icon">
                                    <img className="projinfo-icon" src ={teamIcon}></img>
                                    <h className="detail-header">Team</h>
                                </div>
                                <p className="actual-info">{this.props.location.state.name}</p>
                            </div>

                            <div className = "attribute-item">
                                <div className="head-and-icon">
                                    <img className="projinfo-icon" src ={apiIcon}></img>
                                    <h className="detail-header">API</h>
                                </div>
                                <p className="actual-info">{cat}</p>
                            </div>

                            <br />

                            <div className = "attribute-item">
                                <div className="head-and-icon">
                                    <img className="projinfo-icon" src ={tableIcon}></img>
                                    <h className="detail-header">Table</h>
                                </div>
                               <p className="actual-info">{this.props.location.state.tablename}</p>
                            </div>
                        </div>
                    </div>
                    <div className="list">{cmp}</div>
                </div>
                
                <div className="wrapper">
                    <button
                        className="button"
                        type="submit"
                        onClick={() => { this.updateScore(); }}
                        >
                        SUBMIT
                    </button>
                </div>
            </div>
        );
    }
}

export default ProjectInfo;
