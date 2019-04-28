import React, { Component } from 'react';
import '../OrganizerPortal.css';
import ProjectItem from './ProjectItem';
import { Link } from 'react-router-dom';
import Home from '../../../Assets/home.svg';

class ProjectBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          scored: [['SyncUp', 25], ['Codeacademy', 100]],
          unscored: [['Github', 0]]
        };
        this.routeToPrev = this.routeToPrev.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    routeToPrev() {
        const path = "/judge-info";
        this.props.history.push(path);
      }
    
    routeToNext() {
        const path = "/hacker-spreadsheet"; 
        this.props.history.push(path);
    }

    render() {
        const scoredProjects = (this.state.scored||[]).map((item)=>(
            <ul className="proj-item">
               <ProjectItem
                name={item[0]}
                score={item[1]}
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
                <div className="page-header">
                    <div className="home-nav">
                        <img className="home-icon" src={Home}/>
                        <Link className="home-label" to='/navigation'>HOME</Link>
                    </div>
                SCORING BREAKDOWN</div>
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

                    <div className= "links">
                        <Link className="nav prev" to='/judge-info' onClick={this.routeToPrev}>&#60; JUDGE INFO</Link>
                        <Link className="nav next" to='/hacker-spreadsheet' onClick={this.routeToNext}>HACKER SPREADSHEET ></Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProjectBreakdown;