import React, { Component } from 'react'; 
import '../OrganizerPortal.css'; 

class SpreadEntry extends Component {
    render() {
        return (
            <div> 
                <div className="spread-project-name">{this.props.name}</div> 
                <div className="spread-project-wave">{this.props.wave}</div>
                <div className="spread-project-table">{this.props.table}</div>
            </div>
        )
    }
}

export default SpreadEntry;