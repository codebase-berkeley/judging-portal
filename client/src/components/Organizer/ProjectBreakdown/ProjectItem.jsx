import React, { Component } from 'react';
import '../OrganizerPortal.css';

class ProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
        return (
            <div className = "project-item">
                <div className="project-name">{this.props.name}</div>
                <div className="project-score">{this.props.score}</div>
            </div>
        );
    }
}

export default ProjectItem;