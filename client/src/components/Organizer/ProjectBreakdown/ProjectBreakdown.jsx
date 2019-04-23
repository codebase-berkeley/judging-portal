import React, { Component } from 'react';
import '../OrganizerPortal.css';
import APICategory from './APICategory';


class ProjectBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsJson: {},
            keys: []
        };
        this.routeToPrev = this.routeToPrev.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    async componentDidMount() {
        let projectsJson = {};
        let keys = [];
        let categories = await this.getCategories();
        let i;
        for (i = 0; i < categories.length; i += 1) {
            let category = categories[i];
            projectsJson[category] = {
                scored: [[]],
                unscored: [[]]
            }
        }

        let projects = await this.getProjects();
        let j;
        for (j = 0; j < projects.length; j += 1) {
            let projectid = projects[j].projectid;
            let scores = await this.getScores(projectid);
            let k;
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
                keys.push(category);
            }
        }

        this.setState({
            projectsJson: projectsJson,
            keys: keys
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
        let i;
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
        console.log(this.state.projectsJson[this.state.keys[0]]);
        console.log(this.state.keys);

        return (
          <div className="page-background" id="projBreakdown">
              <div className="page-header">SCORING BREAKDOWN</div>
              <div className="content-background">
                <div className="api-category-box">
                    <APICategory
                      api={this.state.keys[0]}/>
                    <APICategory
                      api={this.state.keys[1]}/>
                    <APICategory
                      api={this.state.keys[2]}/>
                    <APICategory
                      api={this.state.keys[3]}/>
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
