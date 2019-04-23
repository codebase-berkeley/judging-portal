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
            scores:[]
        }
        this.routeToPrev = this.routeToPrev.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.handleScore = this.handleScore.bind(this);
    }

    async componentDidMount() {
        const judgeId = this.props.location.state.judgeId;
        const projectId = this.props.location.state.projectId;
        const res = await fetch('/api/categories/judge/' + judgeId + '/project/' + projectId);
        const resJson = await res.json();
        this.setState({
            judgeId: judgeId,
            projectId: projectId,
            scores: resJson
        })
    }

    async updateScore(category) {
        const judgeId = this.state.judgeId;
        const projectId = this.state.projectId;
        const res = await fetch('/api/scoreupdate/judge/' + judgeId + '/project/' + projectId + '/category/' + category, {
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

    // async routeToPrev() {
    //     await this.updateScore();
    //     this.props.history.push({
    //         pathname: '/overview',
    //         state: {
    //             judgeId: this.state.judgeId,
    //             score: this.state.score
    //         }
    //     })
    // }

    render() {
        const cmp = (this.state.scores||[]).map((entry,index)=>(
            <ul className="category-score">
               <PerCategory
                category={entry.category}
                score={this.state.scores[index].score}
              />
            </ul>
          ))
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
                            <p className="actual-info attribute-align-left">{this.props.location.state.name}</p>
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
                           <p className="actual-info attribute-align-left">{this.props.location.state.tablename}</p>
                        </div>

                    </div>
                
                </div>
                <div className="score-list">
                    <div className="list">{cmp}</div>
                </div>
                <button
                    className="button"
                    type="submit"
                    onClick={() => { this.postScore();}}
                    >
                    SUBMIT
                </button>
            </div>

        );
    }

}

export default ProjectInfo;
