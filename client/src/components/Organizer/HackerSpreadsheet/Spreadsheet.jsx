import React, { Component } from 'react'; 
import '../OrganizerPortal.css'; 
import SpreadEntry from './SpreadEntry'; 

class Spreadsheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
        this.routeToPrev = this.routeToPrev.bind(this);
    }

    async componentDidMount() { 
        this.getProjectInfo().then(result => {
            const projs = []; 
            for (let i = 0; i < result.length; i++) {
                projs[i] = [result[i].name, result[i].wave, result[i].tablename];
            }
            this.setState({
                projects: projs.sort(this.compareWaveFunct)
            })
        });
    }

    async getProjectInfo() {
        const res = await fetch('/api/projects');
        const resJson = res.json(); 
        return resJson;
    }

    compareWaveFunct(a, b) {
        if (a[1] < b[1]) {
            return -1 
        } else if (a[1] > b[1]) {
            return 1
        } else {
            if (a[2] > b[2]) {
                return 1
            }
            else {
                return -1
            }
        }
    }

    routeToPrev() {
        const path = "/project-breakdown";
        this.props.history.push(path);
    }

    render() { 
        const projectEntries = (this.state.projects || []).map((item) => (
            <ul className="spread-entry">
                <SpreadEntry 
                name = {item[0]}
                wave = {item[1]}
                table = {item[2]}
                />
            </ul>

        ))
        return (
            <div className="page-background" id="hackSpreadsheet"> 
                <div className="page-header">HACKER FACING SPREADSHEET</div>
                <div className="content-background">
                    <div className="content-spreadsheet">
                        <div className="list-area">
                            <div className="entries-list">
                                <div className="entries-list-name">PROJECT NAME</div>
                                <div className="entries-list-wave">WAVE</div>
                                <div className="entries-list-table">TABLE</div>
                                <div className="entry-element">{projectEntries}</div>
                            </div>
                        </div>
                    </div>

                    <div className= "button-container-spread">
                        <button type="button" className="button" onClick={this.routeToPrev}>PREV</button>
                        <button type="button" className="button" onClick={this.routeToNext}>NEXT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Spreadsheet;