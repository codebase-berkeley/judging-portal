import React, { Component } from 'react';
import '../OrganizerPortal.css';
import CategoryItem from './CategoryItem';

class ProjectBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsJson: {}
        };
        this.routeToPrev = this.routeToPrev.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    async componentDidMount() {
        let projectsJson = {};
        let categories = await this.getCategories();
        var i; 
        for (i = 0; i < categories.length; i += 1) {
            let category = categories[i];
            projectsJson[category] = {
                scored: [[]],
                unscored: [[]]
            }
        }

        let projects = await this.getProjects();
        var j;
        for (j = 0; j < projects.length; j += 1) {
            let projectid = projects[j].projectid;
            let scores = await this.getScores(projectid);
            var k;
            for (k = 0; k < scores.length; k += 1) {
                let n = await this.getName(projectid);
                let judgeid = scores[k].judgeid;
                let projectName = n[0].name;
                let category = scores[k].category;
                let judge = await this.getJudge(judgeid)
                let judgeName = judge[0].name;
                if (scores[k].score) {
                    projectsJson[category].scored.push([projectName, judgeName, scores[k].score]);
                } else {
                    projectsJson[category].unscored.push([projectName, judgeName])
                }
            }
        }

        this.setState({
            projectsJson: projectsJson
        })
    }

    async getJudge(judgeid) {
        const res = await fetch('/api/judgename/' + judgeid);
        const resJson = res.json();
        return resJson
    }

    async getCategories() {
        let categoryList = [];

        let projects = await this.getProjects();
        var i;
        for (i = 0; i < projects.length; i += 1) {
            let categories = projects[i].categories;
            var k = 0; 
            for (k = 0; k < projects.length; k += 1) {
                if (categories[k] && categoryList.indexOf(categories[k]) == -1) {
                    categoryList.push(categories[k]);
                }
            }
        }
        return categoryList;
    }

    async getScores(projectID) {
        const res = await fetch('/api/projectscore/' + projectID);
        const resJson = res.json();
        return resJson
    }

    async getName(projectID) {
        const res = await fetch('/api/projectname/' + projectID);
        const resJson = res.json();
        return resJson
    }

    async getProjects() {
        const res = await fetch('/api/projects');
        const resJson = res.json();
        return resJson
    }

    async getAPIs() {
        const res = await fetch('/api/apis');
        const resJson = res.json();
        return resJson
    }

    routeToPrev() {
        const path = "/judge-info";
        this.props.history.push(path);
      }
    
    routeToNext() {
        // this.postData().then(result => console.log(result));
        const path = "/hacker-spreadsheet"; 
        this.props.history.push(path);
    }

    render() {
        let projects = this.state.projectsJson;
        console.log(projects);

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

                        </div>
                        <div className = "unscored-section">
                            <div className="project-list">
                                <div className="project-list-name-unscored">NAME</div>
                            </div>
                    
                        </div>
                    </div>

                    <div className= "buttons nav judge-button">
                        <button type="button" className="button" onClick={this.routeToPrev}>PREV</button>
                        <button type="button" className="button" onClick={this.routeToNext}>NEXT</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProjectBreakdown;