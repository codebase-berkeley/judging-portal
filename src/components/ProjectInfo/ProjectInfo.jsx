import React, { Component } from 'react';
import team_icon from "./src/team_icon.png";
import api_icon from "./src/API_icon.png";
import table_icon from "./src/table_icon.png";

import "./ProjectInfo.css";


class ProjectInfo extends Component{
    render() {
        return (
            <div className = "entirePage">
                <button> back


                </button>


                <div className = "projInfo">
                    <div className = "projHeader">
                     <h className = "projTitle">{this.props.title}</h>
                     <p className = "projID"><b>ID:</b> {this.props.id}</p>
                    </div>

                    <div className = "projDetails">
                        <div className = "attribute-item">
                            <img className="projinfo-icon" src = {team_icon}></img>
                            <div className = "teamDetails">
                              <h className="detail-header">Team</h>
                              <p>Mulan and Warren</p>
                            </div>
                        </div>

                        <div className = "attribute-item">
                           <img className="projinfo-icon" src = {api_icon}></img>

                           <div className = "teamDetails">
                               <h className="detail-header">API</h>
                               <p>Google Vision</p>
                           </div>
                        </div>

                        <div className = "attribute-item">
                           <img className="projinfo-icon" src = {table_icon}></img>

                           <div className = "teamDetails">
            
                           <h className="detail-header">Table</h>
                           <p>#45</p>
                           </div>
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
