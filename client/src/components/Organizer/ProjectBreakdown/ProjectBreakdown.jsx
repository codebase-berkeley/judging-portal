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
    }

    render() {
        const scoredProjects = (this.state.scored||[]).map((name,index)=>(
            <ul>
               <ProjectItem
                name={name[0]}
                score={this.state.scored[index][1]}
              />
            </ul>
          ))
          const unscoredProjects = (this.state.unscored||[]).map((name,index)=>(
            <ul>
               <ProjectItem
                name={name[0]}
              />
            </ul>
          ))
        return (
            <div className="page-background" id= "projBreakdown">
                <div className="page-header">SCORING BREAKDOWN</div>
                <div className="content-background">
                    <div className="content-breakdown">
                        <div className="scored-section">
                        {/* <header className="scored-header"> 
                            SCORED
                        </header> */}
                            <div className="project-list">
                                <div className="project-list-name">NAME</div>
                                <div className="project-list-score">SCORE</div>
                            </div>

                            <div className="breakdown-list">{scoredProjects}</div>
                        </div>
                        <div className = "unscored-section">
                        {/* <header className="scored-header"> 
                            UNSCORED
                        </header> */}
                            <div className="project-list">
                                <div className="judge-list-name">NAME</div>
                                <div className="judge-list-api">UNSCORED</div>
                            </div>
                    
                            <div className="breakdown-list">{unscoredProjects}</div>
                        </div>
                    </div>
                    {/* <div className="progress-bar" style={{ width: (this.state.scored.length/(this.state.unscored.length + this.state.unscored.length))*2000, background: '#32CD32' }}>
                    50%
                    </div> */}
                    <div className="progress" >
                    {(this.state.scored.length/(this.state.scored.length + this.state.unscored.length)*100).toFixed(2)}% Scored
                    </div>

                    <div className= "buttons nav judge-button">
                        <button className="button" onClick={this.routeToPrev}>PREV</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProjectBreakdown;