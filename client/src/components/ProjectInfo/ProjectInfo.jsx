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

    async updateScore() {
        for (let key in this.state.scores) {
            this.putScore(key);
        }
    };

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
            <div className = "entirePage">
                <div className="submit">
                    <img type="image" className="backButton" src={backIcon} onClick={this.routeToPrev}/>
                    <div className = "projHeader">
                        <p className = "projID"><b>ID:</b> {this.props.location.state.projectId}</p>
                    </div>
                </div>

                <div className = "projInfo">

                    <div className = "projDetails">
                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {teamIcon}></img>
                                <h className="detail-header attribute-align-left">Team</h>
                            </div>
                            <p className="actual-info attribute-align-left">{this.props.location.state.name}</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {apiIcon}></img>
                                <h className="detail-header attribute-align-left">API</h>
                            </div>
                            <p className="actual-info attribute-align-left">{cat}</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {tableIcon}></img>
                                <h className="detail-header attribute-align-left">Table</h>
                            </div>
                           <p className="actual-info attribute-align-left">{this.props.location.state.tablename}</p>
                        </div>

                    </div>
                
                </div>
        
                <div className="list">{cmp}</div>
                <div className="wrapper">
                <button
                    className="button"
                    type="submit"
                    onClick={() => { this.updateScore();}}
                    >
                    SUBMIT
                </button></div>
            </div>

        );
    }

}

export default ProjectInfo;
