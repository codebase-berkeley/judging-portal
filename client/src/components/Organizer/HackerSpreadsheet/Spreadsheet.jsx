import React, { Component } from 'react'; 
import '../OrganizerPortal.css'; 
import SpreadEntry from './SpreadEntry'; 

class Spreadsheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [['SyncUp', 3, 250], ['Codeacademy', 2, 29], ['Github', 1, 50]]
        };
        this.routeToPrev = this.routeToPrev.bind(this);
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