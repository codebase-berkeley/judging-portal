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
    }

    render() {
        console.log("team: " + this.props.location.state.table);
        return (
            <div className = "entirePage">
                <NavLink to="/overview"> 
                    <img type="image" className="backButton" src={back_icon}/>
                </NavLink>

                <div className = "projInfo">
                    <div className = "projHeader">
                     <h className = "projTitle">{this.props.title}</h>
                     <p className = "projID"><b>ID:</b> {this.props.location.state.id}</p>
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
                {this.props.location.state.score === "" ? 
                    <input
                        keyboardType = "phone-pad"
                        className = "scoreInput" 
                        placeholder = "Add score"
                    >
                    </input> : 
                    <input
                        keyboardType = "phone-pad"
                        className = "scoreInput" 
                        placeholder = {this.props.location.state.score}
                    >
                    </input>
                }
            </div>

            </div>

        );
    }

}

export default ProjectInfo;
