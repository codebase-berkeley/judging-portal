import React, { Component } from 'react';
import team_icon from "./src/team_icon.png";
import api_icon from "./src/API_icon.png";
import table_icon from "./src/table_icon.png";
import back_icon from "./src/back_icon.png"
import { NavLink } from 'react-router-dom';
import "./ProjectInfo.css";


class ProjectInfo extends Component{
    render() {
        return (
            <div className = "entirePage">
                {/* <button className = "backButton" onClick = {this.back}> 
                    <img className = "backButton" src = {back_icon}></img>
                </button> */}
                <NavLink to="/overview"> 
                    <input type="image" className="backButton" src={back_icon}/>
                </NavLink>

                <div className = "projInfo">
                    <div className = "projHeader">
                     <h className = "projTitle">{this.props.title}</h>
                     <p className = "projID"><b>ID:</b> {this.props.id}</p>
                    </div>

                    <div className = "projDetails">
                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {team_icon}></img>
                                <h className="detail-header attribute-align-left">Team</h>
                            </div>
                            <p className="actual-info attribute-align-left">Mulan and Warren</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {api_icon}></img>
                                <h className="detail-header attribute-align-left">API</h>
                            </div>
                            <p className="actual-info attribute-align-left">Google Vision</p>
                        </div>

                        <div className = "attribute-item">
                            <div className="head-and-icon">
                                <img className="projinfo-icon" src = {table_icon}></img>
                                <h className="detail-header attribute-align-left">Table</h>
                            </div>
                           <p className="actual-info attribute-align-left">45</p>
                        </div>

                    </div>
                
                </div>
            <div className = "score">
                <input className = "scoreInput" placeholder = "Add score"></input>
            </div>

            </div>

        );
    }

}

export default ProjectInfo;
