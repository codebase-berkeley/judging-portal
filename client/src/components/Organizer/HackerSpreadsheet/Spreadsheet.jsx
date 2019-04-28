import React, { Component } from 'react'; 
import '../OrganizerPortal.css'; 
import SpreadEntry from './SpreadEntry'; 
import { Link } from 'react-router-dom';
import Home from '../../../assets/home.svg';

class Spreadsheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
        this.routeToPrev = this.routeToPrev.bind(this);
        this.routeToNext = this.routeToNext.bind(this);
    }

    async componentDidMount() { 
        this.getProjectInfo().then(result => {
            this.setState({
                projects: result.sort(this.compareWaveFunct)
            })
        });
    }

    async getProjectInfo() {
        const res = await fetch('/api/project-tables-waves');
        const resJson = res.json(); 
        return resJson;
    }

    compareWaveFunct(project1, project2) {
        if (project1.wave < project2.wave) {
            return -1; 
        } else if (project1.wave > project2.wave) {
            return 1;
        } else {
            if (project1.tablename > project2.tablename) {
                return 1;
            }
            else {
                return -1;
            }
        }
    }

    routeToPrev() {
        const path = "/judge-info";
        this.props.history.push(path);
    }

    routeToNext() {
        const path = "/winners";
        this.props.history.push(path);
    }

    render() { 
        const projectEntries = (this.state.projects || []).map((item) => (
            <ul className="spread-entry">
                <SpreadEntry 
                name = {item.name}
                wave = {item.wave}
                table = {item.tablename}
                />
            </ul>

        ))
        return (
            <div className="page-background" id="hackSpreadsheet"> 
                <div className="page-header">
                    <div className="home-nav">
                        <img className="home-icon" src={Home}/>
                        <Link className="home-label" to='/navigation'>HOME</Link>
                    </div>
                HACKER FACING SPREADSHEET</div>
                <div className="content-background">
                    <div className="content-spreadsheet">
                        <div className="list-area">
                            <div className="entries-list">
                                <div className="entries-list-name">PROJECT NAME</div>
                                <div className="entries-list-wave">WAVE</div>
                                <div className="entries-list-table">TABLE</div>
                                <div className="entries-scroll">
                                    <div className="entry-element">{projectEntries}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className= "links spreadsheet">
                        <Link className="nav prev" to='/project-breakdown' onClick={this.routeToPrev}>&#60; SCORING BREAKDOWN</Link>
                        <Link className="nav next" to='/winners' onClick={this.routeToNext}>WINNERS ></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Spreadsheet;