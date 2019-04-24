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
        const projectsJson = {};
        const keys = [];
        const categories = await this.getCategories();
        for (let i = 0; i < categories.length; i += 1) {
            const category = categories[i];
            projectsJson[category] = {
                scored: [[]],
                unscored: [[]]
            }
        }

        const projects = await this.getProjects();
        for (let j = 0; j < projects.length; j += 1) {
            const projectid = projects[j].projectid;
            const scores = await this.getScores(projectid);
            for (let k = 0; k < scores.length; k += 1) {
                const n = await this.getName(projectid);
                const judgeid = scores[k].judgeid;
                const projectName = n[0].name;
                const category = scores[k].category;
                const judge = await this.getJudge(judgeid)
                const judgeName = judge[0].name;
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
        const categoryList = [];

        const projects = await this.getProjects();
        for (let i = 0; i < projects.length; i += 1) {
            const categories = projects[i].categories;
            for (let k = 0; k < projects.length; k += 1) {
                if (categories[k] && categoryList.indexOf(categories[k]) === -1) {
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
        const path = "/hacker-spreadsheet";
        this.props.history.push(path);
    }

    render() {
      const projects = this.state.projectsJson;
      const keys = this.state.keys;
      if (this.state.keys.length === 0) {return null }
      else {
        const apiCategories = [];
        for (let i = 0; i < this.state.keys.length; i+=1) {
          apiCategories.push(<APICategory api={keys[i]} alldata={projects[keys[i]]} />);
        }
        return (
          <div className="page-background" id="projBreakdown">
              <div className="page-header">SCORING BREAKDOWN</div>
              <div className="content-background">
                <div className="api-category-box">{apiCategories}</div>
                <div className= "buttons nav judge-button">
                    <button type="button" className="button" onClick={this.routeToPrev}>PREV</button>
                    <button type="button" className="button" onClick={this.routeToNext}>NEXT</button>
                </div>

              </div>
          </div>
        );
      }
    }
}

export default ProjectBreakdown;
