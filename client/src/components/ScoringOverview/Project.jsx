import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './Project.css';

class Project extends Component {
    render() {
        return(
            <div className="projectcmp">
                <div className="project-text">
                    <h3>{this.props.name}</h3>
                    <p>ID: {this.props.identification}</p>
                </div>
                {/* <div className="overview-score">
                    <h2>{this.props.score}</h2></div> */}
            </div>
        );
    }
}

export default withRouter(Project);
