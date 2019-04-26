import React, { Component } from 'react';
import '../OrganizerPortal.css';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
      let score = true;
      if (this.props.score == null) {
        score = false;
      }

        return (
          <div className="proj-item">
            <div className="project-name">{this.props.name}</div>
            <div className="project-score">{score ? this.props.score : ""}</div>
          </div>
        );
    }
}

export default CategoryItem;