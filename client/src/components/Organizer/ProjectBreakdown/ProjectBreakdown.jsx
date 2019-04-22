import React, { Component } from 'react';
import '../OrganizerPortal.css';
import CategoryItem from './CategoryItem';

class ProjectBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ["Google API", "Yelp API", "Codebase API"],
            projects: [['SyncUp', 'Google API', 25], ['Codeacademy', 'Codebase API', 100], ['Github', 'Codebase API', 0]], 
            scored: [['SyncUp', 'Google API', 25], ['Codeacademy', 'Codebase API', 100]],
            unscored: [['Github', 'Yelp API', 0]],
            projectsJson: {}
        };
        this.routeToPrev = this.routeToPrev.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    async componentDidMount() {
        let projectsJson = {};
        let categories = await this.getCategories();
        console.log(categories);
        var i; 
        for (i = 0; i < categories.length; i += 1) {
            let category = categories[i];
            projectsJson[category] = {
                scored: [[]],
                unscored: [[]]
            }
        }
        console.log(projectsJson);

        let projects = await this.getProjects();
        var j;
        for (j = 0; j < projects.length; j += 1) {
            let projectid = projects[j].projectid;
            console.log(projectid);
            let scores = await this.getScores(projectid);
            console.log("scores:  " + scores);
            var k;
            for (k = 0; k < scores.length; k += 1) {
                console.log("Scores data:" + scores[k]);
                let n = await this.getName(projectid);
                let judgeid = scores[k].judgeid;
                console.log("judgeid: " + judgeid);
                let name = n[0].name;
                let category = scores[k].category;
                // let judge = await this.getJudge()
                // console.log(judge);
                // let judgeName = judge[0].name;
                // console.log('Judge Name: '+ judgeName);
                console.log("Category: " + category);
                console.log(name);
                console.log("the fucking score: " + scores[k].score);
                if (scores[k].score) {
                    projectsJson[category].scored.push([name, scores[k].score]);
                } else {
                    projectsJson[category].unscored.push([name])
                }
            }
            console.log(projectsJson);
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
        console.log("getting projects");
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
        // let scored;
        // let unscored;

        // for (var key in projects) {
        //     <ul className="proj-item">
        //         <CategoryItem category={key} scored={category.scored} unscored={category.unscored}/>
        //     </ul>
        // }

        

    
        // const scoredProjects = (this.state.scored||[]).map((item)=>(
        //     <ul className="proj-item">
        //        <ProjectItem
        //         name={item[0]}
        //         score={item[1]}
        //       />
        //     </ul>
        //   ))
        //   const unscoredProjects = (this.state.unscored||[]).map((name)=>(
        //     <ul className="proj-item">
        //        <ProjectItem
        //         name={name[0]}
        //       />
        //     </ul>
        //   ))
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

                            {/* <div className="breakdown-list">{scoredProjects}</div> */}
                        </div>
                        <div className = "unscored-section">
                            <div className="project-list">
                                <div className="project-list-name-unscored">NAME</div>
                            </div>
                    
                            {/* <div className="breakdown-list">{unscoredProjects}</div> */}
                        </div>
                    </div>
                    <div className="progress" >
                        {(this.state.scored.length/(this.state.scored.length + this.state.unscored.length)*100).toFixed(2)}% SCORED
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