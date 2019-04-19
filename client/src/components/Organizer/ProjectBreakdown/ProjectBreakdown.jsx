import React, { Component } from 'react';
import '../OrganizerPortal.css';
import ProjectItem from './ProjectItem';

class ProjectBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          scored: [['SyncUp', 25], ['Codecademy', 100]],
          unscored: [['Github', 0]]
        };
        this.routeToPrev = this.routeToPrev.bind(this);
    }

    routeToPrev() {
        const path = "/judge-info";
        this.props.history.push(path);
      }

    render() {
        const scoredProjects = (this.state.scored||[]).map((name,index)=>(
            <ul className="proj-item">
               <ProjectItem
                name={name[0]}
                score={this.state.scored[index][1]}
              />
            </ul>
          ))
          const unscoredProjects = (this.state.unscored||[]).map((name)=>(
            <ul className="proj-item">
               <ProjectItem
                name={name[0]}
              />
            </ul>
          ))
        return (
            <div className="page-background" id= "projBreakdown">
                <div className="page-header">SCORING BREAKDOWN</div>
                <div className="content-background">
                    <div className="headers"> 
                            <header className="scoring-header">SCORED</header>
                            <header className="scoring-header">UNSCORED</header> 
                    </div>
                    <div className="content-breakdown">
                        <div className="scored-section">
                            <div className="project-list">
                                <div className="project-list-name">NAME</div>
                                <div className="project-list-score">SCORE</div>
                            </div>

                            <div className="breakdown-list">{scoredProjects}</div>
                        </div>
                        <div className = "unscored-section">
                            <div className="project-list">
                                <div className="project-list-name-unscored">NAME</div>
                            </div>
                    
                            <div className="breakdown-list">{unscoredProjects}</div>
                        </div>
                    </div>
                    <div className="progress" >
                        {(this.state.scored.length/(this.state.scored.length + this.state.unscored.length)*100).toFixed(2)}% SCORED
                    </div>

                    <div className= "buttons nav judge-button">
                        <button type="button" className="button" onClick={this.routeToPrev}>PREV</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProjectBreakdown;